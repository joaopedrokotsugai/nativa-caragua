// Deixa o texto minúsculo e sem acento, para a busca ignorar "ç", "ã" etc.
export function normalize(text = "") {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(value) {
  return brl.format(value);
}

// "2026-10-17T08:00:00" -> "17/10, 8h"
export function formatDataHora(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const min = d.getMinutes();
  return `${dia}/${mes}, ${d.getHours()}h${min ? String(min).padStart(2, "0") : ""}`;
}

// "2026-10-01T10:00:00Z" -> "01/10/2026"
export function formatData(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("pt-BR");
}
