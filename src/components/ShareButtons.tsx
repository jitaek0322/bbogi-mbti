import React from 'react'
import { webShare, canWebShare, copyToClipboard, twitterUrl, facebookUrl } from '../lib/share'

export default function ShareButtons({ url, title, text, hashtags = [] }: { url: string; title: string; text: string; hashtags?: string[] }) {
  const onShare = async () => {
    try {
      await webShare(title, text, url)
    } catch {
      await copyToClipboard(url)
      alert('링크가 복사되었습니다.')
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <button onClick={onShare} className="btn btn-primary w-full">공유하기</button>
      <a className="btn btn-ghost w-full" href={twitterUrl(text, url, hashtags)} target="_blank" rel="noreferrer">X(트위터)</a>
      <a className="btn btn-ghost w-full" href={facebookUrl(url)} target="_blank" rel="noreferrer">페이스북</a>
      <button className="btn btn-ghost w-full" onClick={() => copyToClipboard(url).then(()=>alert('링크 복사됨'))}>링크복사</button>
    </div>
  )
}
