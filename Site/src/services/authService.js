
import { supabase } from '../lib/supabaseClient';

// Cadastro
export async function cadastrarUsuario(nome, email, senha) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: {
        nome: nome
      },
       emailRedirectTo: window.location.origin
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

// Login
export async function loginUsuario(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    throw error;
  }

  return data;
}

// Logout
export async function logoutUsuario() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

// Verificar usuário logado
export async function obterUsuario() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}
