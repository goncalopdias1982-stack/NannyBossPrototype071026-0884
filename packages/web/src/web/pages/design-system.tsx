import { useState } from "react";
import { ShieldCheck, TriangleAlert, Sparkles } from "lucide-react";
import {
  Heading,
  Card,
  Button,
  Badge,
  Avatar,
  Logo,
  Modal,
  Skeleton,
  EmptyState,
  ActionLink,
} from "../components/primitives";
import { usePrototype } from "../components/prototype-context";
export default function DesignSystem() {
  const [modal, setModal] = useState(false);
  const { setToast } = usePrototype();
  return (
    <>
      <Heading
        eyebrow="NANNYBOSS · UNIVERSO VISUAL 02"
        title="Presença, em cada dimensão."
        description="Uma linguagem imersiva de cuidado: profundidade, clareza e ligação humana."
        action={
          <ActionLink to="/app" variant="secondary">
            Voltar ao protótipo
          </ActionLink>
        }
      />
      <Card>
        <p className="eyebrow">IDENTIDADE · REFERÊNCIA RECONSTRUÍDA</p>
        <div className="identity-samples">
          <Logo />
          <div className="identity-dark">
            <Logo />
          </div>
          <div className="identity-compact">
            <Logo compact />
          </div>
          <img
            src="/brand/app-icon.svg"
            width="64"
            height="64"
            alt="Ícone da aplicação NannyBoss"
          />
        </div>
        <p className="muted">
          Símbolo azul/lilás reconstruído em SVG transparente a partir da referência fornecida.
          Aproximação vetorial, não o ficheiro original. Fotografias de banco de imagens apenas
          ilustrativas.
        </p>
      </Card>
      <Card>
        <h2>Paleta com propósito</h2>
        <div className="swatches">
          {[
            ["Lilac field", "#e3d7ee"],
            ["Lavender", "#eee7f5"],
            ["Sky", "#eaf2fc"],
            ["Mint", "#eaf5ee"],
            ["Blush", "#fbecef"],
            ["Off-white", "#f7f7fa"],
            ["Ink", "#292535"],
            ["Action", "#705086"],
          ].map(([n, c]) => (
            <div key={n}>
              <span style={{ background: c }} />
              <strong>{n}</strong>
              <small>{c}</small>
            </div>
          ))}
        </div>
      </Card>
      <div className="two-column">
        <Card>
          <h2>Tipografia e hierarquia</h2>
          <p className="eyebrow">SYSTEM DISPLAY · SYSTEM BODY</p>
          <h1>Cuidar. Sempre.</h1>
          <h2>Confiança em cada ligação.</h2>
          <h3>O cuidado começa antes da sessão.</h3>
          <p>Corpo legível, espaçamento generoso e hierarquia clara.</p>
          <small>Texto de apoio · nunca para esconder informação importante.</small>
        </Card>
        <Card>
          <h2>Ações e estados</h2>
          <div className="component-row">
            <Button onClick={() => setToast("Exemplo de confirmação visual.")}>
              Ação principal
            </Button>
            <Button variant="secondary" onClick={() => setModal(true)}>
              Ação secundária
            </Button>
            <Button variant="ghost" onClick={() => setToast("Ação discreta demonstrativa.")}>
              Discreta
            </Button>
            <Button disabled>Indisponível</Button>
          </div>
          <div className="component-row">
            <Badge tone="success">
              <ShieldCheck size={13} />
              Simulado
            </Badge>
            <Badge tone="danger">
              <TriangleAlert size={13} />
              Alerta · exemplo
            </Badge>
            <Badge>Pendente</Badge>
            <Avatar />
            <Avatar color="mint" initials="SA" />
          </div>
          <Button variant="secondary" onClick={() => setModal(true)}>
            Abrir modal acessível
          </Button>
        </Card>
      </div>
      <div className="two-column">
        <Card>
          <h2>Campos e feedback</h2>
          <label>
            Label de campo
            <input aria-label="Label de campo" placeholder="Informação fictícia" />
          </label>
          <label>
            Dropdown
            <select>
              <option>Opção ilustrativa</option>
              <option>Outra opção</option>
            </select>
          </label>
          <label>
            Estado de erro
            <input
              aria-label="Estado de erro"
              aria-invalid="true"
              aria-describedby="example-error"
              placeholder="Exemplo de campo inválido"
            />
          </label>
          <p id="example-error" className="form-error">
            Exemplo: reveja a informação introduzida.
          </p>
          <div className="notice sky">
            <Sparkles size={19} />
            <p>Alerta informativo, sem depender apenas da cor.</p>
          </div>
        </Card>
        <Card>
          <h2>Loading e estado vazio</h2>
          <Skeleton />
          <EmptyState
            title="Ainda sem elementos."
            text="Uma orientação clara para o próximo passo."
          />
        </Card>
      </div>
      <Card>
        <h2>Tokens e motion</h2>
        <p className="reading-text">
          Spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px. Radius: 12 / 18 / 24 / 32 px e pill.
          Glass: blur 18 px, camadas translúcidas e sombra suave. Motion: 180 ms para interação, 400
          ms para entrada; respeita prefers-reduced-motion.
        </p>
        <Badge>Alvos de toque ≥ 44px</Badge>
      </Card>
      <Card>
        <p className="eyebrow">O NOVO CENTRO DE CUIDADOS</p>
        <h2>Uma experiência ligada, não apenas decorada.</h2>
        <p className="reading-text">
          O tipo de cuidado e o dia escolhido na agenda acompanham o pedido, o resumo e a
          confirmação. A cena reage ao ponteiro e ao scroll, sem animações permanentes. Os perfis
          compactos aproximam a experiência mobile e desktop.
        </p>
        <ActionLink to="/app" variant="secondary">
          Explorar o centro de cuidados
        </ActionLink>
      </Card>
      <Card className="effects-catalogue">
        <p className="eyebrow">MOVIMENTO COM PROPÓSITO</p>
        <h2>O feedback acompanha o cuidado.</h2>
        <div className="effects-catalogue-grid">
          <div>
            <strong>Descobrir</strong>
            <p>
              Entradas suaves, camadas parallax, reflexos e reveals por scroll, sem fundos em
              movimento contínuo.
            </p>
            <ActionLink to="/" variant="secondary">
              Ver página inicial
            </ActionLink>
          </div>
          <div>
            <strong>Preparar</strong>
            <p>
              Pedido em três etapas, campos com feedback, resumo atualizado e confirmação com
              progresso demonstrativo.
            </p>
            <ActionLink to="/app/reserva" variant="secondary">
              Explorar pedido
            </ActionLink>
          </div>
          <div>
            <strong>Conversar</strong>
            <p>
              Mensagens com entrada discreta. Assistente apresenta texto pré-escrito, com opção de
              mostrar tudo imediatamente.
            </p>
            <ActionLink to="/app/assistente" variant="secondary">
              Explorar assistente
            </ActionLink>
          </div>
        </div>
        <p className="muted">
          A preferência do dispositivo por movimento reduzido remove deslocações e apresentação
          progressiva. Sem som automático, 3D ornamental ou serviços reais.
        </p>
      </Card>
      {modal && (
        <Modal title="Uma superfície, um propósito." onClose={() => setModal(false)}>
          <p className="muted">
            Modal com foco inicial, contenção de foco, tecla Escape e retorno ao elemento de origem.
          </p>
          <Button onClick={() => setModal(false)}>Fechar demonstração</Button>
        </Modal>
      )}
    </>
  );
}
