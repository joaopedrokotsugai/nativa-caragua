import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
