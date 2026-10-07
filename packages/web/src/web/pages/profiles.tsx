import { useState } from "react";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  HeartHandshake,
  LockKeyhole,
  Clock3,
  Check,
  ArrowRight,
  Phone,
  Plus,
} from "lucide-react";
import { caregivers } from "../data/mock";
import {
  Heading,
  Card,
  Badge,
  Avatar,
  ActionLink,
  Button,
  Modal,
  SafetyBadge,
  TextLink,
  EmptyState,
} from "../components/primitives";
import { CaregiverCard } from "../components/caregiver-card";
import { usePrototype } from "../components/prototype-context";
export function CaregiverList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [skill, setSkill] = useState("Todos");
  const [onlySaved, setOnlySaved] = useState(false);
  const { saved } = usePrototype();
  const people = caregivers.filter(
    (p) =>
      `${p.name} ${p.location} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()) &&
      (skill === "Todos" || p.tags.includes(skill)) &&
      (!onlySaved || saved.includes(p.id)),
  );
  return (
    <>
      <Heading
        eyebrow="UMA BOA LIGAÇÃO COMEÇA AQUI."
        title="Pessoas que cuidam."
        description="Explore perfis demonstrativos. A escolha de cuidado exige avaliação humana."
      />
      <div className="search-toolbar">
        <label className="search-field">
          <Search size={19} />
          <span className="sr-only">Pesquisar nome, zona ou competência</span>
          <input
            aria-label="Pesquisar nome, zona ou competência"
            placeholder="Nome, zona ou competência"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <Button variant="secondary" onClick={() => setFilter(true)}>
          <SlidersHorizontal size={17} />
          Filtros{skill !== "Todos" && " · 1"}
        </Button>
      </div>
      <div className="section-head">
        <p className="muted">{people.length} perfis fictícios · Lisboa</p>
        <div className="segmented" aria-label="Tipo de lista">
          <button
            aria-pressed={!onlySaved}
            className={!onlySaved ? "active" : ""}
            onClick={() => setOnlySaved(false)}
          >
            Todos
          </button>
          <button
            aria-pressed={onlySaved}
            className={onlySaved ? "active" : ""}
            onClick={() => setOnlySaved(true)}
          >
            Guardados ({saved.length})
          </button>
        </div>
      </div>
      {people.length ? (
        <div className="caregiver-grid">
          {people.map((p) => (
            <CaregiverCard person={p} key={p.id} />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            title="Sem perfis nesta seleção."
            text="Experimente outro termo ou remova os filtros."
          >
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setSkill("Todos");
                setOnlySaved(false);
              }}
            >
              Limpar pesquisa
            </Button>
          </EmptyState>
        </Card>
      )}
      <p className="fine-print">
        Preços, experiência e verificações são apenas exemplos. Não é possível contratar
        profissionais reais.
      </p>
      {filter && (
        <Modal title="Encontrar uma boa ligação" onClose={() => setFilter(false)}>
          <label>
            Competências ilustrativas
            <select value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option>Todos</option>
              <option>Primeiros socorros</option>
              <option>Rotinas de sono</option>
              <option>Atividades criativas</option>
            </select>
          </label>
          <p className="muted">As competências são fictícias e não foram verificadas.</p>
          <Button onClick={() => setFilter(false)}>Aplicar filtros</Button>
        </Modal>
      )}
    </>
  );
}
export function CaregiverProfile({ id }: { id: string }) {
  const person = caregivers.find((p) => p.id === id);
  const { setBooking, booking, role, setToast } = usePrototype();
  if (!person)
    return (
      <Card>
        <EmptyState title="Perfil não encontrado" text="Este perfil não faz parte da demonstração.">
          <ActionLink to="/app/babysitters">Voltar aos perfis</ActionLink>
        </EmptyState>
      </Card>
    );
  return (
    <>
      <TextLink to="/app/babysitters">Todos os perfis</TextLink>
      <div className={`profile-hero ${person.color}`}>
        <div className="profile-person">
          <Avatar large initials={person.initials} color={person.color} />
          <div>
            <Badge tone="glass">PERFIL FICTÍCIO</Badge>
            <h1>{person.name}</h1>
            <p>
              <MapPin size={15} />
              {person.location}
            </p>
            <SafetyBadge />
          </div>
        </div>
        <div className="profile-rate">
          <strong>
            {person.rate}€<small> / hora*</small>
          </strong>
          {role === "babysitter" ? (
            <Button
              onClick={() =>
                setToast("Edição profissional não implementada. Este perfil é fictício.")
              }
            >
              Editar perfil · conceito
            </Button>
          ) : (
            <ActionLink
              to="/app/reserva"
              onClick={() => setBooking({ ...booking, caregiver: person.id })}
            >
              Preparar um pedido
              <ArrowRight size={16} />
            </ActionLink>
          )}
        </div>
      </div>
      <div className="profile-columns">
        <div>
          <Card>
            <p className="eyebrow">UMA PRESENÇA, UM PROPÓSITO.</p>
            <h2>{person.title}</h2>
            <p className="reading-text">{person.bio}</p>
            <div className="tag-row">
              {person.tags.map((t) => (
                <Badge key={t}>{t} · exemplo</Badge>
              ))}
            </div>
          </Card>
          <Card>
            <h2>Abordagem ao cuidado</h2>
            <div className="detail-list">
              <div>
                <HeartHandshake size={21} />
                <section>
                  <h3>Respeitar cada criança</h3>
                  <p>Presença atenta, autonomia e linguagem respeitosa.</p>
                </section>
              </div>
              <div>
                <Clock3 size={21} />
                <section>
                  <h3>Preparar a rotina</h3>
                  <p>Alinhar necessidades de cuidados antes de cada sessão.</p>
                </section>
              </div>
              <div>
                <ShieldCheck size={21} />
                <section>
                  <h3>Comunicar com clareza</h3>
                  <p>Manter os responsáveis informados e rever procedimentos.</p>
                </section>
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <h2>Confiança transparente</h2>
          <p className="muted">Nenhuma verificação é real.</p>
          {["Conta", "Identidade", "Documento", "Competência"].map((t) => (
            <div className="status-row" key={t}>
              <Check size={17} />
              <span>{t}</span>
              <Badge tone="success">Simulado</Badge>
            </div>
          ))}
          <div className="status-row">
            <Clock3 size={17} />
            <span>Seguro</span>
            <Badge>Pendente · mock</Badge>
          </div>
          <TextLink to="/app/seguranca">O que significam estes estados</TextLink>
          <div className="notice sky">
            <LockKeyhole size={20} />
            <p>
              Informação de cuidados apenas com autorização e acesso temporário. Conceito futuro.
            </p>
          </div>
        </Card>
      </div>
      <p className="fine-print">
        *Preço indicativo fictício. Não existe contratação ou pagamento nesta fase.
      </p>
    </>
  );
}
export function ChildProfile() {
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("Necessidades de cuidados");
  const { setToast } = usePrototype();
  return (
    <>
      <Heading
        eyebrow="INFORMAÇÃO PARA CUIDAR, NÃO PARA EXPOR."
        title="Perfil de cuidados"
        description="Exemplo sintético. Nunca introduza informação real de uma criança neste protótipo."
        action={
          <Button variant="secondary" onClick={() => setEditing(true)}>
            Editar exemplo
          </Button>
        }
      />
      <div className="notice sky">
        <LockKeyhole size={20} />
        <div>
          <strong>Privacidade por princípio</strong>
          <p>
            A informação sensível não é pública. O controlo de acessos ainda não está implementado.
          </p>
        </div>
      </div>
      <div className="child-summary card">
        <span className="icon-tile lavender">
          <HeartHandshake size={26} />
        </span>
        <div>
          <h2>Perfil A</h2>
          <p className="muted">Exemplo de cuidados · sem identificação de uma criança</p>
        </div>
        <Badge>Dados sintéticos</Badge>
      </div>
      <div className="segmented tabs" role="tablist" aria-label="Informação de cuidados">
        {["Necessidades de cuidados", "Rotina", "Contactos autorizados", "Emergência"].map((t) => (
          <button
            key={t}
            id={`care-tab-${t.replaceAll(" ", "-")}`}
            role="tab"
            aria-selected={tab === t}
            aria-controls="care-panel"
            tabIndex={tab === t ? 0 : -1}
            onKeyDown={(event) => {
              const values = [
                "Necessidades de cuidados",
                "Rotina",
                "Contactos autorizados",
                "Emergência",
              ];
              const current = values.indexOf(t);
              let next = current;
              if (event.key === "ArrowRight") next = (current + 1) % values.length;
              else if (event.key === "ArrowLeft")
                next = (current + values.length - 1) % values.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = values.length - 1;
              else return;
              event.preventDefault();
              const selected = values[next]!;
              setTab(selected);
              document.getElementById(`care-tab-${selected.replaceAll(" ", "-")}`)?.focus();
            }}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <Card>
        <div
          id="care-panel"
          role="tabpanel"
          aria-labelledby={`care-tab-${tab.replaceAll(" ", "-")}`}
        >
          {tab === "Necessidades de cuidados" ? (
            <>
              <h2>O que importa saber</h2>
              <p className="muted">Informação mínima, relevante para a sessão.</p>
              <div className="detail-list">
                <div>
                  <HeartHandshake />
                  <section>
                    <h3>Preferências de cuidado</h3>
                    <p>Ambiente calmo e transições antecipadas · exemplo.</p>
                  </section>
                </div>
                <div>
                  <ShieldCheck />
                  <section>
                    <h3>Informação importante</h3>
                    <p>Dados de saúde e alergias não são recolhidos nesta fase.</p>
                  </section>
                </div>
              </div>
            </>
          ) : tab === "Rotina" ? (
            <>
              <h2>Uma rotina com previsibilidade</h2>
              <div className="timeline">
                {[
                  ["17:00", "Acolhimento", "Alinhar o início da sessão com o responsável."],
                  ["18:00", "Tempo tranquilo", "Atividades adequadas à rotina acordada."],
                  ["19:30", "Preparar o fim do dia", "Transição de cuidados com a família."],
                ].map(([time, title, text]) => (
                  <div key={time}>
                    <span>{time}</span>
                    <section>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </section>
                  </div>
                ))}
              </div>
            </>
          ) : tab === "Contactos autorizados" ? (
            <>
              <h2>Pessoas autorizadas</h2>
              <div className="person-row">
                <Avatar initials="RF" color="blush" />
                <div>
                  <strong>Responsável fictício</strong>
                  <small>Contacto não fornecido · sem números reais</small>
                </div>
                <Phone size={19} />
              </div>
              <Button
                variant="secondary"
                onClick={() => setToast("Gestão de contactos apenas conceptual nesta fase.")}
              >
                <Plus size={16} />
                Adicionar contacto · conceito
              </Button>
            </>
          ) : (
            <>
              <h2>Procedimentos de emergência</h2>
              <div className="notice blush">
                <ShieldCheck />
                <p>
                  Em caso de emergência real, contacte o 112. Este protótipo não oferece resposta de
                  emergência.
                </p>
              </div>
              <p className="muted">
                O plano de emergência específico, autorizações e protocolos serão definidos e
                validados numa fase posterior.
              </p>
              <Badge>Requer validação humana e jurídica</Badge>
            </>
          )}
        </div>
      </Card>
      {editing && (
        <Modal title="Editar informação ilustrativa" onClose={() => setEditing(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditing(false);
              setToast("Edição simulada. Nenhum dado de cuidados foi guardado.");
            }}
          >
            <label>
              Preferência de exemplo
              <textarea
                aria-label="Preferência de exemplo"
                placeholder="Use apenas dados fictícios"
                required
              />
            </label>
            <p className="fine-print">A edição é demonstrativa, sem gravação ou envio.</p>
            <Button type="submit">Simular gravação</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
