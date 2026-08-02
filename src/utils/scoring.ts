import type { MatchResult, Role, UserScores, Category } from '../types';
import { mockQuestions } from '../data/questions';

const MAX_DISTANCE = Math.sqrt(100 + 100); // 14.14, assuming 10x10 grid

export interface AnalysisResult {
  topRoles: MatchResult[];
  dominantCategory: string;
  secondaryCategory: string;
  dominantPattern: string;
}

/**
 * Calcula o teto (pontuação máxima possível) para cada categoria,
 * iterando sobre todas as perguntas e pegando a maior pontuação disponível para a categoria.
 */
export function calculateCategoryMaxPossible(): Record<string, number> {
  const categoryMaxPossible: Record<string, number> = {};
  
  mockQuestions.forEach(q => {
    const questionCategoryMax: Record<string, number> = {};
    
    q.options.forEach(opt => {
      if (opt.scoreImpact.categories) {
        Object.entries(opt.scoreImpact.categories).forEach(([cat, val]) => {
          if (!questionCategoryMax[cat] || val > questionCategoryMax[cat]) {
            questionCategoryMax[cat] = val;
          }
        });
      }
    });

    Object.entries(questionCategoryMax).forEach(([cat, val]) => {
      categoryMaxPossible[cat] = (categoryMaxPossible[cat] || 0) + val;
    });
  });

  return categoryMaxPossible;
}

export function analyzeUser(
  userScores: UserScores,
  roles: Role[]
): AnalysisResult {
  // 1. Calcular o teto de cada categoria
  const categoryMaxPossible = calculateCategoryMaxPossible();

  // 2. Calcular a afinidade normalizada de TODAS as categorias e ordená-las
  const categoryAffinities = Object.keys(userScores.categories).map(c => {
    const cat = c as Category;
    const rawScore = userScores.categories[cat] || 0;
    const maxPossible = categoryMaxPossible[cat] || 1; // fallback to 1 to avoid div/0
    const affinity = Math.max(0, Math.min(1, rawScore / maxPossible));
    return { category: cat, affinity };
  });

  // Ordena por maior afinidade normalizada
  categoryAffinities.sort((a, b) => b.affinity - a.affinity);

  // A categoria dominante passa a ser a com maior afinidade normalizada,
  // e a secundária a segunda maior.
  const dominantCategory = categoryAffinities[0]?.category || 'Produto';
  const secondaryCategory = categoryAffinities.length > 1 ? categoryAffinities[1].category : '';

  // Clamp user coordinates to the 0-10 scale defined by the matrix
  const userX = Math.max(0, Math.min(10, userScores.axis.x));
  const userY = Math.max(0, Math.min(10, userScores.axis.y));

  const results: MatchResult[] = roles.map(role => {
    // 1. Calculate Normalized Euclidean Distance (scale 0 a 1)
    const dx = userX - role.x;
    const dy = userY - role.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDistance = Math.min(1, distance / MAX_DISTANCE);

    // 2. Reutilizar a afinidade normalizada já calculada para esta categoria
    const roleAffinityObj = categoryAffinities.find(c => c.category === role.category);
    const normalizedAffinity = roleAffinityObj ? roleAffinityObj.affinity : 0;

    // 3. Apply the custom formula: score_cargo = 0.5 * afinidade - 0.5 * distancia
    const finalScore = (0.5 * normalizedAffinity) - (0.5 * normalizedDistance);

    // 4. Generate explanation
    let explanation = `Alinhamento de ${Math.round(normalizedAffinity * 100)}% com a área de ${role.category}. `;
    explanation += `Sua posição nos eixos Especialista↔Generalista e Execução↔Liderança `;
    
    if (normalizedDistance < 0.2) {
      explanation += `é extremamente próxima ao exigido pelo cargo.`;
    } else if (normalizedDistance < 0.4) {
      explanation += `é bem alinhada ao perfil da vaga.`;
    } else {
      explanation += `indica um bom desafio de adaptação para o seu momento atual.`;
    }

    return {
      role,
      score: finalScore,
      explanation
    };
  });

  // Sort by highest score descending
  results.sort((a, b) => b.score - a.score);
  const topRoles = results.slice(0, 3);

  const patterns: Record<string, string> = {
    Dados: 'você tende a resolver os problemas buscando evidências e métricas antes de agir',
    Pesquisa: 'você tem forte inclinação para investigar a fundo e ouvir os usuários',
    Engenharia: 'suas decisões mostram um foco em resolver problemas técnicos complexos',
    Operações: 'você prioriza estruturar processos e destravar obstáculos entre áreas',
    Estratégia: 'você toma decisões pensando na visão de negócio de longo prazo',
    Design: 'você foca intensamente em simplificar a experiência do usuário',
    Growth: 'suas respostas apontam para rápida experimentação e foco em conversão',
    Insights: 'você busca cruzar informações qualitativas para descobrir padrões invisíveis',
    IA: 'você busca aplicar inovações tecnológicas para escalar soluções',
    Produto: 'você tende a orquestrar times e equilibrar necessidades diversas',
    Programa: 'você prioriza estruturar processos e destravar obstáculos entre áreas',
    Liderança: 'você prefere direcionar pessoas e empoderar o time em vez de executar',
  };

  const dominantPattern = patterns[dominantCategory] || patterns['Produto'];

  // Add contextual hint about dominant/secondary to the role explanations
  topRoles.forEach(r => {
    if (r.role.category === dominantCategory) {
      r.explanation = `Destaque na sua área dominante (${dominantCategory}). ` + r.explanation;
    } else if (r.role.category === secondaryCategory) {
      r.explanation = `Combina com sua área secundária (${secondaryCategory}). ` + r.explanation;
    }
  });

  return {
    topRoles,
    dominantCategory,
    secondaryCategory,
    dominantPattern
  };
}

export function getInitialScores(): UserScores {
  return {
    axis: { x: 5, y: 5 }, // Start in the middle
    categories: {
      Produto: 0,
      Dados: 0,
      Design: 0,
      Pesquisa: 0,
      Engenharia: 0,
      Programa: 0,
      Operações: 0,
      Growth: 0,
      Insights: 0,
      IA: 0,
      Estratégia: 0,
      Liderança: 0,
    }
  };
}
