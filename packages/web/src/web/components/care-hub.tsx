import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sun,
  MoonStar,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { usePrototype } from "./prototype-context";
import { useParallax } from "./use-parallax";
import { useArrival, SelectionHighlight } from "./effects";
import { ActionLink, Card, TextLink } from "./primitives";

export const careTypes = [
  {
    name: "Cuidado pontual",
    short: "Um momento",
    text: "Uma pausa no dia. Uma presença atenta para preparar em conjunto.",
    icon: Sun,
  },
  {
    name: "Cuidado ao serão",
    short: "Um serão",
    text: "Tempo para si, com a rotina do serão alinhada entre adultos.",
    icon: MoonStar,
  },
  {
    name: "Apoio à rotina",
    short: "A rotina",
    text: "Organizar atividades e transições, respeitando o tempo de cada criança.",
    icon: BookOpen,
  },
  {
    name: "Cuidado regular",
    short: "Continuidade",
    text: "Explorar uma relação de continuidade. Sem agendamento recorrente real.",
    icon: HeartHandshake,
  },
];

export function CareHub() {
  const { displayName, booking, setBooking } = usePrototype();
  const scene = useParallax<HTMLDivElement>();
  const arrival = useArrival();
  const selected = careTypes.find((t) => t.name === booking.service) ?? careTypes[0]!;
  return (
    <>
      <section className="care-hub" aria-labelledby="care-hub-title">
        <div className="hub-copy">
          <p className="hub-kicker">
            <span /> O SEU UNIVERSO DE CUIDADO
          </p>
          <h1 id="care-hub-title">Olá, {displayName}.</h1>
          <h2>
            Mais presença.
            <br />
            <span>Mais possibilidades.</span>
          </h2>
          <p className="hub-description">
            O seu tempo, a sua família, o cuidado certo.
            <br />
            Tudo começa com uma boa ligação.
          </p>
          <div className="hub-actions">
            <ActionLink to="/app/reserva">
              Novo pedido de cuidado <ArrowUpRight size={19} />
            </ActionLink>
            <TextLink to="/app/babysitters">Conhecer pessoas</TextLink>
          </div>
          <span className="hub-demo">Experiência demonstrativa · decisões sempre humanas</span>
        </div>
        <div className="hub-scene" ref={scene}>
          <div className="hub-orbit orbit-a" aria-hidden="true" />
          <div className="hub-orbit orbit-b" aria-hidden="true" />
          <div className="hub-orbit orbit-c" aria-hidden="true" />
          <span className="scene-coordinate coordinate-top" aria-hidden="true">
            01 / PRESENÇA
          </span>
          <figure className="hub-portrait">
            <img
              src="/images/care-quiet.webp"
              alt="Adulto e criança a partilhar a leitura; imagem editorial"
              width="1000"
              height="733"
              fetchPriority="high"
            />
          </figure>
          <div className="hub-float human-float">
            <span>
              <HeartHandshake size={21} />
            </span>
            <div>
              <small>NO CENTRO DE TUDO</small>
              <strong>A ligação humana.</strong>
            </div>
          </div>
          <div className="hub-float safety-float">
            <ShieldCheck size={20} />
            <span>Child first. Always.</span>
          </div>
          <span className="scene-coordinate coordinate-bottom" aria-hidden="true">
            CUIDADO × CONFIANÇA
          </span>
        </div>
      </section>
      <section className="care-discovery" aria-labelledby="care-discovery-title">
        <div className="discovery-heading">
          <div>
            <p className="eyebrow">À MEDIDA DO SEU DIA</p>
            <h2 id="care-discovery-title">Que cuidado vamos preparar?</h2>
          </div>
          <span className="discovery-caption">Escolha um ponto de partida.</span>
        </div>
        <div className="care-types" aria-label="Tipo de cuidado demonstrativo">
          {careTypes.map((t) => (
            <button
              key={t.name}
              type="button"
              aria-pressed={booking.service === t.name}
              onClick={() => setBooking({ ...booking, service: t.name })}
              className={booking.service === t.name ? "chosen" : ""}
            >
              {booking.service === t.name && <SelectionHighlight group="care-type" />}
              <span className="care-type-icon">
                <t.icon size={24} />
              </span>
              <span>
                <small>{t.short}</small>
                <strong>{t.name}</strong>
              </span>
              <ArrowUpRight className="type-arrow" size={17} />
            </button>
          ))}
        </div>
        <div className="care-type-detail">
          <motion.p key={selected.name} {...arrival}>
            {selected.text}
          </motion.p>
          <TextLink to="/app/reserva">Preparar este exemplo</TextLink>
        </div>
      </section>
    </>
  );
}

function dateKey(date: Date) {
  const y = date.getFullYear();
  return `${y}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function CareAgenda() {
  const { booking, setBooking } = usePrototype();
  const [offset, setOffset] = useState(0);
  const anchor = new Date((booking.date || "2026-10-10") + "T12:00:00");
  const first = new Date(anchor);
  first.setDate(first.getDate() - ((first.getDay() + 6) % 7) + offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(first);
    day.setDate(first.getDate() + i);
    return day;
  });
  return (
    <Card className="care-agenda">
      <div className="section-head">
        <div>
          <p className="eyebrow">ESPAÇO PARA O QUE IMPORTA</p>
          <h2>A sua agenda.</h2>
        </div>
        <span className="agenda-icon">
          <CalendarDays size={23} />
        </span>
      </div>
      <div className="agenda-month">
        <strong>{first.toLocaleDateString("pt-PT", { month: "long", year: "numeric" })}</strong>
        <div>
          <button
            className="icon-button"
            aria-label="Semana anterior"
            onClick={() => setOffset(offset - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="icon-button"
            aria-label="Semana seguinte"
            onClick={() => setOffset(offset + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="agenda-days" aria-label="Escolher data do exemplo">
        {days.map((day) => (
          <button
            key={dateKey(day)}
            className={booking.date === dateKey(day) ? "selected" : ""}
            aria-label={`Escolher ${day.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })}`}
            aria-pressed={booking.date === dateKey(day)}
            onClick={() => {
              setBooking({ ...booking, date: dateKey(day) });
              setOffset(0);
            }}
          >
            {booking.date === dateKey(day) && <SelectionHighlight group="agenda-day" />}
            <small>{day.toLocaleDateString("pt-PT", { weekday: "short" }).replace(".", "")}</small>
            <strong>{day.getDate()}</strong>
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="agenda-plan">
        <span className="agenda-plan-line" />
        <div>
          <small>NO SEU EXEMPLO</small>
          <strong>{booking.service}</strong>
          <p>
            {booking.date || "Data por definir"} · {booking.start} — {booking.end}
          </p>
        </div>
        <TextLink to="/app/reserva">
          <span className="sr-only">Rever pedido da agenda</span>
        </TextLink>
      </div>
      <p className="agenda-disclaimer">
        Selecionar um dia atualiza o exemplo. Não verifica disponibilidade nem cria uma reserva.
      </p>
      <TextLink to="/app/mensagens">
        <Sparkles size={15} /> Alinhar a próxima conversa
      </TextLink>
    </Card>
  );
}
