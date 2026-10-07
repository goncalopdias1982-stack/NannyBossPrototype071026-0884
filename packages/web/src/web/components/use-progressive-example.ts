import { useEffect, useRef, useState } from "react";
import { useMotionPreference as useReducedMotion } from "./use-motion-preference";

/** Presents a local fixture, never calls a model or network. Timers always cancel on unmount. */
export function useProgressiveExample() {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "preparing" | "presenting">("idle");
  const full = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function clear() {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }
  function finish() {
    clear();
    setText(full.current);
    setBusy(false);
    setPhase("idle");
  }
  function present(value: string) {
    clear();
    full.current = value;
    if (reduced) {
      setText(value);
      setBusy(false);
      setPhase("idle");
      return;
    }
    setText("");
    setBusy(true);
    setPhase("preparing");
    const words = value.split(" ");
    let position = 0;
    function next() {
      position = Math.min(position + 5, words.length);
      setText(words.slice(0, position).join(" "));
      setPhase("presenting");
      if (position === words.length) {
        timer.current = null;
        setBusy(false);
        setPhase("idle");
      } else timer.current = setTimeout(next, 65);
    }
    timer.current = setTimeout(next, 280);
  }
  useEffect(() => {
    if (reduced) finish();
    // finish only uses stable setters and refs; preference changes must finish an active fixture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    },
    [],
  );
  return { text, busy, phase, present, finish };
}
