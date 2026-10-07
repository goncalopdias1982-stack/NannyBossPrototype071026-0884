import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Pencil,
  LockKeyhole,
} from "lucide-react";
import { caregivers } from "../data/mock";
import { usePrototype } from "./prototype-context";
import { Card, Avatar, Button, Heading, TextLink } from "./primitives";
import { StepProgress, useArrival } from "./effects";
import { careTypes } from "./care-hub";

export function BookingWizard() {
  const { booking, setBooking, setConfirmed } = usePrototype();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);
  const arrival = useArrival();
  const person = caregivers.find((p) => p.id === booking.caregiver) ?? caregivers[0]!;
  const minutes = (time: string) => {
    if (!/^\d{2}:\d{2}$/.test(time)) return NaN;
    const [h, m] = time.split(":").map(Number);
    return h! * 60 + m!;
  };
  const duration = (minutes(booking.end) - minutes(booking.start)) / 60;
  const hours = Number.isFinite(duration) ? Math.max(0, duration) : 0;
  const dateError = !booking.date ? "Escolha uma data para o exemplo." : "";
  const timeError =
    !booking.start || !booking.end
      ? "Preencha as duas horas."
      : !Number.isFinite(duration) || duration <= 0
        ? "A hora de fim deve ser posterior à hora de início."
        : "";
  const date = booking.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Data por definir";
  function go(next: number) {
    setError("");
    setStep(next);
  }
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    const frame = requestAnimationFrame(() => heading.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [step]);
  const titles = ["Quando e com quem?", "O cuidado começa na conversa.", "Tudo pronto para rever."];
  return (
    <>
      <Heading
        eyebrow="UM CUIDADO BEM PREPARADO."
        title="Preparar pedido de cuidado"
        description="Três passos simples. Este pedido é apenas uma simulação."
      />
      <div className="booking-grid booking-wizard">
        <Card className="wizard-card">
          <StepProgress step={step} onSelect={go} />
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (step === 0) {
                setTouched(true);
                if (dateError || timeError) {
                  setError(dateError || timeError);
                  requestAnimationFrame(() =>
                    document.getElementById(dateError ? "booking-date" : "booking-end")?.focus(),
                  );
                  return;
                }
                go(1);
              } else if (step === 1) go(2);
              else {
                if (dateError || timeError) {
                  go(0);
                  setTouched(true);
                  setError(dateError || timeError);
                  return;
                }
                if (!accepted) {
                  setError("Confirme que compreende o caráter demonstrativo do pedido.");
                  requestAnimationFrame(() => document.getElementById("booking-accept")?.focus());
                  return;
                }
                setConfirmed(true);
                navigate("/app/confirmacao");
              }
            }}
          >
            <motion.div key={step} className="wizard-panel" {...arrival}>
              <h2 ref={heading} tabIndex={-1}>
                {titles[step]}
              </h2>
              <p className="wizard-description">
                {step === 0
                  ? "Escolha um perfil e organize o horário do exemplo."
                  : step === 1
                    ? "Deixe apenas uma nota fictícia para preparar os detalhes."
                    : "Confira o resumo. Nenhum pedido será enviado."}
              </p>
              {step === 0 ? (
                <div className="wizard-fields">
                  <label>
                    Tipo de cuidado
                    <select
                      aria-label="Tipo de cuidado"
                      value={booking.service}
                      onChange={(e) => {
                        setBooking({ ...booking, service: e.target.value });
                        setAccepted(false);
                      }}
                    >
                      {careTypes.map((type) => (
                        <option key={type.name}>{type.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Babysitter
                    <select
                      aria-label="Babysitter"
                      value={booking.caregiver}
                      onChange={(e) => {
                        setBooking({ ...booking, caregiver: e.target.value });
                        setAccepted(false);
                      }}
                    >
                      {caregivers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Data do exemplo
                    <input
                      id="booking-date"
                      type="date"
                      aria-label="Data do exemplo"
                      required
                      value={booking.date}
                      aria-invalid={touched && !!dateError}
                      aria-describedby={touched && dateError ? "booking-date-error" : undefined}
                      onChange={(e) => {
                        setTouched(true);
                        setBooking({ ...booking, date: e.target.value });
                        setAccepted(false);
                        setError("");
                      }}
                    />
                  </label>
                  {touched && dateError && (
                    <p className="form-error" id="booking-date-error">
                      {dateError}
                    </p>
                  )}
                  <div className="form-row">
                    <label>
                      Hora de início
                      <input
                        type="time"
                        aria-label="Hora de início"
                        required
                        value={booking.start}
                        aria-invalid={touched && !!timeError}
                        aria-describedby={touched && timeError ? "booking-time-error" : undefined}
                        onChange={(e) => {
                          setTouched(true);
                          setBooking({ ...booking, start: e.target.value });
                          setAccepted(false);
                          setError("");
                        }}
                      />
                    </label>
                    <label>
                      Hora de fim
                      <input
                        id="booking-end"
                        type="time"
                        aria-label="Hora de fim"
                        required
                        value={booking.end}
                        aria-invalid={touched && !!timeError}
                        aria-describedby={touched && timeError ? "booking-time-error" : undefined}
                        onChange={(e) => {
                          setTouched(true);
                          setBooking({ ...booking, end: e.target.value });
                          setAccepted(false);
                          setError("");
                        }}
                      />
                    </label>
                  </div>
                  {touched && timeError && (
                    <p className="form-error" id="booking-time-error">
                      {timeError}
                    </p>
                  )}
                  {touched && !dateError && !timeError && (
                    <p className="field-feedback">
                      <ShieldCheck size={15} />
                      Horário coerente para o exemplo. Disponibilidade não verificada.
                    </p>
                  )}
                </div>
              ) : step === 1 ? (
                <div className="wizard-fields">
                  <div className="notice sky">
                    <LockKeyhole size={20} />
                    <p>
                      Não inclua dados de saúde, moradas, contactos ou informação real de crianças.
                    </p>
                  </div>
                  <label>
                    Informação para preparar a conversa
                    <textarea
                      aria-label="Informação para preparar a conversa"
                      value={booking.notes}
                      maxLength={500}
                      onChange={(e) => {
                        setBooking({ ...booking, notes: e.target.value });
                        setAccepted(false);
                      }}
                      placeholder="Exemplo: alinhar a rotina e a transição de cuidados."
                    />
                  </label>
                  <p className="character-count">
                    Opcional · {booking.notes.length}/500 caracteres
                  </p>
                  <div className="preparation-points">
                    <strong>Uma boa conversa pode alinhar:</strong>
                    <ul>
                      <li>Rotina e expectativas dos adultos responsáveis</li>
                      <li>Comunicação e transição de responsabilidades</li>
                      <li>Procedimentos e contactos autorizados</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="wizard-fields">
                  <div className="review-details">
                    <div>
                      <span>Tipo de cuidado · exemplo</span>
                      <strong>{booking.service}</strong>
                    </div>
                    <div>
                      <span>Perfil escolhido</span>
                      <strong>{person.name}</strong>
                    </div>
                    <div>
                      <span>Data e horário</span>
                      <strong>
                        {date}
                        <br />
                        {booking.start} — {booking.end}
                      </strong>
                    </div>
                    <div>
                      <span>Nota para conversar</span>
                      <p>
                        {booking.notes || "Sem nota. Os detalhes podem ser alinhados na conversa."}
                      </p>
                    </div>
                    <Button type="button" variant="ghost" onClick={() => go(0)}>
                      <Pencil size={15} />
                      Editar detalhes
                    </Button>
                  </div>
                  <label className="checkbox-label">
                    <input
                      id="booking-accept"
                      type="checkbox"
                      aria-label="Compreendo que esta é uma simulação"
                      checked={accepted}
                      aria-invalid={!!error && !accepted}
                      aria-describedby={error ? "wizard-error" : undefined}
                      onChange={(e) => {
                        setAccepted(e.target.checked);
                        setError("");
                      }}
                    />
                    <span>
                      Compreendo que esta é uma simulação, sem reserva, verificação ou pagamento
                      real.
                    </span>
                  </label>
                </div>
              )}
            </motion.div>
            {error && (
              <motion.p
                id="wizard-error"
                className="form-error wizard-error"
                role="alert"
                {...arrival}
              >
                {error}
              </motion.p>
            )}
            <div className="wizard-actions">
              {step > 0 && (
                <Button type="button" variant="ghost" onClick={() => go(step - 1)}>
                  <ArrowLeft size={16} />
                  Anterior
                </Button>
              )}
              <Button type="submit">
                {step === 0
                  ? "Continuar para preparação"
                  : step === 1
                    ? "Rever pedido"
                    : "Simular pedido"}
                <ArrowRight size={16} />
              </Button>
            </div>
            <p className="wizard-memory">
              Apenas nesta sessão. Atualizar a página repõe o exemplo.
            </p>
          </form>
        </Card>
        <div className="wizard-aside">
          <Card className="booking-summary">
            <p className="eyebrow">O SEU CUIDADO, EM RESUMO</p>
            <p className="care-service-label">{booking.service} · exemplo</p>
            <div className="person-row">
              <Avatar initials={person.initials} color={person.color} />
              <div>
                <strong>{person.name}</strong>
                <small>{person.location}</small>
              </div>
            </div>
            <div className="status-row">
              <CalendarDays size={18} />
              <span>{date}</span>
            </div>
            <div className="status-row">
              <Clock3 size={18} />
              <span>
                {booking.start || "—"} — {booking.end || "—"}
              </span>
            </div>
            <div className="price-row">
              <span>
                {hours} horas × {person.rate}€
              </span>
              <motion.strong key={`${hours}-${person.id}`} {...arrival}>
                {(hours * person.rate).toFixed(2)}€
              </motion.strong>
            </div>
            <p className="fine-print">
              Estimativa fictícia. Sem condições comerciais, taxas ou pagamento real.
            </p>
          </Card>
          <div className="notice mint">
            <ShieldCheck size={23} />
            <div>
              <strong>O cuidado começa antes da sessão.</strong>
              <p>Reveja a rotina e os procedimentos com o responsável e a babysitter.</p>
            </div>
          </div>
          <TextLink to="/app/seguranca">A nossa abordagem à segurança</TextLink>
        </div>
      </div>
    </>
  );
}
