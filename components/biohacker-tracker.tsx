"use client"

import { useState, useEffect } from "react"
import {
  ScanLine,
  Lock,
  Crown,
  Camera,
  X,
  Pill,
  Brain,
  Moon,
  Zap,
  Heart,
  Shield,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Skull,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react"
import { ProModal } from "@/components/pro-modal"

// --- INTERFACES ---
interface Supplement {
  id: string
  name: string
  category: string
  icon: React.ReactNode
  shortDesc: string
  benefits: string[]
  dosage: string
  timing: string
}

interface HarmfulAdditive {
  code: string
  name: string
  risk: "alto" | "medio" | "baixo"
  description: string
}

interface ScanResult {
  productName: string
  score: number
  found: { code: string; name: string; risk: "alto" | "medio" | "baixo" }[]
  safe: string[]
  shopRecommendation?: { name: string; reason: string }
}

// --- DADOS RESGATADOS ---
const harmfulAdditives: HarmfulAdditive[] = [
  { code: "E621", name: "Glutamato Monossódico", risk: "medio", description: "Excitotoxina que pode causar dores de cabeça e sobrecarga neuronal." },
  { code: "E951", name: "Aspartame", risk: "alto", description: "Adoçante artificial ligado a neurotoxicidade e alterações de humor." },
  { code: "E211", name: "Benzoato de Sódio", risk: "medio", description: "Conservante que pode formar benzeno em certas condições." },
  { code: "E129", name: "Vermelho Allura", risk: "alto", description: "Corante associado a hiperatividade e sensibilidade alérgica." },
  { code: "E319", name: "TBHQ", risk: "alto", description: "Antioxidante sintético derivado do petróleo. Prejudicial ao sistema imune." },
  { code: "E250", name: "Nitrito de Sódio", risk: "medio", description: "Conservante em carnes processadas. Potencialmente carcinogênico." },
];

const supplements: Supplement[] = [
  {
    id: "magnesio-treonato",
    name: "Magnésio Treonato",
    category: "Cognicao",
    icon: <Brain className="w-4 h-4 text-cyan-400" />,
    shortDesc: "Melhora memória e sono profundo atravessando a barreira hematoencefálica.",
    benefits: ["Melhora memória", "Aumenta plasticidade sináptica", "Regula o sono profundo"],
    dosage: "144mg de magnésio elementar",
    timing: "30-60 min antes de dormir",
  },
  {
    id: "creatina",
    name: "Creatina Monohidratada",
    category: "Energia",
    icon: <Zap className="w-4 h-4 text-amber-400" />,
    shortDesc: "Combustível celular para cérebro e músculos.",
    benefits: ["Aumenta ATP cerebral", "Melhora raciocínio sob pressão", "Neuroprotetor"],
    dosage: "3-5g por dia",
    timing: "Qualquer horário",
  },
  {
    id: "omega3",
    name: "Ômega-3 (EPA/DHA)",
    category: "Cognicao",
    icon: <Brain className="w-4 h-4 text-blue-400" />,
    shortDesc: "Essencial para estrutura cerebral e redução de inflamação.",
    benefits: ["Estrutura membranas neuronais", "Anti-inflamatório", "Melhora humor"],
    dosage: "2-3g EPA+DHA",
    timing: "Com refeições gordurosas",
  },
];

const mockScanResults: ScanResult[] = [
  {
    productName: "Refrigerante Diet",
    score: 25,
    found: [{ code: "E951", name: "Aspartame", risk: "alto" }],
    safe: ["Água carbonatada", "Cafeína"],
    shopRecommendation: { name: "Kit Foco Total", reason: "Substitua químicos por nootrópicos reais." }
  }
];

// --- FUNÇÕES AUXILIARES ---
function getRiskColor(risk: string) {
  switch (risk) {
    case "alto": return { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" }
    case "medio": return { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" }
    default: return { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" }
  }
}

// --- COMPONENTES ---
function ScannerOverlay({ onClose, onScanComplete }: { onClose: () => void, onScanComplete: (result: ScanResult) => void }) {
  const [phase, setPhase] = useState<"scanning" | "done">("scanning")

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("done")
      setTimeout(() => {
        onScanComplete(mockScanResults[0])
        onClose()
      }, 800)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-lg">
       <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X /></button>
       <div className="relative w-72 h-72 border-2 border-cyan-500/30 rounded-3xl overflow-hidden bg-zinc-900/50">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {phase === "scanning" && (
            <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20 animate-bounce" style={{ animationDuration: '2s' }} />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className={`w-12 h-12 ${phase === 'scanning' ? 'text-cyan-400 animate-pulse' : 'text-emerald-400'}`} />
          </div>
       </div>
       <p className="mt-6 text-cyan-400 font-mono tracking-widest animate-pulse">
         {phase === "scanning" ? "ANALISANDO BIOMARCADORES..." : "SCAN CONCLUÍDO"}
       </p>
    </div>
  )
}

function ScanResultCard({ result, onShopClick, onProClick }: { result: ScanResult, onShopClick: () => void, onProClick: () => void }) {
  const risk = getRiskColor(result.score < 50 ? "alto" : "baixo")
  return (
    <div className="mt-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{result.productName}</h3>
        <div className={`px-3 py-1 rounded-full font-bold ${risk.bg} ${risk.text}`}>Score: {result.score}</div>
      </div>
      <div className="space-y-3">
        {result.found.map(f => (
          <div key={f.code} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-zinc-800">
            <Skull className="w-4 h-4 text-red-500" />
            <span className="text-sm flex-1">{f.name} ({f.code})</span>
            <span className="text-[10px] font-bold text-red-500 uppercase">Risco {f.risk}</span>
          </div>
        ))}
      </div>
      <button onClick={onShopClick} className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/20">
        Ver Alternativa de Elite
      </button>
    </div>
  )
}

export function BiohackerTracker({ onNavigateToShop }: { onNavigateToShop?: () => void }) {
  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [activeSection, setActiveSection] = useState<"aditivos" | "suplementos">("aditivos")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [proModalOpen, setProModalOpen] = useState(false)

  return (
    <section className="px-6 py-8 pb-32 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-cyan-500/10 rounded-lg"><Pill className="text-cyan-400 w-6 h-6" /></div>
        <div>
          <h2 className="text-xl font-bold">Biohacker Tracker</h2>
          <p className="text-zinc-500 text-xs">Escaneie rótulos e otimize sua biologia.</p>
        </div>
      </div>

      {/* CARD DO SCANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 mb-8 shadow-xl">
        <div className="flex items-start gap-4 mb-6">
           <div className="p-3 bg-cyan-500/20 rounded-2xl"><Camera className="text-cyan-400 w-6 h-6" /></div>
           <div className="flex-1">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded mb-2 inline-block">ACESSO LIVRE</span>
              <h3 className="font-bold text-white mb-1">Scanner de Rótulos</h3>
              <p className="text-zinc-400 text-xs">Identifique toxinas neuronais instantaneamente.</p>
           </div>
        </div>
        <button onClick={() => setScannerOpen(true)} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
          <ScanLine className="w-4 h-4" /> INICIAR SCANNER
        </button>
      </div>

      {scanResult && <ScanResultCard result={scanResult} onShopClick={() => onNavigateToShop?.()} onProClick={() => setProModalOpen(true)} />}
      {scannerOpen && <ScannerOverlay onClose={() => setScannerOpen(false)} onScanComplete={(res) => setScanResult(res)} />}

      {/* SELETOR DE SEÇÃO */}
      <div className="flex bg-zinc-900 p-1 rounded-2xl gap-1 mb-8">
        <button onClick={() => setActiveSection("aditivos")} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeSection === 'aditivos' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500'}`}>ADITIVOS</button>
        <button onClick={() => setActiveSection("suplementos")} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeSection === 'suplementos' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500'}`}>WIKI SUPLEMENTOS</button>
      </div>

      {/* LISTAS */}
      <div className="space-y-3">
        {activeSection === "aditivos" ? (
          harmfulAdditives.map(a => (
            <div key={a.code} className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
               <div className="flex items-center gap-3">
                  <span className="text-red-500 font-mono font-bold">{a.code}</span>
                  <span className="text-sm font-semibold flex-1">{a.name}</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500/50" />
               </div>
               <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{a.description}</p>
            </div>
          ))
        ) : (
          suplements.map(s => (
            <div key={s.id} className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg">{s.icon}</div>
                  <span className="text-sm font-semibold">{s.name}</span>
               </div>
               <p className="mt-2 text-xs text-zinc-500">{s.shortDesc}</p>
            </div>
          ))
        )}
      </div>

      <ProModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
    </section>
  )
}
