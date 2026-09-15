import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { categories } from "../data/categories";
import { templates } from "../data/templates";
import { ChevronIcon } from "../components/icons";

export default function TemplateList() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const items = templates.filter((t) => t.categoryId === categoryId);

  return (
    <Layout title={category ? `${category.order}. ${category.name}` : "קטגוריה"} showBack>
      <div className="card-list">
        {items.map((t) => (
          <Link key={t.id} className="card-link" to={`/compose/${t.id}`}>
            <div style={{ flex: 1 }}>
              <span className="card-title">
                {t.number ? `${t.number}. ` : ""}
                {t.title}
              </span>
            </div>
            <span className="chevron">
              <ChevronIcon />
            </span>
          </Link>
        ))}
        {items.length === 0 ? <p className="empty-state">לא נמצאו תבניות בקטגוריה זו.</p> : null}
      </div>
    </Layout>
  );
}
