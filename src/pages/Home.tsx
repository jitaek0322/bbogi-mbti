import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="text-center">
      <picture>
      {/* 캐릭터 이미지 */}
      <source srcSet="/cook.webp" type="image/webp" />
      <img
        src="/cook.png"
        alt="요리하는 뽀기 캐릭터"
        className="mx-auto mb-4 h-44"
        style={{
          filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.35))", // 뽀기 라인따라 자연스러운 그림자
        }}
      />
      </picture>

      <div className="card">
        <span className="badge">뽀기가 추천해주는 MBTI별 떡뽀기</span>
        <h1 className="text-2xl font-extrabold mt-2">
          나의 MBTI는 어떤 <span className="text-bboggi-red">떡볶이</span>일까?
        </h1>
        <p className="text-neutral-600 mt-2">
          초간단 테스트로 내 취향에 맞는<br />
          떡볶이 조합을 추천받아봐 뽀기!
        </p>
        <Link to="/quiz" className="btn btn-primary mt-4">
          테스트 시작
        </Link>
      </div>
    </section>
  )
}
