// "tipo" casa com o ícone usado em components/Icons.jsx (vegetacao | biodiversidade | hidricos).
export const problemas = [
  {
    id: "vegetacao",
    tipo: "vegetacao",
    titulo: "Vegetação",
    resumo:
      "A retirada da cobertura vegetal pode prejudicar o equilíbrio dos ecossistemas e aumentar a vulnerabilidade de determinadas áreas.",
    detalhes:
      "A vegetação nativa segura o solo com as raízes, filtra a chuva e deixa o ambiente mais fresco. Quando ela é removida de encostas, margens de rios e restingas, a terra fica exposta e mais sujeita a erosão e deslizamentos.",
    consequencias: [
      "Solo exposto e mais erosão",
      "Menos sombra e menos regulação do calor",
      "Perda de áreas de abrigo para a fauna",
    ],
    acao: { texto: "Participar de um reflorestamento", to: "/campanhas?categoria=reflorestamento" },
  },
  {
    id: "biodiversidade",
    tipo: "biodiversidade",
    titulo: "Biodiversidade",
    resumo:
      "A degradação dos ambientes naturais pode comprometer habitats e afetar espécies da fauna e flora.",
    detalhes:
      "Cada espécie cumpre um papel: poliniza, espalha sementes, controla insetos. Quando um habitat é degradado, aves, anfíbios, mamíferos e plantas perdem alimento e abrigo, e algumas populações deixam de se manter.",
    consequencias: [
      "Habitats divididos em pedaços pequenos",
      "Menos polinizadores e dispersores de sementes",
      "Espécies mais sensíveis desaparecem primeiro",
    ],
    acao: { texto: "Reportar um lugar", to: "/denuncia" },
  },
  {
    id: "recursos-hidricos",
    tipo: "hidricos",
    titulo: "Recursos Hídricos",
    resumo:
      "A alteração da vegetação pode contribuir para problemas ambientais relacionados ao solo e ao escoamento da água.",
    detalhes:
      "Rios, nascentes e a faixa de praia dependem da vegetação ao redor. Sem ela, a chuva escorre mais rápido e leva sedimentos e lixo para os córregos e, no fim, para o mar.",
    consequencias: [
      "Assoreamento de rios e córregos",
      "Lixo e sedimentos chegando às praias",
      "Nascentes com menos proteção",
    ],
    acao: { texto: "Apoiar um projeto", to: "/projetos" },
  },
];
