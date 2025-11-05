import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/logo.svg";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Checkout from "./Checkout";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const cartItems = useQuery(api.cart.getCart) || [];
  const clearCart = useMutation(api.cart.clearCart);
  const updateQuantity = useMutation(api.cart.updateQuantity);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity({ productId: id, quantity });
  };

  const handleClear = () => clearCart();

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setShowCart(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
        setShowCheckout(false);
      }
    };
    if (showCart || showCheckout) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart, showCheckout]);

  // Prevent body scroll when checkout is open
  useEffect(() => {
    if (showCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCheckout]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-primary font-texts shadow-lg z-50">
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

            {/* Cart Icon */}
            <div className="relative ml-auto lg:ml-0" ref={cartRef}>
              <button
                className="relative text-white"
                aria-label="Shopping cart"
                onClick={() => {
                  setShowCart((prev) => !prev);
                  setShowCheckout(false);
                }}
              >
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop: Cart Dropdown & Checkout Side by Side */}
              {showCart && (
                <div className="hidden lg:flex absolute right-0 mt-6 z-50">
                  {/* Cart Dropdown */}
                  <div className="w-80 bg-white text-black rounded-lg shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg tracking-wider uppercase">
                        Cart ({cartCount})
                      </h3>
                      <button
                        onClick={handleClear}
                        className="text-gray-500 text-sm hover:text-accent"
                      >
                        Remove all
                      </button>
                    </div>

                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-400 py-8">
                        Your cart is empty.
                      </p>
                    ) : (
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div>
                                <p className="font-semibold text-sm">
                                  {item.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  ${item.price}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {cartItems.length > 0 && (
                      <>
                        <div className="flex justify-between items-center mt-6 mb-4">
                          <span className="uppercase text-gray-500 text-sm">
                            Total
                          </span>
                          <span className="font-bold text-lg">
                            $
                            {cartItems
                              .reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                              )
                              .toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={handleCheckoutClick}
                          className="block w-full bg-accent text-white py-3 rounded-md uppercase tracking-widest hover:bg-orange-400 transition"
                        >
                          Checkout
                        </button>
                      </>
                    )}
                  </div>

                  {/* Checkout Component */}
                  {showCheckout && (
                    <Checkout
                      cartItems={cartItems}
                      onClose={handleCloseCheckout}
                      isMobile={false}
                    />
                  )}
                </div>
              )}

              {/* Mobile: Cart & Checkout */}
              {showCart && (
                <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-black/50 overflow-y-auto">
                  <div className="min-h-full p-6 flex flex-col md:flex-row md:justify-end gap-4">
                    {/* Checkout Component (Left on Mobile) */}
                    {showCheckout && (
                      <div className="md:order-1">
                        <Checkout
                          cartItems={cartItems}
                          onClose={handleCloseCheckout}
                          isMobile={true}
                        />
                      </div>
                    )}
                    
                    {/* Cart Dropdown (Right on Mobile) */}
                    <div className="bg-white text-black rounded-lg shadow-xl p-6 md:order-2 w-full md:w-80">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg tracking-wider uppercase">
                          Cart ({cartCount})
                        </h3>
                        <button
                          onClick={handleClear}
                          className="text-gray-500 text-sm hover:text-accent"
                        >
                          Remove all
                        </button>
                      </div>

                      {cartItems.length === 0 ? (
                        <p className="text-center text-gray-400 py-8">
                          Your cart is empty.
                        </p>
                      ) : (
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div
                              key={item._id}
                              className="flex justify-between items-center"
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-semibold text-sm">
                                    {item.name}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    ${item.price}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.productId,
                                      item.quantity - 1
                                    )
                                  }
                                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.productId,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {cartItems.length > 0 && (
                        <>
                          <div className="flex justify-between items-center mt-6 mb-4">
                            <span className="uppercase text-gray-500 text-sm">
                              Total
                            </span>
                            <span className="font-bold text-lg">
                              $
                              {cartItems
                                .reduce(
                                  (sum, item) => sum + item.price * item.quantity,
                                  0
                                )
                                .toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={handleCheckoutClick}
                            className="block w-full bg-accent text-white py-3 rounded-md uppercase tracking-widest hover:bg-orange-400 transition"
                          >
                            Checkout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden fixed top-20 left-0 w-full bg-primary shadow-lg z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
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

      {/* Spacer */}
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;