import type { Question } from '../types';

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Um cliente grande pede uma feature específica que não está no roadmap. Como você conduz isso?',
    options: [
      { id: 'q1_a', text: 'Levanto se esse padrão de pedido já apareceu em conversas com outros clientes e times de atendimento', scoreImpact: { categories: { Insights: 3 } } },
      { id: 'q1_b', text: 'Avalio como esse pedido se encaixa (ou não) na visão de produto de 1 ano', scoreImpact: { categories: { Estratégia: 3 }, axis: { x: 1 } } },
      { id: 'q1_c', text: 'Já esboço tecnicamente como a solução funcionaria e qual seria o esforço de implementação', scoreImpact: { categories: { Engenharia: 3 }, axis: { x: -1 } } },
      { id: 'q1_d', text: 'Registro o pedido no backlog e decido a prioridade dele frente ao resto do roadmap atual', scoreImpact: { categories: { Produto: 3 } } }
    ]
  },
  {
    id: 'q2',
    text: 'Dois squads estão competindo pelo mesmo time de Design pro mesmo trimestre. Como você resolve?',
    options: [
      { id: 'q2_a', text: 'Crio um processo de alocação compartilhada e documento os critérios pra próxima vez', scoreImpact: { categories: { Operações: 3, Programa: 2 } } },
      { id: 'q2_b', text: 'Peço dados de impacto esperado de cada squad pra decidir com base em números', scoreImpact: { categories: { Dados: 2 } } },
      { id: 'q2_c', text: 'Reorganizo o escopo de design pra que ele sirva aos dois squads com menos esforço', scoreImpact: { categories: { Design: 3 } } },
      { id: 'q2_d', text: 'Levo a decisão pra liderança executiva resolver, dado que envolve prioridade entre áreas', scoreImpact: { categories: { Estratégia: 1, Liderança: 2 } } }
    ]
  },
  {
    id: 'q3',
    text: 'Seu time ganhou acesso a uma ferramenta de IA generativa. Qual seria seu papel natural nesse momento?',
    options: [
      { id: 'q3_a', text: 'Testar diferentes modelos e prompts pra ver a qualidade real do resultado gerado', scoreImpact: { categories: { IA: 3 }, axis: { x: -1 } } },
      { id: 'q3_b', text: 'Definir os critérios de aceite e organizar o teste como um item de backlog', scoreImpact: { categories: { IA: 2, Produto: 2 }, axis: { x: -1 } } },
      { id: 'q3_c', text: 'Pensar se isso abre uma frente estratégica maior de automação', scoreImpact: { categories: { Estratégia: 1, IA: 2 }, axis: { x: 2 } } },
      { id: 'q3_d', text: 'Focar em como isso seria recebido pelo usuário e onde geraria mais valor de experiência', scoreImpact: { categories: { Design: 1, Pesquisa: 2 } } }
    ]
  },
  {
    id: 'q4',
    text: 'O CAC (custo de aquisição de cliente) está subindo, e a empresa quer melhorar isso sem gastar mais em mídia. Por onde você começa?',
    options: [
      { id: 'q4_a', text: 'Melhoro o onboarding pra converter melhor quem já chegou, sem precisar de mais tráfego', scoreImpact: { categories: { Growth: 2, Design: 2 } } },
      { id: 'q4_b', text: 'Rodo experimentos pra melhorar as taxas de conversão em cada etapa do funil', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q4_c', text: 'Uso um modelo preditivo pra identificar os perfis com maior propensão de conversão', scoreImpact: { categories: { Dados: 1, IA: 3 } } },
      { id: 'q4_d', text: 'Entrevisto quem desistiu no meio do funil de aquisição pra entender a barreira', scoreImpact: { categories: { Pesquisa: 3 } } }
    ]
  },
  {
    id: 'q5',
    text: 'Uma reportagem de mercado aponta que seu setor está saturado e o crescimento vai desacelerar. Qual sua primeira reação?',
    options: [
      { id: 'q5_a', text: 'Reavalio se ainda temos um diferencial competitivo sustentável nesse cenário', scoreImpact: { categories: { Estratégia: 3 }, axis: { x: 1 } } },
      { id: 'q5_b', text: 'Testo novos canais e mensagens pra manter o crescimento mesmo com o mercado mais difícil', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q5_c', text: 'Comparo nossa experiência com a dos concorrentes pra achar onde ainda podemos vencer', scoreImpact: { categories: { Design: 2, Pesquisa: 1 } } },
      { id: 'q5_d', text: 'Analiso os números de retenção pra ver se a saturação já está afetando a gente de fato', scoreImpact: { categories: { Dados: 1 } } }
    ]
  },
  {
    id: 'q6',
    text: 'Você está em início de carreira em Produto, cuidando de uma parte pequena do produto com apoio de alguém mais experiente. Como você vive essa fase?',
    options: [
      { id: 'q6_a', text: 'Aproveito pra aprender a fundo como dados, engenharia e design conversam entre si', scoreImpact: { categories: { Produto: 2 }, axis: { x: -1, y: -2 } } },
      { id: 'q6_b', text: 'Quero logo pegar mais responsabilidade e ampliar meu escopo, mesmo ainda iniciante', scoreImpact: { axis: { x: 1, y: -1 } } },
      { id: 'q6_c', text: 'Já penso em quando vou liderar pessoas, mais do que só entregar tarefas', scoreImpact: { categories: { Liderança: 2 }, axis: { y: 2 } } },
      { id: 'q6_d', text: 'Prefiro virar referência técnica numa coisa específica antes de olhar pro resto', scoreImpact: { categories: { Engenharia: 1 }, axis: { x: -1 } } }
    ]
  },
  {
    id: 'q7',
    text: 'Um estagiário te procura porque não sabe como resolver um bug que trava a entrega da sprint. O que você faz?',
    options: [
      { id: 'q7_a', text: 'Sento com ele e resolvo junto, explicando o raciocínio passo a passo', scoreImpact: { categories: { Engenharia: 3 } } },
      { id: 'q7_b', text: 'Dou uma direção geral e deixo ele tentar resolver sozinho primeiro', scoreImpact: { axis: { x: 1, y: 1 } } },
      { id: 'q7_c', text: 'Sugiro que ele procure alguém mais experiente no time técnico — não é minha praia', scoreImpact: { axis: { y: -1 } } },
      { id: 'q7_d', text: 'Chamo outras pessoas pra olhar com outro ângulo, e documento a solução pra próxima vez', scoreImpact: { categories: { Operações: 2, Programa: 2 } } }
    ]
  },
  {
    id: 'q8',
    text: 'Você nota que um grupo pequeno de usuários usa o produto de um jeito completamente diferente do esperado. O que faz com essa descoberta?',
    options: [
      { id: 'q8_a', text: 'Confirmo com números se esse comportamento é estatisticamente relevante', scoreImpact: { categories: { Dados: 3 }, axis: { x: -1 } } },
      { id: 'q8_b', text: 'Faço entrevistas pra entender o motivo desse uso alternativo', scoreImpact: { categories: { Pesquisa: 2, Insights: 2 } } },
      { id: 'q8_c', text: 'Penso se isso pode virar uma nova frente de produto', scoreImpact: { categories: { Estratégia: 1 }, axis: { x: 1 } } },
      { id: 'q8_d', text: 'Avalio se dá pra automatizar a detecção desse tipo de padrão com IA', scoreImpact: { categories: { IA: 3, Engenharia: 1 } } }
    ]
  },
  {
    id: 'q9',
    text: 'Se você tivesse que escolher, prefere:',
    options: [
      { id: 'q9_a', text: 'Ser o melhor em uma coisa muito específica', scoreImpact: { axis: { x: -3 } } },
      { id: 'q9_b', text: 'Ser bom o suficiente em várias coisas pra conectar tudo', scoreImpact: { axis: { x: 3 } } }
    ]
  },
  {
    id: 'q10',
    text: 'Te oferecem a vaga de responsável único pela estratégia de produto de uma empresa inteira, reportando direto ao board. Você toparia hoje?',
    options: [
      { id: 'q10_a', text: 'Ainda não — prefiro ganhar mais profundidade técnica ou de execução antes', scoreImpact: { axis: { y: -2, x: -2 } } },
      { id: 'q10_b', text: 'Sim, sem dúvida — já me sinto pronto(a) pra esse nível de responsabilidade', scoreImpact: { categories: { Liderança: 3 }, axis: { y: 2, x: 2 } } },
      { id: 'q10_c', text: 'Topo, mas prefiro construir isso aos poucos, formando processos e pessoas no caminho', scoreImpact: { categories: { Operações: 1, Liderança: 1, Programa: 1 }, axis: { y: 1 } } },
      { id: 'q10_d', text: 'Prefiro influenciar essas decisões sem carregar a responsabilidade final', scoreImpact: { categories: { Estratégia: 1 } } }
    ]
  }
];
