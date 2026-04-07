import { Truck, Package, MapPin, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

const statusConfig = {
  pendiente: { label: "Pendiente", className: "bg-yellow-500/10 text-yellow-700 border-yellow-300" },
  entregado: { label: "Entregado", className: "bg-green-500/10 text-green-700 border-green-300" },
  recolectado: { label: "Recolectado", className: "bg-blue-500/10 text-blue-700 border-blue-300" },
};

const Logistics = () => {
  const { logisticsOrders, updateOrderStatus } = useStore();

  const handleStatusChange = (orderId: string, status: "entregado" | "recolectado") => {
    const lat = (19.4 + Math.random() * 0.1).toFixed(6);
    const lng = (-99.1 - Math.random() * 0.1).toFixed(6);

    updateOrderStatus(orderId, status);
    toast.success(
      `Orden ${orderId} marcada como ${status}`,
      { description: `📍 Coordenadas GPS capturadas: ${lat}, ${lng}` }
    );
  };

  const pending = logisticsOrders.filter((o) => o.status === "pendiente");
  const completed = logisticsOrders.filter((o) => o.status !== "pendiente");

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground border-b">
        <div className="px-4 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-accent" />
            <h1 className="font-bold text-lg">Panel de Logística</h1>
          </div>
          <p className="text-sm text-primary-foreground/70">Chofer: Carlos Méndez · {new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Pending */}
        <div className="space-y-3">
          <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" /> Pendientes ({pending.length})
          </h2>
          {pending.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No hay órdenes pendientes 🎉</p>}
          {pending.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.client}</p>
                  </div>
                  <Badge variant="outline" className={statusConfig[order.status].className}>
                    {order.type === "entrega" ? <Package className="h-3 w-3 mr-1" /> : <RotateCcw className="h-3 w-3 mr-1" />}
                    {order.type === "entrega" ? "Entrega" : "Recolección"}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-start gap-2"><MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />{order.address}</p>
                  <p className="text-muted-foreground">📦 {order.equipment}</p>
                </div>
                <div className="flex gap-2">
                  {order.type === "entrega" ? (
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusChange(order.id, "entregado")}>
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Marcar Entregado
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleStatusChange(order.id, "recolectado")}>
                      <RotateCcw className="h-4 w-4 mr-1" /> Marcar Recolectado
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completed */}
        {completed.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Completadas ({completed.length})
            </h2>
            {completed.map((order) => (
              <Card key={order.id} className="opacity-70">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{order.id} · {order.client}</p>
                      <p className="text-xs text-muted-foreground">{order.equipment}</p>
                    </div>
                    <Badge variant="outline" className={statusConfig[order.status].className}>
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logistics;
