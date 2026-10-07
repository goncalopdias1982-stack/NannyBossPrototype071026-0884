import { ArrowRight, CalendarDays, LockKeyhole } from "lucide-react";
import { motion } from "motion/react";
import { caregivers } from "../data/mock";
import { usePrototype } from "../components/prototype-context";
import { Heading, Card, Avatar, Badge, ActionLink } from "../components/primitives";
import { BookingWizard } from "../components/booking-wizard";
import { PreparationTimeline, SuccessMark, useArrival } from "../components/effects";
export function BookingRequest() {
  const { booking, role, displayName } = usePrototype();
  if (role !== "babysitter") return <BookingWizard />;
  return (
    <>
      <Heading
        eyebrow="PEDIDOS · DEMONSTRAÇÃO"
        title="Um cuidado a preparar."
        description="Exemplo de pedido recebido. Não é uma reserva real."
      />
      <Card>
        <Badge>Pedido fictício</Badge>
        <h2>Família de {displayName}</h2>
        <p>
          {booking.date || "Data por definir"} · {booking.start} — {booking.end} · Lisboa
        </p>
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
}
export function BookingConfirmation() {
  const { booking, confirmed } = usePrototype();
  const arrival = useArrival();
  const person = caregivers.find((p) => p.id === booking.caregiver)!;
  return (
    <motion.div className="confirmation" {...arrival}>
      {confirmed ? (
        <SuccessMark />
      ) : (
        <span className="confirmation-icon" aria-hidden="true">
          <CalendarDays size={34} />
        </span>
      )}
      <Badge tone="success">SIMULAÇÃO · SEM RESERVA REAL</Badge>
      <h1>{confirmed ? "Pedido demonstrativo preparado." : "Exemplo de confirmação."}</h1>
      <p className="muted">
        Uma etapa visual para mostrar o que acontece a seguir.
        <br />
        Nenhum pedido foi enviado, aceite ou pago.
      </p>
      <Card>
        <p className="care-service-label">{booking.service} · exemplo</p>
        <div className="person-row">
          <Avatar initials={person.initials} color={person.color} />
          <div>
            <strong>{person.name}</strong>
            <small>Babysitter</small>
          </div>
        </div>
        <div className="status-row">
          <CalendarDays size={19} />
          {booking.date
            ? new Date(booking.date + "T12:00:00").toLocaleDateString("pt-PT")
            : "Data por definir"}
          <span>
            {booking.start} — {booking.end}
          </span>
        </div>
        <div className="notice sky">
          <LockKeyhole size={20} />
          <p>Os acessos temporários à informação de cuidados não estão ativos.</p>
        </div>
      </Card>
      <Card className="confirmation-progress">
        <p className="eyebrow">PREPARAÇÃO · SEM SERVIÇOS REAIS</p>
        <PreparationTimeline prepared={confirmed} />
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
    </motion.div>
  );
}
