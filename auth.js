// auth.js — Danmo Escalas
// Autenticação temporariamente desactivada — login real no portal principal

const AUTH_KEY = 'dm_escalas_user';

// Login temporário — aceita qualquer código DM conhecido
async function login(codigo, senha) {
  // Utilizadores temporários enquanto o portal principal não está pronto
  const temp = {
    'DM0069': { nome: 'Filomeno Alexandre', nivel: 'admin',  cargo: 'Ass. Administrativo' },
    'DM0034': { nome: 'Manuel Nhandere',    nivel: 'gestor', cargo: 'Fiel de Armazem' },
  };

  const user = temp[codigo.toUpperCase()];
  if (!user) return { ok: false, erro: 'Código não reconhecido.' };

  // Senha temporária igual para todos: danmo2026
  if (senha !== 'danmo2026') return { ok: false, erro: 'Senha incorrecta.' };

  sessionStorage.setItem(AUTH_KEY, JSON.stringify({
    codigo: codigo.toUpperCase(),
    nome:   user.nome,
    nivel:  user.nivel,
    cargo:  user.cargo
  }));

  return { ok: true, user };
}

function getUser() {
  const raw = sessionStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}

function requireAuth() {
  const user = getUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}

function isAdmin()  { const u = getUser(); return u && u.nivel === 'admin'; }
function isGestor() { const u = getUser(); return u && ['admin','gestor'].includes(u.nivel); }
