import { Heart, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import { caregivers } from "../data/mock";
import { Avatar, SafetyBadge } from "./primitives";
import { usePrototype } from "./prototype-context";
export function CaregiverCard({ person }: { person: (typeof caregivers)[number] }) {
  const { saved, setSaved, setToast } = usePrototype();
  const active = saved.includes(person.id);
  return (
    <article className="caregiver-card">
      <div className={`caregiver-cover ${person.color}`}>
        <div className="cover-orbit" />
        <Avatar initials={person.initials} color={person.color} large />
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
        <span className="cover-caption">PERFIL DEMONSTRATIVO</span>
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
    </article>
  );
}
