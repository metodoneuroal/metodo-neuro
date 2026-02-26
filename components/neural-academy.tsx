"use client"

import { useState, useMemo } from "react"
import { GraduationCap, Play, Clock, X, Lock, Crown, ChevronRight, PlayCircle } from "lucide-react"
import {
  videoLinks,
  isYouTubeUrl,
  isGoogleDriveUrl,
  getYouTubeEmbedUrl,
  getYouTubeVideoId,
  getGoogleDrivePreviewUrl,
  type VideoLink,
} from "@/lib/media-links"
import { ProModal } from "@/components/pro-modal"

// Função para identificar o primeiro vídeo de cada categoria (Liberados)
function getFirstPerCategory(videos: VideoLink[]): Set<string> {
  const seen = new Set<string>()
  const firstIds = new Set<string>()
  for (const v of videos) {
    const cat = v.category || "__none__"
    if (!seen.has(cat)) {
      seen.add(cat)
      firstIds.add(v.id)
    }
  }
  return firstIds
}

export function NeuralAcademy() {
  const [activeVideo, setActiveVideo] = useState<VideoLink | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("Todos")
  const [proModalOpen, setProModalOpen] = useState(false)

  const freeVideoIds = useMemo(() => getFirstPerCategory(videoLinks), [])
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(videoLinks.map(v => v.category).filter(Boolean)))], [])
  
  const filteredVideos = useMemo(() => 
    activeCategory === "Todos" ? videoLinks : videoLinks.filter(v => v.category === activeCategory)
  , [activeCategory])

  return (
    <section className="px-5 mt-6 pb-28">
      {/* HEADER ESTRATÉGICO */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 border border-primary/30">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-tighter">Neural Academy</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
              {videoLinks.length - freeVideoIds.size} Aulas Elite Bloqueadas
            </p>
          </div>
        </div>
      </div>

      {/* FILTROS NEON */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
              activeCategory === cat
                ? "bg-primary text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                : "bg-secondary/40 text-muted-foreground border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LISTA DE VÍDEOS */}
      <div className="space-y-4">
        {filteredVideos.map((video) => {
          const isFree = freeVideoIds.has(video.id)
          const videoId = getYouTubeVideoId(video.url)

          return (
            <div
              key={video.id}
              onClick={() => isFree ? setActiveVideo(video) : setProModalOpen(true)}
              className={`group relative flex items-center gap-4 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isFree 
                ? "bg-secondary/20 border-primary/20 hover:border-primary/50" 
                : "bg-black/40 border-white/5 opacity-70"
              }`}
            >
              {/* THUMBNAIL COM OVERLAY */}
              <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black">
                {videoId ? (
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                    className={`w-full h-full object-cover ${!isFree && 'blur-sm opacity-50'}`}
                    alt="" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <PlayCircle className="w-8 h-8 text-primary/20" />
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  {isFree ? (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <Lock className="w-3 h-3 text-amber-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* INFO DA AULA */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {isFree ? (
                    <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded uppercase">Grátis</span>
                  ) : (
                    <span className="flex items-center gap-1 text-[8px] font-black bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded uppercase">
                      <Crown className="w-2 h-2" /> Elite
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-muted-foreground">{video.duration}</span>
                </div>
                <h3 className="text-xs font-bold text-white leading-tight mb-1 line-clamp-2 uppercase italic">{video.title}</h3>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{video.description}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-colors" />
            </div>
          )
        })}
      </div>

      {/* MODAL DE PLAYER (Ajustado para o modo Guerrilha) */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl">
            <button onClick={() => setActiveVideo(null)} className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video rounded-3xl overflow-hidden border border-primary/30 shadow-[0_0_50px_rgba(0,212,255,0.2)]">
              <iframe
                src={getYouTubeEmbedUrl(activeVideo.url)}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-black text-white italic uppercase">{activeVideo.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      <ProModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
    </section>
  )
}
