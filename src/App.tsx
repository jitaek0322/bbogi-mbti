import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import EventPage from './pages/Event'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen">
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-neutral-100">
      <div className="flex justify-between items-center h-20 px-6 bg-white shadow">
        {/* 왼쪽 로고 */}
        <Link to="/">
          <img src="/logo.png" alt="뽀기×떡뽀기 로고" className="h-12" />
        </Link>

        {/* 오른쪽 버튼 */}
        <Link
          to="https://tteokbokkifestival.com/"
          className="px-4 py-2 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition"
        >
          메인 홈페이지 가기
        </Link>
      </div>
    </header>
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result/:mbti" element={<Result />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/anbproject" element={<Admin />} />
        </Routes>
      </main>
      <footer className="container py-10 text-center text-neutral-500 text-sm">
        ⓒ 2025 제5회 떡볶이페스티벌 All rights reserved.
      </footer>
    </div>
  )
}
