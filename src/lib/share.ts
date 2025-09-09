export const MAIN_URL = "https://bbogi.site/"

// Web Share API 지원 여부
export function canWebShare() {
  return !!(navigator as any).share
}

// Web Share 실행
export async function webShare() {
  if (!canWebShare()) throw new Error("web share not supported")

  const title = "뽀기가 추천하는 떡볶이 MBTI 테스트!"
  const text = "12문항으로 간단히 검사하고 내 성향에 맞는 떡볶이를 추천받으세요 🍲🔥 이벤트 참여도 가능!"
  const url = MAIN_URL

  await (navigator as any).share({ title, text, url })
}

// 클립보드 복사
export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

// 트위터 공유
export function twitterUrl() {
  const text = "🔥 뽀기가 추천하는 떡볶이 MBTI 테스트 🔥\n12문항으로 간단히 검사하고 내 성향에 맞는 떡볶이를 추천받으세요!"
  const hashtags = ["떡볶이테스트", "MBTI", "뽀기"]
  const q = new URLSearchParams({
    text,
    url: MAIN_URL,
    hashtags: hashtags.join(","),
  })
  return `https://twitter.com/intent/tweet?${q.toString()}`
}

// 페이스북 공유
export function facebookUrl() {
  const q = new URLSearchParams({ u: MAIN_URL })
  return `https://www.facebook.com/sharer/sharer.php?${q.toString()}`
}
