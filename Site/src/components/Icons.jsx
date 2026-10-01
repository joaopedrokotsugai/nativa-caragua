// Ícones SVG inline. Herdam a cor do texto (currentColor) e o tamanho vem de className.
function Svg({ children, className = "size-5", fill = "none", strokeWidth = 1.8, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      stroke={fill === "none" ? "currentColor" : "none"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- ícones de interface (traço) ---- */
export const SearchIcon = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>
);
export const ChevronDownIcon = (p) => (
  <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
);
export const ArrowRightIcon = (p) => (
  <Svg {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></Svg>
);
export const ArrowLeftIcon = (p) => (
  <Svg {...p}><path d="M19 12H5m6-6-6 6 6 6" /></Svg>
);
export const MenuIcon = (p) => (
  <Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>
);
export const CloseIcon = (p) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
export const CalendarIcon = (p) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>
);
export const PinIcon = (p) => (
  <Svg {...p}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Svg>
);
export const PeopleIcon = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 14.2c2.8 0 5 2.2 5 5" />
  </Svg>
);
export const UserIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></Svg>
);
export const MailIcon = (p) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>
);
export const LockIcon = (p) => (
  <Svg {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>
);
export const PencilIcon = (p) => (
  <Svg {...p}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></Svg>
);
export const CheckIcon = (p) => (
  <Svg {...p}><path d="m5 12 5 5 9-10" /></Svg>
);
export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Svg>
);
export const EyeIcon = (p) => (
  <Svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Svg>
);
export const LeafIcon = (p) => (
  <Svg {...p}><path d="M5 19C5 10 10 5 20 4c0 9-4 15-13 15Z" /><path d="M5 19 13 11" /></Svg>
);
export const InstagramIcon = (p) => (
  <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" /></Svg>
);
export const GoogleIcon = (p) => (
  <Svg {...p}><path d="M20.5 12.2H12M20.4 12.2A8.5 8.5 0 1 1 18 6" /></Svg>
);
export const WhatsappIcon = (p) => (
  <Svg {...p}>
    <path d="M4 20l1.3-4.2A8.5 8.5 0 1 1 8.3 18.8L4 20Z" />
    <path d="M9 9.5c.3 2.6 2.9 5.2 5.5 5.5l1.2-1.2-1.8-1-.8.8c-.8-.4-1.9-1.5-2.3-2.3l.8-.8-1-1.8L9 9.5Z" />
  </Svg>
);

/* ---- ícones ilustrativos (preenchidos), usados nos temas do projeto ---- */
export const TreeIcon = (p) => (
  <Svg fill="currentColor" viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="8" r="5.5" /><circle cx="7" cy="12" r="3.8" /><circle cx="17" cy="12" r="3.8" />
    <path d="M10.8 13h2.4v4.2l2.3 2.3V21h-7v-1.5l2.3-2.3V13Z" />
  </Svg>
);
export const BirdIcon = (p) => (
  <Svg fill="currentColor" viewBox="0 0 24 24" {...p}>
    <path d="M17.8 3.2c-1.6 0-2.8 1-3.1 2.6-.3 1.6-1.2 2.7-2.3 3.8-1.6 1.6-3.8 2.7-5 4.7-1 1.7-.9 3.7-.4 5.5l.3 1.2H8l-.2-1.3c1.3.5 3 .4 4.4-.4 2.1-1.2 3.5-3.4 4-5.6l.3-1.4 2.3-.8-1.7-1.1.3-1.1c.3-1 .2-2-.3-2.8L20.5 5l-1.1-.8c-.4-.7-.9-1-1.6-1Z" />
    <circle cx="17.6" cy="5.6" r=".7" fill="#fff" />
  </Svg>
);
export const DropIcon = (p) => (
  <Svg fill="currentColor" viewBox="0 0 24 24" {...p}>
    <path d="M12 2.5c3.5 4.4 6 7.7 6 11a6 6 0 0 1-12 0c0-3.3 2.5-6.6 6-11Z" />
  </Svg>
);

// Escolhe o ícone ilustrativo pelo "tipo" do dado.
const porTipo = { vegetacao: TreeIcon, biodiversidade: BirdIcon, hidricos: DropIcon };
export function TipoIcon({ tipo, ...props }) {
  const Icon = porTipo[tipo] ?? LeafIcon;
  return <Icon {...props} />;
}
