
import LegalPage from "./LegalPage";

const secoes = [
  {
    titulo: "1. Apresentação da plataforma",
    texto:
      "A Nativa Caraguá é uma plataforma voltada à conscientização ambiental e ao incentivo de iniciativas de preservação e recuperação ambiental no município de Caraguatatuba, São Paulo. Por meio dela, os usuários podem consultar projetos, acompanhar campanhas, registrar denúncias ambientais e conhecer ações relacionadas à sustentabilidade.",
  },
  {
    titulo: "2. Aceitação dos termos",
    texto:
      "Ao acessar ou utilizar a plataforma, o usuário declara estar ciente das disposições estabelecidas nestes Termos e Condições. Caso não concorde com alguma das disposições, deverá interromper a utilização dos serviços disponibilizados.",
  },
  {
    titulo: "3. Cadastro e responsabilidade da conta",
    texto:
      "Para acessar determinadas funcionalidades, poderá ser necessário realizar um cadastro. O usuário compromete-se a fornecer informações verdadeiras, completas e atualizadas, bem como a manter a confidencialidade de suas credenciais de acesso. Cada conta é de responsabilidade de seu respectivo titular, que deverá comunicar eventuais usos não autorizados.",
  },
  {
    titulo: "4. Conduta dos usuários",
    texto:
      "Os usuários devem utilizar a plataforma de maneira ética, respeitosa e compatível com sua finalidade ambiental. Não são permitidos conteúdos fraudulentos, ofensivos, discriminatórios, ilegais ou que violem direitos de terceiros. O uso indevido das funcionalidades poderá resultar na restrição de acesso aos serviços, conforme a gravidade da situação.",
  },
  {
    titulo: "5. Campanhas ambientais",
    texto:
      "As campanhas disponibilizadas na plataforma têm como objetivo incentivar a participação da comunidade em atividades de conscientização e preservação ambiental. As informações referentes a datas, locais, disponibilidade de vagas e demais condições devem ser consultadas na respectiva página da campanha. A inscrição representa o interesse do usuário em participar, não constituindo garantia de realização da atividade.",
  },
  {
    titulo: "6. Projetos e doações",
    texto:
      "A plataforma disponibiliza informações sobre projetos ambientais e permite o registro de valores associados aos projetos escolhidos pelos usuários. No estágio atual de funcionamento, esse registro possui finalidade demonstrativa e não representa processamento de pagamento, transferência financeira ou confirmação de recebimento de recursos. Qualquer futura funcionalidade de pagamento deverá apresentar suas condições específicas de funcionamento.",
  },
  {
    titulo: "7. Registro de denúncias ambientais",
    texto:
      "Os usuários poderão registrar denúncias relacionadas a possíveis irregularidades ou danos ambientais. As informações fornecidas devem ser verdadeiras, claras e, sempre que possível, acompanhadas de elementos que auxiliem na compreensão da situação relatada. O envio de uma denúncia pela plataforma não equivale à abertura de um procedimento oficial perante órgãos públicos, nem garante investigação ou providências por parte de autoridades competentes.",
  },
  {
    titulo: "8. Privacidade e proteção de dados",
    texto:
      "Os dados pessoais fornecidos durante a utilização da plataforma serão tratados para viabilizar o cadastro, a autenticação e o funcionamento das funcionalidades disponibilizadas. O tratamento dessas informações deverá observar a legislação aplicável de proteção de dados pessoais, especialmente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).",
  },
  {
    titulo: "9. Disponibilidade e limitações",
    texto:
      "A Nativa Caraguá busca manter seus serviços disponíveis e suas informações atualizadas. Entretanto, poderão ocorrer interrupções, falhas técnicas, manutenções ou alterações nas funcionalidades. As informações disponibilizadas possuem caráter informativo e não substituem avaliações técnicas, orientações profissionais ou comunicações oficiais dos órgãos competentes.",
  },
  {
    titulo: "10. Alterações dos termos",
    texto:
      "Estes Termos e Condições poderão ser atualizados para refletir mudanças nas funcionalidades, nas práticas de utilização ou nas exigências legais aplicáveis. Recomenda-se que os usuários consultem periodicamente esta página para acompanhar eventuais alterações.",
  },
  {
    titulo: "11. Disposições finais",
    texto:
      "A utilização da plataforma implica o compromisso de respeitar estes termos e contribuir para um ambiente digital seguro, responsável e alinhado à preservação ambiental. As disposições aqui apresentadas deverão ser interpretadas de acordo com a legislação brasileira aplicável.",
  },
];

export default function Termos() {
  return <LegalPage titulo="Termos e condições de uso" secoes={secoes} />;
}
