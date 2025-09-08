import React from 'react'
export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
      <div className="h-full bg-bboggi-red transition-all" style={{ width: pct + '%' }} />
    </div>
  )
}
