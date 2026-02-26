"use client"

import { useState, useEffect } from "react"
import {
  ScanLine, Lock, Crown, Camera, X, Pill, Brain, Moon, Zap, Heart, Shield,
  Search, ChevronDown, ChevronUp, AlertTriangle, Skull, CheckCircle2,
  XCircle, ShoppingBag, Sparkles, Loader2
} from "lucide-react"
import { ProModal } from "@/components/pro-modal"

// ... (Mantenha as interfaces Supplement, HarmfulAdditive e ScanResult e os arrays harmfulAdditives e supplements exatamente como estavam no seu original)

function ScannerOverlay({ onClose, onScanComplete }: { onClose: () => void, onScanComplete: (result: any) => void }) {
  const [phase, setPhase] = useState<"scanning" | "done">("scanning")

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockScanResults = [
        {
          productName: "Energético Industrial",
          score: 22,
          found: [{ code: "E951", name: "Aspartame", risk: "alto" }, { code: "E211", name: "Benzoato de Sódio", risk: "medio" }],
          safe: ["Água carbonatada", "Cafeína"],
          shopRecommendation: { name: "Kit Foco Total", reason: "Substitua químicas por nootrópicos de elite." }
        }
      ]
      setPhase("done")
      setTimeout(() => { onScanComplete(mockScanResults[0]); onClose() }, 800)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070D]/95 backdrop-blur-xl">
      <div className="relative w-80 h-80 rounded-3xl border-2 border-primary/20 bg-primary/5 overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.1)]">
        
        {/* LASER NEON ANIMADO */}
        {phase === "scanning" && (
          <div className="absolute inset-x-0 h-[3px] bg-primary shadow-[0_0_20px_#00D4FF,0_0_40px_#00D4FF] z-20 animate-laser-move">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary/20 to-transparent -translate-y-full" />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          {phase === "scanning" ? (
            <>
              <div className="relative">
                <Camera className="w-12 h-12 text-primary/40 animate-pulse" />
                <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping" />
              </div>
              <p className="text-primary font-mono text-xs tracking-widest animate-pulse">ANALISANDO SINAPSES...</p>
            </>
          ) : (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
               <CheckCircle2 className="w-16 h-16 text-emerald-500" />
               <p className="text-emerald-500 font-bold mt-2">RAIO-X CONCLUÍDO</p>
            </div>
          )}
        </div>

        {/* MOLDURA DE SCANNER */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
      </div>
      
      <button onClick={onClose} className="mt-10 text-muted-foreground hover:text-white transition-colors">Abortar Missão</button>
      
      <style jsx global>{`
        @keyframes laser-move {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-laser-move {
          animation: laser-move 2s infinite alternate linear;
        }
      `}</style>
    </div>
  )
}

// ... (Mantenha o componente ScanResultCard e as funções auxiliares de cores)

export function BiohackerTracker({ onNavigateToShop }: { onNavigateToShop?: () => void }) {
  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [activeSection, setActiveSection] = useState<"aditivos" | "suplementos">("aditivos")
  const [proModalOpen, setProModalOpen] = useState(false)

  return (
    <section className="px-5 pt-2 pb-32">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <ScanLine className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-tighter">Bio-Scanner Neural</h2>
      </div>
      
      {/* CARD PRINCIPAL DO SCANNER */}
      <div onClick={() => setScannerOpen(true)} className="group relative mt-4 p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/30 cursor-pointer overflow-hidden transition-all active:scale-95">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_50px_rgba(0,212,255,0.6)] transition-all">
            <Camera className="w-8 h-8 text-black" />
          </div>
          <h3 className="mt-4 text-lg font-black text-white italic">ESCANEAR RÓTULO</h3>
          <p className="text-[10px] text-primary/70 font-mono">RAIO-X DE ADITIVOS NEUROTOXICOS</p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
      </div>

      {scanResult && (
        <div className="mt-6 animate-in slide-in-from-bottom-4 duration-500">
           <ScanResultCard result={scanResult} onShopClick={() => onNavigateToShop?.()} onProClick={() => setProModalOpen(true)} />
        </div>
      )}

      {/* SELETOR DE SEÇÃO */}
      <div className="flex bg-secondary/30 p-1 rounded-2xl mt-8 border border-white/5">
        <button onClick={() => setActiveSection("aditivos")} className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all ${activeSection === "aditivos" ? "bg-primary text-black shadow-lg" : "text-muted-foreground"}`}>ADITIVOS PROIBIDOS</button>
        <button onClick={() => setActiveSection("suplementos")} className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all ${activeSection === "suplementos" ? "bg-primary text-black shadow-lg" : "text-muted-foreground"}`}>WIKI SUPLEMENTOS</button>
      </div>

      {/* CONTEÚDO DA WIKI (Pode manter a lógica de lista que você mandou, ela está excelente) */}
      {/* ... */}

      {scannerOpen && <ScannerOverlay onClose={() => setScannerOpen(false)} onScanComplete={(res) => setScanResult(res)} />}
      <ProModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
    </section>
  )
}
