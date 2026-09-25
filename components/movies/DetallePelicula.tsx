"use client";

import {
  Award,
  Calendar,
  ChevronRight,
  CircleAlert,
  Clapperboard,
  Clock,
  MapPin,
  Play,
  Tags,
  TrendingUp,
  Tv,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Tag } from "@/components/Tag";
import { useMovie } from "@/hooks/useMovie";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDate } from "@/lib/format";

function Breadcrumb({ title }: { title?: string }) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("movie.breadcrumb")} className="flex min-w-0 items-center gap-1 text-sm text-muted">
      <Link to="/movies" className="shrink-0 rounded px-1.5 py-0.5 hover:bg-hover hover:text-fg">
        {t("nav.movies")}
      </Link>
      {title && (
        <>
          <ChevronRight size={14} aria-hidden="true" className="shrink-0 text-subtle" />
          <span className="truncate px-1.5 text-fg">{title}</span>
        </>
      )}
    </nav>
  );
}

type PropertyProps = {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
};

function Property({ icon: Icon, label, children }: PropertyProps) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] items-baseline gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-hover sm:grid-cols-[10rem_1fr]">
      <dt className="flex items-center gap-2 text-sm text-muted">
        <Icon size={16} aria-hidden="true" className="shrink-0" />
        {label}
      </dt>
      <dd className="min-w-0 text-[15px] text-fg">{children}</dd>
    </div>
  );
}

function SectionTitle({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <h2 id={id} className="flex items-baseline gap-2 border-b border-line pb-2 text-xl font-semibold text-fg">
      {title}
      <span className="text-sm font-normal text-subtle">{count}</span>
    </h2>
  );
}

export function DetallePelicula() {
  const { id } = useParams();
  const { t, locale } = useTranslation();
  const { movie, prizes, loading, error } = useMovie(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse" aria-busy="true">
        <div className="h-4 w-24 rounded bg-hover" />
        <div className="mt-8 flex flex-col gap-8 sm:flex-row">
          <div className="aspect-[2/3] w-44 rounded-lg bg-hover" />
          <div className="flex-1 space-y-3">
            <div className="h-9 w-2/3 rounded bg-hover" />
            <div className="h-4 w-1/2 rounded bg-hover" />
            <div className="h-4 w-1/3 rounded bg-hover" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="mx-auto max-w-4xl">
        <Breadcrumb />
        <div className="mt-8 flex flex-col items-center rounded-lg border border-dashed border-line py-16 text-center">
          <CircleAlert size={32} strokeWidth={1.5} aria-hidden="true" className="text-subtle" />
          <p className="mt-3 text-[15px] font-medium text-fg">{error ?? t("movie.notFound")}</p>
          <Link to="/movies" className="mt-2 rounded px-2 py-1 text-sm font-medium text-accent hover:bg-hover">
            {t("movie.back")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article aria-labelledby="movie-title" className="mx-auto max-w-4xl">
      <Breadcrumb title={movie.title} />

      <header className="mt-8 flex flex-col gap-8 sm:flex-row">
        <img
          src={movie.poster}
          alt={t("movies.poster", { title: movie.title })}
          className="aspect-[2/3] w-40 shrink-0 rounded-lg border border-line bg-hover object-cover sm:w-48"
        />

        <div className="min-w-0 flex-1">
          <h1 id="movie-title" className="text-4xl font-bold tracking-tight text-fg">
            {movie.title}
          </h1>

          <dl className="-mx-2 mt-6 flex flex-col gap-0.5">
            <Property icon={Calendar} label={t("movie.releaseDate")}>
              {formatDate(movie.releaseDate, locale)}
            </Property>
            <Property icon={Clock} label={t("movie.duration")}>
              {t("movie.minutes", { count: movie.duration })}
            </Property>
            <Property icon={MapPin} label={t("movie.country")}>
              {movie.country}
            </Property>
            <Property icon={TrendingUp} label={t("movie.popularity")}>
              {movie.popularity}
            </Property>
            {movie.genre && (
              <Property icon={Tags} label={t("movie.genre")}>
                <Tag tone="info">{movie.genre.type}</Tag>
              </Property>
            )}
            {movie.director && (
              <Property icon={Clapperboard} label={t("movie.director")}>
                <span className="flex items-center gap-2">
                  <img
                    src={movie.director.photo}
                    alt=""
                    className="h-6 w-6 shrink-0 rounded-full border border-line bg-hover object-cover"
                  />
                  <span className="truncate">{movie.director.name}</span>
                </span>
              </Property>
            )}
            {movie.youtubeTrailer && (
              <Property icon={Play} label={t("movie.trailer")}>
                <a
                  href={movie.youtubeTrailer.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent underline-offset-2 hover:underline"
                >
                  {movie.youtubeTrailer.name}
                </a>
                <span className="block text-sm text-muted">
                  {movie.youtubeTrailer.channel} · {t("movie.minutes", { count: movie.youtubeTrailer.duration })}
                </span>
              </Property>
            )}
            {movie.platforms.length > 0 && (
              <Property icon={Tv} label={t("movie.platforms")}>
                <span className="flex flex-wrap gap-1.5">
                  {movie.platforms.map((platform) => (
                    <a key={platform.id} href={platform.url} target="_blank" rel="noreferrer" className="hover:opacity-80">
                      <Tag>{platform.name}</Tag>
                    </a>
                  ))}
                </span>
              </Property>
            )}
          </dl>
        </div>
      </header>

      <section aria-labelledby="actors-heading" className="mt-14">
        <SectionTitle id="actors-heading" title={t("movie.actors")} count={movie.actors.length} />
        {movie.actors.length === 0 ? (
          <p className="mt-3 text-[15px] text-muted">{t("movie.noActors")}</p>
        ) : (
          <ul className="-mx-2 mt-2 flex flex-col">
            {movie.actors.map((actor) => (
              <li key={actor.id} className="flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-hover">
                {actor.photo ? (
                  <img
                    src={actor.photo}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full border border-line bg-hover object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hover">
                    <User size={18} aria-hidden="true" className="text-subtle" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-fg">{actor.name}</p>
                  <p className="text-sm text-muted">
                    {actor.nationality} · {formatDate(actor.birthDate, locale)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="prizes-heading" className="mt-12">
        <SectionTitle id="prizes-heading" title={t("movie.prizes")} count={prizes.length} />
        {prizes.length === 0 ? (
          <p className="mt-3 text-[15px] text-muted">{t("movie.noPrizes")}</p>
        ) : (
          <ul className="-mx-2 mt-2 flex flex-col">
            {prizes.map((prize) => (
              <li key={prize.id} className="flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-hover">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning-soft">
                  <Award size={18} aria-hidden="true" className="text-warning" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-fg">{prize.name}</p>
                  <p className="text-sm text-muted">
                    {prize.category} · {prize.year}
                  </p>
                </div>
                <Tag tone={prize.status === "won" ? "success" : "gray"}>
                  {prize.status === "won" ? t("prize.won") : t("prize.nominated")}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
