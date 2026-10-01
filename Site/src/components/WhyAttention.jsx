import { Link } from "react-router-dom";
import Container from "./Container";
import { TipoIcon } from "./Icons";
import { problemas } from "../data/problemas";

function WhyAttention() {
  return (
    <section className="bg-brand-forest py-14 text-white sm:py-16" aria-labelledby="porque-atencao">
      <Container>
        <h2 id="porque-atencao" className="text-center font-serif-heading text-2xl sm:text-3xl">
          Porque esse projeto precisa de atenção?
        </h2>

        <div className="mt-12 space-y-10">
          {problemas.map((p, i) => (
            <article
              key={p.id}
              // Os cards se alternam: esquerda, direita, esquerda...
              className={`flex flex-col items-start gap-6 md:items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-44 shrink-0">
                <TipoIcon tipo={p.tipo} className="size-14" />
                <div className="mt-2 border-t border-white/90 pt-2">
                  <h3 className="text-lg font-medium leading-tight">{p.titulo}</h3>
                  <Link to={`/problemas#${p.id}`} className="text-xs underline underline-offset-2">
                    saiba mais
                  </Link>
                </div>
              </div>

              {/* Retângulo cinza atrás do card dá o efeito de camada */}
              <div className="relative w-full max-w-xl">
                <div aria-hidden="true" className="absolute -left-2 -top-3 h-full w-full rounded-3xl bg-neutral-300/90" />
                <p className="relative rounded-3xl bg-brand-mist px-7 py-6 leading-relaxed text-brand-ink">
                  {p.resumo}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyAttention;
