"use client";

import Slider from "react-slick";
import Image from "next/image";
import React from "react";
import { carrouselItems } from "@/features/carrousel/interfaceCarrousel";

interface CarouselProps {
  items: carrouselItems[];
}

export default function Carrousel({ items }: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 relative">
      <Slider {...settings}>
        {items.map((src, index) => (
          <div
            key={src.idCarrousel ?? index}
            className="relative h-[400px] sm:h-[400px] md:h-[500px]"
          >
            <Image
              src={src.imageUrl}
              alt={src.titulo ?? `Slide ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
