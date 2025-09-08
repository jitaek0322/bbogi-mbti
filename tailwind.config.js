/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette
        bboggi: {
          red: '#d7263d',    // 떡볶이 포인트 (캐릭터와 버튼)
          cream: '#fff3ea',  // 따뜻한 배경
          mint: '#e1f5f2',   // 보색 포인트
          ink: '#121212'     // 텍스트
        }
      },
      fontFamily: {
        pretendard: ['Pretendard', 'system-ui', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}
