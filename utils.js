// utils.js — Danmo Escalas

// Meses em português
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

// Dias num mês
function diasNoMes(ano, mes) {
  return new Date(ano, mes, 0).getDate(); // mes é 1-based
}

// Dia da semana do dia 1 do mês (0=Dom, 1=Seg, ...)
function primeiroDiaSemana(ano, mes) {
  return new Date(ano, mes - 1, 1).getDay();
}

// Formatar data curta
function formatarData(data) {
  if (!data) return '—';
  const d = new Date(data);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

// Toast de notificação
function toast(msg, tipo = 'info') {
  const cores = { info: '#2196F3', ok: '#4CAF50', erro: '#F44336', aviso: '#FFC107' };
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:${cores[tipo] || cores.info}; color:#fff;
    padding:12px 20px; border-radius:8px; font-size:14px;
    box-shadow:0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn .3s ease;
  `;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// Confirmar acção
function confirmar(msg) {
  return window.confirm(msg);
}

// Calcular turno de um grupo num dia específico
// offset_inicio: 0=A, 2=B, 4=C, 6=D
// Ciclo: 07/19, 07/19, 19/07, 19/07, Folga, Folga, Folga, Folga
function calcularTurno(offsetGrupo, diaDoMes, diaInicioMes) {
  // diaInicioMes = posição no ciclo do dia 1 deste mês para este grupo
  const pos = (diaInicioMes + diaDoMes - 1) % 8;
  if (pos === 0 || pos === 1) return '07/19';
  if (pos === 2 || pos === 3) return '19/07';
  return 'Folga';
}

// Abreviar nome longo
function abreviarNome(nome, maxLen = 22) {
  if (!nome || nome.length <= maxLen) return nome;
  const partes = nome.split(' ');
  if (partes.length <= 2) return nome.substring(0, maxLen) + '…';
  return `${partes[0]} ${partes[partes.length - 1]}`;
}

// Cores dos turnos
const COR_TURNO = {
  '07/19': { bg: '#1a3a5c', text: '#90cdf4', label: 'Manhã' },
  '19/07': { bg: '#2d1b4e', text: '#d6bcfa', label: 'Noite' },
  'Folga': { bg: '#1a2e1a', text: '#9ae6b4', label: 'Folga' },
  'Ferias':{ bg: '#3d2600', text: '#fbd38d', label: 'Férias' },
  'LD':    { bg: '#3d1515', text: '#fc8181', label: 'Lic. Doença' },
  'Norm.': { bg: '#1a2535', text: '#a0aec0', label: 'Normal' },
  'FRD':   { bg: '#2d2d00', text: '#f6e05e', label: 'Feriado' },
  'Sup.':  { bg: '#1a2535', text: '#76e4f7', label: 'Supervisão' },
  'Esc.':  { bg: '#1a2535', text: '#b794f4', label: 'Escala' },
};

function corTurno(turno) {
  return COR_TURNO[turno] || { bg: '#2d2d2d', text: '#a0aec0', label: turno };
}
