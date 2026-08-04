import type { Question } from '../types';

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Sua empresa lança uma nova versão do app e, no dia seguinte, as avaliações na loja despencam. O que você faz primeiro?',
    options: [
      { id: 'q1_a', text: 'Comparo os dados de uso antes e depois do lançamento pra isolar o que mudou', scoreImpact: { categories: { Dados: 3 }, axis: { x: -1 } } },
      { id: 'q1_b', text: 'Leio e respondo pessoalmente as avaliações mais negativas pra entender o que aconteceu', scoreImpact: { categories: { Pesquisa: 3 } } },
      { id: 'q1_c', text: 'Verifico os logs de erro e os crashes reportados desde o deploy', scoreImpact: { categories: { Engenharia: 3 }, axis: { x: -1 } } },
      { id: 'q1_d', text: 'Monto um plano de ação com o time, dividindo quem investiga cada hipótese, e registro isso pra referência futura', scoreImpact: { categories: { Operações: 2, Programa: 1 } } }
    ]
  },
  {
    id: 'q2',
    text: 'Um investidor pergunta por que vocês não têm uma feature que o concorrente já lançou. Como você responde?',
    options: [
      { id: 'q2_a', text: 'Explico com base no que já ouvimos de clientes sobre essa necessidade (ou a falta dela)', scoreImpact: { categories: { Insights: 3 } } },
      { id: 'q2_b', text: 'Explico como essa decisão se conecta com o posicionamento de longo prazo que escolhemos', scoreImpact: { categories: { Estratégia: 3 }, axis: { x: 1 } } },
      { id: 'q2_c', text: 'Explico as limitações técnicas atuais que tornam essa feature mais cara de construir', scoreImpact: { categories: { Engenharia: 3 }, axis: { x: -2 } } },
      { id: 'q2_d', text: 'Explico onde ela está no nosso roadmap e por que outras coisas vieram na frente', scoreImpact: { categories: { Produto: 3 } } }
    ]
  },
  {
    id: 'q3',
    text: 'Dois squads estão competindo pelo mesmo time de Design pro mesmo trimestre. Como você resolve?',
    options: [
      { id: 'q3_a', text: 'Crio um processo de alocação compartilhada e documento os critérios pra próxima vez', scoreImpact: { categories: { Operações: 3, Programa: 1 } } },
      { id: 'q3_b', text: 'Peço dados de impacto esperado de cada squad pra decidir com base em números', scoreImpact: { categories: { Dados: 2 }, axis: { x: -1 } } },
      { id: 'q3_c', text: 'Reorganizo o escopo de design pra que ele sirva aos dois squads com menos esforço', scoreImpact: { categories: { Design: 3 } } },
      { id: 'q3_d', text: 'Levo a decisão pra liderança executiva resolver, dado que envolve prioridade entre áreas', scoreImpact: { categories: { Estratégia: 2, Liderança: 1 } } }
    ]
  },
  {
    id: 'q4',
    text: 'Alguém do time sugere usar IA generativa pra escrever automaticamente as descrições de produto no site. Qual seria seu papel natural nesse momento?',
    options: [
      { id: 'q4_a', text: 'Testar diferentes modelos e prompts pra ver a qualidade real do texto gerado', scoreImpact: { categories: { IA: 3 }, axis: { x: -2 } } },
      { id: 'q4_b', text: 'Definir os critérios de aceite e organizar o teste como um item de backlog', scoreImpact: { categories: { IA: 2, Produto: 1 }, axis: { x: -1 } } },
      { id: 'q4_c', text: 'Pensar se isso abre uma frente estratégica maior de automação de conteúdo', scoreImpact: { categories: { Estratégia: 1, IA: 2 }, axis: { x: 2 } } },
      { id: 'q4_d', text: 'Avaliar como isso afeta a percepção de qualidade do usuário sobre a marca', scoreImpact: { categories: { Design: 1, Pesquisa: 2 } } }
    ]
  },
  {
    id: 'q5',
    text: 'Você recebe uma nota baixa recorrente numa pesquisa de satisfação (NPS), sem comentário explicando o motivo. O que faz?',
    options: [
      { id: 'q5_a', text: 'Reviso o fluxo mais recente que os detratores usaram, procurando pontos de fricção visual', scoreImpact: { categories: { Design: 3 } } },
      { id: 'q5_b', text: 'Cruzo a nota baixa com o comportamento de uso desses usuários nos dados', scoreImpact: { categories: { Dados: 3 }, axis: { x: -1 } } },
      { id: 'q5_c', text: 'Entro em contato direto com alguns detratores pra entender o motivo', scoreImpact: { categories: { Pesquisa: 3 } } },
      { id: 'q5_d', text: 'Verifico se esse padrão de insatisfação aparece em outras fontes (atendimento, redes sociais)', scoreImpact: { categories: { Insights: 3 } } }
    ]
  },
  {
    id: 'q6',
    text: 'O CAC (custo de aquisição de cliente) está subindo, e a empresa quer melhorar isso sem gastar mais em mídia. Por onde você começa?',
    options: [
      { id: 'q6_a', text: 'Melhoro o onboarding pra converter melhor quem já chegou, sem precisar de mais tráfego', scoreImpact: { categories: { Growth: 2, Design: 2 } } },
      { id: 'q6_b', text: 'Rodo experimentos pra melhorar as taxas de conversão em cada etapa do funil', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q6_c', text: 'Uso um modelo preditivo pra identificar os perfis com maior propensão de conversão', scoreImpact: { categories: { Dados: 2, IA: 1 } } },
      { id: 'q6_d', text: 'Entrevisto quem desistiu no meio do funil de aquisição pra entender a barreira', scoreImpact: { categories: { Pesquisa: 3 } } }
    ]
  },
  {
    id: 'q7',
    text: 'A empresa decide congelar contratações por 6 meses, e seu time vai ficar menor. Como você reorganiza o trabalho?',
    options: [
      { id: 'q7_a', text: 'Corto as iniciativas que geram menos retorno mensurável primeiro', scoreImpact: { categories: { Dados: 2 }, axis: { x: 1 } } },
      { id: 'q7_b', text: 'Realinho tudo com o que é realmente prioritário pro próximo ano', scoreImpact: { categories: { Estratégia: 3 }, axis: { x: 2 } } },
      { id: 'q7_c', text: 'Renegocio prazos e dependências com cada área afetada, com um cronograma novo', scoreImpact: { categories: { Programa: 3 } } },
      { id: 'q7_d', text: 'Priorizo o que resolve as dores mais fortes que os usuários já relataram', scoreImpact: { categories: { Pesquisa: 2, Insights: 1 } } }
    ]
  },
  {
    id: 'q8',
    text: 'Uma reportagem de mercado aponta que seu setor está saturado e o crescimento vai desacelerar. Qual sua primeira reação?',
    options: [
      { id: 'q8_a', text: 'Reavalio se ainda temos um diferencial competitivo sustentável nesse cenário', scoreImpact: { categories: { Estratégia: 3 }, axis: { x: 2 } } },
      { id: 'q8_b', text: 'Testo novos canais e mensagens pra manter o crescimento mesmo com o mercado mais difícil', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q8_c', text: 'Comparo nossa experiência com a dos concorrentes pra achar onde ainda podemos vencer', scoreImpact: { categories: { Design: 2, Pesquisa: 1 } } },
      { id: 'q8_d', text: 'Analiso os números de retenção pra ver se a saturação já está afetando a gente de fato', scoreImpact: { categories: { Dados: 2 } } }
    ]
  },
  {
    id: 'q9',
    text: 'Você está em início de carreira em Produto, cuidando de uma parte pequena do produto com apoio de alguém mais experiente. Como você vive essa fase?',
    options: [
      { id: 'q9_a', text: 'Aproveito pra aprender a fundo como dados, engenharia e design conversam entre si', scoreImpact: { categories: { Produto: 2 }, axis: { x: -2, y: -2 } } },
      { id: 'q9_b', text: 'Quero logo pegar mais responsabilidade e ampliar meu escopo, mesmo ainda iniciante', scoreImpact: { axis: { x: 1, y: -1 } } },
      { id: 'q9_c', text: 'Já penso em quando vou liderar pessoas, mais do que só entregar tarefas', scoreImpact: { categories: { Liderança: 1 }, axis: { y: 2 } } },
      { id: 'q9_d', text: 'Prefiro virar referência técnica numa coisa específica antes de olhar pro resto', scoreImpact: { categories: { Engenharia: 1 }, axis: { x: -2 } } }
    ]
  },
  {
    id: 'q10',
    text: 'Um estagiário te procura porque não sabe como resolver um bug que trava a entrega da sprint. O que você faz?',
    options: [
      { id: 'q10_a', text: 'Sento com ele e resolvo junto, explicando o raciocínio passo a passo', scoreImpact: { categories: { Engenharia: 3 } } },
      { id: 'q10_b', text: 'Dou uma direção geral e deixo ele tentar resolver sozinho primeiro', scoreImpact: { axis: { x: 1, y: 1 } } },
      { id: 'q10_c', text: 'Sugiro que ele procure alguém mais experiente no time técnico — não é minha praia', scoreImpact: { axis: { y: -2 } } },
      { id: 'q10_d', text: 'Chamo outras pessoas pra olhar com outro ângulo, e documento a solução pra próxima vez', scoreImpact: { categories: { Operações: 2, Programa: 1 } } }
    ]
  },
  {
    id: 'q11',
    text: 'O CEO quer anunciar uma parceria estratégica amanhã, mas pede sua opinião hoje à noite, sem tempo de levantar nada. Como você reage?',
    options: [
      { id: 'q11_a', text: 'Peço pelo menos uma métrica-chave antes de dar minha opinião final', scoreImpact: { categories: { Dados: 2 }, axis: { x: -1 } } },
      { id: 'q11_b', text: 'Dou minha opinião com base na visão de mercado que já tenho formada', scoreImpact: { categories: { Estratégia: 3 }, axis: { x: 2 } } },
      { id: 'q11_c', text: 'Dou minha opinião, mas já penso em como vamos validar se foi uma boa decisão', scoreImpact: { categories: { Produto: 2, Dados: 1 } } },
      { id: 'q11_d', text: 'Dou minha opinião, mas registro os riscos e dependências envolvidos pra acompanhar depois', scoreImpact: { categories: { Programa: 2 } } }
    ]
  },
  {
    id: 'q12',
    text: 'Você nota que um grupo pequeno de usuários usa o produto de um jeito completamente diferente do esperado. O que faz com essa descoberta?',
    options: [
      { id: 'q12_a', text: 'Confirmo com números se esse comportamento é estatisticamente relevante', scoreImpact: { categories: { Dados: 3 }, axis: { x: -1 } } },
      { id: 'q12_b', text: 'Faço entrevistas pra entender o motivo desse uso alternativo', scoreImpact: { categories: { Pesquisa: 2, Insights: 2 } } },
      { id: 'q12_c', text: 'Penso se isso pode virar uma nova frente de produto', scoreImpact: { categories: { Estratégia: 2 }, axis: { x: 1 } } },
      { id: 'q12_d', text: 'Avalio se dá pra automatizar a detecção desse tipo de padrão com IA', scoreImpact: { categories: { IA: 2, Engenharia: 1 } } }
    ]
  },
  {
    id: 'q13',
    text: 'Se você tivesse que escolher, prefere:',
    options: [
      { id: 'q13_a', text: 'Ser o melhor em uma coisa muito específica', scoreImpact: { axis: { x: -3 } } },
      { id: 'q13_b', text: 'Ser bom o suficiente em várias coisas pra conectar tudo', scoreImpact: { axis: { x: 3 } } }
    ]
  },
  {
    id: 'q14',
    text: 'Te oferecem a vaga de responsável único pela estratégia de produto de uma empresa inteira, reportando direto ao board. Você toparia hoje?',
    options: [
      { id: 'q14_a', text: 'Ainda não — prefiro ganhar mais profundidade técnica ou de execução antes', scoreImpact: { axis: { y: -2, x: -2 } } },
      { id: 'q14_b', text: 'Sim, sem dúvida — já me sinto pronto(a) pra esse nível de responsabilidade', scoreImpact: { categories: { Liderança: 3 }, axis: { y: 2, x: 2 } } },
      { id: 'q14_c', text: 'Topo, mas prefiro construir isso aos poucos, formando processos e pessoas no caminho', scoreImpact: { categories: { Operações: 1, Liderança: 1 }, axis: { y: 1 } } },
      { id: 'q14_d', text: 'Prefiro influenciar essas decisões sem carregar a responsabilidade final', scoreImpact: { categories: { Estratégia: 2 } } }
    ]
  },
  {
    id: 'q15',
    text: 'Qual dessas afirmações mais soa como "eu" hoje em dia?',
    options: [
      { id: 'q15_a', text: 'Estou construindo experiência de execução, quero aprender fazendo', scoreImpact: { axis: { y: -2, x: -1 } } },
      { id: 'q15_b', text: 'Já sei executar bem, quero aprender a pensar estratégia/negócio', scoreImpact: { axis: { y: 1, x: 1 } } },
      { id: 'q15_c', text: 'Já penso estratégia, quero aprender a formar/liderar times', scoreImpact: { axis: { y: 1 } } },
      { id: 'q15_d', text: 'Já lidero, quero ampliar escopo (mais generalista/executivo)', scoreImpact: { axis: { y: 1, x: 2 } } }
    ]
  }
];
