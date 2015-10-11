// Lines 3 - 1043 are a version of trianglify.js that i have removed the png and svg functionality from to save space. 

! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var r;
        r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, r.Trianglify = e()
    }
}(function() {
    var e;
    return function r(e, n, t) {
        function f(a, i) {
            if (!n[a]) {
                if (!e[a]) {
                    var c = "function" == typeof require && require;
                    if (!i && c) return c(a, !0);
                    if (o) return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var d = n[a] = {
                    exports: {}
                };
                e[a][0].call(d.exports, function(r) {
                    var n = e[a][1][r];
                    return f(n ? n : r)
                }, d, d.exports, r, e, n, t)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < t.length; a++) f(t[a]);
        return f
    }({
        "./lib/trianglify.js": [function(e, r) {
            function n(e) {
                function r(e, r, n) {
                    return (e - r[0]) * (n[1] - n[0]) / (r[1] - r[0]) + n[0]
                }

                function n(n, t) {
                    for (var f = [], o = -y; n + y > o; o += e.cell_size)
                        for (var a = -v; t + v > a; a += e.cell_size) {
                            var i = o + e.cell_size / 2 + r(rand(), [0, 1], [-w, w]),
                                c = a + e.cell_size / 2 + r(rand(), [0, 1], [-w, w]);
                            f.push([i, c].map(Math.floor))
                        }
                    return f
                }

                function a(e) {
                    return {
                        x: (e[0][0] + e[1][0] + e[2][0]) / 3,
                        y: (e[0][1] + e[1][1] + e[2][1]) / 3
                    }
                }

                function u() {
                    if (e.palette instanceof Array) return e.palette[Math.floor(rand() * e.palette.length)];
                    var r = Object.keys(e.palette);
                    return e.palette[r[Math.floor(rand() * r.length)]]
                }

                function d(e, r) {
                    var n = {};
                    for (var t in e) n[t] = e[t];
                    for (t in r) {
                        if (!e.hasOwnProperty(t)) throw new Error(t + " is not a configuration option for Trianglify. Check your spelling?");
                        n[t] = r[t]
                    }
                    return n
                }
                if (e = d(c, e), rand = f(e.seed), "random" === e.x_colors && (e.x_colors = u()), "random" === e.y_colors && (e.y_colors = u()), "match_x" === e.y_colors && (e.y_colors = e.x_colors), !(e.width > 0 && e.height > 0)) throw new Error("Width and height must be numbers greater than 0");
                if (e.cell_size < 2) throw new Error("Cell size must be greater than 2.");
                var s;
                if (e.color_function) s = function(r, n) {
                    return o(e.color_function(r, n))
                };
                else {
                    var l = o.scale(e.x_colors).mode(e.color_space),
                        b = o.scale(e.y_colors).mode(e.color_space);
                    s = function(r, n) {
                        return o.interpolate(l(r), b(n), .5, e.color_space)
                    }
                }
                for (var h = e.width, g = e.height, p = Math.floor((h + 4 * e.cell_size) / e.cell_size), m = Math.floor((g + 4 * e.cell_size) / e.cell_size), y = (p * e.cell_size - h) / 2, v = (m * e.cell_size - g) / 2, w = e.cell_size * e.variance / 2, x = function(e) {
                        return r(e, [-y, h + y], [0, 1])
                    }, _ = function(e) {
                        return r(e, [-v, g + v], [0, 1])
                    }, k = n(h, g), j = t.triangulate(k), M = [], q = function(e) {
                        return k[e]
                    }, C = 0; C < j.length; C += 3) {
                    var N = [j[C], j[C + 1], j[C + 2]].map(q),
                        U = a(N),
                        A = s(x(U.x), _(U.y)).hex();
                    M.push([A, N])
                }
                return i(M, e)
            }
            var t = e("delaunay-fast"),
                f = e("seedrandom"),
                o = e("chroma-js"),
                i = e("./pattern"),
                c = {
                    width: 600,
                    height: 400,
                    cell_size: 75,
                    variance: .75,
                    seed: null,
                    x_colors: "random",
                    y_colors: "match_x",
                    color_space: "lab",
                    color_function: null,
                    stroke_width: 1.51
                };
 n.defaults = c, r.exports = n
        }, {
            "./pattern": "/Users/qrohlf/Code/trianglify/lib/pattern.js",
            "chroma-js": "/Users/qrohlf/Code/trianglify/node_modules/chroma-js/chroma.js",
            "delaunay-fast": "/Users/qrohlf/Code/trianglify/node_modules/delaunay-fast/delaunay.js",
            seedrandom: "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/index.js"
        }],
        "/Users/qrohlf/Code/trianglify/lib/pattern.js": [function(e, r) {
            (function(n) {
                function t(r, t) {

                    function a(o) {
                        if ("undefined" != typeof n) try {
                            e("canvas")
                        } catch (a) {
                            throw Error("The optional node-canvas dependency is needed for Trianglify to render using canvas in node.")
                        }
                        return o || (o = f.createElement("canvas")), o.setAttribute("width", t.width), o.setAttribute("height", t.height), ctx = o.getContext("2d"), ctx.canvas.width = t.width, ctx.canvas.height = t.height, r.forEach(function(e) {
                            ctx.fillStyle = ctx.strokeStyle = e[0], ctx.lineWidth = t.stroke_width, ctx.beginPath(), ctx.moveTo.apply(ctx, e[1][0]), ctx.lineTo.apply(ctx, e[1][1]), ctx.lineTo.apply(ctx, e[1][2]), ctx.fill(), ctx.stroke()
                        }), o
                    }

                    return {
                        polys: r,
                        opts: t,
                        canvas: a,
                    }
                }
                var f = "undefined" != typeof document ? document : e("jsdom").jsdom("<html/>");
                r.exports = t
            }).call(this, e("_process"))
        }, {
            _process: "/Users/qrohlf/Code/trianglify/node_modules/browserify/node_modules/process/browser.js",
            canvas: "/Users/qrohlf/Code/trianglify/node_modules/browserify/node_modules/browser-resolve/empty.js",
            jsdom: "/Users/qrohlf/Code/trianglify/node_modules/browserify/node_modules/browser-resolve/empty.js"
        }],
        "/Users/qrohlf/Code/trianglify/node_modules/browserify/node_modules/browser-resolve/empty.js": [function() {}, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/browserify/node_modules/process/browser.js": [function(e, r) {
            function n() {
                if (!a) {
                    a = !0;
                    for (var e, r = o.length; r;) {
                        e = o, o = [];
                        for (var n = -1; ++n < r;) e[n]();
                        r = o.length
                    }
                    a = !1
                }
            }

            function t() {}
            var f = r.exports = {},
                o = [],
                a = !1;
            f.nextTick = function(e) {
                o.push(e), a || setTimeout(n, 0)
            }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = t, f.addListener = t, f.once = t, f.off = t, f.removeListener = t, f.removeAllListeners = t, f.emit = t, f.binding = function() {
                throw new Error("process.binding is not supported")
            }, f.cwd = function() {
                return "/"
            }, f.chdir = function() {
                throw new Error("process.chdir is not supported")
            }, f.umask = function() {
                return 0
            }
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/chroma-js/chroma.js": [function(r, n, t) {
            (function() {
                var r, f, o, a, i, c, u, d, s, l, b, h, g, p, m, y, v, w, x, _, k, j, M, q, C, N, U, A, P, z, G, E, B, I, R, S, O, T, Y;
                l = function(e, n, t, f) {
                    return new r(e, n, t, f)
                }, "undefined" != typeof n && null !== n && null != n.exports && (n.exports = l), "function" == typeof e && e.amd ? e([], function() {
                    return l
                }) : (I = "undefined" != typeof t && null !== t ? t : this, I.chroma = l), l.color = function(e, n, t, f) {
                    return new r(e, n, t, f)
                }, l.hsl = function(e, n, t, f) {
                    return new r(e, n, t, f, "hsl")
                }, l.hsv = function(e, n, t, f) {
                    return new r(e, n, t, f, "hsv")
                }, l.rgb = function(e, n, t, f) {
                    return new r(e, n, t, f, "rgb")
                }, l.hex = function(e) {
                    return new r(e)
                }, l.css = function(e) {
                    return new r(e)
                }, l.lab = function(e, n, t) {
                    return new r(e, n, t, "lab")
                }, l.lch = function(e, n, t) {
                    return new r(e, n, t, "lch")
                }, l.hsi = function(e, n, t) {
                    return new r(e, n, t, "hsi")
                }, l.gl = function(e, n, t, f) {
                    return new r(255 * e, 255 * n, 255 * t, f, "gl")
                }, l.interpolate = function(e, n, t, f) {
                    return null == e || null == n ? "#000" : ("string" === R(e) && (e = new r(e)), "string" === R(n) && (n = new r(n)), e.interpolate(t, n, f))
                }, l.mix = l.interpolate, l.contrast = function(e, n) {
                    var t, f;
                    return "string" === R(e) && (e = new r(e)), "string" === R(n) && (n = new r(n)), t = e.luminance(), f = n.luminance(), t > f ? (t + .05) / (f + .05) : (f + .05) / (t + .05)
                }, l.luminance = function(e) {
                    return l(e).luminance()
                }, l._Color = r, r = function() {
                    function e() {
                        var e, r, n, t, f, o, a, i, c, u, d, s, l, h, g, p;
                        for (f = this, n = [], u = 0, d = arguments.length; d > u; u++) r = arguments[u], null != r && n.push(r);
                        if (0 === n.length) s = [255, 0, 255, 1, "rgb"], a = s[0], i = s[1], c = s[2], e = s[3], t = s[4];
                        else if ("array" === R(n[0])) {
                            if (3 === n[0].length) l = n[0], a = l[0], i = l[1], c = l[2], e = 1;
                            else {
                                if (4 !== n[0].length) throw "unknown input argument";
                                h = n[0], a = h[0], i = h[1], c = h[2], e = h[3]
                            }
                            t = null != (g = n[1]) ? g : "rgb"
                        } else "string" === R(n[0]) ? (a = n[0], t = "hex") : "object" === R(n[0]) ? (p = n[0]._rgb, a = p[0], i = p[1], c = p[2], e = p[3], t = "rgb") : n.length >= 3 && (a = n[0], i = n[1], c = n[2]);
                        3 === n.length ? (t = "rgb", e = 1) : 4 === n.length ? "string" === R(n[3]) ? (t = n[3], e = 1) : "number" === R(n[3]) && (t = "rgb", e = n[3]) : 5 === n.length && (e = n[3], t = n[4]), null == e && (e = 1), "rgb" === t ? f._rgb = [a, i, c, e] : "gl" === t ? f._rgb = [255 * a, 255 * i, 255 * c, e] : "hsl" === t ? (f._rgb = v(a, i, c), f._rgb[3] = e) : "hsv" === t ? (f._rgb = w(a, i, c), f._rgb[3] = e) : "hex" === t ? f._rgb = m(a) : "lab" === t ? (f._rgb = _(a, i, c), f._rgb[3] = e) : "lch" === t ? (f._rgb = M(a, i, c), f._rgb[3] = e) : "hsi" === t && (f._rgb = y(a, i, c), f._rgb[3] = e), o = b(f._rgb)
                    }
                    return e.prototype.rgb = function() {
                        return this._rgb.slice(0, 3)
                    }, e.prototype.rgba = function() {
                        return this._rgb
                    }, e.prototype.hex = function() {
                        return U(this._rgb)
                    }, e.prototype.toString = function() {
                        return this.name()
                    }, e.prototype.hsl = function() {
                        return P(this._rgb)
                    }, e.prototype.hsv = function() {
                        return z(this._rgb)
                    }, e.prototype.lab = function() {
                        return G(this._rgb)
                    }, e.prototype.lch = function() {
                        return E(this._rgb)
                    }, e.prototype.hsi = function() {
                        return A(this._rgb)
                    }, e.prototype.gl = function() {
                        return [this._rgb[0] / 255, this._rgb[1] / 255, this._rgb[2] / 255, this._rgb[3]]
                    }, e.prototype.luminance = function(r, n) {
                        var t, f, o, a;
                        return null == n && (n = "rgb"), arguments.length ? (0 === r && (this._rgb = [0, 0, 0, this._rgb[3]]), 1 === r && (this._rgb = [255, 255, 255, this._rgb[3]]), t = C(this._rgb), f = 1e-7, o = 20, a = function(e, t) {
                            var i, c;
                            return c = e.interpolate(.5, t, n), i = c.luminance(), Math.abs(r - i) < f || !o-- ? c : i > r ? a(e, c) : a(c, t)
                        }, this._rgb = (t > r ? a(new e("black"), this) : a(this, new e("white"))).rgba(), this) : C(this._rgb)
                    }, e.prototype.name = function() {
                        var e, r;
                        e = this.hex();
                        for (r in l.colors)
                            if (e === l.colors[r]) return r;
                        return e
                    }, e.prototype.alpha = function(e) {
                        return arguments.length ? (this._rgb[3] = e, this) : this._rgb[3]
                    }, e.prototype.css = function(e) {
                        var r, n, t, f;
                        return null == e && (e = "rgb"), n = this, t = n._rgb, 3 === e.length && t[3] < 1 && (e += "a"), "rgb" === e ? e + "(" + t.slice(0, 3).map(Math.round).join(",") + ")" : "rgba" === e ? e + "(" + t.slice(0, 3).map(Math.round).join(",") + "," + t[3] + ")" : "hsl" === e || "hsla" === e ? (r = n.hsl(), f = function(e) {
                            return Math.round(100 * e) / 100
                        }, r[0] = f(r[0]), r[1] = f(100 * r[1]) + "%", r[2] = f(100 * r[2]) + "%", 4 === e.length && (r[3] = t[3]), e + "(" + r.join(",") + ")") : void 0
                    }, e.prototype.interpolate = function(r, n, t) {
                        var f, o, a, i, c, u, d, s, l, b, h, g, p, m;
                        if (s = this, null == t && (t = "rgb"), "string" === R(n) && (n = new e(n)), "hsl" === t || "hsv" === t || "lch" === t || "hsi" === t) "hsl" === t ? (p = s.hsl(), m = n.hsl()) : "hsv" === t ? (p = s.hsv(), m = n.hsv()) : "hsi" === t ? (p = s.hsi(), m = n.hsi()) : "lch" === t && (p = s.lch(), m = n.lch()), "h" === t.substr(0, 1) ? (a = p[0], h = p[1], u = p[2], i = m[0], g = m[1], d = m[2]) : (u = p[0], h = p[1], a = p[2], d = m[0], g = m[1], i = m[2]), isNaN(a) || isNaN(i) ? isNaN(a) ? isNaN(i) ? o = Number.NaN : (o = i, 1 !== u && 0 !== u || "hsv" === t || (b = g)) : (o = a, 1 !== d && 0 !== d || "hsv" === t || (b = h)) : (f = i > a && i - a > 180 ? i - (a + 360) : a > i && a - i > 180 ? i + 360 - a : i - a, o = a + r * f), null == b && (b = h + r * (g - h)), c = u + r * (d - u), l = "h" === t.substr(0, 1) ? new e(o, b, c, t) : new e(c, b, o, t);
                        else if ("rgb" === t) p = s._rgb, m = n._rgb, l = new e(p[0] + r * (m[0] - p[0]), p[1] + r * (m[1] - p[1]), p[2] + r * (m[2] - p[2]), t);
                        else {
                            if ("lab" !== t) throw "color mode " + t + " is not supported";
                            p = s.lab(), m = n.lab(), l = new e(p[0] + r * (m[0] - p[0]), p[1] + r * (m[1] - p[1]), p[2] + r * (m[2] - p[2]), t)
                        }
                        return l.alpha(s.alpha() + r * (n.alpha() - s.alpha())), l
                    }, e.prototype.premultiply = function() {
                        var e, r;
                        return r = this.rgb(), e = this.alpha(), l(r[0] * e, r[1] * e, r[2] * e, e)
                    }, e.prototype.darken = function(e) {
                        var r, n;
                        return null == e && (e = 20), n = this, r = n.lch(), r[0] -= e, l.lch(r).alpha(n.alpha())
                    }, e.prototype.darker = function(e) {
                        return this.darken(e)
                    }, e.prototype.brighten = function(e) {
                        return null == e && (e = 20), this.darken(-e)
                    }, e.prototype.brighter = function(e) {
                        return this.brighten(e)
                    }, e.prototype.saturate = function(e) {
                        var r, n;
                        return null == e && (e = 20), n = this, r = n.lch(), r[1] += e, l.lch(r).alpha(n.alpha())
                    }, e.prototype.desaturate = function(e) {
                        return null == e && (e = 20), this.saturate(-e)
                    }, e
                }(), b = function(e) {
                    var r;
                    for (r in e) 3 > r ? (e[r] < 0 && (e[r] = 0), e[r] > 255 && (e[r] = 255)) : 3 === r && (e[r] < 0 && (e[r] = 0), e[r] > 1 && (e[r] = 1));
                    return e
                }, p = function(e) {
                    var r, n, t, f, o, a, i, c;
                    if (e = e.toLowerCase(), null != l.colors && l.colors[e]) return m(l.colors[e]);
                    if (t = e.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
                        for (f = t.slice(1, 4), n = o = 0; 2 >= o; n = ++o) f[n] = +f[n];
                        f[3] = 1
                    } else if (t = e.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/))
                        for (f = t.slice(1, 5), n = a = 0; 3 >= a; n = ++a) f[n] = +f[n];
                    else if (t = e.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
                        for (f = t.slice(1, 4), n = i = 0; 2 >= i; n = ++i) f[n] = Math.round(2.55 * f[n]);
                        f[3] = 1
                    } else if (t = e.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
                        for (f = t.slice(1, 5), n = c = 0; 2 >= c; n = ++c) f[n] = Math.round(2.55 * f[n]);
                        f[3] = +f[3]
                    } else(t = e.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) ? (r = t.slice(1, 4), r[1] *= .01, r[2] *= .01, f = v(r), f[3] = 1) : (t = e.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) && (r = t.slice(1, 4), r[1] *= .01, r[2] *= .01, f = v(r), f[3] = +t[4]);
                    return f
                }, m = function(e) {
                    var r, n, t, f, o, a;
                    if (e.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) return (4 === e.length || 7 === e.length) && (e = e.substr(1)), 3 === e.length && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), a = parseInt(e, 16), f = a >> 16, t = a >> 8 & 255, n = 255 & a, [f, t, n, 1];
                    if (e.match(/^#?([A-Fa-f0-9]{8})$/)) return 9 === e.length && (e = e.substr(1)), a = parseInt(e, 16), f = a >> 24 & 255, t = a >> 16 & 255, n = a >> 8 & 255, r = 255 & a, [f, t, n, r];
                    if (o = p(e)) return o;
                    throw "unknown color: " + e
                }, y = function(e, r, n) {
                    var t, f, i, c;
                    return c = S(arguments), e = c[0], r = c[1], n = c[2], e /= 360, 1 / 3 > e ? (t = (1 - r) / 3, i = (1 + r * g(a * e) / g(o - a * e)) / 3, f = 1 - (t + i)) : 2 / 3 > e ? (e -= 1 / 3, i = (1 - r) / 3, f = (1 + r * g(a * e) / g(o - a * e)) / 3, t = 1 - (i + f)) : (e -= 2 / 3, f = (1 - r) / 3, t = (1 + r * g(a * e) / g(o - a * e)) / 3, i = 1 - (f + t)), i = q(n * i * 3), f = q(n * f * 3), t = q(n * t * 3), [255 * i, 255 * f, 255 * t]
                }, v = function() {
                    var e, r, n, t, f, o, a, i, c, u, d, s, l, b;
                    if (l = S(arguments), t = l[0], i = l[1], o = l[2], 0 === i) a = n = e = 255 * o;
                    else {
                        for (d = [0, 0, 0], r = [0, 0, 0], u = .5 > o ? o * (1 + i) : o + i - o * i, c = 2 * o - u, t /= 360, d[0] = t + 1 / 3, d[1] = t, d[2] = t - 1 / 3, f = s = 0; 2 >= s; f = ++s) d[f] < 0 && (d[f] += 1), d[f] > 1 && (d[f] -= 1), r[f] = 6 * d[f] < 1 ? c + 6 * (u - c) * d[f] : 2 * d[f] < 1 ? u : 3 * d[f] < 2 ? c + (u - c) * (2 / 3 - d[f]) * 6 : c;
                        b = [Math.round(255 * r[0]), Math.round(255 * r[1]), Math.round(255 * r[2])], a = b[0], n = b[1], e = b[2]
                    }
                    return [a, n, e]
                }, w = function() {
                    var e, r, n, t, f, o, a, i, c, u, d, s, l, b, h, g, p, m;
                    if (s = S(arguments), t = s[0], c = s[1], d = s[2], d *= 255, 0 === c) i = n = e = d;
                    else switch (360 === t && (t = 0), t > 360 && (t -= 360), 0 > t && (t += 360), t /= 60, f = Math.floor(t), r = t - f, o = d * (1 - c), a = d * (1 - c * r), u = d * (1 - c * (1 - r)), f) {
                        case 0:
                            l = [d, u, o], i = l[0], n = l[1], e = l[2];
                            break;
                        case 1:
                            b = [a, d, o], i = b[0], n = b[1], e = b[2];
                            break;
                        case 2:
                            h = [o, d, u], i = h[0], n = h[1], e = h[2];
                            break;
                        case 3:
                            g = [o, a, d], i = g[0], n = g[1], e = g[2];
                            break;
                        case 4:
                            p = [u, o, d], i = p[0], n = p[1], e = p[2];
                            break;
                        case 5:
                            m = [d, o, a], i = m[0], n = m[1], e = m[2]
                    }
                    return i = Math.round(i), n = Math.round(n), e = Math.round(e), [i, n, e]
                }, f = 18, i = .95047, c = 1, u = 1.08883, x = function() {
                    var e, r, n, t, f, o;
                    return o = S(arguments), f = o[0], e = o[1], r = o[2], n = Math.sqrt(e * e + r * r), t = Math.atan2(r, e) / Math.PI * 180, [f, n, t]
                }, _ = function(e, r, n) {
                    var t, f, o, a, d, s, l;
                    return void 0 !== e && 3 === e.length && (s = e, e = s[0], r = s[1], n = s[2]), void 0 !== e && 3 === e.length && (l = e, e = l[0], r = l[1], n = l[2]), a = (e + 16) / 116, o = a + r / 500, d = a - n / 200, o = k(o) * i, a = k(a) * c, d = k(d) * u, f = T(3.2404542 * o - 1.5371385 * a - .4985314 * d), t = T(-.969266 * o + 1.8760108 * a + .041556 * d), n = T(.0556434 * o - .2040259 * a + 1.0572252 * d), [q(f, 0, 255), q(t, 0, 255), q(n, 0, 255), 1]
                }, k = function(e) {
                    return e > .206893034 ? e * e * e : (e - 4 / 29) / 7.787037
                }, T = function(e) {
                    return Math.round(255 * (.00304 >= e ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055))
                }, j = function() {
                    var e, r, n, t;
                    return t = S(arguments), n = t[0], e = t[1], r = t[2], r = r * Math.PI / 180, [n, Math.cos(r) * e, Math.sin(r) * e]
                }, M = function(e, r, n) {
                    var t, f, o, a, i, c, u;
                    return c = j(e, r, n), t = c[0], f = c[1], o = c[2], u = _(t, f, o), i = u[0], a = u[1], o = u[2], [q(i, 0, 255), q(a, 0, 255), q(o, 0, 255)]
                }, C = function(e, r, n) {
                    var t;
                    return t = S(arguments), e = t[0], r = t[1], n = t[2], e = N(e), r = N(r), n = N(n), .2126 * e + .7152 * r + .0722 * n
                }, N = function(e) {
                    return e /= 255, .03928 >= e ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                }, U = function() {
                    var e, r, n, t, f, o;
                    return o = S(arguments), n = o[0], r = o[1], e = o[2], f = n << 16 | r << 8 | e, t = "000000" + f.toString(16), "#" + t.substr(t.length - 6)
                }, A = function() {
                    var e, r, n, t, f, o, a, i, c;
                    return c = S(arguments), a = c[0], n = c[1], r = c[2], e = 2 * Math.PI, a /= 255, n /= 255, r /= 255, o = Math.min(a, n, r), f = (a + n + r) / 3, i = 1 - o / f, 0 === i ? t = 0 : (t = (a - n + (a - r)) / 2, t /= Math.sqrt((a - n) * (a - n) + (a - r) * (n - r)), t = Math.acos(t), r > n && (t = e - t), t /= e), [360 * t, i, f]
                }, P = function(e, r, n) {
                    var t, f, o, a, i, c;
                    return void 0 !== e && e.length >= 3 && (c = e, e = c[0], r = c[1], n = c[2]), e /= 255, r /= 255, n /= 255, a = Math.min(e, r, n), o = Math.max(e, r, n), f = (o + a) / 2, o === a ? (i = 0, t = Number.NaN) : i = .5 > f ? (o - a) / (o + a) : (o - a) / (2 - o - a), e === o ? t = (r - n) / (o - a) : r === o ? t = 2 + (n - e) / (o - a) : n === o && (t = 4 + (e - r) / (o - a)), t *= 60, 0 > t && (t += 360), [t, i, f]
                }, z = function() {
                    var e, r, n, t, f, o, a, i, c, u;
                    return u = S(arguments), a = u[0], n = u[1], e = u[2], o = Math.min(a, n, e), f = Math.max(a, n, e), r = f - o, c = f / 255, 0 === f ? (t = Number.NaN, i = 0) : (i = r / f, a === f && (t = (n - e) / r), n === f && (t = 2 + (e - a) / r), e === f && (t = 4 + (a - n) / r), t *= 60, 0 > t && (t += 360)), [t, i, c]
                }, G = function() {
                    var e, r, n, t, f, o, a;
                    return a = S(arguments), n = a[0], r = a[1], e = a[2], n = B(n), r = B(r), e = B(e), t = O((.4124564 * n + .3575761 * r + .1804375 * e) / i), f = O((.2126729 * n + .7151522 * r + .072175 * e) / c), o = O((.0193339 * n + .119192 * r + .9503041 * e) / u), [116 * f - 16, 500 * (t - f), 200 * (f - o)]
                }, B = function(e) {
                    return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                }, O = function(e) {
                    return e > .008856 ? Math.pow(e, 1 / 3) : 7.787037 * e + 4 / 29
                }, E = function() {
                    var e, r, n, t, f, o, a;
                    return o = S(arguments), f = o[0], n = o[1], r = o[2], a = G(f, n, r), t = a[0], e = a[1], r = a[2], x(t, e, r)
                }, l.scale = function(e, r) {
                    var n, t, f, o, a, i, c, u, d, s, b, h, g, p, m, y, v, w, x, _, k;
                    return y = "rgb", v = l("#ccc"), k = 0, g = !1, h = [0, 1], s = [], x = !1, _ = [], m = 0, p = 1, b = !1, w = 0, d = {}, i = function(e, r) {
                        var n, t, f, o, i, c, u;
                        if (null == e && (e = ["#ddd", "#222"]), null != e && "string" === R(e) && null != (null != (i = l.brewer) ? i[e] : void 0) && (e = l.brewer[e]), "array" === R(e)) {
                            for (e = e.slice(0), n = f = 0, c = e.length - 1; c >= 0 ? c >= f : f >= c; n = c >= 0 ? ++f : --f) t = e[n], "string" === R(t) && (e[n] = l(t));
                            if (null != r) _ = r;
                            else
                                for (_ = [], n = o = 0, u = e.length - 1; u >= 0 ? u >= o : o >= u; n = u >= 0 ? ++o : --o) _.push(n / (e.length - 1))
                        }
                        return a(), s = e
                    }, c = function(e) {
                        return null == e && (e = []), h = e, m = e[0], p = e[e.length - 1], a(), w = 2 === e.length ? 0 : e.length - 1
                    }, f = function(e) {
                        var r, n;
                        if (null != h) {
                            for (n = h.length - 1, r = 0; n > r && e >= h[r];) r++;
                            return r - 1
                        }
                        return 0
                    }, u = function(e) {
                        return e
                    }, n = function(e) {
                        var r, n, t, o, a;
                        return a = e, h.length > 2 && (o = h.length - 1, r = f(e), t = h[0] + (h[1] - h[0]) * (0 + .5 * k), n = h[o - 1] + (h[o] - h[o - 1]) * (1 - .5 * k), a = m + (h[r] + .5 * (h[r + 1] - h[r]) - t) / (n - t) * (p - m)), a
                    }, o = function(e, r) {
                        var n, t, o, a, i, c, b, g, x;
                        if (null == r && (r = !1), isNaN(e)) return v;
                        if (r ? b = e : h.length > 2 ? (n = f(e), b = n / (w - 1)) : (b = o = m !== p ? (e - m) / (p - m) : 0, b = o = (e - m) / (p - m), b = Math.min(1, Math.max(0, b))), r || (b = u(b)), i = Math.floor(1e4 * b), d[i]) t = d[i];
                        else {
                            if ("array" === R(s))
                                for (a = g = 0, x = _.length - 1; x >= 0 ? x >= g : g >= x; a = x >= 0 ? ++g : --g) {
                                    if (c = _[a], c >= b) {
                                        t = s[a];
                                        break
                                    }
                                    if (b >= c && a === _.length - 1) {
                                        t = s[a];
                                        break
                                    }
                                    if (b > c && b < _[a + 1]) {
                                        b = (b - c) / (_[a + 1] - c), t = l.interpolate(s[a], s[a + 1], b, y);
                                        break
                                    }
                                } else "function" === R(s) && (t = s(b));
                            d[i] = t
                        }
                        return t
                    }, a = function() {
                        return d = {}
                    }, i(e, r), t = function(e) {
                        var r;
                        return r = o(e), x && r[x] ? r[x]() : r
                    }, t.domain = function(e, r, n, f) {
                        var o;
                        return null == n && (n = "e"), arguments.length ? (null != r && (o = l.analyze(e, f), e = 0 === r ? [o.min, o.max] : l.limits(o, n, r)), c(e), t) : h
                    }, t.mode = function(e) {
                        return arguments.length ? (y = e, a(), t) : y
                    }, t.range = function(e, r) {
                        return i(e, r), t
                    }, t.out = function(e) {
                        return x = e, t
                    }, t.spread = function(e) {
                        return arguments.length ? (k = e, t) : k
                    }, t.correctLightness = function(e) {
                        return arguments.length ? (b = e, a(), u = b ? function(e) {
                            var r, n, t, f, a, i, c, u, d;
                            for (r = o(0, !0).lab()[0], n = o(1, !0).lab()[0], c = r > n, t = o(e, !0).lab()[0], a = r + (n - r) * e, f = t - a, u = 0, d = 1, i = 20; Math.abs(f) > .01 && i-- > 0;) ! function() {
                                return c && (f *= -1), 0 > f ? (u = e, e += .5 * (d - e)) : (d = e, e += .5 * (u - e)), t = o(e, !0).lab()[0], f = t - a
                            }();
                            return e
                        } : function(e) {
                            return e
                        }, t) : b
                    }, t.colors = function(r) {
                        var n, f, o, a, i, c;
                        if (null == r && (r = "hex"), e = [], f = [], h.length > 2)
                            for (n = o = 1, c = h.length; c >= 1 ? c > o : o > c; n = c >= 1 ? ++o : --o) f.push(.5 * (h[n - 1] + h[n]));
                        else f = h;
                        for (a = 0, i = f.length; i > a; a++) n = f[a], e.push(t(n)[r]());
                        return e
                    }, t
                }, null == (Y = l.scales) && (l.scales = {}), l.scales.cool = function() {
                    return l.scale([l.hsl(180, 1, .9), l.hsl(250, .7, .4)])
                }, l.scales.hot = function() {
                    return l.scale(["#000", "#f00", "#ff0", "#fff"], [0, .25, .75, 1]).mode("rgb")
                }, l.analyze = function(e, r, n) {
                    var t, f, o, a, i, c, u;
                    if (o = {
                            min: Number.MAX_VALUE,
                            max: -1 * Number.MAX_VALUE,
                            sum: 0,
                            values: [],
                            count: 0
                        }, null == n && (n = function() {
                            return !0
                        }), t = function(e) {
                            null == e || isNaN(e) || (o.values.push(e), o.sum += e, e < o.min && (o.min = e), e > o.max && (o.max = e), o.count += 1)
                        }, i = function(e, f) {
                            return n(e, f) ? null != r && "function" === R(r) ? t(r(e)) : null != r && "string" === R(r) || "number" === R(r) ? t(e[r]) : t(e) : void 0
                        }, "array" === R(e))
                        for (c = 0, u = e.length; u > c; c++) a = e[c], i(a);
                    else
                        for (f in e) a = e[f], i(a, f);
                    return o.domain = [o.min, o.max], o.limits = function(e, r) {
                        return l.limits(o, e, r)
                    }, o
                }, l.limits = function(e, r, n) {
                    var t, f, o, a, i, c, u, d, s, b, h, g, p, m, y, v, w, x, _, k, j, M, q, C, N, U, A, P, z, G, E, B, I, S, O, T, Y, L, F, D, V, X, W, $, Z, H, J, K, Q, er, rr, nr, tr, fr, or, ar;
                    if (null == r && (r = "equal"), null == n && (n = 7), "array" === R(e) && (e = l.analyze(e)), p = e.min, h = e.max, q = e.sum, U = e.values.sort(function(e, r) {
                            return e - r
                        }), b = [], "c" === r.substr(0, 1) && (b.push(p), b.push(h)), "e" === r.substr(0, 1)) {
                        for (b.push(p), u = A = 1, Y = n - 1; Y >= 1 ? Y >= A : A >= Y; u = Y >= 1 ? ++A : --A) b.push(p + u / n * (h - p));
                        b.push(h)
                    } else if ("l" === r.substr(0, 1)) {
                        if (0 >= p) throw "Logarithmic scales are only possible for values > 0";
                        for (m = Math.LOG10E * Math.log(p), g = Math.LOG10E * Math.log(h), b.push(p), u = P = 1, $ = n - 1; $ >= 1 ? $ >= P : P >= $; u = $ >= 1 ? ++P : --P) b.push(Math.pow(10, m + u / n * (g - m)));
                        b.push(h)
                    } else if ("q" === r.substr(0, 1)) {
                        for (b.push(p), u = z = 1, Z = n - 1; Z >= 1 ? Z >= z : z >= Z; u = Z >= 1 ? ++z : --z) _ = U.length * u / n, k = Math.floor(_), k === _ ? b.push(U[k]) : (j = _ - k, b.push(U[k] * j + U[k + 1] * (1 - j)));
                        b.push(h)
                    } else if ("k" === r.substr(0, 1)) {
                        for (v = U.length, t = new Array(v), i = new Array(n), M = !0, w = 0, o = null, o = [], o.push(p), u = G = 1, H = n - 1; H >= 1 ? H >= G : G >= H; u = H >= 1 ? ++G : --G) o.push(p + u / n * (h - p));
                        for (o.push(h); M;) {
                            for (d = E = 0, J = n - 1; J >= 0 ? J >= E : E >= J; d = J >= 0 ? ++E : --E) i[d] = 0;
                            for (u = B = 0, K = v - 1; K >= 0 ? K >= B : B >= K; u = K >= 0 ? ++B : --B) {
                                for (N = U[u], y = Number.MAX_VALUE, d = I = 0, Q = n - 1; Q >= 0 ? Q >= I : I >= Q; d = Q >= 0 ? ++I : --I) c = Math.abs(o[d] - N), y > c && (y = c, f = d);
                                i[f]++, t[u] = f
                            }
                            for (x = new Array(n), d = S = 0, er = n - 1; er >= 0 ? er >= S : S >= er; d = er >= 0 ? ++S : --S) x[d] = null;
                            for (u = O = 0, rr = v - 1; rr >= 0 ? rr >= O : O >= rr; u = rr >= 0 ? ++O : --O) a = t[u], null === x[a] ? x[a] = U[u] : x[a] += U[u];
                            for (d = T = 0, L = n - 1; L >= 0 ? L >= T : T >= L; d = L >= 0 ? ++T : --T) x[d] *= 1 / i[d];
                            for (M = !1, d = nr = 0, F = n - 1; F >= 0 ? F >= nr : nr >= F; d = F >= 0 ? ++nr : --nr)
                                if (x[d] !== o[u]) {
                                    M = !0;
                                    break
                                }
                            o = x, w++, w > 200 && (M = !1)
                        }
                        for (s = {}, d = tr = 0, D = n - 1; D >= 0 ? D >= tr : tr >= D; d = D >= 0 ? ++tr : --tr) s[d] = [];
                        for (u = fr = 0, V = v - 1; V >= 0 ? V >= fr : fr >= V; u = V >= 0 ? ++fr : --fr) a = t[u], s[a].push(U[u]);
                        for (C = [], d = or = 0, X = n - 1; X >= 0 ? X >= or : or >= X; d = X >= 0 ? ++or : --or) C.push(s[d][0]), C.push(s[d][s[d].length - 1]);
                        for (C = C.sort(function(e, r) {
                                return e - r
                            }), b.push(C[0]), u = ar = 1, W = C.length - 1; W >= ar; u = ar += 2) isNaN(C[u]) || b.push(C[u])
                    }
                    return b
                }, 
                R = function() {
                    var e, r, n, t, f;
                    for (e = {}, f = "Boolean Number String Function Array Date RegExp Undefined Null".split(" "), n = 0, t = f.length; t > n; n++) r = f[n], e["[object " + r + "]"] = r.toLowerCase();
                    return function(r) {
                        var n;
                        return n = Object.prototype.toString.call(r), e[n] || "object"
                    }
                }(), q = function(e, r, n) {
                    return null == r && (r = 0), null == n && (n = 1), r > e && (e = r), e > n && (e = n), e
                }, S = function(e) {
                    return e.length >= 3 ? e : e[0]
                }, a = 2 * Math.PI, o = Math.PI / 3, g = Math.cos, d = function(e) {
                    var r, n, t, f, o, a, i, c, u, s, b;
                    return e = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(l(f));
                        return t
                    }(), 2 === e.length ? (u = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(f.lab());
                        return t
                    }(), o = u[0], a = u[1], r = function(e) {
                        var r, n;
                        return n = function() {
                            var n, t;
                            for (t = [], r = n = 0; 2 >= n; r = ++n) t.push(o[r] + e * (a[r] - o[r]));
                            return t
                        }(), l.lab.apply(l, n)
                    }) : 3 === e.length ? (s = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(f.lab());
                        return t
                    }(), o = s[0], a = s[1], i = s[2], r = function(e) {
                        var r, n;
                        return n = function() {
                            var n, t;
                            for (t = [], r = n = 0; 2 >= n; r = ++n) t.push((1 - e) * (1 - e) * o[r] + 2 * (1 - e) * e * a[r] + e * e * i[r]);
                            return t
                        }(), l.lab.apply(l, n)
                    }) : 4 === e.length ? (b = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(f.lab());
                        return t
                    }(), o = b[0], a = b[1], i = b[2], c = b[3], r = function(e) {
                        var r, n;
                        return n = function() {
                            var n, t;
                            for (t = [], r = n = 0; 2 >= n; r = ++n) t.push((1 - e) * (1 - e) * (1 - e) * o[r] + 3 * (1 - e) * (1 - e) * e * a[r] + 3 * (1 - e) * e * e * i[r] + e * e * e * c[r]);
                            return t
                        }(), l.lab.apply(l, n)
                    }) : 5 === e.length && (n = d(e.slice(0, 3)), t = d(e.slice(2, 5)), r = function(e) {
                        return .5 > e ? n(2 * e) : t(2 * (e - .5))
                    }), r
                }, l.interpolate.bezier = d
            }).call(this)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/delaunay-fast/delaunay.js": [function(e, r) {
            var n;
            ! function() {
                "use strict";

                function e(e) {
                    var r, n, t, f, o, a, i = Number.POSITIVE_INFINITY,
                        c = Number.POSITIVE_INFINITY,
                        u = Number.NEGATIVE_INFINITY,
                        d = Number.NEGATIVE_INFINITY;
                    for (r = e.length; r--;) e[r][0] < i && (i = e[r][0]), e[r][0] > u && (u = e[r][0]), e[r][1] < c && (c = e[r][1]), e[r][1] > d && (d = e[r][1]);
                    return n = u - i, t = d - c, f = Math.max(n, t), o = i + .5 * n, a = c + .5 * t, [
                        [o - 20 * f, a - f],
                        [o, a + 20 * f],
                        [o + 20 * f, a - f]
                    ]
                }

                function t(e, r, n, t) {
                    var f, a, i, c, u, d, s, l, b, h, g = e[r][0],
                        p = e[r][1],
                        m = e[n][0],
                        y = e[n][1],
                        v = e[t][0],
                        w = e[t][1],
                        x = Math.abs(p - y),
                        _ = Math.abs(y - w);
                    if (o > x && o > _) throw new Error("Eek! Coincident points!");
                    return o > x ? (c = -((v - m) / (w - y)), d = (m + v) / 2, l = (y + w) / 2, f = (m + g) / 2, a = c * (f - d) + l) : o > _ ? (i = -((m - g) / (y - p)), u = (g + m) / 2, s = (p + y) / 2, f = (v + m) / 2, a = i * (f - u) + s) : (i = -((m - g) / (y - p)), c = -((v - m) / (w - y)), u = (g + m) / 2, d = (m + v) / 2, s = (p + y) / 2, l = (y + w) / 2, f = (i * u - c * d + l - s) / (i - c), a = x > _ ? i * (f - u) + s : c * (f - d) + l), b = m - f, h = y - a, {
                        i: r,
                        j: n,
                        k: t,
                        x: f,
                        y: a,
                        r: b * b + h * h
                    }
                }

                function f(e) {
                    var r, n, t, f, o, a;
                    for (n = e.length; n;)
                        for (f = e[--n], t = e[--n], r = n; r;)
                            if (a = e[--r], o = e[--r], t === o && f === a || t === a && f === o) {
                                e.splice(n, 2), e.splice(r, 2);
                                break
                            }
                }
                var o = 1 / 1048576;
                n = {
                    triangulate: function(r, n) {
                        var a, i, c, u, d, s, l, b, h, g, p, m, y = r.length;
                        if (3 > y) return [];
                        if (r = r.slice(0), n)
                            for (a = y; a--;) r[a] = r[a][n];
                        for (c = new Array(y), a = y; a--;) c[a] = a;
                        for (c.sort(function(e, n) {
                                return r[n][0] - r[e][0]
                            }), u = e(r), r.push(u[0], u[1], u[2]), d = [t(r, y + 0, y + 1, y + 2)], s = [], l = [], a = c.length; a--; l.length = 0) {
                            for (m = c[a], i = d.length; i--;) b = r[m][0] - d[i].x, b > 0 && b * b > d[i].r ? (s.push(d[i]), d.splice(i, 1)) : (h = r[m][1] - d[i].y, b * b + h * h - d[i].r > o || (l.push(d[i].i, d[i].j, d[i].j, d[i].k, d[i].k, d[i].i), d.splice(i, 1)));
                            for (f(l), i = l.length; i;) p = l[--i], g = l[--i], d.push(t(r, g, p, m))
                        }
                        for (a = d.length; a--;) s.push(d[a]);
                        for (d.length = 0, a = s.length; a--;) s[a].i < y && s[a].j < y && s[a].k < y && d.push(s[a].i, s[a].j, s[a].k);
                        return d
                    },
                    contains: function(e, r) {
                        if (r[0] < e[0][0] && r[0] < e[1][0] && r[0] < e[2][0] || r[0] > e[0][0] && r[0] > e[1][0] && r[0] > e[2][0] || r[1] < e[0][1] && r[1] < e[1][1] && r[1] < e[2][1] || r[1] > e[0][1] && r[1] > e[1][1] && r[1] > e[2][1]) return null;
                        var n = e[1][0] - e[0][0],
                            t = e[2][0] - e[0][0],
                            f = e[1][1] - e[0][1],
                            o = e[2][1] - e[0][1],
                            a = n * o - t * f;
                        if (0 === a) return null;
                        var i = (o * (r[0] - e[0][0]) - t * (r[1] - e[0][1])) / a,
                            c = (n * (r[1] - e[0][1]) - f * (r[0] - e[0][0])) / a;
                        return 0 > i || 0 > c || i + c > 1 ? null : [i, c]
                    }
                }, "undefined" != typeof r && (r.exports = n)
            }()
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/index.js": [function(e, r) {
            var n = e("./lib/alea"),
                t = e("./lib/xor128"),
                f = e("./lib/xorwow"),
                o = e("./lib/xorshift7"),
                a = e("./lib/xor4096"),
                i = e("./lib/tychei"),
                c = e("./seedrandom");
            c.alea = n, c.xor128 = t, c.xorwow = f, c.xorshift7 = o, c.xor4096 = a, c.tychei = i, r.exports = c
        }, {
            "./lib/alea": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/alea.js",
            "./lib/tychei": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/tychei.js",
            "./lib/xor128": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor128.js",
            "./lib/xor4096": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor4096.js",
            "./lib/xorshift7": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorshift7.js",
            "./lib/xorwow": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorwow.js",
            "./seedrandom": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/seedrandom.js"
        }],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/alea.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = a();
                    r.next = function() {
                        var e = 2091639 * r.s0 + 2.3283064365386963e-10 * r.c;
                        return r.s0 = r.s1, r.s1 = r.s2, r.s2 = e - (r.c = 0 | e)
                    }, r.c = 1, r.s0 = n(" "), r.s1 = n(" "), r.s2 = n(" "), r.s0 -= n(e), r.s0 < 0 && (r.s0 += 1), r.s1 -= n(e), r.s1 < 0 && (r.s1 += 1), r.s2 -= n(e), r.s2 < 0 && (r.s2 += 1), n = null
                }

                function f(e, r) {
                    return r.c = e.c, r.s0 = e.s0, r.s1 = e.s1, r.s2 = e.s2, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = n.next;
                    return a.int32 = function() {
                        return 4294967296 * n.next() | 0
                    }, a.double = function() {
                        return a() + 1.1102230246251565e-16 * (2097152 * a() | 0)
                    }, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }

                function a() {
                    var e = 4022871197,
                        r = function(r) {
                            r = r.toString();
                            for (var n = 0; n < r.length; n++) {
                                e += r.charCodeAt(n);
                                var t = .02519603282416938 * e;
                                e = t >>> 0, t -= e, t *= e, e = t >>> 0, t -= e, e += 4294967296 * t
                            }
                            return 2.3283064365386963e-10 * (e >>> 0)
                        };
                    return r
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.alea = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/tychei.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = "";
                    r.next = function() {
                        var e = r.b,
                            n = r.c,
                            t = r.d,
                            f = r.a;
                        return e = e << 25 ^ e >>> 7 ^ n, n = n - t | 0, t = t << 24 ^ t >>> 8 ^ f, f = f - e | 0, r.b = e = e << 20 ^ e >>> 12 ^ n, r.c = n = n - t | 0, r.d = t << 16 ^ n >>> 16 ^ f, r.a = f - e | 0
                    }, r.a = 0, r.b = 0, r.c = -1640531527, r.d = 1367130551, e === Math.floor(e) ? (r.a = e / 4294967296 | 0, r.b = 0 | e) : n += e;
                    for (var t = 0; t < n.length + 20; t++) r.b ^= 0 | n.charCodeAt(t), r.next()
                }

                function f(e, r) {
                    return r.a = e.a, r.b = e.b, r.c = e.c, r.d = e.d, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.tychei = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor128.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = "";
                    r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.next = function() {
                        var e = r.x ^ r.x << 11;
                        return r.x = r.y, r.y = r.z, r.z = r.w, r.w ^= r.w >>> 19 ^ e ^ e >>> 8
                    }, e === (0 | e) ? r.x = e : n += e;
                    for (var t = 0; t < n.length + 64; t++) r.x ^= 0 | n.charCodeAt(t), r.next()
                }

                function f(e, r) {
                    return r.x = e.x, r.y = e.y, r.z = e.z, r.w = e.w, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xor128 = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor4096.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    function r(e, r) {
                        var n, t, f, o, a, i = [],
                            c = 128;
                        for (r === (0 | r) ? (t = r, r = null) : (r += "\x00", t = 0, c = Math.max(c, r.length)), f = 0, o = -32; c > o; ++o) r && (t ^= r.charCodeAt((o + 32) % r.length)), 0 === o && (a = t), t ^= t << 10, t ^= t >>> 15, t ^= t << 4, t ^= t >>> 13, o >= 0 && (a = a + 1640531527 | 0, n = i[127 & o] ^= t + a, f = 0 == n ? f + 1 : 0);
                        for (f >= 128 && (i[127 & (r && r.length || 0)] = -1), f = 127, o = 512; o > 0; --o) t = i[f + 34 & 127], n = i[f = f + 1 & 127], t ^= t << 13, n ^= n << 17, t ^= t >>> 15, n ^= n >>> 12, i[f] = t ^ n;
                        e.w = a, e.X = i, e.i = f
                    }
                    var n = this;
                    n.next = function() {
                        var e, r, t = n.w,
                            f = n.X,
                            o = n.i;
                        return n.w = t = t + 1640531527 | 0, r = f[o + 34 & 127], e = f[o = o + 1 & 127], r ^= r << 13, e ^= e << 17, r ^= r >>> 15, e ^= e >>> 12, r = f[o] = r ^ e, n.i = o, r + (t ^ t >>> 16) | 0
                    }, r(n, e)
                }

                function f(e, r) {
                    return r.i = e.i, r.w = e.w, r.X = e.X.slice(), r
                }

                function o(e, r) {
                    null == e && (e = +new Date);
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && (o.X && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xor4096 = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorshift7.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    function r(e, r) {
                        var n, t, f = [];
                        if (r === (0 | r)) t = f[0] = r;
                        else
                            for (r = "" + r, n = 0; n < r.length; ++n) f[7 & n] = f[7 & n] << 15 ^ r.charCodeAt(n) + f[n + 1 & 7] << 13;
                        for (; f.length < 8;) f.push(0);
                        for (n = 0; 8 > n && 0 === f[n]; ++n);
                        for (t = 8 == n ? f[7] = -1 : f[n], e.x = f, e.i = 0, n = 256; n > 0; --n) e.next()
                    }
                    var n = this;
                    n.next = function() {
                        var e, r, t = n.x,
                            f = n.i;
                        return e = t[f], e ^= e >>> 7, r = e ^ e << 24, e = t[f + 1 & 7], r ^= e ^ e >>> 10, e = t[f + 3 & 7], r ^= e ^ e >>> 3, e = t[f + 4 & 7], r ^= e ^ e << 7, e = t[f + 7 & 7], e ^= e << 13, r ^= e ^ e << 9, t[f] = r, n.i = f + 1 & 7, r
                    }, r(n, e)
                }

                function f(e, r) {
                    return r.x = e.x.slice(), r.i = e.i, r
                }

                function o(e, r) {
                    null == e && (e = +new Date);
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && (o.x && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xorshift7 = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorwow.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = "";
                    r.next = function() {
                        var e = r.x ^ r.x >>> 2;
                        return r.x = r.y, r.y = r.z, r.z = r.w, r.w = r.v, (r.d = r.d + 362437 | 0) + (r.v = r.v ^ r.v << 4 ^ (e ^ e << 1)) | 0
                    }, r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.v = 0, e === (0 | e) ? r.x = e : n += e;
                    for (var t = 0; t < n.length + 64; t++) r.x ^= 0 | n.charCodeAt(t), t == n.length && (r.d = r.x << 10 ^ r.x >>> 4), r.next()
                }

                function f(e, r) {
                    return r.x = e.x, r.y = e.y, r.z = e.z, r.w = e.w, r.v = e.v, r.d = e.d, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xorwow = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/seedrandom.js": [function(r, n) {
            ! function(t, f) {
                function o(e, r, n) {
                    var o = [];
                    r = 1 == r ? {
                        entropy: !0
                    } : r || {};
                    var l = u(c(r.entropy ? [e, s(t)] : null == e ? d() : e, 3), o),
                        b = new a(o),
                        p = function() {
                            for (var e = b.g(g), r = y, n = 0; v > e;) e = (e + n) * h, r *= h, n = b.g(1);
                            for (; e >= w;) e /= 2, r /= 2, n >>>= 1;
                            return (e + n) / r
                        };
                    return p.int32 = function() {
                        return 0 | b.g(4)
                    }, p.quick = function() {
                        return b.g(4) / 4294967296
                    }, p.double = p, u(s(b.S), t), (r.pass || n || function(e, r, n, t) {
                        return t && (t.S && i(t, b), e.state = function() {
                            return i(b, {})
                        }), n ? (f[m] = e, r) : e
                    })(p, l, "global" in r ? r.global : this == f, r.state)
                }

                function a(e) {
                    var r, n = e.length,
                        t = this,
                        f = 0,
                        o = t.i = t.j = 0,
                        a = t.S = [];
                    for (n || (e = [n++]); h > f;) a[f] = f++;
                    for (f = 0; h > f; f++) a[f] = a[o = x & o + e[f % n] + (r = a[f])], a[o] = r;
                    (t.g = function(e) {
                        for (var r, n = 0, f = t.i, o = t.j, a = t.S; e--;) r = a[f = x & f + 1], n = n * h + a[x & (a[f] = a[o = x & o + r]) + (a[o] = r)];
                        return t.i = f, t.j = o, n
                    })(h)
                }

                function i(e, r) {
                    return r.i = e.i, r.j = e.j, r.S = e.S.slice(), r
                }

                function c(e, r) {
                    var n, t = [],
                        f = typeof e;
                    if (r && "object" == f)
                        for (n in e) try {
                            t.push(c(e[n], r - 1))
                        } catch (o) {}
                    return t.length ? t : "string" == f ? e : e + "\x00"
                }

                function u(e, r) {
                    for (var n, t = e + "", f = 0; f < t.length;) r[x & f] = x & (n ^= 19 * r[x & f]) + t.charCodeAt(f++);
                    return s(r)
                }

                function d() {
                    try {
                        if (l) return s(l.randomBytes(h));
                        var e = new Uint8Array(h);
                        return (b.crypto || b.msCrypto).getRandomValues(e), s(e)
                    } catch (r) {
                        var n = b.navigator,
                            f = n && n.plugins;
                        return [+new Date, b, f, b.screen, s(t)]
                    }
                }

                function s(e) {
                    return String.fromCharCode.apply(0, e)
                }
                var l, b = this,
                    h = 256,
                    g = 6,
                    p = 52,
                    m = "random",
                    y = f.pow(h, g),
                    v = f.pow(2, p),
                    w = 2 * v,
                    x = h - 1;
                if (f["seed" + m] = o, u(f.random(), t), "object" == typeof n && n.exports) {
                    n.exports = o;
                    try {
                        l = r("crypto")
                    } catch (_) {}
                } else "function" == typeof e && e.amd && e(function() {
                    return o
                })
            }([], Math)
        }, {
            crypto: !1
        }]
    }, {}, ["./lib/trianglify.js"])("./lib/trianglify.js")
});

var body = document.body,
    html = document.documentElement;

function drawBackground() {
    var pageHeight = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var pattern = Trianglify({
        width: window.innerWidth,
        height: pageHeight,
        cell_size: 200,
        x_colors: ['#1C120D', '#aa7243']
    });
    pattern.canvas(document.getElementById('page-background'));
}
drawBackground();
