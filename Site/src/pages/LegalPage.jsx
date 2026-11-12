
import { useState } from "react";
import Container from "../components/Container";
import { usePageTitle } from "../lib/usePageTitle";

function LegalPage({ titulo, secoes }) {
  usePageTitle(titulo);

  const [secaoAtiva, setSecaoAtiva] = useState(null);

  return (
    <section className="min-h-screen bg-brand-bg py-12 sm:py-16">
      <Container className="max-w-5xl">
        {/* Cabeçalho */}


          <h1 className="mt-4 max-w-3xl font-sans-body text-3xl font-bold sm:text-5xl">
            {titulo}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed  sm:text-base">
            Este documento apresenta as diretrizes e condições relacionadas
            à utilização da plataforma Nativa Caraguá
          </p>

          <div className="mt-8 h-1 w-20 rounded-full bg-brand-forest" />


        {/* Conteúdo */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Índice */}
          <aside className="h-fit  bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="font-serif-heading text-xl font-bold text-brand-forest">
              Neste documento
            </h2>

            <nav className="mt-4" aria-label="Índice do documento">
              <ul className="space-y-1">
                {secoes.map((secao, index) => (
                  <li key={secao.titulo}>
                    <button
                      type="button"
                      onClick={() => {
                        setSecaoAtiva(index);
                        document
                          .getElementById(`secao-legal-${index}`)
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        secaoAtiva === index
                          ? "bg-brand-dark font-semibold text-white"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-brand-forest"
                      }`}
                    >
                      {secao.titulo}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Texto jurídico */}
          <main className="min-w-0 space-y-4">
            {secoes.map((secao, index) => (
              <section
                key={secao.titulo}
                id={`secao-legal-${index}`}
                className="scroll-mt-8 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
              >
                <div className="flex items-start gap-4">


                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif-heading text-xl font-bold text-brand-forest sm:text-2xl">
                      {secao.titulo}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-neutral-700 sm:text-base">
                      {secao.texto}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>

        {/* Rodapé */}
        <footer className="mt-10 border-t border-neutral-300 pt-6 text-center">
          <p className="text-sm text-neutral-600">
            Nativa Caraguá — Conscientização ambiental para Caraguatatuba.
          </p>
        </footer>
      </Container>
    </section>
  );
}

export default LegalPage;
