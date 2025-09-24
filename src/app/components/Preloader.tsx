"use client";
import { useState, useEffect } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";

interface PreloaderProps {
  onComplete: () => void;
}

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

const facts = [
  "Developers spend 80% thinking, 20% coding.",
  "Average developer drinks 4 cups of coffee daily.",
  "Even top devs write 15-50 bugs per 1000 lines.",
  "65% of developers prefer coding at night.",
  "Developers learn new tech every 2-5 years."
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Change facts every 2 seconds
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 2000);

    // Hide preloader after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade animation
    }, 8000);

    return () => {
      clearInterval(factInterval);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-50 bg-white transition-opacity duration-500 opacity-0 pointer-events-none">
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      {/* IconCloud */}
      <div className="relative flex items-center justify-center mb-8">
        <IconCloud images={images} />
      </div>
      
      {/* Facts Area */}
      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-lg font-semibold text-gray-800 mb-4">Did you know?</p>
        <div className="h-16 flex items-center justify-center">
          <p 
            key={currentFact}
            className="text-sm text-gray-600 leading-relaxed animate-fade-in"
          >
            {facts[currentFact]}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
