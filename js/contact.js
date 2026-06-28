/**
 * Lógica de Validação do Formulário de Contato
 * Gerencia a validação em tempo real, mensagens de erro personalizadas e envios com notificação toast premium.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const fields = {
    nome: {
      input: document.getElementById('nome'),
      group: document.getElementById('nome-group'),
      validator: value => {
        const val = value.trim();
        if (val.length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
        // Valida se contém pelo menos nome e sobrenome
        if (!val.includes(' ') || val.split(' ').filter(word => word.length > 0).length < 2) {
          return 'Por favor, insira o seu nome e sobrenome completo.';
        }
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      group: document.getElementById('email-group'),
      validator: value => {
        const val = value.trim();
        if (val.length === 0) return 'O e-mail é obrigatório.';
        // Validação por expressão regular (Regex)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) return 'Insira um endereço de e-mail válido.';
        return '';
      }
    },
    assunto: {
      input: document.getElementById('assunto'),
      group: document.getElementById('assunto-group'),
      validator: value => {
        const val = value.trim();
        if (val.length < 5) return 'O assunto deve ter pelo menos 5 caracteres.';
        return '';
      }
    },
    mensagem: {
      input: document.getElementById('mensagem'),
      group: document.getElementById('mensagem-group'),
      validator: value => {
        const val = value.trim();
        if (val.length < 15) return 'A mensagem deve ter pelo menos 15 caracteres.';
        return '';
      }
    }
  };

  // Associa escutadores em tempo real para validação
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.input) return;

    // Valida durante a digitação
    field.input.addEventListener('input', () => {
      validateField(field);
    });

    // Valida ao perder o foco (blur)
    field.input.addEventListener('blur', () => {
      validateField(field);
    });
  });

  // Gerencia o envio do formulário
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    // Executa a validação em todos os campos
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      const isValid = validateField(field);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = field.input;
        }
      }
    });

    if (isFormValid) {
      // Simula o envio do formulário e exibe notificação de sucesso
      showToast('Mensagem enviada com sucesso! Matheus entrará em contato em breve.', 'success');

      // Limpa o formulário e remove as classes de validação
      contactForm.reset();
      Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.group.classList.remove('valid', 'invalid');
        field.input.removeAttribute('aria-invalid');
      });
    } else if (firstInvalidInput) {
      // Acessibilidade: Foca no primeiro input inválido
      firstInvalidInput.focus();
    }
  });

  // Função auxiliar de validação para campos individuais
  function validateField(field) {
    if (!field.input || !field.group) return true;

    const value = field.input.value;
    const errorMessage = field.validator(value);
    const errorContainer = field.group.querySelector('.error-message-text');

    if (errorMessage) {
      field.group.classList.add('invalid');
      field.group.classList.remove('valid');
      field.input.setAttribute('aria-invalid', 'true');
      if (errorContainer) {
        errorContainer.textContent = errorMessage;
      }
      return false;
    } else {
      // Limpa os erros
      field.group.classList.remove('invalid');
      // Adiciona a classe de estado válido apenas se o input não estiver vazio
      if (value.trim().length > 0) {
        field.group.classList.add('valid');
      } else {
        field.group.classList.remove('valid');
      }
      field.input.removeAttribute('aria-invalid');
      return true;
    }
  }

  // Gerador de Notificações Toast
  function showToast(message, type = 'success') {
    // Cria o container do toast se ele ainda não existir
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Cria o elemento do toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Ícone SVG de marcação de sucesso (checkmark)
    const checkIcon = `
      <div class="toast-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    `;

    // Ícone SVG de fechar (X)
    const closeIcon = `
      <button class="toast-close" aria-label="Fechar notificação">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    toast.innerHTML = `
      ${checkIcon}
      <span class="toast-message">${message}</span>
      ${closeIcon}
    `;

    container.appendChild(toast);

    // Efeito de entrada (Fade/Slide)
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Remoção automática após 5 segundos
    const autoRemove = setTimeout(() => {
      removeToast(toast);
    }, 5000);

    // Ouvinte do botão de fechar
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeToast(toast);
      });
    }
  }

  function removeToast(toast) {
    toast.classList.remove('show');
    // Remove do DOM após a conclusão da transição
    toast.addEventListener('transitionend', () => {
      toast.remove();
      // Remove o container se estiver vazio
      const container = document.querySelector('.toast-container');
      if (container && container.childNodes.length === 0) {
        container.remove();
      }
    });
  }
});
