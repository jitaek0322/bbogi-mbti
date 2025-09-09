import React from "react"
import { webShare, copyToClipboard, twitterUrl, facebookUrl } from "../lib/share"

export default function ShareButtons() {
  const onShare = async () => {
    try {
      await webShare()
    } catch {
      await copyToClipboard("https://bbogi.site/")
      alert("링크가 복사되었습니다.")
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {/* 기본 공유 */}
      <button onClick={onShare} className="btn btn-primary w-full">
        공유하기
      </button>

      {/* 트위터 */}
      <a
        className="btn btn-ghost w-full"
        href={twitterUrl()}
        target="_blank"
        rel="noreferrer"
      >
        X(트위터)
      </a>

      {/* 페이스북 */}
      <a
        className="btn btn-ghost w-full"
        href={facebookUrl()}
        target="_blank"
        rel="noreferrer"
      >
        페이스북
      </a>

      {/* 복사 */}
      <button
        className="btn btn-ghost w-full"
        onClick={() =>
          copyToClipboard("https://bbogi.site/").then(() =>
            alert("링크 복사됨")
          )
        }
      >
        링크복사
      </button>
    </div>
  )
}
