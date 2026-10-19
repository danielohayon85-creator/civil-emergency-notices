import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronIcon, StarIcon } from "./icons";
import { isFavorite, toggleFavorite } from "../state/favorites";
import type { MessageTemplate } from "../data/types";

interface TemplateRowProps {
  template: MessageTemplate;
  subtitle?: string;
}

export default function TemplateRow({ template, subtitle }: TemplateRowProps) {
  const [favorite, setFavorite] = useState(() => isFavorite(template.id));

  return (
    <div className="card-link has-star">
      <button
        className={`star-btn ${favorite ? "active" : ""}`}
        onClick={() => setFavorite(toggleFavorite(template.id).includes(template.id))}
        aria-label={favorite ? "הסר ממועדפים" : "הוסף למועדפים"}
        title={favorite ? "הסר ממועדפים" : "הוסף למועדפים"}
      >
        <StarIcon filled={favorite} />
      </button>
      <Link to={`/compose/${template.id}`} className="card-link-main">
        <div style={{ flex: 1 }}>
          <span className="card-title">
            {template.number ? `${template.number}. ` : ""}
            {template.title}
          </span>
          {subtitle ? <span className="card-sub">{subtitle}</span> : null}
        </div>
        <span className="chevron">
          <ChevronIcon />
        </span>
      </Link>
    </div>
  );
}
