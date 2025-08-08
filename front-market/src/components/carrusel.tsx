import Slider from "react-slick";
import Image from "next/image";
import React from "react";

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-[300px]">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
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
