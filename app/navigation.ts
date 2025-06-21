// Rotas do projeto Mulher Mais Segura
export const routes = {
  home: "/",
  login: "/login",
  avaliacaoSeguranca: "/avaliacao-seguranca",
  avaliacaoRapida: "/avaliacao-rapida",
  contatosEmergencia: "/contatos-emergencia",
  emergencia: "/emergencia",
  recursosEducativos: "/recursos-educativos",
  redeApoio: "/rede-apoio",
  test: "/test",
} as const;

export const routeNames = {
  home: "Início",
  login: "Login",
  avaliacaoSeguranca: "Avaliação de Segurança",
  avaliacaoRapida: "Avaliação Rápida",
  contatosEmergencia: "Contatos de Emergência",
  emergencia: "Emergência",
  recursosEducativos: "Recursos Educativos",
  redeApoio: "Rede de Apoio",
  test: "Teste",
} as const;

export type RouteKey = keyof typeof routes; 