/**
 * ==========================================================================
 * Service Layer: Code Review Engine & Simulator
 * Manejo del estado, ciclo de auditoría en 4 fases y renderizado de resultados
 * ==========================================================================
 */

class SimulatorEngine {
  constructor() {
    this.activeKey = 'python';
    this.isAuditing = false;
    this.subscribers = [];
  }

  getDataset() {
    return window.CODE_SNIPPETS || {};
  }

  getCurrentSnippet() {
    const dataset = this.getDataset();
    return dataset[this.activeKey] || dataset.python;
  }

  setSnippet(key) {
    const dataset = this.getDataset();
    if (dataset[key]) {
      this.activeKey = key;
      this.render();
      this.notifyStateChange({ event: 'snippetChanged', key });
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notifyStateChange(payload) {
    this.subscribers.forEach(cb => cb(payload));
  }

  init() {
    this.render();
  }

  render() {
    const data = this.getCurrentSnippet();
    if (!data) return;
    
    // Update active button indicators
    ['python', 'typescript', 'solid'].forEach(k => {
      const btn = document.getElementById(`btn-snippet-${k}`);
      if (btn) {
        if (k === this.activeKey) {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10';
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition bg-gray-900/80 text-gray-400 border border-gray-800 hover:text-white hover:bg-gray-800';
        }
      }
    });

    // Update Language tag and input textarea
    const langTag = document.getElementById('current-lang-tag');
    if (langTag) langTag.innerText = data.langTag;

    const codeInput = document.getElementById('code-input');
    if (codeInput) codeInput.value = data.code;

    // Render result components
    this.renderReport(data);
  }

  renderReport(data) {
    // Score & Status
    const scoreText = document.getElementById('score-text');
    if (scoreText) scoreText.innerText = data.score;

    const statusBadge = document.getElementById('status-badge');
    if (statusBadge) {
      statusBadge.innerText = data.status;
      statusBadge.className = `px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
        data.statusColor === 'emerald'
          ? 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300'
          : data.statusColor === 'red'
          ? 'bg-red-950/70 border-red-600/50 text-red-300'
          : 'bg-amber-950/70 border-amber-600/50 text-amber-300'
      }`;
    }

    // Summary & Metrics
    const summary = document.getElementById('result-summary');
    if (summary) summary.innerText = data.summary;

    const timeMetric = document.getElementById('metric-time');
    if (timeMetric) timeMetric.innerText = `Tiempo: ${data.metrics.time}`;

    const tokensMetric = document.getElementById('metric-tokens');
    if (tokensMetric) tokensMetric.innerText = `Tokens: ${data.metrics.tokens}`;

    // Code Smells
    const smellsContainer = document.getElementById('result-smells');
    if (smellsContainer) {
      smellsContainer.innerHTML = '';
      data.smells.forEach(s => {
        const li = document.createElement('li');
        let colorClass = 'text-gray-300';
        let iconName = 'info';
        let badgeColor = 'bg-blue-950/60 text-blue-300 border-blue-800';

        if (s.type === 'red') {
          colorClass = 'text-red-300/90';
          iconName = 'x-circle';
          badgeColor = 'bg-red-950/60 text-red-300 border-red-800';
        } else if (s.type === 'amber') {
          colorClass = 'text-amber-300/90';
          iconName = 'alert-triangle';
          badgeColor = 'bg-amber-950/60 text-amber-300 border-amber-800';
        }

        li.className = `flex items-start space-x-2.5 ${colorClass}`;
        li.innerHTML = `
          <i data-lucide="${iconName}" class="w-4 h-4 shrink-0 mt-0.5"></i>
          <div>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border ${badgeColor} mr-1 font-semibold">${s.badge}</span>
            <span>${s.text}</span>
          </div>
        `;
        smellsContainer.appendChild(li);
      });
    }

    // Refactored Code Block
    const resultCode = document.getElementById('result-code');
    if (resultCode) resultCode.innerHTML = data.refactoredHTML;

    // Additional Best Practices
    const practicesContainer = document.getElementById('result-practices');
    if (practicesContainer) {
      practicesContainer.innerHTML = '';
      data.practices.forEach(p => {
        const div = document.createElement('div');
        div.className = 'p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 flex flex-col justify-between';
        div.innerHTML = `
          <p class="font-semibold text-white text-xs">${p.title}</p>
          <p class="text-gray-400 text-xs mt-1 leading-relaxed">${p.desc}</p>
        `;
        practicesContainer.appendChild(div);
      });
    }

    // Refresh icons if lucide is globally available
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  runAuditSimulation(onComplete) {
    if (this.isAuditing) return;
    this.isAuditing = true;

    const btn = document.getElementById('run-audit-btn');
    const progress = document.getElementById('audit-progress-container');
    const stepLabel = document.getElementById('audit-step-label');
    const editorWrapper = document.getElementById('editor-wrapper');

    if (btn) {
      btn.disabled = true;
      btn.classList.add('opacity-50');
    }
    if (progress) progress.classList.remove('hidden');
    if (editorWrapper) editorWrapper.classList.add('scanner-active');

    const steps = [
      '1/4 Analizando sintaxis, estilo (PEP8/TS) y carga cognitiva...',
      '2/4 Evaluando principios SOLID y patrones de diseño...',
      '3/4 Auditando seguridad OWASP y eficiencia de memoria...',
      '4/4 Sintetizando reporte y generando versión Clean Code...'
    ];

    let currentStep = 0;
    if (stepLabel) stepLabel.innerText = steps[currentStep];

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        if (stepLabel) stepLabel.innerText = steps[currentStep];
      } else {
        clearInterval(interval);
        this.isAuditing = false;

        if (progress) progress.classList.add('hidden');
        if (editorWrapper) editorWrapper.classList.remove('scanner-active');
        if (btn) {
          btn.disabled = false;
          btn.classList.remove('opacity-50');
        }

        this.render();
        if (typeof onComplete === 'function') onComplete();
      }
    }, 450);
  }
}

// Global window registration
window.simulator = new SimulatorEngine();
