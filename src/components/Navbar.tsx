import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import CartPanel from "./CartPanel";

const Navbar = () => {
  const location = useLocation();
  const { totalQty } = useCart();
  const { user, signOut } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="flex items-center px-8 py-4 bg-yoza-navbar shadow-sm w-full z-50 overflow-x-auto flex-nowrap">
        <Link to="/" className="font-bold text-3xl text-yoza-brown-mid whitespace-nowrap mr-6 flex-shrink-0">
          YOZA
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-6 list-none m-0 p-0 flex-nowrap">
            <li>
              <Link to="/" className={`no-underline font-medium whitespace-nowrap transition-colors ${isActive("/") ? "text-yoza-brown-mid border-b-2 border-yoza-brown-mid" : "text-yoza-brown-muted hover:text-yoza-brown-mid"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className={`no-underline font-medium whitespace-nowrap transition-colors ${isActive("/shop") ? "text-yoza-brown-mid border-b-2 border-yoza-brown-mid" : "text-yoza-brown-muted hover:text-yoza-brown-mid"}`}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className={`no-underline font-medium whitespace-nowrap transition-colors ${isActive("/about") ? "text-yoza-brown-mid border-b-2 border-yoza-brown-mid" : "text-yoza-brown-muted hover:text-yoza-brown-mid"}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`no-underline font-medium whitespace-nowrap transition-colors ${isActive("/contact") ? "text-yoza-brown-mid border-b-2 border-yoza-brown-mid" : "text-yoza-brown-muted hover:text-yoza-brown-mid"}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center ml-auto gap-3 flex-shrink-0">
          {user ? (
            <button onClick={() => signOut()} className="text-sm text-yoza-brown-muted hover:text-yoza-brown-mid whitespace-nowrap">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="text-sm text-yoza-brown-muted hover:text-yoza-brown-mid whitespace-nowrap">
              Login
            </Link>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setCartOpen(!cartOpen); }}
            className="text-xl text-yoza-brown-mid cursor-pointer whitespace-nowrap bg-transparent border-none"
          >
            🛒<span className="text-destructive ml-1 text-sm">{totalQty}</span>
          </button>
          {/* Hamburger for mobile */}
          <button
            className="flex flex-col md:hidden cursor-pointer ml-3 bg-transparent border-none"
            onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen); }}
          >
            <span className="h-[3px] w-[25px] bg-foreground rounded my-[3px]" />
            <span className="h-[3px] w-[25px] bg-foreground rounded my-[3px]" />
            <span className="h-[3px] w-[25px] bg-foreground rounded my-[3px]" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col md:hidden bg-yoza-navbar absolute top-[60px] right-3 rounded-xl shadow-lg p-4 z-[9999]">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 text-yoza-brown-muted no-underline font-medium hover:text-yoza-brown-mid">Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 text-yoza-brown-muted no-underline font-medium hover:text-yoza-brown-mid">Shop</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-yoza-brown-muted no-underline font-medium hover:text-yoza-brown-mid">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-yoza-brown-muted no-underline font-medium hover:text-yoza-brown-mid">Contact</Link>
          {user ? (
            <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="py-2 text-yoza-brown-muted text-left bg-transparent border-none font-medium">Logout</button>
          ) : (
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="py-2 text-yoza-brown-muted no-underline font-medium">Login</Link>
          )}
        </div>
      )}

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
