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
            text: "🔥 뽀기 떡볶이 MBTI 테스트 🍲 12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요! 👉 https://bbogi.site/",
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

  {/* 아이콘 공유 버튼 */}
  <div className="flex justify-center gap-4 mt-4">
    {/* 카카오톡 */}
    <button
      onClick={() => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          window.Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: "뽀기 떡볶이 MBTI 테스트 🍲",
              description: "🔥 12문항으로 내 성향에 맞는 떡볶이를 추천받아보세요!",
              imageUrl: "https://bbogi.site/og.png",
              link: { mobileWebUrl: "https://bbogi.site/", webUrl: "https://bbogi.site/" }
            },
            buttons: [
              {
                title: "테스트 하기",
                link: { mobileWebUrl: "https://bbogi.site/", webUrl: "https://bbogi.site/" }
              }
            ]
          });
        } else {
          alert("카카오 SDK 로드 실패 😢");
        }
      }}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-400"
    >
      <img src="/icons/kakao.svg" alt="카카오톡" className="w-6 h-6" />
    </button>

    {/* 인스타그램 (공식 공유링크 없음 → 앱 실행 + 복사) */}
    <button
      onClick={() => {
        navigator.clipboard.writeText("https://bbogi.site/").then(() => {
          alert("링크가 복사되었습니다! 📋 인스타그램 스토리에 붙여넣어 공유하세요.");
          window.location.href = "instagram://story-camera";
        });
      }}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
    >
      <img src="/icons/instagram.svg" alt="인스타그램" className="w-6 h-6" />
    </button>

    {/* 페이스북 */}
    <a
      href="https://www.facebook.com/sharer/sharer.php?u=https://bbogi.site/"
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600"
    >
      <img src="/icons/facebook.svg" alt="페이스북" className="w-6 h-6" />
    </a>

    {/* 트위터(X) */}
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "🔥 뽀기 떡볶이 MBTI 테스트 🍲 내 성향에 맞는 떡볶이를 추천받아보세요!"
      )}&url=https://bbogi.site/&hashtags=${encodeURIComponent("떡볶이테스트,MBTI,떡볶이페스티벌,뽀기")}`}
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-black"
    >
      <img src="/icons/twitter.svg" alt="트위터" className="w-6 h-6" />
    </a>
  </div>
</div>
