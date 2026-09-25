"use client";

import { Pencil, Trash2, UserPlus, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Tag } from "@/components/Tag";
import { errorClass, primaryButtonClass } from "@/components/styles";
import { useActors } from "@/hooks/useActors";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDate } from "@/lib/format";

const actionClass =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted transition-colors hover:bg-hover hover:text-fg";

export function ActorList() {
  const navigate = useNavigate();
  const { t, locale } = useTranslation();
  const { actors, loading, error, handleDelete } = useActors();

  return (
    <section>
      <PageHeader
        icon={Users}
        title={t("actors.title")}
        description={loading ? undefined : t("actors.count", { count: actors.length })}
        action={
          <Link to="/crear" className={primaryButtonClass}>
            <UserPlus size={16} aria-hidden="true" />
            {t("actors.new")}
          </Link>
        }
      />

      {error && (
        <div role="alert" className={`mt-6 ${errorClass}`}>
          {error}
        </div>
      )}

      {loading && <p className="mt-8 text-[15px] text-muted">{t("actors.loading")}</p>}

      {!loading && actors.length === 0 && !error && (
        <p className="mt-8 text-[15px] text-muted">{t("actors.empty")}</p>
      )}

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {actors.map((actor) => (
          <li key={actor.id} className="flex gap-4 px-2 py-4 transition-colors hover:bg-hover">
            <img
              src={actor.photo}
              alt={actor.name}
              className="h-16 w-16 shrink-0 rounded-md border border-line bg-hover object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold text-fg">{actor.name}</h2>
                  <p className="text-sm text-muted">
                    {actor.nationality} · {formatDate(actor.birthDate, locale)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => navigate(`/actors/${actor.id}/editar`)} className={actionClass}>
                    <Pencil size={14} aria-hidden="true" />
                    {t("actors.edit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(actor.id)}
                    className={`${actionClass} hover:bg-danger-soft hover:text-danger`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                    {t("actors.delete")}
                  </button>
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm text-fg">{actor.biography}</p>
              {actor.movies && actor.movies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {actor.movies.map((movie) => (
                    <Link key={movie.id} to={`/movies/${movie.id}`} className="hover:opacity-80">
                      <Tag>{movie.title}</Tag>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
