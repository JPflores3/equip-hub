export interface LogisticsOrder {
  id: string;
  client: string;
  address: string;
  equipment: string;
  type: "entrega" | "recoleccion";
  status: "pendiente" | "entregado" | "recolectado";
  scheduledDate: string;
}

export const mockOrders: LogisticsOrder[] = [
  { id: "ORD-001", client: "Constructora MX", address: "Av. Revolución 450, Col. Centro", equipment: "Retroexcavadora CAT 420F", type: "entrega", status: "pendiente", scheduledDate: "2026-04-07" },
  { id: "ORD-002", client: "Inmobiliaria del Valle", address: "Blvd. Insurgentes 1200, Col. Roma", equipment: "Andamio Multidireccional 10m", type: "entrega", status: "pendiente", scheduledDate: "2026-04-07" },
  { id: "ORD-003", client: "Grupo PRISA", address: "Calle 5 de Mayo 88, Col. Juárez", equipment: "Generador Diésel 50 KVA", type: "recoleccion", status: "pendiente", scheduledDate: "2026-04-07" },
  { id: "ORD-004", client: "Obras Industriales SA", address: "Periferico Norte 3400", equipment: "Soldadora MIG Lincoln 250A", type: "entrega", status: "pendiente", scheduledDate: "2026-04-07" },
  { id: "ORD-005", client: "Desarrollos Urbanos", address: "Av. Universidad 900, Col. Narvarte", equipment: "Compresor 185 CFM Atlas Copco", type: "recoleccion", status: "pendiente", scheduledDate: "2026-04-08" },
  { id: "ORD-006", client: "Ingeniería Avanzada", address: "Calz. de Tlalpan 2100", equipment: "Torre de Iluminación 4000W", type: "entrega", status: "pendiente", scheduledDate: "2026-04-08" },
];
