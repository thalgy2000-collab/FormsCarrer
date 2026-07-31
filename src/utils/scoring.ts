import type { MatchResult, Role, UserScores } from '../types';

const MAX_DISTANCE = Math.sqrt(100 + 100); // 14.14, assuming 10x10 grid

export interface AnalysisResult {
  topRoles: MatchResult[];
  dominantCategory: string;
  secondaryCategory: string;
  dominantPattern: string;
}

export function analyzeUser(
  userScores: UserScores,
  roles: Role[]
): AnalysisResult {
  // Find the maximum category score the user achieved to normalize affinities (scale 0 a 1)
  const maxUserCategoryScore = Math.max(1, ...Object.values(userScores.categories));
  
  // Clamp user coordinates to the 0-10 scale defined by the matrix
  const userX = Math.max(0, Math.min(10, userScores.axis.x));
  const userY = Math.max(0, Math.min(10, userScores.axis.y));

  const results: MatchResult[] = roles.map(role => {
    // 1. Calculate Normalized Euclidean Distance (scale 0 a 1)
    const dx = userX - role.x;
    const dy = userY - role.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDistance = Math.min(1, distance / MAX_DISTANCE);

    // 2. Calculate Normalized Category Affinity (scale 0 a 1)
    const rawCategoryScore = userScores.categories[role.category] || 0;
    const normalizedAffinity = Math.max(0, Math.min(1, rawCategoryScore / maxUserCategoryScore));

    // 3. Apply the custom formula: score_cargo = 0.6 * afinidade - 0.4 * distancia
    const finalScore = (0.6 * normalizedAffinity) - (0.4 * normalizedDistance);

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

  // Determine Dominant and Secondary categories from Top 3 roles to guarantee consistency
  const catCounts: Record<string, number> = {};
  topRoles.forEach(r => {
    catCounts[r.role.category] = (catCounts[r.role.category] || 0) + 1;
  });
  
  const sortedCats = Object.entries(catCounts).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    // Tie breaker: the one that appears first in topRoles
    const indexA = topRoles.findIndex(r => r.role.category === a[0]);
    const indexB = topRoles.findIndex(r => r.role.category === b[0]);
    return indexA - indexB;
  });

  const dominantCategory = sortedCats[0][0];
  let secondaryCategory = sortedCats.length > 1 ? sortedCats[1][0] : '';

  // If top 3 roles are all the exact same category, fallback to user's raw scores for secondary
  if (!secondaryCategory) {
    const rawSorted = Object.entries(userScores.categories)
      .sort((a, b) => (b[1] as number) - (a[1] as number));
    const nextBest = rawSorted.find(c => c[0] !== dominantCategory);
    if (nextBest) secondaryCategory = nextBest[0];
  }

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
