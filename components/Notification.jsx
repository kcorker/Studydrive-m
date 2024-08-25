"use client";

import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Link from "next/link";

const notifications = [
  { message: "New course on Web Development!", link: "/post/web-development" },
  { message: "50% off on Data Science courses!", link: "/post/data-science" },
  { message: "New UI/UX Design workshop available!", link: "/post/design" },
];

export default function Notification() {
  const [currentNotification, setCurrentNotification] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prevIndex) =>
        prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Adjust this duration if needed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-md p-3 flex items-center space-x-3">
        {/* Notification Icon */}
        <div className="text-blue-500">
          <FaBell size={24} />
        </div>

        {/* Notification Message */}
        <div className="relative w-full h-8 overflow-hidden">
          <div
            className="absolute w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(-${currentNotification * 100}%)` }}
          >
            {notifications.map((notification, index) => (
              <Link href={notification.link} key={index}>
                <a className="block h-8 flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  {notification.message}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}