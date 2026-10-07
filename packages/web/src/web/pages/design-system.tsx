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
        eyebrow="NANNYBOSS · FUNDAÇÃO VISUAL 01"
        title="Calma por natureza."
        description="Uma linguagem consistente de cuidado, confiança e proteção."
        action={
          <ActionLink to="/app" variant="secondary">
            Voltar ao protótipo
          </ActionLink>
        }
      />
      <Card>
        <p className="eyebrow">IDENTIDADE ORIGINAL</p>
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
        <p className="muted">Proteção e ligação. Símbolo abstrato, monocromático e adaptável.</p>
      </Card>
      <Card>
        <h2>Paleta com propósito</h2>
        <div className="swatches">
          {[
            ["Lavender", "#e8e3f6"],
            ["Sky", "#e4effb"],
            ["Mint", "#e0f0e8"],
            ["Blush", "#f7e7e9"],
            ["Off-white", "#f8f9fc"],
            ["Ink", "#202633"],
            ["Action", "#2364c5"],
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
