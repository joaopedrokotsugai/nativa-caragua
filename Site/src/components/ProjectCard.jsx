import Button from "./Button";
import ImagePlaceholder from "./ImagePlaceholder";
import { formatBRL } from "../lib/text";

function ProjectCard({ projeto }) {
  const percentual = projeto.meta > 0 ? Math.min(100, Math.round((projeto.arrecadado / projeto.meta) * 100)) : 0;

  return (
    <article className="flex gap-4 rounded-2xl border border-neutral-300 bg-brand-paper p-5">
      <ImagePlaceholder
        imagem={projeto.imagem}
        alt={projeto.titulo}
        className="h-auto w-2/5 shrink-0 self-stretch rounded-2xl"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-bold leading-snug text-brand-forest">{projeto.titulo}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed">{projeto.descricao}</p>

        <div
          role="progressbar"
          aria-label="Meta arrecadada"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentual}
          className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-300"
        >
          <div className="h-full rounded-full bg-brand-green" style={{ width: `${percentual}%` }} />
        </div>
        <p className="mt-1 text-xs text-neutral-700">
          {formatBRL(projeto.arrecadado)} de {formatBRL(projeto.meta)}
        </p>

        <Button to={`/doacao?projeto=${projeto.id}`} className="mt-3 px-3! text-[13px]!">
          Apoiar esse projeto
        </Button>
      </div>
    </article>
  );
}

export default ProjectCard;
