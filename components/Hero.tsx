"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { links } from "@/content/site";
import heroPhoto from "@/public/Turquoise gemeentelijk zwembad tussen groene bomen-2.png";
import { ExternalLink } from "./ExternalLink";

/** Wit = water, zwart = de rest. Zelfde verhouding als de foto. */
const MASK_SRC = "/images/hero-water-mask.png";
/** Uitsnijpunt van de foto (x, y), gelijk aan object-position hieronder. */
const ALIGN: [number, number] = [0.55, 0.55];
const RIPPLES = 10;

const rise = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const waterRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current!;
    const stick = stickRef.current!;
    const photo = photoRef.current!;
    const glc = waterRef.current!;
    const dcv = dropsRef.current!;
    const hint = hintRef.current!;
    const nav = document.querySelector("header");
    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window, type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, opts);
      cleanups.push(() => t.removeEventListener(type, fn));
    };

    /* ----- scroll: de stijgende waterlijn ----- */
    let progress = 0;
    const layout = () => document.documentElement.style.setProperty("--nav-h", (nav?.offsetHeight ?? 64) + "px");
    const onScroll = () => {
      const total = hero.offsetHeight - stick.offsetHeight;
      const s = (nav?.offsetHeight ?? 0) - hero.getBoundingClientRect().top;
      const p = total > 0 && !reduceMQ.matches ? clamp(s / total, 0, 1) : 0;
      progress = p * p * (3 - 2 * p);
      hero.style.setProperty("--p", progress.toFixed(4));
    };
    layout();
    onScroll();
    on(window, "scroll", onScroll, { passive: true });
    on(window, "resize", () => {
      layout();
      onScroll();
    });

    /* ----- WebGL-water over de foto ----- */
    let ctx: WebGLRenderingContext | null = null;
    try {
      ctx = glc.getContext("webgl", { alpha: false, antialias: false });
    } catch {
      ctx = null;
    }
    const gl = ctx;
    const water = gl ? createWater(gl) : null;
    if (!gl || !water) return () => cleanups.forEach((c) => c());

    let W = 0,
      H = 0,
      dpr = 1,
      IA = heroPhoto.width / heroPhoto.height;
    const rip = new Float32Array(RIPPLES * 4); // x, y (beeld-uv), starttijd, sterkte
    type Drop = { x: number; y: number; y0: number; vx: number; vy: number; g: number; r: number };
    let drops: Drop[] = [];
    let maskData: Uint8ClampedArray | null = null,
      maskW = 0,
      maskH = 0;
    let time = 0,
      last = 0,
      raf = 0,
      visible = true,
      ready = false,
      started = false,
      disposed = false;
    const dctx = dcv.getContext("2d")!;

    const size = () => {
      W = stick.clientWidth;
      H = stick.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      glc.width = dcv.width = Math.round(W * dpr);
      glc.height = dcv.height = Math.round(H * dpr);
      gl.viewport(0, 0, glc.width, glc.height);
    };
    const toImg = (px: number, py: number): [number, number] => {
      const sa = W / H;
      const [sx, sy] = sa > IA ? [1, IA / sa] : [sa / IA, 1];
      const cx = ALIGN[0] * (1 - sx) + sx * 0.5,
        cy = ALIGN[1] * (1 - sy) + sy * 0.5;
      return [cx + (px / W - 0.5) * sx, cy + (py / H - 0.5) * sy];
    };
    const maskAt = ([u, v]: [number, number]) => {
      if (!maskData) return v > 0.42 && v < 0.78 ? 1 : 0;
      const x = clamp(Math.round(u * (maskW - 1)), 0, maskW - 1),
        y = clamp(Math.round(v * (maskH - 1)), 0, maskH - 1);
      return maskData[(y * maskW + x) * 4] / 255;
    };
    const rippleActive = () => {
      for (let i = 0; i < RIPPLES; i++) if (rip[i * 4 + 3] > 0 && time - rip[i * 4 + 2] < 5) return true;
      return false;
    };
    const addRipple = (u: number, v: number, amp: number) => {
      let idx = 0,
        oldest = Infinity;
      for (let i = 0; i < RIPPLES; i++) {
        if (rip[i * 4 + 3] === 0) {
          idx = i;
          break;
        }
        if (rip[i * 4 + 2] < oldest) {
          oldest = rip[i * 4 + 2];
          idx = i;
        }
      }
      rip.set([u, v, time, amp], idx * 4);
      kick();
    };

    /* druppels: een kleine plons boven het punt van de klik */
    const spawnDrops = (px: number, py: number) => {
      const persp = 0.6 + 0.7 * clamp((py / H - 0.3) / 0.5, 0, 1);
      for (let i = 0; i < 16; i++) {
        drops.push({
          x: px + (Math.random() - 0.5) * 16 * persp,
          y: py,
          y0: py,
          vx: (Math.random() - 0.5) * 120 * persp,
          vy: -(130 + Math.random() * 180) * persp,
          g: 720 * persp,
          r: (1.2 + Math.random() * 2.2) * persp,
        });
      }
    };
    const stepDrops = (dt: number) => {
      for (const d of drops) {
        d.vy += d.g * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
      }
      drops = drops.filter((d) => !(d.vy > 0 && d.y >= d.y0));
    };
    const drawDrops = () => {
      dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dctx.clearRect(0, 0, W, H);
      dctx.fillStyle = "rgba(255,255,255,.92)";
      for (const d of drops) {
        dctx.beginPath();
        dctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        dctx.fill();
      }
    };

    const render = () => {
      water.draw({ W, H, IA, time, amb: reduceMQ.matches ? 0 : 1, rip });
      if (!ready) {
        ready = true;
        glc.dataset.ready = "true";
      }
    };
    const needFrame = () => visible && (!reduceMQ.matches || rippleActive() || drops.length > 0);
    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      stepDrops(dt);
      render();
      drawDrops();
      if (needFrame()) raf = requestAnimationFrame(frame);
    };
    function kick() {
      if (started && !raf && visible && !disposed) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    /* ----- invoer ----- */
    let lastMove: [number, number] = [-999, -999],
      lastMoveT = 0,
      hinted = true;
    const local = (e: PointerEvent): [number, number] => {
      const r = stick.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const onDown = (e: PointerEvent) => {
      if (!started || (e.target as Element).closest("a,button") || progress > 0.08) return;
      const p = local(e),
        iu = toImg(p[0], p[1]);
      if (maskAt(iu) < 0.35) return;
      addRipple(iu[0], iu[1], 1);
      spawnDrops(p[0], p[1]);
      if (hinted) {
        hinted = false;
        hint.dataset.gone = "true";
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!started || e.pointerType !== "mouse" || progress > 0.08) return;
      const p = local(e),
        iu = toImg(p[0], p[1]),
        over = maskAt(iu) >= 0.35;
      stick.style.cursor = over ? "pointer" : "";
      if (!over || reduceMQ.matches) return;
      const dx = p[0] - lastMove[0],
        dy = p[1] - lastMove[1],
        now = performance.now();
      if (dx * dx + dy * dy > 1600 && now - lastMoveT > 160) {
        lastMove = p;
        lastMoveT = now;
        addRipple(iu[0], iu[1], 0.16);
      }
    };
    stick.addEventListener("pointerdown", onDown);
    stick.addEventListener("pointermove", onMove);
    cleanups.push(() => {
      stick.removeEventListener("pointerdown", onDown);
      stick.removeEventListener("pointermove", onMove);
    });

    /* ----- starten zodra foto en masker er zijn ----- */
    const timers: number[] = [];
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible) kick();
    });
    const onVis = () => {
      visible = !document.hidden;
      if (visible) kick();
    };
    const onReduce = () => {
      render();
      kick();
    };
    cleanups.push(() => {
      disposed = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      reduceMQ.removeEventListener("change", onReduce);
      water.dispose();
    });

    const photoReady = new Promise<HTMLImageElement>((resolve, reject) => {
      if (photo.complete && photo.naturalWidth) return resolve(photo);
      photo.addEventListener("load", () => resolve(photo), { once: true });
      photo.addEventListener("error", reject, { once: true });
    });
    const maskReady = new Promise<HTMLImageElement>((resolve, reject) => {
      const m = new window.Image();
      m.onload = () => resolve(m);
      m.onerror = reject;
      m.src = MASK_SRC;
    });

    Promise.all([photoReady, maskReady])
      .then(([img, mimg]) => {
        if (disposed) return;
        IA = img.naturalWidth / img.naturalHeight;
        water.setTextures(img, mimg);
        try {
          const c = document.createElement("canvas");
          maskW = c.width = mimg.naturalWidth;
          maskH = c.height = mimg.naturalHeight;
          const cx = c.getContext("2d")!;
          cx.drawImage(mimg, 0, 0);
          maskData = cx.getImageData(0, 0, maskW, maskH).data;
        } catch {
          maskData = null;
        }
        started = true;
        size();
        render();
        on(window, "resize", () => {
          size();
          render();
        });
        io.observe(stick);
        document.addEventListener("visibilitychange", onVis);
        reduceMQ.addEventListener("change", onReduce);
        if (!reduceMQ.matches) {
          kick();
          timers.push(window.setTimeout(() => addRipple(0.46, 0.58, 0.8), 900));
          timers.push(window.setTimeout(() => addRipple(0.66, 0.52, 0.5), 1700));
        }
      })
      .catch(() => {
        /* zonder foto of masker blijft gewoon de stilstaande foto staan */
      });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section ref={heroRef} id="top" aria-label="Zwembad Aarweide" className="hero">
      <div ref={stickRef} className="hero-stick">
        <div className="absolute inset-0">
          <Image
            ref={photoRef}
            src={heroPhoto}
            alt="Openluchtzwembad met blauwe baanlijnen en startblokken, omringd door hoge groene bomen"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="hero-photo"
            style={{ objectPosition: "55% 55%" }}
          />
        </div>
        <canvas ref={waterRef} aria-hidden="true" className="hero-water" />
        <canvas ref={dropsRef} aria-hidden="true" className="hero-drops" />
        <div className="hero-shade" />
        <div ref={hintRef} className="hero-hint" aria-hidden="true">
          <i />
          <span className="pointer-coarse:hidden">Klik op het water</span>
          <span className="hidden pointer-coarse:inline">Tik op het water</span>
        </div>
        <div className="hero-copy">
          <div className="wrap">
            <motion.p
              {...rise(0)}
              className="mb-3.5 inline-flex items-center gap-2.5 text-sm font-bold tracking-[0.08em] uppercase before:h-[3px] before:w-7 before:rounded-sm before:bg-sun before:content-['']"
            >
              Openluchtzwembad · Nieuwveen
            </motion.p>
            <motion.h1
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-[clamp(2.5rem,7vw,5.4rem)] font-black tracking-[-0.03em] [text-shadow:0_2px_28px_rgba(2,18,32,.4)]"
            >
              Zwembad Aarweide
            </motion.h1>
            <motion.p
              {...rise(2)}
              className="mb-6 max-w-[36ch] text-lead [text-shadow:0_1px_14px_rgba(2,18,32,.45)]"
            >
              Drie baden, een grote glijbaan en een zonneweide midden in het Groene Hart.
            </motion.p>
            <motion.div {...rise(3)} className="flex flex-wrap gap-3">
              <ExternalLink className="btn btn-sun" href={links.tickets}>
                Koop kaartjes
              </ExternalLink>
              <a className="btn btn-ghost" href="#tijden">
                Openingstijden
              </a>
            </motion.div>
          </div>
        </div>
        <div className="hero-tide" aria-hidden="true" />
      </div>
    </section>
  );
}

