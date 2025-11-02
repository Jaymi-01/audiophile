import React from "react";
import { Link } from "react-router-dom";
import Headphones1 from "../../images/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg";
import Headphones2 from "../../images/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg";
import Headphones3 from "../../images/product-xx59-headphones/desktop/image-category-page-preview.jpg";
interface Product {
  id: number;
  image: string;
  label?: string;
  title: string;
  description: string;
  link: string;
}

const NewProduct: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      image: Headphones1,
      label: "NEW PRODUCT",
      title: "XX99 Mark II Headphones",
      description:
        "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
      link: "/headphones/xx99-mark-ii",
    },
    {
      id: 2,
      image: Headphones2,
      label: "NEW PRODUCT",
      title: "XX99 Mark I Headphones",
      description:
        "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
      link: "/headphones/xx99-mark-i",
    },
    {
      id: 3,
      image: Headphones3,
      label: "NEW PRODUCT",
      title: "XX59 Headphones",
      description:
        "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
      link: "/headphones/xx59",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-24">
        <div className="space-y-24 lg:space-y-32">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
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
