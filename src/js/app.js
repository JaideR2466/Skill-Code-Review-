/**
 * ==========================================================================
 * Controller Layer: Main Application & UI Interactions
 * Control de eventos del DOM, navegación, modales y utilidades de usuario
 * ==========================================================================
 */

class AppController {
  constructor() {
    this.toastTimer = null;
    this.initEventListeners();
  }

  initEventListeners() {
    const onReady = () => {
      this.initLucide();
      if (window.simulator && typeof window.simulator.init === 'function') {
        window.simulator.init();
      }
      this.setupSimulatorButtons();
      this.setupReadmeTabs();
      this.setupCopyButtons();
      this.setupLightbox();
      this.setupNavigation();
      this.setupImageErrorHandling();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
  }

  initLucide() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Manejo robusto de fallbacks para imágenes y videos
   */
  setupImageErrorHandling() {
    window.handleInfographicError = function(img) {
      const candidates = [
        'src/assets/images/Infografia.png',
        './src/assets/images/Infografia.png',
        'Infografia.png',
        './Infografia.png'
      ];
      let current = img.getAttribute('src');
      let idx = candidates.indexOf(current);
      if (idx !== -1 && idx < candidates.length - 1) {
        img.src = candidates[idx + 1];
      }
    };
  }

  /**
   * Sistema de Notificaciones Toast
   */
  showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    if (!toast || !msg) return;

    msg.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2600);
  }

  /**
   * Configuración de Botones del Simulador
   */
  setupSimulatorButtons() {
    ['python', 'typescript', 'solid'].forEach(key => {
      const btn = document.getElementById(`btn-snippet-${key}`);
      if (btn) {
        btn.addEventListener('click', () => {
          if (window.simulator) window.simulator.setSnippet(key);
        });
      }
    });

    const runBtn = document.getElementById('run-audit-btn');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        if (window.simulator) {
          window.simulator.runAuditSimulation(() => {
            this.showToast('✅ ¡Auditoría completada exitosamente!');
          });
        }
      });
    }

    const resetBtn = document.getElementById('reset-audit-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (window.simulator) {
          window.simulator.setSnippet('python');
          this.showToast('Simulador restablecido a los valores por defecto');
        }
      });
    }
  }

  /**
   * Configuración de Pestañas del README (Renderizado vs Raw)
   */
  setupReadmeTabs() {
    const renderedTab = document.getElementById('tab-readme-rendered');
    const rawTab = document.getElementById('tab-readme-raw');
    const renderedContent = document.getElementById('readme-rendered-content');
    const rawContent = document.getElementById('readme-raw-content');

    if (!renderedTab || !rawTab || !renderedContent || !rawContent) return;

    renderedTab.addEventListener('click', () => {
      renderedTab.className = 'px-4 py-2 rounded-xl text-xs font-semibold transition bg-cyan-500 text-white shadow-md shadow-cyan-500/20';
      rawTab.className = 'px-4 py-2 rounded-xl text-xs font-medium transition bg-gray-900 text-gray-300 border border-gray-800 hover:text-white';
      renderedContent.classList.remove('hidden');
      rawContent.classList.add('hidden');
    });

    rawTab.addEventListener('click', () => {
      rawTab.className = 'px-4 py-2 rounded-xl text-xs font-semibold transition bg-cyan-500 text-white shadow-md shadow-cyan-500/20';
      renderedTab.className = 'px-4 py-2 rounded-xl text-xs font-medium transition bg-gray-900 text-gray-300 border border-gray-800 hover:text-white';
      rawContent.classList.remove('hidden');
      renderedContent.classList.add('hidden');
    });
  }

  /**
   * Utilidades para Copiado al Portapapeles
   */
  setupCopyButtons() {
    // Copiar código refactorizado
    const copyRefactorBtn = document.getElementById('btn-copy-refactored');
    if (copyRefactorBtn) {
      copyRefactorBtn.addEventListener('click', () => {
        const codeElement = document.getElementById('result-code');
        if (codeElement) {
          navigator.clipboard.writeText(codeElement.innerText).then(() => {
            this.showToast('¡Código refactorizado copiado al portapapeles!');
          });
        }
      });
    }

    // Copiar README completo
    const copyReadmeBtn = document.getElementById('btn-copy-readme');
    if (copyReadmeBtn) {
      copyReadmeBtn.addEventListener('click', () => {
        const rawElement = document.getElementById('raw-markdown-text');
        if (rawElement) {
          navigator.clipboard.writeText(rawElement.innerText).then(() => {
            this.showToast('¡README.md copiado en formato Markdown!');
          });
        }
      });
    }

    // Copiar prompt de la skill
    const copySkillBtn = document.getElementById('btn-copy-skill');
    if (copySkillBtn) {
      copySkillBtn.addEventListener('click', () => {
        const skillElement = document.getElementById('skill-file-text');
        if (skillElement) {
          navigator.clipboard.writeText(skillElement.innerText).then(() => {
            this.showToast('¡Skill Prompt copiado al portapapeles!');
          });
        }
      });
    }

    // Copiar comandos individuales
    document.querySelectorAll('[data-copy-cmd]').forEach(button => {
      button.addEventListener('click', () => {
        const cmd = button.getAttribute('data-copy-cmd');
        if (cmd) {
          navigator.clipboard.writeText(cmd).then(() => {
            this.showToast(`Comando copiado: ${cmd}`);
          });
        }
      });
    });
  }

  /**
   * Configuración de Lightbox para la Infografía
   */
  setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const openBtns = document.querySelectorAll('[data-open-lightbox]');
    const closeBtns = document.querySelectorAll('[data-close-lightbox]');

    if (!modal) return;

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    };

    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /**
   * Navegación Suave y Menú Móvil
   */
  setupNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }
}

// Instanciación global
window.app = new AppController();