/* ---------- WebGL: golfjes, glinstering en rimpels, alleen waar het masker water zegt ---------- */

const VS =
  "attribute vec2 aPos;varying vec2 vUv;void main(){vUv=vec2(aPos.x*0.5+0.5,0.5-aPos.y*0.5);gl_Position=vec4(aPos,0.0,1.0);}";

const FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImg;uniform sampler2D uMask;
uniform vec2 uRes;uniform float uIA;uniform vec2 uAlign;
uniform float uTime;uniform float uAmb;
uniform vec4 uRip[${RIPPLES}];
vec2 toImg(vec2 uv){
  float sa=uRes.x/uRes.y;
  vec2 s=sa>uIA?vec2(1.0,uIA/sa):vec2(sa/uIA,1.0);
  vec2 c=uAlign*(1.0-s)+s*0.5;
  return c+(uv-0.5)*s;
}
float height(vec2 iuv){
  vec2 P=vec2(iuv.x*uIA,iuv.y*2.4);
  float persp=mix(0.5,1.25,smoothstep(0.42,0.8,iuv.y));
  float t=uTime;
  float h=0.0;
  h+=sin(P.x*34.0+t*0.8+sin(P.y*17.0+t*0.5)*1.6)*0.5;
  h+=sin(P.x*57.0-P.y*23.0-t*1.1)*0.35;
  h+=sin(P.y*47.0+P.x*17.0+t*0.65)*0.3;
  h*=0.0011*persp*uAmb;
  for(int i=0;i<${RIPPLES};i++){
    vec4 r=uRip[i];
    float age=uTime-r.z;
    if(r.w>0.0&&age>0.0&&age<5.0){
      vec2 C=vec2(r.x*uIA,r.y*2.4);
      float d=length(P-C);
      float front=age*0.2;
      float x=(d-front)/0.11;
      float env=exp(-age*0.8)*exp(-x*x);
      h+=r.w*0.0045*sin((d-front)*62.0)*env*persp;
    }
  }
  return h;
}
void main(){
  vec2 iuv=toImg(vUv);
  float w=texture2D(uMask,iuv).r;
  float e=0.0025;
  float hx=height(iuv+vec2(e,0.0))-height(iuv-vec2(e,0.0));
  float hy=height(iuv+vec2(0.0,e))-height(iuv-vec2(0.0,e));
  vec2 g=vec2(hx,hy)/(2.0*e);
  vec3 col=texture2D(uImg,iuv+g*0.0075*w).rgb;
  vec3 n=normalize(vec3(-g*7.0,1.0));
  vec3 H=normalize(normalize(vec3(-0.25,-0.45,0.85))+vec3(0.0,0.0,1.0));
  float spec=pow(max(dot(n,H),0.0),260.0);
  col+=vec3(spec)*0.16*w;
  col*=1.0+dot(g,vec2(-0.35,-0.6))*0.3*w;
  float flash=0.0;
  for(int i=0;i<${RIPPLES};i++){
    vec4 r=uRip[i];
    float age=uTime-r.z;
    if(r.w>0.0&&age>0.0&&age<1.2){
      vec2 d=(iuv-r.xy)*vec2(uIA,2.4);
      flash+=r.w*exp(-age*6.0)*exp(-dot(d,d)/0.0025);
    }
  }
  col+=vec3(0.85,0.95,1.0)*flash*0.5*w;
  gl_FragColor=vec4(col,1.0);
}`;

type DrawState = { W: number; H: number; IA: number; time: number; amb: number; rip: Float32Array };

function createWater(gl: WebGLRenderingContext) {
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VS),
    fs = compile(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const U = Object.fromEntries(
    ["uImg", "uMask", "uRes", "uIA", "uAlign", "uTime", "uAmb", "uRip"].map((n) => [n, gl.getUniformLocation(prog, n)]),
  );
  const textures: WebGLTexture[] = [];
  const makeTex = (el: TexImageSource, unit: number) => {
    const t = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, el);
    textures.push(t);
  };

  return {
    setTextures(img: TexImageSource, mask: TexImageSource) {
      makeTex(img, 0);
      makeTex(mask, 1);
    },
    draw({ W, H, IA, time, amb, rip }: DrawState) {
      gl.uniform1i(U.uImg, 0);
      gl.uniform1i(U.uMask, 1);
      gl.uniform2f(U.uRes, W, H);
      gl.uniform1f(U.uIA, IA);
      gl.uniform2f(U.uAlign, ALIGN[0], ALIGN[1]);
      gl.uniform1f(U.uTime, time);
      gl.uniform1f(U.uAmb, amb);
      gl.uniform4fv(U.uRip, rip);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      textures.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}
