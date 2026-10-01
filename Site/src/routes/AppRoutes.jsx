import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Problemas from "../pages/Problemas";
import Campanhas from "../pages/Campanhas";
import Projetos from "../pages/Projetos";
import Doacao from "../pages/Doacao";
import Denuncia from "../pages/Denuncia";
import Contato from "../pages/Contato";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
import Termos from "../pages/Termos";
import Privacidade from "../pages/Privacidade";
import NotFound from "../pages/Notfound";

function AppRoutes() {
  return (
    <Routes>
      {/* Páginas do site: com header e footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/problemas" element={<Problemas />} />
        <Route path="/campanhas" element={<Campanhas />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/denuncia" element={<Denuncia />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Telas de conta: layout limpo */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
