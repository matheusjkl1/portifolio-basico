/**
 * Arquivo JavaScript Principal
 * Gerencia: Alternância de Tema, Menu Hambúrguer Mobile, Acordeão e Filtro de Projetos
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initAccordions();
  initProjectFilters();
});

/* ==========================================================================
   ALTERNÂNCIA DE TEMA
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Recupera a preferência de tema do localStorage ou verifica o esquema de cores preferido do sistema
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Define o estado inicial do tema
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  // Associa a ação de alternância
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    // Salva a seleção atual no localStorage
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  });
}

/* ==========================================================================
   ALTERNÂNCIA DO MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!menuToggle || !navMenu) return;

  // Alterna a classe ativa do menu mobile
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Acessibilidade: define o estado de aria-expanded
    const isActive = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Fecha o menu mobile quando os links de navegação são clicados
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   ACORDEÃO INTERATIVO (DETALHES DO PROJETO)
   ========================================================================== */
function initAccordions() {
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length === 0) return;

  projectCards.forEach(card => {
    const header = card.querySelector('.project-header-row');
    const expandArea = card.querySelector('.project-body-expand');

    if (!header || !expandArea) return;

    header.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');

      // Fecha outros acordeões primeiro (comportamento de acordeão único expandido)
      projectCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
          const otherExpandArea = otherCard.querySelector('.project-body-expand');
          if (otherExpandArea) {
            otherExpandArea.style.maxHeight = '0px';
          }
        }
      });

      // Alterna a classe ativa no cartão atual
      card.classList.toggle('active');

      if (!isAlreadyActive) {
        // Expandir: Define a altura dinamicamente com base no scrollHeight para uma transição suave
        const scrollHeight = expandArea.scrollHeight;
        expandArea.style.maxHeight = `${scrollHeight}px`;
      } else {
        // Colapsar
        expandArea.style.maxHeight = '0px';
      }
    });
  });
}

/* ==========================================================================
   FILTROS DE TAGS DE PROJETOS
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Atualiza o estado ativo dos botões
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        // Recupera o array de tags do atributo do projeto (ex: data-tags="backend,ia,database")
        const cardTags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').split(',') : [];

        if (filterValue === 'all' || cardTags.includes(filterValue)) {
          card.style.display = 'block';
          card.style.opacity = '0';

          // Pequeno atraso para a animação de fade-in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity var(--transition-normal)';
          }, 50);
        } else {
          card.style.display = 'none';

          // Colapsa o acordeão se estiver oculto
          card.classList.remove('active');
          const expandArea = card.querySelector('.project-body-expand');
          if (expandArea) {
            expandArea.style.maxHeight = '0px';
          }
        }
      });
    });
  });
}
