import { useCallback, useEffect, useState } from "react";

// Busca dados ao abrir a tela. "fetcher" precisa ser uma função estável (ex.: api.listarProjetos).
// Devolve { data, erro, carregando, recarregar }.
export function useApi(fetcher) {
  const [tick, setTick] = useState(0);
  const [estado, setEstado] = useState({ data: null, erro: null, carregando: true });

  useEffect(() => {
    let ativo = true;
    fetcher().then(
      (data) => ativo && setEstado({ data, erro: null, carregando: false }),
      (erro) => ativo && setEstado({ data: null, erro, carregando: false })
    );
    return () => {
      ativo = false;
    };
  }, [fetcher, tick]);

  const recarregar = useCallback(() => setTick((t) => t + 1), []);
  return { ...estado, recarregar };
}
