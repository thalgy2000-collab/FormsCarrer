import type { Question } from '../types';

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'A conversão do produto caiu 15% do dia pra noite, sem aviso. Qual é sua primeira ação?',
    options: [
      { id: 'q1_a', text: 'Abro os dashboards e crio segmentações pra achar em que etapa do funil começou a queda', scoreImpact: { axis: { x: -1 }, categories: { Dados: 3 } } },
      { id: 'q1_b', text: 'Ligo pra 5 usuários que cancelaram essa semana pra entender o que mudou na experiência deles', scoreImpact: { categories: { Pesquisa: 3 } } },
      { id: 'q1_c', text: 'Verifico se algum deploy recente quebrou alguma parte do fluxo técnico', scoreImpact: { axis: { x: -1 }, categories: { Engenharia: 3 } } },
      { id: 'q1_d', text: 'Reúno o time, comunico que isso é prioridade #1 e distribuo quem investiga o quê', scoreImpact: { axis: { y: 2 }, categories: { Operações: 2 } } },
    ]
  },
  {
    id: 'q2',
    text: 'Um cliente grande pede uma feature específica que não está no roadmap. Como você conduz isso?',
    options: [
      { id: 'q2_a', text: 'Verifico nos dados de uso se outros clientes têm o mesmo padrão de necessidade', scoreImpact: { categories: { Dados: 3 } } },
      { id: 'q2_b', text: 'Marco uma call com o cliente pra entender o problema real por trás do pedido', scoreImpact: { categories: { Pesquisa: 3, Insights: 1 } } },
      { id: 'q2_c', text: 'Avalio como esse pedido se encaixa (ou não) na visão de produto de 1 ano', scoreImpact: { axis: { x: 1 }, categories: { Estratégia: 3 } } },
      { id: 'q2_d', text: 'Já esboço mentalmente como a solução técnica funcionaria', scoreImpact: { axis: { x: -1 }, categories: { Engenharia: 2 } } },
    ]
  },
  {
    id: 'q3',
    text: 'Design e Engenharia entram em conflito sobre o prazo de uma feature. O que você faz?',
    options: [
      { id: 'q3_a', text: 'Medio a conversa e ajudo os dois lados a chegar num meio-termo viável', scoreImpact: { axis: { y: 2 }, categories: { Operações: 2 } } },
      { id: 'q3_b', text: 'Trago dados de impacto pra decidir objetivamente o que deve ser priorizado', scoreImpact: { axis: { x: -1 }, categories: { Dados: 2 } } },
      { id: 'q3_c', text: 'Repenso o fluxo de design pra reduzir o escopo técnico necessário', scoreImpact: { categories: { Design: 3 } } },
      { id: 'q3_d', text: 'Escalo a decisão pra liderança, dado o impacto estratégico do atraso', scoreImpact: { axis: { y: 2 }, categories: { Estratégia: 2 } } },
    ]
  },
  {
    id: 'q4',
    text: 'Seu time ganhou acesso a uma ferramenta de IA generativa. Qual seria seu papel natural nesse momento?',
    options: [
      { id: 'q4_a', text: 'Testar tecnicamente os modelos, avaliar limitações e montar um protótipo funcional de como resolveria um problema real', scoreImpact: { axis: { x: -2 }, categories: { IA: 3 } } },
      { id: 'q4_b', text: 'Traduzir isso em requisitos claros pro time técnico e organizar o backlog do que testar primeiro', scoreImpact: { axis: { x: -1 }, categories: { IA: 2, Produto: 1 } } },
      { id: 'q4_c', text: 'Pensar em como isso muda a estratégia de produto e o posicionamento da empresa no médio prazo', scoreImpact: { axis: { x: 2 }, categories: { Estratégia: 2, IA: 1 } } },
      { id: 'q4_d', text: 'Focar em como isso seria recebido pelo usuário e onde geraria mais valor de experiência', scoreImpact: { categories: { Design: 1, Pesquisa: 2 } } },
    ]
  },
  {
    id: 'q5',
    text: 'Um usuário abre um chamado dizendo que o produto está "confuso". Qual sua reação?',
    options: [
      { id: 'q5_a', text: 'Assisto a uma gravação de sessão dele usando o produto pra ver onde travou', scoreImpact: { categories: { Design: 2, Pesquisa: 2 } } },
      { id: 'q5_b', text: 'Puxo o funil de uso dele nos dados pra ver em que etapa ele parou', scoreImpact: { axis: { x: -1 }, categories: { Dados: 3 } } },
      { id: 'q5_c', text: 'Agendo uma entrevista rápida com ele pra entender o contexto completo', scoreImpact: { categories: { Pesquisa: 3 } } },
      { id: 'q5_d', text: 'Verifico se isso é um padrão recorrente entre vários usuários parecidos, cruzando com outras fontes de dado', scoreImpact: { categories: { Insights: 3 } } },
    ]
  },
  {
    id: 'q6',
    text: 'A empresa quer melhorar ativação de novos usuários (transformar quem se cadastra em quem realmente usa o produto). Por onde você começa?',
    options: [
      { id: 'q6_a', text: 'Redesenho o onboarding pra ficar mais simples e destaco o "aha moment" mais rápido possível', scoreImpact: { categories: { Growth: 2, Design: 2 } } },
      { id: 'q6_b', text: 'Rodo experimentos e testes A/B no fluxo de ativação, olhando métricas como D1/D7/D30', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q6_c', text: 'Analiso os dados de coorte pra entender exatamente onde a maioria desiste', scoreImpact: { categories: { Dados: 3 } } },
      { id: 'q6_d', text: 'Entrevisto quem abandonou no meio do processo pra entender o motivo real', scoreImpact: { categories: { Pesquisa: 3 } } },
    ]
  },
  {
    id: 'q7',
    text: 'O time precisa cortar 30% do backlog por restrição de recurso. Como você decide o que corta?',
    options: [
      { id: 'q7_a', text: 'Corto com base no que gera menos impacto de negócio, olhando os números', scoreImpact: { axis: { x: 1 }, categories: { Dados: 2 } } },
      { id: 'q7_b', text: 'Reavalio a estratégia geral e corto o que menos se conecta com a visão de longo prazo', scoreImpact: { axis: { x: 2 }, categories: { Estratégia: 3 } } },
      { id: 'q7_c', text: 'Reúno o time pra decidir junto e alinhar expectativas com todos os squads', scoreImpact: { axis: { y: 3 }, categories: { Operações: 2 } } },
      { id: 'q7_d', text: 'Priorizo o que resolve a dor mais forte que já ouvi diretamente dos usuários', scoreImpact: { categories: { Pesquisa: 2, Insights: 1 } } },
    ]
  },
  {
    id: 'q8',
    text: 'Um concorrente lança uma feature muito parecida com a sua, antes de você. O que você faz primeiro?',
    options: [
      { id: 'q8_a', text: 'Reavalio o posicionamento do produto e onde ainda temos vantagem competitiva sustentável', scoreImpact: { axis: { x: 2 }, categories: { Estratégia: 3 } } },
      { id: 'q8_b', text: 'Testo mensagens/campanhas rápidas de retenção pra reforçar por que o nosso é melhor', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q8_c', text: 'Comparo a experiência de uso das duas soluções lado a lado', scoreImpact: { categories: { Design: 2, Pesquisa: 1 } } },
      { id: 'q8_d', text: 'Olho os dados de retenção pra ver se isso realmente ameaça nossos usuários', scoreImpact: { categories: { Dados: 2 } } },
    ]
  },
  {
    id: 'q9',
    text: 'Você está em início de carreira em Produto, atuando num escopo bem delimitado (uma feature, um fluxo específico) com apoio de alguém mais sênior. Como você encara essa fase?',
    options: [
      { id: 'q9_a', text: 'Quero aproveitar pra construir repertório: aprender a conversar com dados, engenharia e design de perto', scoreImpact: { axis: { x: -2, y: -2 }, categories: { Produto: 1 } } },
      { id: 'q9_b', text: 'Quero logo ampliar meu escopo e conectar mais áreas, mesmo ainda júnior', scoreImpact: { axis: { x: 1, y: -1 } } },
      { id: 'q9_c', text: 'Prefiro já pensar em quando vou liderar pessoas, mais do que só executar', scoreImpact: { axis: { y: 2 } } },
      { id: 'q9_d', text: 'Prefiro me aprofundar tecnicamente numa área específica antes de pensar em outra coisa', scoreImpact: { axis: { x: -2 }, categories: { Engenharia: 1 } } },
    ]
  },
  {
    id: 'q10',
    text: 'Um time júnior está travado numa decisão técnica complexa e recorre a você. Como você age?',
    options: [
      { id: 'q10_a', text: 'Sento com o time e ajudo a destravar tecnicamente, ensinando no processo', scoreImpact: { axis: { y: 2 }, categories: { Engenharia: 2 } } },
      { id: 'q10_b', text: 'Dou autonomia e cobro entregas, sem entrar no detalhe técnico', scoreImpact: { axis: { x: 1, y: 3 } } },
      { id: 'q10_c', text: 'Trago outras áreas (dados, produto) pra ajudar a desbloquear com outra perspectiva', scoreImpact: { axis: { y: 2 }, categories: { Operações: 2 } } },
      { id: 'q10_d', text: 'Uso esse momento pra formar as pessoas com calma, mesmo que leve mais tempo', scoreImpact: { axis: { y: 3 }, categories: { Produto: 1 } } },
    ]
  },
  {
    id: 'q11',
    text: 'A diretoria pede pra você tomar uma decisão importante só com base em intuição, sem tempo pra levantar dados. Como você reage?',
    options: [
      { id: 'q11_a', text: 'Peço um prazo mínimo pra puxar ao menos um dado essencial antes de decidir', scoreImpact: { axis: { x: -1 }, categories: { Dados: 2 } } },
      { id: 'q11_b', text: 'Decido com base na visão estratégica que já tenho do mercado e do produto', scoreImpact: { axis: { x: 2 }, categories: { Estratégia: 3 } } },
      { id: 'q11_c', text: 'Decido, mas já desenho como vamos medir se a decisão foi certa depois', scoreImpact: { categories: { Dados: 1, Produto: 2 } } },
      { id: 'q11_d', text: 'Escalo o risco pra liderança antes de assumir a decisão sozinho', scoreImpact: { axis: { y: 2 } } },
    ]
  },
  {
    id: 'q12',
    text: 'Você percebe um padrão de comportamento estranho no uso do produto que ninguém mais tinha notado. O que faz com essa descoberta?',
    options: [
      { id: 'q12_a', text: 'Aprofundo a análise nos dados pra confirmar se é estatisticamente relevante', scoreImpact: { axis: { x: -1 }, categories: { Dados: 3 } } },
      { id: 'q12_b', text: 'Cruzo com entrevistas qualitativas pra entender o "porquê" por trás do padrão', scoreImpact: { categories: { Pesquisa: 2, Insights: 2 } } },
      { id: 'q12_c', text: 'Penso em como isso pode virar uma nova frente estratégica de produto', scoreImpact: { axis: { x: 1 }, categories: { Estratégia: 2 } } },
      { id: 'q12_d', text: 'Avalio se dá pra resolver isso incorporando um modelo de IA que aprenda o padrão automaticamente', scoreImpact: { categories: { IA: 2, Engenharia: 1 } } },
    ]
  },
  {
    id: 'q13',
    text: 'Se você tivesse que escolher, prefere:',
    options: [
      { id: 'q13_a', text: 'Ser o melhor em uma coisa muito específica', scoreImpact: { axis: { x: -3 } } },
      { id: 'q13_b', text: 'Ser bom o suficiente em várias coisas pra conectar tudo', scoreImpact: { axis: { x: 3 } } },
    ]
  },
  {
    id: 'q14',
    text: 'Você seria a pessoa responsável por toda a estratégia de produto de uma empresa (falando direto com CEO e conselho, orientando investimento e inovação). Como isso soa pra você hoje?',
    options: [
      { id: 'q14_a', text: 'Ainda não é o momento — prefiro focar em ganhar profundidade técnica ou de execução primeiro', scoreImpact: { axis: { x: -2, y: -2 } } },
      { id: 'q14_b', text: 'Faz total sentido pro meu momento — já penso nesse nível de escopo hoje', scoreImpact: { axis: { x: 3, y: 3 }, categories: { Estratégia: 2 } } },
      { id: 'q14_c', text: 'Topo, mas prefiro chegar lá formando processos e pessoas no caminho, não só pela visão', scoreImpact: { axis: { y: 2 }, categories: { Operações: 1 } } },
      { id: 'q14_d', text: 'Prefiro influenciar decisões desse nível sem carregar a responsabilidade executiva final', scoreImpact: { axis: { y: 1 }, categories: { Estratégia: 1 } } },
    ]
  },
  {
    id: 'q15',
    text: 'Qual dessas afirmações mais soa como "eu" hoje em dia?',
    options: [
      { id: 'q15_a', text: 'Estou construindo experiência de execução, quero aprender fazendo', scoreImpact: { axis: { x: -1, y: -2 } } },
      { id: 'q15_b', text: 'Já sei executar bem, quero aprender a pensar estratégia/negócio', scoreImpact: { axis: { x: 1, y: 1 } } },
      { id: 'q15_c', text: 'Já penso estratégia, quero aprender a formar/liderar times', scoreImpact: { axis: { y: 2 } } },
      { id: 'q15_d', text: 'Já lidero, quero ampliar escopo (mais generalista/executivo)', scoreImpact: { axis: { x: 2, y: 2 } } },
    ]
  }
];
