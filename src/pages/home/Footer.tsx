import React from "react";
import Man from "../../images/man.png";

const Footer: React.FC = () => {
  return (
    <section className="py-24 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-24">
        <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div className="shrink-0 w-full lg:w-1/2 flex justify-center">
            <img
              src={Man}
              alt="Man"
              className="w-full max-w-[400px] lg:max-w-[500px] h-auto object-contain rounded-lg"
            />
          </div>

          <div className="text-center lg:text-left w-full lg:w-1/2">
            <h2 className="text-[28px] md:text-4xl font-bold tracking-[1px] leading-normal mb-6 uppercase">
              Bringing you the <span className="text-accent">best</span> audio
              gear
            </h2>
            <p className="text-[15px] font-normal opacity-70 leading-[25px]">
              Located at the heart of New York City, Audiophile is the premier
              store for high-end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
