import React, { FC } from "react";
import Logo from "../assets/logo.svg";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <>
      <div className="bg-primary text-white font-texts">
        <div className="max-w-6xl mx-auto px-6 lg:px-24 py-8">
          <div className=" text-center flex flex-col lg:flex-row lg:justify-between items-center lg:items-start space-y-8 lg:space-y-0">
            <div>
              <img src={Logo} alt="" />
            </div>
            <div className="flex flex-col gap-4 ">
              <a href="/">Home</a>
              <a href="/headphones">Headphones</a>
              <a href="/speakers">Speakers</a>
              <a href="/earphones">Earphones</a>
            </div>
            <div>
              <p>
                Audiophile is an all in one stop to fulfill your audio needs.
                We're a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we’re open 7 days a week.
              </p>
            </div>
            <div>
                <h1 className="text-sm opacity-50 font-bold">Copyright 2021. All Rights Reserved</h1>
            </div>
            <div className="flex items-center jus">
                <a className="h-6 w-26" href="#"><FaFacebookSquare /></a>
                <a className="h-6 w-26" href="#"><FaTwitter /></a>
                <a className="h-6 w-26" href="#"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
