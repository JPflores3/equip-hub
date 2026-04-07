import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Trash2, Minus, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartItem } = useStore();
  const navigate = useNavigate();

  const getRentalDays = (start?: Date, end?: Date) => {
    if (!start || !end) return 0;
    const days = differenceInDays(end, start);
    return days > 0 ? days : 0;
  };

  const subtotal = cart.reduce((sum, item) => {
    const days = getRentalDays(item.startDate, item.endDate);
    return sum + item.equipment.pricePerDay * item.quantity * (days || 1);
  }, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrito de Renta</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {cart.map((item) => {
                const days = getRentalDays(item.startDate, item.endDate);
                return (
                  <div key={item.equipment.id} className="rounded-lg border p-3 space-y-3">
                    <div className="flex gap-3">
                      <img src={item.equipment.image} alt={item.equipment.name} className="h-16 w-16 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight truncate">{item.equipment.name}</h4>
                        <p className="text-xs text-muted-foreground">${item.equipment.pricePerDay.toLocaleString()}/día</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateCartItem(item.equipment.id, { quantity: Math.max(1, item.quantity - 1) })}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateCartItem(item.equipment.id, { quantity: item.quantity + 1 })}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(item.equipment.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Date pickers */}
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className={cn("justify-start text-left text-xs", !item.startDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {item.startDate ? format(item.startDate, "dd MMM", { locale: es }) : "Inicio"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={item.startDate} onSelect={(d) => updateCartItem(item.equipment.id, { startDate: d })} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className={cn("justify-start text-left text-xs", !item.endDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {item.endDate ? format(item.endDate, "dd MMM", { locale: es }) : "Fin"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={item.endDate} onSelect={(d) => updateCartItem(item.equipment.id, { endDate: d })} disabled={(d) => d < (item.startDate || new Date())} initialFocus className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {days > 0 && (
                      <p className="text-xs text-muted-foreground">{days} día{days > 1 ? "s" : ""} · Subtotal: <span className="font-semibold text-foreground">${(item.equipment.pricePerDay * item.quantity * days).toLocaleString()}</span></p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceder al Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
