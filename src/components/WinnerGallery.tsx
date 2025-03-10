
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WinnerGalleryProps {
  photos: string[];
}

const WinnerGallery: React.FC<WinnerGalleryProps> = ({ photos }) => {
  if (photos.length === 0) return null;

  return (
    <Card className="w-full bg-slate-900/50 border-slate-700 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Ganadores</CardTitle>
        <CardDescription className="text-gray-300">
          Fotos de los últimos ganadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32 w-full rounded-md">
          <div className="flex space-x-2 p-1">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 relative rounded-lg overflow-hidden w-28 h-28 border border-slate-600"
              >
                <img 
                  src={photo} 
                  alt={`Ganador ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WinnerGallery;
