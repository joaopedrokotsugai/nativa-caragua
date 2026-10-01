import { useId } from "react";
import { Link } from "react-router-dom";

function Mark({ className }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`${id}c`}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b5e000" /><stop offset="1" stopColor="#5fb04a" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect width="64" height="64" fill={`url(#${id}g)`} />
        <path d="M4 44 24 20l10 13 8-8 20 19v20H4Z" fill="#2e7d4f" />
        <path d="M0 44q10-7 20 0t20 0 24 0v20H0Z" fill="#17a2c4" />
        <path d="M0 53q10-7 20 0t20 0 24 0v11H0Z" fill="#0e7fa3" />
      </g>
    </svg>
  );
}

// variant="inline": ícone + nome lado a lado (header). variant="stacked": nome embaixo (footer).
function Logo({ variant = "inline", to = "/", className = "" }) {
  const stacked = variant === "stacked";
  return (
    <Link
      to={to}
      aria-label="Nativa Caragua — página inicial"
      className={`inline-flex items-center ${stacked ? "flex-col gap-2" : "gap-3"} ${className}`}
    >
      <Mark className={stacked ? "size-16" : "size-10"} />
      <span className={`font-medium ${stacked ? "text-2xl" : "text-sm"}`}>
        <span className="text-brand-deep">Nativa </span>
        <span className="text-green-600">Caragua</span>
      </span>
    </Link>
  );
}

export default Logo;
