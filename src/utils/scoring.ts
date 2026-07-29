import type { MatchResult, Role, UserScores } from '../types';

const MAX_DISTANCE = Math.sqrt(100 + 100); // 14.14, assuming 10x10 grid

export function calculateTopRoles(
  userScores: UserScores,
  roles: Role[]
): MatchResult[] {
  // Find the maximum category score the user achieved to normalize affinities (scale 0 a 1)
  const maxUserCategoryScore = Math.max(1, ...Object.values(userScores.categories));
  
  // Discover user's top category for the action pattern explanation
  let topCategory = 'Produto';
  let topScore = -1;
  Object.entries(userScores.categories).forEach(([cat, score]) => {
    if (score > topScore) {
      topScore = score as number;
      topCategory = cat;
    }
  });

  const patterns: Record<string, string> = {
    Dados: 'você tendeu a resolver os problemas puxando dados antes de agir',
    Pesquisa: 'você teve forte inclinação para investigar a fundo e ouvir os usuários',
    Engenharia: 'suas decisões mostraram foco em resolver problemas técnicos complexos',
    Operações: 'você priorizou estruturar processos e destravar obstáculos entre áreas',
    Estratégia: 'você tendeu a tomar decisões baseadas na visão de negócio de longo prazo',
    Design: 'você focou intensamente em simplificar a experiência do usuário',
    Growth: 'suas respostas apontaram para rápida experimentação e validação',
    Insights: 'você buscou cruzar informações para descobrir padrões invisíveis',
    IA: 'você buscou aplicar inovação e IA para alavancar soluções',
    Produto: 'você tendeu a orquestrar times e equilibrar necessidades diversas',
    Programa: 'você priorizou estruturar processos e destravar obstáculos entre áreas',
    Liderança: 'você preferiu direcionar pessoas e empoderar o time em vez de executar',
  };
  const actionPattern = patterns[topCategory] || patterns['Produto'];
  
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
    let explanation = `Top match! Você demonstrou forte alinhamento com a área de ${role.category} (afinidade de ${Math.round(normalizedAffinity * 100)}%). `;
    explanation += `Notamos que ${actionPattern}, o que reforça esse destaque. `;
    explanation += `Além disso, sua posição na matriz de liderança x especialização (X:${userX.toFixed(1)}, Y:${userY.toFixed(1)}) `;
    
    if (normalizedDistance < 0.2) {
      explanation += `é extremamente próxima ao esperado para ${role.name}.`;
    } else if (normalizedDistance < 0.4) {
      explanation += `é bem alinhada ao perfil de ${role.name}.`;
    } else {
      explanation += `indica um bom desafio em relação ao seu momento atual de atuação.`;
    }

    return {
      role,
      score: finalScore,
      explanation
    };
  });

  // Sort by highest score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 3);
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
