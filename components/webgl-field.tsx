"use client";
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
export default function WebGLField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        dpr: Math.min(devicePixelRatio, 1.5),
        antialias: false,
      });
    } catch {
      return;
    }
    const gl = renderer.gl;
    const gpu = gl.getExtension("WEBGL_debug_renderer_info");
    if (
      gpu &&
      /swiftshader|llvmpipe|software/i.test(
        gl.getParameter(gpu.UNMASKED_RENDERER_WEBGL),
      )
    ) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return;
    }
    el.appendChild(gl.canvas);
    let frame = 0,
      visible = true,
      disposed = false;
    const target = [0.7, 0.5];
    const program = new Program(gl, {
      transparent: true,
      vertex:
        "attribute vec2 position; attribute vec2 uv; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}",
      fragment: `precision mediump float; varying vec2 vUv; uniform float t; uniform vec2 pointer; void main(){vec2 p=vUv; float influence=exp(-length(p-pointer)*7.); p.y+=sin(p.x*4.+t*.15)*.012+influence*.018; float curve=p.y+sin(p.x*2.4)*.21; float lines=pow(max(0.,cos(curve*180.)),60.); float fade=smoothstep(.1,.65,p.x); float packet=pow(max(0.,cos(p.x*8.-t*.6)),60.)*pow(max(0.,cos(curve*36.)),150.); vec3 col=mix(vec3(.102,.384,1.),vec3(1.,.416,0.),step(.1,packet));gl_FragColor=vec4(col,(lines*.025+packet*.25)*fade);}`,
      uniforms: { t: { value: 0 }, pointer: { value: target.slice() } },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = new ResizeObserver(() =>
      renderer.setSize(el.clientWidth, el.clientHeight),
    );
    resize.observe(el);
    const pointer = (e: PointerEvent) => {
      target[0] = e.clientX / innerWidth;
      target[1] = 1 - e.clientY / innerHeight;
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    const tick = (t: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      program.uniforms.t.value = t * 0.001;
      const p = program.uniforms.pointer.value as number[];
      p[0] += (target[0] - p[0]) * 0.08;
      p[1] += (target[1] - p[1]) * 0.08;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else resume();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", resume);
    resume();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", resume);
      el.replaceChildren();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);
  return <div ref={ref} className="webgl-field" />;
}
