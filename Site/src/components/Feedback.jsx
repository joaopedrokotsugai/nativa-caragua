import Button from "./Button";

export function Carregando({ texto = "Carregando…" }) {
  return (
    <p role="status" className="py-12 text-center text-neutral-700">
      {texto}
    </p>
  );
}

export function ErroMensagem({ erro, onRetry }) {
  return (
    <div role="alert" className="py-10 text-center">
      <p className="text-red-800">{erro?.message ?? "Não foi possível carregar os dados."}</p>
      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Tentar de novo
        </Button>
      )}
    </div>
  );
}

// Aviso de erro dentro de formulários.
export function ErroForm({ children }) {
  if (!children) return null;
  return (
    <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
      {children}
    </p>
  );
}
