import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cart = useQuery(api.cart.getCart);

  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const refreshCart = () => {
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
