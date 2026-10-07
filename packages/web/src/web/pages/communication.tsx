import { useState } from "react";
import { Send, Sparkles, ShieldCheck, MessageCircle, LockKeyhole, ArrowRight } from "lucide-react";
import { usePrototype } from "../components/prototype-context";
import { Heading, Card, Badge, Avatar, TextLink } from "../components/primitives";
export function Messages() {
  const { messages, setMessages } = usePrototype();
  const [draft, setDraft] = useState("");
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
            <Avatar />
            <span>
              <strong>Inês Martins</strong>
              <small>Alinhar os detalhes do cuidado</small>
            </span>
            <Badge>2</Badge>
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
              <Avatar />
              <div>
                <strong>Inês Martins</strong>
                <small>Perfil fictício · sem presença online real</small>
              </div>
            </div>
            <Badge tone="success">
              <ShieldCheck size={12} />
              Exemplo
            </Badge>
          </header>
          <div
            className="chat-messages"
            role="log"
            aria-label="Conversa demonstrativa"
            aria-live="polite"
          >
            <p className="chat-date">CONVERSA ILUSTRATIVA</p>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from === "parent" ? "own" : ""}`}>
                <p>{m.text}</p>
                <small>
                  {m.time} · {m.from === "parent" ? "Família" : "Babysitter"}
                </small>
              </div>
            ))}
          </div>
          <form
            className="message-composer"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setMessages([
                ...messages,
                { from: "parent", text: draft.trim(), time: "Agora · simulado" },
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
  const [response, setResponse] = useState<string | null>(null);
  const [last, setLast] = useState("");
  function ask(q: string) {
    setLast(q);
    const i = prompts.indexOf(q);
    setResponse(
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
          {response && (
            <div className="assistant-response" aria-live="polite">
              <p className="assistant-question">{last}</p>
              <div className="notice lavender">
                <Sparkles size={20} />
                <div>
                  <strong>Resposta pré-escrita · mock</strong>
                  <p>{response}</p>
                </div>
              </div>
            </div>
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
