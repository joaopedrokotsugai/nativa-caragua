import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import CampaignCard from "../components/CampaignCard";
import { Carregando, ErroMensagem, ErroForm } from "../components/Feedback";
import { categorias } from "../data/campanhas";
import { api } from "../services/api";
import { useApi } from "../lib/useApi";
import { useAuth } from "../context/useAuth";
import { normalize } from "../lib/text";
import { usePageTitle } from "../lib/usePageTitle";

function Campanhas() {
  usePageTitle("Campanhas");
  const navigate = useNavigate();
  const { usuario, atualizar } = useAuth();
  const [params] = useSearchParams();
  const { data: campanhas, erro, carregando, recarregar } = useApi(api.listarCampanhas);

  // /campanhas?categoria=limpeza já abre filtrado
  const inicial = categorias.some((c) => c.id === params.get("categoria")) ? params.get("categoria") : "todas";
  const [categoria, setCategoria] = useState(inicial);
  const [busca, setBusca] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [erroAcao, setErroAcao] = useState("");

  // O filtro por categoria só aparece se a API enviar esse campo.
  const temCategorias = (campanhas ?? []).some((c) => c.categoria);
  const termo = normalize(busca.trim());
  const filtradas = (campanhas ?? []).filter(
    (c) =>
      (categoria === "todas" || c.categoria === categoria) &&
      normalize(`${c.titulo} ${c.local}`).includes(termo)
  );

  // Participar exige conta: sem login, leva para o login e volta para cá depois.
  async function alternarInscricao(id) {
    if (!usuario) {
      navigate("/login", { state: { from: "/campanhas" } });
      return;
    }
    setOcupado(true);
    setErroAcao("");
    try {
      if (usuario.participacoes.includes(id)) await api.cancelarParticipacao(id);
      else await api.participar(id);
      await Promise.all([atualizar(), recarregar()]);
    } catch (e) {
      setErroAcao(e.message);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <section className="bg-brand-bg py-12 sm:py-16">
      <Container>
        <h1 className="text-3xl font-bold text-brand-forest sm:text-4xl">Campanhas e ações ambientais</h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {temCategorias && (
            <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-3">
              {categorias.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={categoria === c.id}
                  onClick={() => setCategoria(c.id)}
                  className={`rounded-lg border px-5 py-2 text-sm font-bold transition-colors ${
                    categoria === c.id
                      ? "border-black bg-brand-green text-white"
                      : "border-neutral-400 bg-white text-brand-ink hover:border-brand-forest"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
          <SearchInput value={busca} onChange={setBusca} placeholder="Pesquisar campanhas" className="w-full max-w-56" />
        </div>

        {erroAcao && <div className="mt-4"><ErroForm>{erroAcao}</ErroForm></div>}

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            {carregando && <Carregando texto="Carregando campanhas…" />}
            {erro && <ErroMensagem erro={erro} onRetry={recarregar} />}

            {campanhas && filtradas.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {filtradas.map((c) => (
                  <CampaignCard
                    key={c.id}
                    campanha={c}
                    inscrito={Boolean(usuario?.participacoes.includes(c.id))}
                    ocupado={ocupado}
                    onToggle={alternarInscricao}
                  />
                ))}
              </div>
            )}

            {campanhas && filtradas.length === 0 && (
              <div className="py-8">
                <p className="text-neutral-700">
                  {campanhas.length === 0
                    ? "Ainda não há campanhas cadastradas."
                    : "Nenhuma campanha encontrada com esses filtros."}
                </p>
                {campanhas.length > 0 && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setCategoria("todas");
                      setBusca("");
                    }}
                  >
                    Limpar filtros
                  </Button>
                )}
              </div>
            )}
          </div>

          <aside className="rounded-xl bg-brand-dark p-6 text-white lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold leading-tight">Faça uma denúncia</h2>
            <p className="mt-4 text-lg leading-snug">Encontrou um problema ambiental?</p>
            <p className="mt-4 leading-snug">Sua denúncia pode ajudar a proteger nossa cidade.</p>
            <Button to="/denuncia" variant="green" className="mt-6 w-full">
              Faça sua denúncia
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default Campanhas;
