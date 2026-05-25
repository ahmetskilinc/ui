import Image from "next/image";
import { FeaturedCard } from "@/components/home/featured-card";
import { MultiSelectShowcase } from "@/components/home/showcases";
import VideoPlayerPreview from "@/components/video-player-preview";

export function Featured() {
  return (
    <section className="border-b border-grid">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-6 px-4 py-12 md:py-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            Featured
          </h2>
          <p className="text-muted-foreground">
            Some highlights from the library — try them right here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <FeaturedCard
            title="Dual Sidebar"
            description="A two-sided sidebar block — drop it into any Next.js app."
            href="/blocks"
            previewPadding={false}
            previewClassName="items-stretch"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/dual-sidebar-light.png"
                alt="Dual Sidebar block preview"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top dark:hidden"
              />
              <Image
                src="/images/dual-sidebar-dark.png"
                alt="Dual Sidebar block preview"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="hidden object-cover object-top dark:block"
              />
            </div>
          </FeaturedCard>

          <FeaturedCard
            title="Video Player"
            description="A composable player with accessible controls and swappable icons."
            href="/docs/components/video-player"
            previewPadding={false}
            previewClassName="items-stretch p-0"
          >
            <div className="flex w-full items-center self-stretch">
              <VideoPlayerPreview />
            </div>
          </FeaturedCard>

          <FeaturedCard
            title="Multi-Select Combobox"
            description="Searchable, badge-driven multi-select built on cmdk."
            href="/docs/components/multiselect-combobox"
          >
            <MultiSelectShowcase />
          </FeaturedCard>

          <FeaturedCard
            title="Better Auth for Next.js"
            description="Drop-in auth setup with Better Auth + SQLite — wired and ready."
            href="/docs/components/better-auth"
            previewPadding={false}
          >
            <BetterAuthSnippet />
          </FeaturedCard>
        </div>
      </div>
    </section>
  );
}

function BetterAuthSnippet() {
  return (
    <div className="flex h-full w-full max-w-md flex-col self-center gap-1.5 px-6 font-mono text-xs leading-relaxed md:text-sm">
      <CodeLine n={1}>
        <T m>import</T> {"{ auth }"} <T m>from</T>{" "}
        <T m>{'"@/lib/auth"'}</T>
      </CodeLine>
      <CodeLine n={2}>
        <T m>import</T> {"{ authClient }"} <T m>from</T>{" "}
        <T m>{'"@/lib/auth-client"'}</T>
      </CodeLine>
      <CodeLine n={3}>{"\u00A0"}</CodeLine>
      <CodeLine n={4}>
        <T m>const</T> session{" "}
        <T m>=</T> <T m>await</T> auth.api.getSession(req)
      </CodeLine>
      <CodeLine n={5}>{"\u00A0"}</CodeLine>
      <CodeLine n={6}>
        <T m>await</T> authClient.signIn.email({"{"}
      </CodeLine>
      <CodeLine n={7}>
        <span className="pl-4">
          email<T m>:</T> <T m>{'"you@ahmet.studio"'}</T>
          <T m>,</T>
        </span>
      </CodeLine>
      <CodeLine n={8}>
        <span className="pl-4">
          password<T m>:</T> <T m>{'"••••••••"'}</T>
          <T m>,</T>
        </span>
      </CodeLine>
      <CodeLine n={9}>{"})"}</CodeLine>
    </div>
  );
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-3">
      <span className="w-4 select-none text-right text-muted-foreground/60">
        {n}
      </span>
      <span className="whitespace-pre-wrap">{children}</span>
    </div>
  );
}

function T({ m, children }: { m?: boolean; children: React.ReactNode }) {
  return <span className={m ? "text-muted-foreground" : ""}>{children}</span>;
}
