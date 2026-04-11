import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, changeQty, removeItem, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", address: "",
  });
  const [processing, setProcessing] = useState(false);

  const total = subtotal + shipping;

  useEffect(() => {
    if (user?.email) {
      setForm((f) => ({ ...f, email: user.email || "" }));
    }
  }, [user]);

  const generateOrderID = () => "ORD" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

  const handleCheckout = async () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.email || !form.address) {
      toast.error("⚠️ Please fill in all fields.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setProcessing(true);
    const orderID = generateOrderID();

    // Store order in localStorage for the orders page
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderData = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      orderID,
      delivery: shipping === 0 ? "Store pickup - FREE" : "Delivery at home - ₹10",
      payment: "UPI",
      address: form.address,
      total: total.toFixed(2),
      cart,
      userId: user?.id || null,
      createdAt: new Date().toISOString(),
    };

    existingOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Load Razorpay
    try {
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        toast.error("Payment gateway failed to load. Please try again.");
        setProcessing(false);
        return;
      }

      const options = {
        key: "rzp_test_XXXXXXXXXXXXXXX", // Replace with your Razorpay key
        amount: Math.round(total * 100),
        currency: "INR",
        name: "YOZA Store",
        description: `Order ${orderID}`,
        handler: function () {
          toast.success("✅ Payment successful! Order placed.");
          clearCart();
          navigate("/orders");
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#8d6e63" },
        method: { upi: true, card: true, netbanking: true, wallet: true },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled.");
            setProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      toast.error("❌ Payment failed. Please try again.");
    }
    setProcessing(false);
  };

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-[1000px] mx-auto bg-card rounded-2xl shadow-sm overflow-hidden">
        <h1 className="p-5 text-2xl font-bold text-foreground bg-yoza-navbar border-b border-border">
          My Cart
        </h1>

        {/* Cart table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yoza-section-light">
                <th className="p-4 text-left text-sm font-semibold text-foreground">PRODUCT</th>
                <th className="p-4 text-left text-sm font-semibold text-foreground">PRICE</th>
                <th className="p-4 text-left text-sm font-semibold text-foreground">QTY</th>
                <th className="p-4 text-left text-sm font-semibold text-foreground">TOTAL</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-[60px] rounded-xl border-2 border-yoza-navbar" />
                      ) : (
                        <div className="w-[60px] h-[60px] bg-yoza-navbar rounded-xl flex items-center justify-center text-2xl">📦</div>
                      )}
                      <div>
                        <strong className="text-sm">{item.name}</strong><br />
                        <small className="text-muted-foreground">Color: {item.color || "Default"}</small>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">₹{item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(index, -1)} className="w-7 h-7 rounded-full bg-yoza-navbar border-none font-semibold text-foreground cursor-pointer">−</button>
                      <span className="text-sm">{item.qty}</span>
                      <button onClick={() => changeQty(index, 1)} className="w-7 h-7 rounded-full bg-yoza-navbar border-none font-semibold text-foreground cursor-pointer">+</button>
                    </div>
                  </td>
                  <td className="p-4 text-sm">₹{(item.price * item.qty).toFixed(2)}</td>
                  <td className="p-4">
                    <button onClick={() => removeItem(index)} className="text-destructive text-lg cursor-pointer bg-transparent border-none">×</button>
                  </td>
                </tr>
              ))}
              {cart.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Your cart is empty.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Customer Info */}
        <div className="p-5">
          <h3 className="mb-3 text-lg font-semibold text-foreground">Customer Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full p-3 border border-border rounded-xl text-sm bg-card text-foreground" />
            <input type="text" placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full p-3 border border-border rounded-xl text-sm bg-card text-foreground" />
            <input type="text" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 border border-border rounded-xl text-sm bg-card text-foreground" />
            <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-border rounded-xl text-sm bg-card text-foreground" />
            <input type="text" placeholder="Full Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-3 border border-border rounded-xl text-sm sm:col-span-2 bg-card text-foreground" />
          </div>
        </div>

        {/* Shipping */}
        <div className="p-5 bg-yoza-section-light mx-5 rounded-2xl flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 text-sm text-yoza-brown-muted cursor-pointer">
              <input type="radio" name="shipping" value="0" checked={shipping === 0} onChange={() => setShipping(0)} />
              Store pickup - FREE
            </label>
            <label className="flex items-center gap-3 text-sm text-yoza-brown-muted cursor-pointer">
              <input type="radio" name="shipping" value="10" checked={shipping === 10} onChange={() => setShipping(10)} />
              Delivery at home - ₹10
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="p-5 bg-yoza-cream border-t border-border">
          <div className="flex justify-between my-2 text-base"><span>SUBTOTAL TTC</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between my-2 text-base"><span>SHIPPING</span><span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between my-2 text-xl font-bold text-foreground"><span>TOTAL</span><span>₹{total.toFixed(2)}</span></div>
          <button
            onClick={handleCheckout}
            disabled={processing || cart.length === 0}
            className="w-full py-4 bg-primary text-primary-foreground border-none rounded-xl cursor-pointer text-base font-semibold mt-5 transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {processing ? "Processing..." : "Pay with UPI / Razorpay"}
          </button>
          <Link to="/shop" className="inline-block mt-5 text-yoza-brown-muted no-underline text-sm">
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
