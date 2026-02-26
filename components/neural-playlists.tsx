"use client"

import { useState } from "react"
import { Play, Headset, Zap, Moon, X, Music } from "lucide-react"

const playlists = [
{
id: "foco-extremo",
title: "Foco Extremo",
desc: "Ondas Gamma para trabalho profundo.",
icon: <Zap className="w-4 h-4 text-cyan-400" />,
url: "",
},
{
id: "sono-delta",
title: "Sono Delta",
desc: "Frequências para reparo neuronal.",
icon: <Moon className="w-4 h-4 text-indigo-400" />,
url: "",
},
{
id: "bio-hacking",
title: "Biohacking Alpha",
desc: "Estado de relaxamento alerta.",
icon: <Music className="w-4 h-4 text-emerald-400" />,
url: "",
},
]

export function NeuralPlaylists() {
const [activeUrl, setActiveUrl] = useState<string | null>(null)

return (
<section className="px-5 py-4">
<div className="flex items-center gap-2 mb-4">
<div className="p-1.5 bg-cyan-500/10 rounded-lg">
<Headset className="w-4 h-4 text-cyan-500" />
</div>
<h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
Neural Playlists
</h2>
</div>

)
}
