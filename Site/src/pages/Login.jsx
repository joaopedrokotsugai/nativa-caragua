import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ErroForm } from "../components/Feedback";
import {
  ArrowLeftIcon,
  GoogleIcon,
  InstagramIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  WhatsappIcon,
} from "../components/Icons";
import { useAuth } from "../context/useAuth";
import { usePageTitle } from "../lib/usePageTitle";

function IconInput({ icon: Icon, id, label, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-6 -translate-y-1/2 text-black" />
      <input
        id={id}
        name={id}
        aria-label={label}
        placeholder={label}
        className="w-full rounded-lg bg-neutral-300 py-3 pl-12 pr-4 text-sm text-brand-ink placeholder:text-neutral-700"
        {...props}
      />
    </div>
  );
}

const sociais = [
  { nome: "Instagram", icon: InstagramIcon },
  { nome: "Google", icon: GoogleIcon },
  { nome: "WhatsApp", icon: WhatsappIcon },
];

function Login() {
  const [modo, setModo] = useState("cadastro"); // "cadastro" | "login"
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { usuario, entrar, cadastrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from ?? "/perfil";
  const cadastro = modo === "cadastro";

  usePageTitle(cadastro ? "Criar conta" : "Entrar");

  // Quem já está logado não precisa ver esta tela.
  if (usuario && !enviando) return <Navigate to={destino} replace />;

  function trocarModo() {
    setModo(cadastro ? "login" : "cadastro");
    setErro("");
    setAviso("");
  }

  async function enviar(evento) {
    evento.preventDefault();
    const dados = Object.fromEntries(new FormData(evento.currentTarget));
    setEnviando(true);
    setErro("");
    try {
      if (cadastro) await cadastrar(dados);
      else await entrar(dados);
      navigate(destino, { replace: true });
    } catch (e) {
      setErro(e.message);
      setEnviando(false);
    }
  }

  return (
    <div className="px-4 py-8 sm:py-12">
      <Link to="/" className="mx-auto mb-4 flex w-full max-w-4xl items-center gap-2 text-sm font-semibold text-brand-forest hover:underline">
        <ArrowLeftIcon className="size-4" /> Voltar ao início
      </Link>

      <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:min-h-[34rem] md:flex-row">
        <div className="flex flex-col items-center justify-center bg-brand-dark px-8 py-10 text-center text-white md:w-2/5">
          <h2 className="font-serif-heading text-3xl leading-snug">
            {cadastro ? "Bem-vindo de volta!" : "Novo por aqui?"}
          </h2>
          <button
            type="button"
            onClick={trocarModo}
            className="mt-6 w-44 rounded-xl border-2 border-white bg-brand-forest py-3 text-sm font-bold hover:bg-brand-deep"
          >
            {cadastro ? "Login" : "Criar conta"}
          </button>
          <p className="mt-5 max-w-56 text-sm leading-relaxed text-white/85">
            {cadastro
              ? "É um prazer ter você novamente conosco. Seja muito bem-vindo ao nosso site!"
              : "Crie sua conta para doar, participar de campanhas e fazer denúncias."}
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-14">
          <h1 className="text-center font-serif-heading text-3xl text-brand-dark">
            {cadastro ? "Crie a sua conta" : "Entre na sua conta"}
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-600">
            {cadastro ? "Não tem uma conta?" : "Use seu e-mail e senha"}
          </p>

          <div className="mt-5 flex justify-center gap-5">
            {sociais.map(({ nome, icon: Icon }) => (
              <button
                key={nome}
                type="button"
                aria-label={`Continuar com ${nome}`}
                onClick={() => setAviso("Entrar com redes sociais estará disponível em breve.")}
                className="flex size-10 items-center justify-center rounded-full bg-black text-white hover:bg-neutral-700"
              >
                <Icon className="size-5" />
              </button>
            ))}
          </div>
          {aviso && <p role="status" className="mt-3 text-center text-xs text-neutral-700">{aviso}</p>}

          {/* key força o formulário a limpar quando troca entre cadastro e login */}
          <form key={modo} onSubmit={enviar} className="mx-auto mt-6 w-full max-w-sm space-y-4">
            {cadastro && <IconInput icon={UserIcon} id="nome" label="Nome" required maxLength={100} autoComplete="name" />}
            <IconInput icon={MailIcon} id="email" type="email" label="Email" required maxLength={150} autoComplete="email" />
            <IconInput
              icon={LockIcon}
              id="senha"
              type="password"
              label="Senha"
              required
              minLength={6}
              autoComplete={cadastro ? "new-password" : "current-password"}
            />
            <ErroForm>{erro}</ErroForm>
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-lg bg-brand-deep py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-50"
            >
              {enviando ? "Aguarde…" : cadastro ? "Criar conta" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
