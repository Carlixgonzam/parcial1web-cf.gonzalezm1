"use client";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppSidebar, MobileNav } from "@/components/AppNav";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ActorList } from "@/components/actors/ActorList";
import { CrearActor } from "@/components/actors/CrearActor";
import { EditarActor } from "@/components/actors/EditarActor";
import { CrearPelicula } from "@/components/movies/CrearPelicula";
import { DetallePelicula } from "@/components/movies/DetallePelicula";
import { MovieList } from "@/components/movies/MovieList";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";

function NotFound() {
  const { t } = useTranslation();
  return <p className="text-muted">{t("notFound")}</p>;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-page text-fg">
          <AppSidebar theme={theme} onToggleTheme={toggleTheme} />
          <div className="min-w-0 flex-1">
            <MobileNav theme={theme} onToggleTheme={toggleTheme} />
            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-10 sm:py-14">
              <Routes>
                <Route path="/" element={<Navigate to="/actors" />} />
                <Route path="/actors" element={<ActorList />} />
                <Route path="/crear" element={<CrearActor />} />
                <Route path="/actors/:id/editar" element={<EditarActor />} />
                <Route path="/movies" element={<MovieList />} />
                <Route path="/movies/crear" element={<CrearPelicula />} />
                <Route path="/movies/:id" element={<DetallePelicula />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
