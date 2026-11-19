/**
 * Hero-scène: een zwembad in doorsnede, met een bommetje.
 * Overgezet uit de eerste versie (index.html). Kleuren komen uit de CSS-variabelen --sc-*.
 */

type Pose = number[]; // [romp, dij, knie, bovenarm, elleboog] in graden
type Drop = { x: number; y: number; vx: number; vy: number; r: number };
type Bubble = { x: number; y: number; r: number; vy: number; ph: number };
type Burst = { x: number; age: number; k: number };
type Phase = "idle" | "crouch" | "fly" | "sink" | "gone" | "back";

const rad = (d: number) => (d * Math.PI) / 180;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const ease = (k: number) => {
  k = clamp(k, 0, 1);
  return k * k * (3 - 2 * k);
};
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
const TAU = Math.PI * 2;

/* pose = [romp, dij, kniebuiging, bovenarm, elleboog]; ledematen gemeten vanaf "omlaag", positief = voorwaarts */
const POSES: Record<string, Pose> = {
  stand: [0, 0, 0, 8, 12],
  crouch: [22, 45, 80, -35, 0],
  launch: [-4, 4, 6, 150, 5],
  reach: [0, 10, 25, 170, 0],
  tuck: [25, 105, 125, 45, -40],
  drift: [12, 55, 95, 30, 10],
};
const KF: [number, Pose][] = [
  [0, POSES.crouch],
  [0.12, POSES.launch],
  [0.3, POSES.reach],
  [0.48, POSES.tuck],
];
const lerpPose = (a: Pose, b: Pose, k: number) => a.map((v, i) => v + (b[i] - v) * k);
function flightPose(tf: number): Pose {
  if (tf <= 0) return KF[0][1];
  for (let i = 1; i < KF.length; i++) {
    if (tf <= KF[i][0]) {
      return lerpPose(KF[i - 1][1], KF[i][1], ease((tf - KF[i - 1][0]) / (KF[i][0] - KF[i - 1][0])));
    }
  }
  return POSES.tuck;
}
function legMetrics(p: Pose) {
  const th = rad(p[1]);
  const kn = rad(p[2]);
  const kx = Math.sin(th) * 24;
  const ky = Math.cos(th) * 24;
  return { fx: kx + Math.sin(th - kn) * 24, fy: ky + Math.cos(th - kn) * 24 };
}

const NAMES = [
  "sky-top", "sky-bot", "sun", "sun-glow", "lawn", "lawn-dark", "tree", "tree2", "water-base", "water-top",
  "water-bot", "deck", "deck-edge", "post", "board", "tile", "foam", "outline", "skin", "skin-far", "short",
  "cap", "coral", "yellow", "white",
] as const;
type ColorName = (typeof NAMES)[number];

export type DiveScene = {
  dive: () => void;
  destroy: () => void;
};

