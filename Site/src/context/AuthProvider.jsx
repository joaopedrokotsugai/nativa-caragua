import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { api } from "../services/api";
import { getToken, setToken } from "../services/token";

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(() => Boolean(getToken()));

  // Busca os dados de quem está logado (nome, participações, totais...).
  const atualizar = useCallback(async () => {
    if (!getToken()) {
      setUsuario(null);
      return;
    }
    try {
      setUsuario(await api.perfil());
    } catch {
      setToken(null); // token inválido ou expirado
      setUsuario(null);
    }
  }, []);

  // Ao abrir o site, se já havia login salvo, recupera o usuário.
  useEffect(() => {
    if (!getToken()) return;
    let ativo = true;
    api
      .perfil()
      .then((dados) => ativo && setUsuario(dados))
      .catch(() => setToken(null))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  const valor = useMemo(
    () => ({
      usuario,
      carregando,
      atualizar,
      async entrar(dados) {
        const { token } = await api.entrar(dados);
        setToken(token);
        await atualizar();
      },
      async cadastrar(dados) {
        const { token } = await api.cadastrar(dados);
        setToken(token);
        await atualizar();
      },
      sair() {
        setToken(null);
        setUsuario(null);
      },
      async excluirConta() {
        await api.excluirConta();
        setToken(null);
        setUsuario(null);
      },
    }),
    [usuario, carregando, atualizar]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
