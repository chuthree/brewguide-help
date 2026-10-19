type EdgeRequest = Request & { eo?: { clientIp?: string } };
type Context = { request: EdgeRequest };

const origin = 'https://brewguide-help.chu3.top';
const hostname = 'brewguide-help.chu3.top';
const website = '79e755d1-9a63-4f8c-a765-d9c23363d202';
const maxBytes = 8192;
const noStore = { 'cache-control': 'no-store' };

function response(status: number) {
  return new Response(null, { status, headers: noStore });
}

function cleanReferrer(value: unknown) {
  if (typeof value !== 'string' || !value) return '';
  try {
    const url = new URL(value, origin);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    return url.origin === origin ? url.pathname.slice(0, 500) : url.origin;
  } catch {
    return '';
  }
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk: unknown = value;
      const bytes =
        typeof chunk === 'string'
          ? new TextEncoder().encode(chunk)
          : chunk instanceof ArrayBuffer
            ? new Uint8Array(chunk)
            : ArrayBuffer.isView(chunk)
              ? new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)
              : null;
      if (!bytes) return null;
      size += bytes.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(bytes);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    return JSON.parse(new TextDecoder().decode(bytes)) as {
      type?: unknown;
      payload?: Record<string, unknown>;
    };
  } finally {
    reader.releaseLock();
  }
}

export async function onRequest({ request }: Context) {
  if (request.method !== 'POST')
    return new Response(null, {
      status: 405,
      headers: { ...noStore, Allow: 'POST' },
    });
  if (new URL(request.url).hostname !== hostname || request.headers.get('origin') !== origin)
    return response(403);
  if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1')
    return response(204);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))
    return response(415);
  if (Number(request.headers.get('content-length')) > maxBytes) return response(413);

  // EdgeOne supplies eo.clientIp; incoming forwarding headers are ignored.
  const ip = request.eo?.clientIp;
  if (!ip || ip.length > 45 || !/^[\da-f.:]+$/i.test(ip)) return response(503);

  let body: Awaited<ReturnType<typeof readBody>>;
  try {
    body = await readBody(request);
  } catch {
    return response(400);
  }
  const input = body?.payload;
  if (
    body?.type !== 'event' ||
    !input ||
    input.website !== website ||
    input.hostname !== hostname ||
    typeof input.url !== 'string'
  ) return response(400);

  let path: string;
  try {
    const url = new URL(input.url, origin);
    if (url.origin !== origin || url.pathname.startsWith('/api/')) return response(400);
    path = url.pathname.slice(0, 500);
  } catch {
    return response(400);
  }

  const headers = new Headers({
    'content-type': 'application/json',
    'user-agent': request.headers.get('user-agent') ?? '',
    'x-forwarded-for': ip,
    'x-umami-client-ip': ip,
    'x-real-ip': ip,
    'x-umami-website-id': website,
    'x-umami-hostname': hostname,
  });
  const cache = request.headers.get('x-umami-cache');
  if (cache && cache.length <= 2048) headers.set('x-umami-cache', cache);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const upstream = await fetch('https://gateway.umami.is/api/send', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'event',
        payload: {
          website,
          hostname,
          url: path,
          title: path,
          referrer: cleanReferrer(input.referrer),
          language: typeof input.language === 'string' ? input.language.slice(0, 35) : '',
          screen:
            typeof input.screen === 'string' && /^\d{1,5}x\d{1,5}$/.test(input.screen)
              ? input.screen
              : '',
        },
      }),
      signal: controller.signal,
      redirect: 'error',
    });
    if (!upstream.ok) return response(502);
    const result = (await upstream.json()) as { cache?: unknown; disabled?: unknown };
    return new Response(
      JSON.stringify({
        ...(typeof result?.cache === 'string' ? { cache: result.cache } : {}),
        ...(typeof result?.disabled === 'boolean' ? { disabled: result.disabled } : {}),
      }),
      { headers: { ...noStore, 'content-type': 'application/json; charset=utf-8' } },
    );
  } catch {
    return response(502);
  } finally {
    clearTimeout(timeout);
  }
}
