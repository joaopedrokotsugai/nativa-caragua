import Container from "../components/Container";
import Button from "../components/Button";
import { MailIcon, PinIcon } from "../components/Icons";
import { usePageTitle } from "../lib/usePageTitle";

const EMAIL = "contato@nativacaragua.org.br";

function Contato() {
  usePageTitle("Contato");
  return (
    <section className="bg-brand-bg py-14 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-serif-heading text-3xl leading-tight sm:text-5xl">Fale com a equipe da Nativa Caraguá</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Dúvidas, sugestões de campanha ou propostas de parceria? Escreva para a gente e respondemos assim que possível.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <MailIcon className="size-6 text-brand-forest" />
              <a href={`mailto:${EMAIL}`} className="font-semibold underline-offset-4 hover:underline">{EMAIL}</a>
            </li>
            <li className="flex items-center gap-3">
              <PinIcon className="size-6 text-brand-forest" />
              <span className="font-semibold">Caraguatatuba, SP</span>
            </li>
          </ul>

          <Button href={`mailto:${EMAIL}`} variant="deep" className="mt-8">
            Enviar um e-mail
          </Button>
        </div>

        <aside className="self-start rounded-2xl bg-brand-forest p-8 text-white">
          <h2 className="text-xl font-bold">Quer relatar um problema?</h2>
          <p className="mt-3 leading-relaxed">
            Para lixo, desmatamento ou animais em risco, use o formulário de denúncia. Assim a informação chega com local e
            descrição, e fica registrada.
          </p>
          <Button to="/denuncia" variant="leaf" className="mt-6">Fazer uma denúncia</Button>
        </aside>
      </Container>
    </section>
  );
}

export default Contato;
