import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { Loader2, CreditCard, CheckCircle2, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/store/useStore";

const DEPOSIT_AMOUNT = 2500;
const BANK_COMMISSION_RATE = 0.03;

const Checkout = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const getRentalDays = (start?: Date, end?: Date) => {
    if (!start || !end) return 1;
    const d = differenceInDays(end, start);
    return d > 0 ? d : 1;
  };

  const subtotal = cart.reduce((sum, item) => {
    const days = getRentalDays(item.startDate, item.endDate);
    return sum + item.equipment.pricePerDay * item.quantity * days;
  }, 0);

  const commission = Math.round(subtotal * BANK_COMMISSION_RATE * 100) / 100;
  const total = subtotal + commission + DEPOSIT_AMOUNT;

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2500));
    setProcessing(false);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">¡Pago Exitoso!</h1>
            <p className="text-muted-foreground">Tu reserva ha sido confirmada. Recibirás un correo con los detalles de entrega.</p>
            <p className="text-2xl font-bold text-primary">${total.toLocaleString()} MXN</p>
            <Button onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Volver al catálogo
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" /> Volver
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Datos de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre del titular</Label>
                <Input placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label>Número de tarjeta</Label>
                <Input placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiración</Label>
                  <Input placeholder="MM/AA" maxLength={5} />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input placeholder="123" maxLength={4} type="password" />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-4">
                <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(c) => setAcceptedTerms(c === true)} />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  Acepto los términos de garantía y las condiciones de renta del equipo. Entiendo que el depósito será reembolsado al devolver el equipo en buenas condiciones.
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Cobro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => {
                const days = getRentalDays(item.startDate, item.endDate);
                return (
                  <div key={item.equipment.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.equipment.name} × {item.quantity} × {days}d</span>
                    <span>${(item.equipment.pricePerDay * item.quantity * days).toLocaleString()}</span>
                  </div>
                );
              })}

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Comisión bancaria (3%)</span>
                  <span>${commission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-1">
                    Depósito en garantía
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>El depósito en garantía es un cargo obligatorio que protege el equipo durante el periodo de renta. Se reembolsa íntegramente al devolver el equipo en las mismas condiciones en que fue entregado.</p>
                      </TooltipContent>
                    </Tooltip>
                  </span>
                  <span>${DEPOSIT_AMOUNT.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total a pagar</span>
                  <span className="text-primary">${total.toLocaleString()} MXN</span>
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={!acceptedTerms || processing || cart.length === 0} onClick={handlePay}>
                {processing ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Procesando pago...</>
                ) : (
                  "Confirmar Pago"
                )}
              </Button>

              {!acceptedTerms && (
                <p className="text-xs text-destructive text-center">Debes aceptar los términos de garantía para continuar</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Checkout;
