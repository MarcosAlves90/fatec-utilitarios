import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, AlertCircle, Download, RefreshCw } from "lucide-react";
import { calculateGrades } from "@/utils/gradeCalculator";
import { toast } from "sonner";

export function GradeCalculator() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [trabalho, setTrabalho] = useState("");
  const [p3, setP3] = useState("");
  const [result, setResult] = useState<{
    mediaInicial: number;
    mediaFinal: number;
    status: string;
    conceito: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    
    if (!p1 || !p2 || !trabalho) {
      setError("Por favor, preencha P1, P2 e Trabalho");
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const gradeResult = calculateGrades(p1, p2, trabalho, p3);
    
    if (gradeResult.error) {
      setError(gradeResult.error);
      toast.error(gradeResult.error);
      return;
    }

    setResult(gradeResult);
    
    if (gradeResult.status === "Passou!") {
      toast.success(`Parabéns! Média final: ${gradeResult.mediaFinal} - ${gradeResult.conceito}`);
    } else {
      toast.warning(`Recuperação necessária. Média: ${gradeResult.mediaFinal} - ${gradeResult.conceito}`);
    }
  };

  const handleClear = () => {
    setP1("");
    setP2("");
    setTrabalho("");
    setP3("");
    setResult(null);
    setError(null);
    toast.info("Campos limpos");
  };

  const handleExport = () => {
    if (!result) {
      toast.error("Nenhum resultado para exportar");
      return;
    }

    const exportData = `Calculadora de Média - Fatec Mauá
======================================

Notas:
  P1: ${p1}
  P2: ${p2}
  Trabalho: ${trabalho}
  ${p3 ? `P3 (Recuperação): ${p3}` : ''}

Resultados:
  Média Inicial: ${result.mediaInicial}
  Média Final: ${result.mediaFinal}
  Status: ${result.status}
  Conceito: ${result.conceito}

Gerado em: ${new Date().toLocaleString('pt-BR')}
`;

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resultado-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Resultado exportado com sucesso!");
  };

  return (
    <Card className="w-full animate-fade-in shadow-elegant">
      <CardHeader className="bg-gradient-card">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Calcular Média
        </CardTitle>
        <CardDescription>
          Insira as notas (0.0 - 10.0)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="p1">P1 *</Label>
            <Input
              id="p1"
              type="number"
              min="0"
              max="10"
              step="0.01"
              placeholder="0.0 - 10.0"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="p2">P2 *</Label>
            <Input
              id="p2"
              type="number"
              min="0"
              max="10"
              step="0.01"
              placeholder="0.0 - 10.0"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trabalho">Trabalho *</Label>
            <Input
              id="trabalho"
              type="number"
              min="0"
              max="10"
              step="0.01"
              placeholder="0.0 - 10.0"
              value={trabalho}
              onChange={(e) => setTrabalho(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="p3">P3 (opcional, para recuperação)</Label>
            <Input
              id="p3"
              type="number"
              min="0"
              max="10"
              step="0.01"
              placeholder="0.0 - 10.0"
              value={p3}
              onChange={(e) => setP3(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="animate-slide-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && !error && (
          <Alert 
            className={`animate-slide-in ${
              result.status === "Passou!" 
                ? "border-success bg-success/10" 
                : "border-warning bg-warning/10"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Média Inicial:</span>
                <span className="font-mono text-lg">{result.mediaInicial.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Média Final:</span>
                <span className="font-mono text-lg font-bold">{result.mediaFinal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Status:</span>
                <span className={`font-bold ${
                  result.status === "Passou!" ? "text-success" : "text-warning"
                }`}>
                  {result.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Conceito:</span>
                <span className="font-mono text-xl font-bold">{result.conceito}</span>
              </div>
            </div>
          </Alert>
        )}

        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleCalculate}
            className="flex-1 min-w-[120px] bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calcular
          </Button>
          <Button 
            onClick={handleClear}
            variant="outline"
            className="flex-1 min-w-[120px]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Limpar
          </Button>
          <Button 
            onClick={handleExport}
            variant="secondary"
            disabled={!result}
            className="flex-1 min-w-[120px]"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-1 pt-2 border-t">
          <p className="font-semibold">Pesos das avaliações:</p>
          <p>• P1: 35% | P2: 35% | Trabalho: 30%</p>
          <p>• Média para aprovação: 6.0</p>
          <p>• P3 substitui a menor nota entre P1 e P2</p>
        </div>
      </CardContent>
    </Card>
  );
}
