import { useState } from "react";
import {
  ShieldCheck,
  Fingerprint,
  FileCheck2,
  HeartHandshake,
  LockKeyhole,
  Clock3,
  TriangleAlert,
  CircleCheck,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Heading, Card, Badge, Button, Modal, ActionLink } from "../components/primitives";
import { usePrototype } from "../components/prototype-context";
export function Safety() {
  const [modal, setModal] = useState<string | null>(null);
  const items = [
    {
      title: "Conta",
      icon: CircleCheck,
      status: "Simulado",
      tone: "success",
      text: "Estado ilustrativo da revisão da conta.",
    },
    {
      title: "Identidade",
      icon: Fingerprint,
      status: "Simulado",
      tone: "success",
      text: "Nenhum documento ou identidade foi verificado.",
    },
    {
      title: "Documento",
      icon: FileCheck2,
      status: "Simulado",
      tone: "success",
      text: "Nenhum documento foi carregado ou analisado.",
    },
    {
      title: "Seguro",
      icon: ShieldCheck,
      status: "Pendente · mock",
      tone: "neutral",
      text: "Coberturas e critérios ainda não definidos.",
    },
    {
      title: "Competência",
      icon: HeartHandshake,
      status: "Simulado",
      tone: "success",
      text: "Não constitui certificação profissional.",
    },
  ];
  return (
    <>
      <Heading
        eyebrow="SEGURANÇA VISÍVEL. CONFIANÇA INFORMADA."
        title="Confiança e segurança"
        description="A nossa filosofia é real. Os estados e mecanismos abaixo são apenas conceitos visuais."
      />
      <div className="safety-manifesto">
        <ShieldCheck size={45} strokeWidth={1.4} />
        <div>
          <h2>Child first. Always.</h2>
          <p>A segurança e o superior interesse da criança orientam cada decisão de experiência.</p>
        </div>
        <Badge tone="glass">PRINCÍPIO NANNYBOSS</Badge>
      </div>
      <div className="section-title compact">
        <h2>Verificações transparentes.</h2>
        <Badge>Todos os estados são MOCK</Badge>
      </div>
      <div className="safety-grid">
        {items.map((i) => (
          <Card key={i.title}>
            <span className="icon-tile lavender">
              <i.icon size={24} />
            </span>
            <h3>{i.title}</h3>
            <Badge tone={i.tone}>{i.status}</Badge>
            <p className="muted">{i.text}</p>
            <button className="text-link" onClick={() => setModal(i.title)}>
              Sobre este estado
              <ArrowRight size={14} />
            </button>
          </Card>
        ))}
      </div>
      <div className="two-column">
        <Card>
          <div className="section-head">
            <h2>Acesso com propósito</h2>
            <LockKeyhole size={23} />
          </div>
          <p className="muted">
            Conceito JIT: acesso mínimo, autorizado e limitado ao tempo necessário para prestar
            cuidados.
          </p>
          <div className="status-row">
            <Clock3 size={20} />
            <span>Acesso temporário</span>
            <Badge>Inativo · mock</Badge>
          </div>
          <div className="status-row">
            <Activity size={20} />
            <span>Sessão de cuidado</span>
            <Badge>Não iniciada · mock</Badge>
          </div>
          <Button variant="secondary" onClick={() => setModal("Sessão de cuidado")}>
            Ver conceito de sessão
          </Button>
        </Card>
        <Card>
          <div className="section-head">
            <h2>Quando algo preocupa</h2>
            <TriangleAlert size={23} />
          </div>
          <p className="muted">
            O reporte de alertas e incidentes será definido com procedimentos humanos e validação
            adequada.
          </p>
          <div className="notice blush">
            <TriangleAlert size={20} />
            <p>
              Este protótipo não recebe nem monitoriza incidentes. Em emergência real, contacte o
              112.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setModal("Alertas e incidentes")}>
            Ver conceito de reporte
          </Button>
        </Card>
      </div>
      <Card>
        <h2>Informação, não promessas.</h2>
        <p className="reading-text">
          Os indicadores apoiam uma escolha informada. Não garantem a segurança de uma pessoa ou
          sessão. Critérios de verificação, privacidade, autorizações, seguro e enquadramento
          jurídico ainda exigem definição e validação.
        </p>
      </Card>
      {modal && (
        <Modal title={modal} onClose={() => setModal(null)}>
          {modal === "Sessão de cuidado" ? (
            <>
              <div className="notice mint">
                <Activity size={22} />
                <div>
                  <strong>Exemplo de sessão ativa · MOCK</strong>
                  <p>
                    Acesso JIT ilustrativo: 17:00 — 20:00. Nenhuma sessão ou permissão real está
                    ativa.
                  </p>
                </div>
              </div>
              <Badge tone="success">Estado de segurança · exemplo</Badge>
            </>
          ) : modal === "Alertas e incidentes" ? (
            <>
              <div className="notice blush">
                <TriangleAlert size={23} />
                <div>
                  <strong>Reporte indisponível</strong>
                  <p>
                    Nenhum relato é recolhido ou transmitido. Não use a demonstração para pedir
                    ajuda.
                  </p>
                </div>
              </div>
              <Badge tone="danger">Incidente · estado ilustrativo</Badge>
            </>
          ) : (
            <>
              <p className="muted">
                Este componente mostra como o estado de {modal.toLowerCase()} poderá ser
                apresentado. Não representa uma verificação, certificação ou garantia real.
              </p>
              <Badge tone="success">Revisto · apenas exemplo</Badge>
            </>
          )}
          <p className="fine-print">
            A definição operacional destes mecanismos pertence a fases futuras.
          </p>
        </Modal>
      )}
    </>
  );
}
export function Settings() {
  const { setToast } = usePrototype();
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [name, setName] = useState("Mariana · exemplo");
  return (
    <>
      <Heading
        eyebrow="O SEU ESPAÇO. AS SUAS PREFERÊNCIAS."
        title="Definições"
        description="Preferências demonstrativas, sem persistência ou alteração de conta real."
      />
      <div className="two-column">
        <Card>
          <h2>Perfil de demonstração</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setToast("Preferências demonstrativas atualizadas apenas nesta sessão.");
            }}
          >
            <label>
              Nome ilustrativo
              <input
                aria-label="Nome ilustrativo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={80}
              />
            </label>
            <label>
              Idioma
              <select defaultValue="pt">
                <option value="pt">Português (Portugal)</option>
              </select>
            </label>
            <div className="notice sky">
              <LockKeyhole size={19} />
              <p>Não introduza dados pessoais reais. Não é criada uma conta.</p>
            </div>
            <Button type="submit">Guardar preferências · simulação</Button>
          </form>
        </Card>
        <Card>
          <h2>Notificações</h2>
          <p className="muted">Controlos de exemplo. Nenhuma notificação é enviada.</p>
          {[
            {
              title: "Atualizações de cuidados",
              text: "Informação sobre pedidos e preparação.",
              value: notifications,
              set: setNotifications,
            },
            {
              title: "Lembretes de preparação",
              text: "Uma rotina mais organizada.",
              value: reminders,
              set: setReminders,
            },
          ].map((o) => (
            <div className="preference" key={o.title}>
              <div>
                <strong>{o.title}</strong>
                <p>{o.text}</p>
              </div>
              <button
                className={`toggle ${o.value ? "on" : ""}`}
                role="switch"
                aria-checked={o.value}
                aria-label={o.title}
                onClick={() => o.set(!o.value)}
              >
                <span />
              </button>
            </div>
          ))}
          <hr />
          <h3>Acessibilidade</h3>
          <p className="muted">
            O movimento reduzido segue a preferência do dispositivo. Navegação por teclado e foco
            visível disponíveis.
          </p>
        </Card>
      </div>
      <Card>
        <h2>Dados e privacidade</h2>
        <p className="reading-text">
          O protótipo utiliza dados sintéticos e estado em memória. Atualizar a página repõe as
          mensagens, favoritos e preferências. O módulo de analytics padrão da plataforma permanece
          na infraestrutura; a política de privacidade definitiva ainda não foi implementada.
        </p>
        <ActionLink to="/app/seguranca" variant="secondary">
          Conhecer os princípios de segurança
          <ArrowRight size={15} />
        </ActionLink>
      </Card>
      <Card>
        <h2>Fundação visual</h2>
        <p className="muted">Tokens e componentes preparados para a expansão futura.</p>
        <ActionLink to="/design-system" variant="secondary">
          Explorar Design System
          <ArrowRight size={15} />
        </ActionLink>
      </Card>
    </>
  );
}
