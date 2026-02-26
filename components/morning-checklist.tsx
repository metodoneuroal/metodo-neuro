"use client"

import { useState, useEffect } from "react"
import { Sunrise, Check, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const STORAGE_KEY = "neural-morning-checklist"

interface CheckItem {
  id: string
  label: string
  checked: boolean
}

const defaultItems: CheckItem[] = [
  { id: "1", label: "Copo de agua com limao", checked: false },
  { id: "2", label: "10 min de luz solar", checked: false },
  { id: "3", label: "Journaling (3 paginas)", checked: false },
  { id: "4", label: "Meditacao de 5 min", checked: false },
  { id: "5", label: "Exercicio fisico (20 min)", checked: false },
]

function loadChecklist(): CheckItem[] | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as { items: CheckItem[]; date: string }
    // Reset if it's a new day
    const today = new Date().toDateString()
    if (data.date !== today) return null
    return data.items
  } catch {
    return null
  }
}

function saveChecklist(items: CheckItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ items, date: new Date().toDateString() })
  )
}

export function MorningChecklist() {
  const [items, setItems] = useState<CheckItem[]>(defaultItems)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadChecklist()
    if (saved) setItems(saved)
    setHydrated(true)
  }, [])

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
      saveChecklist(updated)
      return updated
    })
  }

  const resetChecklist = () => {
    const reset = defaultItems.map((i) => ({ ...i, checked: false }))
    setItems(reset)
    saveChecklist(reset)
  }

  const completedCount = items.filter((i) => i.checked).length
  const progressValue = (completedCount / items.length) * 100
  const allDone = completedCount === items.length

  return (
    <section className="px-5 mt-6">
      <div className="glass-card rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF8C42]/10">
              <Sunrise className="w-4 h-4 text-[#FF8C42]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Ativacao Matinal</h2>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{items.length} concluidos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {allDone && (
              <button
                onClick={resetChecklist}
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Resetar checklist"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-xs font-mono text-primary tabular-nums">
              {hydrated ? `${Math.round(progressValue)}%` : "..."}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <Progress
            value={hydrated ? progressValue : 0}
            className="h-1.5 bg-secondary"
          />
        </div>

        {/* All done celebration */}
        {allDone && hydrated && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 mb-3">
            <Check className="w-4 h-4 text-[#34D399]" />
            <span className="text-xs text-[#34D399] font-medium">
              Ativacao completa! Seu cerebro agradece.
            </span>
          </div>
        )}

        {/* Checklist */}
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-left ${
                item.checked
                  ? "bg-primary/5"
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-300 shrink-0 ${
                  item.checked
                    ? "bg-primary border-primary neon-glow"
                    : "border-border"
                }`}
              >
                {item.checked && (
                  <Check className="w-3 h-3 text-primary-foreground" />
                )}
              </div>
              <span
                className={`text-sm transition-all duration-300 ${
                  item.checked
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Persistence hint */}
        <p className="text-[10px] text-muted-foreground/40 text-center mt-3">
          Progresso salvo automaticamente. Reseta todo dia.
        </p>
      </div>
    </section>
  )
}
