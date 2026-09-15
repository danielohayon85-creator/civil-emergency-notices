import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import TemplateList from "./screens/TemplateList";
import Compose from "./screens/Compose";
import Settings from "./screens/Settings";
import Principles from "./screens/Principles";
import History from "./screens/History";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<TemplateList />} />
      <Route path="/compose/:templateId" element={<Compose />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/principles" element={<Principles />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}
