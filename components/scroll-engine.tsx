"use client";
import { ReactLenis } from "lenis/react";
export default function ScrollEngine() {
  return <ReactLenis root options={{ lerp: 0.1, anchors: true }} />;
}
