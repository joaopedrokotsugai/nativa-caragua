import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-brand-forest text-white hover:bg-brand-dark",
  deep: "bg-brand-deep text-white hover:bg-brand-dark",
  gray: "bg-neutral-600 text-white hover:bg-neutral-700",
  outline: "border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white",
  leaf: "bg-brand-leaf text-brand-ink hover:bg-green-500",
  green: "bg-brand-green text-white hover:bg-green-700",
  danger: "border border-red-700 text-red-700 hover:bg-red-700 hover:text-white",
};

// "to" = link interno (<Link>); "href" = link externo/mailto (<a>); sem nenhum dos dois vira <button>.
function Button({ to, href, variant = "primary", className = "", children, type = "button", ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