export function createDiveScene(
  cv: HTMLCanvasElement,
  opts: { observeEl: Element; onReadyChange: (ready: boolean) => void },
): DiveScene {
  const ctx = cv.getContext("2d");
  if (!ctx) return { dive: () => {}, destroy: () => {} };
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const darkMQ = window.matchMedia("(prefers-color-scheme: dark)");

  const C = {} as Record<ColorName, string>;
  const readColors = () => {
    const s = getComputedStyle(document.documentElement);
    NAMES.forEach((n) => (C[n] = s.getPropertyValue("--sc-" + n).trim()));
  };

  let W = 0, H = 0, dpr = 1, u = 1, waterY = 0, wallX = 0, deckY = 0, boardY = 0, tipX = 0, rootX = 0, depth = 0;
  let t = 0;
  let phase: Phase = "idle";
  let pt = 0;
  let trailAcc = 0;
  const S = { hx: 0, hy: 0, vx: 0, vy: 0, g: 1500, alpha: 1, pose: POSES.stand, bend: 0, bendV: 0, bendT: 0, k: 1 };
  let drops: Drop[] = [];
  let bubbles: Bubble[] = [];
  let ripples: Burst[] = [];
  let columns: Burst[] = [];
  let foams: Burst[] = [];
  let raf = 0;
  let last = 0;
  let inView = true;
  let destroyed = false;

  const setReady = (ready: boolean) => opts.onReadyChange(ready);

  function resize() {
    const r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    W = r.width;
    H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    u = clamp(W / 950, 0.62, 1.3);
    depth = clamp(130 * u, 100, 150);
    waterY = H - depth;
    wallX = W - clamp(W * 0.2, 120, 260);
    deckY = waterY - 10 * u;
    boardY = waterY - 58 * u;
    rootX = wallX + 40 * u;
    tipX = wallX - 125 * u;
    resetScene();
    draw();
    schedule();
  }

  function resetScene() {
    phase = "idle";
    pt = 0;
    S.alpha = 1;
    S.pose = POSES.stand;
    S.bend = 0;
    S.bendV = 0;
    S.bendT = 0;
    drops = [];
    bubbles = [];
    ripples = [];
    columns = [];
    foams = [];
    setReady(true);
  }

  function groundedHip(p: Pose) {
    const m = legMetrics(p);
    return { x: tipX - 4 * u + m.fx * u, y: boardY + S.bend - m.fy * u };
  }

  function dive() {
    if (phase !== "idle") return;
    phase = "crouch";
    pt = 0;
    S.k = rand(0.92, 1.12);
    setReady(false);
    schedule();
  }

  function launch() {
    const hip = groundedHip(S.pose);
    S.hx = hip.x;
    S.hy = hip.y;
    const g = 1500 * u;
    S.g = g;
    const up = rand(60, 76) * u;
    const vy0 = -Math.sqrt(2 * g * up);
    const yImp = waterY - 16 * u;
    const T = (-vy0 + Math.sqrt(vy0 * vy0 - 2 * g * (S.hy - yImp))) / g;
    S.vx = -(rand(88, 118) * u) / T;
    S.vy = vy0;
    phase = "fly";
    pt = 0;
    S.bendT = -2 * u;
    S.bendV = -430 * u;
  }

  function surf(x: number) {
    let y = waterY + Math.sin(x * 0.018 + t * 1.4) * 1.8 * u + Math.sin(x * 0.043 - t * 1.9) * 1.1 * u;
    for (const r of ripples) {
      const d = Math.abs(x - r.x);
      const front = r.age * 330 * u;
      const env = Math.exp(-r.age * 1.25) * r.k;
      y +=
        (env * 4.8 * u * Math.cos((d - front) / (12 * u)) * Math.exp(-Math.pow((d - front) / (70 * u), 2))) /
        (1 + d / (380 * u));
      y -= 15 * u * r.k * Math.exp(-r.age * 7) * Math.exp(-Math.pow(d / (32 * u), 2));
    }
    return y;
  }

  function impact() {
    const x = S.hx;
    const speed = Math.abs(S.vy);
    const k = clamp(speed / (650 * u), 0.85, 1.25) * S.k;
    phase = "sink";
    pt = 0;
    trailAcc = 0;
    S.vy *= 0.38;
    S.vx *= 0.15;
    columns.push({ x, age: 0, k });
    foams.push({ x, age: 0, k });
    ripples.push({ x, age: 0, k });
    if (ripples.length > 3) ripples.shift();
    for (let i = 0; i < 54; i++) {
      const ang = -Math.PI / 2 + gauss() * 0.26;
      const sp = (300 + Math.random() * 560) * u * k;
      drops.push({ x: x + gauss() * 10 * u, y: waterY, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: (1.4 + Math.random() * 3.2) * u });
    }
    for (let i = 0; i < 26; i++) {
      const ang = -Math.PI / 2 + (Math.random() < 0.5 ? -1 : 1) * (0.65 + Math.random() * 0.5);
      const sp = (160 + Math.random() * 300) * u * k;
      drops.push({ x: x + gauss() * 14 * u, y: waterY, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: (1 + Math.random() * 2.2) * u });
    }
    for (let i = 0; i < 38; i++) {
      bubbles.push({ x: x + gauss() * 28 * u, y: waterY + rand(8, 72) * u, r: rand(1.3, 4.6) * u, vy: -rand(25, 85) * u, ph: Math.random() * TAU });
    }
  }

  function update(dt: number) {
    t += dt;
    pt += dt;
    const steps = 2;
    const h = dt / steps;
    for (let s = 0; s < steps; s++) {
      S.bendV += (-1100 * (S.bend - S.bendT) - 16 * S.bendV) * h;
      S.bend += S.bendV * h;
    }
    if (phase === "idle") {
      const sway = Math.sin(t * 1.7) * 1.5;
      S.pose = POSES.stand.map((v, i) => (i === 0 ? v + sway : v));
    } else if (phase === "crouch") {
      const k = ease(pt / 0.45);
      S.pose = lerpPose(POSES.stand, POSES.crouch, k);
      S.bendT = 9 * u * k;
      if (pt >= 0.5) launch();
    } else if (phase === "fly") {
      S.vy += S.g * dt;
      S.hx += S.vx * dt;
      S.hy += S.vy * dt;
      S.pose = flightPose(pt);
      S.bendT = 0;
      const bottom = S.hy + Math.max(legMetrics(S.pose).fy, 0) * u;
      if (bottom >= waterY - 1 * u) impact();
    } else if (phase === "sink") {
      S.vy *= Math.exp(-3.0 * dt);
      S.vx *= Math.exp(-5 * dt);
      S.hx += S.vx * dt;
      S.hy += S.vy * dt;
      S.pose = lerpPose(POSES.tuck, POSES.drift, ease(pt / 0.7));
      S.alpha = pt < 0.8 ? 1 : 1 - ease((pt - 0.8) / 0.8);
      trailAcc += dt;
      if (trailAcc > 0.06 && S.alpha > 0.3) {
        trailAcc = 0;
        bubbles.push({ x: S.hx + gauss() * 8 * u, y: S.hy - 10 * u, r: rand(1.2, 3.2) * u, vy: -rand(30, 70) * u, ph: Math.random() * TAU });
      }
      if (pt > 1.6) {
        phase = "gone";
        pt = 0;
        S.alpha = 0;
      }
    } else if (phase === "gone") {
      if (pt > 1.5) {
        phase = "back";
        pt = 0;
        S.pose = POSES.stand;
        S.alpha = 0;
      }
    } else if (phase === "back") {
      S.alpha = ease(pt / 0.6);
      if (pt >= 0.6) {
        phase = "idle";
        pt = 0;
        S.alpha = 1;
        setReady(true);
      }
    }

    for (const d of drops) {
      d.vy += 1500 * u * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
    }
    drops = drops.filter((d) => d.y < waterY + 2 * u || d.vy < 0);
    for (const b of bubbles) {
      b.y += b.vy * dt;
      b.x += Math.sin(t * 3 + b.ph) * 10 * u * dt;
    }
    bubbles = bubbles.filter((b) => b.y > waterY + 2 * u);
    columns.forEach((c) => (c.age += dt));
    columns = columns.filter((c) => c.age < 0.9);
    foams.forEach((f) => (f.age += dt));
    foams = foams.filter((f) => f.age < 1.6);
    ripples.forEach((r) => (r.age += dt));
    ripples = ripples.filter((r) => r.age < 5);
  }

  /* ---------- tekenen ---------- */
  function waterPath() {
    ctx!.beginPath();
    ctx!.moveTo(0, surf(0));
    for (let x = 8; x < wallX; x += 8) ctx!.lineTo(x, surf(x));
    ctx!.lineTo(wallX, surf(wallX));
    ctx!.lineTo(wallX, H);
    ctx!.lineTo(0, H);
    ctx!.closePath();
  }

  function drawBackdrop() {
    const c = ctx!;
    const g = c.createLinearGradient(0, 0, 0, waterY);
    g.addColorStop(0, C["sky-top"]);
    g.addColorStop(1, C["sky-bot"]);
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);

    const sx = W * 0.82;
    const sy = Math.max(70 * u, waterY - 250 * u);
    const glow = c.createRadialGradient(sx, sy, 10 * u, sx, sy, 150 * u);
    glow.addColorStop(0, C["sun-glow"]);
    glow.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = glow;
    c.fillRect(sx - 160 * u, sy - 160 * u, 320 * u, 320 * u);
    c.fillStyle = C.sun;
    c.beginPath();
    c.arc(sx, sy, 32 * u, 0, TAU);
    c.fill();

    const lawnTop = waterY - 32 * u;
    const trees: [number, number][] = [[0.06, 26], [0.17, 34], [0.31, 22], [0.47, 30], [0.6, 24], [0.74, 33], [0.93, 28]];
    for (const [fx, size] of trees) {
      const R = size * u * 0.8;
      const cx = W * fx;
      const cy = lawnTop - R * 0.55;
      c.fillStyle = C.tree;
      c.beginPath();
      c.ellipse(cx, cy, R, R * 0.88, 0, 0, TAU);
      c.fill();
      c.fillStyle = C.tree2;
      c.beginPath();
      c.ellipse(cx - R * 0.25, cy - R * 0.2, R * 0.6, R * 0.5, 0, 0, TAU);
      c.fill();
    }
    const lg = c.createLinearGradient(0, lawnTop, 0, waterY);
    lg.addColorStop(0, C.lawn);
    lg.addColorStop(1, C["lawn-dark"]);
    c.fillStyle = lg;
    c.beginPath();
    c.moveTo(0, waterY);
    for (let x = 0; x <= W; x += 10) c.lineTo(x, lawnTop + Math.sin(x * 0.011) * 5 * u + Math.sin(x * 0.027) * 2 * u);
    c.lineTo(W, waterY);
    c.closePath();
    c.fill();

    const cols = [C.coral, C.yellow, C.white];
    [0.11, 0.26, 0.41, 0.57, 0.7, 0.88].forEach((fx, i) => {
      const px = W * fx;
      const base = waterY - 9 * u + (i % 2) * 4 * u;
      const top = base - 19 * u;
      c.strokeStyle = C.outline;
      c.lineWidth = 1.5 * u;
      c.beginPath();
      c.moveTo(px, base);
      c.lineTo(px, top);
      c.stroke();
      c.fillStyle = cols[i % 3];
      c.beginPath();
      c.arc(px, top, 11 * u, Math.PI, 0);
      c.closePath();
      c.fill();
      c.strokeStyle = C.outline;
      c.lineWidth = 1 * u;
      c.stroke();
    });
  }

  function drawPool() {
    const c = ctx!;
    c.fillStyle = C["water-base"];
    c.fillRect(0, waterY, wallX, H - waterY);
    const fh = 14 * u;
    c.fillStyle = C.tile;
    c.fillRect(0, H - fh, wallX, fh);
    c.strokeStyle = "rgba(255,255,255,.4)";
    c.lineWidth = 1;
    c.beginPath();
    for (let x = 0; x < wallX; x += 28 * u) {
      c.moveTo(x, H - fh);
      c.lineTo(x, H);
    }
    c.moveTo(0, H - fh / 2);
    c.lineTo(wallX, H - fh / 2);
    c.stroke();

    c.fillStyle = C.deck;
    c.fillRect(wallX, deckY, W - wallX, H - deckY);
    c.fillStyle = "rgba(0,0,0,.14)";
    c.fillRect(wallX, waterY, W - wallX, H - waterY);
    c.strokeStyle = "rgba(255,255,255,.28)";
    c.lineWidth = 1;
    c.beginPath();
    for (let ty = waterY; ty < H; ty += 16 * u) {
      c.moveTo(wallX, ty);
      c.lineTo(W, ty);
    }
    for (let tx = wallX; tx < W; tx += 16 * u) {
      c.moveTo(tx, waterY);
      c.lineTo(tx, H);
    }
    c.stroke();
    c.fillStyle = C["deck-edge"];
    c.fillRect(wallX - 4 * u, deckY - 4 * u, W - wallX + 4 * u, 5 * u);

    /* toren, trap en plank */
    c.fillStyle = C.post;
    c.fillRect(rootX - 12 * u, boardY, 34 * u, deckY - boardY);
    c.strokeStyle = C.outline;
    c.lineWidth = 1.5 * u;
    c.strokeRect(rootX - 12 * u, boardY, 34 * u, deckY - boardY);
    const lx = rootX + 34 * u;
    c.strokeStyle = C.post;
    c.lineWidth = 3 * u;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(lx, deckY);
    c.lineTo(lx, boardY - 30 * u);
    c.moveTo(lx + 18 * u, deckY);
    c.lineTo(lx + 18 * u, boardY - 30 * u);
    c.stroke();
    c.lineWidth = 2 * u;
    c.beginPath();
    for (let ry = deckY - 10 * u; ry > boardY - 26 * u; ry -= 13 * u) {
      c.moveTo(lx, ry);
      c.lineTo(lx + 18 * u, ry);
    }
    c.stroke();
    c.lineWidth = 2 * u;
    c.beginPath();
    c.moveTo(rootX - 10 * u, boardY - 26 * u);
    c.lineTo(rootX + 20 * u, boardY - 26 * u);
    c.lineTo(rootX + 20 * u, boardY);
    c.stroke();

    const bendY = boardY + S.bend;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(rootX, boardY + 3 * u);
    c.quadraticCurveTo((rootX + tipX) / 2, boardY + 3 * u + S.bend * 0.25, tipX, bendY + 3 * u);
    c.strokeStyle = C.outline;
    c.lineWidth = 8.5 * u;
    c.stroke();
    c.strokeStyle = C.board;
    c.lineWidth = 6 * u;
    c.stroke();
  }

  function seg(pts: number[][], w: number, col: string) {
    const c = ctx!;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.beginPath();
    c.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
    c.strokeStyle = C.outline;
    c.lineWidth = w + 1.8;
    c.stroke();
    c.strokeStyle = col;
    c.lineWidth = w;
    c.stroke();
  }

  function drawDiver() {
    if (S.alpha <= 0.01 || phase === "gone") return;
    const c = ctx!;
    const p = S.pose.map(rad);
    const hip = phase === "fly" || phase === "sink" ? { x: S.hx, y: S.hy } : groundedHip(S.pose);
    const [aT, th, kn, ua, el] = p;
    c.save();
    c.globalAlpha = S.alpha;
    c.translate(hip.x, hip.y);
    c.scale(-u, u);

    const knee = [Math.sin(th) * 24, Math.cos(th) * 24];
    const foot = [knee[0] + Math.sin(th - kn) * 24, knee[1] + Math.cos(th - kn) * 24];
    const kneeF = [Math.sin(th + 0.16) * 24, Math.cos(th + 0.16) * 24];
    const footF = [kneeF[0] + Math.sin(th + 0.16 - kn) * 24, kneeF[1] + Math.cos(th + 0.16 - kn) * 24];
    const sh = [Math.sin(aT) * 32, -Math.cos(aT) * 32];
    const head = [sh[0] + Math.sin(aT) * 14, sh[1] - Math.cos(aT) * 14];
    const elb = [sh[0] + Math.sin(ua) * 18, sh[1] + Math.cos(ua) * 18];
    const hand = [elb[0] + Math.sin(ua + el) * 17, elb[1] + Math.cos(ua + el) * 17];
    const uaF = ua - 0.22;
    const elbF = [sh[0] + Math.sin(uaF) * 18, sh[1] + Math.cos(uaF) * 18];
    const handF = [elbF[0] + Math.sin(uaF + el) * 17, elbF[1] + Math.cos(uaF + el) * 17];

    seg([[0, 0], kneeF, footF], 6.5, C["skin-far"]);
    seg([[0, 0], [kneeF[0] * 0.6, kneeF[1] * 0.6]], 9, C.short);
    seg([sh, elbF, handF], 5, C["skin-far"]);
    seg([[0, 0], sh], 12, C.skin);
    seg([[0, 0], [Math.sin(aT) * 9, -Math.cos(aT) * 9]], 13, C.short);
    seg([[0, 0], knee, foot], 7, C.skin);
    seg([[0, 0], [knee[0] * 0.6, knee[1] * 0.6]], 10, C.short);
    seg([sh, elb, hand], 5.4, C.skin);

    c.fillStyle = C.skin;
    c.strokeStyle = C.outline;
    c.lineWidth = 1.8;
    c.beginPath();
    c.arc(head[0], head[1], 9.5, 0, TAU);
    c.fill();
    c.stroke();
    const upAng = -Math.PI / 2 + aT;
    c.fillStyle = C.cap;
    c.beginPath();
    c.arc(head[0], head[1], 9.8, upAng - Math.PI * 0.62, upAng + Math.PI * 0.45);
    c.closePath();
    c.fill();
    c.lineWidth = 1.2;
    c.stroke();
    c.restore();
  }

  function drawWater() {
    const c = ctx!;
    waterPath();
    const g = c.createLinearGradient(0, waterY, 0, H);
    g.addColorStop(0, C["water-top"]);
    g.addColorStop(1, C["water-bot"]);
    c.fillStyle = g;
    c.fill();

    c.save();
    waterPath();
    c.clip();
    c.lineWidth = 1.5 * u;
    c.strokeStyle = "rgba(255,255,255,.09)";
    for (let i = 0; i < 6; i++) {
      c.beginPath();
      for (let x = 0; x <= wallX; x += 12) {
        const y =
          waterY + (22 + i * 17) * u + Math.sin(x * 0.02 + t * 0.7 + i * 1.7) * 6 * u + Math.sin(x * 0.007 - t * 0.4 + i) * 9 * u;
        if (x === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();
    }
    c.restore();

    c.beginPath();
    c.moveTo(0, surf(0));
    for (let sx = 8; sx <= wallX; sx += 8) c.lineTo(sx, surf(sx));
    c.strokeStyle = "rgba(255,255,255,.7)";
    c.lineWidth = 2 * u;
    c.stroke();
  }

  function drawSplash() {
    const c = ctx!;
    for (const f of foams) {
      const rx = (18 + 95 * ease(f.age / 1.3)) * u * f.k;
      const al = 0.55 * (1 - f.age / 1.6);
      c.globalAlpha = Math.max(al, 0);
      c.fillStyle = C.foam;
      c.beginPath();
      c.ellipse(f.x, waterY + 1 * u, rx, rx * 0.12, 0, 0, TAU);
      c.fill();
      c.globalAlpha = 1;
    }
    for (const col of columns) {
      const a = col.age;
      const Hmax = 118 * u * col.k;
      const h = a < 0.2 ? Hmax * (1 - Math.pow(1 - a / 0.2, 2)) : Hmax * Math.pow(Math.max(0, 1 - (a - 0.2) / 0.62), 1.5);
      if (h < 2) continue;
      const life = clamp(1 - (a - 0.2) / 0.62, 0, 1);
      const bw = 32 * u * col.k * (1 + 0.8 * clamp(a / 0.8, 0, 1));
      const tw = 15 * u * col.k * (1 + 0.9 * clamp(a / 0.6, 0, 1));
      const y0 = waterY + 2 * u;
      const y1 = y0 - h;
      const gr = c.createLinearGradient(0, y1, 0, y0);
      gr.addColorStop(0, "rgba(255,255,255,.97)");
      gr.addColorStop(1, "rgba(214,242,252,.8)");
      c.globalAlpha = 0.6 + 0.4 * life;
      c.fillStyle = gr;
      c.beginPath();
      c.moveTo(col.x - bw, y0);
      c.bezierCurveTo(col.x - bw * 0.7, y0 - h * 0.45, col.x - tw * 1.1, y0 - h * 0.6, col.x - tw, y1);
      c.arc(col.x, y1, tw, Math.PI, 0);
      c.bezierCurveTo(col.x + tw * 1.1, y0 - h * 0.6, col.x + bw * 0.7, y0 - h * 0.45, col.x + bw, y0);
      c.closePath();
      c.fill();
      c.beginPath();
      c.arc(col.x - tw * 0.8, y1 + tw * 0.2, tw * 0.75, 0, TAU);
      c.arc(col.x + tw * 0.9, y1 + tw * 0.3, tw * 0.65, 0, TAU);
      c.fill();
      c.globalAlpha = 1;
    }
    c.fillStyle = C.foam;
    c.globalAlpha = 0.92;
    for (const d of drops) {
      c.beginPath();
      c.arc(d.x, d.y, d.r, 0, TAU);
      c.fill();
    }
    c.globalAlpha = 0.6;
    c.strokeStyle = C.foam;
    c.lineWidth = 1.2 * u;
    for (const b of bubbles) {
      c.beginPath();
      c.arc(b.x, b.y, b.r, 0, TAU);
      c.stroke();
    }
    c.globalAlpha = 1;
  }

  function draw() {
    if (!W) return;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, W, H);
    drawBackdrop();
    drawPool();
    drawDiver();
    drawWater();
    drawSplash();
  }

  /* ---------- lus ---------- */
  const active = () =>
    phase !== "idle" || drops.length > 0 || bubbles.length > 0 || columns.length > 0 || foams.length > 0 || ripples.length > 0;

  function frame(ts: number) {
    raf = 0;
    const dt = Math.min((ts - last) / 1000 || 0.016, 0.05);
    last = ts;
    update(dt);
    draw();
    schedule();
  }
  function schedule() {
    if (destroyed || raf || !inView || !W) return;
    if (reduceMQ.matches && !active()) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver((es) => {
    inView = es[0].isIntersecting;
    if (inView) schedule();
  });
  io.observe(opts.observeEl);
  const ro = new ResizeObserver(resize);
  ro.observe(cv);

  const refreshColors = () => {
    readColors();
    draw();
  };
  darkMQ.addEventListener("change", refreshColors);
  const mo = new MutationObserver(refreshColors);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  reduceMQ.addEventListener("change", schedule);

  readColors();
  resize();
  document.fonts?.ready.then(() => !destroyed && resize());

  const autoDive = reduceMQ.matches ? 0 : window.setTimeout(dive, 1200);

  return {
    dive,
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(autoDive);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      darkMQ.removeEventListener("change", refreshColors);
      reduceMQ.removeEventListener("change", schedule);
    },
  };
}
