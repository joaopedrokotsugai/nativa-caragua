import { useEffect } from "react";

// Atualiza o título da aba do navegador em cada página.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Nativa Caraguá` : "Nativa Caraguá";
  }, [title]);
}
