import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import YozaFooter from "@/components/YozaFooter";
import { useCart } from "@/hooks/useCart";

const products = [
  { name: "Buldak Noodles", desc: "White plate with dried shrimps", price: 70, rating: "8.1", category: "food", emoji: "🍜" },
  { name: "Burger Deluxe", desc: "Juicy handmade burger", price: 70, rating: "8.1", category: "food", emoji: "🍔" },
  { name: "Noodles Three", desc: "White plate with dried shrimps", price: 300, rating: "8.1", category: "food", emoji: "🍝" },
  { name: "Classic Tee", desc: "Premium cotton t-shirt", price: 300, rating: "8.1", category: "men", emoji: "👕" },
  { name: "Denim Jacket", desc: "Stylish denim jacket", price: 1200, rating: "8.5", category: "men", emoji: "🧥" },
  { name: "Summer Dress", desc: "Light floral dress", price: 800, rating: "9.0", category: "women", emoji: "👗" },
  { name: "Wireless Earbuds", desc: "High-quality audio", price: 999, rating: "8.8", category: "electronics", emoji: "🎧" },
  { name: "Smart Watch", desc: "Fitness tracker watch", price: 1500, rating: "8.3", category: "electronics", emoji: "⌚" },
  { name: "Fried Rice", desc: "Special fried rice", price: 120, rating: "8.0", category: "food", emoji: "🍚" },
  { name: "Phone Case", desc: "Protective phone case", price: 250, rating: "7.5", category: "electronics", emoji: "📱" },
];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { addToCart } = useCart();

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <header className="bg-yoza-section-light py-12 px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 w-full">
          <div className="flex-1 min-w-[280px]">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              I duh tur chi tak<br />Han en kual chhin la
            </h1>
            <p className="text-base text-yoza-brown-muted mb-6">
              Kawr leh pheikhawk chi hrang hrang kan nei a. I duh ber kha rawn thlang la kan lo deliver sak thlap ang che.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#menu" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold no-underline">
                Chi hrang hrang a awm e
              </a>
              <a href="#menu" className="bg-yoza-navbar text-yoza-brown-muted px-6 py-3 rounded-full font-semibold no-underline">
                Make an order
              </a>
            </div>
          </div>
          <div className="text-8xl">🍔</div>
        </div>
      </header>

      {/* Search */}
      <div className="flex justify-center my-6 mx-auto max-w-[500px] px-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 py-3 px-4 border-2 border-yoza-footer rounded-full text-base text-foreground bg-yoza-cream outline-none focus:border-primary focus:shadow-md transition-all"
        />
      </div>

      {/* Category buttons */}
      <div className="flex justify-center gap-3 my-4 flex-wrap px-4">
        {["all", "men", "women", "electronics", "food"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-3 border-none rounded-full font-semibold cursor-pointer transition-colors capitalize ${
              category === cat ? "bg-yoza-brown-muted text-primary-foreground" : "bg-primary text-primary-foreground hover:bg-yoza-brown-muted"
            }`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <section id="menu" className="py-8 px-8 text-center bg-yoza-section-light">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">Anything you like?</h2>
        <p className="text-yoza-brown-muted mb-8">Search around, take your time</p>
        <div className="flex flex-wrap justify-center gap-8">
          {filtered.map((product, idx) => (
            <div
              key={idx}
              className="bg-card p-4 rounded-2xl text-center w-[250px] shadow-sm hover:-translate-y-2 transition-transform cursor-pointer"
            >
              <div className="w-full h-[150px] bg-yoza-navbar rounded-2xl flex items-center justify-center text-6xl mb-4">
                {product.emoji}
              </div>
              <h3 className="text-lg font-semibold text-yoza-orange mb-1">{product.name}</h3>
              <p className="text-sm text-yoza-brown-muted mb-2">{product.desc}</p>
              <span className="inline-block mx-1 font-semibold text-accent">₹{product.price}</span>
              <span className="inline-block mx-1 font-semibold text-accent">⭐ {product.rating}</span>
              <br />
              <button
                onClick={() =>
                  addToCart({
                    name: product.name,
                    price: product.price,
                    image: "",
                    category: product.category,
                  })
                }
                className="mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer hover:opacity-90"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Highlight */}
      <section className="bg-yoza-section-warm p-8 m-8 rounded-2xl flex flex-wrap items-center gap-8">
        <div className="text-8xl">🍟</div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">I duhthusam i hmu em</h2>
          <p className="text-base text-yoza-brown-muted">
            He pheikhawk te hi i ngainat zawng a ni lo em ni? A detail i hriat duh chuan hmet tawp rawh
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="text-center p-8 bg-yoza-section-warm rounded-2xl mx-8 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Our services</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          <div className="text-lg text-foreground">🛒 Shipping to other state</div>
          <div className="text-lg text-foreground">🚚 Delivery service</div>
        </div>
      </section>

      <YozaFooter />
    </div>
  );
};

export default Shop;
