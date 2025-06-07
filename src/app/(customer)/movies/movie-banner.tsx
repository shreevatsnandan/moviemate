"use client"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MovieBannerProps {
  movie_id: number;
  className?: string;
  movie_title?: string; // Added movie_title prop
}

export function MovieBanner({ movie_id, className, movie_title }: MovieBannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=YOUR_TMDB_API_KEY`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch movie banner");
        }

        const data = await response.json();
        const backdrop = data.backdrops?.[0]?.file_path;
        
        if (backdrop) {
          setBannerUrl(`https://image.tmdb.org/t/p/original${backdrop}`);
        } else {
          setError("No banner available for this movie");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, [movie_id]);

  if (isLoading) {
    return (
      <div 
        className={cn(
          "w-full h-[50vh] bg-muted animate-pulse",
          className
        )}
      />
    );
  }

  if (!error) { 
    return (
      <div 
        className={cn(
          "w-full h-[50vh] bg-muted flex items-center justify-center",
          className
        )}
      >
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-[60vh] overflow-hidden", className)}>
      <Image
        src={bannerUrl || "/images/banner1.jpg"}
        alt="Movie banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 pl-20 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">{"Lights, Camera, Your Choice!"}</h1>
        </div>
      
    </div>
  );
}