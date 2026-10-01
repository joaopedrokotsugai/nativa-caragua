import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, UserIcon } from "./Icons";
import { problemas } from "../data/problemas";
import { useAuth } from "../context/useAuth";

const menu = [
  { label: "Início", to: "/", end: true },
  {
    label: "Problema",
    to: "/problemas",
    children: problemas.map((p) => ({ label: p.titulo, to: `/problemas#${p.id}` })),
  },
  {
    label: "Campanhas",
    to: "/campanhas",
    children: [
      { label: "Todas as campanhas", to: "/campanhas" },
      { label: "Projetos para apoiar", to: "/projetos" },
    ],
  },
  {
    label: "Contato",
    to: "/contato",
    children: [
      { label: "Fale conosco", to: "/contato" },
      { label: "Fazer uma denúncia", to: "/denuncia" },
    ],
  },
];

const linkClass = ({ isActive }) =>
  `inline-block border-b-2 py-1 text-sm font-semibold transition-colors ${
    isActive ? "border-brand-deep text-brand-deep" : "border-transparent text-brand-forest hover:text-brand-deep"
  }`;

function Header() {
  const [open, setOpen] = useState(false);
  const { usuario: user } = useAuth();
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-brand-bg/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-3 max-w-none!">
        <Logo />

        {/* Menu de computador */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {menu.map((item) => (
              <li key={item.label} className="group relative">
                <div className="flex items-center gap-1">
                  <NavLink to={item.to} end={item.end} className={linkClass}>
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <ChevronDownIcon className="size-4 text-neutral-500 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                </div>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full min-w-56 translate-y-1 rounded-xl border border-black/10 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          className="block rounded-lg px-3 py-2 text-sm text-brand-ink hover:bg-brand-bg"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Ações */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/doacao" variant="outline" className="rounded-full px-4! py-2!">
            Doe aqui <ArrowRightIcon className="size-4" />
          </Button>
          {user ? (
            <Button to="/perfil" variant="deep" className="py-2!">
              <UserIcon className="size-4" /> {user.nome.split(" ")[0]}
            </Button>
          ) : (
            <Button to="/login" variant="deep" className="py-2!">
              Login
            </Button>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-brand-forest lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </Container>

      {/* Menu de celular */}
      {open && (
        <nav id="menu-mobile" aria-label="Principal" className="border-t border-black/5 bg-brand-bg lg:hidden">
          <Container className="py-4">
            <ul className="space-y-1">
              {menu.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} end={item.end} onClick={close} className="block rounded-lg px-3 py-2 font-semibold text-brand-forest">
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <ul className="ml-4 border-l border-brand-forest/20 pl-3">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link to={child.to} onClick={close} className="block px-3 py-1.5 text-sm text-brand-ink">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <Button to="/doacao" variant="outline" className="flex-1" onClick={close}>
                Doe aqui
              </Button>
              <Button to={user ? "/perfil" : "/login"} variant="deep" className="flex-1" onClick={close}>
                {user ? "Meu perfil" : "Login"}
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}

export default Header;
