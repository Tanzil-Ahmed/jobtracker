const STATUSES = [
  { key: 'ALL',       label: 'Total',     emoji: '📋', bg: 'bg-slate-100',  border: 'border-slate-400',  text: 'text-slate-700',  ring: 'ring-slate-400'  },
  { key: 'APPLIED',   label: 'Applied',   emoji: '📨', bg: 'bg-blue-50',    border: 'border-blue-400',   text: 'text-blue-700',   ring: 'ring-blue-400'   },
  { key: 'INTERVIEW', label: 'Interview', emoji: '🎙️', bg: 'bg-amber-50',   border: 'border-amber-400',  text: 'text-amber-700',  ring: 'ring-amber-400'  },
  { key: 'OFFER',     label: 'Offer',     emoji: '🎉', bg: 'bg-green-50',   border: 'border-green-400',  text: 'text-green-700',  ring: 'ring-green-400'  },
  { key: 'REJECTED',  label: 'Rejected',  emoji: '❌', bg: 'bg-red-50',     border: 'border-red-400',    text: 'text-red-700',    ring: 'ring-red-400'    },
]

export default function StatsCards({ jobs, filter, onFilter }) {
  const count = (key) => key === 'ALL' ? jobs.length : jobs.filter(j => j.status === key).length

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {STATUSES.map(({ key, label, emoji, bg, border, text, ring }) => {
        const active = filter === key
        return (
          <button
            key={key}
            onClick={() => onFilter(key)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-150 select-none
              ${bg} ${border} ${text}
              ${active ? `ring-2 ${ring} ring-offset-1 shadow-md scale-105` : 'hover:scale-105 hover:shadow-sm'}
            `}
          >
            <span className="text-2xl mb-1">{emoji}</span>
            <span className="text-3xl font-bold">{count(key)}</span>
            <span className="text-xs font-semibold uppercase tracking-wide mt-0.5">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
