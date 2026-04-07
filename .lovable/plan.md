

# Plataforma de Renta de Equipos — Plan de Implementación

## Paleta Visual
- **Primario**: Azul oscuro industrial (#1e3a5f)
- **Acento**: Naranja de seguridad (#f97316)
- **Neutros**: Grises industriales
- **Tipografía**: Inter (ya incluida)
- Mobile First, transiciones suaves, skeleton loaders

## Estado Global
- **Zustand** para carrito, órdenes de logística y estado de UI
- **Mock JSON** con 20+ equipos (maquinaria pesada, andamios, herramientas eléctricas, compresores, etc.) con nombre, imagen placeholder, categoría, precio/día y disponibilidad

## Vistas y Componentes

### 1. Portal Público (`/`)
- **Hero Section**: Fondo con gradiente azul oscuro, headline, CTA "Ver Catálogo"
- **Filtros**: Por categoría y disponibilidad
- **Grid de Productos**: Cards responsivas con imagen, nombre, categoría, precio/día, badge de disponibilidad, botón "Agregar al carrito"
- **Botón flotante WhatsApp**: Esquina inferior derecha, genera enlace `wa.me` con mensaje predefinido del equipo actual
- **Skeleton loaders** al montar

### 2. Carrito (Drawer lateral)
- Se abre desde ícono en navbar con badge de cantidad
- Lista de equipos agregados con controles de cantidad
- **Datepicker** de fecha inicio y fin de renta por equipo
- Cálculo en tiempo real de días y subtotal
- Botón "Proceder al Checkout"

### 3. Checkout (`/checkout`)
- Resumen de orden con desglose:
  - Subtotal (precio × días)
  - + Comisión bancaria (3%)
  - + Depósito en garantía (cargo fijo con Tooltip explicativo)
  - = Total
- Formulario simulado de tarjeta (número, expiración, CVV)
- Checkbox de aceptación de términos de garantía (habilita/deshabilita botón de pago)
- Spinner al simular pago → Pantalla de "Pago Exitoso" con confetti/check

### 4. Módulo de Logística (`/logistica`)
- Diseño 100% móvil (sin sidebar, layout vertical)
- Header con nombre del chofer
- Lista de órdenes asignadas (mock data): cliente, dirección, equipo, tipo (entrega/recolección)
- Botones por orden: "Marcar Entregado" / "Marcar Recolectado"
- Al presionar: toast de éxito simulando captura GPS con coordenadas ficticias
- Badges de estado con colores (pendiente, entregado, recolectado)

### 5. Navegación
- Navbar responsiva con logo, links (Catálogo, Logística), ícono de carrito con badge
- Menú hamburguesa en móvil

