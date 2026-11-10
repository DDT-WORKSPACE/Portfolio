"use client";
import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Marker } from "../ui";
const decisions = [
  {
    before: "Too many priorities.",
    after: "One problem worth solving.",
    note: "Decide what actually needs to change.",
  },
  {
    before: "An idea in everyone’s head.",
    after: "A direction everyone can see.",
    note: "Make the important decisions tangible.",
  },
  {
    before: "Updates about the work.",
    after: "A product you can put to work.",
    note: "Review the experience, not just a status report.",
  },
];
function Decision({ i, p }: { i: number; p: MotionValue<number> }) {
  const r = useReducedMotion(),
    x = useTransform(p, [0, 0.75], [(i % 2 ? 1 : -1) * 70, 0]),
    opacity = useTransform(p, [0.12 + i * 0.14, 0.35 + i * 0.14], [0.25, 1]),
    line = useTransform(p, [0.1 + i * 0.13, 0.5 + i * 0.13], [0, 1]);
  return (
    <m.div className="decision-row" style={r ? {} : { x, opacity }}>
      <div className="decision-before">{decisions[i].before}</div>
      <div className="decision-connector">
        <m.i style={{ scaleX: r ? 1 : line }} />
        <span />
      </div>
      <div className="decision-after">
        <h3>{decisions[i].after}</h3>
        <p>{decisions[i].note}</p>
      </div>
    </m.div>
  );
}
export function Handoffs() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Clarity />
    </LazyMotion>
  );
}
function Clarity() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section className="clarity-section" id="handoffs" ref={ref}>
      <div className="container clarity-sticky">
        <div className="clarity-intro">
          <div>
            <Marker>less friction. more forward</Marker>
            <h2>
              Less noise.
              <br />A clearer way forward.
            </h2>
          </div>
          <p>
            Before we add features, we remove uncertainty. Every conversation
            should bring the work closer to a useful outcome.
          </p>
        </div>
        <div className="decision-list">
          {decisions.map((d, i) => (
            <Decision key={d.after} i={i} p={scrollYProgress} />
          ))}
        </div>
        <div className="clarity-footer">
          <span>A shared understanding changes the work.</span>
          <span>
            <i />
            Clarity before complexity
          </span>
        </div>
      </div>
    </section>
  );
}
