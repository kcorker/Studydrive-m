"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import banner from "@/public/assets/banner.png"; // Importing the local image correctly

const bannerData = [
  {
    src: banner,
    link: "/courses/web-development",
  },
  {
    src: banner,
    link: "/courses/data-science",
  },
  {
    src: banner,
    link: "/courses/design",
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 relative overflow-hidden">
      {bannerData.map((banner, index) => (
        <a
          href={banner.link}
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.src}
            alt={`Banner ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
        </a>
      ))}
    </div>
  );
}