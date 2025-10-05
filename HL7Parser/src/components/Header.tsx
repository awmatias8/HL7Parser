import { Activity } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">HL7 Parser</h1>
            <p className="text-sm text-muted-foreground">
              Analizador de Mensajes HL7 con Estándares Oficiales
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
