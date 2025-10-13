import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, AlertCircle, Info } from "lucide-react";
import { requiredScoreForTarget } from "@/utils/gradeCalculator";
import { toast } from "sonner";

export function RequiredScoreCalculator() {
  const [wP1, setWP1] = useState("0.35");
  const [wP2, setWP2] = useState("0.35");
  const [wTrabalho, setWTrabalho] = useState("0.30");
  
  const [kP1, setKP1] = useState("");
  const [kP2, setKP2] = useState("");
  const [kTrabalho, setKTrabalho] = useState("");
  
  const [target, setTarget] = useState("6");
  const [result, setResult] = useState<string | null>(null);
  const [isPossible, setIsPossible] = useState<boolean>(true);

  const handleCalculate = () => {
    try {
      const w1 = parseFloat(wP1);
      const w2 = parseFloat(wP2);
      const w3 = parseFloat(wTrabalho);
      
      if (isNaN(w1) || isNaN(w2) || isNaN(w3)) {
        toast.error("Pesos inválidos");
        return;
      }

      const totalWeight = w1 + w2 + w3;
      if (Math.abs(totalWeight - 1.0) > 0.01) {
        toast.error(`Pesos devem somar 1.0 (soma atual: ${totalWeight.toFixed(2)})`);
        return;
      }

      const targetValue = parseFloat(target);
      if (isNaN(targetValue)) {
        toast.error("Média alvo inválida");
        return;
      }

      const weights = {
        p1: w1,
        p2: w2,
        trabalho: w3,
      };

      const known: Record<string, string | null> = {};
      if (kP1.trim() !== "") known.p1 = kP1;
      if (kP2.trim() !== "") known.p2 = kP2;
      if (kTrabalho.trim() !== "") known.trabalho = kTrabalho;

      const calcResult = requiredScoreForTarget(known, weights, targetValue);
      
      setResult(calcResult.message);
      setIsPossible(calcResult.possible);
      
      if (calcResult.possible) {
        toast.success("Cálculo concluído!");
      } else {
        toast.warning("Objetivo não pode ser alcançado");
      }
    } catch (error) {
      toast.error("Erro ao calcular");
    }
  };

  return (
    <Card className="w-full animate-fade-in shadow-elegant">
      <CardHeader className="bg-gradient-card">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Nota Necessária
        </CardTitle>
        <CardDescription>
          Calcule a nota mínima para atingir sua meta
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Pesos (devem somar 1.0)
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="wp1" className="text-xs text-muted-foreground">P1</Label>
                <Input
                  id="wp1"
                  type="number"
                  step="0.01"
                  value={wP1}
                  onChange={(e) => setWP1(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wp2" className="text-xs text-muted-foreground">P2</Label>
                <Input
                  id="wp2"
                  type="number"
                  step="0.01"
                  value={wP2}
                  onChange={(e) => setWP2(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wtrabalho" className="text-xs text-muted-foreground">Trabalho</Label>
                <Input
                  id="wtrabalho"
                  type="number"
                  step="0.01"
                  value={wTrabalho}
                  onChange={(e) => setWTrabalho(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">
              Notas conhecidas (deixe em branco as desconhecidas)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="kp1">P1</Label>
                <Input
                  id="kp1"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="Deixe vazio se desconhecido"
                  value={kP1}
                  onChange={(e) => setKP1(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kp2">P2</Label>
                <Input
                  id="kp2"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="Deixe vazio se desconhecido"
                  value={kP2}
                  onChange={(e) => setKP2(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ktrabalho">Trabalho</Label>
                <Input
                  id="ktrabalho"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="Deixe vazio se desconhecido"
                  value={kTrabalho}
                  onChange={(e) => setKTrabalho(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Média alvo</Label>
            <Input
              id="target"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary max-w-[200px]"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <Target className="mr-2 h-4 w-4" />
          Calcular nota necessária
        </Button>

        {result && (
          <Alert 
            className={`animate-slide-in ${
              isPossible 
                ? "border-success bg-success/10" 
                : "border-destructive bg-destructive/10"
            }`}
          >
            {isPossible ? (
              <Info className="h-4 w-4 text-success" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            <AlertDescription className="font-medium">
              {result}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground space-y-1 pt-2 border-t">
          <p className="font-semibold flex items-center gap-1">
            <Info className="h-3 w-3" />
            Como usar:
          </p>
          <p>1. Ajuste os pesos se necessário (padrão Fatec: 0.35, 0.35, 0.30)</p>
          <p>2. Preencha as notas que você já conhece</p>
          <p>3. Defina sua média alvo (padrão: 6.0 para aprovação)</p>
          <p>4. O sistema calcula a nota necessária nos campos vazios</p>
        </div>
      </CardContent>
    </Card>
  );
}
