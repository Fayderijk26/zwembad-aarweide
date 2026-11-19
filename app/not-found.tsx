import Link from "next/link";
import { PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHeader
        kicker="404"
        title="Deze pagina is kopje onder"
        intro="De pagina bestaat niet (meer). Misschien vind je het via een van deze links."
      >
        <Link className="btn btn-sun" href="/">
          Naar de homepage
        </Link>
        <Link className="btn btn-ghost" href="/openingstijden/">
          Openingstijden
        </Link>
        <Link className="btn btn-ghost" href="/nieuws/">
          Nieuws
        </Link>
      </PageHeader>
      <div className="h-24" />
    </>
  );
}
