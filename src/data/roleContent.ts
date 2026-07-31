export interface RoleContent {
  category: string;
  tagline: string;
  description: string;
  salaryRange: { 
    min: number; 
    max: number; 
    currency: string; 
    period: string;
    panoramaAverage?: number;
    panoramaAverageLabel?: string;
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
  }
};
