import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  UsersRound,
  BriefcaseBusiness,
  Check,
} from "lucide-react";
import { Logo, Button, ActionLink, DemoNotice } from "../components/primitives";
import { usePrototype } from "../components/prototype-context";
export default function Access({ kind }: { kind: "onboarding" | "login" | "recover" | "role" }) {
  const [, navigate] = useLocation();
  const { setRole } = usePrototype();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [choice, setChoice] = useState<"parent" | "babysitter">("parent");
  const steps = [
    {
      title: "Cuidar começa por confiar.",
      text: "Uma experiência pensada para aproximar famílias e babysitters, com a proteção da criança como prioridade.",
      icon: ShieldCheck,
    },
    {
      title: "Cada criança tem o seu tempo.",
      text: "Rotinas, necessidades de cuidados e informação importante. Partilhadas com respeito e apenas quando necessário.",
      icon: UsersRound,
    },
    {
      title: "Tecnologia com presença humana.",
      text: "Ferramentas para organizar o cuidado. As decisões continuam nas mãos das pessoas.",
      icon: BriefcaseBusiness,
    },
  ];
  const current = steps[step]!;
  return (
    <div className="access-page">
      <header>
        <Link to="/" aria-label="Voltar ao início">
          <Logo />
        </Link>
        <ActionLink to="/" variant="ghost">
          <ArrowLeft size={15} />
          Voltar
        </ActionLink>
      </header>
      <main className="access-main">
        <aside className="access-art">
          <span className="eyebrow">NANNYBOSS · CHILD FIRST. ALWAYS.</span>
          <div className="access-symbol">
            <Logo compact />
          </div>
          <h2>
            Mais confiança.
            <br />
            Mais tranquilidade.
          </h2>
          <p>
            A criança no centro.
            <br />
            As pessoas em primeiro plano.
          </p>
          <span className="badge">Fase 1 · Experiência demonstrativa</span>
        </aside>
        <section className="access-form">
          {kind === "onboarding" ? (
            <>
              <fieldset className="onboarding-progress" aria-label={`Etapa ${step + 1} de 3`}>
                {steps.map((_, i) => (
                  <span key={i} className={i <= step ? "filled" : ""} />
                ))}
              </fieldset>
              <div className="icon-tile lavender">
                <current.icon size={26} />
              </div>
              <p className="eyebrow">PASSO {step + 1} DE 3</p>
              <h1>{current.title}</h1>
              <p className="muted">{current.text}</p>
              <div className="actions">
                <Button
                  onClick={() => (step < 2 ? setStep(step + 1) : navigate("/tipo-utilizador"))}
                >
                  {step < 2 ? "Continuar" : "Escolher o meu espaço"}
                  <ArrowRight size={16} />
                </Button>
                {step > 0 && (
                  <Button variant="ghost" onClick={() => setStep(step - 1)}>
                    Anterior
                  </Button>
                )}
              </div>
              <Link className="text-link" to="/tipo-utilizador">
                Saltar introdução
              </Link>
            </>
          ) : kind === "role" ? (
            <>
              <p className="eyebrow">UM CUIDADO. DIFERENTES PERSPECTIVAS.</p>
              <h1>Qual é o seu espaço?</h1>
              <p className="muted">Escolha como quer explorar o NannyBoss.</p>
              <div className="role-options">
                {[
                  {
                    id: "parent" as const,
                    name: "Sou mãe, pai ou responsável",
                    text: "Encontrar e organizar cuidados.",
                    icon: UsersRound,
                  },
                  {
                    id: "babysitter" as const,
                    name: "Sou babysitter",
                    text: "Prestar cuidados com confiança.",
                    icon: BriefcaseBusiness,
                  },
                ].map((r) => (
                  <button
                    key={r.id}
                    className={`role-option ${choice === r.id ? "chosen" : ""}`}
                    onClick={() => setChoice(r.id)}
                    aria-pressed={choice === r.id}
                  >
                    <r.icon size={25} />
                    <span>
                      <strong>{r.name}</strong>
                      <small>{r.text}</small>
                    </span>
                    {choice === r.id && <Check size={19} />}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => {
                  setRole(choice);
                  navigate(choice === "parent" ? "/app" : "/babysitter");
                }}
              >
                Explorar este espaço
                <ArrowRight size={16} />
              </Button>
              <p className="fine-print">
                Não é criada uma conta. A escolha apenas altera a demonstração.
              </p>
            </>
          ) : kind === "recover" ? (
            <>
              <p className="eyebrow">VOLTAR AO SEU ESPAÇO.</p>
              <h1>Recuperar acesso</h1>
              <p className="muted">Conceito visual da recuperação de palavra-passe.</p>
              {sent ? (
                <output className="notice mint">
                  <Check size={22} />
                  <div>
                    <strong>Pedido simulado</strong>
                    <p>
                      Nenhum email foi enviado. Esta funcionalidade estará disponível numa fase
                      futura.
                    </p>
                  </div>
                </output>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <label>
                    Email
                    <input
                      type="email"
                      aria-label="Email"
                      required
                      placeholder="nome@exemplo.pt"
                      autoComplete="email"
                    />
                  </label>
                  <Button type="submit">
                    Simular recuperação
                    <ArrowRight size={16} />
                  </Button>
                </form>
              )}
              <ActionLink to="/login" variant="ghost">
                Voltar ao ecrã de entrada
              </ActionLink>
            </>
          ) : (
            <>
              <p className="eyebrow">BEM-VINDO AO SEU ESPAÇO.</p>
              <h1>Bom voltar a vê-lo.</h1>
              <p className="muted">Explore o ecrã de entrada, sem autenticação real.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRole("parent");
                  navigate("/app");
                }}
              >
                <label>
                  Email
                  <input
                    type="email"
                    aria-label="Email"
                    required
                    placeholder="nome@exemplo.pt"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Palavra-passe de exemplo
                  <input
                    type="password"
                    aria-label="Palavra-passe de exemplo"
                    minLength={6}
                    required
                    placeholder="Use apenas um valor fictício"
                    autoComplete="off"
                  />
                </label>
                <Link to="/recuperar" className="text-link">
                  Recuperar palavra-passe
                </Link>
                <Button type="submit">
                  Entrar na demonstração
                  <ArrowRight size={16} />
                </Button>
              </form>
              <p className="fine-print">
                Não introduza credenciais reais. Os campos não são enviados nem guardados.
              </p>
              <p className="muted">
                Primeira visita?{" "}
                <Link to="/onboarding" className="text-link">
                  Conhecer o NannyBoss
                </Link>
              </p>
            </>
          )}
          <DemoNotice />
        </section>
      </main>
    </div>
  );
}
