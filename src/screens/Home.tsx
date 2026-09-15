import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { categories } from "../data/categories";
import { templates } from "../data/templates";
import { ChevronIcon, HistoryIcon, InfoIcon, SearchIcon, SettingsIcon } from "../components/icons";

export default function Home() {
  const [query, setQuery] = useState("");

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
    const catNameById = new Map(categories.map((c) => [c.id, c.name]));
    return templates.filter(
      (t) => t.title.includes(q) || (catNameById.get(t.categoryId) ?? "").includes(q)
    );
  }, [query]);

  return (
    <Layout
      title="בנק הודעות חירום"
      rightAction={
        <div style={{ display: "flex", gap: 6 }}>
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
            searchResults.map((t) => {
              const cat = categories.find((c) => c.id === t.categoryId);
              return (
                <Link key={t.id} className="card-link" to={`/compose/${t.id}`}>
                  <div style={{ flex: 1 }}>
                    <span className="card-title">
                      {t.number ? `${t.number}. ` : ""}
                      {t.title}
                    </span>
                    <span className="card-sub">{cat?.name}</span>
                  </div>
                  <span className="chevron">
                    <ChevronIcon />
                  </span>
                </Link>
              );
            })
          )}
        </div>
      ) : (
        <div className="card-list">
          {categories.map((c) => (
            <Link key={c.id} className="card-link" to={`/category/${c.id}`}>
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
      )}
    </Layout>
  );
}
