import { Link } from "wouter";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  LockKeyhole,
  CalendarDays,
  Sparkles,
  Check,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo, ActionLink, TextLink, Avatar, Badge, DemoNotice } from "../components/primitives";
export default function Welcome() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="welcome">
      <a className="skip-link" href="#welcome-main">
        Saltar para o conteúdo
      </a>
      <header className="public-header">
        <Link to="/" aria-label="NannyBoss início">
          <Logo />
        </Link>
        <nav className={menu ? "public-nav open" : "public-nav"} aria-label="Navegação pública">
          <a href="#como-funciona" onClick={() => setMenu(false)}>
            Como funciona
          </a>
          <Link to="/app/babysitters">Encontrar babysitter</Link>
          <Link to="/app/seguranca">Confiança e segurança</Link>
          <Link to="/login">Entrar</Link>
        </nav>
        <ActionLink to="/onboarding" variant="small">
          Começar <ArrowRight size={14} />
        </ActionLink>
        <button
          className="icon-button public-menu"
          aria-label={menu ? "Fechar navegação" : "Abrir navegação"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="welcome-main">
        <section className="hero">
          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit orbit-four" />
            <div className="hero-halo" />
            <div className="glass-emblem">
              <Logo compact />
              <span>
                CHILD FIRST.
                <br />
                ALWAYS.
              </span>
            </div>
            <div className="float-tag tag-trust">
              <span className="tiny-icon mint">
                <ShieldCheck size={17} />
              </span>
              Confiança em cada ligação
            </div>
            <div className="float-tag tag-care">
              <span className="tiny-icon lavender">
                <HeartHandshake size={17} />
              </span>
              Mais presença. Mais tranquilidade.
            </div>
            <span className="art-caption">PROTEÇÃO · LIGAÇÃO · CUIDADO</span>
          </div>
          <div className="hero-bottom">
            <div>
              <p className="eyebrow">CUIDAR É UMA QUESTÃO DE CONFIANÇA.</p>
              <h1>
                Pequenos momentos.
                <br />
                <span className="pastel-text">Uma grande confiança.</span>
              </h1>
              <p className="hero-description">
                Um espaço mais humano para encontrar cuidado.
                <br className="desktop-break" /> Com a segurança da criança no centro de tudo.
              </p>
            </div>
            <div className="hero-actions">
              <div className="cta-capsule">
                <div>
                  <strong>O cuidado começa aqui.</strong>
                  <small>Pensado para famílias e babysitters.</small>
                </div>
                <ActionLink to="/onboarding">
                  Encontrar o meu cuidado <ArrowRight size={16} />
                </ActionLink>
              </div>
              <TextLink to="/tipo-utilizador">Sou babysitter</TextLink>
            </div>
          </div>
          <div className="hero-footnote">
            <span>
              <ShieldCheck size={15} />
              Child first. Always.
            </span>
            <span>Feito para adultos. Centrado na criança.</span>
            <span>Portugal, com proximidade.</span>
          </div>
        </section>
        <section className="highlights" id="como-funciona">
          <div className="section-title">
            <div>
              <p className="eyebrow">MENOS INCERTEZA. MAIS TRANQUILIDADE.</p>
              <h2>Cuidado, em todos os detalhes.</h2>
            </div>
            <TextLink to="/app/seguranca">Conhecer a nossa abordagem</TextLink>
          </div>
          <div className="highlight-grid">
            <article className="highlight-card lavender">
              <span className="icon-tile">
                <ShieldCheck size={25} />
              </span>
              <h3>
                A confiança não
                <br />
                fica ao acaso.
              </h3>
              <p>Uma experiência que torna a segurança visível, sem substituir o seu julgamento.</p>
              <div className="visual-trust">
                <span className="trust-ring">
                  <ShieldCheck size={46} />
                </span>
                <div className="mini-glass">
                  <Check size={14} />
                  Verificações transparentes
                </div>
              </div>
            </article>
            <article className="highlight-card mint">
              <span className="icon-tile">
                <HeartHandshake size={25} />
              </span>
              <h3>
                Uma ligação humana.
                <br />
                Um cuidado à sua medida.
              </h3>
              <p>
                Encontre profissionais com atenção à rotina, às necessidades e ao tempo de cada
                família.
              </p>
              <div className="mini-profile">
                <Avatar initials="IM" color="lavender" />
                <div>
                  <strong>Inês Martins</strong>
                  <small>Presença tranquila. Cuidado atento.</small>
                </div>
                <HeartHandshake size={21} />
              </div>
              <span className="mini-caption">Perfil ilustrativo · dados fictícios</span>
            </article>
            <article className="highlight-card sky">
              <span className="icon-tile">
                <LockKeyhole size={25} />
              </span>
              <h3>
                A informação certa.
                <br />
                Só a quem precisa.
              </h3>
              <p>
                Privacidade como princípio. Acesso à informação de cuidados apenas quando
                necessário.
              </p>
              <div className="privacy-stack">
                <div>
                  <LockKeyhole size={17} />
                  Informação protegida
                </div>
                <div>
                  <CalendarDays size={17} />
                  Acesso temporário
                </div>
                <div>
                  <Check size={17} />
                  Controlo da família
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="care-section">
          <div className="care-copy">
            <p className="eyebrow">O SEU ESPAÇO, EM EQUILÍBRIO.</p>
            <h2>
              Tudo mais claro.
              <br />
              Para estar mais presente.
            </h2>
            <p>
              Rotinas, conversas e próximos cuidados.
              <br />
              Uma experiência simples, calma e organizada.
            </p>
            <ActionLink to="/app">
              Explorar a demonstração <ArrowRight size={16} />
            </ActionLink>
            <small>Sem registo. Sem dados reais.</small>
          </div>
          <div className="dashboard-preview">
            <div className="preview-bar">
              <span />
              <span />
              <span />
              <small>nannyboss · o meu espaço</small>
            </div>
            <div className="preview-content">
              <p className="eyebrow">UM NOVO DIA, COM TRANQUILIDADE.</p>
              <h3>Olá, Mariana.</h3>
              <div className="preview-session">
                <Badge tone="success">Próximo cuidado · exemplo</Badge>
                <h4>Sábado, 10 de outubro</h4>
                <p>17:00 — 20:00 · Lisboa</p>
                <div className="person-row">
                  <Avatar />
                  <div>
                    <strong>Inês Martins</strong>
                    <small>Babysitter · perfil fictício</small>
                  </div>
                  <span className="tiny-icon">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <div className="preview-bottom">
                <ShieldCheck size={20} />
                <p>
                  A tranquilidade começa
                  <br />
                  <strong>com um cuidado preparado.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="closing">
          <span className="icon-tile lavender">
            <Sparkles size={24} />
          </span>
          <h2>
            A criança primeiro.
            <br />
            Sempre.
          </h2>
          <p>Tecnologia que aproxima. Cuidado que protege.</p>
          <ActionLink to="/onboarding">
            Começar a minha experiência <ArrowRight size={16} />
          </ActionLink>
        </section>
      </main>
      <footer className="public-footer">
        <Logo />
        <span>Child first. Always.</span>
        <Link to="/app/seguranca">Confiança e segurança</Link>
        <Link to="/design-system">Design System</Link>
        <DemoNotice short />
      </footer>
    </div>
  );
}
