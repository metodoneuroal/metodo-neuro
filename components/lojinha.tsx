"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ShoppingBag,
  ExternalLink,
  Star,
  Tag,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  image: string
  rating: number
  reviews: number
  badge?: string
  badgeColor?: string
  buyUrl: string
}

// CONFIGURAÇÃO DOS SEUS KITS DO MERCADO LIVRE
const products: Product[] = [
  {
    id: "kit-foco",
    name: "Kit Foco Total (Elite)",
    description: "Nootrópicos de alta pureza para maximizar foco e eliminar a neblina mental.",
    price: "R$ 197,00",
    originalPrice: "R$ 297,00",
    image: "/images/kit-foco.jpg",
    rating: 4.9,
    reviews: 128,
    badge: "Mais Vendido",
    badgeColor: "#00D4FF",
    buyUrl: "https://www.mercadolivre.com.br", // <-- Substitua pelo seu link de afiliado ML
  },
  {
    id: "magnesio",
    name: "Magnésio Treonato Neural",
    description: "O único que atravessa a barreira hematoencefálica. Upgrade no sono e memória.",
    price: "R$ 89,90",
    image: "/images/magnesio-treonato.jpg",
    rating: 4.8,
    reviews: 95,
    badge: "Essencial",
    badgeColor: "#34D399",
    buyUrl: "https://www.mercadolivre.com.br",
  },
  {
    id: "ebook",
    name: "Protocolos Biohacking 2.0",
    description: "O mapa completo para hackear sua biologia. 50+ protocolos práticos.",
    price: "R$ 47,00",
    originalPrice: "R$ 97,00",
    image: "/images/ebook-biohacking.jpg",
    rating: 4.7,
    reviews: 214,
    badge: "Oportunidade",
    badgeColor: "#F59E0B",
    buyUrl: "https://www.mercadolivre.com.br",
  },
]

// CONFIGURAÇÃO DO SEU WHATSAPP DE VENDAS
const WHATSAPP_NUMBER = "5511999999999" // <-- Coloque seu número aqui
const WHATSAPP_MESSAGE = "Fala! Vim pelo app Método Neural e quero minha Consultoria de Performance."

export function Lojinha() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="px-5 pt-2 pb-32 relative">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <ShoppingBag className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm font-semibold text-foreground">Curadoria Neural</h2>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 border border-border/40">
           <ShieldCheck className="w-3 h-3 text-primary" />
           <span className="text-[10px] text-muted-foreground font-medium">Original</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-5 ml-[42px]">Suplementação e ferramentas testadas pelo Método.</p>

      <div className="space-y-4">
        {products.map((product) => (
          <article key={product.id} className="relative rounded-2xl border border-border/50 bg-card/80 overflow-hidden shadow-lg shadow-black/20">
            {product.badge && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: `${product.badgeColor}20`, color: product.badgeColor }}>
                <Tag className="w-2.5 h-2.5" /> {product.badge}
              </div>
            )}

            <div className="relative w-full h-44 bg-secondary/20">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-xs">Foto do Produto</div>
              <Image src={product.image} alt={product.name} fill className="object-cover opacity-80" />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-bold text-foreground mb-1">{product.name}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-1.5 mb-3">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] text-muted-foreground font-mono">{product.rating} | {product.reviews} avaliações</span>
              </div>

              <div className="flex items-end justify-between border-t border-border/30 pt-3">
                <div className="flex flex-col">
                  {product.originalPrice && <span className="text-[10px] text-muted-foreground/60 line-through">{product.originalPrice}</span>}
                  <span className="text-lg font-black text-primary">{product.price}</span>
                </div>

                <a href={product.buyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground neon-glow transition-all active:scale-[0.95]">
                  <ExternalLink className="w-3.5 h-3.5" /> Comprar no ML
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* BOTÃO FLUTUANTE DE CONSULTORIA */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-24 right-4 z-50 flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] active:scale-[0.95] transition-all animate-bounce-subtle">
        <div className="relative">
          <MessageCircle className="w-5 h-5" fill="white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#25D366]"></span>
        </div>
        <span>Consultoria de Performance</span>
      </a>
    </section>
  )
}
