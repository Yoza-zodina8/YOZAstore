import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Order {
  orderID: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  delivery: string;
  payment: string;
  total: string;
  cart: { name: string; qty: number }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const clearOrders = () => {
    if (confirm("Are you sure you want to delete all orders?")) {
      localStorage.removeItem("orders");
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="mb-5 text-center">
        <Link to="/shop" className="inline-block py-3 px-6 bg-yoza-brown-muted text-primary-foreground rounded-lg no-underline font-semibold">
          Continue shopping
        </Link>
      </div>

      <div className="max-w-[1000px] mx-auto rounded-2xl overflow-x-auto bg-yoza-navbar p-5 shadow-sm">
        <h1 className="text-center mb-5 text-xl font-bold text-foreground">Customer Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground mt-8">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  {["Order ID", "Name", "Email", "Phone", "Address", "Delivery", "Payment", "Total", "Cart Items"].map((h) => (
                    <th key={h} className="p-3 border border-border bg-primary text-primary-foreground text-sm text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-yoza-section-light"}>
                    <td className="p-3 border border-border text-sm">{order.orderID}</td>
                    <td className="p-3 border border-border text-sm">{order.name}</td>
                    <td className="p-3 border border-border text-sm">{order.email}</td>
                    <td className="p-3 border border-border text-sm">{order.phone}</td>
                    <td className="p-3 border border-border text-sm">{order.address || ""}</td>
                    <td className="p-3 border border-border text-sm">{order.delivery}</td>
                    <td className="p-3 border border-border text-sm">{order.payment}</td>
                    <td className="p-3 border border-border text-sm">₹{order.total}</td>
                    <td className="p-3 border border-border text-sm">
                      {order.cart.map((item) => `${item.name} x${item.qty}`).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {orders.length > 0 && (
          <button
            onClick={clearOrders}
            className="block mx-auto mt-5 py-3 px-6 bg-yoza-brown-muted text-primary-foreground border-none rounded-lg cursor-pointer font-semibold"
          >
            Clear All Orders
          </button>
        )}
      </div>
    </div>
  );
};

export default Orders;
