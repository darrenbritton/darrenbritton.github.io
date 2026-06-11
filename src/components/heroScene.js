import React, { useEffect, useRef } from "react";

// A living architecture diagram: four stacked tiers of nodes (edge, api,
// services, data) joined by faint edges, with accent "request" packets
// travelling between them. Decorative only (aria-hidden); the renderer
// pauses when the hero is offscreen, the tab is hidden, or the visitor
// has motion switched off, and renders a single static frame instead.
const TIERS = 4;

const lerp = (a, b, t) => a + (b - a) * t;

const HeroScene = () => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || typeof window === "undefined") return undefined;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE;
      try {
        THREE = await import("three");
      } catch (e) {
        return; // no WebGL bundle: hero stays typographic
      }
      if (disposed || !wrap.isConnected) return;

      const small = window.matchMedia("(max-width: 900px)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const motionOn = () =>
        document.documentElement.getAttribute("data-motion") !== "off";

      const readVar = (name, fallback) => {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim();
        return v || fallback;
      };

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
      } catch (e) {
        return; // WebGL unavailable: graceful typographic hero
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2));
      renderer.setClearColor(0x000000, 0);
      wrap.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 4.6, 13.5);
      camera.lookAt(0, -0.2, 0);

      const group = new THREE.Group();
      // push the constellation toward the right column so the headline
      // stays on quiet ground
      group.position.x = small ? 0 : 2.4;
      scene.add(group);

      // ---- nodes: a jittered grid per tier ----
      const COLS = small ? 9 : 13;
      const ROWS = small ? 4 : 6;
      const nodes = [];
      for (let l = 0; l < TIERS; l += 1) {
        for (let c = 0; c < COLS; c += 1) {
          for (let r = 0; r < ROWS; r += 1) {
            nodes.push({
              tier: l,
              x: (c / (COLS - 1) - 0.5) * 14.5 + (Math.random() - 0.5) * 0.9,
              y: (l - (TIERS - 1) / 2) * 2.7 + (Math.random() - 0.5) * 0.5,
              z: (r / (ROWS - 1) - 0.5) * 7 + (Math.random() - 0.5) * 0.9,
              hub: Math.random() < 0.06,
            });
          }
        }
      }

      const basePos = [];
      const hubPos = [];
      nodes.forEach((n) => (n.hub ? hubPos : basePos).push(n.x, n.y, n.z));

      const makePoints = (arr, size, opacity) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        const mat = new THREE.PointsMaterial({
          size,
          transparent: true,
          opacity,
          sizeAttenuation: true,
          depthWrite: false,
        });
        return new THREE.Points(geo, mat);
      };
      const basePoints = makePoints(basePos, 0.085, 0.85);
      const hubPoints = makePoints(hubPos, 0.18, 0.95);
      group.add(basePoints, hubPoints);

      // ---- edges: 2 nearest in-tier neighbours + sparse cross-tier links ----
      const edges = [];
      const seen = new Set();
      const link = (a, b) => {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([a, b]);
        }
      };
      const d2 = (a, b) =>
        (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
      nodes.forEach((n, i) => {
        const near = [];
        nodes.forEach((m, j) => {
          if (i === j) return;
          if (m.tier === n.tier) {
            const dd = d2(n, m);
            if (dd < 5.5) near.push([dd, j]);
          }
        });
        near.sort((a, b) => a[0] - b[0]);
        near.slice(0, 2).forEach(([, j]) => link(i, j));
        if (n.tier < TIERS - 1 && Math.random() < 0.22) {
          let best = -1;
          let bestD = Infinity;
          nodes.forEach((m, j) => {
            if (m.tier !== n.tier + 1) return;
            const dd = d2(n, m);
            if (dd < bestD) {
              bestD = dd;
              best = j;
            }
          });
          if (best >= 0) link(i, best);
        }
      });

      const linePos = new Float32Array(edges.length * 6);
      edges.forEach(([a, b], i) => {
        linePos.set(
          [nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z],
          i * 6
        );
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      group.add(lines);

      // ---- packets: requests travelling along random edges ----
      const PACKETS = small ? 28 : 64;
      const packets = Array.from({ length: PACKETS }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.14 + Math.random() * 0.32,
      }));
      const packetPos = new Float32Array(PACKETS * 3);
      const packetGeo = new THREE.BufferGeometry();
      packetGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(packetPos, 3).setUsage(THREE.DynamicDrawUsage)
      );
      const packetMat = new THREE.PointsMaterial({
        size: 0.16,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const packetPoints = new THREE.Points(packetGeo, packetMat);
      group.add(packetPoints);

      const placePackets = (dt) => {
        packets.forEach((p, i) => {
          p.t += p.speed * dt;
          if (p.t >= 1) {
            p.t = 0;
            p.edge = Math.floor(Math.random() * edges.length);
          }
          const [a, b] = edges[p.edge];
          packetPos[i * 3] = lerp(nodes[a].x, nodes[b].x, p.t);
          packetPos[i * 3 + 1] = lerp(nodes[a].y, nodes[b].y, p.t);
          packetPos[i * 3 + 2] = lerp(nodes[a].z, nodes[b].z, p.t);
        });
        packetGeo.attributes.position.needsUpdate = true;
      };

      // ---- theme-reactive colours ----
      const applyTheme = () => {
        const ink = readVar("--fg", "#111111");
        const bg = readVar("--bg", "#f4f4f2");
        const accent = readVar("--p-accent", "#cb4029");
        basePoints.material.color.set(ink);
        hubPoints.material.color.set(ink);
        lineMat.color.set(ink);
        packetMat.color.set(accent);
        scene.fog = new THREE.Fog(new THREE.Color(bg), 12, 30);
      };
      applyTheme();

      // ---- sizing ----
      const resize = () => {
        const w = wrap.clientWidth || 1;
        const h = wrap.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      // ---- pointer parallax (fine pointers only) ----
      let tx = 0;
      let ty = 0;
      let px = 0;
      let py = 0;
      const onPointer = (e) => {
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
      };
      if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

      // ---- render loop, gated on visibility + motion ----
      let raf = 0;
      let running = false;
      let visible = true;
      let last = performance.now();
      let clock = 0;
      let intro = motionOn() ? 0 : 1; // assemble on load when motion is on

      const renderFrame = (dt) => {
        clock += dt;
        if (intro < 1) intro = Math.min(1, intro + dt / 1.4);
        const e = 1 - (1 - intro) ** 3;
        group.position.y = (1 - e) * -0.7;
        basePoints.material.opacity = 0.85 * e;
        hubPoints.material.opacity = 0.95 * e;
        lineMat.opacity = 0.14 * e;
        packetMat.opacity = 0.95 * e;
        px += (tx - px) * 0.045;
        py += (ty - py) * 0.045;
        group.rotation.y = Math.sin(clock * 0.07) * 0.28 + px * 0.3;
        group.rotation.x = py * 0.1;
        placePackets(dt);
        renderer.render(scene, camera);
      };

      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        renderFrame(dt);
        raf = window.requestAnimationFrame(tick);
      };
      const start = () => {
        if (running || !visible || !motionOn() || document.hidden) return;
        running = true;
        last = performance.now();
        raf = window.requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        window.cancelAnimationFrame(raf);
      };

      // static first frame (covers the motion-off path)
      placePackets(0);
      renderFrame(0.0001);
      wrap.classList.add("is-ready");
      start();

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0] ? entries[0].isIntersecting : true;
          if (visible) start();
          else stop();
        },
        { threshold: 0.02 }
      );
      io.observe(wrap);

      const onVis = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVis);

      const mo = new MutationObserver((muts) => {
        muts.forEach((m) => {
          if (m.attributeName === "data-theme") {
            applyTheme();
            if (!running) renderFrame(0.0001);
          }
          if (m.attributeName === "data-motion") {
            if (motionOn()) start();
            else {
              stop();
              renderFrame(0.0001); // settle on a static frame
            }
          }
        });
      });
      mo.observe(document.documentElement, { attributes: true });

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        mo.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        if (finePointer) window.removeEventListener("pointermove", onPointer);
        [basePoints, hubPoints, lines, packetPoints].forEach((obj) => {
          obj.geometry.dispose();
          obj.material.dispose();
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === wrap) {
          wrap.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className="hero-scene" ref={wrapRef} aria-hidden="true" />;
};

export default HeroScene;
