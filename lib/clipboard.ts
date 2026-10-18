export async function copyText(text: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch { /* Try the selection fallback when clipboard access is denied. */ }
  const previousFocus = document.activeElement;
  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
  document.body.appendChild(input);
  try {
    input.select();
    input.setSelectionRange(0, text.length);
    if (!document.execCommand('copy')) throw new Error('复制失败');
  } finally {
    input.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  }
}
