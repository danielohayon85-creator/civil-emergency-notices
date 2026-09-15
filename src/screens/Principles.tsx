import Layout from "../components/Layout";
import { usagePrinciples } from "../data/principles";
import { qualityChecklist } from "../data/checklist";

export default function Principles() {
  return (
    <Layout title="עקרונות שימוש" showBack>
      <div className="section-title">עקרונות כלליים</div>
      <ul className="principles-list">
        {usagePrinciples.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <div className="section-title">נספח – בקרת איכות לפני הפצה</div>
      <ul className="checklist-static">
        {qualityChecklist.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </Layout>
  );
}
