import {
  LayoutDashboard,
  UsersRound,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";
export const navigation = [
  { path: "/app", label: "Visão geral", icon: LayoutDashboard },
  { path: "/app/babysitters", label: "Encontrar babysitter", icon: UsersRound },
  { path: "/app/reserva", label: "Pedidos de cuidado", icon: CalendarDays },
  { path: "/app/mensagens", label: "Mensagens", icon: MessageCircle },
  { path: "/app/crianca", label: "Perfil da criança", icon: UsersRound },
  { path: "/app/seguranca", label: "Confiança e segurança", icon: ShieldCheck },
  { path: "/app/assistente", label: "Assistente NannyBoss", icon: Sparkles },
  { path: "/app/definicoes", label: "Definições", icon: Settings },
];
export const roleHomes = { parent: "/app", babysitter: "/babysitter", admin: "/admin" };
export const sitterNavigation = [
  { path: "/babysitter", label: "O meu espaço", icon: LayoutDashboard },
  { path: "/app/babysitter/ines", label: "Perfil profissional", icon: BriefcaseBusiness },
  ...navigation.filter((n) =>
    [
      "/app/reserva",
      "/app/mensagens",
      "/app/seguranca",
      "/app/assistente",
      "/app/definicoes",
    ].includes(n.path),
  ),
];
