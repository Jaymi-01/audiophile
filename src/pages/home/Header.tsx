import React from "react";
import Headset1 from "../../images/home/mobile/image-header.jpg";
import Headset2 from "../../images/home/desktop/image-hero.jpg";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-header text-white relative overflow-hidden">
      <div className="relative h-[500px] lg:h-[750px]">
        {/* Mobile Image */}
        <div className="lg:hidden absolute inset-0 -top-20">
          <img
            src={Headset1}
            alt="XX99 MARK II HEADPHONES"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:block absolute inset-0">
          <img
            src={Headset2}
            alt="XX99 MARK II HEADPHONES"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-6 lg:px-24 h-full flex items-center relative z-10">
          <div className="w-full lg:max-w-lg">
            <div className="text-center lg:text-left">
              <p className="text-white text-sm lg:text-md font-normal tracking-[10px] mb-4 lg:mb-6 opacity-50">
                NEW PRODUCT
              </p>

              <h1 className="text-white text-4xl lg:text-6xl font-bold mb-6 lg:mb-8 tracking-[1.286px] leading-tight">
                XX99 MARK II HEADPHONES
              </h1>

              <p className="text-white mb-8 lg:mb-10 max-w-md font-normal mx-auto lg:mx-0 text-sm lg:text-base opacity-75 leading-relaxed">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>

              <Link to="headphones/xx99-mark-ii" className="bg-accent hover:bg-secondary text-white font-bold py-4 px-8 tracking-[1px] text-sm lg:text-lg transition">
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
