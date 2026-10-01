import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { MailIcon, PinIcon } from "./Icons";

const links = [
  { label: "Início", to: "/" },
  { label: "Problema", to: "/problemas" },
  { label: "Campanhas", to: "/campanhas" },
  { label: "Projetos", to: "/projetos" },
  { label: "Contato", to: "/contato" },
];

const legal = [
  { label: "Termos e condições", to: "/termos" },
  { label: "Política de privacidade", to: "/privacidade" },
];

const linkClass = "text-sm tracking-wide underline-offset-4 hover:underline";

function Footer() {
  return (
    <footer className="bg-brand-bg">
      <Container className="pt-16 text-center">
        <h2 className="font-serif-heading text-2xl font-bold sm:text-3xl">Obrigado por usar o nosso site!</h2>
        <p className="mx-auto mt-4 max-w-md font-serif-heading text-sm font-bold leading-relaxed">
          Esperamos que nossa plataforma tenha sido útil. Sua participação e apoio fazem a diferença.
        </p>
        <div className="mt-10 flex justify-center">
          <Logo variant="stacked" />
        </div>
      </Container>

      <Container className="mt-10">
        <div className="grid gap-10 border-t border-brand-ink/70 py-10 text-center sm:grid-cols-3">
          <nav aria-label="Links rápidos">
            <h3 className="mb-3 text-sm font-bold tracking-widest">Links rápidos</h3>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços e informações legais">
            <h3 className="mb-3 text-sm font-bold tracking-widest">Serviços</h3>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/denuncia" className={linkClass}>Fazer uma denúncia</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-3 text-sm font-bold tracking-widest">Contato</h3>
            <ul className="space-y-3 text-sm tracking-wide">
              <li className="flex items-center justify-center gap-2">
                <MailIcon className="size-4" />
                <a href="mailto:contato@nativacaragua.org.br" className="underline-offset-4 hover:underline">
                  contato@nativacaragua.org.br
                </a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <PinIcon className="size-4" /> Caraguatatuba, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-brand-ink/70 py-6 text-xs text-neutral-700 sm:flex-row">
          <p>© {new Date().getFullYear()} Nativa Caraguá — todos os direitos reservados</p>
          <ul className="flex gap-6">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
