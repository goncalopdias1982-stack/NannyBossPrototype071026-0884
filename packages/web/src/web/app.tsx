import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { Provider } from "./components/provider";
import { PrototypeProvider, usePrototype } from "./components/prototype-context";
import { Toast, EmptyState, ActionLink } from "./components/primitives";
import AppLayout from "./layouts/app-layout";
import Welcome from "./pages/welcome";
import Access from "./pages/access";
import Dashboard, { BabysitterDashboard, AdminDashboard } from "./pages/dashboard";
import { CaregiverList, CaregiverProfile, ChildProfile } from "./pages/profiles";
import { BookingRequest, BookingConfirmation } from "./pages/booking";
import { Messages, Assistant } from "./pages/communication";
import { Safety, Settings } from "./pages/safety-settings";
import DesignSystem from "./pages/design-system";
function Workspace() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/app" component={Dashboard} />
        <Route path="/app/babysitters" component={CaregiverList} />
        <Route path="/app/babysitter/:id">{(p) => <CaregiverProfile id={p.id} />}</Route>
        <Route path="/app/crianca" component={ChildProfile} />
        <Route path="/app/reserva" component={BookingRequest} />
        <Route path="/app/confirmacao" component={BookingConfirmation} />
        <Route path="/app/mensagens" component={Messages} />
        <Route path="/app/seguranca" component={Safety} />
        <Route path="/app/assistente" component={Assistant} />
        <Route path="/app/definicoes" component={Settings} />
        <Route path="/babysitter" component={BabysitterDashboard} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/design-system" component={DesignSystem} />
        <Route>
          <EmptyState
            title="Página não encontrada"
            text="Este endereço não faz parte da demonstração."
          >
            <ActionLink to="/app">Voltar ao meu espaço</ActionLink>
          </EmptyState>
        </Route>
      </Switch>
    </AppLayout>
  );
}
function Screens() {
  const [path] = useLocation();
  const { setRole } = usePrototype();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (path === "/babysitter") setRole("babysitter");
    else if (path === "/admin") setRole("admin");
    else if (path === "/app") setRole("parent");
    const labels: Record<string, string> = {
      "/": "Child first. Always.",
      "/app": "O meu espaço",
      "/app/mensagens": "Mensagens",
      "/app/seguranca": "Confiança e segurança",
      "/app/crianca": "Perfil de cuidados",
    };
    document.title = `NannyBoss — ${labels[path] || "Protótipo Fase 1"}`;
  }, [path, setRole]);
  return (
    <>
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/onboarding">{() => <Access kind="onboarding" />}</Route>
        <Route path="/login">{() => <Access kind="login" />}</Route>
        <Route path="/recuperar">{() => <Access kind="recover" />}</Route>
        <Route path="/tipo-utilizador">{() => <Access kind="role" />}</Route>
        <Route component={Workspace} />
      </Switch>
      <Toast />
    </>
  );
}
export default function App() {
  return (
    <Provider>
      <PrototypeProvider>
        <Screens />
        {import.meta.env.DEV && <AgentFeedback />}
        <RunableBadge />
      </PrototypeProvider>
    </Provider>
  );
}
