import Container from "./Container";
import Button from "./Button";
import { ArrowRightIcon } from "./Icons";



function Hero() {
  return (
    <section className="bg-brand-bg">
      <Container className="grid items-center  py-14 sm:py-30 lg:grid-cols-[1.2fr_0.9fr]">
        <div>
          <h1 className="font-serif-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Preservar hoje para garantir um amanhã melhor
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed">
            Conscientizar hoje para garantir um amanhã mais sustentável para todos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/denuncia" variant="primary" className="min-w-52 justify-between">
              Reportar um lugar <ArrowRightIcon className="size-5" />
            </Button>
            <Button to="/campanhas" variant="gray">
              Visualizar campanhas
            </Button>
            <Button to="/projetos" variant="gray" className="bg-neutral-500! hover:bg-neutral-700!">
              Participe de um projeto
            </Button>
          </div>
        </div>

      </Container>
    </section>
  );
}

export default Hero;
