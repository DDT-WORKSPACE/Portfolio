"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Field = dynamic(() => import("./webgl-field"), { ssr: false });
export function SignalField() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      nav.connection?.saveData ||
      (navigator.hardwareConcurrency || 8) <= 4
    )
      return;
    let idle: number | undefined;
    const t = setTimeout(() => {
      if ("requestIdleCallback" in window)
        idle = window.requestIdleCallback(() => setActive(true), {
          timeout: 2000,
        });
      else setActive(true);
    }, 1600);
    return () => {
      clearTimeout(t);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, []);
  return (
    <div className="signal-field" aria-hidden="true">
      <svg viewBox="0 0 1600 850" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 28 }, (_, i) => (
          <path
            key={i}
            d={`M ${-400 + i * 48} 900 C ${650 + i * 8} ${850 - i * 13}, ${650 + i * 12} ${150 + i * 10}, ${1650} ${-350 + i * 40}`}
            fill="none"
            stroke="#1A62FF"
            strokeOpacity={0.035 + (i % 4) * 0.008}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={"b" + i}
            d={`M ${800 + i * 40} -200 C ${1200 - i * 20} 200, ${900 + i * 10} 600, ${1750} ${500 + i * 50}`}
            fill="none"
            stroke="#1A62FF"
            strokeOpacity=".07"
            strokeWidth="1"
          />
        ))}
      </svg>
      {active && <Field />}
    </div>
  );
}
