import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ao trocar de página volta ao topo; se a URL tem #âncora, rola até ela.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
