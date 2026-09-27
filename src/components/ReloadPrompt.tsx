import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import './ReloadPrompt.css'

export const ReloadPrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registered:', r)
    },
    onRegisterError(error) {
      console.error('Service Worker registration failed:', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) {
    return null
  }

  return (
    <div className="pwa-toast" role="alert" aria-live="assertive">
      <div className="pwa-toast-message">
        {offlineReady ? (
          <span>⚡ App is ready to work offline</span>
        ) : (
          <span>✨ New content available, click reload to update!</span>
        )}
      </div>
      <div className="pwa-toast-buttons">
        {needRefresh && (
          <button
            className="pwa-btn pwa-btn-reload"
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </button>
        )}
        <button className="pwa-btn pwa-btn-close" onClick={close}>
          Dismiss
        </button>
      </div>
    </div>
  )
}
