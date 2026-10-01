import Container from "../components/Container";
import Button from "../components/Button";
import { usePageTitle } from "../lib/usePageTitle";

function NotFound() {
  usePageTitle("Página não encontrada");
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-bg text-center">
      <Container>
        <h1 className="mb-4 font-serif-heading text-3xl sm:text-5xl">404</h1>
        <p className="mb-6 text-neutral-700">Essa página não existe ou foi movida.</p>
        <Button to="/" variant="primary">Voltar para o início</Button>
      </Container>
    </section>
  );
}

export default NotFound;
