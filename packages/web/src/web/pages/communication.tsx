import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useMotionPreference as useReducedMotion } from "../components/use-motion-preference";
import { useArrival } from "../components/effects";
import { useProgressiveExample } from "../components/use-progressive-example";
import { Send, Sparkles, ShieldCheck, MessageCircle, LockKeyhole, ArrowRight } from "lucide-react";
import { usePrototype } from "../components/prototype-context";
import { Heading, Card, Badge, Avatar, TextLink } from "../components/primitives";
export function Messages() {
  const { messages, setMessages, role } = usePrototype();
  const [draft, setDraft] = useState("");
  const arrival = useArrival();
  const reduced = useReducedMotion();
  const chatRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(messages.length);
  useEffect(() => {
    if (messages.length > lastCount.current)
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: reduced ? "instant" : "smooth",
      });
    lastCount.current = messages.length;
  }, [messages.length, reduced]);
  const conversationName = role === "babysitter" ? "Família · exemplo" : "Inês Martins";
  return (
    <>
      <Heading
        eyebrow="CONVERSAS QUE PREPARAM O CUIDADO."
        title="Mensagens"
        description="Mensagens fictícias, guardadas apenas na memória desta sessão."
      />
      <div className="messages-shell card">
        <aside className="conversation-list">
          <h2>As suas conversas</h2>
          <button className="conversation active" aria-current="true">
            <Avatar initials={role === "babysitter" ? "RF" : "IM"} />
            <span>
              <strong>{conversationName}</strong>
              <small>Alinhar os detalhes do cuidado</small>
            </span>
            <Badge>{messages.length}</Badge>
          </button>
          <div className="conversation-note">
            <MessageCircle size={23} />
            <p>
              Conversar com clareza
              <br />é cuidar melhor.
            </p>
          </div>
        </aside>
        <section className="conversation-content">
          <header>
            <div className="person-row">
              <Avatar initials={role === "babysitter" ? "RF" : "IM"} />
              <div>
                <strong>{conversationName}</strong>
                <small>Conversa de preparação</small>
              </div>
            </div>
            <Badge tone="success">
              <ShieldCheck size={12} />
              Exemplo
            </Badge>
          </header>
          <div
            ref={chatRef}
            className="chat-messages"
            role="log"
            aria-label="Conversa demonstrativa"
            aria-live="polite"
          >
            <p className="chat-date">CONVERSA ILUSTRATIVA</p>
            {messages.map((m, i) => (
              <motion.div
                {...arrival}
                key={i}
                className={`chat-bubble ${m.from === (role === "babysitter" ? "caregiver" : "parent") ? "own" : ""}`}
              >
                <p>{m.text}</p>
                <small>
                  {m.time} · {m.from === "parent" ? "Família" : "Babysitter"}
                </small>
              </motion.div>
            ))}
          </div>
          <form
            className="message-composer"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setMessages([
                ...messages,
                {
                  from: role === "babysitter" ? "caregiver" : "parent",
                  text: draft.trim(),
                  time: "Agora · simulado",
                },
              ]);
              setDraft("");
            }}
          >
            <label className="sr-only" htmlFor="message">
              Mensagem fictícia
            </label>
            <input
              id="message"
              aria-label="Mensagem fictícia"
              value={draft}
              maxLength={1000}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escrever uma mensagem fictícia…"
            />
            <button
              type="submit"
              className="button"
              disabled={!draft.trim()}
              aria-label="Adicionar mensagem à demonstração"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="chat-disclaimer">
            <LockKeyhole size={12} />
            Não são enviadas mensagens. Não introduza dados reais.
          </p>
        </section>
      </div>
    </>
  );
}
const prompts = [
  "Como preparar o primeiro cuidado?",
  "O que alinhar com a babysitter?",
  "Como funciona a privacidade?",
];
const answers = [
  "Antes de um primeiro cuidado, pode preparar uma conversa sobre a rotina, necessidades e expectativas. Confirme os contactos autorizados e os procedimentos com os adultos responsáveis. Este texto é pré-escrito, não uma avaliação de segurança.",
  "Sugestão de conversa: horários, rotina, preferências de cuidado, comunicação e transição de responsabilidades. A adequação do cuidado deve ser avaliada por pessoas, nunca por este assistente.",
  "O conceito prevê informação mínima e acesso temporário autorizado pela família. Nesta fase não existe controlo de acessos real. Não introduza informação pessoal ou sensível.",
];
export function Assistant() {
  const [question, setQuestion] = useState("");
  const [hasResponse, setHasResponse] = useState(false);
  const { text: response, busy, phase, present, finish } = useProgressiveExample();
  const arrival = useArrival();
  const [last, setLast] = useState("");
  function ask(q: string) {
    setLast(q);
    const i = prompts.indexOf(q);
    setHasResponse(true);
    present(
      i >= 0
        ? answers[i]!
        : "Este é um conceito visual, sem IA real. As respostas disponíveis são exemplos pré-escritos. Para decisões sobre cuidado, segurança ou saúde, procure supervisão humana adequada.",
    );
    setQuestion("");
  }
  return (
    <>
      <Heading
        eyebrow="TECNOLOGIA QUE APOIA. PESSOAS QUE DECIDEM."
        title="Assistente NannyBoss"
        description="Conceito visual · sem inteligência artificial real."
      />
      <div className="assistant-layout">
        <Card className="assistant-chat">
          <div className="assistant-intro">
            <span className="assistant-orb">
              <Sparkles size={32} />
            </span>
            <Badge tone="neutral">AI assistance — human oversight.</Badge>
            <h2>
              Como podemos preparar
              <br />
              um cuidado mais tranquilo?
            </h2>
            <p className="muted">
              Orientação para organizar ideias.
              <br />
              Nunca uma autoridade final.
            </p>
          </div>
          <div className="suggestion-grid">
            {prompts.map((q) => (
              <button key={q} onClick={() => ask(q)}>
                {q}
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
          {hasResponse && (
            <motion.div className="assistant-response" key={last} {...arrival}>
              <p className="assistant-question">{last}</p>
              <div className="notice lavender">
                <Sparkles size={20} />
                <div>
                  <strong>Resposta pré-escrita · mock</strong>
                  {busy && (
                    <div className="example-processing">
                      <span className="processing-dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>
                        {phase === "preparing"
                          ? "A abrir exemplo guardado…"
                          : "A apresentar texto pré-escrito…"}{" "}
                        · sem IA
                      </span>
                    </div>
                  )}
                  {busy && (
                    <button type="button" className="button ghost small" onClick={finish}>
                      Mostrar resposta completa
                    </button>
                  )}
                  <p className="progressive-text" aria-hidden={busy || undefined}>
                    {response || "O exemplo vai aparecer aqui."}
                  </p>
                  <output className="sr-only" aria-live="polite">
                    {busy
                      ? "A apresentar um exemplo pré-escrito. Não é uma resposta de inteligência artificial."
                      : response}
                  </output>
                  {!busy && (
                    <div className="assistant-next-actions">
                      <TextLink to="/app/reserva">Preparar um pedido</TextLink>
                      <TextLink to="/app/crianca">Rever rotina ilustrativa</TextLink>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          <form
            className="message-composer"
            onSubmit={(e) => {
              e.preventDefault();
              if (question.trim()) ask(question.trim());
            }}
          >
            <label htmlFor="assistant-question" className="sr-only">
              Questão fictícia para o assistente
            </label>
            <input
              id="assistant-question"
              aria-label="Questão fictícia para o assistente"
              placeholder="Explorar uma questão fictícia…"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={300}
            />
            <button
              type="submit"
              className="button"
              disabled={!question.trim()}
              aria-label="Ver resposta demonstrativa"
            >
              <Send size={18} />
            </button>
          </form>
        </Card>
        <Card>
          <span className="icon-tile mint">
            <ShieldCheck size={24} />
          </span>
          <h2>O humano tem a última palavra.</h2>
          <p className="muted">
            O assistente não valida profissionais, não decide quem cuida e não substitui
            aconselhamento clínico, jurídico ou de emergência.
          </p>
          <div className="notice sky">
            <LockKeyhole size={21} />
            <p>Não partilhe dados de crianças, credenciais ou informação sensível.</p>
          </div>
          <TextLink to="/app/seguranca">Confiança e segurança</TextLink>
        </Card>
      </div>
    </>
  );
}
