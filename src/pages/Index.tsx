import { useState, useEffect } from "react";
import { equipmentList, categories } from "@/data/equipment";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, HardHat } from "lucide-react";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = equipmentList.filter((e) => {
    if (selectedCategory && e.category !== selectedCategory) return false;
    if (showAvailableOnly && !e.available) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-1.5 text-sm">
            <HardHat className="h-4 w-4 text-accent" />
            Plataforma líder en renta de equipos industriales
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            El equipo que necesitas,<br />
            <span className="text-accent">cuando lo necesitas</span>
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Maquinaria pesada, herramientas y equipos industriales en renta. Entrega y recolección en tu obra.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}>
            Ver Catálogo <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalogo" className="container mx-auto px-4 py-12 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Catálogo de Equipos</h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={showAvailableOnly} onChange={(e) => setShowAvailableOnly(e.target.checked)} className="rounded" />
            Solo disponibles
          </label>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : filtered.map((eq) => <ProductCard key={eq.id} equipment={eq} />)}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No se encontraron equipos con los filtros seleccionados.</p>
        )}
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
