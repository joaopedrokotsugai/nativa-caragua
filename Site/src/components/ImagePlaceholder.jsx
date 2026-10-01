import { TipoIcon } from "./Icons";

// Mostra a foto do item; se não houver, um ícone do tema. Basta preencher "imagem" nos dados.
function ImagePlaceholder({ imagem, tipo, alt = "", className = "", tone = "dark" }) {
  if (imagem) {
    return <img src={imagem} alt={alt} className={`object-cover ${className}`} />;
  }
  const colors = tone === "dark" ? "bg-brand-forest text-white/70" : "bg-brand-leaf text-brand-forest";
  return (
    <div className={`flex items-center justify-center ${colors} ${className}`} role="img" aria-label={alt || "Imagem em breve"}>
      <TipoIcon tipo={tipo} className="size-10" />
    </div>
  );
}

export default ImagePlaceholder;
