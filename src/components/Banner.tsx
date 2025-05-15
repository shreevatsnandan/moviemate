import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";

const BannerCarousel = () => {
  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg"
  ];

  return (
    <div className="w-full h-full mx-auto">
      <Carousel className="overflow-hidden">
         <CarouselContent>
        {banners.map((banner, index) => (
            <CarouselItem>
            <Card key={index} className="w-full h-screen">
            <CardContent className="p-0">
              <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
            </CardContent>
          </Card>
          </CarouselItem>
        ))}
        </CarouselContent>
          <CarouselPrevious />
  <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
