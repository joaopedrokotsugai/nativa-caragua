import Button from "./Button";
import ImagePlaceholder from "./ImagePlaceholder";
import { CalendarIcon, CheckIcon, PeopleIcon, PinIcon } from "./Icons";
import { iconePorCategoria } from "../data/campanhas";
import { formatDataHora } from "../lib/text";

function Info({ icon: Icon, children }) {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-6 shrink-0 text-brand-leaf" />
      <span>{children}</span>
    </p>
  );
}

function CampaignCard({ campanha, inscrito, ocupado, onToggle }) {
  const esgotada = campanha.vagas <= 0 && !inscrito;
  return (
    <article className="flex gap-4 rounded-xl bg-brand-forest p-4 text-white">
      <ImagePlaceholder
        imagem={campanha.imagem}
        tipo={iconePorCategoria[campanha.categoria]}
        alt={campanha.titulo}
        tone="light"
        className="w-2/5 shrink-0 self-stretch rounded-lg"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-lg font-bold leading-snug">{campanha.titulo}</h3>
        <Info icon={CalendarIcon}>{formatDataHora(campanha.data)}</Info>
        <Info icon={PinIcon}>{campanha.local}</Info>
        <Info icon={PeopleIcon}>{esgotada ? "Vagas esgotadas" : `${campanha.vagas} vagas`}</Info>
        <Button
          variant="leaf"
          onClick={() => onToggle(campanha.id)}
          aria-pressed={inscrito}
          disabled={ocupado || esgotada}
          className="mt-2 py-2! text-xs"
        >
          {inscrito ? (
            <>
              <CheckIcon className="size-4" /> Inscrito
            </>
          ) : (
            "Participe!"
          )}
        </Button>
      </div>
    </article>
  );
}

export default CampaignCard;
