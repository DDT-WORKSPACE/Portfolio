"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const palette = {
  ceramic: 0xe0e9e1,
  emerald: 0x16483b,
  deep: 0x07221d,
  gold: 0xe3b969,
  mint: 0x83fdd2,
  signals: [0x83fdd2, 0xffca77, 0x9be6ff],
};

export function AutomationRobot({
  mode,
  step,
}: {
  mode: number;
  step: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const input = useRef({ mode, step });
  const redraw = useRef<(() => void) | null>(null);

  useEffect(() => {
    input.current = { mode, step };
    redraw.current?.();
  }, [mode, step]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 35);
    camera.position.set(3.3, 3.05, 8.4);
    camera.lookAt(0, 1.32, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.append(renderer.domElement);

    const key = new THREE.DirectionalLight(0xfff0d7, 3.4);
    key.position.set(-4, 6, 5);
    const rim = new THREE.DirectionalLight(0x86ffd0, 2.7);
    rim.position.set(1, 3, -3);
    const fill = new THREE.DirectionalLight(0x9fc8e5, 1.1);
    fill.position.set(4, 1, 4);
    scene.add(
      new THREE.HemisphereLight(0xdef3eb, 0x163d31, 1.75),
      key,
      rim,
      fill,
    );

    const ceramic = new THREE.MeshPhysicalMaterial({
      color: palette.ceramic,
      roughness: 0.3,
      metalness: 0.18,
      clearcoat: 0.7,
    });
    const emerald = new THREE.MeshStandardMaterial({
      color: palette.emerald,
      roughness: 0.39,
      metalness: 0.35,
    });
    const dark = new THREE.MeshPhysicalMaterial({
      color: palette.deep,
      roughness: 0.15,
      metalness: 0.22,
      clearcoat: 1,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: palette.gold,
      roughness: 0.33,
      metalness: 0.53,
    });
    const light = new THREE.MeshBasicMaterial({ color: palette.mint });
    const trace = new THREE.MeshBasicMaterial({
      color: palette.mint,
      transparent: true,
      opacity: 0.34,
    });
    const materials = [ceramic, emerald, dark, gold, light, trace];
    const geometries: THREE.BufferGeometry[] = [];

    function mesh(
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      parent: THREE.Object3D,
      x: number,
      y: number,
      z: number,
    ) {
      const object = new THREE.Mesh(geometry, material);
      object.position.set(x, y, z);
      parent.add(object);
      geometries.push(geometry);
      return object;
    }
    function box(
      parent: THREE.Object3D,
      size: [number, number, number],
      radius: number,
      material: THREE.Material,
      position: [number, number, number],
    ) {
      return mesh(
        new RoundedBoxGeometry(...size, 3, radius),
        material,
        parent,
        ...position,
      );
    }

    // The chassis and visor are separate volumes so the head and arms can react independently.
    const rig = new THREE.Group();
    scene.add(rig);
    const head = new THREE.Group();
    head.position.set(0, 2.05, 0);
    rig.add(head);
    box(head, [1.85, 1.19, 1.16], 0.29, ceramic, [0, 0, 0]);
    box(head, [1.61, 0.78, 0.22], 0.1, emerald, [0, -0.01, 0.53]);
    box(head, [1.51, 0.69, 0.18], 0.08, dark, [0, -0.01, 0.59]);
    const eyes = [-0.31, 0.31].map((x) =>
      box(head, [0.24, 0.18, 0.045], 0.022, light, [x, 0.075, 0.688]),
    );
    box(head, [0.26, 0.035, 0.026], 0.012, light, [0, -0.16, 0.687]);
    for (const side of [-1, 1]) {
      const ear = mesh(
        new THREE.CylinderGeometry(0.23, 0.23, 0.16, 32),
        emerald,
        head,
        side * 0.94,
        0.01,
        0,
      );
      const dial = mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.03, 28),
        gold,
        head,
        side * 1.035,
        0.01,
        0,
      );
      ear.rotation.z = dial.rotation.z = Math.PI / 2;
    }
    const mast = mesh(
      new THREE.CylinderGeometry(0.027, 0.043, 0.32, 12),
      gold,
      head,
      0.47,
      0.67,
      -0.14,
    );
    mast.rotation.z = -0.25;
    mesh(
      new THREE.SphereGeometry(0.08, 16, 12),
      light,
      head,
      0.512,
      0.82,
      -0.14,
    );

    box(rig, [1.23, 0.97, 0.93], 0.24, ceramic, [0, 0.96, 0]);
    box(rig, [0.75, 0.4, 0.49], 0.15, emerald, [0, 0.52, 0]);
    const badge = mesh(
      new THREE.CylinderGeometry(0.183, 0.183, 0.06, 32),
      gold,
      rig,
      0,
      1.02,
      0.471,
    );
    badge.rotation.x = Math.PI / 2;
    const badgeLight = mesh(
      new THREE.TorusGeometry(0.103, 0.012, 8, 36),
      light,
      rig,
      0,
      1.02,
      0.51,
    );
    const arms = [-1, 1].map((side) => {
      const arm = new THREE.Group();
      arm.position.set(side * 0.61, 1.26, 0.02);
      rig.add(arm);
      box(arm, [0.36, 0.69, 0.42], 0.14, ceramic, [side * 0.18, -0.32, 0]);
      box(arm, [0.26, 0.18, 0.32], 0.075, emerald, [side * 0.18, -0.59, 0]);
      return arm;
    });

    mesh(
      new THREE.CylinderGeometry(1.72, 1.8, 0.17, 64),
      emerald,
      scene,
      0,
      0.04,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(1.58, 1.63, 0.032, 64),
      dark,
      scene,
      0,
      0.14,
      0,
    );
    for (const radius of [1.22, 1.69, 2.04]) {
      const ring = mesh(
        new THREE.TorusGeometry(radius, 0.011, 6, 72),
        trace,
        scene,
        0,
        0.17,
        0,
      );
      ring.rotation.x = -Math.PI / 2;
    }
    const particles = Array.from({ length: 5 }, (_, index) =>
      mesh(
        new THREE.SphereGeometry(0.026 + (index % 2) * 0.008, 10, 8),
        index % 2 ? gold : light,
        scene,
        0,
        0,
        0,
      ),
    );

    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const target = new THREE.Vector2();
    const gaze = new THREE.Vector2();
    const color = new THREE.Color();
    let visible = false;
    let lost = false;
    let frame = 0;
    let elapsed = 0;
    let last = 0;
    let flash = 0;
    let previousSignal = -1;

    function active() {
      return visible && !document.hidden && !lost && !preference.matches;
    }
    function draw(now: number) {
      frame = 0;
      if (lost || (!visible && el!.dataset.rendered !== undefined)) return;
      const animated = active();
      const delta = last && animated ? Math.min((now - last) / 1000, 0.05) : 0;
      last = animated ? now : 0;
      elapsed += delta;
      const { mode, step } = input.current;
      const signal = mode * 3 + step;
      if (signal !== previousSignal) {
        flash = previousSignal < 0 ? 0 : 1;
        previousSignal = signal;
      }
      const t = preference.matches ? 0 : elapsed;
      flash = Math.max(0, flash - delta * 1.45);
      const pulse = preference.matches ? 0 : Math.sin(flash * Math.PI) * flash;
      color.setHex(palette.signals[mode]);
      light.color.lerp(color, animated ? 0.1 : 1);
      trace.color.copy(light.color);
      trace.opacity = 0.32 + pulse * 0.46;
      gaze.lerp(target, animated ? 0.065 : 0);
      rig.position.y = Math.sin(t * 1.6) * 0.068 + pulse * 0.11;
      rig.rotation.y = -0.2 + Math.sin(t * 0.68) * 0.11 + gaze.x * 0.19;
      head.rotation.x = -gaze.y * 0.12 - pulse * 0.11;
      head.rotation.y = gaze.x * 0.15;
      head.rotation.z = Math.sin(t * 0.85) * 0.035 + pulse * 0.06;
      arms[0].rotation.z = -0.34 - pulse * 0.2 + Math.sin(t * 1.35) * 0.035;
      arms[1].rotation.z = 0.34 + pulse * 0.75 - Math.sin(t * 1.2) * 0.04;
      badgeLight.scale.setScalar(1 + pulse * 0.25);
      const blink = t % 5.5;
      const blinkScale =
        blink > 5.32 ? Math.max(0.13, Math.abs(blink - 5.41) / 0.09) : 1;
      eyes.forEach((eye) => {
        eye.scale.y = blinkScale;
      });
      particles.forEach((particle, i) => {
        const angle =
          t * (0.54 + i * 0.031) + (i / particles.length) * Math.PI * 2;
        const distance = 1.65 + (i % 2) * 0.36;
        particle.position.set(
          Math.cos(angle) * distance,
          0.21 + (i % 2) * 0.12 + pulse * 0.22,
          Math.sin(angle) * distance,
        );
      });

      renderer.render(scene, camera);
      el!.dataset.rendered = "";
      if (animated) frame = requestAnimationFrame(draw);
    }
    function requestDraw() {
      if (!frame && !lost) frame = requestAnimationFrame(draw);
    }
    redraw.current = requestDraw;

    const resize = new ResizeObserver(() => {
      if (!el.clientWidth || !el.clientHeight) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.fov = camera.aspect < 1 ? 39 : 32;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight, false);
      requestDraw();
    });
    resize.observe(el);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
      else last = 0;
    });
    intersection.observe(el);

    const pointerMove = (event: PointerEvent) => {
      if (preference.matches || event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      target.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
      );
    };
    const pointerLeave = () => target.set(0, 0);
    const recover = () => {
      lost = false;
      requestDraw();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      delete el.dataset.rendered;
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener("webglcontextrestored", recover);
    el.addEventListener("pointermove", pointerMove);
    el.addEventListener("pointerleave", pointerLeave);
    preference.addEventListener("change", requestDraw);
    document.addEventListener("visibilitychange", requestDraw);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      redraw.current = null;
      resize.disconnect();
      intersection.disconnect();
      preference.removeEventListener("change", requestDraw);
      document.removeEventListener("visibilitychange", requestDraw);
      el.removeEventListener("pointermove", pointerMove);
      el.removeEventListener("pointerleave", pointerLeave);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", recover);
      delete el.dataset.rendered;
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="automation-robot-canvas" ref={host} aria-hidden="true" />
  );
}
