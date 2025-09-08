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

  const pickWinners = (cnt: number) => {
    if (cnt <= 0 || submissions.length === 0) return
    let pool = [...submissions]
    if (excludePrev && winners.length > 0) {
      const prevIds = new Set(winners.map((w) => w.id))
      pool = pool.filter((s) => !prevIds.has(s.id))
    }
    const shuffled = pool.sort(() => 0.5 - Math.random())
    setWinners([...winners, ...shuffled.slice(0, cnt)])
  }

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
    // ✅ BOM 추가
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 로그인 화면
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

  // 관리자 화면
  return (
    <section className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold">관리자 페이지</h2>
        <button className="btn btn-ghost" onClick={logout}>로그아웃</button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="btn btn-primary" onClick={loadData}>데이터 새로고침</button>
        <button className="btn btn-secondary" onClick={() => pickWinners(1)}>랜덤 1명</button>
        <button className="btn btn-secondary" onClick={() => pickWinners(3)}>랜덤 3명</button>
        <button className="btn btn-secondary" onClick={() => pickWinners(5)}>랜덤 5명</button>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={count}
            min={1}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 border px-2 py-1 rounded"
          />
          <button className="btn btn-accent" onClick={() => pickWinners(count)}>
            랜덤 {count}명
          </button>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={excludePrev}
            onChange={(e) => setExcludePrev(e.target.checked)}
          />
          <span className="text-sm">이전 당첨자 제외</span>
        </label>
        <button className="btn btn-ghost" onClick={() => downloadCSV(submissions, "submissions.csv")}>
          전체 CSV 다운로드
        </button>
        <button className="btn btn-ghost" onClick={() => downloadCSV(winners, "winners.csv")}>
          당첨자 CSV 다운로드
        </button>
      </div>

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
