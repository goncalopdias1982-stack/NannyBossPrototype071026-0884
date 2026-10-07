import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Bell, ChevronDown, Menu, ShieldCheck, LogOut, X } from "lucide-react";
import { navigation, sitterNavigation, roleHomes } from "../navigation/routes";
import { Logo, Avatar, DemoNotice, Modal } from "../components/primitives";
import { usePrototype } from "../components/prototype-context";
export default function AppLayout({ children }: { children: ReactNode }) {
  const [path, navigate] = useLocation();
  const { role, setRole } = usePrototype();
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const nav =
    role === "babysitter"
      ? sitterNavigation
      : role === "admin"
        ? [
            { ...navigation[0]!, path: "/admin" },
            ...navigation.filter((n) => ["/app/seguranca", "/app/definicoes"].includes(n.path)),
          ]
        : navigation;
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Saltar para o conteúdo
      </a>
      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <div className="sidebar-logo">
          <Link to="/" aria-label="NannyBoss — início">
            <Logo />
          </Link>
          <button
            className="icon-button mobile-only"
            aria-label="Fechar menu"
            onClick={() => setMenu(false)}
          >
            <X />
          </button>
        </div>
        <div className="workspace-picker">
          <label htmlFor="workspace">O SEU ESPAÇO</label>
          <div>
            <select
              id="workspace"
              value={role}
              onChange={(e) => {
                const r = e.target.value as typeof role;
                setRole(r);
                navigate(roleHomes[r]);
                setMenu(false);
              }}
            >
              <option value="parent">Família</option>
              <option value="babysitter">Babysitter</option>
              <option value="admin">Administração</option>
            </select>
            <ChevronDown size={15} />
          </div>
        </div>
        <nav aria-label="Navegação principal">
          {nav.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              className={`nav-item ${path === n.path ? "selected" : ""}`}
              onClick={() => setMenu(false)}
            >
              <n.icon size={19} />
              <span>{n.label}</span>
              {n.path === "/app/mensagens" && <span className="nav-count">2</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="child-first">
            <ShieldCheck size={22} />
            <strong>Child first. Always.</strong>
            <p>
              O cuidado começa
              <br />
              com a segurança.
            </p>
          </div>
          <Link className="nav-item" to="/" onClick={() => setMenu(false)}>
            <LogOut size={18} />
            Sair da demonstração
          </Link>
          <small>Fase 1 · Protótipo visual</small>
        </div>
      </aside>
      {menu && (
        <button className="menu-shade" aria-label="Fechar menu" onClick={() => setMenu(false)} />
      )}
      <div className="app-body">
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-only"
              aria-label="Abrir menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={22} />
            </button>
            <span className="breadcrumb">
              O meu espaço <span>/</span>{" "}
              {role === "parent"
                ? "Família"
                : role === "babysitter"
                  ? "Babysitter"
                  : "Administração"}
            </span>
          </div>
          <div className="topbar-right">
            <span className="environment-pill">Demonstração</span>
            <button
              className="icon-button notification-button"
              aria-label="Ver notificações"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <i />
            </button>
            <Link to="/app/definicoes" aria-label="Perfil e definições">
              <Avatar
                initials={role === "parent" ? "MF" : role === "babysitter" ? "IM" : "AD"}
                color="blush"
              />
            </Link>
          </div>
        </header>
        <main id="main-content" className="app-main">
          {children}
          <DemoNotice />
        </main>
      </div>
      <nav className="mobile-nav" aria-label="Atalhos mobile">
        {nav.slice(0, 4).map((n) => (
          <Link to={n.path} key={n.path} className={path === n.path ? "active" : ""}>
            <n.icon size={21} />
            <span>{n.label.split(" ")[0]}</span>
          </Link>
        ))}
        <button onClick={() => setMenu(true)}>
          <Menu size={21} />
          <span>Mais</span>
        </button>
      </nav>
      {notifications && (
        <Modal title="Notificações" onClose={() => setNotifications(false)}>
          <div className="notice mint">
            <ShieldCheck size={20} />
            <div>
              <strong>Preparar o próximo cuidado</strong>
              <p>Reveja a rotina com a babysitter. Notificação fictícia.</p>
            </div>
          </div>
          <p className="muted">Não existem notificações reais neste protótipo.</p>
        </Modal>
      )}
    </div>
  );
}
