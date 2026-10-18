import clipboardCopy from 'clipboard-copy';

export async function copyText(text: string): Promise<void> {
  await clipboardCopy(text);
}
