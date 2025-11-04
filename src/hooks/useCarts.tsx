import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useCart = () => {
  const cart = useQuery(api.cart.getCart);
  const addToCart = useMutation(api.cart.addToCart);
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const clearCart = useMutation(api.cart.clearCart);

  return {
    cart: cart ?? [],
    addToCart,
    updateQuantity,
    clearCart,
  };
};
