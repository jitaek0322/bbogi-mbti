import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { RESULT_MAP } from "../data/resultMap";

// Kakao 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

function Result() {
  const { mbti = "ENFP" } = useParams();
  const [sp] = useSearchParams();
  const [analyzing, setAnalyzing] = useState(sp.get("loading") === "1");
  const nav = useNavigate();
  const info = RESULT_MAP[mbti.toUpperCase()] ?? RESULT_MAP["ENFP"];

  useEffect(() => {
    if (analyzing) {
      const t = setTimeout(() => setAnalyzing(false), 3500); // ⏱️ 3.5초 유지
      return () => clearTimeout(t);
    }
  }, [analyzing]);

  const pageUrl = useMemo(() => "https://bbogi.site/", []);

  // Kakao SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("aefc9764aa14436d6f64e0d5658b12a4"); // 👉 발급받은 JS 키
    }
  }, []);

  // 이미지 다운로드 (info.image만 저장)
  const onDownload = () => {
    const link = document.createElement("a");
    link.href = info.image; // 결과이미지 URL
    link.download = `뽀기_${mbti.toUpperCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 카카오톡 공유
  const shareKakao = () => {
    if (!window.Kakao) return;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "🔥 뽀기 떡볶이 MBTI 테스트",
        description: "12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요! 🍲",
        imageUrl: "https://bbogi.site/kakao_og.png",
        link: {
          mobileWebUrl: pageUrl,
          webUrl: pageUrl,
        },
      },
      buttons: [
        {
          title: "테스트 하러가기",
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
      ],
    });
  };

  return (
    <section className="relative">
      {/* ⏳ 분석중 오버레이 */}
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
        <div className="rounded-xl overflow-hidden border border-neutral-100 bg-white">
          <div className="p-4 bg-white">
            <div className="text-xs text-neutral-500">
              뽀기가 추천해주는 MBTI별 떡뽀기
            </div>
            <h2 className="text-xl font-extrabold mt-1">
              {mbti.toUpperCase()} · {info.title}
            </h2>
            <p className="text-neutral-600 mt-2">{info.desc}</p>
          </div>
          <div className="relative">
            {/* 결과이미지 (1080x1920) */}
            <img
              src={info.image}
              alt={mbti.toUpperCase()}
              className="w-full object-cover"
              style={{ aspectRatio: "1080 / 1920" }}
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="space-y-3">
          <button
            className="btn btn-primary w-full"
            onClick={() => nav("/event", { state: { mbti: mbti.toUpperCase() } })}
          >
            이벤트 참여하기
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-ghost w-full" onClick={onDownload}>
              이미지 다운로드
            </button>
            <button
              className="btn btn-ghost w-full"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    text: "🔥 뽀기 떡볶이 MBTI 테스트 🍲 12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요!",
                    url: pageUrl,
                  });
                } else {
                  navigator.clipboard.writeText(pageUrl);
                  alert("링크가 복사되었습니다!");
                }
              }}
            >
              공유하기
            </button>
          </div>
        </div>

        {/* 아이콘 공유 */}
        <div className="flex justify-center gap-4 mt-4">
          {/* 카카오톡 */}
          <button
            onClick={shareKakao}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-400"
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
            className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
          >
            <img src="/icons/instagram.svg" alt="인스타그램" className="w-6 h-6" />
          </button>

          {/* 페이스북 */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600"
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
            className="w-12 h-12 rounded-full flex items-center justify-center bg-black"
          >
            <img src="/icons/twitter.svg" alt="트위터" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Result;
