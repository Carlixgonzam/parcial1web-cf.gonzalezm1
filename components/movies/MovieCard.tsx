"use client";

import { Award, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Tag } from "@/components/Tag";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDate } from "@/lib/format";
import type { MovieDetail } from "@/lib/movies/types";

type MovieCardProps = {
  movie: MovieDetail;
  prizes: string[];
};

export function MovieCard({ movie, prizes }: MovieCardProps) {
  const { t, locale } = useTranslation();
  const actor = movie.actors[0];
  const otherPrizes = prizes.length - 1;

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="aspect-[3/4] overflow-hidden border-b border-line bg-hover">
        <img
          src={movie.poster}
          alt={t("movies.poster", { title: movie.title })}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug text-fg">{movie.title}</h2>

        <p className="flex items-center gap-1.5 text-sm text-muted">
          <Calendar size={14} aria-hidden="true" className="shrink-0" />
          <span>{formatDate(movie.releaseDate, locale)}</span>
        </p>

        {actor && (
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <User size={14} aria-hidden="true" className="shrink-0" />
            <span className="truncate">{actor.name}</span>
          </p>
        )}

        {prizes.length > 0 && (
          <div className="mt-auto pt-1">
            <Tag tone="warning">
              <Award size={12} aria-hidden="true" className="shrink-0" />
              <span className="truncate">{prizes[0]}</span>
              {otherPrizes > 0 && <span className="shrink-0">+{otherPrizes}</span>}
            </Tag>
          </div>
        )}
      </div>
    </Link>
  );
}
