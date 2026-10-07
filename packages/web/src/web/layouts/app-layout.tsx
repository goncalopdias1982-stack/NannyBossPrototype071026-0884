import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Bell, ChevronDown, Menu, ShieldCheck, LogOut, X } from "lucide-react";
import { navigation, sitterNavigation, roleHomes } from "../navigation/routes";
import { Logo, Avatar, DemoNotice, Modal } from "../components/primitives";
import { usePrototype } from "../components/prototype-context";
import { motion } from "motion/react";
import { SelectionHighlight, useArrival } from "../components/effects";
export default function AppLayout({ children }: { children: ReactNode }) {
  const [path, navigate] = useLocation();
  const arrival = useArrival();
  const { role, setRole, messages } = usePrototype();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuTrigger = useRef<HTMLElement | null>(null);
  function openMenu() {
    menuTrigger.current = document.activeElement as HTMLElement;
    setMenu(true);
  }
  const [notifications, setNotifications] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    function resize() {
      if (desktop.matches) setMenu(false);
    }
    desktop.addEventListener("change", resize);
    const previous = menuTrigger.current ?? (document.activeElement as HTMLElement);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function focusMenu() {
      menuRef.current?.querySelector<HTMLElement>('button[aria-label="Fechar menu"]')?.focus();
    }
    const sidebar = menuRef.current;
    function arrived(event: TransitionEvent) {
      if (event.target === sidebar && !sidebar?.contains(document.activeElement)) focusMenu();
    }
    sidebar?.addEventListener("transitionend", arrived);
    let secondFrame = 0;
    const focusFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(focusMenu);
    });
    function keys(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(false);
      if (event.key !== "Tab") return;
      const controls = menuRef.current?.querySelectorAll<HTMLElement>("a,button,select");
      if (!controls?.length) return;
      const first = controls[0],
        last = controls[controls.length - 1];
      if (!menuRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    window.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = overflow;
      cancelAnimationFrame(focusFrame);
      cancelAnimationFrame(secondFrame);
      sidebar?.removeEventListener("transitionend", arrived);
      desktop.removeEventListener("change", resize);
      window.removeEventListener("keydown", keys);
      queueMicrotask(() => previous?.focus());
    };
  }, [menu]);
  const active = (target: string) =>
    path === target ||
    (role === "parent" && target === "/app/babysitters" && path.startsWith("/app/babysitter/"));
  const mobileLabels: Record<string, string> = {
    "/app": "Início",
    "/babysitter": "Início",
    "/admin": "Início",
    "/app/babysitters": "Pessoas",
    "/app/reserva": "Pedidos",
    "/app/mensagens": "Conversas",
    "/app/babysitter/ines": "Perfil",
    "/app/seguranca": "Segurança",
    "/app/definicoes": "Definições",
  };
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
      <aside
        id="workspace-navigation"
        ref={menuRef}
        className={`sidebar ${menu ? "open" : ""}`}
        role={menu ? "dialog" : undefined}
        aria-modal={menu ? true : undefined}
        aria-label={menu ? "Menu de navegação" : undefined}
      >
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
              className={`nav-item ${active(n.path) ? "selected" : ""}`}
              aria-current={active(n.path) ? "page" : undefined}
              onClick={() => setMenu(false)}
            >
              <n.icon size={19} />
              <span>{n.label}</span>
              {n.path === "/app/mensagens" && (
                <span
                  className="nav-count"
                  aria-label={`${messages.length} mensagens demonstrativas`}
                >
                  {messages.length}
                </span>
              )}
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
      <div className="app-body" inert={menu}>
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-only"
              aria-label="Abrir menu"
              aria-expanded={menu}
              aria-controls="workspace-navigation"
              onClick={openMenu}
            >
              <Menu size={22} />
            </button>
            <Link to="/" className="mobile-brand mobile-only" aria-label="NannyBoss início">
              <Logo compact />
            </Link>
            <span className="mobile-workspace">
              {role === "parent"
                ? "Família"
                : role === "babysitter"
                  ? "Babysitter"
                  : "Administração"}
            </span>
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
            <Link to="/app/definicoes" className="icon-button" aria-label="Perfil e definições">
              <Avatar
                initials={role === "parent" ? "MF" : role === "babysitter" ? "IM" : "AD"}
                color="blush"
              />
            </Link>
          </div>
        </header>
        <motion.main id="main-content" className="app-main motion-page" key={path} {...arrival}>
          {children}
          <DemoNotice />
        </motion.main>
      </div>
      <nav className="mobile-nav" aria-label="Atalhos mobile" inert={menu}>
        {nav.slice(0, 4).map((n) => (
          <Link
            to={n.path}
            key={n.path}
            className={active(n.path) ? "active" : ""}
            aria-current={active(n.path) ? "page" : undefined}
          >
            {active(n.path) && <SelectionHighlight group="mobile-navigation" />}
            <n.icon size={21} />
            <span>{mobileLabels[n.path] || n.label.split(" ")[0]}</span>
          </Link>
        ))}
        <button aria-expanded={menu} aria-controls="workspace-navigation" onClick={openMenu}>
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
