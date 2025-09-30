import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing(): JSX.Element {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false); // 클릭 잠금

  // 포크 폭발 함수
  const shootForks = (x: number, y: number, count = 15) => {
    for (let i = 0; i < count; i++) {
      const fork = document.createElement("img");
      fork.src = "/fork.png"; // 포크 PNG 경로
      fork.className = "fork-fly";

      fork.style.left = x + "px";
      fork.style.top = y + "px";

      const angle = Math.random() * 2 * Math.PI;
      const distance = 150 + Math.random() * 150;
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      fork.style.setProperty("--x", `${offsetX}px`);
      fork.style.setProperty("--y", `${offsetY}px`);

      document.body.appendChild(fork);
      fork.addEventListener("animationend", () => fork.remove());
    }
  };

  // 클릭 핸들러
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    link: string,
    external = false
  ) => {
    e.preventDefault();
    if (locked) return; // 이미 잠금 상태면 무시
    setLocked(true); // 잠금

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    shootForks(x, y, 20);

    setTimeout(() => {
      if (external) {
        window.location.href = link; // 외부 링크
      } else {
        navigate(link); // 내부 라우터 이동
      }
    }, 500); // 0.5초 후 이동
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-start pt-32 bg-gradient-to-b from-red-50 via-white to-orange-50 px-4 ${
        locked ? "pointer-events-none" : ""
      }`} // 전체 잠금
    >
      <style>
        {`
          @keyframes explode {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--x), var(--y)) scale(0.6); opacity: 0; }
          }
          .fork-fly {
            position: fixed;
            width: 40px;
            height: 40px;
            pointer-events: none;
            animation: explode 1s ease-out forwards;
            z-index: 9999;
          }
        `}
      </style>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* 축제 메인홈 */}
        <a
          href="https://tteokbokkifestival.com/"
          onClick={(e) =>
            handleClick(e, "https://tteokbokkifestival.com/", true)
          }
          onMouseEnter={(e) =>
            !locked && shootForks(e.clientX, e.clientY, 10)
          }
          className={`w-full py-6 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl text-center shadow-lg transition-transform hover:scale-105 hover:shadow-xl ${
            locked ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          🏮 축제 메인홈페이지 가기
        </a>

        {/* 뽀기 성격테스트 */}
        <Link
          to="/home"
          onClick={(e) => handleClick(e, "/home")}
          onMouseEnter={(e) =>
            !locked && shootForks(e.clientX, e.clientY, 10)
          }
          className={`w-full py-6 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold text-xl text-center shadow-lg transition-transform hover:scale-105 hover:shadow-xl ${
            locked ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          🍲 뽀기 성격테스트 하기
        </Link>
      </div>
    </section>
  );
}
