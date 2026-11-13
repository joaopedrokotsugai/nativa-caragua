
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import {
  cadastrarUsuario,
  loginUsuario,
  logoutUsuario,
} from "../services/authService";
import { supabase } from "../lib/supabaseClient";

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const [carregandoAuth, setCarregandoAuth] = useState(true);
  const [carregandoPerfil, setCarregandoPerfil] = useState(false);
  const [erroPerfil, setErroPerfil] = useState("");

  // Busca os dados do perfil e seu histórico.
  const carregarDadosPerfil = useCallback(async (user) => {
    const { data: perfil, error: erroPerfil } = await supabase
      .from("usuarios")
      .select("id, nome, data_criacao")
      .eq("id", user.id)
      .single();

    if (erroPerfil) throw erroPerfil;

    // As consultas do histórico não bloqueiam o carregamento
    // das informações principais do perfil.
    async function buscarHistorico(consulta, descricao) {
      const { data, error } = await consulta;

      if (error) {
        console.error(`Erro ao buscar ${descricao}:`, error);
        return [];
      }

      return data ?? [];
    }

    const [participacoes, doacoes, denuncias] = await Promise.all([
      buscarHistorico(
        supabase
          .from("participacoes")
          .select("id_campanha, data_inscricao")
          .eq("id_usuario", user.id)
          .order("data_inscricao", { ascending: false }),
        "participações"
      ),

      buscarHistorico(
        supabase
          .from("doacoes")
          .select("id, id_projeto, valor, data")
          .eq("id_usuario", user.id)
          .order("data", { ascending: false }),
        "doações"
      ),

      buscarHistorico(
        supabase
          .from("denuncias")
          .select("id, titulo, descricao, local, imagem, data")
          .eq("id_usuario", user.id)
          .order("data", { ascending: false }),
        "denúncias"
      ),
    ]);

    const idsCampanhas = [
      ...new Set(participacoes.map((item) => item.id_campanha)),
    ];

    const idsProjetos = [
      ...new Set(doacoes.map((item) => item.id_projeto)),
    ];

    let campanhas = [];
    let projetos = [];

    if (idsCampanhas.length > 0) {
      campanhas = await buscarHistorico(
        supabase
          .from("campanhas")
          .select("id, titulo, data, local, imagem")
          .in("id", idsCampanhas),
        "campanhas"
      );
    }

    if (idsProjetos.length > 0) {
      projetos = await buscarHistorico(
        supabase
          .from("projetos")
          .select("id, titulo")
          .in("id", idsProjetos),
        "projetos"
      );
    }

    const campanhasMap = new Map(
      campanhas.map((item) => [item.id, item])
    );

    const projetosMap = new Map(
      projetos.map((item) => [item.id, item])
    );

    return {
      id: perfil.id,
      nome: perfil.nome,
      email: user.email,
      criadoEm: perfil.data_criacao,

      participacoes: participacoes.map((item) => ({
        ...item,
        campanha: campanhasMap.get(item.id_campanha) ?? null,
      })),

      doacoes: doacoes.map((item) => ({
        ...item,
        projeto: projetosMap.get(item.id_projeto) ?? null,
      })),

      denuncias,

      totalDoacoes: doacoes.length,
      totalDenuncias: denuncias.length,
    };
  }, []);

  // A autenticação não depende das consultas do perfil.
  useEffect(() => {
    let ativo = true;
    let eventoRecebido = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return;

      eventoRecebido = true;

      const user = session?.user ?? null;

      setAuthUser(user);

      if (!user) {
        setUsuario(null);
        setCarregandoPerfil(false);
        setErroPerfil("");
      } else {
        setUsuario((atual) =>
          atual?.id === user.id ? atual : null
        );
      }

      setCarregandoAuth(false);
    });

    async function verificarSessao() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        if (!ativo || eventoRecebido) return;

        setAuthUser(data.session?.user ?? null);
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);

        if (ativo && !eventoRecebido) {
          setAuthUser(null);
          setUsuario(null);
        }
      } finally {
        if (ativo) {
          setCarregandoAuth(false);
        }
      }
    }

    verificarSessao();

    return () => {
      ativo = false;
      subscription.unsubscribe();
    };
  }, []);

  // O perfil é carregado independentemente da autenticação.
  useEffect(() => {
    if (!authUser) {
      setUsuario(null);
      setCarregandoPerfil(false);
      return;
    }

    let ativo = true;

    async function carregarPerfil() {
      setCarregandoPerfil(true);
      setErroPerfil("");

      try {
        const dados = await carregarDadosPerfil(authUser);

        if (ativo) {
          setUsuario(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);

        if (ativo) {
          setUsuario(null);
          setErroPerfil("Não foi possível carregar os dados do perfil.");
        }
      } finally {
        if (ativo) {
          setCarregandoPerfil(false);
        }
      }
    }

    carregarPerfil();

    return () => {
      ativo = false;
    };
  }, [authUser?.id, carregarDadosPerfil]);

  // Atualiza os dados do perfil quando solicitado.
  const atualizar = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    if (!data.user) {
      setAuthUser(null);
      setUsuario(null);
      return;
    }

    setCarregandoPerfil(true);
    setErroPerfil("");

    try {
      const dados = await carregarDadosPerfil(data.user);
      setAuthUser(data.user);
      setUsuario(dados);
    } catch (error) {
      setErroPerfil("Não foi possível atualizar os dados do perfil.");
      throw error;
    } finally {
      setCarregandoPerfil(false);
    }
  }, [carregarDadosPerfil]);

  const valor = useMemo(
    () => ({
      authUser,
      usuario,

      carregando: carregandoAuth,
      carregandoAuth,
      carregandoPerfil,
      erroPerfil,

      atualizar,

      async entrar(dados) {
        return await loginUsuario(dados.email, dados.senha);
      },

      async cadastrar(dados) {
        const resultado = await cadastrarUsuario(
          dados.nome,
          dados.email,
          dados.senha
        );

        return {
          precisaConfirmarEmail: !resultado.session,
          usuario: resultado.user,
        };
      },

      async sair() {
        await logoutUsuario();
      },

      async excluirConta() {
        throw new Error(
          "A exclusão de conta ainda precisa ser implementada no servidor."
        );
      },
    }),
    [
      authUser,
      usuario,
      carregandoAuth,
      carregandoPerfil,
      erroPerfil,
      atualizar,
    ]
  );

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
