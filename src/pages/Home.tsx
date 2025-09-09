import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export default function Home() {
  const pageUrl = "https://bbogi.site/";
  const [count, setCount] = useState(0);

  // DB에서 현재 카운트 불러오기
  useEffect(() => {
    fetch("/.netlify/functions/counter")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  // 버튼 누르면 카운트 +1
  const handleStart = async () => {
    const res = await fetch("/.netlify/functions/counter", { method: "POST" });
    const data = await res.json();
    setCount(data.count);
  };

  return (
    <section className="text-center min-h-screen flex items-center justify-center bg-white">
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-wiggle {
            animation: wiggle 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="w-full max-w-lg mx-auto">
        <picture>
          {/* 캐릭터 이미지 */}
          <source srcSet="/cook.webp" type="image/webp" />
          <img
            src="/cook.png"
            alt="요리하는 뽀기 캐릭터"
            className="mx-auto mb-4 h-44 animate-wiggle"
            style={{
              filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.35))",
            }}
          />
        </picture>

        <div className="card bg-white shadow-lg p-6 rounded-xl">
          <span className="badge">뽀기가 추천해주는 MBTI별 떡뽀기</span>
          <h1 className="text-2xl font-extrabold mt-2">
            나의 MBTI는 어떤 <span className="text-bboggi-red">떡볶이</span>일까?
          </h1>
          <p className="text-neutral-600 mt-2">
            초간단 테스트로 내 취향에 맞는
            <br />
            떡볶이 조합을 추천받아봐 뽀기!
          </p>

          {/* 이벤트 배너 */}
          <div className="mt-4 p-3 rounded-lg bg-yellow-100 text-yellow-800 font-semibold shadow-sm animate-pulse">
            🎁 지금 <span className="text-bboggi-red">떡볶이 페스티벌 이벤트</span> 진행중!
            <br />
            테스트 완료 후 이벤트 참여하면 선물이 기다려요 ✨
          </div>

          {/* 참여자 카운터 */}
          <div className="mt-4 text-bboggi-red font-bold text-xl">
            지금까지{" "}
            <span className="text-3xl">
              <CountUp end={count} duration={1.5} separator="," />
            </span>
            명이 참여했어요! 🎉
          </div>

          {/* 테스트 시작 버튼 */}
          <Link
            to="/quiz"
            onClick={handleStart}
            className="btn btn-primary mt-6 text-lg w-full max-w-sm mx-auto px-10 py-4 transition-transform hover:scale-105"
          >
            🚀 테스트 시작
          </Link>

          {/* 공유하기 섹션 */}
          <div className="mt-8">
            <p className="text-xs text-neutral-500 mb-2">공유하기</p>
            <div className="flex justify-center gap-4">
              {/* 카카오톡 */}
              <button
                onClick={() => {
                  if (window.Kakao) {
                    window.Kakao.Share.sendDefault({
                      objectType: "feed",
                      content: {
                        title: "🔥 뽀기 떡볶이 MBTI 테스트",
                        description:
                          "12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요! 🍲",
                        imageUrl: "https://bbogi.site/kakao_og.png",
                        link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
                      },
                      buttons: [
                        {
                          title: "테스트 하러가기",
                          link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
                        },
                      ],
                    });
                  }
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-400 transition-transform hover:scale-110"
              >
                <img src="/icons/kakao.svg" alt="카카오톡" className="w-6 h-6" />
              </button>

              {/* 인스타그램 */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(pageUrl).then(() => {
                    alert("링크가 복사되었습니다! 인스타그램 스토리에 붙여넣어 공유하세요 📲");
                    window.location.href = "instagram://app";
                  });
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 transition-transform hover:scale-110"
              >
                <img src="/icons/instagram.svg" alt="인스타그램" className="w-6 h-6" />
              </button>

              {/* 페이스북 */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 transition-transform hover:scale-110"
              >
                <img src="/icons/facebook.svg" alt="페이스북" className="w-6 h-6" />
              </a>

              {/* 트위터(X) */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "🔥 뽀기 떡볶이 MBTI 테스트 🍲 12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요!"
                )}&url=${pageUrl}&hashtags=떡볶이페스티벌,뽀기,떡볶이테스트,MBTI`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-black transition-transform hover:scale-110"
              >
                <img src="/icons/twitter.svg" alt="트위터" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
