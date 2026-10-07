import { Link } from "wouter";
import {
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  Check,
  UsersRound,
  MessageCircle,
  Sparkles,
  Clock3,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Heading,
  Card,
  Badge,
  Avatar,
  ActionLink,
  TextLink,
  EmptyState,
} from "../components/primitives";
import { caregivers } from "../data/mock";
import { CaregiverCard } from "../components/caregiver-card";
import { usePrototype } from "../components/prototype-context";
export default function Dashboard() {
  const { confirmed } = usePrototype();
  return (
    <>
      <Heading
        eyebrow="QUARTA-FEIRA, 7 DE OUTUBRO · EXEMPLO"
        title="Olá, Mariana."
        description="Mais tranquilidade para o seu dia. Mais presença para a sua família."
        action={
          <ActionLink to="/app/reserva">
            <Plus size={17} />
            Novo pedido de cuidado
          </ActionLink>
        }
      />
      <div className="dashboard-feature">
        <div className="feature-message">
          <Badge tone="glass">
            <ShieldCheck size={13} />
            CHILD FIRST. ALWAYS.
          </Badge>
          <h2>
            Quando o cuidado está preparado,
            <br />a confiança acontece.
          </h2>
          <p>
            Um bom cuidado começa com uma conversa.
            <br />
            Alinhe a rotina, as necessidades e o que é importante.
          </p>
          <TextLink to="/app/crianca">Rever informação de cuidados</TextLink>
          <div className="feature-decoration">
            <LogoShape />
          </div>
        </div>
        <Card className="next-care">
          <div className="section-head">
            <span className="eyebrow">PRÓXIMO CUIDADO</span>
            <Badge tone="success">{confirmed ? "Pedido simulado" : "Exemplo"}</Badge>
          </div>
          <h3>Sábado, 10 de outubro</h3>
          <p className="muted">
            <Clock3 size={15} />
            17:00 — 20:00 <span>· Lisboa</span>
          </p>
          <div className="person-row">
            <Avatar />
            <div>
              <strong>Inês Martins</strong>
              <small>Babysitter · perfil fictício</small>
            </div>
            <Link to="/app/babysitter/ines" className="icon-button" aria-label="Ver perfil de Inês">
              <ChevronRight size={20} />
            </Link>
          </div>
          <div className="session-check">
            <Check size={15} />
            Preparação da sessão · simulação
          </div>
          <ActionLink to="/app/reserva" variant="secondary">
            Ver detalhes do cuidado
            <ArrowRight size={15} />
          </ActionLink>
        </Card>
      </div>
      <div className="quick-grid">
        {[
          {
            title: "A sua família",
            desc: "1 perfil de cuidados fictício",
            icon: UsersRound,
            path: "/app/crianca",
            color: "lavender",
          },
          {
            title: "Conversas com cuidado",
            desc: "Alinhar os detalhes faz a diferença",
            icon: MessageCircle,
            path: "/app/mensagens",
            color: "sky",
          },
          {
            title: "Confiança e segurança",
            desc: "Transparência em cada etapa",
            icon: ShieldCheck,
            path: "/app/seguranca",
            color: "mint",
          },
        ].map((a) => (
          <Link to={a.path} className="quick-card" key={a.path}>
            <span className={`icon-tile ${a.color}`}>
              <a.icon size={21} />
            </span>
            <div>
              <strong>{a.title}</strong>
              <small>{a.desc}</small>
            </div>
            <ChevronRight size={17} />
          </Link>
        ))}
      </div>
      <div className="section-title compact">
        <div>
          <p className="eyebrow">ENCONTRE UMA BOA LIGAÇÃO.</p>
          <h2>Pessoas que cuidam.</h2>
        </div>
        <TextLink to="/app/babysitters">Ver todos os perfis</TextLink>
      </div>
      <div className="caregiver-grid">
        {caregivers.map((p) => (
          <CaregiverCard key={p.id} person={p} />
        ))}
      </div>
      <p className="fine-print">
        *Valores ilustrativos. Perfis, experiência e estados de verificação são fictícios.
      </p>
      <Card className="assistant-banner">
        <div className="icon-tile lavender">
          <Sparkles size={23} />
        </div>
        <div>
          <h3>Um pouco de orientação. Sempre com supervisão humana.</h3>
          <p className="muted">
            Explore o conceito do assistente NannyBoss para preparar os seus cuidados.
          </p>
        </div>
        <ActionLink to="/app/assistente" variant="secondary">
          Conhecer o assistente
          <ArrowRight size={15} />
        </ActionLink>
      </Card>
    </>
  );
}
function LogoShape() {
  return <ShieldCheck size={128} strokeWidth={0.6} />;
}
export function BabysitterDashboard() {
  const { setToast } = usePrototype();
  return (
    <>
      <Heading
        eyebrow="O SEU ESPAÇO PROFISSIONAL"
        title="Olá, Inês."
        description="Cuidar com atenção. Trabalhar com clareza."
        action={
          <ActionLink to="/app/babysitter/ines" variant="secondary">
            Ver o meu perfil
            <ArrowRight size={16} />
          </ActionLink>
        }
      />
      <div className="dashboard-feature">
        <div className="feature-message mint">
          <Badge tone="glass">CUIDADO COM PROPÓSITO</Badge>
          <h2>
            A sua presença
            <br />
            faz a diferença.
          </h2>
          <p>
            Prepare cada cuidado em conjunto com a família.
            <br />
            Os detalhes importam.
          </p>
          <TextLink to="/app/seguranca">Conhecer a abordagem de segurança</TextLink>
        </div>
        <Card>
          <p className="eyebrow">DISPONIBILIDADE · DEMONSTRAÇÃO</p>
          <h3>O seu próximo cuidado</h3>
          <p>Sábado, 10 de outubro · 17:00 — 20:00</p>
          <div className="person-row">
            <Avatar initials="MF" color="blush" />
            <div>
              <strong>Família de Mariana</strong>
              <small>Lisboa · dados fictícios</small>
            </div>
          </div>
          <ActionLink to="/app/mensagens">
            Rever os detalhes
            <ArrowRight size={16} />
          </ActionLink>
        </Card>
      </div>
      <div className="two-column">
        <Card>
          <div className="section-head">
            <h2>Preparação da sessão</h2>
            <CalendarDays size={21} />
          </div>
          <ul className="check-list">
            <li>
              <Check />
              Alinhar rotina com o responsável
            </li>
            <li>
              <Check />
              Confirmar contactos autorizados
            </li>
            <li>
              <Check />
              Rever procedimentos de emergência
            </li>
          </ul>
          <button
            className="button secondary"
            onClick={() =>
              setToast("Checklist revisto na demonstração. Nenhuma sessão real é iniciada.")
            }
          >
            Marcar como revisto · simulação
          </button>
        </Card>
        <Card>
          <h2>O seu perfil de confiança</h2>
          <p className="muted">Estados ilustrativos, sem verificações reais.</p>
          <div className="status-row">
            <ShieldCheck size={20} />
            <strong>Documentação</strong>
            <Badge tone="success">Exemplo revisto</Badge>
          </div>
          <div className="status-row">
            <Clock3 size={20} />
            <strong>Seguro</strong>
            <Badge>Exemplo pendente</Badge>
          </div>
          <TextLink to="/app/seguranca">Ver todos os estados</TextLink>
        </Card>
      </div>
      <Card>
        <EmptyState
          title="Os seus cuidados, num só espaço."
          text="O histórico real de sessões ficará disponível numa fase futura. Nenhuma sessão foi realizada."
        />
      </Card>
    </>
  );
}
export function AdminDashboard() {
  return (
    <>
      <Heading
        eyebrow="ADMINISTRAÇÃO · FUNDAÇÃO VISUAL"
        title="Cuidado com supervisão."
        description="Conceito inicial de operações. Sem dados, permissões ou ações administrativas reais."
      />
      <div className="quick-grid">
        {["Revisão de identidade", "Relatos de segurança", "Supervisão humana"].map((t, i) => (
          <Card key={t}>
            <span className={`icon-tile ${["lavender", "blush", "mint"][i]}`}>
              <ShieldCheck size={22} />
            </span>
            <h3>{t}</h3>
            <Badge>Por implementar</Badge>
          </Card>
        ))}
      </div>
      <Card>
        <EmptyState
          title="Sem processos reais."
          text="Triagem, controlo de acessos, auditoria e gestão de incidentes serão definidos em fases posteriores."
        />
        <TextLink to="/app/seguranca">Ver componentes de segurança</TextLink>
      </Card>
    </>
  );
}
