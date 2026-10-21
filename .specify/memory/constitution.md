<!--
Sync Impact Report
- Version change: (template) → 1.0.0
- Principles defined: I. Fidelidade ao Layout; II. React + TypeScript Estrito;
  III. Componentização; IV. Estilos com Sass, sem Bibliotecas de UI;
  V. HTML Semântico, SEO e Acessibilidade; VI. Qualidade Verificável
- Added sections: Restrições Técnicas; Fluxo de Desenvolvimento
- Removed sections: none
- Deferred TODOs: none
-->
# Teste Front-End Econverse Constitution

## Core Principles

### I. Fidelidade ao Layout (NON-NEGOTIABLE)

A página MUST reproduzir o layout do Figma "Teste Front-End Jr" pixel a pixel: dimensões,
espaçamentos, tamanhos e pesos de fonte, cores, bordas, sombras e estados de botões.
Valores MUST vir do arquivo Figma (ou de capturas oficiais fornecidas pelo teste) e ser
centralizados como design tokens Sass; valores "aproximados a olho" só são aceitos quando a
fonte oficial for inacessível, e MUST ser registrados como tal no spec.
**Rationale**: o README do teste exige explicitamente "Respeitar o Layout pixel a pixel".

### II. React + TypeScript Estrito

Toda a interface MUST ser escrita em React com TypeScript em modo `strict`. `any` é proibido;
os dados externos (JSON de produtos) MUST ter tipos explícitos e ser validados na borda
(camada de serviço) antes de chegar aos componentes.
**Rationale**: requisito do teste e base de "Lógica do código".

### III. Componentização

Cada bloco visual do layout (cabeçalho, banner, categorias, vitrine, card de produto, modal,
parceiros, newsletter, rodapé etc.) MUST ser um componente próprio, com props tipadas e
estilo co-localizado. Componentes de apresentação MUST NOT buscar dados; o acesso à API fica
em serviços/hooks. Componentes reutilizáveis (botão, título de seção, card) MUST ser
extraídos quando usados em mais de um lugar.
**Rationale**: "Componentização" e "Organização do projeto" são critérios de avaliação.

### IV. Estilos com Sass, sem Bibliotecas de UI

Estilos MUST ser escritos em Sass (SCSS), usando variáveis/mixins para tokens. Bibliotecas de
UI ou CSS prontas (Bootstrap, Foundation, Tailwind, MUI, Chakra, carrosséis prontos etc.)
MUST NOT ser usadas; carrossel e modal são implementados no próprio projeto.
**Rationale**: restrições explícitas do README do teste.

### V. HTML Semântico, SEO e Acessibilidade

A marcação MUST usar elementos semânticos (`header`, `nav`, `main`, `section`, `article`,
`footer`, `dialog`/`role="dialog"`), hierarquia de títulos coerente, `alt` em imagens,
`lang="pt-BR"`, meta tags de título/descrição/Open Graph. Elementos interativos MUST ser
operáveis por teclado; o modal MUST prender o foco, fechar com `Esc` e devolver o foco.
**Rationale**: "Pontos Extras" do teste (SEO e HTML semântico) e qualidade geral.

### VI. Qualidade Verificável

O projeto MUST compilar sem erros de TypeScript e lint. Lógica não trivial (formatação de
preço, parcelamento, filtragem/paginação da vitrine, abertura/fechamento do modal) MUST ter
testes automatizados. O README MUST explicar como instalar, rodar, testar e gerar build.
**Rationale**: o teste pede instruções para "compilar, testar e rodar o projeto".

## Restrições Técnicas

- Stack: Vite + React + TypeScript + Sass; testes com Vitest + Testing Library.
- Dados de produtos MUST ser consumidos em tempo de execução do endpoint oficial
  `https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`,
  com tratamento de estados de carregamento e erro.
- Dependências de runtime MUST se limitar a React/ReactDOM salvo justificativa no plano.
- Fontes e ícones MUST seguir o Figma; assets exportados ficam em `src/assets`.

## Fluxo de Desenvolvimento

- Desenvolvimento guiado por spec (Spec Kit): constitution → specify → plan → tasks →
  implement; desvios do layout ou do escopo MUST ser registrados no spec.
- Commits pequenos e descritivos (Conventional Commits).
- Antes de concluir: `typecheck`, `lint`, `test` e `build` MUST passar, e a página MUST ser
  comparada visualmente com o Figma em 1920px de largura (largura do layout de referência).

## Governance

Esta constituição prevalece sobre outras práticas do projeto. Alterações MUST ser
registradas neste arquivo com incremento de versão semântico (MAJOR: remoção/redefinição de
princípio; MINOR: novo princípio ou seção; PATCH: redação). Todo plano e revisão MUST
verificar conformidade com os princípios acima; qualquer complexidade adicional MUST ser
justificada no plano.

**Version**: 1.0.0 | **Ratified**: 2026-10-21 | **Last Amended**: 2026-10-21
