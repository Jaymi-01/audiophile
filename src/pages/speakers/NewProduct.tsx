import React from "react";
import { Link } from "react-router-dom";
import Speaker1 from "../../images/product-zx9-speaker/mobile/image-category-page-preview.jpg";
import Speaker2 from "../../images/product-zx7-speaker/desktop/image-category-page-preview.jpg";

const NewProduct = () => {
  const products = [
    {
      id: 1,
      image: Speaker1,
      label: "NEW PRODUCT",
      title: "ZX9 SPEAKERS",
      description: "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
      link: "/speakers/zx9"
    },
    {
      id: 2,
      image: Speaker2,
      label: "NEW PRODUCT",
      title: "ZX7 SPEAKER",
      description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
      link: "/speakers/zx7"
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