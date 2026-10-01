import { useLocation } from "react-router-dom";
import Container from "./Container";
import Button from "./Button";
import { LockIcon } from "./Icons";

// Aparece no lugar de telas que só funcionam com conta (doação e denúncia ficam ligadas ao usuário no banco).
function LoginRequired({ titulo, texto }) {
  const location = useLocation();
  return (
    <section className="bg-brand-bg py-20">
      <Container className="max-w-xl text-center">
        <LockIcon className="mx-auto size-10 text-brand-forest" />
        <h1 className="mt-4 font-serif-heading text-2xl sm:text-3xl">{titulo}</h1>
        <p className="mt-4 leading-relaxed">{texto}</p>
        <Button to="/login" state={{ from: location.pathname + location.search }} className="mt-6">
          Entrar ou criar conta
        </Button>
      </Container>
    </section>
  );
}

export default LoginRequired;
