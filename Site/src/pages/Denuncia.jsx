import { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import Field from "../components/Field";
import LoginRequired from "../components/LoginRequired";
import { ErroForm } from "../components/Feedback";
import { CheckIcon } from "../components/Icons";
import { api } from "../services/api";
import { useAuth } from "../context/useAuth";
import { usePageTitle } from "../lib/usePageTitle";

const TAMANHO_MAX_MB = 5;

function Denuncia() {
  usePageTitle("Fazer uma denúncia");
  const { usuario, carregando, atualizar } = useAuth();
  const [enviando, setEnviando] = useState(false);
  const [enviada, setEnviada] = useState(false);
  const [erro, setErro] = useState("");

  if (carregando) return null;
  if (!usuario) {
    return (
      <LoginRequired
        titulo="Entre para fazer uma denúncia"
        texto="Pedimos a conta para a equipe conseguir acompanhar cada denúncia e falar com você se precisar de mais detalhes."
      />
    );
  }

  async function enviar(evento) {
    evento.preventDefault();
    const form = new FormData(evento.currentTarget);
    const imagem = form.get("imagem");

    if (imagem?.size > TAMANHO_MAX_MB * 1024 * 1024) {
      setErro(`A foto precisa ter até ${TAMANHO_MAX_MB} MB.`);
      return;
    }

    setEnviando(true);
    setErro("");
    try {
      await api.denunciar({
        titulo: form.get("titulo"),
        local: form.get("local"),
        descricao: form.get("descricao"),
        imagem: imagem?.size ? imagem : null,
      });
      await atualizar();
      setEnviada(true);
    } catch (e) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  if (enviada) {
    return (
      <section className="bg-brand-bg py-16 sm:py-24">
        <Container className="max-w-xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-green text-white">
            <CheckIcon className="size-7" />
          </span>
          <h1 className="mt-5 font-serif-heading text-3xl">Denúncia enviada</h1>
          <p className="mt-4 leading-relaxed">
            Obrigado por ajudar a proteger Caraguatatuba. Recebemos as informações e vamos analisar o caso.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => setEnviada(false)}>Fazer outra denúncia</Button>
            <Button to="/campanhas">Ver campanhas</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-brand-bg py-12 sm:py-16">
      <Container className="max-w-2xl">
        <h1 className="font-serif-heading text-3xl sm:text-4xl">Faça sua denúncia</h1>
        <p className="mt-4 leading-relaxed">
          Encontrou um problema ambiental? Conte o que viu e onde. Quanto mais detalhes, mais fácil de resolver.
        </p>

        <form onSubmit={enviar} className="mt-8 space-y-5 rounded-2xl border border-neutral-300 bg-brand-paper p-6 sm:p-8">
          <Field id="titulo" label="O que aconteceu?" placeholder="Ex.: Lixo acumulado na margem do rio" required maxLength={150} />
          <Field id="local" label="Onde fica?" placeholder="Ex.: Praia do Indaiá, perto do quiosque 3" required maxLength={200} />
          <Field
            as="textarea"
            id="descricao"
            label="Descreva o problema"
            placeholder="Há quanto tempo está assim, o tamanho da área, se há risco para pessoas ou animais…"
            required
          />
          <div>
            <label htmlFor="imagem" className="mb-1.5 block text-sm font-semibold text-brand-forest">
              Foto (opcional)
            </label>
            <input
              id="imagem"
              name="imagem"
              type="file"
              accept="image/*"
              className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-brand-forest file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-dark"
            />
            <p className="mt-1.5 text-xs text-neutral-700">JPG ou PNG, até {TAMANHO_MAX_MB} MB.</p>
          </div>

          <ErroForm>{erro}</ErroForm>
          <Button type="submit" variant="deep" className="w-full" disabled={enviando}>
            {enviando ? "Enviando…" : "Enviar denúncia"}
          </Button>
        </form>
      </Container>
    </section>
  );
}

export default Denuncia;
