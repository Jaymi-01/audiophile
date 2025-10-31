import React, { useState, useEffect } from 'react';
import Headset1 from '../../images/headset-home.png';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      label: "NEW PRODUCT",
      title: "XX99 MARK II HEADPHONES",
      description: "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
      image: Headset1
    },
    {
      id: 2,
      label: "PREMIUM QUALITY",
      title: "ZX9 SPEAKER",
      description: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop"
    },
    {
      id: 3,
      label: "WIRELESS FREEDOM",
      title: "YX1 WIRELESS EARPHONES",
      description: "Tailor-made for an active lifestyle with incredible sound quality and long battery life.",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop"
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="bg-gray-900 text-white relative overflow-hidden">
      <div className="relative h-[500px] lg:h-[650px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="lg:hidden absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover opacity-30"
              />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-24 h-full flex items-center relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                <div className="text-center lg:text-left">
                  <p className="text-white text-sm lg:text-md font-texts font-normal space-x-6 mb-4 lg:mb-6 opacity-50">
                    {slide.label}
                  </p>
                  <h1 className="text-4xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-gray-300 mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0 text-sm lg:text-base opacity-75 leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 lg:py-4 px-6 lg:px-8 tracking-widest text-xs lg:text-sm transition">
                    SEE PRODUCT
                  </button>
                </div>
                {/* Desktop: Image on right */}
                <div className="hidden lg:flex justify-center lg:justify-end">
                  <div className="relative w-96 h-96">
                    <div className="absolute inset-0 bg-gray-700 opacity-10 scale-110"></div>
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="relative w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default HeroSlider;