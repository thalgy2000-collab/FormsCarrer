export interface MarketCourse {
  title: string;
  institution: string;
  reason: string;
}

export type MarketCourses = Record<string, MarketCourse[]>;

const marketCourses: MarketCourses = {
"Product Analyst": [
  { title: "Curso de Product Analytics", institution: "PM3", reason: "Curso específico de analytics em produto, com foco em métricas, dados e decisões estratégicas." },
  { title: "Curso de Product Analytics", institution: "Tera", reason: "Formação de 27h com foco em coleta, análise, tracking plan, testes e métricas alinhadas à estratégia." },
],

"Product Data Analyst": [
  { title: "Curso de Product Analytics", institution: "PM3", reason: "Mais aderente para unir análise de dados, métricas de produto e comunicação de insights." },
  { title: "Curso de Product Analytics", institution: "Tera", reason: "Bom para quem precisa transformar dados em decisões e estruturar tracking e métricas." },
],

"Product Analytics Manager": [
  { title: "Curso de Product Analytics", institution: "PM3", reason: "Formação mais robusta e específica para liderar análises de produto no contexto brasileiro." },
  { title: "Curso de Product Analytics", institution: "Tera", reason: "Excelente para consolidar cultura de dados e tomada de decisão orientada por métricas." },
],

"Experimentation Manager": [
  { title: "Curso de Product Manager", institution: "PM3", reason: "Inclui módulo de dados e analytics com testes A/B e experimentação, sendo o melhor match brasileiro encontrado." },
  { title: "Product Analytics & A/B Testing", institution: "TheStarter", reason: "Curso diretamente focado em A/B testing e monitorização de métricas para otimização de produto." },
],

"Head de Design": [
  { title: "UX e UI Design: Mercado e Carreira", institution: "PUCRS", reason: "Bom para consolidar visão estratégica de UX/UI e experiência em produtos digitais." },
  { title: "Design UX e UI", institution: "ESPM", reason: "Forte em fundamentos de experiência e interface com visão aplicada." },
],

"Product Design Manager": [
  { title: "UX e UI Design: Mercado e Carreira", institution: "PUCRS", reason: "Ajuda a liderar design com foco em experiência, processo e produto." },
  { title: "Cursos de UX e UI Design", institution: "Design Circuit", reason: "Trilhas por nível, projetos reais e mentorias úteis para liderança prática." },
],

"UX/UI Designer": [
  { title: "Profissão: UX/UI Designer", institution: "EBAC", reason: "Boa para criar portfólio e desenvolver prática profissional." },
  { title: "Design UX e UI", institution: "ESPM", reason: "Reforça fundamentos de UX/UI e visão de produto digital." },
],

"Design Lead": [
  { title: "Cursos de UX e UI Design", institution: "Design Circuit", reason: "Estrutura por níveis e foco em prática ajudam a evoluir para liderança." },
  { title: "UX e UI Design: Mercado e Carreira", institution: "PUCRS", reason: "Bom para ampliar repertório e visão de produto." },
],

"Product Designer": [
  { title: "Curso de Design de Produto", institution: "Cubos Academy", reason: "O nome já é diretamente aderente ao cargo e à atuação em produto digital." },
  { title: "Profissão: UX/UI Designer", institution: "EBAC", reason: "Complementa com base sólida em UX/UI e construção de portfólio." },
],

"Tech Lead": [
  { title: "Tech Lead: práticas estratégicas de gestão e engenharia", institution: "Alura", reason: "Curso diretamente voltado a liderança técnica, métricas DORA, comunicação com stakeholders e gestão de engenharia." },
  { title: "Formação Tech Lead", institution: "Elevify", reason: "Alternativa brasileira com foco em liderança técnica, decisões arquiteturais e mentoria de engenheiros." },
],

"Solutions Architect": [
  { title: "Architecting on AWS", institution: "Green Tecnologia", reason: "Melhor match encontrado para arquitetura de soluções em cloud, com preparação para certificação AWS." },
  { title: "AWS Certified Solutions Architect – Associate", institution: "AWS", reason: "Certificação oficial da AWS para arquitetura de soluções seguras, resilientes e escaláveis em nuvem." },
],

"Engineering Manager": [
  { title: "Pós Tech em Tech Management", institution: "FIAP + Alura + PM3", reason: "Melhor match para liderança técnica em nível tático-estratégico, cobrindo gestão, tecnologia, governança, inovação, negócios e pessoas." },
  { title: "Tech Lead: liderança técnica e alinhamento entre engenharia e negócio", institution: "Alura", reason: "Boa ponte para liderança de engenharia com foco em alinhamento e comunicação." },
],

"Portfolio Manager": [
  { title: "Gerenciamento de Programas, Portfólio e PMO", institution: "FGV", reason: "Melhor match encontrado para gestão de portfólio, programas e PMO." },
  { title: "MBA Gerenciamento de Projetos, Programas e Portfólios", institution: "PUC-Rio", reason: "Forte opção para aprofundar gestão estratégica de projetos, programas e portfólio." },
],

"Product Strategy Manager": [
  { title: "Curso de Product Strategy", institution: "Tera", reason: "Curso específico de estratégia de produto, conectando negócio, usuário e execução." },
  { title: "Curso de Product Manager", institution: "PM3", reason: "Inclui módulo explícito de estratégia de produto, roadmaps e stakeholders." },
],
"Product Growth Lead": [
  { title: "Curso de Product Growth", institution: "PM3", reason: "Formação específica em estratégias de product-led growth e crescimento sustentável." },
  { title: "Curso de Growth Marketing", institution: "Conversion Academy", reason: "Bom para aquisição, dados e escala com viés prático." },
],

"Lifecycle Manager": [
  { title: "Curso de Product Growth", institution: "PM3", reason: "Mais aderente para retenção, ativação, experimentação e crescimento ao longo do ciclo de vida." },
  { title: "Curso de Growth Marketing", institution: "Conversion Academy", reason: "Ajuda a trabalhar funil e retenção com abordagem analítica." },
],

"Growth/Marketing Manager": [
  { title: "Curso de Product Growth", institution: "PM3", reason: "Conecta growth, métricas e estratégia de produto em uma formação brasileira forte." },
  { title: "Curso de Growth Marketing", institution: "Conversion Academy", reason: "Forte para marketing orientado a dados e escala." },
],

"Activation/Retention Manager": [
  { title: "Curso de Product Growth", institution: "PM3", reason: "Melhor match encontrado para ativação e retenção com foco em crescimento." },
  { title: "Curso de Growth Marketing", institution: "Conversion Academy", reason: "Complementa com visão de aquisição, funil e performance." },
],

"AI Product Owner": [
  { title: "AI Product Leaders", institution: "Tera", reason: "Programa avançado para aplicar IA em estratégia, discovery, gestão e liderança de produtos." },
  { title: "Inteligência Artificial em Produto", institution: "Tera", reason: "Curso mais curto e direto para IA aplicada ao ciclo de produto." },
],

"AI Product Specialist": [
  { title: "Curso de AI Product Specialist", institution: "PM3", reason: "Focado em ML, Deep Learning, GenAI e ROI, com forte aderência ao papel." },
  { title: "AI Product Leaders", institution: "Tera", reason: "Complementa com liderança de produto com IA e aplicação prática." },
],

"AI Product Manager": [
  { title: "Formação AI Product Manager", institution: "Tera", reason: "Formação específica para construir, automatizar e operar produtos inteligentes." },
  { title: "Inteligência Artificial em Produto", institution: "Tera", reason: "Boa para conectar IA ao ciclo de produto do discovery ao delivery." },
],

"GenAI Product Manager": [
  { title: "Formação AI Product Manager", institution: "Tera", reason: "Curso forte para aplicar IA em discovery, MVPs, automação e agentes inteligentes." },
  { title: "Curso de AI Product Specialist", institution: "PM3", reason: "Ajuda a entender GenAI com foco em dados, custo e ROI." },
],

"Voice of Customer Manager": [
  { title: "Curso de Técnicas de Pesquisa", institution: "PM3 Sprints", reason: "Ensina a coletar e validar insights diretamente da voz do cliente, base do trabalho de VoC." },
  { title: "Customer Success: cultura centrada em cliente", institution: "Alura", reason: "Curso focado em cultura e processos centrados no cliente, aderente ao dia a dia de VoC." },
],

"Customer Insights Analyst": [
  { title: "Curso de Técnicas de Pesquisa", institution: "PM3 Sprints", reason: "Base sólida para captar e validar insights de usuários de forma estruturada." },
  { title: "Curso de Product Analytics", institution: "PM3", reason: "Complementa com leitura de dados quantitativos para embasar os insights qualitativos." },
],

"Product Insights Manager": [
  { title: "Curso de Product Analytics", institution: "PM3", reason: "Boa base para transformar dados de produto em insights acionáveis." },
  { title: "Curso de Product Analytics", institution: "Tera", reason: "Ajuda a estruturar leitura de dados e comunicação com liderança." },
],

"Diretor(a) de Produto": [
  { title: "Curso de Product Leadership", institution: "PM3", reason: "Curso específico para liderança de produto e gestão de equipes." },
  { title: "Liderança e Estratégia de Produtos Digitais", institution: "Tera", reason: "Formação voltada a líderes estratégicos de produto, com módulo de IA aplicada ao ciclo de produto." },
],

"CPO": [
  { title: "Curso de Product Leadership", institution: "PM3", reason: "Focado em liderança sênior e estratégia de produto." },
  { title: "MBA em Product Management & Growth Leadership", institution: "FIAP", reason: "Traz estratégia, performance, discovery e visão executiva de produto." },
],

"Head de Produto": [
  { title: "Curso de Product Leadership", institution: "PM3", reason: "Melhor match para desenvolver liderança de alto nível em Produto." },
  { title: "Liderança e Estratégia de Produtos Digitais", institution: "Tera", reason: "Formação voltada a líderes estratégicos de produto, com módulo de IA aplicada ao ciclo de produto." },
],
"Product Ops Manager": [
  { title: "Curso de Product Operations: estratégias avançadas", institution: "PM3 Sprints", reason: "Curso específico para estruturar e escalar Product Operations." },
  { title: "Curso de Product Operations: fundamentos", institution: "PM3 Sprints", reason: "Bom para consolidar a base de Product Ops." },
],

"Product Operations": [
  { title: "Curso de Product Operations: fundamentos", institution: "PM3 Sprints", reason: "Direto ao tema e com foco em implementação da área." },
  { title: "Curso de Product Operations: estratégias avançadas", institution: "PM3 Sprints", reason: "Complementa com visão mais madura e de escala." },
],

"UX Researcher": [
  { title: "Investigação ágil para produtos inovadores - UX Research", institution: "Alura", reason: "Foca em pesquisa aplicada, levantamento de requisitos e cocriação." },
  { title: "Curso de Técnicas de Pesquisa", institution: "PM3 Sprints", reason: "Boa opção brasileira para pesquisa com usuário em produto." },
],

"Product Researcher": [
  { title: "Curso de Técnicas de Pesquisa", institution: "PM3 Sprints", reason: "Mais aderente para pesquisa de produto e geração de insights." },
  { title: "Investigação ágil para produtos inovadores - UX Research", institution: "Alura", reason: "Complementa com abordagem ágil e aplicação prática de pesquisa com usuários." },
],

"Senior PM": [
  { title: "Curso de Product Manager", institution: "PM3", reason: "Curso referência no Brasil para gestão de produtos digitais." },
  { title: "Product Manager: uma jornada em gestão de produtos", institution: "FIAP", reason: "Boa opção para aprofundar fundamentos e visão de gestão." },
],

"Product Manager": [
  { title: "Curso de Product Manager", institution: "PM3", reason: "Formação central para PM com conteúdo de PM, dados, discovery e estratégia." },
  { title: "Curso de Product Discovery", institution: "PM3", reason: "Complementa muito bem a parte de discovery e pesquisa." },
],

"Product Owner": [
  { title: "Formação Product Owner", institution: "Unifor (Educação Continuada)", reason: "Direta para o papel de PO." },
  { title: "Agile Scrum Product Owner", institution: "Fundação Vanzolini", reason: "Boa para consolidar prática ágil e certificação." },
],

"Associate/Junior PM": [
  { title: "Product Manager: uma jornada em gestão de produtos", institution: "FIAP", reason: "Melhor para começar com base estruturada em gestão de produtos." },
  { title: "Curso de Product Manager", institution: "PM3", reason: "Ajuda a acelerar a curva de aprendizado com repertório prático." },
],

"Technical PM": [
  { title: "Curso de Product Manager", institution: "PM3", reason: "Inclui dados, analytics, testes A/B e interação com tecnologia." },
  { title: "Curso de Tecnologia para Product Managers", institution: "PM3 Sprints", reason: "Mais aderente ao lado técnico da função." },
],

"Principal/Staff PM": [
  { title: "Curso de Product Leadership", institution: "PM3", reason: "Melhor escolha para liderança horizontal e impacto estratégico." },
  { title: "Curso de Product Manager", institution: "PM3", reason: "Complementa com estratégia, dados e visão de produto." },
],

"VP de Produto": [
  { title: "Curso de Product Leadership", institution: "PM3", reason: "Curso sênior, com foco em liderança e estratégia de Produto." },
  { title: "MBA em Product Management & Growth Leadership", institution: "FIAP", reason: "Boa para visão executiva, estratégia e crescimento." },
],

"Group PM": [
  { title: "Curso de Product Leadership", institution: "PM3", reason: "Útil para quem lidera múltiplos produtos e precisa escalar liderança." },
  { title: "Curso de Product Manager", institution: "PM3", reason: "Reforça estratégia, métricas e gestão de produto." },
],

"Technical Program Manager": [
  { title: "Gerenciamento de Programas, Portfólio e PMO", institution: "FGV", reason: "Melhor match encontrado para gestão de programas, portfólio e governança." },
  { title: "MBA Gerenciamento de Projetos, Programas e Portfólios", institution: "PUC-Rio", reason: "Forte opção para lidar com programas e coordenação estratégica." },
],

"Product Program Manager": [
  { title: "Gerenciamento de Programas, Portfólio e PMO", institution: "FGV", reason: "Muito aderente para gerir dependências, programas e portfólio em contexto de produto." },
  { title: "MBA Gerenciamento de Projetos, Programas e Portfólios", institution: "PUC-Rio", reason: "Complementa com gestão estruturada de projetos e programas." },
],
};

export default marketCourses;
