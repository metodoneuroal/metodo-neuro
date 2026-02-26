"use client"

import { Home, ShoppingBag, GraduationCap, Activity } from "lucide-react"

export type Tab = "home" | "academy" | "braindump" | "tracker" | "lojinha"

function BrainIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#00D4FF" : "#6B7084"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C8.5 2 6 4.5 6 7.5c0 1.5.5 2.8 1.3 3.8C6.5 12.2 6 13.5 6 15c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-2.8-1.3-3.7.8-1 1.3-2.3 1.3-3.8C18 4.5 15.5 2 12 2z" />
      <path d="M12 2v19" opacity="0.5" />
      <path d="M8 8c1.5 0 2.5 1 4 1s2.5-1 4-1" opacity="0.5" />
      <path d="M8 14c1.5 0 2.5 1 4 1s2.5-1 4-1" opacity="0.5" />
    </svg>
  )
}

interface NavItem {
  id: Tab
  label: string
  icon: (active: boolean) => React.ReactNode
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: (active) => <Home className="w-[20px] h-[20px]" strokeWidth={active ? 2 : 1.8} />,
  },
  {
    id: "academy",
    label: "Academy",
    icon: (active) => <GraduationCap className="w-[20px] h-[20px]" strokeWidth={active ? 2 : 1.8} />,
  },
  {
    id: "braindump",
    label: "Brain Dump",
    icon: (active) => <BrainIcon active={active} />,
  },
  {
    id: "tracker",
    label: "Tracker",
    icon: (active) => <Activity className="w-[20px] h-[20px]" strokeWidth={active ? 2 : 1.8} />,
  },
  {
    id: "lojinha",
    label: "Lojinha",
    icon: (active) => <ShoppingBag className="w-[20px] h-[20px]" strokeWidth={active ? 2 : 1.8} />,
  },
]

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50" role="navigation" aria-label="Menu principal">
      {/* Top fade gradient */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden="true" />

      {/* Nav bar */}
      <div className="glass-card border-t border-border/50 px-1 pb-[env(safe-area-inset-bottom,8px)]">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-2xl transition-all duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary/60 blur-sm" aria-hidden="true" />
                )}
                {item.icon(isActive)}
                <span
                  className={`text-[9px] font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
