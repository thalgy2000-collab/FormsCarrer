export interface RoleContent {
  category: string;
  tagline: string;
  description: string;
  salaryRange: { 
    min: number; 
    max: number; 
    maxOpenEnded?: boolean;
    currency: string; 
    period: string;
    panoramaAverage?: number;
    panoramaAverageLabel?: string;
    note?: string;
  };
  salaryConfidence: 'baixa' | 'media' | 'alta';
  salarySource: string;
  insights: Array<{
    title: string;
    value: string;
    description: string;
    source: string;
  }>;
  recommendedTrack: {
    formacoes: Array<{ title: string; description: string; link?: string }>;
    sprints: Array<{ title: string; link?: string }>;
  };
  recommendedReading?: Array<{ title: string; author: string; description: string; link?: string }>;
  nextSteps?: Array<string>;
  hardSkills?: Array<string>;
  softSkills?: Array<string>;
}

export const roleContents: Record<string, RoleContent> = {
  "Activation/Retention Manager": {
    category: "Growth",
    tagline: "Focado em ativação e retenção, com fortes rituais de análise e experimento.",
    description: "O Activation/Retention Manager é responsável por transformar novos usuários em usuários ativos e por manter esses usuários engajados ao longo do tempo. Desenha o onboarding, define os \"aha moments\" do produto e cria loops de reengajamento acionados por comportamento, ciclo de vida e segmentação. Roda uma agenda intensa de experimentos — testes A/B, mudanças de fluxo, campanhas de reativação — sempre olhando métricas como D1/D7/D30, churn, LTV e frequência de uso. Atua entre Produto, CRM/Lifecycle, Data e Design, e ganha musculatura quando combina forte leitura de dados com um bom instinto de UX.",
    salaryRange: { min: 12000, max: 18000, currency: "BRL", period: "mensal" },
    salaryConfidence: "media",
    salarySource: "Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA em go-to-market",
        value: "4.3/10",
        description: "Profissionais avaliaram, de 1 a 10, o quanto vêm usando IA para apoiar go-to-market.",
        source: "Panorama Produto 2025 — aba New Insights, linha 86"
      },
      {
        title: "Origem profissional: Marketing e Comunicação",
        value: "10.3%",
        description: "10% vinham de Marketing/Comunicação, comum em perfis de growth e ciclo de vida.",
        source: "Panorama Produto 2025 — aba New Insights, linha 25"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Growth", description: "Aquisição, ativação, retenção e monetização." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Estratégia de Aquisição de clientes" },
        { title: "Curso de Experimentação com Teste A/B" },
        { title: "Curso de Métricas de Negócios Digitais" }
      ]
    }
  },
  "AI Product Manager": {
    category: "IA",
    tagline: "Lidera o desenvolvimento de produtos baseados em IA, conectando mercado a tecnologia.",
    description: "O AI Product Manager lidera o desenvolvimento de produtos baseados em Inteligência Artificial, conectando necessidades do mercado às possibilidades tecnológicas. Atua identificando oportunidades de aplicação de IA, definindo estratégia, priorizando funcionalidades e acompanhando experimentos com modelos inteligentes. Trabalha lado a lado com Engenheiros, Cientistas de Dados, Designers e stakeholders para garantir que a tecnologia gere valor real aos usuários. Além das competências tradicionais de Product Management, exige compreensão dos fundamentos de IA, riscos, limitações e avaliação de desempenho dos modelos. A carreira tende a ganhar importância conforme a adoção de IA acelera nas empresas.",
    salaryRange: { min: 15000, max: 22000, currency: "BRL", period: "mensal" },
    salaryConfidence: "media",
    salarySource: "Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA em Product Discovery",
        value: "4.4/10",
        description: "Profissionais de Produto avaliaram, de 1 a 10, o quanto vêm usando IA no dia a dia de discovery.",
        source: "Panorama Produto 2025 — aba New Insights, linha 40"
      },
      {
        title: "Origem profissional: Tecnologia",
        value: "26.1%",
        description: "Antes de atuar em Produto, 26% dos respondentes vinham da área de Tecnologia — a origem mais comum.",
        source: "Panorama Produto 2025 — aba New Insights, linha 22"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "AI Product Owner": {
    category: "IA",
    tagline: "Prioriza e organiza o desenvolvimento de produtos e funcionalidades baseadas em IA.",
    description: "O AI Product Owner é responsável por priorizar e organizar o desenvolvimento de produtos e funcionalidades baseadas em Inteligência Artificial. Atua como ponte entre negócio, usuários e equipes técnicas, transformando necessidades em requisitos claros e gerenciando o backlog do produto. Além das práticas tradicionais de Product Ownership, precisa compreender conceitos de IA, qualidade dos modelos, limitações tecnológicas e critérios de validação. Trabalha próximo de Product Managers, Engenheiros e Cientistas de Dados para garantir entregas de valor. A evolução natural inclui AI Product Manager ou posições estratégicas em Produtos de IA.",
    salaryRange: { min: 10000, max: 14000, currency: "BRL", period: "mensal" },
    salaryConfidence: "media",
    salarySource: "Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA em Product Discovery",
        value: "4.4/10",
        description: "Profissionais de Produto avaliaram, de 1 a 10, o quanto vêm usando IA no dia a dia de discovery.",
        source: "Panorama Produto 2025 — aba New Insights, linha 40"
      },
      {
        title: "Origem profissional: Tecnologia",
        value: "26.1%",
        description: "Antes de atuar em Produto, 26% dos respondentes vinham da área de Tecnologia — a origem mais comum.",
        source: "Panorama Produto 2025 — aba New Insights, linha 22"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "AI Product Specialist": {
    category: "IA",
    tagline: "Atua na aplicação prática da Inteligência Artificial em produtos digitais.",
    description: "O AI Product Specialist atua na aplicação prática da Inteligência Artificial em produtos digitais. Seu papel é identificar oportunidades de uso de IA, avaliar modelos, apoiar experimentações e colaborar com equipes técnicas para incorporar recursos inteligentes aos produtos. Trabalha próximo de Product Managers, cientistas de dados e engenheiros de IA, traduzindo possibilidades tecnológicas em valor para o usuário e para o negócio. A função exige curiosidade, visão de Produto e entendimento dos fundamentos de IA generativa e machine learning. Pode evoluir para AI Product Manager, AI Strategy ou liderança em inovação.",
    salaryRange: { min: 18000, max: 28000, currency: "BRL", period: "mensal" },
    salaryConfidence: "media",
    salarySource: "Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "Associate/Junior PM": {
    category: "Produto",
    tagline: "PM em início de carreira, atua com escopo delimitado sob mentoria.",
    description: "O Associate/Junior PM está no começo da jornada em Produto. Costuma atuar em um escopo bem delimitado — uma feature, um fluxo, um squad específico — com forte apoio de um PM mais sênior ou de um Product Lead. Ajuda a rodar discovery, escrever histórias, acompanhar métricas e destravar entregas do time. Nessa fase, o foco é construir repertório: entender ritual de squad, aprender a conversar com dados, engenharia e design, e desenvolver julgamento sobre priorização. Uma boa vaga de Associate/Junior PM combina responsabilidade real, mentoria consistente e exposição a diferentes tipos de problema de produto.",
    salaryRange: {
      min: 5000,
      max: 10000,
      currency: "BRL",
      period: "mensal",
      panoramaAverage: 7767,
      panoramaAverageLabel: "Média Panorama 2024-2025"
    },
    salaryConfidence: "alta",
    salarySource: "Média direta de Associate Product Manager no Panorama 2025. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Entrada direta em Produto",
        value: "4.9%",
        description: "5% entraram direto em Produto, sem passagem por outra área antes.",
        source: "Panorama Produto 2025 — aba New Insights, linha 28"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "CPO": {
    category: "Liderança",
    tagline: "Executivo responsável por toda a estratégia de Produto da empresa.",
    description: "O Chief Product Officer é o executivo responsável por toda a estratégia de Produto da empresa. Define a visão de longo prazo, lidera grandes estruturas organizacionais e garante que todas as iniciativas estejam alinhadas aos objetivos do negócio. Atua diretamente com CEO, Conselho e demais executivos para orientar investimentos, inovação e crescimento. Além da liderança de pessoas, é responsável por fortalecer a cultura de Produto e criar vantagens competitivas sustentáveis. A posição exige profundo conhecimento em estratégia, gestão, mercado e liderança organizacional. É o mais alto cargo executivo da área de Produto.",
    salaryRange: {
      min: 28000,
      max: 40000,
      maxOpenEnded: true,
      currency: "BRL",
      period: "mensal",
      panoramaAverage: 29354,
      panoramaAverageLabel: "Média Panorama 2024-2025",
      note: "Pacotes seniores costumam incluir bônus e equity relevantes."
    },
    salaryConfidence: "alta",
    salarySource: "Média direta de CPO no Panorama 2025. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA para visão de produto",
        value: "5.3/10",
        description: "Profissionais de Produto avaliaram, de 1 a 10, o quanto vêm usando IA para apoiar a visão de produto.",
        source: "Panorama Produto 2025 — aba New Insights, linha 71"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "Customer Insights Analyst": {
    category: "Insights",
    tagline: "Transforma dados de comportamento e pesquisas em conhecimento estratégico sobre os clientes.",
    description: "O Customer Insights Analyst transforma dados de comportamento e pesquisas em conhecimento estratégico sobre os clientes. Analisa tendências, segmentações, jornadas e padrões de consumo para apoiar decisões de Produto, Marketing e Negócios. Trabalha frequentemente com bases quantitativas e qualitativas, utilizando ferramentas de analytics, BI e pesquisa. É uma função altamente analítica, mas que também exige capacidade de traduzir descobertas em recomendações acionáveis. Com o amadurecimento das empresas orientadas por dados, esse profissional pode evoluir para Customer Insights Manager, Product Analytics ou Product Strategy.",
    salaryRange: {
      min: 6000,
      max: 10000,
      currency: "BRL",
      period: "mensal"
    },
    salaryConfidence: "media",
    salarySource: "Derivado das faixas de Analista de Produto e Business Analyst. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Analytics", description: "Métricas, análise e experimentação orientadas a dados." },
        { title: "Formação Analista de Dados", description: "Da coleta à análise que sustenta decisões de negócio." }
      ],
      sprints: [
        { title: "Curso de Métodos de Análise de Dados" },
        { title: "Curso de SQL para Manipulação e Análise de Dados" },
        { title: "Curso de Power BI: análises avançadas" }
      ]
    }
  },
  "Design Lead": {
    category: "Design",
    tagline: "Lidera equipes de Design responsáveis pela experiência dos produtos digitais da empresa.",
    description: "O Design Lead lidera equipes de Design responsáveis pela experiência dos produtos digitais da empresa. Seu papel combina gestão de pessoas, definição de processos, garantia de qualidade e alinhamento estratégico entre Design, Produto e Engenharia. Além de orientar designers em seu desenvolvimento profissional, participa de decisões sobre design systems, discovery, pesquisa e evolução da experiência do usuário. É esperado que tenha forte capacidade de liderança, comunicação e visão sistêmica. A evolução natural inclui posições como Product Design Manager, Head of Design ou Diretor de Design.",
    salaryRange: {
      min: 15000,
      max: 22000,
      currency: "BRL",
      period: "mensal"
    },
    salaryConfidence: "media",
    salarySource: "Derivado da faixa de liderança sênior em Design. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Origem profissional: Design",
        value: "6.0%",
        description: "6% dos respondentes vinham diretamente de Design antes de entrar em Produto.",
        source: "Panorama Produto 2025 — aba New Insights, linha 26"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Design", description: "Design de produto de ponta a ponta, do problema à interface." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de UI Design" },
        { title: "Curso de Design Thinking" },
        { title: "Curso de Design de Serviço" }
      ]
    }
  },
  "Diretor(a) de Produto": {
    category: "Liderança",
    tagline: "Define e executa a estratégia de Produto em nível organizacional.",
    description: "O Product Director é responsável por definir e executar a estratégia de Produto em nível organizacional. Lidera Heads de Produto e gestores, garantindo alinhamento entre visão de longo prazo, objetivos de negócio e evolução do portfólio. Atua diretamente com a alta liderança na definição de investimentos, expansão de produtos, governança e indicadores estratégicos. Além da gestão de pessoas, é responsável por desenvolver uma cultura orientada ao cliente e à inovação. A função exige sólida experiência em liderança, visão de mercado e tomada de decisões de alto impacto. A evolução natural é para VP de Produto ou Chief Product Officer.",
    salaryRange: {
      min: 25000,
      max: 35000,
      currency: "BRL",
      period: "mensal",
      panoramaAverage: 29354,
      panoramaAverageLabel: "Média Panorama 2024-2025"
    },
    salaryConfidence: "alta",
    salarySource: "Média direta de Diretor de Produto / CPO no Panorama 2025. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "Engineering Manager": {
    category: "Engenharia",
    tagline: "Lidera equipes de Engenharia, com foco em pessoas, processos e execução técnica.",
    description: "O Engineering Manager lidera equipes de Engenharia, sendo responsável pelo desenvolvimento das pessoas, organização do trabalho e execução técnica dos projetos. Atua na contratação, feedback, evolução da equipe e definição de processos, além de colaborar com líderes de Produto para transformar estratégia em entregas consistentes. Diferentemente do Tech Lead, dedica maior parte do tempo à gestão e menos à implementação técnica. É uma posição que exige liderança, visão sistêmica e capacidade de tomada de decisão. A carreira pode evoluir para Director of Engineering, VP de Engenharia ou CTO.",
    salaryRange: {
      min: 18000,
      max: 26000,
      currency: "BRL",
      period: "mensal"
    },
    salaryConfidence: "media",
    salarySource: "Derivado da faixa de gestão sênior em times de engenharia. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Origem profissional: Tecnologia",
        value: "26.1%",
        description: "Antes de atuar em Produto, 26% dos respondentes vinham da área de Tecnologia — a origem mais comum.",
        source: "Panorama Produto 2025 — aba New Insights, linha 22"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "Experimentation Manager": {
    category: "Dados",
    tagline: "Lidera a cultura de experimentação estruturando processos para validar hipóteses.",
    description: "O Experimentation Manager lidera a cultura de experimentação dentro da empresa, estruturando processos para validar hipóteses com rapidez e reduzir riscos nas decisões de Produto. Coordena testes A/B, experimentos controlados e análises estatísticas para medir impacto em métricas de negócio e comportamento dos usuários. Atua em parceria com Produto, Growth, Dados e Engenharia para garantir que decisões sejam baseadas em evidências. A função exige conhecimento em metodologia científica, estatística e análise de dados. Pode evoluir para posições de Growth Leadership, Product Strategy ou Analytics Leadership.",
    salaryRange: {
      min: 12000,
      max: 18000,
      currency: "BRL",
      period: "mensal"
    },
    salaryConfidence: "media",
    salarySource: "Derivado da faixa de PMs sêniores com foco em experimentação. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA para análise de dados",
        value: "4.8/10",
        description: "Profissionais de Produto avaliaram, de 1 a 10, o quanto vêm usando IA para análise de dados.",
        source: "Panorama Produto 2025 — aba New Insights, linha 56"
      },
      {
        title: "Origem profissional: Dados",
        value: "3.1%",
        description: "3% vinham de Dados antes de atuarem em Produto — origem forte em perfis analíticos.",
        source: "Panorama Produto 2025 — aba New Insights, linha 30"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Growth", description: "Aquisição, ativação, retenção e monetização." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Estratégia de Aquisição de clientes" },
        { title: "Curso de Experimentação com Teste A/B" },
        { title: "Curso de Métricas de Negócios Digitais" }
      ]
    }
  },
  "GenAI Product Manager": {
    category: "IA",
    tagline: "Lidera produtos que aplicam IA generativa para criar novas experiências ao usuário.",
    description: "O GenAI Product Manager lidera produtos que aplicam IA generativa para criar novas experiências, automações e capacidades de conteúdo. Domina prompt engineering, avaliação de LLMs, custos de inferência, riscos de alucinação e desenho de guardrails. Trabalha próximo a Engenharia, Design e Dados para desenhar fluxos onde o modelo é parte central do produto — não apenas uma feature. A carreira exige compreender rapidamente a fronteira móvel dos modelos disponíveis e traduzi-la em valor concreto para o usuário. Pode evoluir para AI Product Lead, Head of AI Products ou posições de estratégia em IA.",
    salaryRange: {
      min: 16000,
      max: 25000,
      currency: "BRL",
      period: "mensal"
    },
    salaryConfidence: "media",
    salarySource: "Derivado de PM Sênior focado em GenAI (faixa em alta). Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA em Product Discovery",
        value: "4.4/10",
        description: "Profissionais de Produto avaliaram, de 1 a 10, o quanto vêm usando IA no dia a dia de discovery.",
        source: "Panorama Produto 2025 — aba New Insights, linha 40"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  },
  "Group PM": {
    category: "Produto",
    tagline: "Lidera um conjunto de produtos ou Product Managers, garantindo alinhamento estratégico.",
    description: "O Group Product Manager lidera um conjunto de produtos ou Product Managers, garantindo alinhamento estratégico entre diferentes iniciativas. Atua menos na execução diária e mais na coordenação de múltiplos roadmaps, definição de prioridades e desenvolvimento da equipe. Trabalha diretamente com Heads de Produto e lideranças executivas para assegurar que os produtos evoluam de forma integrada aos objetivos do negócio. A função exige experiência consolidada em Product Management, liderança, comunicação e visão sistêmica. É uma etapa comum antes de assumir posições como Head de Produto ou Product Director.",
    salaryRange: {
      min: 18000,
      max: 25000,
      currency: "BRL",
      period: "mensal",
      panoramaAverage: 21410,
      panoramaAverageLabel: "Média Panorama 2024-2025"
    },
    salaryConfidence: "media",
    salarySource: "Derivado de Head/GPM (R$ 21.410 em média) no Panorama 2025. Fonte: Panorama de Mercado de Produto 2024-2025 · PM3",
    insights: [
      {
        title: "Uso de IA para visão de produto",
        value: "5.3/10",
        description: "Profissionais de Produto avaliaram, de 1 a 10, o quanto vêm usando IA para apoiar a visão de produto.",
        source: "Panorama Produto 2025 — aba New Insights, linha 71"
      }
    ],
    recommendedTrack: {
      formacoes: [
        { title: "Formação Product Manager", description: "Da estratégia à execução do ciclo completo de produto." },
        { title: "Formação Product Leadership", description: "Gestão de times, estratégia e cultura de produto." }
      ],
      sprints: [
        { title: "Curso de Roadmap de Produto e Priorização" },
        { title: "Curso de Métricas de Negócios Digitais" },
        { title: "Curso de PRD: Documento de Requisitos de Produto" }
      ]
    }
  }
};
