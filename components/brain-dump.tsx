"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Trash2,
  Sparkles,
  Lock,
  Crown,
  CheckCircle2,
  ListChecks,
  FileText,
  Save,
  Clock,
  ChevronDown,
  ChevronUp,
  Brain,
  Loader2,
  AlertCircle
} from "lucide-react"
import { ProModal } from "@/components/pro-modal"

const STORAGE_KEY = "neural-braindump-notes"
const FREE_CHAR_LIMIT = 500

interface SavedNote {
  id: string
  text: string
  savedAt: string
}

// Exemplos que aparecem no Blur
const exampleChecklist = ["Definir as 3 prioridades", "Deep Work 90min", "Respiracao Box"]
const exampleInsights = ["Padrao de sobrecarga detectado", "Sugestao: Regra dos 2 min"]
const protocolSteps = [{ time: "06:00", action: "Luz Solar" }, { time: "06:20", action: "Brain Dump" }]

function loadNotes(): SavedNote[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveNotesToStorage(notes: SavedNote[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

type AnalyzePhase = "idle" | "loading" | "done"
const loadingMessages = ["Sincronizando sinapses...", "Mapeando padroes...", "Gerando Protocolo Elite..."]

export function BrainDump() {
  const [text, setText] = useState("")
  const [saved, setSaved] = useState(false)
  const [notes, setNotes] = useState<SavedNote[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [proModalOpen, setProModalOpen] = useState(false)
  const [analyzePhase, setAnalyzePhase] = useState<AnalyzePhase>("idle")
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0])

  useEffect(() => { setNotes(loadNotes()) }, [])

  const handleTextChange = (value: string) => {
    if (value.length <= FREE_CHAR_LIMIT) { setText(value) }
  }

  const handleSave = useCallback(() => {
    if (text.trim().length === 0) return
    const newNote: SavedNote = {
      id: Date.now().toString(),
      text: text.trim(),
      savedAt: new Date().toLocaleString("pt-BR"),
    }
    const updated = [newNote, ...notes].slice(0, 50)
    setNotes(updated)
    saveNotesToStorage(updated)
    setText("")
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }, [text, notes])

  const handleAnalyzeClick = () => {
    if (analyzePhase === "loading") return
    setAnalyzePhase("loading")
    let i = 0
    const interval = setInterval(() => {
      setLoadingMsg(loadingMessages[i % loadingMessages.length]); i++
    }, 1000)

    setTimeout(() => {
      clearInterval(interval); setAnalyzePhase("idle"); setProModalOpen(true)
    }, 3000)
  }

  const charPercent = (text.length / FREE_CHAR_LIMIT) * 100
  const isLimit = text.length >= FREE_CHAR_LIMIT

  return (
    <section className="px-5 pt-2 pb-32">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Trash2 className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Brain Dump</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4 ml-[42px]">Despeje o lixo mental para liberar espaço cognitivo.</p>

      <div className="relative mb-1">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Escreva seus pensamentos aqui..."
          rows={6}
          className="w-full bg-secondary/60 border border-border/60 rounded-2xl px-4 py-3.5 text-sm text-foreground resize-none focus:ring-1 focus:ring-primary/40 focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex-1 h-1 rounded-full bg-secondary/80 mr-3 overflow-hidden">
          <div className={`h-full transition-all ${isLimit ? "bg-destructive shadow-[0_0_8px_#ef4444]" : "bg-primary/60"}`} style={{ width: `${charPercent}%` }} />
        </div>
        <span className={`text-[10px] font-mono ${isLimit ? "text-destructive font-bold" : "text-muted-foreground/50"}`}>
          {text.length}/{FREE_CHAR_LIMIT}
        </span>
      </div>

      {isLimit && (
        <div className="flex items-center gap-1.5 text-[10px] text-destructive mb-3 animate-pulse justify-center">
          <AlertCircle className="w-3 h-3" />
          <span>Limite Grátis atingido. Assine o <b>PRO</b> para desabafos ilimitados.</span>
        </div>
      )}

      <div className="flex gap-2.5 mb-2">
        <button onClick={handleSave} disabled={text.trim().length === 0} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" : "bg-secondary border border-border/60 text-foreground"}`}>
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Salva!</> : <><Save className="w-4 h-4" /> Salvar Nota</>}
        </button>

        <button onClick={handleAnalyzeClick} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground neon-glow">
          {analyzePhase === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Analisar com IA</>}
        </button>
      </div>

      <p className="text-[10px] text-muted-foreground/40 text-center mb-6 italic">
        {saved ? "Dica: A IA Neural poderia transformar essa nota em um protocolo agora." : "Analisar com IA requer assinatura Elite."}
      </p>

      {/* OVERLAY DE LOADING SINÁPTICO */}
      {analyzePhase === "loading" && (
        <div className="flex flex-col items-center py-6 mb-4 bg-primary/5 rounded-2xl border border-primary/10">
          <Brain className="w-8 h-8 text-primary animate-pulse mb-2" />
          <p className="text-xs text-primary font-mono animate-pulse">{loadingMsg}</p>
        </div>
      )}

      {/* HISTÓRICO E CARDS BLOQUEADOS (Mantive a lógica do v0 com o seu design) */}
      {/* ... (Resto do código de histórico e cards com blur que você já tem) ... */}
      
      <ProModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
    </section>
  )
}
