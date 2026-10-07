# NannyBoss — Fase 1
## Direção
Referência aprovada: página Apple, apenas ritmo editorial, espaço negativo, tipografia ampla, composição de produto e pastel. Não reutilizar imagens, texto ou símbolos Apple. Conteúdo pt-PT, adultos, CHILD FIRST. ALWAYS.
## Identidade
Símbolo original: duas curvas entrelaçadas num contorno protetor aberto, ligação com autonomia. Wordmark NannyBoss, horizontal, compacto e app icon, todos SVG monocromáticos.
## Tokens
Off-white #f8f9fc, tinta #202633, secundário #5c6576, CTA azul #2364c5, lavender #e8e3f6, sky #e4effb, mint #e0f0e8, blush #f7e7e9. Contraste por tinta escura sobre superfícies pastel. Tipografia system Apple / Segoe UI; display tracking negativo, títulos 32–76px adaptáveis; corpo 15–17px, line-height 1.6. Espaçamento 4/8/12/16/24/32/48/64/96. Raios 12/18/24/32/pill. Blur 18px, sombra suave 0 12px 40px rgba(40,50,80,.07), bordas branco translúcido e cinza frio.
## Componentes
Button, Card, Badge, Avatar, Input, Alert, Dialog com focus trap/Escape/restore, Toast, Tabs/segmentos, estado vazio, Skeleton, segurança. Estados hover/focus/active/disabled. Alvos 44px; nunca transmitir estado apenas por cor.
## Layout
Landing editorial clara com escultura de proteção CSS/SVG pastel, destaques e preview. Aplicação com sidebar glass desktop, navegação inferior mobile e menu completo. Parent/Babysitter compartilham shell; Administração simples. Grelhas fluidas, formulários de uma coluna em mobile, sem scroll horizontal.
## Motion
Entrada 400ms, hover 180ms, transições de superfícies 200ms; reduced-motion desativa movimento e smooth scroll.
## Limites
Sem autenticação, pagamentos, backend funcional, verificações, GPS, videochamadas ou IA reais. Dados sintéticos, memória local React; não persistir dados de crianças. Todos os estados verificados identificados como demonstração. Serviços provisionados pela stack não usados pelo protótipo. Analytics obrigatório do template mantido.
## Arquitetura
packages/web exclusivamente. pages por área, layouts, components, tokens, navigation, mock data, context e assets públicos. Sem novas rotas API nem tabelas. Estado de reservas/mensagens/preferências apenas em memória; refresh repõe demonstração. Audit report externo ao app para inspeção read-only final.
