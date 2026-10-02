import React from "react";
import { Card, CardContent, CardTitle } from "./Card";
import { AlertCircle, MapPin } from "lucide-react";

interface GpsCardProps {
    userLocation: { latitude: number; longitude: number } | null;
    locationError: string | null;
    onRetry: () => void;
}

export const GpsCard: React.FC<GpsCardProps> = ({ userLocation, locationError, onRetry }) => {

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
                            <div className='mx-2 mt-4 flex items-start justify-between gap-3 text-sm text-[#A65335]' role='alert'>
                                <p className='flex items-start gap-2'>
                                    <AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]' aria-hidden='true' />
                                    <span>{locationError}</span>
                                </p>
                                <button
                                    type='button'
                                    onClick={onRetry}
                                    className='shrink-0 font-semibold text-[var(--color-primary)] underline underline-offset-2'
                                >
                                    Újrapróbálás
                                </button>
                            </div>
                        )}
          </Card>
        </section>
    )
}
