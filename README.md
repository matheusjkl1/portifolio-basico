# Matheus Mendes - Portfólio & Brag Document 🚀

Este repositório contém o código-fonte de um website completo responsivo desenvolvido como projeto prático para a disciplina de **Programação Front-End**. O site foi desenvolvido do zero utilizando apenas **HTML5, CSS3 e JavaScript ES6 puro (Vanilla)**, sem o uso de bibliotecas externas ou frameworks, para demonstrar o domínio sobre os conceitos fundamentais da web.

---

## 🛠️ Stack Tecnológica

*   **Estrutura:** HTML5 Semântico
*   **Estilização:** CSS3 Vanilla (Mobile-First, CSS Grid Layout, Flexbox)
*   **Dinamismo/Interações:** JavaScript ES6 puro
*   **Tipografia:** Google Fonts (Outfit para títulos e Inter para o corpo de texto)
*   **Ícones:** SVGs inline nativos (otimização de requisições HTTP)

---

## 📁 Estrutura de Diretórios

```
portifolio/
├── index.html                   # Página inicial (Hero, Métricas de Impacto e Especialidades)
├── sobre.html                   # Página sobre mim (Biografia e Linha do Tempo)
├── projetos.html                # Brag Document (Projetos detalhados e filtragem)
├── contato.html                 # Página de contato (Formulário com validação JS)
├── css/
│   └── style.css                # Variáveis CSS, design system, layouts e responsividade
├── js/
│   ├── main.js                  # Lógica geral (Theme toggle, menu hambúrguer e acordeão)
│   └── contact.js               # Lógica de validação em tempo real e toast de sucesso
└── assets/
    └── images/
        └── screenshots/         # Capturas de tela demonstrativas da aplicação
```

---

## 🌟 Principais Funcionalidades

1.  **Layout Responsivo (Mobile-First):** Layout 100% responsivo projetado primeiramente para dispositivos móveis e adaptando-se perfeitamente para tablets e monitores desktop através de Media Queries.
2.  **Alternância de Tema (Light/Dark Mode):** Recurso de alteração de cores para tema escuro e claro. A preferência do usuário é armazenada no `localStorage` do navegador para persistência em visitas futuras ou novas abas.
3.  **Menu Hambúrguer Responsivo:** Navegação móvel inteligente ativada por um menu gaveta animado para dispositivos móveis, focado em facilidade de toque e usabilidade.
4.  **Filtro Dinâmico de Projetos:** Filtragem de projetos na tela *Brag Document* por tags técnicas de forma instantânea via manipulação de DOM pelo JavaScript.
5.  **Acordeão de Projetos:** Detalhes expansíveis de cada projeto calculados dinamicamente (`scrollHeight` no JS), gerando uma transição de expansão/fechamento fluida e suave.
6.  **Validação Avançada de Contato:** Validação client-side sofisticada no formulário de contato com checagem de e-mail (RegEx) e nome completo (nome e sobrenome), fornecendo alertas visuais claros de erro (`.invalid`) e sucesso (`.valid`) com injeção dinâmica de notificação Toast.

---

## ♿ Acessibilidade (WCAG) & SEO

*   **Semântica Rígida:** Uso de tags apropriadas do HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) para correta leitura por ferramentas de acessibilidade e melhor posicionamento nos motores de busca (SEO).
*   **Navegação por Teclado:** Foco visual bem definido (`:focus`) e navegação facilitada em menus, acordeões e formulários.
*   **Atributos ARIA:** Utilização de `aria-expanded`, `aria-invalid`, `aria-live="polite"` e labels corretas nos campos de formulário para suporte a leitores de tela.

---