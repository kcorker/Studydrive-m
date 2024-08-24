import Feed from "@/components/Feed";
import { useState } from "react";
import Image from "next/image";

// Sample banner data
const bannerData = [
  {
    src: "/images/banner1.jpg",
    link: "/courses/web-development",
  },
  {
    src: "/images/banner2.jpg",
    link: "/courses/data-science",
  },
  {
    src: "/images/banner3.jpg",
    link: "/courses/design",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the banner every 5 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:flex">
      {/* Banner Section */}
      <div className="w-full h-64 relative">
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
            />
          </a>
        ))}
      </div>

      {/* Feed Section */}
      <div>
        <Feed
          label="Discover Courses"
          styleHead="mt-3"
          style="md:grid-cols-5 mt-4 gap-1.5 justify-between md:justify-start"
        />
      </div>
    </div>
  );
}