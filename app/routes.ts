import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  
  // Login sem layout (tem seu próprio design)
  route("/login", "pages/Login.tsx"),
  
  // Páginas principais com layout compartilhado
  layout("routes/app-layout.tsx", [
    route("/avaliacao-seguranca", "pages/AvaliacaoSeguranca.tsx"),
    route("/avaliacao-rapida", "pages/AvaliacaoRapida.tsx"),
    route("/contatos-emergencia", "pages/ContatosEmergencia.tsx"),
    route("/emergencia", "pages/Emergencia.tsx"),
    route("/recursos-educativos", "pages/RecursosEducativos.tsx"),
    route("/rede-apoio", "pages/RedeApoio.tsx"),
    route("/test", "pages/Test.tsx"),
  ]),
] satisfies RouteConfig;
