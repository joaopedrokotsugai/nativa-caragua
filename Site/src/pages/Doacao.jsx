import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import Field from "../components/Field";
import LoginRequired from "../components/LoginRequired";
import { Carregando, ErroMensagem, ErroForm } from "../components/Feedback";
import { ArrowRightIcon, CheckIcon, EyeIcon, ShieldIcon } from "../components/Icons";
import { api, MODO_DEMO } from "../services/api";
import { useApi } from "../lib/useApi";
import { useAuth } from "../context/useAuth";
import { formatBRL } from "../lib/text";
import { usePageTitle } from "../lib/usePageTitle";

const VALORES = [10, 25, 50, 100];
const VALOR_MINIMO = 5;

// "12,50" ou "12.50" -> 12.5 (ou NaN)
const lerValor = (texto) => Number.parseFloat(texto.replace(/\./g, "").replace(",", "."));

function Doacao() {
  usePageTitle("Doação");
  const [params] = useSearchParams();
  const { usuario, carregando: carregandoUsuario, atualizar } = useAuth();
  const { data: projetos, erro, carregando, recarregar } = useApi(api.listarProjetos);

  const [etapa, setEtapa] = useState(1); // 1 = escolher valor, 2 = confirmar, 3 = obrigado
  const [projetoId, setProjetoId] = useState(params.get("projeto") ?? "");
  const [preset, setPreset] = useState(50);
  const [outro, setOutro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");

  if (carregandoUsuario) return null;
  if (!usuario) {
    return (
      <LoginRequired
        titulo="Entre para fazer sua doação"
        texto="A doação fica registrada na sua conta, assim você acompanha o que já apoiou no seu perfil."
      />
    );
  }

  const projeto = projetos?.find((p) => p.id === projetoId);
  const valor = outro ? lerValor(outro) : preset;
  const valorValido = Number.isFinite(valor) && valor >= VALOR_MINIMO;
  const podeContinuar = Boolean(projeto) && valorValido;

  async function confirmar() {
    setEnviando(true);
    setErroEnvio("");
    try {
      await api.doar({ idProjeto: projeto.id, valor });
      await atualizar();
      setEtapa(3);
    } catch (e) {
      setErroEnvio(e.message);
    } finally {
      setEnviando(false);
    }
  }

  if (etapa === 3) {
    return (
      <section className="bg-brand-bg py-16 sm:py-24">
        <Container className="max-w-xl">
          <div className="rounded-3xl border border-neutral-300 bg-brand-paper p-8 text-center sm:p-12">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-green text-white">
              <CheckIcon className="size-7" />
            </span>
            <h1 className="mt-5 font-serif-heading text-3xl">Doação registrada!</h1>
            <p className="mt-4 leading-relaxed">
              Obrigado por apoiar <strong>{projeto.titulo}</strong> com {formatBRL(valor)}. Sua contribuição ajuda a levar o
              projeto ainda mais longe.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/projetos" variant="outline">Apoiar outro projeto</Button>
              <Button to="/campanhas">Ver campanhas</Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const painel = "rounded-2xl border border-neutral-300 bg-brand-paper p-6 sm:p-8";
  const titulo = "text-center text-xl font-bold text-brand-forest sm:text-2xl";

  return (
    <section className="bg-brand-bg py-12 sm:py-16">
      <Container>
        <div className="rounded-3xl border border-neutral-300 bg-brand-paper px-6 py-10 sm:px-14">
          <h1 className="font-serif-heading text-4xl sm:text-5xl">Faça sua doação!</h1>
          <p className="mt-6 text-lg">Sua contribuição pode fazer a diferença.</p>
          <p className="mt-3 max-w-3xl leading-relaxed">
            Cada doação, independentemente do valor, ajuda a tornar este projeto possível e a levar seus objetivos ainda mais
            longe. Se você acredita nessa iniciativa e quer fazer parte dela, sua contribuição será muito bem-vinda.
          </p>
        </div>

        {carregando && <Carregando texto="Carregando projetos…" />}
        {erro && <ErroMensagem erro={erro} onRetry={recarregar} />}

        {projetos && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Etapa 1 */}
            <section aria-labelledby="etapa-valor" className={`${painel} ${etapa !== 1 ? "opacity-60" : ""}`} inert={etapa !== 1}>
              <h2 id="etapa-valor" className={titulo}>Escolha o valor da sua contribuição</h2>

              <Field
                as="select"
                id="projeto"
                label="Projeto"
                className="mt-5"
                value={projetoId}
                onChange={(e) => setProjetoId(e.target.value)}
              >
                <option value="">Selecione um projeto</option>
                {projetos.map((p) => (
                  <option key={p.id} value={p.id}>{p.titulo}</option>
                ))}
              </Field>

              <div role="group" aria-label="Valores sugeridos" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {VALORES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={!outro && preset === v}
                    onClick={() => {
                      setPreset(v);
                      setOutro("");
                    }}
                    className={`rounded-xl border py-3 text-sm font-bold transition-colors ${
                      !outro && preset === v
                        ? "border-brand-deep bg-brand-deep text-white"
                        : "border-neutral-300 bg-white hover:border-brand-forest"
                    }`}
                  >
                    {formatBRL(v).replace(/\s/g, " ")}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label htmlFor="outro" className="sr-only">Outro valor</label>
                <div className="flex items-center rounded-xl border border-neutral-300 bg-white px-4">
                  <span className="text-sm text-neutral-600">R$</span>
                  <input
                    id="outro"
                    inputMode="decimal"
                    placeholder="ou digite outro valor…"
                    value={outro}
                    onChange={(e) => setOutro(e.target.value.replace(/[^\d.,]/g, ""))}
                    className="w-full bg-transparent px-3 py-3.5 text-sm placeholder:text-neutral-500"
                  />
                </div>
                <p className="mt-1.5 text-xs text-neutral-700">Valor mínimo: {formatBRL(VALOR_MINIMO)}</p>
              </div>

              <Button variant="deep" className="mt-5 w-full" disabled={!podeContinuar} onClick={() => setEtapa(2)}>
                Continuar <ArrowRightIcon className="size-4" />
              </Button>
            </section>

            {/* Etapa 2 */}
            <section aria-labelledby="etapa-confirmar" className={`${painel} ${etapa !== 2 ? "opacity-60" : ""}`} inert={etapa !== 2}>
              <h2 id="etapa-confirmar" className={titulo}>Confirme sua doação</h2>

              <dl className="mx-auto mt-5 max-w-sm rounded-xl border border-neutral-300 bg-neutral-100 p-4">
                <div className="flex justify-between gap-4">
                  <dt>Projeto escolhido:</dt>
                  <dd className="text-right">{projeto?.titulo ?? "—"}</dd>
                </div>
                <div className="mt-1 flex justify-between gap-4">
                  <dt>Valor escolhido:</dt>
                  <dd>{valorValido ? formatBRL(valor) : "—"}</dd>
                </div>
                <div className="mt-3 flex justify-between gap-4 border-t border-neutral-500 pt-3 text-lg font-bold text-brand-forest">
                  <dt>TOTAL:</dt>
                  <dd>{valorValido ? formatBRL(valor) : "—"}</dd>
                </div>
              </dl>

              <div className="mx-auto mt-5 max-w-sm space-y-3">
                <ErroForm>{erroEnvio}</ErroForm>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => setEtapa(1)} disabled={enviando}>Voltar</Button>
                  <Button variant="primary" onClick={confirmar} disabled={enviando}>
                    {enviando ? "Enviando…" : <>Confirmar <ArrowRightIcon className="size-4" /></>}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="mt-4 grid gap-4 text-sm font-bold text-brand-ink lg:grid-cols-2">
          <ul className="space-y-1 font-serif-heading">
            <li className="flex items-center gap-2"><ShieldIcon className="size-4" /> Doação segura</li>
            <li className="flex items-center gap-2"><EyeIcon className="size-4" /> Transparência</li>
          </ul>
          <p className="font-serif-heading text-brand-forest lg:text-center">
            Obrigado por apoiar e contribuir para essa causa!
          </p>
        </div>
        {MODO_DEMO && (
          <p className="mt-4 text-xs text-neutral-700">Modo demonstração: a doação é registrada só neste navegador.</p>
        )}
      </Container>
    </section>
  );
}

export default Doacao;
