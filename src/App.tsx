import React, { useEffect, useState } from 'react'
import { ReloadPrompt } from './components/ReloadPrompt'
import { MapView } from './components/ui/MapView'
import { ClipboardList, Map, PawPrint, Settings, UserRound } from 'lucide-react'

export function App(): React.JSX.Element {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [locationRequest, setLocationRequest] = useState(0)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('A böngésző nem támogatja a helymeghatározást.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLocationError(null)
      },
      (error) => {
        setLocationError(error.message || 'Nem sikerült lekérni a helyzetet.')
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 300000 },
    )
  }, [locationRequest])

  return (
    <div className="map-app">
      <main className="map-main">
        {userLocation ? (
          <MapView userLocation={userLocation} />
        ) : (
          <div className="map-loading" role="status">
            <PawPrint aria-hidden="true" />
            <strong>Helyzet lekérése...</strong>
            {locationError && (
              <>
                <span>{locationError}</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocationError(null)
                    setLocationRequest((request) => request + 1)
                  }}
                >
                  Újrapróbálás
                </button>
              </>
            )}
          </div>
        )}
      </main>

      <nav className="map-bottom-nav" aria-label="Fő navigáció">
        <button className="map-nav-item is-active" type="button">
          <Map aria-hidden="true" />
          <span>Térkép</span>
        </button>
        <button className="map-nav-item" type="button">
          <ClipboardList aria-hidden="true" />
          <span>Bejelentés</span>
        </button>
        <button className="map-nav-item" type="button">
          <Settings aria-hidden="true" />
          <span>Beállítások</span>
        </button>
        <button className="map-nav-item" type="button">
          <UserRound aria-hidden="true" />
          <span>Profil</span>
        </button>
      </nav>

      {/* PWA Update / Offline Toast */}
      <ReloadPrompt />
    </div>
  )
}

export default App
