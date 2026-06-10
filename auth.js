// auth.js — Danmo Escalas

const AUTH_KEY = 'dm_escalas_user';

async function login(codigo, senha) {
  const dados = await db.get('utilizadores', {
    codigo: codigo.toUpperCase(),
    senha: senha,
    activo: true
  });

  if (!dados || dados.length === 0) {
    return { ok: false, erro: 'Código ou senha incorrectos.' };
  }

  const user = dados[0];
  const niveis = ['Admin', 'Gestor', 'Operador'];
  if (!niveis.includes(user.nivel)) {
    return { ok: false, erro: 'Sem permissão de acesso.' };
  }

  sessionStorage.setItem(AUTH_KEY, JSON.stringify({
    id:     user.id,
    codigo: user.codigo,
    nome:   user.nome,
    nivel:  user.nivel
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

function isAdmin()  { const u = getUser(); return u && u.nivel === 'Admin'; }
function isGestor() { const u = getUser(); return u && ['Admin','Gestor'].includes(u.nivel); }
