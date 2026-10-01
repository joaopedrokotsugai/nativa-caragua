import Container from "./Container";
import Button from "./Button";
import { ArrowRightIcon } from "./Icons";

// Paisagem decorativa: serra, sol e mar, nas cores do projeto.
function Paisagem() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" aria-hidden="true">
      <circle cx="350" cy="90" r="46" fill="#b5e000" opacity=".85" />
      <path d="M0 250 120 130l70 70 60-50 130 110v50H0Z" fill="#a9bba7" />
      <path d="M60 270 200 120l80 90 50-40 150 120v20H60Z" fill="#6f8f6d" />
      <path d="M0 290 150 190l90 80 70-50 170 110v30H0Z" fill="#3a5a3b" />
      <path d="M0 300q60-24 120 0t120 0 120 0 120 0v60H0Z" fill="#17a2c4" opacity=".9" />
      <path d="M0 326q60-24 120 0t120 0 120 0 120 0v34H0Z" fill="#0e7fa3" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="bg-brand-bg">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
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

        <div className="hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
          <Paisagem />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
