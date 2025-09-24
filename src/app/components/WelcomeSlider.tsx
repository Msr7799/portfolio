"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  title: string;
  number: string;
}

const slides: Slide[] = [
  { id: 1, image: "/img/bg-img/1.gif", title: "Collections", number: "01" },
  { id: 2, image: "/img/bg-img/2.png", title: "AlF.LaM.MeM", number: "02" },
  { id: 3, image: "/img/bg-img/3.gif", title: "Atlas AI", number: "03" },
  { id: 4, image: "/img/bg-img/4.png", title: "AI Expert", number: "04" },
  { id: 5, image: "/img/bg-img/5.png", title: "Quran Data API", number: "05" },
  { id: 6, image: "/img/bg-img/6.png", title: "softWare Engineer & developer", number: "06" },
  { id: 7, image: "/img/bg-img/7.png", title: "code in many languages", number: "07" },
  { id: 8, image: "/img/bg-img/8.png", title: "UI & UX Designer", number: "08" },
  { id: 9, image: "/img/bg-img/9.png", title: "Believe you can fly", number: "09" },
  { id: 10, image: "/img/bg-img/10.gif", title: "Tech I'm good at", number: "10" },
];

export default function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="welcome-area h-screen relative overflow-hidden">
      {/* Slider Container */}
      <div className="h-full relative">
        {/* Slides */}
        <div className="carousel-inner h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 h-full transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div 
                className="h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Slide Content */}
                <div className="carousel-content h-full flex items-center justify-start">
                  <div className="slide-text text-center text-white relative top-2">
                    <span className="text-4xl md:text-6xl font-thin mb-4 block opacity-80">
                      {slide.number}.
                    </span>
                    <h2 className="text-5xl z-30 p-5 bg-primary-glow md:text-7xl lg:text-8xl font-bold tracking-wider">
                      {slide.title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                index === currentSlide 
                  ? 'border-white scale-110' 
                  : 'border-white/50 hover:border-white/80'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-3xl transition-colors"
          onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          aria-label="Previous slide"
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-3xl transition-colors"
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          aria-label="Next slide"
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
