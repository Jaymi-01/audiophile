import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import Headphones1 from "../../images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg";
import Headphones2 from "../../images/product-xx59-headphones/mobile/image-category-page-preview.jpg";
import Headphones3 from "../../images/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg";
import Speaker from "../../images/product-zx9-speaker/mobile/image-product.jpg";
import ManMobile from "../../images/product-xx59-headphones/mobile/image-gallery-1.jpg";
import Image1Mobile from "../../images/product-xx59-headphones/mobile/image-gallery-2.jpg";
import Image2Mobile from "../../images/product-xx59-headphones/mobile/image-gallery-3.jpg";
import ManDesktop from "../../images/product-xx59-headphones/desktop/image-gallery-1.jpg";
import Image1Desktop from "../../images/product-xx59-headphones/desktop/image-gallery-2.jpg";
import Image2Desktop from "../../images/product-xx59-headphones/desktop/image-gallery-3.jpg";
import Footer from "../home/Footer";
import Gadgets from "../home/Gadgets";

interface Product {
  id: number;
  image: string;
  label?: string;
  title: string;
  description: string;
  amount: number;
}

const XX59: React.FC = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.innerWidth >= 1024
  );

  // Convex mutation
  const addToCart = useMutation(api.cart.addToCart);

  const product: Product = {
    id: 1,
    image: Headphones2,
    label: "NEW PRODUCT",
    title: "XX59 HEADPHONES",
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    amount: 899,
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleGoBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  };

  // ✅ ADD TO CART FUNCTION
  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id.toString(),
        name: product.title,
        price: product.amount,
        image: product.image,
        quantity,
      });
      ;
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const galleryImages = isDesktop
    ? [ManDesktop, Image1Desktop, Image2Desktop]
    : [ManMobile, Image1Mobile, Image2Mobile];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-24">
        <button
          onClick={handleGoBack}
          className="text-[15px] font-medium text-black/60 hover:text-accent transition pb-14"
        >
          Go Back
        </button>

        <div className="space-y-24 lg:space-y-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch">
            <div className="w-full lg:w-1/2 flex items-stretch">
              <div className="bg-lightGray rounded-lg flex items-center justify-center w-full h-80 sm:h-[400px] lg:h-[500px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-auto h-full max-h-[400px] object-contain"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center">
              <div className="text-left lg:text-center w-full">
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
                  ${product.amount}
                </p>

                <div className="flex flex-row gap-4 items-center justify-center lg:justify-start">
                  <div className="flex items-center justify-between bg-lightGray rounded-lg px-4 py-4 w-32">
                    <button
                      onClick={handleDecrease}
                      className="text-black/60 hover:text-accent transition"
                    >
                      <FiMinus size={18} />
                    </button>
                    <span className="text-black font-medium">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="text-black/60 hover:text-accent transition"
                    >
                      <FiPlus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="inline-block bg-accent text-white py-4 px-8 rounded-lg hover:bg-secondary transition-colors font-bold tracking-wider text-sm"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="py-24 lg:py-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black mb-6">FEATURES</h2>
              <p className="text-black/50 text-[15px] leading-[25px] mb-6">
                These headphones have been created from durable, high-quality
                materials tough enough to take anywhere. Its compact folding
                design fuses comfort and minimalist style making it perfect for
                travel. Flawless transmission is assured by the latest wireless
                technology engineered for audio synchronization with videos.
              </p>
              <p className="text-black/50 text-[15px] leading-[25px]">
                More than a simple pair of headphones, this headset features a
                pair of built-in microphones for clear, hands-free calling when
                paired with a compatible smartphone. Controlling music and calls
                is also intuitive thanks to easy-access touch buttons on the
                earcups. Regardless of how you use the XX59 headphones, you can
                do so all day thanks to an impressive 30-hour battery life that
                can be rapidly recharged via USB-C.
              </p>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black mb-6">IN THE BOX</h2>
              <ul className="list-none space-y-2">
                {[
                  ["1X", "Headphone Unit"],
                  ["2X", "Replacement Earcups"],
                  ["1X", "User Manual"],
                  ["1X", "3.5mm 5m Audio Cable"],
                ].map(([count, item]) => (
                  <li key={item} className="opacity-50 leading-[25px]">
                    <span className="font-bold mr-5 text-accent">{count}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* GALLERY SECTION */}
        <div className="space-y-24 lg:space-y-32">
          <div className="flex flex-col lg:flex-row lg:flex-2 gap-5 lg:gap-8">
            <div className="flex flex-col gap-5 lg:gap-8">
              <img className="rounded-lg" src={galleryImages[0]} alt="Gallery 1" />
              <img className="rounded-lg" src={galleryImages[1]} alt="Gallery 2" />
            </div>
            <div>
              <img className="rounded-lg" src={galleryImages[2]} alt="Gallery 3" />
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="py-24 lg:py-32">
          <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide mb-12">
            YOU MAY ALSO LIKE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-lightGray rounded-lg flex items-center justify-center w-full aspect-square overflow-hidden">
                <img
                  src={Headphones1}
                  alt="XX99 Mark II"
                  className="w-4/5 h-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold tracking-wide mt-6 mb-4">
                XX99 MARK II
              </h3>
              <Link
                to="/headphones/xx99-mark-ii"
                className="inline-block bg-accent text-white py-3 px-8 rounded-lg hover:bg-secondary transition-colors font-bold tracking-wider text-sm"
              >
                SEE PRODUCT
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-lightGray rounded-lg flex items-center justify-center w-full aspect-square overflow-hidden">
                <img
                  src={Headphones3}
                  alt="XX99 MARK I"
                  className="w-4/5 h-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold tracking-wide mt-6 mb-4">
                XX99 MARK I
              </h3>
              <Link
                to="/headphones/xx99-mark-i"
                className="inline-block bg-accent text-white py-3 px-8 rounded-lg hover:bg-secondary transition-colors font-bold tracking-wider text-sm"
              >
                SEE PRODUCT
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-lightGray rounded-lg flex items-center justify-center w-full aspect-square overflow-hidden">
                <img
                  src={Speaker}
                  alt="ZX9 Speaker"
                  className="w-4/5 h-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold tracking-wide mt-6 mb-4">
                ZX9 SPEAKER
              </h3>
              <Link
                to="/speaker/zx9speaker"
                className="inline-block bg-accent text-white py-3 px-8 rounded-lg hover:bg-secondary transition-colors font-bold tracking-wider text-sm"
              >
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Gadgets />
      <Footer />
    </section>
  );
};

export default XX59;
