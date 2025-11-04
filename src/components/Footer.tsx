import React, { FC } from "react";
import Logo from "../assets/logo.svg";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-primary text-white font-texts">
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-12 lg:py-16">
        <div className="hidden lg:block">
          <div className="flex justify-between items-start mb-8">
            <div>
              <img src={Logo} alt="Audiophile" className="h-8" />
            </div>
            <nav className="flex gap-8 uppercase text-sm font-bold tracking-wider">
              <a href="/" className="hover:text-orange-500 transition">
                Home
              </a>
              <a
                href="/headphones"
                className="hover:text-orange-500 transition"
              >
                Headphones
              </a>
              <a href="/speakers" className="hover:text-orange-500 transition">
                Speakers
              </a>
              <a href="/earphones" className="hover:text-orange-500 transition">
                Earphones
              </a>
            </nav>
          </div>

          <div className="flex justify-between items-end mb-12">
            <p className="text-white opacity-50 max-w-md leading-relaxed">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we're open 7 days a week.
            </p>
            <div className="flex gap-4 text-2xl">
              <a
                href="#"
                className="hover:text-orange-500 transition"
                aria-label="Facebook"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white opacity-50 text-sm font-bold">
              Copyright 2021. All Rights Reserved
            </p>
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center text-center space-y-8">
          <div>
            <img src={Logo} alt="Audiophile" className="h-8" />
          </div>

          <nav className="flex flex-col gap-4 uppercase text-sm font-bold tracking-wider">
            <a href="/" className="hover:text-orange-500 transition">
              Home
            </a>
            <a href="/headphones" className="hover:text-orange-500 transition">
              Headphones
            </a>
            <a href="/speakers" className="hover:text-orange-500 transition">
              Speakers
            </a>
            <a href="/earphones" className="hover:text-orange-500 transition">
              Earphones
            </a>
          </nav>

          <p className="text-gray-400 leading-relaxed">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we're open 7 days a week.
          </p>

          <p className="text-gray-500 text-sm font-bold">
            Copyright 2021. All Rights Reserved
          </p>

          <div className="flex gap-4 text-2xl">
            <a
              href="#"
              className="hover:text-orange-500 transition"
              aria-label="Facebook"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="#"
              className="hover:text-orange-500 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-orange-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
