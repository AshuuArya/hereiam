import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import flowers from "@/assets/flowers_new.jpg";
import hills from "@/assets/hills.jpg";
import gymPhoto from "@/assets/gym_photo.jpg";
import blur from "@/assets/blur.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "offline — a quiet internet story" },
      {
        name: "description",
        content:
          "a cinematic late-night scroll about slowly getting attached to a stranger through messages.",
      },
      { property: "og:title", content: "offline — a quiet internet story" },
      {
        property: "og:description",
        content: "two people who unexpectedly started mattering to each other.",
      },
    ],
  }),
  component: Index,
});

/* ----------------- helpers ----------------- */

function useTyper(text: string, speed = 55, start = true, delay = 0) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setOut(text.slice(0, i));
      if (i++ < text.length) id = setTimeout(tick, speed);
    };
    const startId = setTimeout(tick, delay);
    return () => {
      clearTimeout(startId);
      clearTimeout(id);
    };
  }, [text, speed, start, delay]);
  return out;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("in")),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ----------------- intro ----------------- */

function Intro({ onEnter }: { onEnter: () => void }) {
  const line1 = useTyper("well this convo can take any turn…", 55, true, 600);
  const done1 = line1.length === "well this convo can take any turn…".length;
  const line2 = useTyper(
    "but it depends on what road you choose.",
    55,
    done1,
    900,
  );
  const done2 = line2.length === "but it depends on what road you choose.".length;

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl">
        <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          ~/offline · 02:14 am
        </p>
        <p className="serif text-3xl md:text-5xl leading-tight text-foreground">
          {line1}
          {!done1 && <span className="caret" />}
        </p>
        {done1 && (
          <p className="serif text-3xl md:text-5xl leading-tight text-foreground mt-6">
            {line2}
            {!done2 && <span className="caret" />}
          </p>
        )}
        <div
          className={`mt-16 transition-opacity duration-1000 ${done2 ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={onEnter}
            className="mono text-sm tracking-[0.25em] uppercase border border-border px-6 py-3 rounded-sm glow-hover hover:border-primary/70"
          >
            [ enter ]
          </button>
          <p className="mono text-[10px] text-muted-foreground mt-4 tracking-widest">
            scroll slowly. it's late.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------- sections ----------------- */

function QuoteLine({ children, tag }: { children: React.ReactNode; tag?: string }) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <Reveal className="max-w-3xl text-center">
        {tag && (
          <p className="mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
            {tag}
          </p>
        )}
        <p className="serif italic text-4xl md:text-6xl leading-[1.15] text-foreground">
          “{children}”
        </p>
      </Reveal>
    </section>
  );
}

function Chat({
  messages,
}: {
  messages: { from: "me" | "them"; text: string; dim?: boolean; typing?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`bubble ${m.from} ${m.dim ? "dim" : ""} pop`}
          style={{ animationDelay: `${i * 180}ms` }}
        >
          {m.typing ? (
            <span className="typing">
              <span /> <span /> <span />
            </span>
          ) : (
            m.text
          )}
        </div>
      ))}
    </div>
  );
}

function Story() {
  return (
    <main className="relative z-10">
      {/* preface */}
      <section className="min-h-[80vh] flex items-end px-6 pb-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            00 · preface
          </p>
          <h1 className="serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            i wasn't looking for anything.
            <br />
            I was just scrolling but then 
            <br />
            a stupid asked me to "this convo can take any turn but it depends on what road you choose."
          </h1>
        </Reveal>
      </section>

      <QuoteLine tag="01 · JUMP TO THE ACT">you on my main screen</QuoteLine>

      {/* main screen moment */}
      <section className="min-h-screen flex items-center px-6 max-w-5xl mx-auto">
        <Reveal className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              A PHONE, ON A DESK
            </p>
            <p className="serif text-2xl md:text-3xl leading-snug">
              i didn't mean to put him there. he just{" "}
              <span className="italic">ended up</span> there.
              <br />
              the chat. the notifications. the small green dot.
            </p>
            <p className="mono text-xs text-whisper mt-6 text-muted-foreground">
              ↳ realized "aapna kutch toh chal raha hai"
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/40 p-5 backdrop-blur-sm drift">
            <p className="mono text-[10px] text-muted-foreground mb-3">
              ● ● ●   notifications · today
            </p>
            <Chat
              messages={[
                { from: "them", text: "what you doing" },
                { from: "them", text: "(stupid question he always asks)" },
                { from: "me", text: "travelling back to home" },
                { from: "them", text: "okayy (this is a cute acknowledgement he gives)" },
              ]}
            />
          </div>
        </Reveal>
      </section>

      {/* flowers */}
      <section className="min-h-screen flex items-center px-6">
        <Reveal className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 items-center w-full">
          <figure className="md:col-span-3">
            <img
              src={flowers}
              alt="small wildflowers on a path"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-auto rounded-md grayscale-[20%] contrast-95 brightness-90"
            />
            <figcaption className="mono text-[10px] text-muted-foreground mt-3 tracking-widest">
              sent to → him
            </figcaption>
          </figure>
          <div className="md:col-span-2">
            <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              02 · the flowers
            </p>
            <p className="serif text-2xl md:text-3xl leading-snug">
              i just thought they looked cute.
              <br />
              didn't expect to send them to someone.
            </p>
            <p className="text-sm text-muted-foreground mt-6 max-w-sm">
              i don't usually share walks. i don't usually share anything,
              actually. but my thumb hovered over his name longer than it should
              have, and then it was done.
            </p>
          </div>
        </Reveal>
      </section>

      <QuoteLine tag="03 · accident">that pic was a mistake</QuoteLine>

      {/* gym photo incident */}
      <section className="min-h-screen flex items-center px-6 max-w-5xl mx-auto">
        <Reveal className="grid md:grid-cols-2 gap-16 items-center w-full">
          <div className="relative h-[420px]">
            <div className="absolute inset-0 rotate-[-4deg] translate-x-2 translate-y-2 rounded-lg overflow-hidden border border-border opacity-60">
              <img src={gymPhoto} alt="" className="w-full h-full object-cover blur-sm" />
            </div>
            <div className="absolute inset-0 rotate-[2deg] -translate-x-1 rounded-lg overflow-hidden border border-border opacity-80">
              <img src={gymPhoto} alt="" className="w-full h-full object-cover blur-[2px]" />
            </div>
            <div className="absolute inset-0 rounded-lg overflow-hidden border border-primary/30 shadow-[0_0_60px_oklch(0.35_0.12_235/40%)]">
              <img src={gymPhoto} alt="accidental third photo" className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 mono text-[10px] text-primary/80 tracking-widest">
                3 / 3 · oops
              </span>
            </div>
          </div>
          <div>
            <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              04 · the gym photo incident
            </p>
            <p className="serif text-2xl md:text-3xl leading-snug">
              he sent two.
              <br />
              and then a third one, faster than he could pull it back.
            </p>
            <div className="mt-8">
              <Chat
                messages={[
                  { from: "them", text: "wait" },
                  { from: "them", text: "WAIT no" },
                  { from: "them", text: "that pic was a mistake 💀" },
                  { from: "me", text: "...flex pic? really??" },
                  { from: "them", text: "delete it from your brain. now." },
                ]}
              />
            </div>
            <p className="mono text-xs text-muted-foreground mt-6">
              ↳ i did not delete it from my brain. I didnt know if i should be mad or impressed.
            </p>
          </div>
        </Reveal>
      </section>

      <QuoteLine tag="05 · THE BLOCK ">“i didnt meant to hurt you i didnt know it was touchy topic.”</QuoteLine>

      {/* weight comment — careful */}
      <section className="min-h-screen flex items-center px-6 max-w-4xl mx-auto">
        <Reveal className="w-full">
          <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            06 · the wound
          </p>
          <p className="serif text-3xl md:text-5xl leading-tight mb-12">
            some jokes land differently when its related to touchy spot
          </p>
          <div className="space-y-2 max-w-md">
            <div className="bubble them dim">hey i didnt meant it in a bad way.</div>
            <div className="bubble them dim">it was a joke</div>
            <div className="bubble them dim opacity-25">hello?</div>
            <div className="bubble them dim opacity-15">are you there</div>
            <div className="bubble them dim opacity-10">i'm sorry</div>
            <p className="mono text-[10px] text-muted-foreground pt-4">
              ↳ blocked · 03:11 am
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <p className="text-sm text-muted-foreground leading-relaxed">
              he called me "83kg moti." a throwaway line. funny, supposedly. i
              didn't laugh. i didn't reply. i closed the chat and blocked him right away.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              he spoke before understanding.
              day later he texted me on reddit. typed a real apology — no defending, no <span className="not-italic">"i meant–"</span>, just the
              sentence said properly. i stared at it. then i typed back. "you know its a touchy spot"
            </p>
          </div>
        </Reveal>
      </section>

      <QuoteLine tag="07 · resumed">hum dono ka kuch toh chal raha hai</QuoteLine>

      {/* study calls */}
      <section className="min-h-screen flex items-center px-6 max-w-5xl mx-auto">
        <Reveal className="w-full">
          <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            08 · THE DATE DISGUISED AS STUDY CALL
          </p>
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
              <span className="mono text-[10px] text-muted-foreground ml-4">
                meet.google.com/qzy-pnxk-rmw · 23:48
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-muted/60 rounded-md flex items-end justify-between p-3">
                <span className="mono text-[10px] text-muted-foreground">you</span>
                <span className="mono text-[10px] text-muted-foreground">🎤 muted</span>
              </div>
              <div className="aspect-video bg-muted/40 rounded-md flex items-end justify-between p-3 border border-primary/20">
                <span className="mono text-[10px] text-primary/80">him</span>
                <span className="mono text-[10px] text-muted-foreground">🎤 muted</span>
              </div>
            </div>
            <p className="serif italic text-2xl mt-8 max-w-md">
              we weren't even talking half the time.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              just the sound of two keyboards. occasionally a sigh. once, a yawn that
              made me smile for no reason.
            </p>
          </div>
        </Reveal>
      </section>

      {/* tiny details */}
      <section className="min-h-screen px-6 py-32 max-w-6xl mx-auto">
        <Reveal>
          <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            09 · bookmarks
          </p>
          <h2 className="serif text-4xl md:text-5xl mb-16 max-w-2xl">
            small things i shouldn't remember but do.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "flowers.jpg", s: "sent without thinking" },
            { t: "overthinker.man", s: "he overthinks idk if i should be thankful for it or not." },
            { t: "swim.note", s: "learning to swim at 22. proud of myself. (want to teach him secretively) " },
            { t: "hillstation.geo", s: "want to say i'd take him there someday." },
            { t: "main_screen.png", s: "his says i am on his main screen " },
            { t: "tomato.txt", s: "study calls that turned into nothing-calls" },
            { t: "thermal_paste", s: "he explained it. kinda impressed by his mansplaining." },
            { t: "03:46_talks", s: "the story continues.... " },
            { t: "tomato.txt", s: "“i am gonna make you red as a tomato”" },
          ].map((d, i) => (
            <Reveal key={d.t} className={i % 3 === 1 ? "md:translate-y-6" : ""}>
              <div className="border border-border rounded-md p-5 bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-colors group">
                <p className="mono text-[10px] text-muted-foreground tracking-widest">
                  {String(i + 1).padStart(2, "0")} ·{" "}
                  <span className="group-hover:text-primary/80 transition-colors">{d.t}</span>
                </p>
                <p className="serif text-xl mt-4 leading-snug">{d.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteLine tag="10 · admitted, almost">yaad toh tab aaye gi na jab bhula paau ga</QuoteLine>

      {/* personality observations */}
      <section className="min-h-screen px-6 py-32 max-w-5xl mx-auto">
        <Reveal>
          <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            11 · field notes
          </p>
          <h2 className="serif text-4xl md:text-5xl mb-16 max-w-3xl">
            what i've noticed about him, written nowhere except here.
          </h2>
        </Reveal>
        <div className="space-y-10 max-w-3xl">
          {[
            "talks too much when he's nervous. fills every silence like it owes him rent.",
            "acts confident on the surface, then overthinks the same sentence for three days. (revisits conversations)",
            "turns everything into teasing. it's a tell. it's also kind of effective.",
            "remembers tiny details. the exact thing i said randomly at  1am.",
            "emotionally intense at random hours. always at the wrong hour. always at the right one too.",
            "accidentally harsh sometimes. doesn't notice until it's already landed.",
            "tries to repair things sincerely. that part i wasn't ready for.",
          ].map((line, i) => (
            <Reveal key={i}>
              <div className="flex gap-6 items-start">
                <span className="mono text-xs text-muted-foreground pt-2 w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="serif text-2xl md:text-3xl leading-snug">{line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* hills parallax */}
      <section
        className="relative min-h-[80vh] flex items-end px-6 py-32 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `linear-gradient(to bottom, oklch(0.13 0.018 260 / 60%), oklch(0.13 0.018 260)), url(${hills})` }}
      >
        <Reveal className="max-w-3xl">
          <p className="serif text-3xl md:text-5xl leading-tight">
            we never went anywhere together. <br />
            but somehow i drove him through every hillstation in my head.
          </p>
        </Reveal>
      </section>

      <Ending />
    </main>
  );
}

function Ending() {
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && setTrigger(true),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const l1 = useTyper("hum dono ka kuch toh chal raha hai", 60, trigger, 400);
  const d1 = l1.length === "hum dono ka kuch toh chal raha hai".length;
  const l2 = useTyper("pata nahi.", 80, d1, 1200);
  const d2 = l2.length === "pata nahi.".length;
  const l3 = useTyper("offline", 140, d2, 1400);
  const d3 = l3.length === "offline".length;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 bg-background"
    >
      <div className="max-w-2xl w-full">
        <p className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">
          ~/offline · end of buffer
        </p>
        <p className="serif italic text-3xl md:text-5xl leading-tight min-h-[1.2em]">
          {l1}
          {!d1 && <span className="caret" />}
        </p>
        {d1 && (
          <p className="serif text-2xl md:text-3xl text-muted-foreground mt-10 min-h-[1.2em]">
            {l2}
            {!d2 && <span className="caret" />}
          </p>
        )}
        {d2 && (
          <p className="mono text-sm tracking-[0.4em] uppercase mt-20 text-primary/80 min-h-[1.2em]">
            {l3}
            {!d3 && <span className="caret" />}
          </p>
        )}
        {d3 && (
          <p className="mono text-[10px] text-muted-foreground mt-16 tracking-widest opacity-60">
            ↳ connection closed by remote host. <br />
            ↳ nothing here is resolved. that's the point.
          </p>
        )}
      </div>
    </section>
  );
}

/* ----------------- root ----------------- */

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground screen-glow grain">
      {!entered ? <Intro onEnter={() => setEntered(true)} /> : <Story />}
    </div>
  );
}
