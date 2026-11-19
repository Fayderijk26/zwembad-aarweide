import { Reveal } from "../Reveal";

export function SectionHeader({
  kicker,
  title,
  intro,
  introClassName = "text-muted",
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  introClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal>
      <p className="kicker">{kicker}</p>
      <h2 className="h2">{title}</h2>
      {intro && <p className={`mt-[18px] max-w-[46ch] ${introClassName}`}>{intro}</p>}
      {children}
    </Reveal>
  );
}
