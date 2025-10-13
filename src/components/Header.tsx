import { Calculator } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="w-full border-b bg-card shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-md">
            <Calculator className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Calculadora de Média
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Fatec Mauá
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="px-3 py-1 bg-muted rounded-md">
              <span className="font-semibold">P1:</span> 35%
            </div>
            <div className="px-3 py-1 bg-muted rounded-md">
              <span className="font-semibold">P2:</span> 35%
            </div>
            <div className="px-3 py-1 bg-muted rounded-md">
              <span className="font-semibold">Trab:</span> 30%
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
