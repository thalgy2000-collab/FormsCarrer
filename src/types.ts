export type Category = 
  | 'Produto'
  | 'Dados'
  | 'Design'
  | 'Pesquisa'
  | 'Engenharia'
  | 'Programa'
  | 'Operações'
  | 'Growth'
  | 'Insights'
  | 'IA'
  | 'Estratégia'
  | 'Liderança';

export interface Role {
  id: string;
  name: string;
  category: Category;
  x: number; // Specialist (0) to Generalist (10)
  y: number; // Execution (0) to Leadership (10)
}

export interface QuestionOption {
  id: string;
  text: string;
  scoreImpact: {
    axis?: {
      x?: number; // Added to Specialist (negative) or Generalist (positive)
      y?: number; // Added to Execution (negative) or Leadership (positive)
    };
    categories?: Partial<Record<Category, number>>; // Added points to specific categories
  };
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface UserScores {
  axis: {
    x: number;
    y: number;
  };
  categories: Record<Category, number>;
}

export interface MatchResult {
  role: Role;
  score: number;
  explanation: string;
}
