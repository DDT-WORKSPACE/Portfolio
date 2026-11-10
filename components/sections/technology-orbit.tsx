"use client";
import { useEffect, useRef } from "react";
import { Icon } from "../ui";

export function TechnologyOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    const update = () => {
      el.dataset.orbit = visible && !document.hidden ? "running" : "paused";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div
      className="technology-hub tech-planetary"
      ref={ref}
      data-orbit="paused"
      aria-hidden="true"
    >
      <span className="planet-ring outer-ring" />
      <span className="planet-ring inner-ring" />
      <div className="tech-orbit-core">
        <img src="/Logo/logo.png" width={45} height={47} alt="" />
      </div>
      {["code", "cloud", "spark", "chart"].map((icon, i) => (
        <span
          key={icon}
          className={`planet-track planet-track-${i} ${i > 1 ? "inner-track" : "outer-track"}`}
        >
          <span className="planet-marker">
            <span className="planet-face">
              <Icon name={icon} size={23} />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
