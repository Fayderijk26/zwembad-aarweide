import { links } from "@/content/site";
import { ExternalLink } from "../ExternalLink";

export function Footer() {
  return (
    <footer className="bg-board py-8 text-sm text-board-muted [&_a]:text-board-fg">
      <div className="wrap flex flex-wrap justify-between gap-x-8 gap-y-2">
        <span>Zwembad Aarweide · Schilkerweg 21, Nieuwveen</span>
        <span>
          <ExternalLink href={links.stichting}>Stichting</ExternalLink> ·{" "}
          <ExternalLink href={links.sponsoren}>Sponsoren</ExternalLink> ·{" "}
          <ExternalLink href={links.privacy}>Privacy</ExternalLink>
        </span>
      </div>
    </footer>
  );
}
