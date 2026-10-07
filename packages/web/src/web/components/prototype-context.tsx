import { createContext, useContext, useState, type ReactNode } from "react";
import { initialMessages } from "../data/mock";
type Role = "parent" | "babysitter" | "admin";
type Booking = {
  date: string;
  start: string;
  end: string;
  caregiver: string;
  notes: string;
  service: string;
};
function usePrototypeState() {
  const [role, setRole] = useState<Role>("parent");
  const [toast, setToast] = useState("");
  const [displayName, setDisplayName] = useState("Mariana");
  const [preferences, setPreferences] = useState({ notifications: true, reminders: true });
  const [booking, updateBooking] = useState<Booking>({
    date: "2026-10-10",
    start: "17:00",
    end: "20:00",
    caregiver: "ines",
    notes: "",
    service: "Cuidado pontual",
  });
  const [confirmed, setConfirmed] = useState(false);
  function setBooking(value: Booking) {
    updateBooking(value);
    setConfirmed(false);
  }
  const [messages, setMessages] = useState(initialMessages);
  const [saved, setSaved] = useState<string[]>([]);
  return {
    role,
    setRole,
    displayName,
    setDisplayName,
    preferences,
    setPreferences,
    toast,
    setToast,
    booking,
    setBooking,
    confirmed,
    setConfirmed,
    messages,
    setMessages,
    saved,
    setSaved,
  };
}
type State = ReturnType<typeof usePrototypeState>;
const Context = createContext<State | null>(null);
export function PrototypeProvider({ children }: { children: ReactNode }) {
  const value = usePrototypeState();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function usePrototype() {
  const state = useContext(Context);
  if (!state) throw new Error("PrototypeProvider missing");
  return state;
}
