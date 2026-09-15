import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon, ShieldIcon } from "./icons";

interface LayoutProps {
  title: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  children: ReactNode;
}

export default function Layout({ title, showBack, rightAction, children }: LayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <header className="topbar">
        {showBack ? (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="חזרה">
            <BackIcon />
          </button>
        ) : (
          <span className="topbar-mark">
            <ShieldIcon size={20} />
          </span>
        )}
        <h1>{title}</h1>
        {rightAction}
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
