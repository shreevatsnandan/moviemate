"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const videoUrls = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  "https://www.youtube.com/embed/LXb3EKWsInQ",
  "https://www.youtube.com/embed/ysz5S6PUM-U",
  "https://www.youtube.com/embed/tgbNymZ7vqY",
  "https://www.youtube.com/embed/eX2qFMC8cFo",
  "https://www.youtube.com/embed/kJQP7kiw5Fk",
  "https://www.youtube.com/embed/6ZfuNTqbHE8",
  "https://www.youtube.com/embed/6ZfuNTqbHE8",
];

const TrailerCarousel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");

  const openModal = (videoUrl: any) => {
    setActiveVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveVideo("");
  };

  return (
    <div className="flex justify-center relative bottom-25">
      <div className="flex justify-center w-[70vw]  bg-[#d96c2c] items-center px-5 py-15 ">
        <Carousel className="max-w-4xl relative top-10">
          <CarouselPrevious>
            <Button variant="outline">Prev</Button>
          </CarouselPrevious>

          <CarouselContent>
            {videoUrls.map((url, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 cursor-pointer"
                onClick={() => openModal(url)}
              >
                <img
                  src={`https://img.youtube.com/vi/${url
                    .split("/")
                    .pop()}/mqdefault.jpg`}
                  alt={`Video ${index + 1}`}
                  className="rounded-md w-full h-44 object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext>
            <Button variant="outline">Next</Button>
          </CarouselNext>
        </Carousel>

        {/* Dialog for Playing Video */}
        <Dialog open={isOpen} onOpenChange={closeModal}>
          <DialogContent className="p-0 w-7xl rounded-none">
            {activeVideo && (
              <div className="aspect-video w-full">
                <iframe
                  src={`${activeVideo}`}
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-none"
                ></iframe>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TrailerCarousel;
