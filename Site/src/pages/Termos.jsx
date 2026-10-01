import LegalPage from "./LegalPage";

const secoes = [
  { titulo: "Sobre a plataforma", texto: "A Nativa Caraguá reúne denúncias, campanhas e projetos de proteção ambiental em Caraguatatuba." },
  { titulo: "Uso da conta", texto: "Para doar, participar de campanhas e fazer denúncias é preciso criar uma conta com dados verdadeiros. Cada pessoa é responsável por manter a sua senha em segurança." },
  { titulo: "Doações", texto: "As doações são destinadas ao projeto escolhido. A prestação de contas será divulgada na plataforma." },
  { titulo: "Denúncias", texto: "Denúncias devem descrever situações reais. Informações falsas ou ofensivas poderão ser removidas." },
];

export default function Termos() {
  return <LegalPage titulo="Termos e condições" secoes={secoes} />;
}
