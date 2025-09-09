import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { RESULT_MAP } from '../data/resultMap'
import html2canvas from 'html2canvas'

export default function Result() {
  const { mbti = 'ENFP' } = useParams()
  const [sp] = useSearchParams()
  const [analyzing, setAnalyzing] = useState(sp.get('loading') === '1')
  const nav = useNavigate()
  const info = RESULT_MAP[mbti] ?? RESULT_MAP['ENFP']

  // 🔑 카드 전용 ref
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (analyzing) {
      const t = setTimeout(() => setAnalyzing(false), 1400)
      return () => clearTimeout(t)
    }
  }, [analyzing])

  const pageUrl = useMemo(() => {
    return window.location.origin + '/result/' + mbti
  }, [mbti])

  // 🔑 카드 영역만 캡처
  const onDownload = async () => {
    const card = cardRef.current
    if (!card) return

    // 카드 안 이미지 로딩 대기
    const images = card.querySelectorAll('img')
    await Promise.all(Array.from(images).map(img => {
      if (!img.complete) {
        return new Promise(resolve => {
          img.onload = resolve
          img.onerror = resolve
        })
      }
      return Promise.resolve()
    }))
    await new Promise(resolve => setTimeout(resolve, 200))

    // 캡처 실행
    const canvas = await html2canvas(card, {
      useCORS: true,
      backgroundColor: '#ffffff', // 흰 배경 지정
      scale: 10,                   // 고해상도
      logging: false,
    })

    const link = document.createElement('a')
    link.download = `뽀기_${mbti}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <section className="relative">
      {/* 분석중 오버레이 */}
      {analyzing && (
        <div
          data-html2canvas-ignore="true"
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center"
        >
          <img
            src="/bboggi.png"
            alt="bboggi"
            className="w-28 h-28 animate-spin-slow mb-4 rounded-full border-4 border-bboggi-red/20"
          />
          <div className="text-bboggi-red font-extrabold text-xl">분석 중...</div>
          <div className="text-neutral-500 text-sm mt-1">
            뽀기가 당신의 떡볶이 취향을 읽는 중
          </div>
        </div>
      )}

      {/* 결과 카드 */}
      <div className="card space-y-3 max-w-xl mx-auto">
        <div
          ref={cardRef}  // 🔑 오직 이 카드만 캡처
          className="rounded-xl overflow-hidden border border-neutral-100 animate-[fadeInUp_.5s_ease] bg-white"
        >
          <div className="p-4 bg-white">
            <div className="text-xs text-neutral-500">
              뽀기가 추천해주는 MBTI별 떡뽀기
            </div>
            <h2 className="text-xl font-extrabold mt-1">
              {mbti} · {info.title}
            </h2>
            <p className="text-neutral-600 mt-2">{info.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {info.hashtags.map(h => (
                <span key={h} className="badge">
                  #{h.replace('#', '')}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={info.image}
              alt={mbti}
              className="w-full object-cover max-h-[420px] bg-neutral-100"
            />
            <img
              src="/bboggi.png"
              alt="bboggi"
              className="w-16 h-16 absolute bottom-3 right-3 rounded-xl border-4 border-white shadow-soft"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          {/* 이벤트 참여하기 - 상단 풀폭 */}
          <button
            className="btn btn-primary w-full"
            onClick={() => nav('/event', { state: { mbti } })}
          >
            이벤트 참여하기
          </button>

          {/* 하단 2열: 사진 다운로드 + 공유하기 */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-ghost w-full" onClick={onDownload}>
              사진 다운로드
            </button>
            <button
              className="btn btn-ghost w-full"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "뽀기 떡볶이 MBTI 테스트",
                    text: "🔥 12문항으로 간단 검사! 내 성향에 맞는 떡볶이를 추천받아보세요!",
                    url: "https://bbogi.site/"
                  })
                } else {
                  navigator.clipboard.writeText("https://bbogi.site/")
                  alert("링크가 복사되었습니다!")
                }
              }}
            >
              공유하기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}