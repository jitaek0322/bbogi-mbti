import React, { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

interface Submission {
  id: string
  name: string
  phone: string
  mbti: string
  agree: boolean
  marketingAgree: boolean
  createdAt?: any
}

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<any>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [winners, setWinners] = useState<Submission[]>([])
  const [count, setCount] = useState(3)
  const [excludePrev, setExcludePrev] = useState(true)

  const auth = getAuth()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (u) loadData()
    })
    return () => unsub()
  }, [])

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      alert("로그인 실패: " + e.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setSubmissions([])
    setWinners([])
  }

  const loadData = async () => {
    try {
      const snap = await getDocs(collection(db, "submissions"))
      const arr: Submission[] = []
      snap.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() } as Submission)
      })
      setSubmissions(arr)
    } catch (e) {
      console.error("데이터 불러오기 실패:", e)
      alert("데이터 불러오기 실패 - 관리자 권한 필요")
    }
  }

  // ✅ 새 추첨 (기존 winners 초기화 후 다시 뽑기)
  const pickNewWinners = (cnt: number) => {
    if (cnt <= 0 || submissions.length === 0) return
    let pool = [...submissions]
    if (excludePrev && winners.length > 0) {
      const prevIds = new Set(winners.map((w) => w.id))
      pool = pool.filter((s) => !prevIds.has(s.id))
    }
    const shuffled = pool.sort(() => 0.5 - Math.random())
    setWinners(shuffled.slice(0, cnt))
  }

  // ✅ 추가 추첨 (기존 winners에 이어서 더 뽑기)
  const pickAddWinners = (cnt: number) => {
    if (cnt <= 0 || submissions.length === 0) return
    let pool = [...submissions]
    if (excludePrev && winners.length > 0) {
      const prevIds = new Set(winners.map((w) => w.id))
      pool = pool.filter((s) => !prevIds.has(s.id))
    }
    const shuffled = pool.sort(() => 0.5 - Math.random())
    setWinners([...winners, ...shuffled.slice(0, cnt)])
  }

  // ✅ CSV 다운로드 (BOM 추가로 한글 깨짐 방지)
  const downloadCSV = (data: Submission[], filename: string) => {
    if (data.length === 0) return
    const header = ["id","name","phone","mbti","agree","marketingAgree","createdAt"]
    const rows = data.map((s) => [
      s.id,
      s.name,
      s.phone,
      s.mbti,
      s.agree,
      s.marketingAgree,
      s.createdAt?.toDate?.().toISOString() ?? "",
    ])
    const csvContent = [header, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 🔐 로그인 화면
  if (!user) {
    return (
      <section className="p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-extrabold mb-4">관리자 로그인</h2>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={login}>
          로그인
        </button>
      </section>
    )
  }

  // ✅ 관리자 화면
  return (
    <section className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-2xl font-extrabold">관리자 페이지</h2>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={loadData}>데이터 새로고침</button>
          <button className="btn btn-ghost" onClick={logout}>로그아웃</button>
        </div>
      </div>

      {/* 추첨 컨트롤 */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* 새 추첨 */}
        <span className="font-bold">새 추첨:</span>
        <button className="btn btn-secondary" onClick={() => pickNewWinners(1)}>1명</button>
        <button className="btn btn-secondary" onClick={() => pickNewWinners(3)}>3명</button>
        <button className="btn btn-secondary" onClick={() => pickNewWinners(5)}>5명</button>

        {/* 추가 추첨 */}
        <span className="ml-6 font-bold">추가 추첨:</span>
        <button className="btn btn-accent" onClick={() => pickAddWinners(1)}>1명</button>
        <button className="btn btn-accent" onClick={() => pickAddWinners(3)}>3명</button>
        <button className="btn btn-accent" onClick={() => pickAddWinners(5)}>5명</button>

        {/* 수량 입력 */}
        <div className="flex items-center gap-2 ml-6">
          <input
            type="number"
            value={count}
            min={1}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 border px-2 py-1 rounded"
          />
          <button className="btn btn-primary" onClick={() => pickNewWinners(count)}>
            새 추첨 {count}명
          </button>
          <button className="btn btn-accent" onClick={() => pickAddWinners(count)}>
            추가 {count}명
          </button>
        </div>

        {/* 옵션 */}
        <label className="flex items-center gap-2 ml-6">
          <input
            type="checkbox"
            checked={excludePrev}
            onChange={(e) => setExcludePrev(e.target.checked)}
          />
          <span className="text-sm">이전 당첨자 제외</span>
        </label>

        {/* CSV 다운로드 */}
        <div className="ml-auto flex gap-2">
          <button className="btn btn-outline" onClick={() => downloadCSV(submissions, "submissions.csv")}>
            전체 CSV 다운로드
          </button>
          <button className="btn btn-outline" onClick={() => downloadCSV(winners, "winners.csv")}>
            당첨자 CSV 다운로드
          </button>
        </div>
      </div>

      {/* 데이터 현황 */}
      <div>
        <h3 className="font-bold mt-4">총 응모자 수: {submissions.length}</h3>
        {winners.length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold">🎉 당첨자 명단 ({winners.length}명)</h4>
            <ul className="list-disc pl-6 space-y-1">
              {winners.map((w) => (
                <li key={w.id}>
                  {w.name} ({w.phone}) - {w.mbti}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
