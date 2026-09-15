import { useState } from "react";
import Layout from "../components/Layout";
import { loadOrgProfile, saveOrgProfile, type OrgProfile } from "../state/orgProfile";

export default function Settings() {
  const [profile, setProfile] = useState<OrgProfile>(() => loadOrgProfile());
  const [saved, setSaved] = useState(false);

  const update = (patch: Partial<OrgProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    saveOrgProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout title="הגדרות רשות" showBack>
      <p className="help-text" style={{ marginBottom: 18 }}>
        שם הרשות ומספר המוקד יתמלאו אוטומטית בכל הודעה שתכינו. התאריך והשעה תמיד מתעדכנים
        אוטומטית לפי מועד ההכנה של ההודעה.
      </p>

      <div className="settings-form">
        <div className="field-group">
          <label htmlFor="orgName">שם הרשות</label>
          <input
            id="orgName"
            type="text"
            placeholder="לדוגמה: עיריית לדוגמה"
            value={profile.orgName}
            onChange={(e) => update({ orgName: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label htmlFor="hotline">מספר מוקד</label>
          <input
            id="hotline"
            type="tel"
            placeholder="לדוגמה: 106"
            value={profile.hotline}
            onChange={(e) => update({ hotline: e.target.value })}
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={handleSave}>
          שמירה
        </button>
      </div>

      {saved ? <div className="toast">ההגדרות נשמרו</div> : null}
    </Layout>
  );
}
