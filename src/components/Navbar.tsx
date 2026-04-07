import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, setCartOpen } = useStore();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 border-b bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Wrench className="h-5 w-5 text-accent" />
          <span>RentaEquip</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-sm hover:text-accent transition-colors">Catálogo</Link>
          <Link to="/logistica" className="text-sm hover:text-accent transition-colors">Logística</Link>
          <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:text-accent" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" className="relative text-primary-foreground" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-primary-foreground/20 bg-primary px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-sm hover:text-accent transition-colors">Catálogo</Link>
          <Link to="/logistica" onClick={() => setMenuOpen(false)} className="block py-2 text-sm hover:text-accent transition-colors">Logística</Link>
        </div>
      )}
    </nav>
  );
}
