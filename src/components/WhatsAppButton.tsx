import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  equipmentName?: string;
}

export function WhatsAppButton({ equipmentName }: WhatsAppButtonProps) {
  const phone = "5215512345678";
  const message = equipmentName
    ? `Hola, me interesa rentar el equipo: ${equipmentName}. ¿Está disponible?`
    : "Hola, me interesa rentar equipos. ¿Podrían darme más información?";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      title="Contáctanos por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
