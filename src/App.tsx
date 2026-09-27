import React, { useState } from 'react'
import { ReloadPrompt } from './components/ReloadPrompt'
import { Navbar, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import { usePWAInstall } from './hooks/usePWAInstall'
import {
  Sparkles,
  Zap,
  Smartphone,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle,
  FolderGit2,
} from 'lucide-react'
import { GpsCard } from './components/ui/GpsCard'

export function App(): React.JSX.Element {
  const isOnline = useNetworkStatus()
  const { canInstall, isInstalled, promptToInstall } = usePWAInstall()
  const [activeTab, setActiveTab] = useState('overview')
  const [items, setItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('pwa_demo_notes')
    return saved ? JSON.parse(saved) : ['Offline note 1', 'PWA works without internet']
  })
  const [newNote, setNewNote] = useState('')

  const addNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return
    const updated = [...items, newNote.trim()]
    setItems(updated)
    localStorage.setItem('pwa_demo_notes', JSON.stringify(updated))
    setNewNote('')
  }

  return (
    <div className="min-h-screen bg-[var(--color-primary-light)] text-[var(--color-white)] flex flex-col selection:bg-[var(--color-accent-alt)]/30 selection:text-[var(--color-white)]">
      {/* Responsive Navbar */}
      <Navbar
        isOnline={isOnline}
        canInstall={canInstall}
        isInstalled={isInstalled}
        onInstall={promptToInstall}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-4">

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-white)] leading-tight">
            Vigyázó Mancsok <br className="hidden sm:inline" />
            <span className="text-2xl font-semibold text-[var(--color-text)]">
              Kóbor háziállat kereső alkalmazás
            </span>
          </h1>
        </section>

        {/* Gps Card */}
        <GpsCard />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)]/40 py-6 mt-12 text-center text-xs text-[var(--color-border)]">
        copyright &copy; 2026 <a href="_blank" target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:underline">
          Vigyázó Mancsok Állatvédő Egyesület
        </a>
      </footer>

      {/* PWA Update / Offline Toast */}
      <ReloadPrompt />
    </div>
  )
}

export default App
