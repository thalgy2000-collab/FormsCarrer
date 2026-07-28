import type { Category, MatchResult, Role, UserScores } from '../types';

const MAX_DISTANCE = Math.sqrt(100 + 100); // 14.14, assuming 10x10 grid

export function calculateTopRoles(
  userScores: UserScores,
  roles: Role[]
): MatchResult[] {
  // Normalize category scores (assuming a max possible score of 30 for simplicity)
  // We can adjust the MAX_CATEGORY_SCORE once the real questions are provided
  const MAX_CATEGORY_SCORE = 30;
  
  const results: MatchResult[] = roles.map(role => {
    // 1. Calculate Normalized Euclidean Distance
    const dx = userScores.axis.x - role.x;
    const dy = userScores.axis.y - role.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDistance = distance / MAX_DISTANCE;

    // 2. Calculate Normalized Category Affinity
    const rawCategoryScore = userScores.categories[role.category] || 0;
    const normalizedAffinity = Math.min(1, rawCategoryScore / MAX_CATEGORY_SCORE);

    // 3. Apply the custom formula
    const finalScore = (0.6 * normalizedAffinity) - (0.4 * normalizedDistance);

    // 4. Generate explanation
    let explanation = `Você tem uma afinidade de ${Math.round(normalizedAffinity * 100)}% com a área de ${role.category}`;
    if (normalizedDistance < 0.2) {
      explanation += ` e um perfil incrivelmente alinhado aos eixos de atuação desse cargo.`;
    } else if (normalizedDistance < 0.5) {
      explanation += ` com um bom alinhamento em relação ao seu perfil de execução/liderança e especialização.`;
    } else {
      explanation += `, mas o perfil de atuação difere um pouco do seu momento atual.`;
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
      Product: 0,
      Data: 0,
      Design: 0,
      Research: 0,
      Engineering: 0,
      'Program/Ops': 0,
      Growth: 0,
      Insights: 0,
      IA: 0,
      Strategy: 0,
    }
  };
}
