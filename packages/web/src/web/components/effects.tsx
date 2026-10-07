import { motion } from "motion/react";
import { useMotionPreference as useReducedMotion } from "./use-motion-preference";
import { Check, CalendarDays, MessageCircle, ClipboardCheck } from "lucide-react";
import type { ReactNode } from "react";

/** Small, finite transitions. Changing the OS preference removes displacement immediately. */
export function useArrival() {
  const reduced = useReducedMotion();
  return {
    initial: reduced ? (false as const) : { opacity: 1, y: 9 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.28, ease: "easeOut" as const },
  };
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`scroll-reveal ${className}`}
      initial={reduced ? false : { opacity: 1, y: 14 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.42, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function StepProgress({
  step,
  onSelect,
}: {
  step: number;
  onSelect: (step: number) => void;
}) {
  const reduced = useReducedMotion();
  const labels = ["Horário", "Preparação", "Revisão"];
  return (
    <div className="wizard-progress">
      <div className="wizard-progress-head">
        <span className="eyebrow">PREPARAR COM CALMA</span>
        <span>Passo {step + 1} de 3</span>
      </div>
      <progress
        className="sr-only"
        aria-label="Etapa da preparação"
        max={3}
        value={step + 1}
        aria-valuetext={`Passo ${step + 1} de 3: ${labels[step]}`}
      />
      <div className="wizard-track" aria-hidden="true">
        <motion.span
          initial={false}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        />
      </div>
      <ol className="wizard-steps">
        {labels.map((label, i) => (
          <li key={label} className={i < step ? "complete" : i === step ? "current" : "upcoming"}>
            <button
              type="button"
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
              aria-label={`Passo ${i + 1}: ${label}${i < step ? " — voltar" : ""}`}
              onClick={() => onSelect(i)}
            >
              <span className="step-number" aria-hidden="true">
                {i < step ? <Check size={15} /> : i + 1}
              </span>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PreparationTimeline({ prepared }: { prepared: boolean }) {
  const reduced = useReducedMotion();
  const items = [
    {
      title: "Detalhes revistos",
      text: prepared
        ? "Horário e perfil incluídos no exemplo."
        : "Primeiro, reveja os detalhes do exemplo.",
      icon: CalendarDays,
      complete: prepared,
    },
    {
      title: "Exemplo preparado",
      text: prepared
        ? "Preparado nesta sessão. Não foi enviado."
        : "Ainda não foi preparado nesta sessão.",
      icon: ClipboardCheck,
      complete: prepared,
    },
    {
      title: "Conversa por alinhar",
      text: "Próximo passo sugerido. Sem reserva real.",
      icon: MessageCircle,
      complete: false,
    },
  ];
  return (
    <ol className="preparation-timeline" aria-label="Preparação demonstrativa do cuidado">
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          className={item.complete ? "complete" : "pending"}
          initial={reduced ? false : { opacity: 1, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.24, delay: reduced ? 0 : i * 0.08 }}
        >
          <span className="timeline-marker" aria-hidden="true">
            {item.complete ? <Check size={17} /> : <item.icon size={17} />}
          </span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function SuccessMark() {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="confirmation-icon success-mark"
      initial={reduced ? false : { scale: 0.88, opacity: 0.65 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
        <motion.path
          d="M12 24l8 8 17-18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.1 }}
        />
      </svg>
    </motion.span>
  );
}

export function SelectionHighlight({ group }: { group: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="selection-highlight"
      layoutId={group}
      transition={{ duration: reduced ? 0 : 0.22 }}
      aria-hidden="true"
    />
  );
}
