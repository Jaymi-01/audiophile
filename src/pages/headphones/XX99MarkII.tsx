import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import Headphones1 from "../../images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg";

const XX99MarkII = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    image: Headphones1,
    label: "NEW PRODUCT",
    title: "XX99 Mark II Headphones",
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    amount: "$ 2,999",
    link: "/cart/cart.jsx",
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-24">
        <button
          onClick={() => {
            if (window.history.state?.idx > 0) navigate(-1);
            else navigate("/");
          }}
          className="text-[15px] font-medium text-black/60 hover:text-accent transition pb-14"
        >
          Go Back
        </button>

        <div className="space-y-24 lg:space-y-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch">
            <div className="w-full lg:w-1/2 flex items-stretch">
              <div className="bg-lightGray rounded-lg flex items-center justify-center w-full h-[320px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-auto h-full max-h-[400px] object-contain"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center">
              <div className="text-center lg:text-left w-full">
                {product.label && (
                  <h2 className="text-accent text-sm font-normal tracking-[10px] mb-4 lg:mb-6">
                    {product.label}
                  </h2>
                )}
                <h1 className="text-black text-3xl lg:text-4xl font-bold tracking-wide mb-6 lg:mb-8">
                  {product.title}
                </h1>
                <p className="text-black/50 text-[15px] font-normal leading-[25px] mb-6 lg:mb-11">
                  {product.description}
                </p>
                <p className="text-black text-[15px] font-bold leading-normal tracking-[1.286px] mb-6 lg:mb-11">
                  {product.amount}
                </p>

                <div className="flex flex-row gap-4 items-center justify-center lg:justify-start">
                  <div className="flex items-center justify-between bg-lightGray rounded-lg px-4 py-4 w-32">
                    <button
                      onClick={handleDecrease}
                      className="text-black/60 hover:text-accent transition"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={18} />
                    </button>
                    <span className="text-black font-medium">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="text-black/60 hover:text-accent transition"
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={18} />
                    </button>
                  </div>

                  <Link
                    to={product.link}
                    className="inline-block bg-accent text-white py-4 px-8 rounded-lg hover:bg-secondary transition-colors font-bold tracking-wider text-sm"
                  >
                    ADD TO CART
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-24 lg:py-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black mb-6">FEATURES</h2>
              <p className="text-black/50 text-[15px] font-normal leading-[25px] mb-6">
                Connect via Bluetooth or nearly any wired source. This speaker
                features optical, digital coaxial, USB Type-B, stereo RCA, and
                stereo XLR inputs, allowing you to have up to five wired source
                devices connected for easy switching. Improved bluetooth
                technology offers near lossless audio quality at up to 328ft
                (100m).
              </p>
              <p className="text-black/50 text-[15px] font-normal leading-[25px]">
                Discover clear, more natural sounding highs than the competition
                with ZX9’s signature planar diaphragm tweeter. Equally important
                is its powerful room-shaking bass courtesy of a 6.5” aluminum
                alloy bass unit. You’ll be able to enjoy equal sound quality
                whether in a large room or small den. Furthermore, you will
                experience new sensations from old songs since it can respond to
                even the subtle waveforms.
              </p>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black mb-6">IN THE BOX</h2>
              <ul className="list-none space-y-2">
                <li className="opacity-50 font-normal leading-[25px]">
                  <span className="font-bold mr-5 text-accent">2X</span>Speaker
                  Unit
                </li>
                <li className="opacity-50 font-normal leading-[25px]">
                  <span className="font-bold mr-5 text-accent">2X</span>Speaker
                  Cloth Panel
                </li>
                <li className="opacity-50 font-normal leading-[25px]">
                  <span className="font-bold mr-5 text-accent">1X</span>User
                  Manual
                </li>
                <li className="opacity-50 font-normal leading-[25px]">
                  <span className="font-bold mr-5 text-accent">1X</span>3.5mm
                  7.5m Audio Cable
                </li>
                <li className="opacity-50 font-normal leading-[25px]">
                  <span className="font-bold mr-5 text-accent">1X</span>7.5m
                  Optical Cable
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-24 lg:py-32"></div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:flex-2">
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default XX99MarkII;
