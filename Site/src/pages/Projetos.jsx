import { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import ProjectCard from "../components/ProjectCard";
import { Carregando, ErroMensagem } from "../components/Feedback";
import { api } from "../services/api";
import { useApi } from "../lib/useApi";
import { normalize } from "../lib/text";
import { usePageTitle } from "../lib/usePageTitle";

function Projetos() {
  usePageTitle("Projetos");
  const [busca, setBusca] = useState("");
  const { data: projetos, erro, carregando, recarregar } = useApi(api.listarProjetos);

  const termo = normalize(busca.trim());
  const filtrados = (projetos ?? []).filter((p) => normalize(`${p.titulo} ${p.descricao}`).includes(termo));

  return (
    <section className="bg-brand-bg py-12 sm:py-16">
      <Container>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-forest sm:text-3xl">
            <span className="font-normal">1.</span> Escolha um projeto para colaborar
          </h1>
          <SearchInput
            value={busca}
            onChange={setBusca}
            placeholder="Pesquisar projetos"
            className="mx-auto mt-5 w-full max-w-xs"
          />
        </div>

        {carregando && <Carregando texto="Carregando projetos…" />}
        {erro && <ErroMensagem erro={erro} onRetry={recarregar} />}

        {projetos && filtrados.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtrados.map((projeto) => (
              <ProjectCard key={projeto.id} projeto={projeto} />
            ))}
          </div>
        )}

        {projetos && filtrados.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-neutral-700">
              {busca ? `Nenhum projeto encontrado para “${busca}”.` : "Ainda não há projetos cadastrados."}
            </p>
            {busca && (
              <Button variant="outline" className="mt-4" onClick={() => setBusca("")}>
                Limpar busca
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Projetos;
