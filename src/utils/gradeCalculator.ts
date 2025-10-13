/**
 * Utilitários para cálculo de médias e validações
 * Replicação do comportamento do programa Python fornecido
 */

export interface ValidationError {
  type: 'invalid' | 'negative' | 'exceeded';
  message: string;
}

export interface GradeResult {
  mediaInicial: number;
  mediaFinal: number;
  status: 'Passou!' | 'Recuperação!';
  conceito: 'A' | 'B' | 'C' | 'D' | 'F';
  error?: string;
}

export interface RequiredScoreResult {
  possible: boolean;
  message: string;
  requiredScore?: number;
}

/**
 * Valida e converte um valor para nota (float)
 * Lança erro para valores inválidos (negativos ou >10) ou se não for numérico
 */
export function validateGrade(value: string | number): number {
  let grade: number;
  
  try {
    grade = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(grade)) {
      throw new Error('Valor não numérico');
    }
  } catch {
    throw new Error('Valor não numérico');
  }
  
  if (grade < 0) {
    throw new Error('Valores negativos não são permitidos');
  }
  
  if (grade > 10) {
    throw new Error('Limite ultrapassado (máximo: 10)');
  }
  
  return grade;
}

/**
 * Calcula média ponderada com pesos 35%, 35%, 30%
 */
export function weightedAverage(p1: number, p2: number, trabalho: number): number {
  return (p1 * 0.35) + (p2 * 0.35) + (trabalho * 0.30);
}

/**
 * Substitui a menor entre p1 e p2 por p3 e calcula média
 * A lógica mantém a maior entre p1/p2 e substitui a outra por p3
 */
export function replaceWithP3AndAverage(
  p1: number, 
  p2: number, 
  p3: number, 
  trabalho: number
): number {
  if (p1 > p2) {
    return weightedAverage(p1, p3, trabalho);
  } else {
    return weightedAverage(p3, p2, trabalho);
  }
}

/**
 * Retorna 'Passou!' se média >= 6, senão 'Recuperação!'
 */
export function finalStatus(media: number): 'Passou!' | 'Recuperação!' {
  return media >= 6 ? 'Passou!' : 'Recuperação!';
}

/**
 * Converte média numérica para conceito
 * A: >=9, B: >=7, C: >=6, D: >=4, F: <4
 */
export function gradeToLetter(media: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (media >= 9) return 'A';
  if (media >= 7) return 'B';
  if (media >= 6) return 'C';
  if (media >= 4) return 'D';
  return 'F';
}

/**
 * Calcula as médias e status de um aluno
 */
export function calculateGrades(
  p1: string | number,
  p2: string | number,
  trabalho: string | number,
  p3?: string | number
): GradeResult {
  try {
    const p1Val = validateGrade(p1);
    const p2Val = validateGrade(p2);
    const trabalhoVal = validateGrade(trabalho);
    
    const mediaInicial = weightedAverage(p1Val, p2Val, trabalhoVal);
    let mediaFinal = mediaInicial;
    
    // Se não passou e tem P3, calcula nova média
    if (mediaInicial < 6 && p3 !== undefined && p3 !== '') {
      const p3Val = validateGrade(p3);
      mediaFinal = replaceWithP3AndAverage(p1Val, p2Val, p3Val, trabalhoVal);
    }
    
    return {
      mediaInicial: Math.round(mediaInicial * 100) / 100,
      mediaFinal: Math.round(mediaFinal * 100) / 100,
      status: finalStatus(mediaFinal),
      conceito: gradeToLetter(mediaFinal),
    };
  } catch (error) {
    return {
      mediaInicial: 0,
      mediaFinal: 0,
      status: 'Recuperação!',
      conceito: 'F',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Calcula a nota mínima necessária em um componente desconhecido para atingir a média alvo
 */
export function requiredScoreForTarget(
  knownScores: Record<string, number | string | null>,
  weights: Record<string, number>,
  target: number
): RequiredScoreResult {
  let totalKnown = 0;
  let contribKnown = 0;
  
  // Soma dos pesos e contribuições conhecidas
  for (const [comp, weight] of Object.entries(weights)) {
    if (comp in knownScores && knownScores[comp] !== null && knownScores[comp] !== '') {
      try {
        const val = typeof knownScores[comp] === 'string' 
          ? parseFloat(knownScores[comp] as string) 
          : knownScores[comp] as number;
        
        if (isNaN(val)) {
          return {
            possible: false,
            message: `Valor não numérico para ${comp}`,
          };
        }
        
        contribKnown += val * weight;
        totalKnown += weight;
      } catch {
        return {
          possible: false,
          message: `Valor não numérico para ${comp}`,
        };
      }
    }
  }
  
  // Peso do componente desconhecido
  const remainingWeight = 1.0 - totalKnown;
  
  if (remainingWeight <= 0) {
    const final = contribKnown;
    if (final >= target) {
      return {
        possible: true,
        message: `Já atingiu a média alvo (${final.toFixed(2)}) sem necessidade de nota adicional.`,
      };
    } else {
      return {
        possible: false,
        message: `Impossível atingir média alvo; não há componente restante para ajustar (média atual ${final.toFixed(2)}).`,
      };
    }
  }
  
  // Nota necessária no(s) componente(s) restante(s) para atingir target
  const requiredTotal = target - contribKnown;
  const requiredScore = requiredTotal / remainingWeight;
  
  if (requiredScore < 0) {
    return {
      possible: true,
      message: 'Nenhuma nota necessária (qualquer nota >= 0 serve). Nota mínima teórica: 0.',
      requiredScore: 0,
    };
  }
  
  if (requiredScore > 10) {
    return {
      possible: false,
      message: `Impossível atingir média alvo; nota necessária seria ${requiredScore.toFixed(2)} (>10).`,
    };
  }
  
  return {
    possible: true,
    message: `Nota mínima necessária: ${requiredScore.toFixed(2)} (média ponderada nos componentes restantes).`,
    requiredScore: Math.round(requiredScore * 100) / 100,
  };
}
