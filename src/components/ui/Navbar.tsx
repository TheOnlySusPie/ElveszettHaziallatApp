import React, { useState } from 'react'
import {
  Menu,
  X,
  Download,
  Wifi,
  WifiOff,
  CheckCircle2,
  Sparkles,
  Layers,
  Database,
  ExternalLink,
} from 'lucide-react'
import { Button } from './Button'

export interface NavbarProps {
  isOnline: boolean
  canInstall: boolean
  isInstalled: boolean
  onInstall: () => void
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  isOnline,
  canInstall,
  isInstalled,
  onInstall,
  activeTab = 'overview',
  onTabChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'features', label: 'PWA Features', icon: Layers },
    { id: 'storage', label: 'Offline Store', icon: Database },
  ]

  const handleNavClick = (id: string) => {
    if (onTabChange) {
      onTabChange(id)
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-primary)] bg-[var(--color-primary)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('overview')
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--color-accent-alt)] flex items-center justify-center p-0.5 shadow-md shadow-black/15 group-hover:scale-105 transition-transform">
                <img src="/favicon.svg" alt="React PWA" className="w-full h-full rounded-[10px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[var(--color-white)] text-base tracking-tight leading-none group-hover:text-[var(--color-accent-alt)] transition-colors">
                  Vigyázó
                </span>
                <span className="text-[11px] text-[var(--color-border)] font-medium">Mancsok</span>
              </div>
            </a>
          </div>

          {/* Right-side Utilities & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Network Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                isOnline
                  ? 'bg-[var(--color-accent-alt)]/15 text-[var(--color-accent-alt)] border-[var(--color-accent-alt)]/30'
                  : 'bg-[var(--color-accent)]/20 text-[var(--color-white)] border-[var(--color-accent)]/50 animate-pulse'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline</span>
                </>
              )}
            </div>

            {/* PWA Install Button */}
            {canInstall && (
              <Button size="sm" variant="primary" onClick={onInstall}>
                <Download className="w-3.5 h-3.5" />
                Install App
              </Button>
            )}

            {isInstalled && (
              <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent-alt)] bg-[var(--color-accent-alt)]/15 border border-[var(--color-accent-alt)]/30 px-2.5 py-1 rounded-full font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Installed</span>
              </div>
            )}

            {/* GitHub/Docs Link */}
            <a
              href="https://vite-pwa-org.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[var(--color-border)] hover:text-[var(--color-white)] hover:bg-[var(--color-primary-light)] rounded-lg transition-colors"
              title="Vite PWA Docs"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <div
              className={`inline-flex items-center p-1.5 rounded-full border text-xs ${
                isOnline
                  ? 'bg-[var(--color-accent-alt)]/15 text-[var(--color-accent-alt)] border-[var(--color-accent-alt)]/30'
                  : 'bg-[var(--color-accent)]/20 text-[var(--color-white)] border-[var(--color-accent)]/50'
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--color-border)] hover:text-[var(--color-white)] hover:bg-[var(--color-primary-light)] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[var(--color-primary-light)] bg-[var(--color-primary)] px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeTab === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full text-left ${
                    isActive
                      ? 'text-[var(--color-accent-alt)] bg-[var(--color-accent-alt)]/15'
                      : 'text-[var(--color-border)] hover:text-[var(--color-white)] hover:bg-[var(--color-primary-light)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              )
            })}
          </div>

          {/* Mobile Install Button */}
          {canInstall && (
            <div className="pt-2 border-t border-[var(--color-primary-light)]">
              <Button size="md" variant="primary" className="w-full" onClick={onInstall}>
                <Download className="w-4 h-4" />
                Install Progressive Web App
              </Button>
            </div>
          )}

          {isInstalled && (
            <div className="flex items-center justify-center gap-2 py-2 text-xs text-[var(--color-accent-alt)] bg-[var(--color-accent-alt)]/15 border border-[var(--color-accent-alt)]/30 rounded-lg font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Running as Installed PWA</span>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
