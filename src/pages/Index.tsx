import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import YozaFooter from "@/components/YozaFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-wrap justify-between items-center px-6 md:px-16 py-16 bg-yoza-section-light mt-0">
        <div className="flex-1 pr-0 md:pr-10 mb-5 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-5 text-foreground leading-tight">
            Everything you like,<br />Just for You!
          </h1>
          <p className="mb-5 text-base md:text-lg text-foreground">
            Discover our shop! Why not order something today?
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              to="/shop"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold no-underline inline-block"
            >
              Order Now
            </Link>
            <a
              href="https://www.youtube.com/@yoza_29"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold no-underline inline-block"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/yo._.za_/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold no-underline inline-block"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="w-[120px] h-[120px] bg-yoza-navbar rounded-xl flex items-center justify-center text-4xl">🥐</div>
          <div className="w-[120px] h-[120px] bg-yoza-navbar rounded-xl flex items-center justify-center text-4xl">🍞</div>
          <div className="w-[120px] h-[120px] bg-yoza-navbar rounded-xl flex items-center justify-center text-4xl">🧁</div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="text-center py-16 px-5 bg-yoza-section-warm">
        <h2 className="mb-10 text-2xl md:text-4xl font-bold text-yoza-brown-muted">Choose what you like</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { title: "Artisan Breads", desc: "Made traditionally with the finest organic ingredients.", emoji: "🍞" },
            { title: "Sweet Pastries", desc: "Delightful and soft pastries perfect for every mood.", emoji: "🧁" },
            { title: "Custom Cakes", desc: "Handcrafted cakes tailored for every occasion.", emoji: "🎂" },
          ].map((item) => (
            <div key={item.title} className="bg-card p-5 rounded-2xl max-w-[280px] w-full shadow-sm text-center">
              <div className="w-full h-[180px] bg-yoza-navbar rounded-xl flex items-center justify-center text-6xl mb-4">
                {item.emoji}
              </div>
              <h3 className="my-3 text-foreground font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
              <Link to="/shop" className="inline-block mt-3 bg-accent text-accent-foreground px-4 py-2 rounded-full no-underline font-bold text-sm">
                Visit Bakery
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Visit Us */}
      <section className="flex flex-wrap px-6 md:px-16 py-16 bg-yoza-section-light items-center justify-between">
        <div className="flex-1 pr-0 md:pr-8 text-center md:text-left mb-5 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Visit Us Today</h2>
          <p className="text-base text-foreground mb-5">
            Experience the aroma and warmth of our bakery in person. We're always excited to welcome new faces and familiar friends!
          </p>
          <Link to="/contact" className="inline-block bg-accent text-accent-foreground px-5 py-3 rounded-full no-underline font-bold">
            Visit Us Today
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 justify-center flex-1">
          <div className="w-[100px] h-[100px] bg-yoza-navbar rounded-xl flex items-center justify-center text-4xl">🍩</div>
          <div className="w-[100px] h-[100px] bg-yoza-navbar rounded-xl flex items-center justify-center text-4xl">🥧</div>
          <div className="w-[100px] h-[100px] bg-yoza-navbar rounded-xl flex items-center justify-center text-4xl">🍰</div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-5 bg-yoza-section-warm text-center">
        <div className="flex justify-center gap-5 flex-wrap mb-8">
          <div className="w-[140px] h-[140px] bg-yoza-navbar rounded-xl flex items-center justify-center text-5xl">🧁</div>
          <div className="w-[140px] h-[140px] bg-yoza-navbar rounded-xl flex items-center justify-center text-5xl">🎂</div>
          <div className="w-[140px] h-[140px] bg-yoza-navbar rounded-xl flex items-center justify-center text-5xl">🍰</div>
        </div>
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="max-w-[300px]">
            <h3 className="font-semibold text-foreground mb-1">Organic Baking</h3>
            <p className="text-sm text-muted-foreground">We believe in quality and sustainability — no additives, no shortcuts.</p>
          </div>
          <div className="max-w-[300px]">
            <h3 className="font-semibold text-foreground mb-1">Natural Eating</h3>
            <p className="text-sm text-muted-foreground">Delicious treats that make you feel as good as they taste.</p>
          </div>
        </div>
      </section>

      <YozaFooter />
    </div>
  );
};

export default Index;
