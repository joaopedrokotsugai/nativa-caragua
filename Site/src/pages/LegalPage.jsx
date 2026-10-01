import Container from "../components/Container";
import { usePageTitle } from "../lib/usePageTitle";

// Modelo para páginas de texto (termos, privacidade). "secoes" = [{ titulo, texto }]
function LegalPage({ titulo, secoes }) {
  usePageTitle(titulo);
  return (
    <section className="bg-brand-bg py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif-heading text-3xl sm:text-4xl">{titulo}</h1>
        <p className="mt-3 text-sm text-neutral-700">
          Texto provisório. Substitua pelo conteúdo oficial antes de publicar o site.
        </p>
        <div className="mt-8 space-y-8">
          {secoes.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-lg font-bold text-brand-forest">{s.titulo}</h2>
              <p className="mt-2 leading-relaxed">{s.texto}</p>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default LegalPage;
