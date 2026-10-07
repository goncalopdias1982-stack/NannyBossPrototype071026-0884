import { useState } from "react";
import { useLocation } from "wouter";
import { ShieldCheck, Clock3, ArrowRight, Check, CalendarDays, LockKeyhole } from "lucide-react";
import { caregivers } from "../data/mock";
import { usePrototype } from "../components/prototype-context";
import {
  Heading,
  Card,
  Avatar,
  Badge,
  Button,
  ActionLink,
  TextLink,
} from "../components/primitives";
export function BookingRequest() {
  const { booking, setBooking, setConfirmed, role } = usePrototype();
  const [, navigate] = useLocation();
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const person = caregivers.find((p) => p.id === booking.caregiver)!;
  const hours = Math.max(
    0,
    Number(booking.end.split(":")[0]) +
      Number(booking.end.split(":")[1]) / 60 -
      (Number(booking.start.split(":")[0]) + Number(booking.start.split(":")[1]) / 60),
  );
  if (role === "babysitter")
    return (
      <>
        <Heading
          eyebrow="PEDIDOS · DEMONSTRAÇÃO"
          title="Um cuidado a preparar."
          description="Exemplo de pedido recebido. Não é uma reserva real."
        />
        <Card>
          <Badge>Pedido fictício</Badge>
          <h2>Família de Mariana</h2>
          <p>Sábado, 10 de outubro · 17:00 — 20:00 · Lisboa</p>
          <p className="muted">
            Alinhe os detalhes de cuidado e a disponibilidade antes de aceitar uma sessão real.
          </p>
          <ActionLink to="/app/mensagens">
            Conversar com a família
            <ArrowRight size={16} />
          </ActionLink>
        </Card>
      </>
    );
  return (
    <>
      <Heading
        eyebrow="UM CUIDADO BEM PREPARADO."
        title="Preparar pedido de cuidado"
        description="Organize os detalhes. Este pedido é apenas uma simulação."
      />
      <div className="booking-grid">
        <Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (hours <= 0) {
                setError("A hora de fim deve ser posterior à hora de início.");
                return;
              }
              setError("");
              setConfirmed(true);
              navigate("/app/confirmacao");
            }}
          >
            <h2>Os detalhes fazem a diferença.</h2>
            <label>
              Babysitter
              <select
                aria-label="Babysitter"
                value={booking.caregiver}
                onChange={(e) => setBooking({ ...booking, caregiver: e.target.value })}
              >
                {caregivers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · perfil fictício
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data do exemplo
              <input
                type="date"
                aria-label="Data do exemplo"
                required
                value={booking.date}
                onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              />
            </label>
            <div className="form-row">
              <label>
                Hora de início
                <input
                  type="time"
                  required
                  aria-label="Hora de início"
                  value={booking.start}
                  onChange={(e) => setBooking({ ...booking, start: e.target.value })}
                />
              </label>
              <label>
                Hora de fim
                <input
                  type="time"
                  required
                  aria-label="Hora de fim"
                  value={booking.end}
                  onChange={(e) => setBooking({ ...booking, end: e.target.value })}
                />
              </label>
            </div>
            <label>
              Informação para preparar a conversa
              <textarea
                aria-label="Informação para preparar a conversa"
                value={booking.notes}
                onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                placeholder="Apenas informação fictícia. Não inclua dados de saúde, moradas ou contactos reais."
                maxLength={500}
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                aria-label="Compreendo que esta é uma simulação"
                required
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Compreendo que esta é uma simulação, sem reserva, verificação ou pagamento real.
              </span>
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit">
              Simular pedido
              <ArrowRight size={16} />
            </Button>
          </form>
        </Card>
        <div>
          <Card className="booking-summary">
            <p className="eyebrow">RESUMO ILUSTRATIVO</p>
            <div className="person-row">
              <Avatar initials={person.initials} color={person.color} />
              <div>
                <strong>{person.name}</strong>
                <small>{person.location}</small>
              </div>
            </div>
            <div className="status-row">
              <CalendarDays size={18} />
              <span>{new Date(booking.date + "T12:00:00").toLocaleDateString("pt-PT")}</span>
            </div>
            <div className="status-row">
              <Clock3 size={18} />
              <span>
                {booking.start} — {booking.end}
              </span>
            </div>
            <div className="price-row">
              <span>
                {hours || 0} horas × {person.rate}€
              </span>
              <strong>{(hours * person.rate).toFixed(2)}€</strong>
            </div>
            <p className="fine-print">
              Estimativa fictícia. Não inclui condições comerciais, taxas ou pagamentos reais.
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
export function BookingConfirmation() {
  const { booking, confirmed } = usePrototype();
  const person = caregivers.find((p) => p.id === booking.caregiver)!;
  return (
    <div className="confirmation">
      <span className="confirmation-icon">
        <Check size={38} />
      </span>
      <Badge tone="success">SIMULAÇÃO · SEM RESERVA REAL</Badge>
      <h1>{confirmed ? "Pedido demonstrativo preparado." : "Exemplo de confirmação."}</h1>
      <p className="muted">
        Uma etapa visual para mostrar o que acontece a seguir.
        <br />
        Nenhum pedido foi enviado, aceite ou pago.
      </p>
      <Card>
        <div className="person-row">
          <Avatar initials={person.initials} color={person.color} />
          <div>
            <strong>{person.name}</strong>
            <small>Perfil fictício</small>
          </div>
        </div>
        <div className="status-row">
          <CalendarDays size={19} />
          {new Date(booking.date + "T12:00:00").toLocaleDateString("pt-PT")}
          <span>
            {booking.start} — {booking.end}
          </span>
        </div>
        <div className="notice sky">
          <LockKeyhole size={20} />
          <p>Os acessos temporários à informação de cuidados não estão ativos.</p>
        </div>
      </Card>
      <div className="actions">
        <ActionLink to="/app/mensagens">
          Preparar a conversa
          <ArrowRight size={16} />
        </ActionLink>
        <ActionLink to="/app" variant="secondary">
          Voltar ao meu espaço
        </ActionLink>
      </div>
    </div>
  );
}
