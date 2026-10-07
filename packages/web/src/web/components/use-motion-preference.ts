import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function snapshot() {
  return window.matchMedia(query).matches;
}

/** Reactively respects OS preference changes, including during an active example. */
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => true);
}
