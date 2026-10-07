import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Link } from "wouter";
import { ShieldCheck, X, ArrowRight, Check, Info } from "lucide-react";
import { usePrototype } from "./prototype-context";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg width="35" height="39" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M32 7 51 15v17c0 12-8 20-19 25C21 52 13 44 13 32V15L32 7Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M22 37V25c0-6 9-6 10 0v14m0-14c1-6 10-6 10 0v12"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      {!compact && (
        <span>
          NannyBoss<span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}
export function ActionLink({
  to,
  children,
  variant = "primary",
  onClick,
}: {
  onClick?: () => void;
  to: string;
  children: ReactNode;
  variant?: string;
}) {
  return (
    <Link to={to} className={`button ${variant}`} onClick={onClick}>
      {children}
    </Link>
  );
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}
export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
export function Avatar({
  initials = "IM",
  color = "lavender",
  large = false,
}: {
  initials?: string;
  color?: string;
  large?: boolean;
}) {
  return <span className={`avatar ${color} ${large ? "large" : ""}`}>{initials}</span>;
}
export function Heading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function DemoNotice({ short = false }: { short?: boolean }) {
  return (
    <div className="demo-notice">
      <Info size={14} />
      {short
        ? "Protótipo · dados fictícios"
        : "Ambiente de demonstração. Dados fictícios; nenhuma verificação ou serviço é real."}
    </div>
  );
}
export function SafetyBadge() {
  return (
    <Badge tone="success">
      <ShieldCheck size={13} />
      Identidade · simulação
    </Badge>
  );
}
export function EmptyState({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="icon-tile mint">
        <ShieldCheck size={26} />
      </div>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
      {children}
    </div>
  );
}
export function Skeleton() {
  return (
    <output aria-label="A carregar demonstração" className="skeleton">
      <span />
      <span />
      <span />
    </output>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = ref.current;
    el?.showModal();
    return () => {
      el?.close();
      document.body.style.overflow = overflow;
      queueMicrotask(() => previous?.focus());
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      className="modal card"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = ref.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a,input,select,textarea,[tabindex="0"]',
        );
        if (!controls?.length) return;
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="section-head">
        <h2 id="modal-title">{title}</h2>
        <button className="icon-button" aria-label="Fechar janela" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export function Toast() {
  const { toast, setToast } = usePrototype();
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(timer);
  }, [toast, setToast]);
  return toast ? (
    <output className="toast">
      <Check size={18} />
      {toast}
      <button className="icon-button" aria-label="Fechar notificação" onClick={() => setToast("")}>
        <X size={16} />
      </button>
    </output>
  ) : null;
}
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-link">
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}
