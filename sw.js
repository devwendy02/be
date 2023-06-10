try {
    self["workbox:core:6.5.3"] && _()
} catch {}
const T = (r, ...e) => {
        let t = r;
        return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t
    },
    L = T;
class f extends Error {
    constructor(e, t) {
        const s = L(e, t);
        super(s), this.name = e, this.details = t
    }
}
const D = new Set,
    u = {
        googleAnalytics: "googleAnalytics",
        precache: "precache-v2",
        prefix: "workbox",
        runtime: "runtime",
        suffix: typeof registration < "u" ? registration.scope : ""
    },
    k = r => [u.prefix, r, u.suffix].filter(e => e && e.length > 0).join("-"),
    v = r => {
        for (const e of Object.keys(u)) r(e)
    },
    d = {
        updateDetails: r => {
            v(e => {
                typeof r[e] == "string" && (u[e] = r[e])
            })
        },
        getGoogleAnalyticsName: r => r || k(u.googleAnalytics),
        getPrecacheName: r => r || k(u.precache),
        getPrefix: () => u.prefix,
        getRuntimeName: r => r || k(u.runtime),
        getSuffix: () => u.suffix
    };

function P(r, e) {
    const t = new URL(r);
    for (const s of e) t.searchParams.delete(s);
    return t.href
}
async function H(r, e, t, s) {
    const n = P(e.url, t);
    if (e.url === n) return r.match(e, s);
    const i = Object.assign(Object.assign({}, s), {
            ignoreSearch: !0
        }),
        a = await r.keys(e, i);
    for (const o of a) {
        const c = P(o.url, t);
        if (n === c) return r.match(o, s)
    }
}
class M {
    constructor() {
        this.promise = new Promise((e, t) => {
            this.resolve = e, this.reject = t
        })
    }
}
async function q() {
    for (const r of D) await r()
}
const j = r => new URL(String(r), location.href).href.replace(new RegExp(`^${location.origin}`), "");

function x(r) {
    return new Promise(e => setTimeout(e, r))
}
const A = {
    get googleAnalytics() {
        return d.getGoogleAnalyticsName()
    },
    get precache() {
        return d.getPrecacheName()
    },
    get prefix() {
        return d.getPrefix()
    },
    get runtime() {
        return d.getRuntimeName()
    },
    get suffix() {
        return d.getSuffix()
    }
};

function W() {
    self.addEventListener("activate", () => self.clients.claim())
}
try {
    self["workbox:routing:6.5.3"] && _()
} catch {}
const E = "GET",
    y = r => r && typeof r == "object" ? r : {
        handle: r
    };
class w {
    constructor(e, t, s = E) {
        this.handler = y(t), this.match = e, this.method = s
    }
    setCatchHandler(e) {
        this.catchHandler = y(e)
    }
}
class F extends w {
    constructor(e, t, s) {
        const n = ({
            url: i
        }) => {
            const a = e.exec(i.href);
            if (!!a && !(i.origin !== location.origin && a.index !== 0)) return a.slice(1)
        };
        super(n, t, s)
    }
}
class K {
    constructor() {
        this._routes = new Map, this._defaultHandlerMap = new Map
    }
    get routes() {
        return this._routes
    }
    addFetchListener() {
        self.addEventListener("fetch", e => {
            const {
                request: t
            } = e, s = this.handleRequest({
                request: t,
                event: e
            });
            s && e.respondWith(s)
        })
    }
    addCacheListener() {
        self.addEventListener("message", e => {
            if (e.data && e.data.type === "CACHE_URLS") {
                const {
                    payload: t
                } = e.data, s = Promise.all(t.urlsToCache.map(n => {
                    typeof n == "string" && (n = [n]);
                    const i = new Request(...n);
                    return this.handleRequest({
                        request: i,
                        event: e
                    })
                }));
                e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0))
            }
        })
    }
    handleRequest({
        request: e,
        event: t
    }) {
        const s = new URL(e.url, location.href);
        if (!s.protocol.startsWith("http")) return;
        const n = s.origin === location.origin,
            {
                params: i,
                route: a
            } = this.findMatchingRoute({
                event: t,
                request: e,
                sameOrigin: n,
                url: s
            });
        let o = a && a.handler;
        const c = e.method;
        if (!o && this._defaultHandlerMap.has(c) && (o = this._defaultHandlerMap.get(c)), !o) return;
        let l;
        try {
            l = o.handle({
                url: s,
                request: e,
                event: t,
                params: i
            })
        } catch (h) {
            l = Promise.reject(h)
        }
        const m = a && a.catchHandler;
        return l instanceof Promise && (this._catchHandler || m) && (l = l.catch(async h => {
            if (m) try {
                return await m.handle({
                    url: s,
                    request: e,
                    event: t,
                    params: i
                })
            } catch (C) {
                C instanceof Error && (h = C)
            }
            if (this._catchHandler) return this._catchHandler.handle({
                url: s,
                request: e,
                event: t
            });
            throw h
        })), l
    }
    findMatchingRoute({
        url: e,
        sameOrigin: t,
        request: s,
        event: n
    }) {
        const i = this._routes.get(s.method) || [];
        for (const a of i) {
            let o;
            const c = a.match({
                url: e,
                sameOrigin: t,
                request: s,
                event: n
            });
            if (c) return o = c, (Array.isArray(o) && o.length === 0 || c.constructor === Object && Object.keys(c).length === 0 || typeof c == "boolean") && (o = void 0), {
                route: a,
                params: o
            }
        }
        return {}
    }
    setDefaultHandler(e, t = E) {
        this._defaultHandlerMap.set(t, y(e))
    }
    setCatchHandler(e) {
        this._catchHandler = y(e)
    }
    registerRoute(e) {
        this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e)
    }
    unregisterRoute(e) {
        if (!this._routes.has(e.method)) throw new f("unregister-route-but-not-found-with-method", {
            method: e.method
        });
        const t = this._routes.get(e.method).indexOf(e);
        if (t > -1) this._routes.get(e.method).splice(t, 1);
        else throw new f("unregister-route-route-not-registered")
    }
}
let p;
const R = () => (p || (p = new K, p.addFetchListener(), p.addCacheListener()), p);

