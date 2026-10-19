import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import TemplateRow from "../components/TemplateRow";
import { CategoryIcon } from "../components/categoryIcons";
import { categories } from "../data/categories";
import { templates } from "../data/templates";
import { ChevronIcon, HistoryIcon, InfoIcon, MoonIcon, SearchIcon, SettingsIcon, SunIcon } from "../components/icons";
import { loadFavorites } from "../state/favorites";
import { loadRecentTemplateIds } from "../state/recent";
import { applyTheme, resolveInitialTheme, setStoredTheme, type Theme } from "../state/theme";

export default function Home() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());

  const templatesById = useMemo(() => new Map(templates.map((t) => [t.id, t])), []);
  const catNameById = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), []);

  const favoriteTemplates = useMemo(
    () => loadFavorites().map((id) => templatesById.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t)),
    [templatesById]
  );

  const recentTemplates = useMemo(() => {
    const favoriteIds = new Set(favoriteTemplates.map((t) => t.id));
    return loadRecentTemplateIds()
      .map((id) => templatesById.get(id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t) && !favoriteIds.has(t!.id))
      .slice(0, 5);
  }, [templatesById, favoriteTemplates]);

  const templateCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of templates) {
      counts.set(t.categoryId, (counts.get(t.categoryId) ?? 0) + 1);
    }
    return counts;
  }, []);

  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return null;
    return templates.filter(
      (t) => t.title.includes(q) || (catNameById.get(t.categoryId) ?? "").includes(q)
    );
  }, [query, catNameById]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
    applyTheme(next);
  };

  return (
    <Layout
      title="בנק הודעות חירום"
      rightAction={
        <div style={{ display: "flex", gap: 6 }}>
          <button className="icon-btn" onClick={toggleTheme} aria-label="החלפת מצב תצוגה" title="מצב כהה/בהיר">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link className="icon-btn" to="/principles" aria-label="עקרונות שימוש" title="עקרונות שימוש">
            <InfoIcon />
          </Link>
          <Link className="icon-btn" to="/history" aria-label="היסטוריה" title="היסטוריה">
            <HistoryIcon />
          </Link>
          <Link className="icon-btn" to="/settings" aria-label="הגדרות" title="הגדרות">
            <SettingsIcon />
          </Link>
        </div>
      }
    >
      <div className="search-box">
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder="חיפוש תבנית או קטגוריה..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="חיפוש תבנית"
        />
      </div>

      {searchResults ? (
        <div className="card-list">
          {searchResults.length === 0 ? (
            <p className="empty-state">לא נמצאו תבניות תואמות.</p>
          ) : (
            searchResults.map((t) => (
              <TemplateRow key={t.id} template={t} subtitle={catNameById.get(t.categoryId)} />
            ))
          )}
        </div>
      ) : (
        <>
          {favoriteTemplates.length > 0 ? (
            <>
              <div className="section-title">מועדפים</div>
              <div className="card-list" style={{ marginBottom: 20 }}>
                {favoriteTemplates.map((t) => (
                  <TemplateRow key={t.id} template={t} subtitle={catNameById.get(t.categoryId)} />
                ))}
              </div>
            </>
          ) : null}

          {recentTemplates.length > 0 ? (
            <>
              <div className="section-title">נעשה בהן שימוש לאחרונה</div>
              <div className="card-list" style={{ marginBottom: 20 }}>
                {recentTemplates.map((t) => (
                  <TemplateRow key={t.id} template={t} subtitle={catNameById.get(t.categoryId)} />
                ))}
              </div>
            </>
          ) : null}

          <div className="card-list">
            {categories.map((c) => (
              <Link key={c.id} className="card-link" to={`/category/${c.id}`}>
                <span className="category-icon">
                  <CategoryIcon id={c.id} />
                </span>
                <div style={{ flex: 1 }}>
                  <span className="card-title">
                    {c.order}. {c.name}
                  </span>
                  <span className="card-sub">{templateCounts.get(c.id) ?? 0} תבניות</span>
                </div>
                <span className="chevron">
                  <ChevronIcon />
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
