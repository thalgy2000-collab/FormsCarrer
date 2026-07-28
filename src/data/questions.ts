import type { Question } from '../types';

export const mockQuestions: Question[] = Array.from({ length: 15 }, (_, i) => ({
  id: `q${i + 1}`,
  text: `Pergunta de exemplo ${i + 1}: Como você lida com esse cenário na sua rotina?`,
  options: [
    {
      id: `q${i + 1}_opt1`,
      text: `Gosto de me aprofundar tecnicamente no problema e executar a solução.`,
      scoreImpact: {
        axis: { x: -2, y: -2 }, // More specialist, more execution
        categories: { Engineering: 2, Data: 1 }
      }
    },
    {
      id: `q${i + 1}_opt2`,
      text: `Prefiro orquestrar as equipes e garantir que a estratégia seja cumprida.`,
      scoreImpact: {
        axis: { x: 2, y: 2 }, // More generalist, more leadership
        categories: { Strategy: 2, 'Program/Ops': 1 }
      }
    },
    {
      id: `q${i + 1}_opt3`,
      text: `Gosto de analisar as métricas e otimizar as taxas de conversão.`,
      scoreImpact: {
        axis: { x: 0, y: -1 }, 
        categories: { Growth: 2, Insights: 1 }
      }
    },
    {
      id: `q${i + 1}_opt4`,
      text: `Foco muito na experiência do usuário e em pesquisas qualitativas.`,
      scoreImpact: {
        axis: { x: -1, y: 0 }, 
        categories: { Design: 2, Research: 1 }
      }
    }
  ]
}));
