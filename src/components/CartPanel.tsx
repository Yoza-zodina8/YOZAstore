import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

const CartPanel = ({ open, onClose }: CartPanelProps) => {
  const { cart, removeItem, subtotal } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="fixed right-0 top-0 w-[350px] h-screen bg-yoza-cream shadow-[-5px_0_20px_rgba(0,0,0,0.2)] p-5 z-[1000] overflow-y-auto rounded-tl-[20px] rounded-bl-[20px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-semibold mb-4 text-foreground">Shopping Cart</h3>
      {cart.map((item, index) => (
        <div key={index} className="flex items-center mb-3 border-b border-border pb-3">
          <img src={item.image} alt={item.name} className="w-[50px] rounded-md" />
          <div className="flex-1 ml-3">
            <strong className="text-sm">{item.name}</strong><br />
            <span className="text-xs">Qty: {item.qty}</span>{" "}
            <button onClick={() => removeItem(index)} className="text-destructive text-xs cursor-pointer bg-transparent border-none">
              Remove
            </button>
          </div>
          <div className="text-sm font-medium">₹{(item.price * item.qty).toFixed(2)}</div>
        </div>
      ))}
      <div className="mt-4 border-t border-border pt-4">
        <strong>Subtotal: ₹{subtotal.toFixed(2)}</strong>
        <Link
          to="/checkout"
          onClick={onClose}
          className="block text-center mt-4 w-full py-3 bg-foreground text-primary-foreground rounded-md no-underline font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPanel;
