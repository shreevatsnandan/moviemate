"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

interface BannerItem {
  image: string;
  heading: string;
  subheading: string;
  category: string;
  btnLink: string;
  btnText: string;
}

const BannerCarousel = () => {
  const banners: BannerItem[] = [
    {
      image: "/images/banner1.jpg",
      heading: "Squid Game",
      subheading: "Directed by: Hwang Dong-hyuk",
      category: "Drama | Thriller",
      btnLink: "/squid-game",
      btnText: "Get Tickets"
    },
    {
      image: "/images/banner2.jpg",
      heading: "Spider-Man",
      subheading: "Directed by: Sam Raimi",
      category: "Action | Superhero",
      btnLink: "/spider-man",
      btnText: "Get Tickets"
    },
    {
      image: "/images/banner3.jpg",
      heading: "300",
      subheading: "Directed by: Zack Snyder",
      category: "Action | Historical",
      btnLink: "/300",
      btnText: "Get Tickets"
    }
  ];

  const plugin = useRef( 
    Autoplay({ delay: 1100, stopOnInteraction: true })
  );

  return (
    <div className="w-full h-[80vh] md:h-screen overflow-hidden relative">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-screen"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="h-screen">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="h-full p-0 relative">
              {/* Background image container */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={banner.image}
                  alt={`${banner.heading} banner`}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              {/* Content container - centered */}
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-3xl mx-auto w-full">
                  {/* Left-aligned category */}
                  
                  <span className="text-sm md:text-base font-grace tracking-widest text-red-500 mb-2 inline-block">
                  {banner.category}
                  </span>
                  <div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 text-white">
                      {banner.heading}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                      {banner.subheading}
                    </p>
                    <Button
                            size="lg"
                            className="px-10 rounded-none py-8 text-lg bg-[#d96c2c] hover:bg-[#b3551e] transition-colors"
                          >
                      <a href={banner.btnLink}>
                        {banner.btnText}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 size-12 z-10 hidden sm:inline-flex" />
        <CarouselNext className="right-4 size-12 z-10 hidden sm:inline-flex" />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;