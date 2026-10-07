import { Heart, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import { caregivers } from "../data/mock";
import { SafetyBadge } from "./primitives";
import { usePrototype } from "./prototype-context";
import { motion } from "motion/react";
import { useMotionPreference as useReducedMotion } from "./use-motion-preference";
export function CaregiverCard({ person }: { person: (typeof caregivers)[number] }) {
  const { saved, setSaved, setToast } = usePrototype();
  const active = saved.includes(person.id);
  const reduced = useReducedMotion();
  return (
    <motion.article
      className="caregiver-card"
      layout={reduced ? false : "position"}
      initial={reduced ? false : { opacity: 1, y: 12 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.32 }}
    >
      <div className={`caregiver-cover ${person.color}`}>
        <img
          className="caregiver-photo"
          src={`/images/portrait-${person.id}.webp`}
          alt="Retrato editorial de um adulto ao ar livre"
          width="720"
          height="900"
          loading="lazy"
        />
        <button
          className={`favorite icon-button ${active ? "is-saved" : ""}`}
          aria-label={`${active ? "Remover" : "Guardar"} ${person.name}`}
          aria-pressed={active}
          onClick={() => {
            setSaved(active ? saved.filter((id) => id !== person.id) : [...saved, person.id]);
            setToast(
              active
                ? "Perfil removido dos favoritos desta sessão."
                : "Perfil guardado apenas nesta sessão.",
            );
          }}
        >
          <Heart size={18} fill={active ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="caregiver-details">
        <div className="section-head">
          <h3>{person.name}</h3>
          <Link
            className="icon-button"
            to={`/app/babysitter/${person.id}`}
            aria-label={`Ver perfil de ${person.name}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <p>
          <MapPin size={13} />
          {person.location}
        </p>
        <SafetyBadge />
        <div className="caregiver-footer">
          <span>{person.experience}</span>
          <strong>
            {person.rate}€<small> / hora*</small>
          </strong>
        </div>
      </div>
    </motion.article>
  );
}
