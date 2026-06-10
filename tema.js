// tema.js — Danmo Escalas
// Consistente com danmo-billing e danmo-stock

const TEMAS = {
  azul:     { primary: '#1a2a4a', secondary: '#2196F3', accent: '#FFC107' },
  verde:    { primary: '#1a3a2a', secondary: '#4CAF50', accent: '#FFC107' },
  roxo:     { primary: '#2a1a4a', secondary: '#9C27B0', accent: '#FFC107' },
  vermelho: { primary: '#4a1a1a', secondary: '#F44336', accent: '#FFC107' },
  cinza:    { primary: '#2a2a2a', secondary: '#607D8B', accent: '#FFC107' }
};

function aplicarTema(nomeTema, modoEscuro) {
  const tema = TEMAS[nomeTema] || TEMAS['azul'];
  const root = document.documentElement;

  root.style.setProperty('--color-primary',   tema.primary);
  root.style.setProperty('--color-secondary', tema.secondary);
  root.style.setProperty('--color-accent',    tema.accent);

  if (modoEscuro) {
    root.style.setProperty('--color-bg',       '#0f1117');
    root.style.setProperty('--color-surface',  '#1c2333');
    root.style.setProperty('--color-border',   '#2d3748');
    root.style.setProperty('--color-text',     '#e2e8f0');
    root.style.setProperty('--color-text-muted','#94a3b8');
    root.style.setProperty('--color-sidebar',  tema.primary);
  } else {
    root.style.setProperty('--color-bg',       '#f0f4f8');
    root.style.setProperty('--color-surface',  '#ffffff');
    root.style.setProperty('--color-border',   '#e2e8f0');
    root.style.setProperty('--color-text',     '#1a202c');
    root.style.setProperty('--color-text-muted','#718096');
    root.style.setProperty('--color-sidebar',  tema.primary);
  }

  document.body.dataset.tema  = nomeTema;
  document.body.dataset.modo  = modoEscuro ? 'escuro' : 'claro';
}

function carregarTema() {
  const tema  = localStorage.getItem('dm_tema')  || 'azul';
  const escuro = localStorage.getItem('dm_escuro') === 'true';
  aplicarTema(tema, escuro);
  return { tema, escuro };
}

function guardarTema(nomeTema, modoEscuro) {
  localStorage.setItem('dm_tema',   nomeTema);
  localStorage.setItem('dm_escuro', modoEscuro);
  aplicarTema(nomeTema, modoEscuro);
}
