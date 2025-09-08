export function canWebShare() {
  return !!(navigator as any).share
}

export async function webShare(title: string, text: string, url: string) {
  if (!canWebShare()) throw new Error('web share not supported')
  await (navigator as any).share({ title, text, url })
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

export function twitterUrl(text: string, url: string, hashtags: string[] = []) {
  const q = new URLSearchParams({ text, url, hashtags: hashtags.join(',') })
  return `https://twitter.com/intent/tweet?${q.toString()}`
}

export function facebookUrl(url: string) {
  const q = new URLSearchParams({ u: url })
  return `https://www.facebook.com/sharer/sharer.php?${q.toString()}`
}
