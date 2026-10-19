import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TemplateRow from "../components/TemplateRow";
import { categories } from "../data/categories";
import { templates } from "../data/templates";

export default function TemplateList() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const items = templates.filter((t) => t.categoryId === categoryId);

  return (
    <Layout title={category ? `${category.order}. ${category.name}` : "קטגוריה"} showBack>
      <div className="card-list">
        {items.map((t) => (
          <TemplateRow key={t.id} template={t} />
        ))}
        {items.length === 0 ? <p className="empty-state">לא נמצאו תבניות בקטגוריה זו.</p> : null}
      </div>
    </Layout>
  );
}
