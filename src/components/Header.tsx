import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/logo.svg";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full font-texts bg-primary shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between h-20 lg:h-24 relative">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden text-white z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="lg:relative lg:left-0 absolute left-1/2 transform -translate-x-1/2 lg:translate-x-0">
              <img src={Logo} alt="Audiophile Logo" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 font-texts text-sm absolute left-1/2 transform -translate-x-1/2">
              {[
                { to: "/", label: "HOME" },
                { to: "/headphones", label: "HEADPHONES" },
                { to: "/speakers", label: "SPEAKERS" },
                { to: "/earphones", label: "EARPHONES" },
              ].map(({ to, label }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-accent" : "text-white"
                    } text-sm tracking-widest transition hover:text-accent`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <button
              className="text-white ml-auto lg:ml-0"
              aria-label="Shopping cart"
            >
              <FiShoppingCart size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed font-texts top-20 left-0 w-full bg-primary shadow-lg z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col w-full text-center py-8 space-y-6">
          {[
            { to: "/", label: "HOME" },
            { to: "/headphones", label: "HEADPHONES" },
            { to: "/speakers", label: "SPEAKERS" },
            { to: "/earphones", label: "EARPHONES" },
          ].map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              end={to === "/"}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-white font-bold text-lg tracking-widest transition hover:text-accent ${
                  isActive ? "text-accent" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;
