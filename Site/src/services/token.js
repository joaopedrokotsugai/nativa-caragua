// Guarda o token de login (JWT ou similar) que o back-end devolve.
const KEY = "nativa:token";

export const getToken = () => localStorage.getItem(KEY);

export function setToken(token) {
  if (token) localStorage.setItem(KEY, token);
  else localStorage.removeItem(KEY);
}
