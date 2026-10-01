// Constantes da tela de campanhas. As campanhas em si vêm da API.
// O filtro por categoria só aparece se a API enviar o campo "categoria" (ver API.md).
export const categorias = [
  { id: "todas", label: "Todas" },
  { id: "limpeza", label: "Limpeza" },
  { id: "reflorestamento", label: "Reflorestamento" },
  { id: "educacao", label: "Educação ambiental" },
];

// Ícone mostrado quando a campanha ainda não tem foto.
export const iconePorCategoria = {
  limpeza: "hidricos",
  reflorestamento: "vegetacao",
  educacao: "biodiversidade",
};
