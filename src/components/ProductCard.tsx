import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import type { Equipment } from "@/data/equipment";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface ProductCardProps {
  equipment: Equipment;
}

export function ProductCard({ equipment }: ProductCardProps) {
  const addToCart = useStore((s) => s.addToCart);

  const handleAdd = () => {
    if (!equipment.available) return;
    addToCart(equipment);
    toast.success(`${equipment.name} agregado al carrito`);
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Badge
          className={`absolute top-3 right-3 ${equipment.available ? "bg-green-600 hover:bg-green-700" : "bg-destructive hover:bg-destructive/90"} text-white`}
        >
          {equipment.available ? "Disponible" : "No disponible"}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-2">
        <p className="text-xs font-medium text-accent uppercase tracking-wider">{equipment.category}</p>
        <h3 className="font-semibold text-card-foreground leading-tight line-clamp-2">{equipment.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{equipment.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">${equipment.pricePerDay.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/día</span></span>
          <Button size="sm" disabled={!equipment.available} onClick={handleAdd} className="gap-1.5">
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
