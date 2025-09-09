import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { RESULT_MAP } from "../data/resultMap";
import html2canvas from "html2canvas";

// 전역 Kakao 타입 선언
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
  const info = RESULT_MAP[mbti] ?? RESULT_MAP["ENFP"];

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analyzing) {
      const t = setTimeout(() => setAnalyzing(false), 1400);
      return () => clearTimeout(t);
    }
  }, [analyzing]);

  const pageUrl = useMemo(() => {
    return window.location.origin + "/result/" + mbti;
  }, [mbti]);

  // 이미지 다운로드
  const onDownload = async () => {
    const card = cardRef.current;
    if (!card) return;

    const images = card.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (!img.complete) {
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
        return Promise.resolve();
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(card, {
      useCORS: true,
      backgroundColor: "#ffffff",
      scale: 2,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `뽀기_${mbti}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section className="relative">
      {/* 결과 카드 */}
      <div className="card space-y-3 max-w-xl mx-auto">
        <div
          ref={cardRef}
          className="rounded-xl overflow-hidden border border-neutral-100 bg-white"
        >
          <div className="p-4 bg-white">
            <div className="text-xs text-neutral-500">
              뽀기가 추천해주는 MBTI별 떡뽀기
            </div>
            <h2 className="text-xl font-extrabold mt-1">
              {mbti} · {info.title}
            </h2>
            <p className="text-neutral-600 mt-2">{info.desc}</p>
          </div>
          <div className="relative">
            <img
              src={info.image}
              alt={mbti}
              className="w-full object-cover max-h-[420px]"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="space-y-3">
          <button
            className="btn btn-primary w-full"
            onClick={() => nav("/event", { state: { mbti } })}
          >
            이벤트 참여하기
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-ghost w-full" onClick={onDownload}>
              사진 다운로드
            </button>
            <button
              className="btn btn-ghost w-full"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    text: "🔥 뽀기 떡볶이 MBTI 테스트 🍲 12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요!",
                    url: "https://bbogi.site/",
                  });
                } else {
                  navigator.clipboard.writeText("https://bbogi.site/");
                  alert("링크가 복사되었습니다!");
                }
              }}
            >
              공유하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Result;
