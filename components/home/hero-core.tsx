"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "@/components/theme";

// Emerald & gold theme: the scene keeps its structure, every light and material swaps to the
// Figma teal-green and gold (slightly brighter than the flat UI tones so the glass still glows).
const EMERALD_3D: Record<string, string> = {
  "#035fe8": "#1f8a7e",
  "#4d9bff": "#4fd1bf",
  "#ff6f00": "#d9a12a",
  "#ff8a3d": "#e8b04a",
  "#8fc0ff": "#8fe3d6",
  "#ffb06b": "#f0c770",
  "#0b3fb8": "#0f5a52",
  "#3d8bff": "#3cc2b0",
  "#e3efff": "#e6fbf6",
  "#dbe8ff": "#e2f6f1",
  "#bfd6ff": "#c4eee6",
  "#2f7bff": "#25a896",
  "#ff7a1a": "#e0a530",
  "#5aa2ff": "#4fd1bf",
  "rgba(110,170,255,0.95)": "rgba(110,225,205,0.95)",
  "rgba(3,95,232,0.35)": "rgba(20,140,125,0.35)",
  "rgba(255,170,90,0.9)": "rgba(245,200,110,0.9)",
  "rgba(255,111,0,0.3)": "rgba(215,155,35,0.3)",
};

function glowTexture(inner: string, outer: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, outer);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const fresnelVertex = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const fresnelFragment = `
  uniform vec3 uColor;
  uniform vec3 uColor2;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), uPower);
    vec3 col = mix(uColor, uColor2, smoothstep(-0.4, 0.9, vNormal.y * -0.6 + vNormal.x * 0.5));
    gl_FragColor = vec4(col * f * uIntensity, f);
  }
`;

