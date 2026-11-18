(function () {
  "use strict";
  var sec = document.getElementById("reach"); if (!sec) return;
  var DATA = (sec.getAttribute("data-assets") || "/assets/") + "reach/footprint-0a29869a.json";
  var NS = "http://www.w3.org/2000/svg";
  function el(t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; }

  var started = false;
  function start() {
    if (started) return; started = true;
    fetch(DATA).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(draw)
      .catch(function () { sec.classList.add("reach--nomap"); });   
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); start(); }
    }, { rootMargin: "1200px 0px" });
    io.observe(sec);
  } else start();

  function draw(D) {
    sec.classList.add("reach--ready");
    var list = sec.querySelector(".all"); if (list) list.open = false;
    var W = document.getElementById("reach-world"), WW = D.world.w, WH = D.world.h, full = [0, 0, WW, WH], vb = full.slice();
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var paths = {}, marks = {}, patchOf = {}, firstMark = null, firstPatch = null;
    D.world.countries.forEach(function (c) {
      var p = el("path", { d: c.d, "class": c.foot ? "foot" : "land" }); if (c.foot) paths[c.name] = p; W.appendChild(p);
    });
    var defs = el("defs", {}); W.appendChild(defs);
    D.world.patches.forEach(function (pt, i) {
      var cp = el("clipPath", { id: "reach-pc" + i }); cp.appendChild(el("rect", { x: pt.x, y: pt.y, width: pt.w, height: pt.h })); defs.appendChild(cp);
      var g = el("g", { "clip-path": "url(#reach-pc" + i + ")", "class": "pt" });
      g.appendChild(el("rect", { x: pt.x, y: pt.y, width: pt.w, height: pt.h, fill: "var(--surface-raised)" }));
      pt.countries.forEach(function (c) {
        var p = el("path", { d: c.d, "class": c.foot ? "foot" : "land" }); g.appendChild(p);
        if (c.foot && c.name === pt["for"]) { paths[c.name] = p; patchOf[c.name] = g; }
      });
      W.appendChild(g); if (!firstPatch) firstPatch = g;
    });
    D.world.markers.forEach(function (m, i) {
      var g = el("g", { "class": "mk", style: "--i:" + i });
      g.appendChild(el("circle", { "class": "ring", cx: m.x, cy: m.y, r: 4.2 }));
      g.appendChild(el("circle", { "class": "dot", cx: m.x, cy: m.y, r: 4.2 }));
      W.appendChild(g); marks[m.name] = m; m.g = g; if (!firstMark) firstMark = g;
    });
    var label = el("text", { "class": "lbl", "text-anchor": "middle" }); W.appendChild(label);
    var cur = null;

    function setVB(v) { vb = v; W.setAttribute("viewBox", v.map(function (n) { return n.toFixed(2); }).join(" ")); sizeMarkers(); }
    function sizeMarkers() {
      var px = W.getBoundingClientRect().width || WW, kFull = px / WW, k = px / vb[2];
      var rPx = Math.max(3.8, 4.2 * kFull), r = rPx / k;
      W.querySelectorAll(".mk circle").forEach(function (c) { c.setAttribute("r", r.toFixed(2)); });
      W.querySelectorAll(".mk .dot").forEach(function (c) { c.setAttribute("stroke-width", (1.8 / k).toFixed(2)); });
      if (cur) {
        var m = marks[cur], bb = paths[cur].getBBox(), y = bb.height * k > 150 ? m.y + 5 / k : bb.y - 7 / k;
        label.setAttribute("x", m.x); label.setAttribute("y", y.toFixed(2));
        label.style.fontSize = (14 / k).toFixed(2) + "px"; label.style.strokeWidth = (4 / k).toFixed(2) + "px";
      }
    }
    function frame(name) {
      var bx = paths[name].getBBox(), AR = WW / WH, cx = bx.x + bx.width / 2, cy = bx.y + bx.height / 2;
      var minw = name === "Hong Kong" ? 14 : 70;          
      var w = Math.max(bx.width * 1.8, minw), h = Math.max(bx.height * 1.8, minw / AR);
      if (w / h > AR) h = w / AR; else w = h * AR;
      return [cx - w / 2, cy - h / 2, w, h];
    }
    var anim = 0;
    function go(to) {
      cancelAnimationFrame(anim);
      var from = vb.slice(), t0 = performance.now(), dur = reduce ? 0 : 800;
      (function step(now) {
        var u = dur ? Math.min(1, (now - t0) / dur) : 1, e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        setVB(from.map(function (v, i) { return v + (to[i] - v) * e; }));
        if (u < 1) anim = requestAnimationFrame(step);
      })(t0);
    }
    var reset = document.getElementById("reach-reset"), box = document.getElementById("reach-countries");
    function show(name) {
      if (cur === name) return whole();                  
      cur = name;
      Object.keys(paths).forEach(function (n) { paths[n].classList.remove("sel"); });
      paths[name].classList.add("sel");
      if (patchOf[name]) paths[name].parentNode.appendChild(paths[name]);           
      else W.insertBefore(paths[name], firstPatch || firstMark);
      W.querySelectorAll(".pt").forEach(function (g) { g.classList.toggle("on", g === patchOf[name]); });
      Object.keys(marks).forEach(function (n) { marks[n].g.style.display = n === name ? "none" : ""; });
      label.textContent = name; label.style.display = "";
      box.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.textContent === name); });
      reset.hidden = false;
      go(frame(name));                                    
    }
    function whole() {
      cur = null; label.style.display = "none";
      Object.keys(marks).forEach(function (n) { marks[n].g.style.display = ""; });
      W.querySelectorAll(".pt").forEach(function (g) { g.classList.remove("on"); });
      Object.keys(paths).forEach(function (n) { paths[n].classList.remove("sel"); });
      box.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      reset.hidden = true; go(full);
    }
    D.intl.slice().sort().forEach(function (n) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = n; b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { show(n); }); box.appendChild(b);
    });
    reset.addEventListener("click", whole);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && cur) whole(); });
    label.style.display = "none";
    setVB(full); addEventListener("resize", sizeMarkers);

    var U = document.getElementById("reach-us");
    Object.keys(D.states).forEach(function (ab) {
      var s = D.states[ab]; if (ab === "DC") return;
      var p = el("path", { d: s.d, "class": (s.foot ? "foot" : "land") + " fade" }); p.style.setProperty("--x", Math.round(s.cx)); U.appendChild(p);
    });
    var dc = D.states.DC;                                  
    U.appendChild(el("circle", { cx: dc.cx, cy: dc.cy, r: 4.5, fill: "var(--reach-foot)", stroke: "var(--surface-raised)", "stroke-width": 1.5 }));
  }
})();
