import React from "react";
import { Link } from "react-router-dom";
import Earphones from "../../images/product-yx1-earphones/mobile/image-category-page-preview.jpg";

const NewProduct = () => {
  const products = [
    {
      id: 1,
      image: Earphones,
      label: "NEW PRODUCT",
      title: "YX1 WIRELESS EARPHONES",
      description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
      link: "/earphones/yx1"
    }
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-24">
        <div className="space-y-24 lg:space-y-32">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="bg-lightGray rounded-lg p-8 lg:p-16 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-auto max-w-sm object-contain"
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
                  <p className="text-black/50 text-[15px] font-normal leading-[25px] mb-6 lg:mb-10">
                    {product.description}
                  </p>
                  <Link
                    to={product.link}
                    className="inline-block bg-accent text-white py-4 px-8 rounded-lg hover:bg-secondary transition-colors font-bold tracking-wider text-sm"
                  >
                    SEE PRODUCT
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProduct;