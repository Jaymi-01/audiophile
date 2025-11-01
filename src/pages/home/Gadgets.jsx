import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Headphones from "../../images/shared/desktop/image-category-thumbnail-headphones.png";
import Speakers from "../../images/shared/desktop/image-category-thumbnail-speakers.png";
import Earphones from "../../images/shared/desktop/image-category-thumbnail-earphones.png";

const Gadgets = () => {
  const categories = [
    {
      id: 1,
      name: "HEADPHONES",
      image: Headphones,
      link: "/headphones",
    },
    {
      id: 2,
      name: "SPEAKERS",
      image: Speakers,
      link: "/speakers",
    },
    {
      id: 3,
      name: "EARPHONES",
      image: Earphones,
      link: "/earphones",
    },
  ];

  return (
    <section className="pt-24 lg:pt-24">
      <div className="max-w-6xl pl-6 pr-6 lg:pr-0 lg:pl-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group bg-lightGray rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative pt-20 pb-6 px-6">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-10">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                <h3 className="text-center text-black font-bold text-sm tracking-[1.071px] mb-3 mt-12">
                  {category.name}
                </h3>

                <div className="flex items-center justify-center gap-2 text-darkGray group-hover:text-accent transition-colors">
                  <span className="text-xs font-bold tracking-[1px] opacity-50 group-hover:opacity-100">
                    SHOP
                  </span>
                  <FiChevronRight
                    size={16}
                    className="text-accent group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gadgets;
