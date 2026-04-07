export interface Equipment {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  available: boolean;
  image: string;
  description: string;
  deposit: number;
}

export const categories = [
  "Maquinaria Pesada",
  "Andamios",
  "Herramientas Eléctricas",
  "Compresores",
  "Generadores",
  "Soldadura",
  "Plomería",
  "Iluminación",
];

export const equipmentList: Equipment[] = [
  { id: "1", name: "Retroexcavadora CAT 420F", category: "Maquinaria Pesada", pricePerDay: 4500, available: true, image: "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=400&h=300&fit=crop", description: "Retroexcavadora con capacidad de excavación de 4.3m", deposit: 15000 },
  { id: "2", name: "Miniexcavadora Kubota KX040", category: "Maquinaria Pesada", pricePerDay: 2800, available: true, image: "https://images.unsplash.com/photo-1577791465485-b80039b4d69a?w=400&h=300&fit=crop", description: "Ideal para espacios reducidos", deposit: 10000 },
  { id: "3", name: "Rodillo Compactador BOMAG", category: "Maquinaria Pesada", pricePerDay: 3200, available: false, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop", description: "Compactación de suelos y asfalto", deposit: 12000 },
  { id: "4", name: "Andamio Multidireccional 10m", category: "Andamios", pricePerDay: 350, available: true, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop", description: "Sistema modular hasta 10 metros de altura", deposit: 2000 },
  { id: "5", name: "Andamio Tubular 6m", category: "Andamios", pricePerDay: 180, available: true, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop", description: "Andamio tubular estándar de 6 metros", deposit: 1200 },
  { id: "6", name: "Torre de Andamio Móvil", category: "Andamios", pricePerDay: 450, available: true, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop", description: "Torre móvil con ruedas y frenos", deposit: 2500 },
  { id: "7", name: "Taladro Rotomartillo Hilti", category: "Herramientas Eléctricas", pricePerDay: 280, available: true, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop", description: "Perforación en concreto y mampostería", deposit: 1500 },
  { id: "8", name: "Sierra Circular DeWalt 7¼\"", category: "Herramientas Eléctricas", pricePerDay: 150, available: true, image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400&h=300&fit=crop", description: "Corte preciso en madera y laminados", deposit: 800 },
  { id: "9", name: "Amoladora Angular Bosch 9\"", category: "Herramientas Eléctricas", pricePerDay: 120, available: false, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop", description: "Corte y desbaste de metales", deposit: 700 },
  { id: "10", name: "Demoledor Eléctrico Makita", category: "Herramientas Eléctricas", pricePerDay: 350, available: true, image: "https://images.unsplash.com/photo-1590479773265-7464e5d48f73?w=400&h=300&fit=crop", description: "Demolición de concreto y pisos", deposit: 2000 },
  { id: "11", name: "Compresor 185 CFM Atlas Copco", category: "Compresores", pricePerDay: 1800, available: true, image: "https://images.unsplash.com/photo-1635348729498-f49c3a498e63?w=400&h=300&fit=crop", description: "Compresor portátil diésel de alto rendimiento", deposit: 8000 },
  { id: "12", name: "Compresor 25 Galones DeWalt", category: "Compresores", pricePerDay: 250, available: true, image: "https://images.unsplash.com/photo-1626847037657-fd3622614abe?w=400&h=300&fit=crop", description: "Compresor eléctrico portátil", deposit: 1500 },
  { id: "13", name: "Generador Diésel 50 KVA", category: "Generadores", pricePerDay: 2200, available: true, image: "https://images.unsplash.com/photo-1602081115068-1e4f2e00e195?w=400&h=300&fit=crop", description: "Generador silencioso para obras grandes", deposit: 10000 },
  { id: "14", name: "Generador Portátil 7500W Honda", category: "Generadores", pricePerDay: 650, available: false, image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop", description: "Generador a gasolina para uso general", deposit: 3000 },
  { id: "15", name: "Generador Inverter 3000W", category: "Generadores", pricePerDay: 400, available: true, image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&h=300&fit=crop", description: "Generador silencioso para equipos sensibles", deposit: 2000 },
  { id: "16", name: "Soldadora MIG Lincoln 250A", category: "Soldadura", pricePerDay: 450, available: true, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop", description: "Soldadura MIG/MAG industrial", deposit: 3000 },
  { id: "17", name: "Soldadora TIG Miller 200A", category: "Soldadura", pricePerDay: 550, available: true, image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400&h=300&fit=crop", description: "Soldadura TIG para trabajos de precisión", deposit: 3500 },
  { id: "18", name: "Cortadora de Tubo Ridgid", category: "Plomería", pricePerDay: 200, available: true, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", description: "Corte de tubería hasta 4 pulgadas", deposit: 1200 },
  { id: "19", name: "Roscadora Eléctrica Ridgid", category: "Plomería", pricePerDay: 380, available: true, image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop", description: "Roscado de tubería de 1/2\" a 2\"", deposit: 2500 },
  { id: "20", name: "Torre de Iluminación 4000W", category: "Iluminación", pricePerDay: 900, available: true, image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop", description: "Iluminación para obras nocturnas", deposit: 5000 },
  { id: "21", name: "Plataforma Elevadora Tijera", category: "Maquinaria Pesada", pricePerDay: 2500, available: true, image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop", description: "Elevación hasta 12 metros", deposit: 12000 },
  { id: "22", name: "Vibrador de Concreto Wacker", category: "Herramientas Eléctricas", pricePerDay: 180, available: true, image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=300&fit=crop", description: "Vibrado para colado de concreto", deposit: 1000 },
];
