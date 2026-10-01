import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { ErroForm } from "../components/Feedback";
import { DropIcon, LeafIcon, MailIcon, TreeIcon, UserIcon } from "../components/Icons";
import { useAuth } from "../context/useAuth";
import { formatData } from "../lib/text";
import { usePageTitle } from "../lib/usePageTitle";

function Estatistica({ icon: Icon, valor, label }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-forest text-white">
        <Icon className="size-6" />
      </span>
      <div className="flex flex-1 items-center justify-between rounded-full bg-neutral-200 px-5 py-3">
        <span className="text-sm font-semibold">{label}</span>
        <span className="font-serif-heading text-lg font-bold text-brand-forest">{valor}</span>
      </div>
    </li>
  );
}

function Perfil() {
  usePageTitle("Meu perfil");
  const { usuario, carregando, sair, excluirConta } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [saindo, setSaindo] = useState(false); // evita redirecionar para /login quando a pessoa mesma saiu

  if (carregando) return null;
  if (!usuario && !saindo) return <Navigate to="/login" replace state={{ from: "/perfil" }} />;

  function aoSair() {
    setSaindo(true);
    sair();
    navigate("/");
  }

  async function aoExcluir() {
    if (!window.confirm("Excluir sua conta? Essa ação não pode ser desfeita.")) return;
    try {
      setSaindo(true);
      await excluirConta();
      navigate("/");
    } catch (e) {
      setSaindo(false);
      setErro(e.message);
    }
  }

  if (!usuario) return null; // saindo: a navegação para o início já está em andamento

  const itemMenu = "block w-full rounded-lg px-4 py-2 text-left font-serif-heading hover:bg-white/10";

  return (
    <div className="px-4 py-8 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:min-h-[36rem] md:flex-row">
        <aside className="bg-brand-dark px-6 py-8 text-white md:w-56 md:shrink-0">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full border-2 border-white">
            <UserIcon className="size-14" />
          </div>
          <nav aria-label="Conta" className="mt-8">
            <ul className="space-y-1">
              <li><Link to="/" className={itemMenu}>Início</Link></li>
              <li><Link to="/contato" className={itemMenu}>Contato</Link></li>
              <li><button type="button" onClick={aoSair} className={itemMenu}>Logout</button></li>
              <li><button type="button" onClick={aoExcluir} className={itemMenu}>Excluir conta</button></li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-5 sm:p-8">
          <Logo className="font-serif-heading" />

          <section
            aria-label="Resumo da conta"
            className="mt-4 flex flex-wrap items-center gap-6 rounded-2xl bg-neutral-100 p-5"
          >
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-forest text-brand-forest">
              <UserIcon className="size-9" />
            </span>
            <h1 className="min-w-0 flex-1 break-words font-serif-heading text-3xl text-brand-ink sm:text-4xl">{usuario.nome}</h1>
            <div className="border-l-2 border-brand-ink pl-6">
              <p className="text-xs font-bold">data de criação da conta</p>
              <p className="mt-1 font-serif-heading text-2xl font-bold">{formatData(usuario.criadoEm)}</p>
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section aria-labelledby="detalhes" className="rounded-2xl bg-neutral-100 p-6">
              <h2 id="detalhes" className="border-b-2 border-brand-forest pb-2 font-serif-heading text-2xl text-brand-forest">
                Detalhes do usuário
              </h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-xs font-bold text-neutral-700">Nome</dt>
                  <dd className="font-serif-heading text-lg">{usuario.nome}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-neutral-700">E-mail</dt>
                  <dd className="flex items-center gap-2 break-all font-serif-heading">
                    <MailIcon className="size-4 shrink-0 text-brand-forest" /> {usuario.email}
                  </dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="estatisticas" className="rounded-2xl bg-neutral-100 p-6">
              <h2 id="estatisticas" className="border-b-2 border-brand-forest pb-2 font-serif-heading text-2xl text-brand-forest">
                Estatísticas
              </h2>
              <ul className="mt-5 space-y-3">
                <Estatistica icon={LeafIcon} valor={usuario.participacoes.length} label="Campanhas em que participa" />
                <Estatistica icon={TreeIcon} valor={usuario.totalDenuncias} label="Denúncias feitas" />
                <Estatistica icon={DropIcon} valor={usuario.totalDoacoes} label="Doações realizadas" />
              </ul>
            </section>
          </div>

          <div className="mt-4"><ErroForm>{erro}</ErroForm></div>
        </main>
      </div>
    </div>
  );
}

export default Perfil;
