import React from "react";
import { Link } from "react-router-dom";

export default function Landing(): JSX.Element {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 via-white to-orange-50 px-4">
      {/* 상단 로고 */}
      <img
        src="/logo.png" // 실제 로고 파일 경로
        alt="제5회 떡볶이페스티벌 로고"
        className="w-40 mb-12 drop-shadow-md"
      />

      {/* 버튼 두 개 */}
      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* 축제 메인홈 */}
        <a
          href="https://tteokbokkifestival.com/"
          target="_blank"
          rel="noreferrer"
          className="w-full py-6 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl text-center"
        >
          🏮 축제 메인홈페이지 가기
        </a>

        {/* 뽀기 성격테스트 */}
        <Link
          to="/home"
          className="w-full py-6 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold text-xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl text-center"
        >
          🍲 뽀기 성격테스트 하기
        </Link>
      </div>
    </section>
  );
}
