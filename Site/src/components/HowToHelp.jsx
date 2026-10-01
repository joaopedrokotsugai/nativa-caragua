import { Link } from "react-router-dom";
import Container from "./Container";
import { ArrowRightIcon } from "./Icons";

// Aqui a numeração faz sentido: é uma sequência de passos.
const passos = [
  {
    titulo: "Reporte um lugar",
    texto: "Viu lixo, desmatamento ou animais em risco? Conte onde e o que aconteceu.",
    to: "/denuncia",
    cta: "Fazer uma denúncia",
  },
  {
    titulo: "Participe de uma campanha",
    texto: "Mutirões de limpeza, plantios e oficinas abertos para quem quiser ajudar.",
    to: "/campanhas",
    cta: "Ver campanhas",
  },
  {
    titulo: "Apoie um projeto",
    texto: "Escolha um projeto e contribua com o valor que puder. Toda ajuda conta.",
    to: "/projetos",
    cta: "Escolher um projeto",
  },
];

function HowToHelp() {
  return (
    <section className="bg-brand-bg py-14 sm:py-20" aria-labelledby="como-ajudar">
      <Container>
        <h2 id="como-ajudar" className="font-serif-heading text-2xl sm:text-3xl">
          Como você pode ajudar
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {passos.map((p, i) => (
            <li key={p.to} className="flex flex-col rounded-2xl border border-black/10 bg-brand-paper p-6">
              <span className="font-serif-heading text-4xl text-brand-forest">{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold text-brand-forest">{p.titulo}</h3>
              <p className="mt-2 flex-1 leading-relaxed">{p.texto}</p>
              <Link
                to={p.to}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep underline-offset-4 hover:underline"
              >
                {p.cta} <ArrowRightIcon className="size-4" />
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default HowToHelp;
