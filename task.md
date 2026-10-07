# Fase 1
- [x] Plano e referência aprovados
- [x] Template e direção documentados
- [x] Identidade, tokens, componentes, páginas e navegação
- [x] Build e lint sem erros; 114 checks responsivos, 38 varrimentos axe, 14 fluxos aprovados na pré-verificação
- [x] Correções de overflow, contraste, foco, seleção de perfil, ARIA e selo mobile
- [x] Auditoria final anterior entregue com relatório e evidências
## Refinamento aprovado
- [x] Referência fornecida e plano aprovados; layout/páginas/navegação preservados
- [x] Logo azul/lilás reconstruído; WebP locais e fontes documentadas
- [x] Fotografias editoriais e avisos; criança sem ligação ao perfil sensível
- [x] Profundidade glass, legibilidade e alvos de ações corrigidos
- [x] Nome, preferências e resumo de pedido partilhados em memória
- [x] Mobile-first, pastéis suaves e legendas repetidas removidas; logo preservado
- [x] Parallax event-driven, entradas e microinterações com reduced-motion
- [x] Lint sem erros/warnings e build forçado aprovado; revisão visual mobile/desktop
- [x] CSS não carregado por cache antiga do Vite resolvido com reinício; fonte inalterada
- [x] Consistência do pedido confirmada; teste atualizado para esperar navegação React
- [x] Foco inicial do menu após render/transição, contenção, Escape e desbloqueio ao passar a desktop corrigidos e testados
- [x] Auditoria final anterior entregue; resultados históricos em nannyboss-refinamento.report (não validam os efeitos atuais)
## Efeitos e fluxos — pedido atual
- [x] Opção recomendada aprovada; não precisa de link da outra app
- [x] Direção de movimento documentada; apenas packages/web e estado local
- [x] Transições/reveals/microinterações, pedido em três etapas e confirmação demonstrativa
- [x] Assistente: apresentação progressiva pré-escrita, substituição/cancelamento, saltar e reduced-motion reativo
- [x] Validação: 132 combinações rota/largura, 55 scans axe e 13 fluxos aprovados; sem overflow, imagens quebradas, violações axe ou erros JS observados
- [x] Build root e lint aprovados (0 erros/avisos de lint); revisão visual mobile/desktop
- [x] Parallax e reveals adicionais testados com reduced-motion alterado em runtime
- [x] Corrigidos: clique perdido por mudança de layout no blur, botão de saltar instável e animação CSS duplicada nos cartões
- [x] Website atualizado entregue na preview 4200
Evidências atuais: /home/user/nannyboss-effects-audit. Testes de UI no servidor de desenvolvimento Chromium; build de produção compila, mas a matriz não foi executada num servidor de produção.
## Centro imersivo — pedido atual
- [x] Pré-visualização pública analisada; direção e módulos demonstrativos aprovados
- [x] Plano registado: packages/web, logo/rotas preservados, sem API/tabelas
- [x] Hub imersivo, quatro tipos de cuidado, agenda semanal partilhada, perfis compactos e nova hierarquia
- [x] Landing split, acesso, pedido, mensagens e navegação com linguagem visual unificada; catálogo atualizado
- [x] Build root e lint aprovados (0 erros/avisos lint)
- [x] 132 combinações rota/largura + 6 estados do hub, 66 scans axe e 18 fluxos aprovados; sem overflow da página, imagens quebradas, violações axe ou erros JS observados
- [x] Revisão visual mobile/desktop, seleção por teclado, cancelamento da confirmação ao mudar serviço/data e reduced-motion em runtime
- [x] Website atualizado entregue
Evidências atuais: /home/user/nannyboss-immersive-audit. Validação Chromium no servidor dev; build de produção compilado. Outros browsers/dispositivos reais não testados.
## Correção da homepage
- [x] Baselines 390/768/1024/1440 recolhidos; conflito de margens/posições do emblema e recorte vertical da leitura identificado
- [x] Direção documentada; intervenção scoped na homepage, preservando parallax e restantes páginas
- [x] Enquadramento do cabeçalho, fotografias, logótipo e etiquetas corrigido; selo Runable mantido no fim da homepage sem tapar conteúdo
- [x] Revisão visual e 42 estados de geometria em sete larguras (320–1920); fotos/emblema/etiquetas contidos durante scroll/ponteiro, sem colisão etiqueta–emblema
- [x] Nove verificações de movimento/menu/CTAs: parallax de scroll e ponteiro, reduced-motion inicial/runtime e limite coarse ≤12px
- [x] Lint/build aprovados (0 erros/avisos lint); regressão 132 combinações rota/largura, 55 scans axe e 13 fluxos aprovados
- [x] Sete scans axe adicionais da homepage sem violações observadas; sem overflow, imagens quebradas ou erros JS observados
- [x] Website corrigido pronto para entrega; dev 4200 responde HTTP 200
Evidências: /home/user/nannyboss-homepage-audit. Build compilado; testes Chromium no servidor dev. Primeiro teste dedicado bloqueou por decode de imagens lazy: corrigido para carregar imagens eager. Cache Vite desatualizada resolvida reiniciando o servidor antes da validação final. Sem validação Safari/Firefox/dispositivos reais.
## Limites conhecidos (mantidos)
- Warning DEP0205 do tooling mantido; não alterar plumbing.
- MotionConfig emite aviso informativo em desenvolvimento quando reduced-motion está ativo; não é erro funcional.
- Só Chromium headless; sem dispositivos reais, Safari/Firefox ou avaliação WCAG manual completa.
- Todos os serviços e processos operacionais são mock/conceito; analytics do template preservado.
- Mensagens iniciais, landing preview e conteúdo editorial são fixtures; não formam um modelo de domínio completo. Nome, preferências e pedido são partilhados em memória.
