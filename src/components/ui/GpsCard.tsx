import React from "react"; 
import { Card, CardContent, CardTitle } from "./Card";
import { AlertCircle, MapPin } from "lucide-react";

interface GpsCardProps {
    onLocationChange?: (location: { latitude: number; longitude: number } | null) => void;
}

export const GpsCard: React.FC<GpsCardProps> = ({ onLocationChange }) => {
    const [userLocation, setUserLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);
    const [locationError, setLocationError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("A böngésző nem támogatja a helymeghatározást.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setUserLocation(location);
                onLocationChange?.(location);
            },
            (error) => {
                setLocationError(error.message || "Nem sikerült lekérni a helyzetet.");
            }
        );
    }, []);

    return(
       <section id="storage-demo" className="pt-2">
                    <Card className='max-w-2xl mx-auto border-[var(--color-secondary)] pt-5'>
                        <CardTitle className='mx-2 flex items-center gap-2 text-lg font-semibold'>
                            <MapPin className='h-5 w-5 text-[var(--color-primary)]' aria-hidden='true' />
                            GPS koordináták
                        </CardTitle>
                        <p className='mx-2 mt-1 text-sm text-[var(--color-text-muted)]'>A jelenlegi tartózkodási helyed</p>

                        <CardContent className='mt-5 grid grid-cols-2 gap-3'>
                            <div className='min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-center'>
                                <p className='text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]'>Szélesség</p>
                                <p className='mt-2 truncate text-lg font-semibold tabular-nums text-[var(--color-text)]'>
                                    {userLocation ? userLocation.latitude.toFixed(6) : "..."}
                                </p>
                            </div>
                            <div className='min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-center'>
                                <p className='text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]'>Hosszúság</p>
                                <p className='mt-2 truncate text-lg font-semibold tabular-nums text-[var(--color-text)]'>
                                    {userLocation ? userLocation.longitude.toFixed(6) : "..."}
                                </p>
                            </div>
                        </CardContent>

                        {locationError && (
                            <p className='mx-2 mt-4 flex items-start gap-2 text-sm text-[#A65335]' role='alert'>
                                <AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]' aria-hidden='true' />
                                <span>{locationError}</span>
                            </p>
                        )}
          </Card>
        </section>
    )
}
