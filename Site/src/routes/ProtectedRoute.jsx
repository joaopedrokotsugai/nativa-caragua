
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute() {
  const { authUser, carregandoAuth } = useAuth();
  const location = useLocation();

  if (carregandoAuth) {
    return <p>Verificando autenticação...</p>;
  }

  if (!authUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
