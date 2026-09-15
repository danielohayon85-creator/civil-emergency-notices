import { useState } from "react";
import Layout from "../components/Layout";
import { clearHistory, loadHistory } from "../state/history";

export default function History() {
  const [entries, setEntries] = useState(() => loadHistory());

  const handleClear = () => {
    clearHistory();
    setEntries([]);
  };

  return (
    <Layout title="היסטוריית הודעות" showBack>
      {entries.length === 0 ? (
        <p className="empty-state">עדיין לא הוכנו הודעות במכשיר זה.</p>
      ) : (
        <>
          {entries.map((e) => (
            <div className="history-item" key={e.id}>
              <div className="history-meta">
                {e.categoryName} · {e.templateTitle} ·{" "}
                {new Date(e.composedAt).toLocaleString("he-IL")}
              </div>
              <div className="history-text">{e.text}</div>
            </div>
          ))}
          <div className="actions">
            <button className="btn btn-ghost" onClick={handleClear}>
              ניקוי היסטוריה
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
