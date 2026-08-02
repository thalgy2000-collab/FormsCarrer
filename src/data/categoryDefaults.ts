export interface CategoryDefault {
  reading: {
    title: string;
    author: string;
    description: string;
    link?: string;
  };
  recommendedTrack?: {
    formacoes: Array<{ title: string; description: string; link?: string }>;
    sprints: Array<{ title: string; link?: string }>;
  };
  nextSteps: string[];
  hardSkills?: Array<string>;
  softSkills?: Array<string>;
}

const dadosTrack = {
  formacoes: [
    { title: "Formação Product Analytics", description: "Métricas, análise e experimentação orientadas a dados." }, 
    { title: "Formação Analista de Dados", description: "Da coleta à análise que sustenta decisões de negócio." }
  ],
  sprints: [
    { title: "Curso de Métodos de Análise de Dados" }, 
    { title: "Curso de SQL para Manipulação e Análise de Dados" }, 
    { title: "Curso de Power BI: análises avançadas" }
  ]
};

const designTrack = {
  formacoes: [
    { title: "Formação Product Design", description: "Design de produto de ponta a ponta, do problema à interface." }, 
    { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
  ],
  sprints: [
    { title: "Curso de UI Design" }, 
    { title: "Curso de Design Thinking" }, 
    { title: "Curso de Design de Serviço" }
  ]
};

const pesquisaTrack = {
  formacoes: [
    { title: "Formação Product Design", description: "Design de produto de ponta a ponta, do problema à interface." }
  ],
  sprints: [
    { title: "Curso de Pesquisa com Usuários" }, 
    { title: "Curso de Testes de Usabilidade" }, 
    { title: "Curso de Síntese de Insights" }
  ]
};

const produtoTrack = {
  formacoes: [
    { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." }, 
    { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
  ],
  sprints: [
    { title: "Curso de Roadmap de Produto e Priorização" }, 
    { title: "Curso de Métricas de Negócios Digitais" }, 
    { title: "Curso de PRD: Documento de Requisitos de Produto" }
  ]
};

const growthTrack = {
  formacoes: [
    { title: "Formação Product Growth", description: "Aquisição, ativação, retenção e monetização." }, 
    { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
  ],
  sprints: [
    { title: "Curso de Estratégia de Aquisição de clientes" }, 
    { title: "Curso de Experimentação com Teste A/B" }, 
    { title: "Curso de Métricas de Negócios Digitais" }
  ]
};

export const categoryDefaults: Record<string, CategoryDefault> = {
  "Dados": {
    reading: { title: "Lean Analytics", author: "Alistair Croll, Benjamin Yoskovitz", description: "Como usar métricas certas em cada estágio de um produto.", link: "https://www.google.com/search?q=Lean+Analytics+Alistair+Croll,+Benjamin+Yoskovitz+livro" },
    recommendedTrack: dadosTrack,
    nextSteps: ["Aprenda o básico de SQL pra consultar dados direto na fonte", "Monte um dashboard pessoal com um dataset público", "Pratique contar uma 'história' a partir de um conjunto de dados"],
    hardSkills: ["SQL", "Planilhas avançadas (Excel/Google Sheets)", "Estatística básica", "Ferramentas de BI (Power BI, Looker, Tableau)", "Python básico para análise de dados"],
    softSkills: ["Storytelling com dados", "Pensamento crítico", "Comunicação de insights para não-técnicos"]
  },
  "Design": {
    reading: { title: "Sprint", author: "Jake Knapp", description: "Como validar ideias de produto rapidamente com design thinking.", link: "https://www.google.com/search?q=Sprint+Jake+Knapp+livro" },
    recommendedTrack: designTrack,
    nextSteps: ["Rode um teste de usabilidade informal com 3 pessoas", "Estude a fundo um design system conhecido (ex: Material Design)", "Pratique wireframes rápidos de baixa fidelidade"],
    hardSkills: ["Figma", "Design Systems", "Prototipação", "Testes de usabilidade"],
    softSkills: ["Empatia com o usuário", "Comunicação visual", "Colaboração com Produto e Engenharia"]
  },
  "Pesquisa": {
    reading: { title: "The Mom Test", author: "Rob Fitzpatrick", description: "Como fazer perguntas de descoberta que geram respostas honestas.", link: "https://www.google.com/search?q=The+Mom+Test+Rob+Fitzpatrick+livro" },
    recommendedTrack: pesquisaTrack,
    nextSteps: ["Conduza 3 entrevistas de descoberta com usuários reais", "Aprenda a escrever roteiros de entrevista sem viés", "Estude o método de affinity mapping pra sintetizar aprendizados"],
    hardSkills: ["Métodos de pesquisa qualitativa e quantitativa", "Roteiros de entrevista", "Síntese de dados (affinity mapping)"],
    softSkills: ["Escuta ativa", "Neutralidade e isenção de viés", "Curiosidade genuína"]
  },
  "Insights": {
    reading: { title: "The Mom Test", author: "Rob Fitzpatrick", description: "Perguntas certas pra validar hipóteses sobre clientes.", link: "https://www.google.com/search?q=The+Mom+Test+Rob+Fitzpatrick+livro" },
    recommendedTrack: dadosTrack,
    nextSteps: ["Pratique segmentar usuários usando um dataset público", "Aprenda o básico de uma ferramenta de BI (ex: Power BI ou Looker Studio)", "Estude como transformar dado qualitativo em recomendação acionável"],
    hardSkills: ["Segmentação de clientes", "Ferramentas de BI", "Análise de jornada do cliente"],
    softSkills: ["Tradução de dado em recomendação acionável", "Comunicação executiva"]
  },
  "Engenharia": {
    reading: { title: "The Manager's Path", author: "Camille Fournier", description: "A trajetória de quem sai do técnico puro para liderança de engenharia.", link: "https://www.google.com/search?q=The+Manager%27s+Path+Camille+Fournier+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Contribua com um projeto open source", "Estude fundamentos de arquitetura de sistemas escaláveis", "Pratique mentoria técnica informal com alguém mais júnior"],
    hardSkills: ["Arquitetura de sistemas", "Boas práticas de código e revisão", "Metodologias ágeis (Scrum/Kanban)"],
    softSkills: ["Mentoria técnica", "Comunicação com áreas não técnicas", "Gestão de conflitos"]
  },
  "Programa": {
    reading: { title: "Scaling People", author: "Claire Hughes Johnson", description: "Como estruturar processos e operações à medida que um time cresce.", link: "https://www.google.com/search?q=Scaling+People+Claire+Hughes+Johnson+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Mapeie um processo do zero, do início ao fim", "Pratique priorização com frameworks como RICE ou ICE", "Estude como times multi-squad se coordenam em empresas maiores"],
    hardSkills: ["Priorização (RICE, ICE)", "Ferramentas de gestão (Jira, Linear)", "Mapeamento de processos"],
    softSkills: ["Organização", "Facilitação de reuniões", "Alinhamento entre múltiplos times"]
  },
  "Operações": {
    reading: { title: "Scaling People", author: "Claire Hughes Johnson", description: "Como estruturar processos e operações à medida que um time cresce.", link: "https://www.google.com/search?q=Scaling+People+Claire+Hughes+Johnson+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Mapeie um processo do zero, do início ao fim", "Pratique priorização com frameworks como RICE ou ICE", "Estude ferramentas de gestão de projeto (Jira, Linear, Notion)"],
    hardSkills: ["Priorização (RICE, ICE)", "Ferramentas de gestão (Jira, Linear, Notion)", "Mapeamento de processos"],
    softSkills: ["Organização", "Facilitação de reuniões", "Alinhamento entre múltiplos times"]
  },
  "IA": {
    reading: { title: "Prediction Machines", author: "Ajay Agrawal, Joshua Gans, Avi Goldfarb", description: "A economia por trás de decisões automatizadas com IA aplicada a produto.", link: "https://www.google.com/search?q=Prediction+Machines+Ajay+Agrawal,+Joshua+Gans,+Avi+Goldfarb+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Faça um curso introdutório de fundamentos de IA/ML", "Teste na prática prompts com diferentes modelos de linguagem", "Monte um protótipo simples usando uma API de IA (ex: OpenAI, Anthropic)"],
    hardSkills: ["Fundamentos de IA/Machine Learning", "Prompt engineering", "Avaliação de modelos e limitações", "Integração com APIs de IA"],
    softSkills: ["Pensamento crítico sobre limitações da tecnologia", "Comunicação de trade-offs técnicos pra stakeholders"]
  },
  "Growth": {
    reading: { title: "Hooked", author: "Nir Eyal", description: "Como produtos criam hábito através de loops de engajamento.", link: "https://www.google.com/search?q=Hooked+Nir+Eyal+livro" },
    recommendedTrack: growthTrack,
    nextSteps: ["Rode um teste A/B simples (mesmo que um 'fake door test')", "Estude o funil de ativação de 2-3 produtos que você usa no dia a dia", "Aprenda métricas essenciais de growth (D1/D7/D30, LTV, churn)"],
    hardSkills: ["Testes A/B", "Métricas de growth (funil, retenção, LTV)", "Ferramentas de analytics"],
    softSkills: ["Criatividade experimental", "Tolerância a falhas rápidas (fail fast)"]
  },
  "Produto": {
    reading: { title: "Inspired", author: "Marty Cagan", description: "Como times de produto de excelência descobrem e entregam valor.", link: "https://www.google.com/search?q=Inspired+Marty+Cagan+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Escreva um PRD de uma feature fictícia do zero", "Pratique priorização de um backlog simulado", "Busque sombrear um PM sênior por um dia, se possível"],
    hardSkills: ["Escrita de PRD", "Priorização de backlog", "Métricas de produto"],
    softSkills: ["Comunicação com stakeholders", "Tomada de decisão sob incerteza"]
  },
  "Estratégia": {
    reading: { title: "Good Strategy Bad Strategy", author: "Richard Rumelt", description: "Como diferenciar estratégia real de só um conjunto de metas.", link: "https://www.google.com/search?q=Good+Strategy+Bad+Strategy+Richard+Rumelt+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Escreva uma visão de produto de 1 página pra um produto que você usa", "Estude a análise competitiva de um mercado que te interessa", "Pratique conectar uma decisão pequena a um objetivo maior de negócio"],
    hardSkills: ["Análise competitiva", "Modelagem de mercado", "Construção de visão de produto"],
    softSkills: ["Pensamento sistêmico", "Influência sem autoridade direta"]
  },
  "Liderança": {
    reading: { title: "The Making of a Manager", author: "Julie Zhuo", description: "Os primeiros passos de quem está migrando pra liderança de pessoas.", link: "https://www.google.com/search?q=The+Making+of+a+Manager+Julie+Zhuo+livro" },
    recommendedTrack: produtoTrack,
    nextSteps: ["Busque uma oportunidade de mentoria informal (dar ou receber)", "Pratique dar feedback estruturado a um colega", "Estude como grandes empresas estruturam a carreira de liderança de produto"],
    hardSkills: ["Gestão de performance", "Processos de contratação", "Definição de OKRs"],
    softSkills: ["Feedback estruturado", "Empatia", "Gestão de conflitos", "Delegação"]
  }
};
