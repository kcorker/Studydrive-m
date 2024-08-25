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
    <div className="relative w-full flex flex-col items-center">
      {/* Banner Section */}
      <div className="relative w-full flex justify-center">
        <a href={bannerData[currentIndex].link}>
          <Image
            src={bannerData[currentIndex].src}
            alt={`Banner ${currentIndex + 1}`}
            width={1024} // Set this to your image's actual width
            height={576} // Set this to your image's actual height
            objectFit="contain" // Maintains the aspect ratio
            priority
            quality={100}
          />
        </a>
      </div>

      {/* Dots Section */}
      <div className="flex mt-3 space-x-2">
        {bannerData.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}