import Container from "../components/Container";
import Button from "../components/Button";
import { TipoIcon, ArrowRightIcon } from "../components/Icons";
import { problemas } from "../data/problemas";
import { usePageTitle } from "../lib/usePageTitle";

function Problemas() {
  usePageTitle("O problema");
  return (
    <>
      <section className="bg-brand-bg py-14 sm:py-16">
        <Container>
          <h1 className="max-w-3xl font-serif-heading text-3xl leading-tight sm:text-5xl">
            O que está em jogo no litoral de Caraguatatuba
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Entre a Serra do Mar e o oceano, tudo está ligado: a mata segura o solo, protege os animais e cuida da água
            que chega aos rios e às praias. Veja como cada parte é afetada.
          </p>
        </Container>
      </section>

      {problemas.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-titulo`}
          // scroll-mt deixa espaço para o header fixo quando chegamos por âncora (#vegetacao)
          className={`scroll-mt-16 py-14 sm:py-16 ${i % 2 === 0 ? "bg-brand-forest text-white" : "bg-brand-bg"}`}
        >
          <Container className="grid items-start gap-8 md:grid-cols-[auto_1fr] md:gap-14">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <TipoIcon tipo={p.tipo} className="size-16 md:size-24" />
            </div>

            <div className="max-w-2xl">
              <h2 id={`${p.id}-titulo`} className="font-serif-heading text-2xl sm:text-3xl">
                {p.titulo}
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{p.detalhes}</p>

              <h3 className="mt-8 font-bold">O que pode acontecer</h3>
              <ul className="mt-3 space-y-2">
                {p.consequencias.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-current" />
                    {c}
                  </li>
                ))}
              </ul>

              <Button to={p.acao.to} variant={i % 2 === 0 ? "leaf" : "primary"} className="mt-8">
                {p.acao.texto} <ArrowRightIcon className="size-4" />
              </Button>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}

export default Problemas;
