import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Link } from "wouter";
import { ShieldCheck, X, ArrowRight, Check, Info } from "lucide-react";
import { usePrototype } from "./prototype-context";
import { AnimatePresence, motion } from "motion/react";
import { useMotionPreference as useReducedMotion } from "./use-motion-preference";
import { useArrival } from "./effects";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <img
        src={compact ? "/brand/symbol.svg" : "/brand/horizontal.svg"}
        alt={compact ? "Símbolo NannyBoss" : "NannyBoss · Child First. Always."}
        width={compact ? 40 : 180}
        height={compact ? 42 : 45}
      />
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
  const reduced = useReducedMotion();
  return (
    <motion.section
      className={`card ${className}`}
      initial={reduced ? false : { opacity: 1, y: 10 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.32 }}
    >
      {children}
    </motion.section>
  );
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
  const photo = ({ IM: "ines", SA: "sofia", MC: "miguel" } as Record<string, string>)[initials];
  return (
    <span className={`avatar ${color} ${large ? "large" : ""}`}>
      {photo ? (
        <img
          src={`/images/portrait-${photo}.webp`}
          alt="Retrato editorial de um adulto ao ar livre"
          width={large ? 90 : 42}
          height={large ? 90 : 42}
          loading="lazy"
        />
      ) : (
        initials
      )}
    </span>
  );
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
        ? "Demonstração · sem serviços reais"
        : "Demonstração de interface. Perfis, preços e verificações são exemplos; não são prestados serviços reais."}
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
  const arrival = useArrival();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(timer);
  }, [toast, setToast]);
  return (
    <AnimatePresence>
      {toast && (
        <motion.output
          key={toast}
          className="toast"
          {...arrival}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
        >
          <Check size={18} />
          {toast}
          <button
            className="icon-button"
            aria-label="Fechar notificação"
            onClick={() => setToast("")}
          >
            <X size={16} />
          </button>
        </motion.output>
      )}
    </AnimatePresence>
  );
}
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-link">
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}
