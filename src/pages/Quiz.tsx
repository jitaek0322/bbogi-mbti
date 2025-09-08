import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS_POOL, type Question } from '../data/questions'
import ProgressBar from '../components/ProgressBar'

const PICK_COUNT = 12
const KEY = 'bboggi_quiz_set_v1'

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz() {
  const nav = useNavigate()
  const [setQ, setSetQ] = useState<Question[]>([])
  const total = setQ.length
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(PICK_COUNT).fill(-1))

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY)
    if (saved) {
      const arr: Question[] = JSON.parse(saved)
      setSetQ(arr)
    } else {
      const picked = shuffle(QUESTIONS_POOL).slice(0, PICK_COUNT)
      setSetQ(picked)
      sessionStorage.setItem(KEY, JSON.stringify(picked))
    }
  }, [])

  const q = setQ[idx]

  const onChoose = (choiceIdx: 0 | 1) => {
    const next = [...answers]
    next[idx] = choiceIdx
    setAnswers(next)
  }

  const nextQ = () => {
    if (idx < total - 1) setIdx(idx + 1)
  }
  const prevQ = () => {
    if (idx > 0) setIdx(idx - 1)
  }

  const canFinish = useMemo(() => answers.every((a) => a !== -1), [answers])
  const isAnswered = answers[idx] !== -1 // 🔑 현재 문항 응답 여부

  const finish = () => {
    const scores: Record<string, number> = {}
    setQ.forEach((qq, i) => {
      const ans = qq.choices[answers[i]]
      for (const [k, v] of Object.entries(ans.add)) {
        scores[k] = (scores[k] ?? 0) + (v ?? 0)
      }
    })
    const ei = (scores['E'] ?? 0) >= (scores['I'] ?? 0) ? 'E' : 'I'
    const sn = (scores['S'] ?? 0) >= (scores['N'] ?? 0) ? 'S' : 'N'
    const tf = (scores['T'] ?? 0) >= (scores['F'] ?? 0) ? 'T' : 'F'
    const jp = (scores['J'] ?? 0) >= (scores['P'] ?? 0) ? 'J' : 'P'
    const mbti = `${ei}${sn}${tf}${jp}`
    sessionStorage.removeItem(KEY)
    nav(`/result/${mbti}?loading=1`)
  }

  if (!q) return <div className="card text-center">문항을 불러오는 중...</div>

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-neutral-500">
          {idx + 1} / {total}
        </div>
        <div className="w-2/3">
          <ProgressBar current={idx + 1} total={total} />
        </div>
      </div>

      <h2 className="text-lg font-bold">{q.title}</h2>
      <div className="mt-4 grid gap-3">
        {(q.choices as any).map((c: any, i: number) => (
          <button
            key={i}
            onClick={() => onChoose(i as 0 | 1)}
            className={
              'btn w-full ' + (answers[idx] === i ? 'btn-primary' : 'btn-ghost')
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          className="btn btn-ghost flex-1"
          onClick={prevQ}
          disabled={idx === 0}
        >
          이전
        </button>
        {idx === total - 1 ? (
          <button
            className="btn btn-primary flex-1 disabled:opacity-50"
            onClick={finish}
            disabled={!canFinish}
          >
            결과보기
          </button>
        ) : (
          <button
            className="btn btn-primary flex-1 disabled:opacity-50"
            onClick={nextQ}
            disabled={!isAnswered} // 🔑 답변 없으면 비활성화
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}
