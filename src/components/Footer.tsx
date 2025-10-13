import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p className="flex items-center gap-1 justify-center md:justify-start">
              Feito com <Heart className="h-4 w-4 text-primary fill-primary" /> para estudantes da Fatec
            </p>
            <p className="text-xs mt-1">
              © {new Date().getFullYear()} Calculadora de Média - Fatec Mauá
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="#"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">Sobre</span>
            </a>
            <a 
              href="#"
              className="hover:text-primary transition-colors"
            >
              Ajuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
