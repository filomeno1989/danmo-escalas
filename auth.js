// auth.js — Danmo Escalas

const AUTH_KEY = 'dm_escalas_user';

async function login(codigo, senha) {
  const { data, error } = await supabase
    .from('utilizadores')
    .select('*')
    .eq('codigo', codigo.toUpperCase())
    .eq('senha', senha)
    .eq('activo', true)
    .single();

  if (error || !data) return { ok: false, erro: 'Código ou senha incorrectos.' };

  // Verificar se tem acesso ao módulo Escalas
  const niveis = ['Admin', 'Gestor', 'Operador'];
  if (!niveis.includes(data.nivel)) return { ok: false, erro: 'Sem permissão de acesso.' };

  sessionStorage.setItem(AUTH_KEY, JSON.stringify({
    id:     data.id,
    codigo: data.codigo,
    nome:   data.nome,
    nivel:  data.nivel
  }));

  return { ok: true, user: data };
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
