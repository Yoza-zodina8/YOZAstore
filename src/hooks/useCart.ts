import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  name: string;
  price: number;
  qty: number;
  image: string;
  color?: string;
  category?: string;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  useEffect(() => {
    loadCart();
    const handler = () => loadCart();
    window.addEventListener("storage", handler);
    window.addEventListener("cart-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("cart-updated", handler);
    };
  }, [loadCart]);

  const addToCart = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const idx = existing.findIndex((i) => i.name === item.name);
    if (idx >= 0) {
      existing[idx].qty += item.qty || 1;
    } else {
      existing.push({ ...item, qty: item.qty || 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existing));
    setCart(existing);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const changeQty = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].qty += delta;
    if (updated[index].qty <= 0) updated.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return { cart, addToCart, removeItem, changeQty, clearCart, totalQty, subtotal, loadCart };
}
