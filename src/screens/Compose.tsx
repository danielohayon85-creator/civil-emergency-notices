import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { categories } from "../data/categories";
import { templates } from "../data/templates";
import { qualityChecklist } from "../data/checklist";
import {
  extractFields,
  globalDefaults,
  isComplete,
  renderMessage,
} from "../lib/templateEngine";
import { loadOrgProfile } from "../state/orgProfile";
import { addHistoryEntry } from "../state/history";
import { recordRecentTemplate } from "../state/recent";

const FIELD_RE = /\[([^[\]]+)\]/g;

function renderPreviewNodes(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  for (const m of text.matchAll(FIELD_RE)) {
    const index = m.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));
    parts.push(<mark key={key++}>{m[0]}</mark>);
    lastIndex = index + m[0].length;
  }
  parts.push(text.slice(lastIndex));
  return parts;
}

export default function Compose() {
  const { templateId } = useParams<{ templateId: string }>();
  const template = templates.find((t) => t.id === templateId);
  const category = template ? categories.find((c) => c.id === template.categoryId) : undefined;

  const profile = useMemo(() => loadOrgProfile(), []);
  const fields = useMemo(() => (template ? extractFields(template.body) : []), [template]);

  const [values, setValues] = useState<Record<string, string>>(() =>
    template ? { ...globalDefaults(profile) } : {}
  );
  const [checked, setChecked] = useState<boolean[]>(() => qualityChecklist.map(() => false));
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (template) recordRecentTemplate(template.id);
  }, [template]);

  if (!template) {
    return (
      <Layout title="תבנית" showBack>
        <p className="empty-state">התבנית לא נמצאה.</p>
      </Layout>
    );
  }

  const setField = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const preview = renderMessage(template.body, values);
  const fieldsComplete = isComplete(template.body, values);
  const checklistComplete = checked.every(Boolean);
  const canShare = fieldsComplete && checklistComplete;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const recordHistory = () => {
    addHistoryEntry({
      templateTitle: template.title,
      categoryName: category?.name ?? "",
      text: preview,
    });
  };

  const handleShare = async () => {
    if (!canShare) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: preview });
        recordHistory();
        return;
      } catch {
        // user cancelled or share failed — fall back to wa.me
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(preview)}`, "_blank");
    recordHistory();
  };

  const handleCopy = async () => {
    if (!canShare) return;
    try {
      await navigator.clipboard.writeText(preview);
    } catch {
      // clipboard API unavailable — silently ignore, user can still select the preview text
    }
    recordHistory();
    showToast("ההודעה הועתקה");
  };

  return (
    <Layout title={template.title} showBack>
      <p className="help-text" style={{ marginBottom: 16 }}>
        {category?.order}. {category?.name}
      </p>

      <div className="section-title">שדות קבועים (מפרופיל הרשות)</div>
      {fields
        .filter((f) => f.isGlobal)
        .map((f) => (
          <div className="field-group global" key={f.key}>
            <label htmlFor={`f-${f.key}`}>{f.label}</label>
            <input
              id={`f-${f.key}`}
              type="text"
              value={values[f.key] ?? ""}
              onChange={(e) => setField(f.key, e.target.value)}
              className={values[f.key]?.trim() ? "" : "missing"}
            />
          </div>
        ))}
      {fields.some((f) => f.isGlobal) && (!profile.orgName || !profile.hotline) ? (
        <p className="help-text" style={{ marginTop: -8, marginBottom: 16 }}>
          ניתן לקבוע שם רשות ומוקד קבועים פעם אחת ב<Link to="/settings">הגדרות</Link>, כדי
          שימולאו אוטומטית בכל הודעה.
        </p>
      ) : null}

      <div className="section-title">פרטי האירוע</div>
      {fields
        .filter((f) => !f.isGlobal)
        .map((f) => {
          const isGuidance = f.label.includes("הנחיה") || f.label.includes("הנחיית");
          return (
            <div className="field-group" key={f.key}>
              <label htmlFor={`f-${f.key}`}>{f.label}</label>
              {isGuidance ? (
                <span className="field-hint">
                  יש להעתיק ללא שינוי את הנוסח הרשמי מפיקוד העורף/הגורם המוסמך —{" "}
                  <a href="https://www.oref.org.il/heb" target="_blank" rel="noreferrer">
                    oref.org.il
                  </a>
                </span>
              ) : null}
              {f.options ? (
                <div className="field-options">
                  {f.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`chip ${values[f.key] === option ? "active" : ""}`}
                      onClick={() => setField(f.key, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
              <input
                id={`f-${f.key}`}
                type="text"
                value={values[f.key] ?? ""}
                onChange={(e) => setField(f.key, e.target.value)}
                className={values[f.key]?.trim() ? "" : "missing"}
              />
            </div>
          );
        })}
      {fields.every((f) => f.isGlobal) ? (
        <p className="help-text" style={{ marginBottom: 16 }}>
          לתבנית זו אין שדות נוספים למילוי.
        </p>
      ) : null}

      <div className="section-title">תצוגה מקדימה</div>
      <div className="preview-box">{renderPreviewNodes(preview)}</div>

      <div className="section-title">בקרת איכות לפני הפצה</div>
      <div className="checklist">
        {qualityChecklist.map((item, i) => (
          <label className="checklist-item" key={i}>
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={(e) =>
                setChecked((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))
              }
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="actions">
        <button className="btn btn-primary" disabled={!canShare} onClick={handleShare}>
          שתף בוואטסאפ
        </button>
        <button className="btn btn-secondary" disabled={!canShare} onClick={handleCopy}>
          העתק טקסט
        </button>
        {!fieldsComplete ? (
          <p className="help-text">יש למלא את כל השדות המסומנים לפני שיתוף.</p>
        ) : !checklistComplete ? (
          <p className="help-text">יש לאשר את כל סעיפי בקרת האיכות לפני שיתוף.</p>
        ) : null}
      </div>

      {toast ? <div className="toast">{toast}</div> : null}
    </Layout>
  );
}
