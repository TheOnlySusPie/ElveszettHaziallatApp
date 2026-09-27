import React from "react";
import { Button } from "./Button";
import { Card, CardContent, CardTitle } from "./Card";
import { CameraIcon, RotateCcw } from "lucide-react";

interface CameraCardProps {
  onImageChange?: (image: string | null) => void;
}

export default function CameraCard({ onImageChange }: CameraCardProps): React.JSX.Element {
  const cameraInputRef = React.useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [cameraError, setCameraError] = React.useState<string | null>(null);

  const openNativeCamera = () => {
    setCameraError(null);
    cameraInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : null;
      setCapturedImage(image);
      onImageChange?.(image);
    };
    reader.onerror = () => {
      setCameraError("Nem sikerült betölteni a készített fotót.");
    };
    reader.readAsDataURL(file);
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setCameraError(null);
    onImageChange?.(null);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };

  return (
    <Card className='max-w-2xl mx-auto border-[var(--color-secondary)] pt-5'>
        <CardTitle className='mx-2 flex items-center gap-2 text-lg font-semibold'>
            <CameraIcon className='h-5 w-5 text-[var(--color-primary)]' aria-hidden='true' />
            Kamera funkció
        </CardTitle>
        <CardContent className='mt-5 space-y-4'>
          <div className='overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]'>
            {capturedImage ? (
              <img src={capturedImage} alt='A készített állatfotó előnézete' className='aspect-video w-full object-cover' />
            ) : (
              <div className='flex aspect-video items-center justify-center px-6 text-center text-sm text-[var(--color-text-muted)]'>
                Készíts fotót az állatról a natív kamera használatával.
              </div>
            )}
          </div>

          <input
            ref={cameraInputRef}
            type='file'
            accept='image/*'
            capture='environment'
            onChange={handleImageUpload}
            className='hidden'
          />

          <div className='flex flex-wrap justify-center gap-3'>
            <Button type='button' onClick={openNativeCamera}>
              <CameraIcon className='h-4 w-4' aria-hidden='true' />
              {capturedImage ? "Új fotó készítése" : "Kamera megnyitása"}
            </Button>
            {capturedImage && (
              <Button type='button' variant='outline' onClick={resetCapture}>
                <RotateCcw className='h-4 w-4' aria-hidden='true' />
                Új fotó
              </Button>
            )}
          </div>

          {cameraError && (
            <p className='text-center text-sm text-[#A65335]' role='alert'>{cameraError}</p>
          )}
        </CardContent>
    </Card>
  );
}