function I(r, e, t) {
    let s;
    if (typeof r == "string") {
        const i = new URL(r, location.href),
            a = ({
                url: o
            }) => o.href === i.href;
        s = new w(a, e, t)
    } else if (r instanceof RegExp) s = new F(r, e, t);
    else if (typeof r == "function") s = new w(r, e, t);
    else if (r instanceof w) s = r;
    else throw new f("unsupported-route-type", {
        moduleName: "workbox-routing",
        funcName: "registerRoute",
        paramName: "capture"
    });
    return R().registerRoute(s), s
}

function $(r) {
    R().setCatchHandler(r)
}

function B(r) {
    R().setDefaultHandler(r)
}
try {
    self["workbox:strategies:6.5.3"] && _()
} catch {}

function g(r) {
    return typeof r == "string" ? new Request(r) : r
}
class G {
    constructor(e, t) {
        this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new M, this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = new Map;
        for (const s of this._plugins) this._pluginStateMap.set(s, {});
        this.event.waitUntil(this._handlerDeferred.promise)
    }
    async fetch(e) {
        const {
            event: t
        } = this;
        let s = g(e);
        if (s.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
            const a = await t.preloadResponse;
            if (a) return a
        }
        const n = this.hasCallback("fetchDidFail") ? s.clone() : null;
        try {
            for (const a of this.iterateCallbacks("requestWillFetch")) s = await a({
                request: s.clone(),
                event: t
            })
        } catch (a) {
            if (a instanceof Error) throw new f("plugin-error-request-will-fetch", {
                thrownErrorMessage: a.message
            })
        }
        const i = s.clone();
        try {
            let a;
            a = await fetch(s, s.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
            for (const o of this.iterateCallbacks("fetchDidSucceed")) a = await o({
                event: t,
                request: i,
                response: a
            });
            return a
        } catch (a) {
            throw n && await this.runCallbacks("fetchDidFail", {
                error: a,
                event: t,
                originalRequest: n.clone(),
                request: i.clone()
            }), a
        }
    }
    async fetchAndCachePut(e) {
        const t = await this.fetch(e),
            s = t.clone();
        return this.waitUntil(this.cachePut(e, s)), t
    }
    async cacheMatch(e) {
        const t = g(e);
        let s;
        const {
            cacheName: n,
            matchOptions: i
        } = this._strategy, a = await this.getCacheKey(t, "read"), o = Object.assign(Object.assign({}, i), {
            cacheName: n
        });
        s = await caches.match(a, o);
        for (const c of this.iterateCallbacks("cachedResponseWillBeUsed")) s = await c({
            cacheName: n,
            matchOptions: i,
            cachedResponse: s,
            request: a,
            event: this.event
        }) || void 0;
        return s
    }
    async cachePut(e, t) {
        const s = g(e);
        await x(0);
        const n = await this.getCacheKey(s, "write");
        if (!t) throw new f("cache-put-with-no-response", {
            url: j(n.url)
        });
        const i = await this._ensureResponseSafeToCache(t);
        if (!i) return !1;
        const {
            cacheName: a,
            matchOptions: o
        } = this._strategy, c = await self.caches.open(a), l = this.hasCallback("cacheDidUpdate"), m = l ? await H(c, n.clone(), ["__WB_REVISION__"], o) : null;
        try {
            await c.put(n, l ? i.clone() : i)
        } catch (h) {
            if (h instanceof Error) throw h.name === "QuotaExceededError" && await q(), h
        }
        for (const h of this.iterateCallbacks("cacheDidUpdate")) await h({
            cacheName: a,
            oldResponse: m,
            newResponse: i.clone(),
            request: n,
            event: this.event
        });
        return !0
    }
    async getCacheKey(e, t) {
        const s = `${e.url} | ${t}`;
        if (!this._cacheKeys[s]) {
            let n = e;
            for (const i of this.iterateCallbacks("cacheKeyWillBeUsed")) n = g(await i({
                mode: t,
                request: n,
                event: this.event,
                params: this.params
            }));
            this._cacheKeys[s] = n
        }
        return this._cacheKeys[s]
    }
    hasCallback(e) {
        for (const t of this._strategy.plugins)
            if (e in t) return !0;
        return !1
    }
    async runCallbacks(e, t) {
        for (const s of this.iterateCallbacks(e)) await s(t)
    }* iterateCallbacks(e) {
        for (const t of this._strategy.plugins)
            if (typeof t[e] == "function") {
                const s = this._pluginStateMap.get(t);
                yield i => {
                    const a = Object.assign(Object.assign({}, i), {
                        state: s
                    });
                    return t[e](a)
                }
            }
    }
    waitUntil(e) {
        return this._extendLifetimePromises.push(e), e
    }
    async doneWaiting() {
        let e;
        for (; e = this._extendLifetimePromises.shift();) await e
    }
    destroy() {
        this._handlerDeferred.resolve(null)
    }
    async _ensureResponseSafeToCache(e) {
        let t = e,
            s = !1;
        for (const n of this.iterateCallbacks("cacheWillUpdate"))
            if (t = await n({
                    request: this.request,
                    response: t,
                    event: this.event
                }) || void 0, s = !0, !t) break;
        return s || t && t.status !== 200 && (t = void 0), t
    }
}
class S {
    constructor(e = {}) {
        this.cacheName = d.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions
    }
    handle(e) {
        const [t] = this.handleAll(e);
        return t
    }
    handleAll(e) {
        e instanceof FetchEvent && (e = {
            event: e,
            request: e.request
        });
        const t = e.event,
            s = typeof e.request == "string" ? new Request(e.request) : e.request,
            n = "params" in e ? e.params : void 0,
            i = new G(this, {
                event: t,
                request: s,
                params: n
            }),
            a = this._getResponse(i, s, t),
            o = this._awaitComplete(a, i, s, t);
        return [a, o]
    }
    async _getResponse(e, t, s) {
        await e.runCallbacks("handlerWillStart", {
            event: s,
            request: t
        });
        let n;
        try {
            if (n = await this._handle(t, e), !n || n.type === "error") throw new f("no-response", {
                url: t.url
            })
        } catch (i) {
            if (i instanceof Error) {
                for (const a of e.iterateCallbacks("handlerDidError"))
                    if (n = await a({
                            error: i,
                            event: s,
                            request: t
                        }), n) break
            }
            if (!n) throw i
        }
        for (const i of e.iterateCallbacks("handlerWillRespond")) n = await i({
            event: s,
            request: t,
            response: n
        });
        return n
    }
    async _awaitComplete(e, t, s, n) {
        let i, a;
        try {
            i = await e
        } catch {}
        try {
            await t.runCallbacks("handlerDidRespond", {
                event: n,
                request: s,
                response: i
            }), await t.doneWaiting()
        } catch (o) {
            o instanceof Error && (a = o)
        }
        if (await t.runCallbacks("handlerDidComplete", {
                event: n,
                request: s,
                response: i,
                error: a
            }), t.destroy(), a) throw a
    }
}
const Q = {
    cacheWillUpdate: async ({
        response: r
    }) => r.status === 200 || r.status === 0 ? r : null
};
class z extends S {
    constructor(e = {}) {
        super(e), this.plugins.some(t => "cacheWillUpdate" in t) || this.plugins.unshift(Q), this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0
    }
    async _handle(e, t) {
        const s = [],
            n = [];
        let i;
        if (this._networkTimeoutSeconds) {
            const {
                id: c,
                promise: l
            } = this._getTimeoutPromise({
                request: e,
                logs: s,
                handler: t
            });
            i = c, n.push(l)
        }
        const a = this._getNetworkPromise({
            timeoutId: i,
            request: e,
            logs: s,
            handler: t
        });
        n.push(a);
        const o = await t.waitUntil((async () => await t.waitUntil(Promise.race(n)) || await a)());
        if (!o) throw new f("no-response", {
            url: e.url
        });
        return o
    }
    _getTimeoutPromise({
        request: e,
        logs: t,
        handler: s
    }) {
        let n;
        return {
            promise: new Promise(a => {
                n = setTimeout(async () => {
                    a(await s.cacheMatch(e))
                }, this._networkTimeoutSeconds * 1e3)
            }),
            id: n
        }
    }
    async _getNetworkPromise({
        timeoutId: e,
        request: t,
        logs: s,
        handler: n
    }) {
        let i, a;
        try {
            a = await n.fetchAndCachePut(t)
        } catch (o) {
            o instanceof Error && (i = o)
        }
        return e && clearTimeout(e), (i || !a) && (a = await n.cacheMatch(t)), a
    }
}
class J extends S {
    constructor(e = {}) {
        super(e), this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0
    }
    async _handle(e, t) {
        let s, n;
        try {
            const i = [t.fetch(e)];
            if (this._networkTimeoutSeconds) {
                const a = x(this._networkTimeoutSeconds * 1e3);
                i.push(a)
            }
            if (n = await Promise.race(i), !n) throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)
        } catch (i) {
            i instanceof Error && (s = i)
        }
        if (!n) throw new f("no-response", {
            url: e.url,
            error: s
        });
        return n
    }
}
const U = {
        race: !1,
        debug: !1,
        credentials: "same-origin",
        networkTimeoutSeconds: 0,
        fallback: "index.html"
    },
    b = A.runtime,
    V = () => new z({
        cacheName: b
    }),
    X = [{
        "revision": null,
        "url": "assets/blocto-connector.esm.2f5a969a.js"
    }, {
        "revision": null,
        "url": "assets/index.05b174a3.js"
    }, {
        "revision": null,
        "url": "assets/index.087a26d8.css"
    }, {
        "revision": null,
        "url": "assets/index.33cac463.js"
    }, {
        "revision": null,
        "url": "assets/index.5f5d0d8f.js"
    }, {
        "revision": null,
        "url": "assets/index.6f71f45c.js"
    }, {
        "revision": null,
        "url": "assets/index.ef0c30f8.js"
    }, {
        "revision": null,
        "url": "assets/subscriptionManager.c11a509d.js"
    }, {
        "revision": null,
        "url": "assets/walletlink-connector.esm.e6968970.js"
    }, {
        "revision": null,
        "url": "assets/workbox-window.prod.es5.d2780aeb.js"
    }, {
        "revision": "2ae26a5615368672c523c6ee07c843c7",
        "url": "index.html"
    }, {
        "revision": "db5e18b3f7e00bb508d3cc4760d64f51",
        "url": "js/web-audio-patch.js"
    }, {
        "revision": "1872c500de691dce40960bb85481de07",
        "url": "registerSW.js"
    }, {
        "revision": "ca163459f7973ffb7b7da965cc2f9f58",
        "url": "icon/logo.svg"
    }, {
        "revision": "f14e63bcb8e52092586c9987ad3218d3",
        "url": "icon/logo-512x512.png"
    }, {
        "revision": "cf5552c0c81f72fed90e35b3946c86c0",
        "url": "icon/android-chrome-72x72.png"
    }, {
        "revision": "503b1f66eb1b197a3466ff694d049d7a",
        "url": "manifest.webmanifest"
    }],
    N = [],
    O = X.map(r => {
        const e = new URL(r.url, self.location.toString());
        return N.push(new Request(e.href, {
            credentials: U.credentials
        })), e.href
    });
self.addEventListener("install", r => {
    r.waitUntil(caches.open(b).then(e => e.addAll(N)))
});
self.addEventListener("activate", r => {
    r.waitUntil(caches.open(b).then(e => {
        e.keys().then(t => {
            t.forEach(s => {
                O.includes(s.url) || e.delete(s).then(n => {})
            })
        })
    }))
});
I(({
    url: r
}) => O.includes(r.href), V());
B(new J);
$(({
    event: r
}) => {
    switch (r.request.destination) {
        case "document":
            return caches.match(U.fallback).then(e => e ? Promise.resolve(e) : Promise.resolve(Response.error()));
        default:
            return Promise.resolve(Response.error())
    }
});
self.skipWaiting();
W();