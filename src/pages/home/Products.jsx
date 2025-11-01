import React from "react";
import { Link } from "react-router-dom";
import Speakers from "../../images/product-zx9-speaker/mobile/image-product.png";
import InnerCircle from "../../images/Oval.png";
import OuterCircle from "../../images/Oval Copy.png";
import MobileSpeakerImage from "../../images/home/mobile/image-speaker-zx7.jpg";
import DesktopSpeakerImage from "../../images/home/desktop/image-speaker-zx7.jpg";
import MobileEarphone from "../../images/home/mobile/image-earphones-yx1.jpg";
// import DesktopEarphone from '../../images/zx7-speaker/desktop/image-earphones-yx1.jpg';

const Products = () => {
  return (
    <section className="pt-24 lg:pt-32 relative overflow-hidden">
      <div className="max-w-6xl pl-6 pr-6 lg:pr-0 lg:pl-24">
        {/* ZX9 Speaker Section */}
        {/* Desktop layout */}
        <div className="hidden lg:flex items-end justify-between gap-8 bg-accent rounded-lg overflow-hidden relative px-16 h-[420px]">
          <div className="relative z-10 self-end">
            <img
              src={Speakers}
              alt="ZX9 Speaker"
              className="w-[410.23px] h-[493px] translate-y-31"
            />
          </div>

          <div className="relative z-10 text-white text-left max-w-md pb-10">
            <h3 className="font-bold text-5xl mb-6 leading-tight tracking-wide">
              ZX9 SPEAKER
            </h3>
            <p className="text-white/80 mb-8 leading-relaxed text-lg">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link
              to="/speakers/zx9"
              className="inline-block bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-all font-semibold tracking-wider"
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="relative bg-accent rounded-lg text-center py-20 px-6 lg:hidden overflow-hidden">
          <img
            src={OuterCircle}
            alt="Outer Circle"
            className="absolute top-0 left-0 w-full h-auto opacity-40"
          />
          <div className="relative -top-15 flex justify-center items-center z-10">
            <img
              src={InnerCircle}
              alt="Inner Circle"
              className="absolute w-[420px] sm:w-[500px] opacity-70"
            />
            <img
              src={Speakers}
              alt="Speakers"
              className="relative w-[340px] sm:w-[400px] z-20"
            />
          </div>

          <div className="relative z-30 text-white tracking-[1.286px] leading-10">
            <h3 className="font-bold text-4xl mb-3 px-8 items-center">
              ZX9 SPEAKER
            </h3>
            <p className="text-white/75 text-sm mb-6 font-normal leading-[25px]">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link
              to="/speakers/zx9"
              className="inline-block bg-black text-white py-3 px-6 tracking-[1] leading-normal rounded-lg hover:bg-gray-800 transition-all font-bold"
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>

        {/* ZX7 Speaker Section */}
        <div className="relative rounded-lg overflow-hidden h-80 lg:h-96 mt-12 lg:mt-16">
          {/* Mobile Background Image */}
          <div className="lg:hidden absolute inset-0">
            <img
              src={MobileSpeakerImage}
              alt="ZX7 Speaker"
              className="w-full h-full object-cover object-left"
            />
          </div>

          {/* Desktop Background Image */}
          <div className="hidden lg:block absolute inset-0">
            <img
              src={DesktopSpeakerImage}
              alt="ZX7 Speaker"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="px-8 lg:px-16">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-wider mb-6 lg:mb-8">
                ZX7 SPEAKER
              </h2>

              <Link
                to="/speakers/zx7"
                className="inline-block border-2 border-black bg-transparent hover:bg-black hover:text-white text-black font-bold py-3 px-8 tracking-wider text-sm transition-all duration-300"
              >
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>

        {/* YX1 Earphones Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-16">
          <div className="rounded-lg overflow-hidden h-52 lg:h-80">
            <img
              src={MobileEarphone}
              alt="YX1 Earphones"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-lightGray rounded-lg flex items-center h-52 lg:h-80">
            <div className="px-8 lg:px-16">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-wider mb-6 lg:mb-8">
                YX1 EARPHONES
              </h2>

              <Link
                to="/earphones/yx1"
                className="inline-block border-2 border-black bg-transparent hover:bg-black hover:text-white text-black font-bold py-3 px-8 tracking-wider text-sm transition-all duration-300"
              >
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
