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
    text: 'Seu time ganhou acesso a uma ferramenta de IA generativa e ninguém sabe bem como aplicá-la no produto. Qual seu papel nesse momento?',
    options: [
      { id: 'q4_a', text: 'Estudo os casos de uso técnicos e monto um protótipo de como a IA resolveria um problema real', scoreImpact: { axis: { x: -1 }, categories: { IA: 3 } } },
      { id: 'q4_b', text: 'Penso em como isso muda a estratégia de produto e o posicionamento no mercado', scoreImpact: { axis: { x: 1 }, categories: { Estratégia: 2, IA: 1 } } },
      { id: 'q4_c', text: 'Levanto dados de onde a IA teria mais impacto mensurável hoje', scoreImpact: { categories: { Dados: 2, IA: 1 } } },
      { id: 'q4_d', text: 'Foco em como isso vai ser recebido pelo usuário e onde geraria mais valor de experiência', scoreImpact: { categories: { Design: 1, Pesquisa: 2 } } },
    ]
  },
  {
    id: 'q5',
    text: 'Um usuário abre um chamado dizendo que o produto está "confuso". Qual sua reação?',
    options: [
      { id: 'q5_a', text: 'Assisto a uma gravação de sessão dele usando o produto pra ver onde travou', scoreImpact: { categories: { Design: 2, Pesquisa: 2 } } },
      { id: 'q5_b', text: 'Puxo o funil de uso dele nos dados pra ver em que etapa ele parou', scoreImpact: { axis: { x: -1 }, categories: { Dados: 3 } } },
      { id: 'q5_c', text: 'Agendo uma entrevista rápida com ele pra entender o contexto completo', scoreImpact: { categories: { Pesquisa: 3 } } },
      { id: 'q5_d', text: 'Verifico se isso é um padrão recorrente entre vários usuários parecidos', scoreImpact: { categories: { Insights: 3 } } },
    ]
  },
  {
    id: 'q6',
    text: 'A empresa precisa crescer rápido, mas a função ainda não está 100% validada. Qual sua abordagem?',
    options: [
      { id: 'q6_a', text: 'Rodo experimentos rápidos de aquisição e vejo o que converte antes de escalar', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q6_b', text: 'Insisto em validar melhor com usuários antes de qualquer esforço de crescimento', scoreImpact: { categories: { Pesquisa: 2, Insights: 1 } } },
      { id: 'q6_c', text: 'Analiso os dados de coorte pra saber se o crescimento seria sustentável', scoreImpact: { categories: { Dados: 3 } } },
      { id: 'q6_d', text: 'Discuto com a liderança se faz sentido crescer agora ou esperar mais maturidade', scoreImpact: { axis: { y: 1 }, categories: { Estratégia: 2 } } },
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
      { id: 'q8_a', text: 'Reavalio o posicionamento do produto e onde ainda temos vantagem real', scoreImpact: { axis: { x: 1 }, categories: { Estratégia: 3 } } },
      { id: 'q8_b', text: 'Testo mensagens/campanhas rápidas pra reforçar por que o nosso é melhor', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q8_c', text: 'Comparo a experiência de uso das duas soluções lado a lado', scoreImpact: { categories: { Design: 2, Pesquisa: 1 } } },
      { id: 'q8_d', text: 'Olho os dados de retenção pra ver se isso realmente ameaça nossos usuários', scoreImpact: { categories: { Dados: 2 } } },
    ]
  },
  {
    id: 'q9',
    text: 'Você está liderando um time júnior que está travado numa decisão técnica complexa. Como age?',
    options: [
      { id: 'q9_a', text: 'Sento com o time e ajudo a destravar tecnicamente, ensinando no processo', scoreImpact: { axis: { y: 2 }, categories: { Engenharia: 2 } } },
      { id: 'q9_b', text: 'Dou autonomia e cobro entregas, sem entrar no detalhe técnico', scoreImpact: { axis: { x: 1, y: 3 } } },
      { id: 'q9_c', text: 'Trago outras áreas (dados, produto) pra ajudar a desbloquear com outra perspectiva', scoreImpact: { axis: { y: 2 }, categories: { Operações: 2 } } },
      { id: 'q9_d', text: 'Uso esse momento pra formar as pessoas, mesmo que leve mais tempo', scoreImpact: { axis: { y: 3 }, categories: { Produto: 1 } } },
    ]
  },
  {
    id: 'q10',
    text: 'O tráfego do produto está alto, mas a ativação de novos usuários está baixa. Por onde você começa?',
    options: [
      { id: 'q10_a', text: 'Rodo testes A/B no fluxo de ativação pra ver o que melhora a conversão', scoreImpact: { categories: { Growth: 3 } } },
      { id: 'q10_b', text: 'Analiso os dados de funil pra achar exatamente onde o usuário desiste', scoreImpact: { axis: { x: -1 }, categories: { Dados: 3 } } },
      { id: 'q10_c', text: 'Redesenho o onboarding pra ficar mais simples e intuitivo', scoreImpact: { categories: { Design: 3 } } },
      { id: 'q10_d', text: 'Entrevisto usuários que abandonaram no meio do onboarding', scoreImpact: { categories: { Pesquisa: 3 } } },
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
      { id: 'q12_d', text: 'Já penso em como resolver isso via automação ou IA', scoreImpact: { categories: { IA: 2, Engenharia: 1 } } },
    ]
  },
  {
    id: 'q13',
    text: 'Você prefere ser reconhecido por:',
    options: [
      { id: 'q13_a', text: 'Ser a pessoa mais funda tecnicamente num tema específico do produto', scoreImpact: { axis: { x: -3 } } },
      { id: 'q13_b', text: 'Ser a pessoa que consegue conectar qualquer área do negócio pra resolver problemas', scoreImpact: { axis: { x: 3 } } },
    ]
  },
  {
    id: 'q14',
    text: 'Vários squads pedem prioridade ao mesmo tempo e o recurso é escasso. Qual seu instinto?',
    options: [
      { id: 'q14_a', text: 'Crio um processo claro de priorização pra que isso não vire caos de novo', scoreImpact: { axis: { y: 2 }, categories: { Operações: 3 } } },
      { id: 'q14_b', text: 'Decido com base no que move mais a estratégia da empresa como um todo', scoreImpact: { axis: { y: 1 }, categories: { Estratégia: 3 } } },
      { id: 'q14_c', text: 'Levanto dados de impacto de cada pedido antes de decidir', scoreImpact: { categories: { Dados: 2 } } },
      { id: 'q14_d', text: 'Delego a decisão pros próprios líderes dos squads chegarem a um acordo', scoreImpact: { axis: { x: 1, y: 3 } } },
    ]
  },
  {
    id: 'q15',
    text: 'Você virou responsável por formar quem vai ocupar seu cargo atual no futuro. Isso te deixa:',
    options: [
      { id: 'q15_a', text: 'Desconfortável — prefiro continuar sendo o(a) especialista de referência no time', scoreImpact: { axis: { x: -2, y: -2 } } },
      { id: 'q15_b', text: 'Animado(a) — quero crescer pra um papel ainda mais amplo e estratégico', scoreImpact: { axis: { x: 2, y: 3 } } },
      { id: 'q15_c', text: 'Neutro — topo fazer, mas meu foco principal continua sendo entregar bem', scoreImpact: { axis: { x: -1, y: 1 } } },
      { id: 'q15_d', text: 'Motivado(a) a estruturar processos pra isso ser replicável, não só sobre mim', scoreImpact: { axis: { y: 2 }, categories: { Operações: 2 } } },
    ]
  }
];
