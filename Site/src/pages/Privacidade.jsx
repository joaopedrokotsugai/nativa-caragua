import LegalPage from "./LegalPage";

const secoes = [
  { titulo: "Quais dados coletamos", texto: "Nome, e-mail e senha no cadastro; e as informações que você envia em doações, denúncias e inscrições em campanhas." },
  { titulo: "Para que usamos", texto: "Para manter sua conta, registrar suas ações na plataforma e entrar em contato quando necessário." },
  { titulo: "Compartilhamento", texto: "Não vendemos seus dados. Eles só são compartilhados quando a lei exigir." },
  { titulo: "Seus direitos", texto: "Você pode pedir acesso, correção ou exclusão dos seus dados, inclusive excluindo a conta pelo seu perfil." },
];

export default function Privacidade() {
  return <LegalPage titulo="Política de privacidade" secoes={secoes} />;
}