function fresnelMaterial(c1: THREE.Color, c2: THREE.Color, power: number, intensity: number) {
  return new THREE.ShaderMaterial({
    vertexShader: fresnelVertex,
    fragmentShader: fresnelFragment,
    uniforms: {
      uColor: { value: c1 },
      uColor2: { value: c2 },
      uPower: { value: power },
      uIntensity: { value: intensity },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** Glowing edge frame for a cube of a given half-size. */
function edgeFrame(half: number, corner: number, color: THREE.Color, radius: number, haloOpacity: number) {
  const group = new THREE.Group();
  const core = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const halo = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: haloOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  // Sit each tube on the rounded edge and stop where the corner rounding starts.
  const len = 2 * (half - corner);
  const off = half - corner + corner / Math.SQRT2;
  const thin = new THREE.CylinderGeometry(radius, radius, len, 8, 1, true);
  const wide = new THREE.CylinderGeometry(radius * 4.5, radius * 4.5, len, 10, 1, true);
  const axes: [THREE.Euler, (a: number, b: number) => THREE.Vector3][] = [
    [new THREE.Euler(0, 0, 0), (a, b) => new THREE.Vector3(a, 0, b)],
    [new THREE.Euler(0, 0, Math.PI / 2), (a, b) => new THREE.Vector3(0, a, b)],
    [new THREE.Euler(Math.PI / 2, 0, 0), (a, b) => new THREE.Vector3(a, b, 0)],
  ];
  for (const [rot, pos] of axes)
    for (const a of [-off, off])
      for (const b of [-off, off]) {
        for (const [geo, mat] of [
          [thin, core],
          [wide, halo],
        ] as const) {
          const m = new THREE.Mesh(geo, mat);
          m.rotation.copy(rot);
          m.position.copy(pos(a, b));
          group.add(m);
        }
      }
  return group;
}

export function HeroCore() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const tone = (v: string) => (theme === "emerald" ? (EMERALD_3D[v] ?? v) : v);
    const C = (hex: string) => new THREE.Color(tone(hex));
    const BLUE = C("#035fe8");
    const BLUE_LIGHT = C("#4d9bff");
    const ORANGE = C("#ff6f00");
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setFailed(true);
      return;
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    scene.environment = pmrem.fromScene(room, 0.04).texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.25, 10.4);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(C("#bfd6ff"), 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 5, 6);
    scene.add(key);
    const blueLight = new THREE.PointLight(C("#2f7bff"), 60, 14);
    blueLight.position.set(-3.5, 0.5, 2.5);
    scene.add(blueLight);
    const orangeLight = new THREE.PointLight(C("#ff7a1a"), 38, 12);
    orangeLight.position.set(3.4, -1.6, 2.2);
    scene.add(orangeLight);
    const innerLight = new THREE.PointLight(C("#5aa2ff"), 18, 4);
    innerLight.position.set(0, 0, -0.9);
    scene.add(innerLight);

    const root = new THREE.Group();
    scene.add(root);
    const disposables: { dispose: () => void }[] = [room, pmrem];
    const track = <T extends { dispose: () => void }>(x: T) => {
      disposables.push(x);
      return x;
    };

    // Glow sprites behind and under the cube.
    const blueGlowTex = track(glowTexture(tone("rgba(110,170,255,0.95)"), tone("rgba(3,95,232,0.35)")));
    const orangeGlowTex = track(glowTexture(tone("rgba(255,170,90,0.9)"), tone("rgba(255,111,0,0.3)")));
    const sprite = (tex: THREE.Texture, scale: number, opacity: number) => {
      const s = new THREE.Sprite(
        track(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );
      s.scale.setScalar(scale);
      return s;
    };
    const backGlow = sprite(blueGlowTex, 6, 0.42);
    backGlow.position.set(0, 0.05, -2.2);
    root.add(backGlow);
    const orangeGlow = sprite(orangeGlowTex, 3.4, 0.28);
    orangeGlow.position.set(0.75, -0.5, -1.2);
    root.add(orangeGlow);

    // Floor light pool and rings.
    const floor = new THREE.Mesh(
      track(new THREE.PlaneGeometry(5.6, 5.6)),
      track(
        new THREE.MeshBasicMaterial({
          map: blueGlowTex,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.61;
    root.add(floor);
    const ringMat = (color: THREE.Color, opacity: number) =>
      track(
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
    for (const [r, c, o] of [
      [1.4, BLUE_LIGHT, 0.75],
      [1.85, BLUE, 0.45],
      [2.35, ORANGE, 0.26],
    ] as const) {
      const ring = new THREE.Mesh(track(new THREE.TorusGeometry(r, 0.008, 6, 128)), ringMat(c, o));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.6;
      root.add(ring);
    }

    // Nested glass cubes around a glowing core.
    const cube = new THREE.Group();
    root.add(cube);
    const outerGeo = track(new RoundedBoxGeometry(1.9, 1.9, 1.9, 6, 0.2));
    const glass = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x2a62d8,
        metalness: 0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.06,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 0.8,
        iridescence: 0.35,
        iridescenceIOR: 1.4,
        depthWrite: false,
      }),
    );
    const glassBack = track(glass.clone());
    glassBack.side = THREE.BackSide;
    glassBack.opacity = 0.08;
    cube.add(new THREE.Mesh(outerGeo, glassBack));
    cube.add(new THREE.Mesh(outerGeo, glass));
    const rim = new THREE.Mesh(outerGeo, track(fresnelMaterial(BLUE_LIGHT, C("#ff8a3d"), 2.8, 0.8)));
    rim.scale.setScalar(1.003);
    cube.add(rim);
    cube.add(edgeFrame(0.95, 0.2, BLUE_LIGHT, 0.011, 0.12));

    const innerCube = new THREE.Group();
    cube.add(innerCube);
    const innerGeo = track(new RoundedBoxGeometry(1.12, 1.12, 1.12, 5, 0.12));
    const innerGlass = track(glass.clone());
    innerGlass.opacity = 0.08;
    innerCube.add(new THREE.Mesh(innerGeo, innerGlass));
    innerCube.add(new THREE.Mesh(innerGeo, track(fresnelMaterial(C("#8fc0ff"), ORANGE, 2.6, 0.75))));
    innerCube.add(edgeFrame(0.56, 0.12, C("#ffb06b"), 0.008, 0.1));

    // The core: a small, bright cube that spins on its own axis.
    const core = new THREE.Group();
    cube.add(core);
    const coreGeo = track(new RoundedBoxGeometry(0.46, 0.46, 0.46, 4, 0.07));
    const coreMat = track(
      new THREE.MeshPhysicalMaterial({
        color: C("#0b3fb8"),
        emissive: C("#3d8bff"),
        emissiveIntensity: 1,
        roughness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 0.6,
        toneMapped: false,
      }),
    );
    core.add(new THREE.Mesh(coreGeo, coreMat));
    core.add(edgeFrame(0.23, 0.07, C("#e3efff"), 0.006, 0.22));
    const coreGlow = sprite(blueGlowTex, 2.4, 0.75);
    cube.add(coreGlow);
    const coreWarm = sprite(orangeGlowTex, 1.1, 0.35);
    coreWarm.position.set(0.18, -0.16, 0.2);
    cube.add(coreWarm);

    // Orbit rings with travelling beads.
    const orbits = new THREE.Group();
    root.add(orbits);
    const beads: { mesh: THREE.Sprite; radius: number; speed: number; offset: number; ring: THREE.Object3D }[] = [];
    (
      [
        [1.62, BLUE_LIGHT, 0.5, new THREE.Euler(1.2, 0.2, 0.3), 0.32],
        [1.88, ORANGE, 0.38, new THREE.Euler(1.9, -0.4, -0.5), -0.22],
      ] as const
    ).forEach(([r, color, opacity, euler, speed], i) => {
      const holder = new THREE.Group();
      holder.rotation.copy(euler);
      const ring = new THREE.Mesh(track(new THREE.TorusGeometry(r, 0.006, 6, 160)), ringMat(color, opacity));
      holder.add(ring);
      const bead = sprite(i ? orangeGlowTex : blueGlowTex, 0.42, 1);
      holder.add(bead);
      beads.push({ mesh: bead, radius: r, speed, offset: i * 2.1, ring: holder });
      orbits.add(holder);
    });

    // Particle dust.
    const count = 320;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 3.2,
        th = Math.random() * Math.PI * 2,
        ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.5;
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.75;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 1;
      const c = Math.random() < 0.18 ? ORANGE : Math.random() < 0.5 ? BLUE_LIGHT : C("#dbe8ff");
      col.set([c.r, c.g, c.b], i * 3);
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const dust = new THREE.Points(
      dustGeo,
      track(
        new THREE.PointsMaterial({
          size: 0.035,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          map: blueGlowTex,
        }),
      ),
    );
    root.add(dust);

    // Sizing.
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the whole composition in frame on narrow screens.
      camera.position.z = w / h < 0.9 ? 12.4 : 10.4;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Pointer parallax.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0,
      visible = true,
      last = performance.now(),
      t = 0,
      intro = 0;
    const clock = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      intro = Math.min(1, intro + dt * 0.7);
      const ease = 1 - Math.pow(1 - intro, 3);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const scroll = Math.min(1, scrollY / Math.max(1, innerHeight));

      root.scale.setScalar(0.72 + ease * 0.28);
      root.position.y = Math.sin(t * 0.8) * 0.06 + 0.05;
      cube.rotation.x = 0.52 + pointer.y * 0.1 + scroll * 0.15;
      cube.rotation.y = t * 0.26 + pointer.x * 0.25 + scroll * 0.8;
      cube.rotation.z = 0.08 + Math.sin(t * 0.4) * 0.04;
      innerCube.scale.setScalar(1 + Math.sin(t * 1.1) * 0.025);
      core.rotation.x = t * 0.7;
      core.rotation.y = -t * 0.9;
      coreMat.emissiveIntensity = 0.9 + Math.sin(t * 2.2) * 0.18;
      coreGlow.material.opacity = 0.65 + Math.sin(t * 2.2) * 0.12;
      beads.forEach((b) => {
        const a = t * b.speed * 2 + b.offset;
        b.mesh.position.set(Math.cos(a) * b.radius, Math.sin(a) * b.radius, 0);
        b.ring.rotation.z += dt * b.speed * 0.15;
      });
      dust.rotation.y = t * 0.03;
      backGlow.material.opacity = 0.4 + Math.sin(t * 1.3) * 0.07;
      innerLight.intensity = 16 + Math.sin(t * 2) * 4;
      renderer.render(scene, camera);
      if (!reduced) raf = requestAnimationFrame(clock);
    };
    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(clock);
      }
    };
    if (reduced) {
      intro = 1;
      t = 2;
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      disposables.forEach((d) => d.dispose());
      scene.environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [theme]);

  return (
    <div className={`dd-core ${ready ? "is-ready" : ""}`} ref={host}>
      {failed && (
        <div className="dd-core-fallback" aria-hidden="true">
          <div className="dd-core-fallback-cube">
            <span />
          </div>
        </div>
      )}
    </div>
  );
}
