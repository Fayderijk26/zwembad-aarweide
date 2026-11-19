import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHeader } from "@/components/ui";
import { formatDate, posts } from "@/content/nieuws";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const post = posts[i];
  const newer = posts[i - 1];
  const older = posts[i + 1];

  return (
    <>
      <PageHeader
        kicker={`${post.tag} · ${formatDate(post.date)}`}
        title={post.title}
        intro={post.summary}
        crumbs={[{ href: "/nieuws/", label: "Nieuws" }]}
      />
      <article className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-[68ch]">
            <div className="grid gap-5 text-[1.125rem] leading-[1.7]">
              {post.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {post.links && (
              <p className="mt-8 flex flex-wrap gap-3">
                {post.links.map((l) =>
                  l.href.startsWith("/") ? (
                    <Link key={l.href} className="btn btn-sun" href={l.href}>
                      {l.label}
                    </Link>
                  ) : (
                    <ExternalLink key={l.href} className="btn btn-sun" href={l.href}>
                      {l.label}
                    </ExternalLink>
                  ),
                )}
              </p>
            )}
            <nav aria-label="Meer berichten" className="mt-16 grid gap-4 border-t-2 border-fg pt-6 min-[640px]:grid-cols-2">
              {older ? (
                <Link href={`/nieuws/${older.slug}/`} className="group no-underline">
                  <span className="text-sm text-muted">← Ouder bericht</span>
                  <span className="mt-1 block font-semibold text-fg group-hover:underline">{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link href={`/nieuws/${newer.slug}/`} className="group no-underline min-[640px]:text-right">
                  <span className="text-sm text-muted">Nieuwer bericht →</span>
                  <span className="mt-1 block font-semibold text-fg group-hover:underline">{newer.title}</span>
                </Link>
              )}
            </nav>
            <p className="mt-10">
              <Link href="/nieuws/" className="btn btn-line">
                Alle berichten
              </Link>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
