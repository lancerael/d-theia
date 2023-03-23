var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function t(t3) {
  return +t3;
}
function n(t3) {
  return ((t3 *= 2) <= 1 ? t3 * t3 * t3 : (t3 -= 2) * t3 * t3 + 2) / 2;
}
var e = "http://www.w3.org/1999/xhtml";
const i = { svg: "http://www.w3.org/2000/svg", xhtml: e, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
function r(t3) {
  var n2 = t3 += "", e2 = n2.indexOf(":");
  if (e2 >= 0 && "xmlns" !== (n2 = t3.slice(0, e2)))
    t3 = t3.slice(e2 + 1);
  return i.hasOwnProperty(n2) ? { space: i[n2], local: t3 } : t3;
}
function a(t3) {
  return function() {
    var n2 = this.ownerDocument, i2 = this.namespaceURI;
    return i2 === e && n2.documentElement.namespaceURI === e ? n2.createElement(t3) : n2.createElementNS(i2, t3);
  };
}
function o(t3) {
  return function() {
    return this.ownerDocument.createElementNS(t3.space, t3.local);
  };
}
function s(t3) {
  var n2 = r(t3);
  return (n2.local ? o : a)(n2);
}
function u() {
}
function l(t3) {
  return null == t3 ? u : function() {
    return this.querySelector(t3);
  };
}
function h(t3) {
  if ("function" !== typeof t3)
    t3 = l(t3);
  for (var n2 = this._groups, e2 = n2.length, i2 = new Array(e2), r2 = 0; r2 < e2; ++r2)
    for (var a2 = n2[r2], o2 = a2.length, s2 = i2[r2] = new Array(o2), u2, h2, c2 = 0; c2 < o2; ++c2)
      if ((u2 = a2[c2]) && (h2 = t3.call(u2, u2.__data__, c2, a2))) {
        if ("__data__" in u2)
          h2.__data__ = u2.__data__;
        s2[c2] = h2;
      }
  return new Bt(i2, this._parents);
}
function c() {
  return [];
}
function f(t3) {
  return null == t3 ? c : function() {
    return this.querySelectorAll(t3);
  };
}
function d(t3) {
  if ("function" !== typeof t3)
    t3 = f(t3);
  for (var n2 = this._groups, e2 = n2.length, i2 = [], r2 = [], a2 = 0; a2 < e2; ++a2)
    for (var o2 = n2[a2], s2 = o2.length, u2, l2 = 0; l2 < s2; ++l2)
      if (u2 = o2[l2]) {
        i2.push(t3.call(u2, u2.__data__, l2, o2));
        r2.push(u2);
      }
  return new Bt(i2, r2);
}
function p(t3) {
  return function() {
    return this.matches(t3);
  };
}
function g(t3) {
  if ("function" !== typeof t3)
    t3 = p(t3);
  for (var n2 = this._groups, e2 = n2.length, i2 = new Array(e2), r2 = 0; r2 < e2; ++r2)
    for (var a2 = n2[r2], o2 = a2.length, s2 = i2[r2] = [], u2, l2 = 0; l2 < o2; ++l2)
      if ((u2 = a2[l2]) && t3.call(u2, u2.__data__, l2, a2))
        s2.push(u2);
  return new Bt(i2, this._parents);
}
function v(t3) {
  return new Array(t3.length);
}
function m() {
  return new Bt(this._enter || this._groups.map(v), this._parents);
}
function y(t3, n2) {
  this.ownerDocument = t3.ownerDocument;
  this.namespaceURI = t3.namespaceURI;
  this._next = null;
  this._parent = t3;
  this.__data__ = n2;
}
y.prototype = { constructor: y, appendChild: function(t3) {
  return this._parent.insertBefore(t3, this._next);
}, insertBefore: function(t3, n2) {
  return this._parent.insertBefore(t3, n2);
}, querySelector: function(t3) {
  return this._parent.querySelector(t3);
}, querySelectorAll: function(t3) {
  return this._parent.querySelectorAll(t3);
} };
function _(t3) {
  return function() {
    return t3;
  };
}
var w = "$";
function x(t3, n2, e2, i2, r2, a2) {
  var o2 = 0, s2, u2 = n2.length, l2 = a2.length;
  for (; o2 < l2; ++o2)
    if (s2 = n2[o2]) {
      s2.__data__ = a2[o2];
      i2[o2] = s2;
    } else
      e2[o2] = new y(t3, a2[o2]);
  for (; o2 < u2; ++o2)
    if (s2 = n2[o2])
      r2[o2] = s2;
}
function b(t3, n2, e2, i2, r2, a2, o2) {
  var s2, u2, l2 = {}, h2 = n2.length, c2 = a2.length, f2 = new Array(h2), d2;
  for (s2 = 0; s2 < h2; ++s2)
    if (u2 = n2[s2]) {
      f2[s2] = d2 = w + o2.call(u2, u2.__data__, s2, n2);
      if (d2 in l2)
        r2[s2] = u2;
      else
        l2[d2] = u2;
    }
  for (s2 = 0; s2 < c2; ++s2) {
    d2 = w + o2.call(t3, a2[s2], s2, a2);
    if (u2 = l2[d2]) {
      i2[s2] = u2;
      u2.__data__ = a2[s2];
      l2[d2] = null;
    } else
      e2[s2] = new y(t3, a2[s2]);
  }
  for (s2 = 0; s2 < h2; ++s2)
    if ((u2 = n2[s2]) && l2[f2[s2]] === u2)
      r2[s2] = u2;
}
function C(t3, n2) {
  if (!t3) {
    d2 = new Array(this.size()), l2 = -1;
    this.each(function(t4) {
      d2[++l2] = t4;
    });
    return d2;
  }
  var e2 = n2 ? b : x, i2 = this._parents, r2 = this._groups;
  if ("function" !== typeof t3)
    t3 = _(t3);
  for (var a2 = r2.length, o2 = new Array(a2), s2 = new Array(a2), u2 = new Array(a2), l2 = 0; l2 < a2; ++l2) {
    var h2 = i2[l2], c2 = r2[l2], f2 = c2.length, d2 = t3.call(h2, h2 && h2.__data__, l2, i2), p2 = d2.length, g2 = s2[l2] = new Array(p2), v2 = o2[l2] = new Array(p2), m2 = u2[l2] = new Array(f2);
    e2(h2, c2, g2, v2, m2, d2, n2);
    for (var y2 = 0, w2 = 0, C2, M2; y2 < p2; ++y2)
      if (C2 = g2[y2]) {
        if (y2 >= w2)
          w2 = y2 + 1;
        while (!(M2 = v2[w2]) && ++w2 < p2)
          ;
        C2._next = M2 || null;
      }
  }
  o2 = new Bt(o2, i2);
  o2._enter = s2;
  o2._exit = u2;
  return o2;
}
function M() {
  return new Bt(this._exit || this._groups.map(v), this._parents);
}
function N(t3, n2, e2) {
  var i2 = this.enter(), r2 = this, a2 = this.exit();
  i2 = "function" === typeof t3 ? t3(i2) : i2.append(t3 + "");
  if (null != n2)
    r2 = n2(r2);
  if (null == e2)
    a2.remove();
  else
    e2(a2);
  return i2 && r2 ? i2.merge(r2).order() : r2;
}
function A(t3) {
  for (var n2 = this._groups, e2 = t3._groups, i2 = n2.length, r2 = e2.length, a2 = Math.min(i2, r2), o2 = new Array(i2), s2 = 0; s2 < a2; ++s2)
    for (var u2 = n2[s2], l2 = e2[s2], h2 = u2.length, c2 = o2[s2] = new Array(h2), f2, d2 = 0; d2 < h2; ++d2)
      if (f2 = u2[d2] || l2[d2])
        c2[d2] = f2;
  for (; s2 < i2; ++s2)
    o2[s2] = n2[s2];
  return new Bt(o2, this._parents);
}
function k() {
  for (var t3 = this._groups, n2 = -1, e2 = t3.length; ++n2 < e2; )
    for (var i2 = t3[n2], r2 = i2.length - 1, a2 = i2[r2], o2; --r2 >= 0; )
      if (o2 = i2[r2]) {
        if (a2 && 4 ^ o2.compareDocumentPosition(a2))
          a2.parentNode.insertBefore(o2, a2);
        a2 = o2;
      }
  return this;
}
function T(t3) {
  if (!t3)
    t3 = S;
  function n2(n3, e3) {
    return n3 && e3 ? t3(n3.__data__, e3.__data__) : !n3 - !e3;
  }
  for (var e2 = this._groups, i2 = e2.length, r2 = new Array(i2), a2 = 0; a2 < i2; ++a2) {
    for (var o2 = e2[a2], s2 = o2.length, u2 = r2[a2] = new Array(s2), l2, h2 = 0; h2 < s2; ++h2)
      if (l2 = o2[h2])
        u2[h2] = l2;
    u2.sort(n2);
  }
  return new Bt(r2, this._parents).order();
}
function S(t3, n2) {
  return t3 < n2 ? -1 : t3 > n2 ? 1 : t3 >= n2 ? 0 : NaN;
}
function E() {
  var t3 = arguments[0];
  arguments[0] = this;
  t3.apply(null, arguments);
  return this;
}
function j() {
  var t3 = new Array(this.size()), n2 = -1;
  this.each(function() {
    t3[++n2] = this;
  });
  return t3;
}
function L() {
  for (var t3 = this._groups, n2 = 0, e2 = t3.length; n2 < e2; ++n2)
    for (var i2 = t3[n2], r2 = 0, a2 = i2.length; r2 < a2; ++r2) {
      var o2 = i2[r2];
      if (o2)
        return o2;
    }
  return null;
}
function V() {
  var t3 = 0;
  this.each(function() {
    ++t3;
  });
  return t3;
}
function D() {
  return !this.node();
}
function P(t3) {
  for (var n2 = this._groups, e2 = 0, i2 = n2.length; e2 < i2; ++e2)
    for (var r2 = n2[e2], a2 = 0, o2 = r2.length, s2; a2 < o2; ++a2)
      if (s2 = r2[a2])
        t3.call(s2, s2.__data__, a2, r2);
  return this;
}
function I(t3) {
  return function() {
    this.removeAttribute(t3);
  };
}
function $(t3) {
  return function() {
    this.removeAttributeNS(t3.space, t3.local);
  };
}
function O(t3, n2) {
  return function() {
    this.setAttribute(t3, n2);
  };
}
function R(t3, n2) {
  return function() {
    this.setAttributeNS(t3.space, t3.local, n2);
  };
}
function H(t3, n2) {
  return function() {
    var e2 = n2.apply(this, arguments);
    if (null == e2)
      this.removeAttribute(t3);
    else
      this.setAttribute(t3, e2);
  };
}
function X(t3, n2) {
  return function() {
    var e2 = n2.apply(this, arguments);
    if (null == e2)
      this.removeAttributeNS(t3.space, t3.local);
    else
      this.setAttributeNS(t3.space, t3.local, e2);
  };
}
function z(t3, n2) {
  var e2 = r(t3);
  if (arguments.length < 2) {
    var i2 = this.node();
    return e2.local ? i2.getAttributeNS(e2.space, e2.local) : i2.getAttribute(e2);
  }
  return this.each((null == n2 ? e2.local ? $ : I : "function" === typeof n2 ? e2.local ? X : H : e2.local ? R : O)(e2, n2));
}
function B(t3) {
  return t3.ownerDocument && t3.ownerDocument.defaultView || t3.document && t3 || t3.defaultView;
}
function q(t3) {
  return function() {
    this.style.removeProperty(t3);
  };
}
function W(t3, n2, e2) {
  return function() {
    this.style.setProperty(t3, n2, e2);
  };
}
function Y(t3, n2, e2) {
  return function() {
    var i2 = n2.apply(this, arguments);
    if (null == i2)
      this.style.removeProperty(t3);
    else
      this.style.setProperty(t3, i2, e2);
  };
}
function G(t3, n2, e2) {
  return arguments.length > 1 ? this.each((null == n2 ? q : "function" === typeof n2 ? Y : W)(t3, n2, null == e2 ? "" : e2)) : F(this.node(), t3);
}
function F(t3, n2) {
  return t3.style.getPropertyValue(n2) || B(t3).getComputedStyle(t3, null).getPropertyValue(n2);
}
function K(t3) {
  return function() {
    delete this[t3];
  };
}
function U(t3, n2) {
  return function() {
    this[t3] = n2;
  };
}
function J(t3, n2) {
  return function() {
    var e2 = n2.apply(this, arguments);
    if (null == e2)
      delete this[t3];
    else
      this[t3] = e2;
  };
}
function Z(t3, n2) {
  return arguments.length > 1 ? this.each((null == n2 ? K : "function" === typeof n2 ? J : U)(t3, n2)) : this.node()[t3];
}
function Q(t3) {
  return t3.trim().split(/^|\s+/);
}
function tt(t3) {
  return t3.classList || new nt(t3);
}
function nt(t3) {
  this._node = t3;
  this._names = Q(t3.getAttribute("class") || "");
}
nt.prototype = { add: function(t3) {
  var n2 = this._names.indexOf(t3);
  if (n2 < 0) {
    this._names.push(t3);
    this._node.setAttribute("class", this._names.join(" "));
  }
}, remove: function(t3) {
  var n2 = this._names.indexOf(t3);
  if (n2 >= 0) {
    this._names.splice(n2, 1);
    this._node.setAttribute("class", this._names.join(" "));
  }
}, contains: function(t3) {
  return this._names.indexOf(t3) >= 0;
} };
function et(t3, n2) {
  var e2 = tt(t3), i2 = -1, r2 = n2.length;
  while (++i2 < r2)
    e2.add(n2[i2]);
}
function it(t3, n2) {
  var e2 = tt(t3), i2 = -1, r2 = n2.length;
  while (++i2 < r2)
    e2.remove(n2[i2]);
}
function rt(t3) {
  return function() {
    et(this, t3);
  };
}
function at(t3) {
  return function() {
    it(this, t3);
  };
}
function ot(t3, n2) {
  return function() {
    (n2.apply(this, arguments) ? et : it)(this, t3);
  };
}
function st(t3, n2) {
  var e2 = Q(t3 + "");
  if (arguments.length < 2) {
    var i2 = tt(this.node()), r2 = -1, a2 = e2.length;
    while (++r2 < a2)
      if (!i2.contains(e2[r2]))
        return false;
    return true;
  }
  return this.each(("function" === typeof n2 ? ot : n2 ? rt : at)(e2, n2));
}
function ut() {
  this.textContent = "";
}
function lt(t3) {
  return function() {
    this.textContent = t3;
  };
}
function ht(t3) {
  return function() {
    var n2 = t3.apply(this, arguments);
    this.textContent = null == n2 ? "" : n2;
  };
}
function ct(t3) {
  return arguments.length ? this.each(null == t3 ? ut : ("function" === typeof t3 ? ht : lt)(t3)) : this.node().textContent;
}
function ft() {
  this.innerHTML = "";
}
function dt(t3) {
  return function() {
    this.innerHTML = t3;
  };
}
function pt(t3) {
  return function() {
    var n2 = t3.apply(this, arguments);
    this.innerHTML = null == n2 ? "" : n2;
  };
}
function gt(t3) {
  return arguments.length ? this.each(null == t3 ? ft : ("function" === typeof t3 ? pt : dt)(t3)) : this.node().innerHTML;
}
function vt() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function mt() {
  return this.each(vt);
}
function yt() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _t() {
  return this.each(yt);
}
function wt(t3) {
  var n2 = "function" === typeof t3 ? t3 : s(t3);
  return this.select(function() {
    return this.appendChild(n2.apply(this, arguments));
  });
}
function xt() {
  return null;
}
function bt(t3, n2) {
  var e2 = "function" === typeof t3 ? t3 : s(t3), i2 = null == n2 ? xt : "function" === typeof n2 ? n2 : l(n2);
  return this.select(function() {
    return this.insertBefore(e2.apply(this, arguments), i2.apply(this, arguments) || null);
  });
}
function Ct() {
  var t3 = this.parentNode;
  if (t3)
    t3.removeChild(this);
}
function Mt() {
  return this.each(Ct);
}
function Nt() {
  var t3 = this.cloneNode(false), n2 = this.parentNode;
  return n2 ? n2.insertBefore(t3, this.nextSibling) : t3;
}
function At() {
  var t3 = this.cloneNode(true), n2 = this.parentNode;
  return n2 ? n2.insertBefore(t3, this.nextSibling) : t3;
}
function kt(t3) {
  return this.select(t3 ? At : Nt);
}
function Tt(t3) {
  return arguments.length ? this.property("__data__", t3) : this.node().__data__;
}
var St = {};
var Et = null;
if ("undefined" !== typeof document) {
  var jt = document.documentElement;
  if (!("onmouseenter" in jt))
    St = { mouseenter: "mouseover", mouseleave: "mouseout" };
}
function Lt(t3, n2, e2) {
  t3 = Vt(t3, n2, e2);
  return function(n3) {
    var e3 = n3.relatedTarget;
    if (!e3 || e3 !== this && !(8 & e3.compareDocumentPosition(this)))
      t3.call(this, n3);
  };
}
function Vt(t3, n2, e2) {
  return function(i2) {
    var r2 = Et;
    Et = i2;
    try {
      t3.call(this, this.__data__, n2, e2);
    } finally {
      Et = r2;
    }
  };
}
function Dt(t3) {
  return t3.trim().split(/^|\s+/).map(function(t4) {
    var n2 = "", e2 = t4.indexOf(".");
    if (e2 >= 0)
      n2 = t4.slice(e2 + 1), t4 = t4.slice(0, e2);
    return { type: t4, name: n2 };
  });
}
function Pt(t3) {
  return function() {
    var n2 = this.__on;
    if (!n2)
      return;
    for (var e2 = 0, i2 = -1, r2 = n2.length, a2; e2 < r2; ++e2)
      if (a2 = n2[e2], (!t3.type || a2.type === t3.type) && a2.name === t3.name)
        this.removeEventListener(a2.type, a2.listener, a2.capture);
      else
        n2[++i2] = a2;
    if (++i2)
      n2.length = i2;
    else
      delete this.__on;
  };
}
function It(t3, n2, e2) {
  var i2 = St.hasOwnProperty(t3.type) ? Lt : Vt;
  return function(r2, a2, o2) {
    var s2 = this.__on, u2, l2 = i2(n2, a2, o2);
    if (s2) {
      for (var h2 = 0, c2 = s2.length; h2 < c2; ++h2)
        if ((u2 = s2[h2]).type === t3.type && u2.name === t3.name) {
          this.removeEventListener(u2.type, u2.listener, u2.capture);
          this.addEventListener(u2.type, u2.listener = l2, u2.capture = e2);
          u2.value = n2;
          return;
        }
    }
    this.addEventListener(t3.type, l2, e2);
    u2 = { type: t3.type, name: t3.name, value: n2, listener: l2, capture: e2 };
    if (!s2)
      this.__on = [u2];
    else
      s2.push(u2);
  };
}
function $t(t3, n2, e2) {
  var i2 = Dt(t3 + ""), r2, a2 = i2.length, o2;
  if (arguments.length < 2) {
    var s2 = this.node().__on;
    if (s2) {
      for (var u2 = 0, l2 = s2.length, h2; u2 < l2; ++u2)
        for (r2 = 0, h2 = s2[u2]; r2 < a2; ++r2)
          if ((o2 = i2[r2]).type === h2.type && o2.name === h2.name)
            return h2.value;
    }
    return;
  }
  s2 = n2 ? It : Pt;
  if (null == e2)
    e2 = false;
  for (r2 = 0; r2 < a2; ++r2)
    this.each(s2(i2[r2], n2, e2));
  return this;
}
function Ot(t3, n2, e2) {
  var i2 = B(t3), r2 = i2.CustomEvent;
  if ("function" === typeof r2)
    r2 = new r2(n2, e2);
  else {
    r2 = i2.document.createEvent("Event");
    if (e2)
      r2.initEvent(n2, e2.bubbles, e2.cancelable), r2.detail = e2.detail;
    else
      r2.initEvent(n2, false, false);
  }
  t3.dispatchEvent(r2);
}
function Rt(t3, n2) {
  return function() {
    return Ot(this, t3, n2);
  };
}
function Ht(t3, n2) {
  return function() {
    return Ot(this, t3, n2.apply(this, arguments));
  };
}
function Xt(t3, n2) {
  return this.each(("function" === typeof n2 ? Ht : Rt)(t3, n2));
}
var zt = [null];
function Bt(t3, n2) {
  this._groups = t3;
  this._parents = n2;
}
function qt() {
  return new Bt([[document.documentElement]], zt);
}
Bt.prototype = qt.prototype = { constructor: Bt, select: h, selectAll: d, filter: g, data: C, enter: m, exit: M, join: N, merge: A, order: k, sort: T, call: E, nodes: j, node: L, size: V, empty: D, each: P, attr: z, style: G, property: Z, classed: st, text: ct, html: gt, raise: mt, lower: _t, append: wt, insert: bt, remove: Mt, clone: kt, datum: Tt, on: $t, dispatch: Xt };
function Wt(t3) {
  return "string" === typeof t3 ? new Bt([[document.querySelector(t3)]], [document.documentElement]) : new Bt([[t3]], zt);
}
var Yt = { value: function() {
} };
function Gt() {
  for (var t3 = 0, n2 = arguments.length, e2 = {}, i2; t3 < n2; ++t3) {
    if (!(i2 = arguments[t3] + "") || i2 in e2 || /[\s.]/.test(i2))
      throw new Error("illegal type: " + i2);
    e2[i2] = [];
  }
  return new Ft(e2);
}
function Ft(t3) {
  this._ = t3;
}
function Kt(t3, n2) {
  return t3.trim().split(/^|\s+/).map(function(t4) {
    var e2 = "", i2 = t4.indexOf(".");
    if (i2 >= 0)
      e2 = t4.slice(i2 + 1), t4 = t4.slice(0, i2);
    if (t4 && !n2.hasOwnProperty(t4))
      throw new Error("unknown type: " + t4);
    return { type: t4, name: e2 };
  });
}
Ft.prototype = Gt.prototype = { constructor: Ft, on: function(t3, n2) {
  var e2 = this._, i2 = Kt(t3 + "", e2), r2, a2 = -1, o2 = i2.length;
  if (arguments.length < 2) {
    while (++a2 < o2)
      if ((r2 = (t3 = i2[a2]).type) && (r2 = Ut(e2[r2], t3.name)))
        return r2;
    return;
  }
  if (null != n2 && "function" !== typeof n2)
    throw new Error("invalid callback: " + n2);
  while (++a2 < o2)
    if (r2 = (t3 = i2[a2]).type)
      e2[r2] = Jt(e2[r2], t3.name, n2);
    else if (null == n2)
      for (r2 in e2)
        e2[r2] = Jt(e2[r2], t3.name, null);
  return this;
}, copy: function() {
  var t3 = {}, n2 = this._;
  for (var e2 in n2)
    t3[e2] = n2[e2].slice();
  return new Ft(t3);
}, call: function(t3, n2) {
  if ((r2 = arguments.length - 2) > 0)
    for (var e2 = new Array(r2), i2 = 0, r2, a2; i2 < r2; ++i2)
      e2[i2] = arguments[i2 + 2];
  if (!this._.hasOwnProperty(t3))
    throw new Error("unknown type: " + t3);
  for (a2 = this._[t3], i2 = 0, r2 = a2.length; i2 < r2; ++i2)
    a2[i2].value.apply(n2, e2);
}, apply: function(t3, n2, e2) {
  if (!this._.hasOwnProperty(t3))
    throw new Error("unknown type: " + t3);
  for (var i2 = this._[t3], r2 = 0, a2 = i2.length; r2 < a2; ++r2)
    i2[r2].value.apply(n2, e2);
} };
function Ut(t3, n2) {
  for (var e2 = 0, i2 = t3.length, r2; e2 < i2; ++e2)
    if ((r2 = t3[e2]).name === n2)
      return r2.value;
}
function Jt(t3, n2, e2) {
  for (var i2 = 0, r2 = t3.length; i2 < r2; ++i2)
    if (t3[i2].name === n2) {
      t3[i2] = Yt, t3 = t3.slice(0, i2).concat(t3.slice(i2 + 1));
      break;
    }
  if (null != e2)
    t3.push({ name: n2, value: e2 });
  return t3;
}
var Zt = 0, Qt = 0, tn = 0, nn = 1e3, en, rn, an = 0, on = 0, sn = 0, un = "object" === typeof performance && performance.now ? performance : Date, ln = "object" === typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t3) {
  setTimeout(t3, 17);
};
function hn() {
  return on || (ln(cn), on = un.now() + sn);
}
function cn() {
  on = 0;
}
function fn() {
  this._call = this._time = this._next = null;
}
fn.prototype = dn.prototype = { constructor: fn, restart: function(t3, n2, e2) {
  if ("function" !== typeof t3)
    throw new TypeError("callback is not a function");
  e2 = (null == e2 ? hn() : +e2) + (null == n2 ? 0 : +n2);
  if (!this._next && rn !== this) {
    if (rn)
      rn._next = this;
    else
      en = this;
    rn = this;
  }
  this._call = t3;
  this._time = e2;
  yn();
}, stop: function() {
  if (this._call) {
    this._call = null;
    this._time = 1 / 0;
    yn();
  }
} };
function dn(t3, n2, e2) {
  var i2 = new fn();
  i2.restart(t3, n2, e2);
  return i2;
}
function pn() {
  hn();
  ++Zt;
  var t3 = en, n2;
  while (t3) {
    if ((n2 = on - t3._time) >= 0)
      t3._call.call(null, n2);
    t3 = t3._next;
  }
  --Zt;
}
function gn() {
  on = (an = un.now()) + sn;
  Zt = Qt = 0;
  try {
    pn();
  } finally {
    Zt = 0;
    mn();
    on = 0;
  }
}
function vn() {
  var t3 = un.now(), n2 = t3 - an;
  if (n2 > nn)
    sn -= n2, an = t3;
}
function mn() {
  var t3, n2 = en, e2, i2 = 1 / 0;
  while (n2)
    if (n2._call) {
      if (i2 > n2._time)
        i2 = n2._time;
      t3 = n2, n2 = n2._next;
    } else {
      e2 = n2._next, n2._next = null;
      n2 = t3 ? t3._next = e2 : en = e2;
    }
  rn = t3;
  yn(i2);
}
function yn(t3) {
  if (Zt)
    return;
  if (Qt)
    Qt = clearTimeout(Qt);
  var n2 = t3 - on;
  if (n2 > 24) {
    if (t3 < 1 / 0)
      Qt = setTimeout(gn, t3 - un.now() - sn);
    if (tn)
      tn = clearInterval(tn);
  } else {
    if (!tn)
      an = un.now(), tn = setInterval(vn, nn);
    Zt = 1, ln(gn);
  }
}
function _n(t3, n2, e2) {
  var i2 = new fn();
  n2 = null == n2 ? 0 : +n2;
  i2.restart(function(e3) {
    i2.stop();
    t3(e3 + n2);
  }, n2, e2);
  return i2;
}
var wn = Gt("start", "end", "cancel", "interrupt");
var xn = [];
var bn = 0;
var Cn = 1;
var Mn = 2;
var Nn = 3;
var An = 4;
var kn = 5;
var Tn = 6;
function Sn(t3, n2, e2, i2, r2, a2) {
  var o2 = t3.__transition;
  if (!o2)
    t3.__transition = {};
  else if (e2 in o2)
    return;
  Vn(t3, e2, { name: n2, index: i2, group: r2, on: wn, tween: xn, time: a2.time, delay: a2.delay, duration: a2.duration, ease: a2.ease, timer: null, state: bn });
}
function En(t3, n2) {
  var e2 = Ln(t3, n2);
  if (e2.state > bn)
    throw new Error("too late; already scheduled");
  return e2;
}
function jn(t3, n2) {
  var e2 = Ln(t3, n2);
  if (e2.state > Nn)
    throw new Error("too late; already running");
  return e2;
}
function Ln(t3, n2) {
  var e2 = t3.__transition;
  if (!e2 || !(e2 = e2[n2]))
    throw new Error("transition not found");
  return e2;
}
function Vn(t3, n2, e2) {
  var i2 = t3.__transition, r2;
  i2[n2] = e2;
  e2.timer = dn(a2, 0, e2.time);
  function a2(t4) {
    e2.state = Cn;
    e2.timer.restart(o2, e2.delay, e2.time);
    if (e2.delay <= t4)
      o2(t4 - e2.delay);
  }
  function o2(a3) {
    var l2, h2, c2, f2;
    if (e2.state !== Cn)
      return u2();
    for (l2 in i2) {
      f2 = i2[l2];
      if (f2.name !== e2.name)
        continue;
      if (f2.state === Nn)
        return _n(o2);
      if (f2.state === An) {
        f2.state = Tn;
        f2.timer.stop();
        f2.on.call("interrupt", t3, t3.__data__, f2.index, f2.group);
        delete i2[l2];
      } else if (+l2 < n2) {
        f2.state = Tn;
        f2.timer.stop();
        f2.on.call("cancel", t3, t3.__data__, f2.index, f2.group);
        delete i2[l2];
      }
    }
    _n(function() {
      if (e2.state === Nn) {
        e2.state = An;
        e2.timer.restart(s2, e2.delay, e2.time);
        s2(a3);
      }
    });
    e2.state = Mn;
    e2.on.call("start", t3, t3.__data__, e2.index, e2.group);
    if (e2.state !== Mn)
      return;
    e2.state = Nn;
    r2 = new Array(c2 = e2.tween.length);
    for (l2 = 0, h2 = -1; l2 < c2; ++l2)
      if (f2 = e2.tween[l2].value.call(t3, t3.__data__, e2.index, e2.group))
        r2[++h2] = f2;
    r2.length = h2 + 1;
  }
  function s2(n3) {
    var i3 = n3 < e2.duration ? e2.ease.call(null, n3 / e2.duration) : (e2.timer.restart(u2), e2.state = kn, 1), a3 = -1, o3 = r2.length;
    while (++a3 < o3)
      r2[a3].call(t3, i3);
    if (e2.state === kn) {
      e2.on.call("end", t3, t3.__data__, e2.index, e2.group);
      u2();
    }
  }
  function u2() {
    e2.state = Tn;
    e2.timer.stop();
    delete i2[n2];
    for (var r3 in i2)
      return;
    delete t3.__transition;
  }
}
function Dn(t3, n2) {
  var e2 = t3.__transition, i2, r2, a2 = true, o2;
  if (!e2)
    return;
  n2 = null == n2 ? null : n2 + "";
  for (o2 in e2) {
    if ((i2 = e2[o2]).name !== n2) {
      a2 = false;
      continue;
    }
    r2 = i2.state > Mn && i2.state < kn;
    i2.state = Tn;
    i2.timer.stop();
    i2.on.call(r2 ? "interrupt" : "cancel", t3, t3.__data__, i2.index, i2.group);
    delete e2[o2];
  }
  if (a2)
    delete t3.__transition;
}
function Pn(t3) {
  return this.each(function() {
    Dn(this, t3);
  });
}
function In(t3, n2, e2) {
  t3.prototype = n2.prototype = e2;
  e2.constructor = t3;
}
function $n(t3, n2) {
  var e2 = Object.create(t3.prototype);
  for (var i2 in n2)
    e2[i2] = n2[i2];
  return e2;
}
function On() {
}
var Rn = 0.7;
var Hn = 1 / Rn;
var Xn = "\\s*([+-]?\\d+)\\s*", zn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", Bn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qn = /^#([0-9a-f]{3,8})$/, Wn = new RegExp("^rgb\\(" + [Xn, Xn, Xn] + "\\)$"), Yn = new RegExp("^rgb\\(" + [Bn, Bn, Bn] + "\\)$"), Gn = new RegExp("^rgba\\(" + [Xn, Xn, Xn, zn] + "\\)$"), Fn = new RegExp("^rgba\\(" + [Bn, Bn, Bn, zn] + "\\)$"), Kn = new RegExp("^hsl\\(" + [zn, Bn, Bn] + "\\)$"), Un = new RegExp("^hsla\\(" + [zn, Bn, Bn, zn] + "\\)$");
var Jn = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
In(On, ne, { copy: function(t3) {
  return Object.assign(new this.constructor(), this, t3);
}, displayable: function() {
  return this.rgb().displayable();
}, hex: Zn, formatHex: Zn, formatHsl: Qn, formatRgb: te, toString: te });
function Zn() {
  return this.rgb().formatHex();
}
function Qn() {
  return ce(this).formatHsl();
}
function te() {
  return this.rgb().formatRgb();
}
function ne(t3) {
  var n2, e2;
  t3 = (t3 + "").trim().toLowerCase();
  return (n2 = qn.exec(t3)) ? (e2 = n2[1].length, n2 = parseInt(n2[1], 16), 6 === e2 ? ee(n2) : 3 === e2 ? new oe(n2 >> 8 & 15 | n2 >> 4 & 240, n2 >> 4 & 15 | 240 & n2, (15 & n2) << 4 | 15 & n2, 1) : 8 === e2 ? ie(n2 >> 24 & 255, n2 >> 16 & 255, n2 >> 8 & 255, (255 & n2) / 255) : 4 === e2 ? ie(n2 >> 12 & 15 | n2 >> 8 & 240, n2 >> 8 & 15 | n2 >> 4 & 240, n2 >> 4 & 15 | 240 & n2, ((15 & n2) << 4 | 15 & n2) / 255) : null) : (n2 = Wn.exec(t3)) ? new oe(n2[1], n2[2], n2[3], 1) : (n2 = Yn.exec(t3)) ? new oe(255 * n2[1] / 100, 255 * n2[2] / 100, 255 * n2[3] / 100, 1) : (n2 = Gn.exec(t3)) ? ie(n2[1], n2[2], n2[3], n2[4]) : (n2 = Fn.exec(t3)) ? ie(255 * n2[1] / 100, 255 * n2[2] / 100, 255 * n2[3] / 100, n2[4]) : (n2 = Kn.exec(t3)) ? he(n2[1], n2[2] / 100, n2[3] / 100, 1) : (n2 = Un.exec(t3)) ? he(n2[1], n2[2] / 100, n2[3] / 100, n2[4]) : Jn.hasOwnProperty(t3) ? ee(Jn[t3]) : "transparent" === t3 ? new oe(NaN, NaN, NaN, 0) : null;
}
function ee(t3) {
  return new oe(t3 >> 16 & 255, t3 >> 8 & 255, 255 & t3, 1);
}
function ie(t3, n2, e2, i2) {
  if (i2 <= 0)
    t3 = n2 = e2 = NaN;
  return new oe(t3, n2, e2, i2);
}
function re(t3) {
  if (!(t3 instanceof On))
    t3 = ne(t3);
  if (!t3)
    return new oe();
  t3 = t3.rgb();
  return new oe(t3.r, t3.g, t3.b, t3.opacity);
}
function ae(t3, n2, e2, i2) {
  return 1 === arguments.length ? re(t3) : new oe(t3, n2, e2, null == i2 ? 1 : i2);
}
function oe(t3, n2, e2, i2) {
  this.r = +t3;
  this.g = +n2;
  this.b = +e2;
  this.opacity = +i2;
}
In(oe, ae, $n(On, { brighter: function(t3) {
  t3 = null == t3 ? Hn : Math.pow(Hn, t3);
  return new oe(this.r * t3, this.g * t3, this.b * t3, this.opacity);
}, darker: function(t3) {
  t3 = null == t3 ? Rn : Math.pow(Rn, t3);
  return new oe(this.r * t3, this.g * t3, this.b * t3, this.opacity);
}, rgb: function() {
  return this;
}, displayable: function() {
  return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
}, hex: se, formatHex: se, formatRgb: ue, toString: ue }));
function se() {
  return "#" + le(this.r) + le(this.g) + le(this.b);
}
function ue() {
  var t3 = this.opacity;
  t3 = isNaN(t3) ? 1 : Math.max(0, Math.min(1, t3));
  return (1 === t3 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t3 ? ")" : ", " + t3 + ")");
}
function le(t3) {
  t3 = Math.max(0, Math.min(255, Math.round(t3) || 0));
  return (t3 < 16 ? "0" : "") + t3.toString(16);
}
function he(t3, n2, e2, i2) {
  if (i2 <= 0)
    t3 = n2 = e2 = NaN;
  else if (e2 <= 0 || e2 >= 1)
    t3 = n2 = NaN;
  else if (n2 <= 0)
    t3 = NaN;
  return new de(t3, n2, e2, i2);
}
function ce(t3) {
  if (t3 instanceof de)
    return new de(t3.h, t3.s, t3.l, t3.opacity);
  if (!(t3 instanceof On))
    t3 = ne(t3);
  if (!t3)
    return new de();
  if (t3 instanceof de)
    return t3;
  t3 = t3.rgb();
  var n2 = t3.r / 255, e2 = t3.g / 255, i2 = t3.b / 255, r2 = Math.min(n2, e2, i2), a2 = Math.max(n2, e2, i2), o2 = NaN, s2 = a2 - r2, u2 = (a2 + r2) / 2;
  if (s2) {
    if (n2 === a2)
      o2 = (e2 - i2) / s2 + 6 * (e2 < i2);
    else if (e2 === a2)
      o2 = (i2 - n2) / s2 + 2;
    else
      o2 = (n2 - e2) / s2 + 4;
    s2 /= u2 < 0.5 ? a2 + r2 : 2 - a2 - r2;
    o2 *= 60;
  } else
    s2 = u2 > 0 && u2 < 1 ? 0 : o2;
  return new de(o2, s2, u2, t3.opacity);
}
function fe(t3, n2, e2, i2) {
  return 1 === arguments.length ? ce(t3) : new de(t3, n2, e2, null == i2 ? 1 : i2);
}
function de(t3, n2, e2, i2) {
  this.h = +t3;
  this.s = +n2;
  this.l = +e2;
  this.opacity = +i2;
}
In(de, fe, $n(On, { brighter: function(t3) {
  t3 = null == t3 ? Hn : Math.pow(Hn, t3);
  return new de(this.h, this.s, this.l * t3, this.opacity);
}, darker: function(t3) {
  t3 = null == t3 ? Rn : Math.pow(Rn, t3);
  return new de(this.h, this.s, this.l * t3, this.opacity);
}, rgb: function() {
  var t3 = this.h % 360 + 360 * (this.h < 0), n2 = isNaN(t3) || isNaN(this.s) ? 0 : this.s, e2 = this.l, i2 = e2 + (e2 < 0.5 ? e2 : 1 - e2) * n2, r2 = 2 * e2 - i2;
  return new oe(pe(t3 >= 240 ? t3 - 240 : t3 + 120, r2, i2), pe(t3, r2, i2), pe(t3 < 120 ? t3 + 240 : t3 - 120, r2, i2), this.opacity);
}, displayable: function() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
}, formatHsl: function() {
  var t3 = this.opacity;
  t3 = isNaN(t3) ? 1 : Math.max(0, Math.min(1, t3));
  return (1 === t3 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t3 ? ")" : ", " + t3 + ")");
} }));
function pe(t3, n2, e2) {
  return 255 * (t3 < 60 ? n2 + (e2 - n2) * t3 / 60 : t3 < 180 ? e2 : t3 < 240 ? n2 + (e2 - n2) * (240 - t3) / 60 : n2);
}
function ge(t3) {
  return function() {
    return t3;
  };
}
function ve(t3, n2) {
  return function(e2) {
    return t3 + e2 * n2;
  };
}
function me(t3, n2, e2) {
  return t3 = Math.pow(t3, e2), n2 = Math.pow(n2, e2) - t3, e2 = 1 / e2, function(i2) {
    return Math.pow(t3 + i2 * n2, e2);
  };
}
function ye(t3) {
  return 1 === (t3 = +t3) ? _e : function(n2, e2) {
    return e2 - n2 ? me(n2, e2, t3) : ge(isNaN(n2) ? e2 : n2);
  };
}
function _e(t3, n2) {
  var e2 = n2 - t3;
  return e2 ? ve(t3, e2) : ge(isNaN(t3) ? n2 : t3);
}
const we = function t2(n2) {
  var e2 = ye(n2);
  function i2(t3, n3) {
    var i3 = e2((t3 = ae(t3)).r, (n3 = ae(n3)).r), r2 = e2(t3.g, n3.g), a2 = e2(t3.b, n3.b), o2 = _e(t3.opacity, n3.opacity);
    return function(n4) {
      t3.r = i3(n4);
      t3.g = r2(n4);
      t3.b = a2(n4);
      t3.opacity = o2(n4);
      return t3 + "";
    };
  }
  i2.gamma = t2;
  return i2;
}(1);
function xe(t3, n2) {
  if (!n2)
    n2 = [];
  var e2 = t3 ? Math.min(n2.length, t3.length) : 0, i2 = n2.slice(), r2;
  return function(a2) {
    for (r2 = 0; r2 < e2; ++r2)
      i2[r2] = t3[r2] * (1 - a2) + n2[r2] * a2;
    return i2;
  };
}
function be(t3) {
  return ArrayBuffer.isView(t3) && !(t3 instanceof DataView);
}
function Ce(t3, n2) {
  var e2 = n2 ? n2.length : 0, i2 = t3 ? Math.min(e2, t3.length) : 0, r2 = new Array(i2), a2 = new Array(e2), o2;
  for (o2 = 0; o2 < i2; ++o2)
    r2[o2] = Le(t3[o2], n2[o2]);
  for (; o2 < e2; ++o2)
    a2[o2] = n2[o2];
  return function(t4) {
    for (o2 = 0; o2 < i2; ++o2)
      a2[o2] = r2[o2](t4);
    return a2;
  };
}
function Me(t3, n2) {
  var e2 = /* @__PURE__ */ new Date();
  return t3 = +t3, n2 = +n2, function(i2) {
    return e2.setTime(t3 * (1 - i2) + n2 * i2), e2;
  };
}
function Ne(t3, n2) {
  return t3 = +t3, n2 = +n2, function(e2) {
    return t3 * (1 - e2) + n2 * e2;
  };
}
function Ae(t3, n2) {
  var e2 = {}, i2 = {}, r2;
  if (null === t3 || "object" !== typeof t3)
    t3 = {};
  if (null === n2 || "object" !== typeof n2)
    n2 = {};
  for (r2 in n2)
    if (r2 in t3)
      e2[r2] = Le(t3[r2], n2[r2]);
    else
      i2[r2] = n2[r2];
  return function(t4) {
    for (r2 in e2)
      i2[r2] = e2[r2](t4);
    return i2;
  };
}
var ke = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Te = new RegExp(ke.source, "g");
function Se(t3) {
  return function() {
    return t3;
  };
}
function Ee(t3) {
  return function(n2) {
    return t3(n2) + "";
  };
}
function je(t3, n2) {
  var e2 = ke.lastIndex = Te.lastIndex = 0, i2, r2, a2, o2 = -1, s2 = [], u2 = [];
  t3 += "", n2 += "";
  while ((i2 = ke.exec(t3)) && (r2 = Te.exec(n2))) {
    if ((a2 = r2.index) > e2) {
      a2 = n2.slice(e2, a2);
      if (s2[o2])
        s2[o2] += a2;
      else
        s2[++o2] = a2;
    }
    if ((i2 = i2[0]) === (r2 = r2[0]))
      if (s2[o2])
        s2[o2] += r2;
      else
        s2[++o2] = r2;
    else {
      s2[++o2] = null;
      u2.push({ i: o2, x: Ne(i2, r2) });
    }
    e2 = Te.lastIndex;
  }
  if (e2 < n2.length) {
    a2 = n2.slice(e2);
    if (s2[o2])
      s2[o2] += a2;
    else
      s2[++o2] = a2;
  }
  return s2.length < 2 ? u2[0] ? Ee(u2[0].x) : Se(n2) : (n2 = u2.length, function(t4) {
    for (var e3 = 0, i3; e3 < n2; ++e3)
      s2[(i3 = u2[e3]).i] = i3.x(t4);
    return s2.join("");
  });
}
function Le(t3, n2) {
  var e2 = typeof n2, i2;
  return null == n2 || "boolean" === e2 ? ge(n2) : ("number" === e2 ? Ne : "string" === e2 ? (i2 = ne(n2)) ? (n2 = i2, we) : je : n2 instanceof ne ? we : n2 instanceof Date ? Me : be(n2) ? xe : Array.isArray(n2) ? Ce : "function" !== typeof n2.valueOf && "function" !== typeof n2.toString || isNaN(n2) ? Ae : Ne)(t3, n2);
}
function Ve(t3, n2) {
  return t3 = +t3, n2 = +n2, function(e2) {
    return Math.round(t3 * (1 - e2) + n2 * e2);
  };
}
var De = 180 / Math.PI;
var Pe = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
function Ie(t3, n2, e2, i2, r2, a2) {
  var o2, s2, u2;
  if (o2 = Math.sqrt(t3 * t3 + n2 * n2))
    t3 /= o2, n2 /= o2;
  if (u2 = t3 * e2 + n2 * i2)
    e2 -= t3 * u2, i2 -= n2 * u2;
  if (s2 = Math.sqrt(e2 * e2 + i2 * i2))
    e2 /= s2, i2 /= s2, u2 /= s2;
  if (t3 * i2 < n2 * e2)
    t3 = -t3, n2 = -n2, u2 = -u2, o2 = -o2;
  return { translateX: r2, translateY: a2, rotate: Math.atan2(n2, t3) * De, skewX: Math.atan(u2) * De, scaleX: o2, scaleY: s2 };
}
var $e, Oe, Re, He;
function Xe(t3) {
  if ("none" === t3)
    return Pe;
  if (!$e)
    $e = document.createElement("DIV"), Oe = document.documentElement, Re = document.defaultView;
  $e.style.transform = t3;
  t3 = Re.getComputedStyle(Oe.appendChild($e), null).getPropertyValue("transform");
  Oe.removeChild($e);
  t3 = t3.slice(7, -1).split(",");
  return Ie(+t3[0], +t3[1], +t3[2], +t3[3], +t3[4], +t3[5]);
}
function ze(t3) {
  if (null == t3)
    return Pe;
  if (!He)
    He = document.createElementNS("http://www.w3.org/2000/svg", "g");
  He.setAttribute("transform", t3);
  if (!(t3 = He.transform.baseVal.consolidate()))
    return Pe;
  t3 = t3.matrix;
  return Ie(t3.a, t3.b, t3.c, t3.d, t3.e, t3.f);
}
function Be(t3, n2, e2, i2) {
  function r2(t4) {
    return t4.length ? t4.pop() + " " : "";
  }
  function a2(t4, i3, r3, a3, o3, s3) {
    if (t4 !== r3 || i3 !== a3) {
      var u3 = o3.push("translate(", null, n2, null, e2);
      s3.push({ i: u3 - 4, x: Ne(t4, r3) }, { i: u3 - 2, x: Ne(i3, a3) });
    } else if (r3 || a3)
      o3.push("translate(" + r3 + n2 + a3 + e2);
  }
  function o2(t4, n3, e3, a3) {
    if (t4 !== n3) {
      if (t4 - n3 > 180)
        n3 += 360;
      else if (n3 - t4 > 180)
        t4 += 360;
      a3.push({ i: e3.push(r2(e3) + "rotate(", null, i2) - 2, x: Ne(t4, n3) });
    } else if (n3)
      e3.push(r2(e3) + "rotate(" + n3 + i2);
  }
  function s2(t4, n3, e3, a3) {
    if (t4 !== n3)
      a3.push({ i: e3.push(r2(e3) + "skewX(", null, i2) - 2, x: Ne(t4, n3) });
    else if (n3)
      e3.push(r2(e3) + "skewX(" + n3 + i2);
  }
  function u2(t4, n3, e3, i3, a3, o3) {
    if (t4 !== e3 || n3 !== i3) {
      var s3 = a3.push(r2(a3) + "scale(", null, ",", null, ")");
      o3.push({ i: s3 - 4, x: Ne(t4, e3) }, { i: s3 - 2, x: Ne(n3, i3) });
    } else if (1 !== e3 || 1 !== i3)
      a3.push(r2(a3) + "scale(" + e3 + "," + i3 + ")");
  }
  return function(n3, e3) {
    var i3 = [], r3 = [];
    n3 = t3(n3), e3 = t3(e3);
    a2(n3.translateX, n3.translateY, e3.translateX, e3.translateY, i3, r3);
    o2(n3.rotate, e3.rotate, i3, r3);
    s2(n3.skewX, e3.skewX, i3, r3);
    u2(n3.scaleX, n3.scaleY, e3.scaleX, e3.scaleY, i3, r3);
    n3 = e3 = null;
    return function(t4) {
      var n4 = -1, e4 = r3.length, a3;
      while (++n4 < e4)
        i3[(a3 = r3[n4]).i] = a3.x(t4);
      return i3.join("");
    };
  };
}
var qe = Be(Xe, "px, ", "px)", "deg)");
var We = Be(ze, ", ", ")", ")");
function Ye(t3, n2) {
  var e2, i2;
  return function() {
    var r2 = jn(this, t3), a2 = r2.tween;
    if (a2 !== e2) {
      i2 = e2 = a2;
      for (var o2 = 0, s2 = i2.length; o2 < s2; ++o2)
        if (i2[o2].name === n2) {
          i2 = i2.slice();
          i2.splice(o2, 1);
          break;
        }
    }
    r2.tween = i2;
  };
}
function Ge(t3, n2, e2) {
  var i2, r2;
  if ("function" !== typeof e2)
    throw new Error();
  return function() {
    var a2 = jn(this, t3), o2 = a2.tween;
    if (o2 !== i2) {
      r2 = (i2 = o2).slice();
      for (var s2 = { name: n2, value: e2 }, u2 = 0, l2 = r2.length; u2 < l2; ++u2)
        if (r2[u2].name === n2) {
          r2[u2] = s2;
          break;
        }
      if (u2 === l2)
        r2.push(s2);
    }
    a2.tween = r2;
  };
}
function Fe(t3, n2) {
  var e2 = this._id;
  t3 += "";
  if (arguments.length < 2) {
    var i2 = Ln(this.node(), e2).tween;
    for (var r2 = 0, a2 = i2.length, o2; r2 < a2; ++r2)
      if ((o2 = i2[r2]).name === t3)
        return o2.value;
    return null;
  }
  return this.each((null == n2 ? Ye : Ge)(e2, t3, n2));
}
function Ke(t3, n2, e2) {
  var i2 = t3._id;
  t3.each(function() {
    var t4 = jn(this, i2);
    (t4.value || (t4.value = {}))[n2] = e2.apply(this, arguments);
  });
  return function(t4) {
    return Ln(t4, i2).value[n2];
  };
}
function Ue(t3, n2) {
  var e2;
  return ("number" === typeof n2 ? Ne : n2 instanceof ne ? we : (e2 = ne(n2)) ? (n2 = e2, we) : je)(t3, n2);
}
function Je(t3) {
  return function() {
    this.removeAttribute(t3);
  };
}
function Ze(t3) {
  return function() {
    this.removeAttributeNS(t3.space, t3.local);
  };
}
function Qe(t3, n2, e2) {
  var i2, r2 = e2 + "", a2;
  return function() {
    var o2 = this.getAttribute(t3);
    return o2 === r2 ? null : o2 === i2 ? a2 : a2 = n2(i2 = o2, e2);
  };
}
function ti(t3, n2, e2) {
  var i2, r2 = e2 + "", a2;
  return function() {
    var o2 = this.getAttributeNS(t3.space, t3.local);
    return o2 === r2 ? null : o2 === i2 ? a2 : a2 = n2(i2 = o2, e2);
  };
}
function ni(t3, n2, e2) {
  var i2, r2, a2;
  return function() {
    var o2, s2 = e2(this), u2;
    if (null == s2)
      return void this.removeAttribute(t3);
    o2 = this.getAttribute(t3);
    u2 = s2 + "";
    return o2 === u2 ? null : o2 === i2 && u2 === r2 ? a2 : (r2 = u2, a2 = n2(i2 = o2, s2));
  };
}
function ei(t3, n2, e2) {
  var i2, r2, a2;
  return function() {
    var o2, s2 = e2(this), u2;
    if (null == s2)
      return void this.removeAttributeNS(t3.space, t3.local);
    o2 = this.getAttributeNS(t3.space, t3.local);
    u2 = s2 + "";
    return o2 === u2 ? null : o2 === i2 && u2 === r2 ? a2 : (r2 = u2, a2 = n2(i2 = o2, s2));
  };
}
function ii(t3, n2) {
  var e2 = r(t3), i2 = "transform" === e2 ? We : Ue;
  return this.attrTween(t3, "function" === typeof n2 ? (e2.local ? ei : ni)(e2, i2, Ke(this, "attr." + t3, n2)) : null == n2 ? (e2.local ? Ze : Je)(e2) : (e2.local ? ti : Qe)(e2, i2, n2));
}
function ri(t3, n2) {
  return function(e2) {
    this.setAttribute(t3, n2.call(this, e2));
  };
}
function ai(t3, n2) {
  return function(e2) {
    this.setAttributeNS(t3.space, t3.local, n2.call(this, e2));
  };
}
function oi(t3, n2) {
  var e2, i2;
  function r2() {
    var r3 = n2.apply(this, arguments);
    if (r3 !== i2)
      e2 = (i2 = r3) && ai(t3, r3);
    return e2;
  }
  r2._value = n2;
  return r2;
}
function si(t3, n2) {
  var e2, i2;
  function r2() {
    var r3 = n2.apply(this, arguments);
    if (r3 !== i2)
      e2 = (i2 = r3) && ri(t3, r3);
    return e2;
  }
  r2._value = n2;
  return r2;
}
function ui(t3, n2) {
  var e2 = "attr." + t3;
  if (arguments.length < 2)
    return (e2 = this.tween(e2)) && e2._value;
  if (null == n2)
    return this.tween(e2, null);
  if ("function" !== typeof n2)
    throw new Error();
  var i2 = r(t3);
  return this.tween(e2, (i2.local ? oi : si)(i2, n2));
}
function li(t3, n2) {
  return function() {
    En(this, t3).delay = +n2.apply(this, arguments);
  };
}
function hi(t3, n2) {
  return n2 = +n2, function() {
    En(this, t3).delay = n2;
  };
}
function ci(t3) {
  var n2 = this._id;
  return arguments.length ? this.each(("function" === typeof t3 ? li : hi)(n2, t3)) : Ln(this.node(), n2).delay;
}
function fi(t3, n2) {
  return function() {
    jn(this, t3).duration = +n2.apply(this, arguments);
  };
}
function di(t3, n2) {
  return n2 = +n2, function() {
    jn(this, t3).duration = n2;
  };
}
function pi(t3) {
  var n2 = this._id;
  return arguments.length ? this.each(("function" === typeof t3 ? fi : di)(n2, t3)) : Ln(this.node(), n2).duration;
}
function gi(t3, n2) {
  if ("function" !== typeof n2)
    throw new Error();
  return function() {
    jn(this, t3).ease = n2;
  };
}
function vi(t3) {
  var n2 = this._id;
  return arguments.length ? this.each(gi(n2, t3)) : Ln(this.node(), n2).ease;
}
function mi(t3) {
  if ("function" !== typeof t3)
    t3 = p(t3);
  for (var n2 = this._groups, e2 = n2.length, i2 = new Array(e2), r2 = 0; r2 < e2; ++r2)
    for (var a2 = n2[r2], o2 = a2.length, s2 = i2[r2] = [], u2, l2 = 0; l2 < o2; ++l2)
      if ((u2 = a2[l2]) && t3.call(u2, u2.__data__, l2, a2))
        s2.push(u2);
  return new Yi(i2, this._parents, this._name, this._id);
}
function yi(t3) {
  if (t3._id !== this._id)
    throw new Error();
  for (var n2 = this._groups, e2 = t3._groups, i2 = n2.length, r2 = e2.length, a2 = Math.min(i2, r2), o2 = new Array(i2), s2 = 0; s2 < a2; ++s2)
    for (var u2 = n2[s2], l2 = e2[s2], h2 = u2.length, c2 = o2[s2] = new Array(h2), f2, d2 = 0; d2 < h2; ++d2)
      if (f2 = u2[d2] || l2[d2])
        c2[d2] = f2;
  for (; s2 < i2; ++s2)
    o2[s2] = n2[s2];
  return new Yi(o2, this._parents, this._name, this._id);
}
function _i(t3) {
  return (t3 + "").trim().split(/^|\s+/).every(function(t4) {
    var n2 = t4.indexOf(".");
    if (n2 >= 0)
      t4 = t4.slice(0, n2);
    return !t4 || "start" === t4;
  });
}
function wi(t3, n2, e2) {
  var i2, r2, a2 = _i(n2) ? En : jn;
  return function() {
    var o2 = a2(this, t3), s2 = o2.on;
    if (s2 !== i2)
      (r2 = (i2 = s2).copy()).on(n2, e2);
    o2.on = r2;
  };
}
function xi(t3, n2) {
  var e2 = this._id;
  return arguments.length < 2 ? Ln(this.node(), e2).on.on(t3) : this.each(wi(e2, t3, n2));
}
function bi(t3) {
  return function() {
    var n2 = this.parentNode;
    for (var e2 in this.__transition)
      if (+e2 !== t3)
        return;
    if (n2)
      n2.removeChild(this);
  };
}
function Ci() {
  return this.on("end.remove", bi(this._id));
}
function Mi(t3) {
  var n2 = this._name, e2 = this._id;
  if ("function" !== typeof t3)
    t3 = l(t3);
  for (var i2 = this._groups, r2 = i2.length, a2 = new Array(r2), o2 = 0; o2 < r2; ++o2)
    for (var s2 = i2[o2], u2 = s2.length, h2 = a2[o2] = new Array(u2), c2, f2, d2 = 0; d2 < u2; ++d2)
      if ((c2 = s2[d2]) && (f2 = t3.call(c2, c2.__data__, d2, s2))) {
        if ("__data__" in c2)
          f2.__data__ = c2.__data__;
        h2[d2] = f2;
        Sn(h2[d2], n2, e2, d2, h2, Ln(c2, e2));
      }
  return new Yi(a2, this._parents, n2, e2);
}
function Ni(t3) {
  var n2 = this._name, e2 = this._id;
  if ("function" !== typeof t3)
    t3 = f(t3);
  for (var i2 = this._groups, r2 = i2.length, a2 = [], o2 = [], s2 = 0; s2 < r2; ++s2)
    for (var u2 = i2[s2], l2 = u2.length, h2, c2 = 0; c2 < l2; ++c2)
      if (h2 = u2[c2]) {
        for (var d2 = t3.call(h2, h2.__data__, c2, u2), p2, g2 = Ln(h2, e2), v2 = 0, m2 = d2.length; v2 < m2; ++v2)
          if (p2 = d2[v2])
            Sn(p2, n2, e2, v2, d2, g2);
        a2.push(d2);
        o2.push(h2);
      }
  return new Yi(a2, o2, n2, e2);
}
var Ai = qt.prototype.constructor;
function ki() {
  return new Ai(this._groups, this._parents);
}
function Ti(t3, n2) {
  var e2, i2, r2;
  return function() {
    var a2 = F(this, t3), o2 = (this.style.removeProperty(t3), F(this, t3));
    return a2 === o2 ? null : a2 === e2 && o2 === i2 ? r2 : r2 = n2(e2 = a2, i2 = o2);
  };
}
function Si(t3) {
  return function() {
    this.style.removeProperty(t3);
  };
}
function Ei(t3, n2, e2) {
  var i2, r2 = e2 + "", a2;
  return function() {
    var o2 = F(this, t3);
    return o2 === r2 ? null : o2 === i2 ? a2 : a2 = n2(i2 = o2, e2);
  };
}
function ji(t3, n2, e2) {
  var i2, r2, a2;
  return function() {
    var o2 = F(this, t3), s2 = e2(this), u2 = s2 + "";
    if (null == s2)
      u2 = s2 = (this.style.removeProperty(t3), F(this, t3));
    return o2 === u2 ? null : o2 === i2 && u2 === r2 ? a2 : (r2 = u2, a2 = n2(i2 = o2, s2));
  };
}
function Li(t3, n2) {
  var e2, i2, r2, a2 = "style." + n2, o2 = "end." + a2, s2;
  return function() {
    var u2 = jn(this, t3), l2 = u2.on, h2 = null == u2.value[a2] ? s2 || (s2 = Si(n2)) : void 0;
    if (l2 !== e2 || r2 !== h2)
      (i2 = (e2 = l2).copy()).on(o2, r2 = h2);
    u2.on = i2;
  };
}
function Vi(t3, n2, e2) {
  var i2 = "transform" === (t3 += "") ? qe : Ue;
  return null == n2 ? this.styleTween(t3, Ti(t3, i2)).on("end.style." + t3, Si(t3)) : "function" === typeof n2 ? this.styleTween(t3, ji(t3, i2, Ke(this, "style." + t3, n2))).each(Li(this._id, t3)) : this.styleTween(t3, Ei(t3, i2, n2), e2).on("end.style." + t3, null);
}
function Di(t3, n2, e2) {
  return function(i2) {
    this.style.setProperty(t3, n2.call(this, i2), e2);
  };
}
function Pi(t3, n2, e2) {
  var i2, r2;
  function a2() {
    var a3 = n2.apply(this, arguments);
    if (a3 !== r2)
      i2 = (r2 = a3) && Di(t3, a3, e2);
    return i2;
  }
  a2._value = n2;
  return a2;
}
function Ii(t3, n2, e2) {
  var i2 = "style." + (t3 += "");
  if (arguments.length < 2)
    return (i2 = this.tween(i2)) && i2._value;
  if (null == n2)
    return this.tween(i2, null);
  if ("function" !== typeof n2)
    throw new Error();
  return this.tween(i2, Pi(t3, n2, null == e2 ? "" : e2));
}
function $i(t3) {
  return function() {
    this.textContent = t3;
  };
}
function Oi(t3) {
  return function() {
    var n2 = t3(this);
    this.textContent = null == n2 ? "" : n2;
  };
}
function Ri(t3) {
  return this.tween("text", "function" === typeof t3 ? Oi(Ke(this, "text", t3)) : $i(null == t3 ? "" : t3 + ""));
}
function Hi(t3) {
  return function(n2) {
    this.textContent = t3.call(this, n2);
  };
}
function Xi(t3) {
  var n2, e2;
  function i2() {
    var i3 = t3.apply(this, arguments);
    if (i3 !== e2)
      n2 = (e2 = i3) && Hi(i3);
    return n2;
  }
  i2._value = t3;
  return i2;
}
function zi(t3) {
  var n2 = "text";
  if (arguments.length < 1)
    return (n2 = this.tween(n2)) && n2._value;
  if (null == t3)
    return this.tween(n2, null);
  if ("function" !== typeof t3)
    throw new Error();
  return this.tween(n2, Xi(t3));
}
function Bi() {
  var t3 = this._name, n2 = this._id, e2 = Gi();
  for (var i2 = this._groups, r2 = i2.length, a2 = 0; a2 < r2; ++a2)
    for (var o2 = i2[a2], s2 = o2.length, u2, l2 = 0; l2 < s2; ++l2)
      if (u2 = o2[l2]) {
        var h2 = Ln(u2, n2);
        Sn(u2, t3, e2, l2, o2, { time: h2.time + h2.delay + h2.duration, delay: 0, duration: h2.duration, ease: h2.ease });
      }
  return new Yi(i2, this._parents, t3, e2);
}
function qi() {
  var t3, n2, e2 = this, i2 = e2._id, r2 = e2.size();
  return new Promise(function(a2, o2) {
    var s2 = { value: o2 }, u2 = { value: function() {
      if (0 === --r2)
        a2();
    } };
    e2.each(function() {
      var e3 = jn(this, i2), r3 = e3.on;
      if (r3 !== t3) {
        n2 = (t3 = r3).copy();
        n2._.cancel.push(s2);
        n2._.interrupt.push(s2);
        n2._.end.push(u2);
      }
      e3.on = n2;
    });
  });
}
var Wi = 0;
function Yi(t3, n2, e2, i2) {
  this._groups = t3;
  this._parents = n2;
  this._name = e2;
  this._id = i2;
}
function Gi() {
  return ++Wi;
}
var Fi = qt.prototype;
Yi.prototype = { constructor: Yi, select: Mi, selectAll: Ni, filter: mi, merge: yi, selection: ki, transition: Bi, call: Fi.call, nodes: Fi.nodes, node: Fi.node, size: Fi.size, empty: Fi.empty, each: Fi.each, on: xi, attr: ii, attrTween: ui, style: Vi, styleTween: Ii, text: Ri, textTween: zi, remove: Ci, tween: Fe, delay: ci, duration: pi, ease: vi, end: qi };
var Ki = { time: null, delay: 0, duration: 250, ease: n };
function Ui(t3, n2) {
  var e2;
  while (!(e2 = t3.__transition) || !(e2 = e2[n2]))
    if (!(t3 = t3.parentNode))
      return Ki.time = hn(), Ki;
  return e2;
}
function Ji(t3) {
  var n2, e2;
  if (t3 instanceof Yi)
    n2 = t3._id, t3 = t3._name;
  else
    n2 = Gi(), (e2 = Ki).time = hn(), t3 = null == t3 ? null : t3 + "";
  for (var i2 = this._groups, r2 = i2.length, a2 = 0; a2 < r2; ++a2)
    for (var o2 = i2[a2], s2 = o2.length, u2, l2 = 0; l2 < s2; ++l2)
      if (u2 = o2[l2])
        Sn(u2, t3, n2, l2, o2, e2 || Ui(u2, n2));
  return new Yi(i2, this._parents, t3, n2);
}
qt.prototype.interrupt = Pn;
qt.prototype.transition = Ji;
function Zi(t3, n2) {
  return t3 < n2 ? -1 : t3 > n2 ? 1 : t3 >= n2 ? 0 : NaN;
}
function Qi(t3) {
  if (1 === t3.length)
    t3 = tr(t3);
  return { left: function(n2, e2, i2, r2) {
    if (null == i2)
      i2 = 0;
    if (null == r2)
      r2 = n2.length;
    while (i2 < r2) {
      var a2 = i2 + r2 >>> 1;
      if (t3(n2[a2], e2) < 0)
        i2 = a2 + 1;
      else
        r2 = a2;
    }
    return i2;
  }, right: function(n2, e2, i2, r2) {
    if (null == i2)
      i2 = 0;
    if (null == r2)
      r2 = n2.length;
    while (i2 < r2) {
      var a2 = i2 + r2 >>> 1;
      if (t3(n2[a2], e2) > 0)
        r2 = a2;
      else
        i2 = a2 + 1;
    }
    return i2;
  } };
}
function tr(t3) {
  return function(n2, e2) {
    return Zi(t3(n2), e2);
  };
}
var nr = Qi(Zi);
var er = nr.right;
function ir(t3, n2, e2) {
  t3 = +t3, n2 = +n2, e2 = (r2 = arguments.length) < 2 ? (n2 = t3, t3 = 0, 1) : r2 < 3 ? 1 : +e2;
  var i2 = -1, r2 = 0 | Math.max(0, Math.ceil((n2 - t3) / e2)), a2 = new Array(r2);
  while (++i2 < r2)
    a2[i2] = t3 + i2 * e2;
  return a2;
}
var rr = Math.sqrt(50), ar = Math.sqrt(10), or = Math.sqrt(2);
function sr(t3, n2, e2) {
  var i2, r2 = -1, a2, o2, s2;
  n2 = +n2, t3 = +t3, e2 = +e2;
  if (t3 === n2 && e2 > 0)
    return [t3];
  if (i2 = n2 < t3)
    a2 = t3, t3 = n2, n2 = a2;
  if (0 === (s2 = ur(t3, n2, e2)) || !isFinite(s2))
    return [];
  if (s2 > 0) {
    t3 = Math.ceil(t3 / s2);
    n2 = Math.floor(n2 / s2);
    o2 = new Array(a2 = Math.ceil(n2 - t3 + 1));
    while (++r2 < a2)
      o2[r2] = (t3 + r2) * s2;
  } else {
    t3 = Math.floor(t3 * s2);
    n2 = Math.ceil(n2 * s2);
    o2 = new Array(a2 = Math.ceil(t3 - n2 + 1));
    while (++r2 < a2)
      o2[r2] = (t3 - r2) / s2;
  }
  if (i2)
    o2.reverse();
  return o2;
}
function ur(t3, n2, e2) {
  var i2 = (n2 - t3) / Math.max(0, e2), r2 = Math.floor(Math.log(i2) / Math.LN10), a2 = i2 / Math.pow(10, r2);
  return r2 >= 0 ? (a2 >= rr ? 10 : a2 >= ar ? 5 : a2 >= or ? 2 : 1) * Math.pow(10, r2) : -Math.pow(10, -r2) / (a2 >= rr ? 10 : a2 >= ar ? 5 : a2 >= or ? 2 : 1);
}
function lr(t3, n2, e2) {
  var i2 = Math.abs(n2 - t3) / Math.max(0, e2), r2 = Math.pow(10, Math.floor(Math.log(i2) / Math.LN10)), a2 = i2 / r2;
  if (a2 >= rr)
    r2 *= 10;
  else if (a2 >= ar)
    r2 *= 5;
  else if (a2 >= or)
    r2 *= 2;
  return n2 < t3 ? -r2 : r2;
}
function hr(t3, n2) {
  var e2 = t3.length, i2 = -1, r2, a2;
  if (null == n2) {
    while (++i2 < e2)
      if (null != (r2 = t3[i2]) && r2 >= r2) {
        a2 = r2;
        while (++i2 < e2)
          if (null != (r2 = t3[i2]) && r2 > a2)
            a2 = r2;
      }
  } else
    while (++i2 < e2)
      if (null != (r2 = n2(t3[i2], i2, t3)) && r2 >= r2) {
        a2 = r2;
        while (++i2 < e2)
          if (null != (r2 = n2(t3[i2], i2, t3)) && r2 > a2)
            a2 = r2;
      }
  return a2;
}
function cr(t3, n2) {
  var e2 = t3.length, i2 = -1, r2, a2;
  if (null == n2) {
    while (++i2 < e2)
      if (null != (r2 = t3[i2]) && r2 >= r2) {
        a2 = r2;
        while (++i2 < e2)
          if (null != (r2 = t3[i2]) && a2 > r2)
            a2 = r2;
      }
  } else
    while (++i2 < e2)
      if (null != (r2 = n2(t3[i2], i2, t3)) && r2 >= r2) {
        a2 = r2;
        while (++i2 < e2)
          if (null != (r2 = n2(t3[i2], i2, t3)) && a2 > r2)
            a2 = r2;
      }
  return a2;
}
function fr(t3, n2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t3);
      break;
    default:
      this.range(n2).domain(t3);
      break;
  }
  return this;
}
var dr = "$";
function pr() {
}
pr.prototype = gr.prototype = { constructor: pr, has: function(t3) {
  return dr + t3 in this;
}, get: function(t3) {
  return this[dr + t3];
}, set: function(t3, n2) {
  this[dr + t3] = n2;
  return this;
}, remove: function(t3) {
  var n2 = dr + t3;
  return n2 in this && delete this[n2];
}, clear: function() {
  for (var t3 in this)
    if (t3[0] === dr)
      delete this[t3];
}, keys: function() {
  var t3 = [];
  for (var n2 in this)
    if (n2[0] === dr)
      t3.push(n2.slice(1));
  return t3;
}, values: function() {
  var t3 = [];
  for (var n2 in this)
    if (n2[0] === dr)
      t3.push(this[n2]);
  return t3;
}, entries: function() {
  var t3 = [];
  for (var n2 in this)
    if (n2[0] === dr)
      t3.push({ key: n2.slice(1), value: this[n2] });
  return t3;
}, size: function() {
  var t3 = 0;
  for (var n2 in this)
    if (n2[0] === dr)
      ++t3;
  return t3;
}, empty: function() {
  for (var t3 in this)
    if (t3[0] === dr)
      return false;
  return true;
}, each: function(t3) {
  for (var n2 in this)
    if (n2[0] === dr)
      t3(this[n2], n2.slice(1), this);
} };
function gr(t3, n2) {
  var e2 = new pr();
  if (t3 instanceof pr)
    t3.each(function(t4, n3) {
      e2.set(n3, t4);
    });
  else if (Array.isArray(t3)) {
    var i2 = -1, r2 = t3.length, a2;
    if (null == n2)
      while (++i2 < r2)
        e2.set(i2, t3[i2]);
    else
      while (++i2 < r2)
        e2.set(n2(a2 = t3[i2], i2, t3), a2);
  } else if (t3)
    for (var o2 in t3)
      e2.set(o2, t3[o2]);
  return e2;
}
function vr() {
}
var mr = gr.prototype;
vr.prototype = { constructor: vr, has: mr.has, add: function(t3) {
  t3 += "";
  this[dr + t3] = t3;
  return this;
}, remove: mr.remove, clear: mr.clear, values: mr.keys, size: mr.size, empty: mr.empty, each: mr.each };
var yr = Array.prototype;
var _r = yr.map;
var wr = yr.slice;
var xr = { name: "implicit" };
function br() {
  var t3 = gr(), n2 = [], e2 = [], i2 = xr;
  function r2(r3) {
    var a2 = r3 + "", o2 = t3.get(a2);
    if (!o2) {
      if (i2 !== xr)
        return i2;
      t3.set(a2, o2 = n2.push(r3));
    }
    return e2[(o2 - 1) % e2.length];
  }
  r2.domain = function(e3) {
    if (!arguments.length)
      return n2.slice();
    n2 = [], t3 = gr();
    var i3 = -1, a2 = e3.length, o2, s2;
    while (++i3 < a2)
      if (!t3.has(s2 = (o2 = e3[i3]) + ""))
        t3.set(s2, n2.push(o2));
    return r2;
  };
  r2.range = function(t4) {
    return arguments.length ? (e2 = wr.call(t4), r2) : e2.slice();
  };
  r2.unknown = function(t4) {
    return arguments.length ? (i2 = t4, r2) : i2;
  };
  r2.copy = function() {
    return br(n2, e2).unknown(i2);
  };
  fr.apply(r2, arguments);
  return r2;
}
function Cr() {
  var t3 = br().unknown(void 0), n2 = t3.domain, e2 = t3.range, i2 = [0, 1], r2, a2, o2 = false, s2 = 0, u2 = 0, l2 = 0.5;
  delete t3.unknown;
  function h2() {
    var t4 = n2().length, h3 = i2[1] < i2[0], c2 = i2[h3 - 0], f2 = i2[1 - h3];
    r2 = (f2 - c2) / Math.max(1, t4 - s2 + 2 * u2);
    if (o2)
      r2 = Math.floor(r2);
    c2 += (f2 - c2 - r2 * (t4 - s2)) * l2;
    a2 = r2 * (1 - s2);
    if (o2)
      c2 = Math.round(c2), a2 = Math.round(a2);
    var d2 = ir(t4).map(function(t5) {
      return c2 + r2 * t5;
    });
    return e2(h3 ? d2.reverse() : d2);
  }
  t3.domain = function(t4) {
    return arguments.length ? (n2(t4), h2()) : n2();
  };
  t3.range = function(t4) {
    return arguments.length ? (i2 = [+t4[0], +t4[1]], h2()) : i2.slice();
  };
  t3.rangeRound = function(t4) {
    return i2 = [+t4[0], +t4[1]], o2 = true, h2();
  };
  t3.bandwidth = function() {
    return a2;
  };
  t3.step = function() {
    return r2;
  };
  t3.round = function(t4) {
    return arguments.length ? (o2 = !!t4, h2()) : o2;
  };
  t3.padding = function(t4) {
    return arguments.length ? (s2 = Math.min(1, u2 = +t4), h2()) : s2;
  };
  t3.paddingInner = function(t4) {
    return arguments.length ? (s2 = Math.min(1, t4), h2()) : s2;
  };
  t3.paddingOuter = function(t4) {
    return arguments.length ? (u2 = +t4, h2()) : u2;
  };
  t3.align = function(t4) {
    return arguments.length ? (l2 = Math.max(0, Math.min(1, t4)), h2()) : l2;
  };
  t3.copy = function() {
    return Cr(n2(), i2).round(o2).paddingInner(s2).paddingOuter(u2).align(l2);
  };
  return fr.apply(h2(), arguments);
}
function Mr(t3) {
  var n2 = t3.copy;
  t3.padding = t3.paddingOuter;
  delete t3.paddingInner;
  delete t3.paddingOuter;
  t3.copy = function() {
    return Mr(n2());
  };
  return t3;
}
function Nr() {
  return Mr(Cr.apply(null, arguments).paddingInner(1));
}
function Ar(t3) {
  return function() {
    return t3;
  };
}
function kr(t3) {
  return +t3;
}
var Tr = [0, 1];
function Sr(t3) {
  return t3;
}
function Er(t3, n2) {
  return (n2 -= t3 = +t3) ? function(e2) {
    return (e2 - t3) / n2;
  } : Ar(isNaN(n2) ? NaN : 0.5);
}
function jr(t3) {
  var n2 = t3[0], e2 = t3[t3.length - 1], i2;
  if (n2 > e2)
    i2 = n2, n2 = e2, e2 = i2;
  return function(t4) {
    return Math.max(n2, Math.min(e2, t4));
  };
}
function Lr(t3, n2, e2) {
  var i2 = t3[0], r2 = t3[1], a2 = n2[0], o2 = n2[1];
  if (r2 < i2)
    i2 = Er(r2, i2), a2 = e2(o2, a2);
  else
    i2 = Er(i2, r2), a2 = e2(a2, o2);
  return function(t4) {
    return a2(i2(t4));
  };
}
function Vr(t3, n2, e2) {
  var i2 = Math.min(t3.length, n2.length) - 1, r2 = new Array(i2), a2 = new Array(i2), o2 = -1;
  if (t3[i2] < t3[0]) {
    t3 = t3.slice().reverse();
    n2 = n2.slice().reverse();
  }
  while (++o2 < i2) {
    r2[o2] = Er(t3[o2], t3[o2 + 1]);
    a2[o2] = e2(n2[o2], n2[o2 + 1]);
  }
  return function(n3) {
    var e3 = er(t3, n3, 1, i2) - 1;
    return a2[e3](r2[e3](n3));
  };
}
function Dr(t3, n2) {
  return n2.domain(t3.domain()).range(t3.range()).interpolate(t3.interpolate()).clamp(t3.clamp()).unknown(t3.unknown());
}
function Pr() {
  var t3 = Tr, n2 = Tr, e2 = Le, i2, r2, a2, o2 = Sr, s2, u2, l2;
  function h2() {
    s2 = Math.min(t3.length, n2.length) > 2 ? Vr : Lr;
    u2 = l2 = null;
    return c2;
  }
  function c2(r3) {
    return isNaN(r3 = +r3) ? a2 : (u2 || (u2 = s2(t3.map(i2), n2, e2)))(i2(o2(r3)));
  }
  c2.invert = function(e3) {
    return o2(r2((l2 || (l2 = s2(n2, t3.map(i2), Ne)))(e3)));
  };
  c2.domain = function(n3) {
    return arguments.length ? (t3 = _r.call(n3, kr), o2 === Sr || (o2 = jr(t3)), h2()) : t3.slice();
  };
  c2.range = function(t4) {
    return arguments.length ? (n2 = wr.call(t4), h2()) : n2.slice();
  };
  c2.rangeRound = function(t4) {
    return n2 = wr.call(t4), e2 = Ve, h2();
  };
  c2.clamp = function(n3) {
    return arguments.length ? (o2 = n3 ? jr(t3) : Sr, c2) : o2 !== Sr;
  };
  c2.interpolate = function(t4) {
    return arguments.length ? (e2 = t4, h2()) : e2;
  };
  c2.unknown = function(t4) {
    return arguments.length ? (a2 = t4, c2) : a2;
  };
  return function(t4, n3) {
    i2 = t4, r2 = n3;
    return h2();
  };
}
function Ir(t3, n2) {
  return Pr()(t3, n2);
}
function $r(t3) {
  return Math.abs(t3 = Math.round(t3)) >= 1e21 ? t3.toLocaleString("en").replace(/,/g, "") : t3.toString(10);
}
function Or(t3, n2) {
  if ((e2 = (t3 = n2 ? t3.toExponential(n2 - 1) : t3.toExponential()).indexOf("e")) < 0)
    return null;
  var e2, i2 = t3.slice(0, e2);
  return [i2.length > 1 ? i2[0] + i2.slice(2) : i2, +t3.slice(e2 + 1)];
}
function Rr(t3) {
  return t3 = Or(Math.abs(t3)), t3 ? t3[1] : NaN;
}
function Hr(t3, n2) {
  return function(e2, i2) {
    var r2 = e2.length, a2 = [], o2 = 0, s2 = t3[0], u2 = 0;
    while (r2 > 0 && s2 > 0) {
      if (u2 + s2 + 1 > i2)
        s2 = Math.max(1, i2 - u2);
      a2.push(e2.substring(r2 -= s2, r2 + s2));
      if ((u2 += s2 + 1) > i2)
        break;
      s2 = t3[o2 = (o2 + 1) % t3.length];
    }
    return a2.reverse().join(n2);
  };
}
function Xr(t3) {
  return function(n2) {
    return n2.replace(/[0-9]/g, function(n3) {
      return t3[+n3];
    });
  };
}
var zr = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Br(t3) {
  if (!(n2 = zr.exec(t3)))
    throw new Error("invalid format: " + t3);
  var n2;
  return new qr({ fill: n2[1], align: n2[2], sign: n2[3], symbol: n2[4], zero: n2[5], width: n2[6], comma: n2[7], precision: n2[8] && n2[8].slice(1), trim: n2[9], type: n2[10] });
}
Br.prototype = qr.prototype;
function qr(t3) {
  this.fill = void 0 === t3.fill ? " " : t3.fill + "";
  this.align = void 0 === t3.align ? ">" : t3.align + "";
  this.sign = void 0 === t3.sign ? "-" : t3.sign + "";
  this.symbol = void 0 === t3.symbol ? "" : t3.symbol + "";
  this.zero = !!t3.zero;
  this.width = void 0 === t3.width ? void 0 : +t3.width;
  this.comma = !!t3.comma;
  this.precision = void 0 === t3.precision ? void 0 : +t3.precision;
  this.trim = !!t3.trim;
  this.type = void 0 === t3.type ? "" : t3.type + "";
}
qr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type;
};
function Wr(t3) {
  t:
    for (var n2 = t3.length, e2 = 1, i2 = -1, r2; e2 < n2; ++e2)
      switch (t3[e2]) {
        case ".":
          i2 = r2 = e2;
          break;
        case "0":
          if (0 === i2)
            i2 = e2;
          r2 = e2;
          break;
        default:
          if (!+t3[e2])
            break t;
          if (i2 > 0)
            i2 = 0;
          break;
      }
  return i2 > 0 ? t3.slice(0, i2) + t3.slice(r2 + 1) : t3;
}
var Yr;
function Gr(t3, n2) {
  var e2 = Or(t3, n2);
  if (!e2)
    return t3 + "";
  var i2 = e2[0], r2 = e2[1], a2 = r2 - (Yr = 3 * Math.max(-8, Math.min(8, Math.floor(r2 / 3)))) + 1, o2 = i2.length;
  return a2 === o2 ? i2 : a2 > o2 ? i2 + new Array(a2 - o2 + 1).join("0") : a2 > 0 ? i2.slice(0, a2) + "." + i2.slice(a2) : "0." + new Array(1 - a2).join("0") + Or(t3, Math.max(0, n2 + a2 - 1))[0];
}
function Fr(t3, n2) {
  var e2 = Or(t3, n2);
  if (!e2)
    return t3 + "";
  var i2 = e2[0], r2 = e2[1];
  return r2 < 0 ? "0." + new Array(-r2).join("0") + i2 : i2.length > r2 + 1 ? i2.slice(0, r2 + 1) + "." + i2.slice(r2 + 1) : i2 + new Array(r2 - i2.length + 2).join("0");
}
const Kr = { "%": function(t3, n2) {
  return (100 * t3).toFixed(n2);
}, b: function(t3) {
  return Math.round(t3).toString(2);
}, c: function(t3) {
  return t3 + "";
}, d: $r, e: function(t3, n2) {
  return t3.toExponential(n2);
}, f: function(t3, n2) {
  return t3.toFixed(n2);
}, g: function(t3, n2) {
  return t3.toPrecision(n2);
}, o: function(t3) {
  return Math.round(t3).toString(8);
}, p: function(t3, n2) {
  return Fr(100 * t3, n2);
}, r: Fr, s: Gr, X: function(t3) {
  return Math.round(t3).toString(16).toUpperCase();
}, x: function(t3) {
  return Math.round(t3).toString(16);
} };
function Ur(t3) {
  return t3;
}
var Jr = Array.prototype.map, Zr = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Qr(t3) {
  var n2 = void 0 === t3.grouping || void 0 === t3.thousands ? Ur : Hr(Jr.call(t3.grouping, Number), t3.thousands + ""), e2 = void 0 === t3.currency ? "" : t3.currency[0] + "", i2 = void 0 === t3.currency ? "" : t3.currency[1] + "", r2 = void 0 === t3.decimal ? "." : t3.decimal + "", a2 = void 0 === t3.numerals ? Ur : Xr(Jr.call(t3.numerals, String)), o2 = void 0 === t3.percent ? "%" : t3.percent + "", s2 = void 0 === t3.minus ? "-" : t3.minus + "", u2 = void 0 === t3.nan ? "NaN" : t3.nan + "";
  function l2(t4) {
    t4 = Br(t4);
    var l3 = t4.fill, h3 = t4.align, c2 = t4.sign, f2 = t4.symbol, d2 = t4.zero, p2 = t4.width, g2 = t4.comma, v2 = t4.precision, m2 = t4.trim, y2 = t4.type;
    if ("n" === y2)
      g2 = true, y2 = "g";
    else if (!Kr[y2])
      void 0 === v2 && (v2 = 12), m2 = true, y2 = "g";
    if (d2 || "0" === l3 && "=" === h3)
      d2 = true, l3 = "0", h3 = "=";
    var _2 = "$" === f2 ? e2 : "#" === f2 && /[boxX]/.test(y2) ? "0" + y2.toLowerCase() : "", w2 = "$" === f2 ? i2 : /[%p]/.test(y2) ? o2 : "";
    var x2 = Kr[y2], b2 = /[defgprs%]/.test(y2);
    v2 = void 0 === v2 ? 6 : /[gprs]/.test(y2) ? Math.max(1, Math.min(21, v2)) : Math.max(0, Math.min(20, v2));
    function C2(t5) {
      var e3 = _2, i3 = w2, o3, f3, C3;
      if ("c" === y2) {
        i3 = x2(t5) + i3;
        t5 = "";
      } else {
        t5 = +t5;
        var M2 = t5 < 0 || 1 / t5 < 0;
        t5 = isNaN(t5) ? u2 : x2(Math.abs(t5), v2);
        if (m2)
          t5 = Wr(t5);
        if (M2 && 0 === +t5 && "+" !== c2)
          M2 = false;
        e3 = (M2 ? "(" === c2 ? c2 : s2 : "-" === c2 || "(" === c2 ? "" : c2) + e3;
        i3 = ("s" === y2 ? Zr[8 + Yr / 3] : "") + i3 + (M2 && "(" === c2 ? ")" : "");
        if (b2) {
          o3 = -1, f3 = t5.length;
          while (++o3 < f3)
            if (C3 = t5.charCodeAt(o3), 48 > C3 || C3 > 57) {
              i3 = (46 === C3 ? r2 + t5.slice(o3 + 1) : t5.slice(o3)) + i3;
              t5 = t5.slice(0, o3);
              break;
            }
        }
      }
      if (g2 && !d2)
        t5 = n2(t5, 1 / 0);
      var N2 = e3.length + t5.length + i3.length, A2 = N2 < p2 ? new Array(p2 - N2 + 1).join(l3) : "";
      if (g2 && d2)
        t5 = n2(A2 + t5, A2.length ? p2 - i3.length : 1 / 0), A2 = "";
      switch (h3) {
        case "<":
          t5 = e3 + t5 + i3 + A2;
          break;
        case "=":
          t5 = e3 + A2 + t5 + i3;
          break;
        case "^":
          t5 = A2.slice(0, N2 = A2.length >> 1) + e3 + t5 + i3 + A2.slice(N2);
          break;
        default:
          t5 = A2 + e3 + t5 + i3;
          break;
      }
      return a2(t5);
    }
    C2.toString = function() {
      return t4 + "";
    };
    return C2;
  }
  function h2(t4, n3) {
    var e3 = l2((t4 = Br(t4), t4.type = "f", t4)), i3 = 3 * Math.max(-8, Math.min(8, Math.floor(Rr(n3) / 3))), r3 = Math.pow(10, -i3), a3 = Zr[8 + i3 / 3];
    return function(t5) {
      return e3(r3 * t5) + a3;
    };
  }
  return { format: l2, formatPrefix: h2 };
}
var ta;
var na;
var ea;
ia({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""], minus: "-" });
function ia(t3) {
  ta = Qr(t3);
  na = ta.format;
  ea = ta.formatPrefix;
  return ta;
}
function ra(t3) {
  return Math.max(0, -Rr(Math.abs(t3)));
}
function aa(t3, n2) {
  return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Rr(n2) / 3))) - Rr(Math.abs(t3)));
}
function oa(t3, n2) {
  t3 = Math.abs(t3), n2 = Math.abs(n2) - t3;
  return Math.max(0, Rr(n2) - Rr(t3)) + 1;
}
function sa(t3, n2, e2, i2) {
  var r2 = lr(t3, n2, e2), a2;
  i2 = Br(null == i2 ? ",f" : i2);
  switch (i2.type) {
    case "s":
      var o2 = Math.max(Math.abs(t3), Math.abs(n2));
      if (null == i2.precision && !isNaN(a2 = aa(r2, o2)))
        i2.precision = a2;
      return ea(i2, o2);
    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      if (null == i2.precision && !isNaN(a2 = oa(r2, Math.max(Math.abs(t3), Math.abs(n2)))))
        i2.precision = a2 - ("e" === i2.type);
      break;
    case "f":
    case "%":
      if (null == i2.precision && !isNaN(a2 = ra(r2)))
        i2.precision = a2 - 2 * ("%" === i2.type);
      break;
  }
  return na(i2);
}
function ua(t3) {
  var n2 = t3.domain;
  t3.ticks = function(t4) {
    var e2 = n2();
    return sr(e2[0], e2[e2.length - 1], null == t4 ? 10 : t4);
  };
  t3.tickFormat = function(t4, e2) {
    var i2 = n2();
    return sa(i2[0], i2[i2.length - 1], null == t4 ? 10 : t4, e2);
  };
  t3.nice = function(e2) {
    if (null == e2)
      e2 = 10;
    var i2 = n2(), r2 = 0, a2 = i2.length - 1, o2 = i2[r2], s2 = i2[a2], u2;
    if (s2 < o2) {
      u2 = o2, o2 = s2, s2 = u2;
      u2 = r2, r2 = a2, a2 = u2;
    }
    u2 = ur(o2, s2, e2);
    if (u2 > 0) {
      o2 = Math.floor(o2 / u2) * u2;
      s2 = Math.ceil(s2 / u2) * u2;
      u2 = ur(o2, s2, e2);
    } else if (u2 < 0) {
      o2 = Math.ceil(o2 * u2) / u2;
      s2 = Math.floor(s2 * u2) / u2;
      u2 = ur(o2, s2, e2);
    }
    if (u2 > 0) {
      i2[r2] = Math.floor(o2 / u2) * u2;
      i2[a2] = Math.ceil(s2 / u2) * u2;
      n2(i2);
    } else if (u2 < 0) {
      i2[r2] = Math.ceil(o2 * u2) / u2;
      i2[a2] = Math.floor(s2 * u2) / u2;
      n2(i2);
    }
    return t3;
  };
  return t3;
}
function la() {
  var t3 = Ir(Sr, Sr);
  t3.copy = function() {
    return Dr(t3, la());
  };
  fr.apply(t3, arguments);
  return ua(t3);
}
class ha {
  constructor(t3) {
    __publicField(this, "dContainer");
    __publicField(this, "dTooltip");
    __publicField(this, "oTooltipTimeout");
    __publicField(this, "oTooltipSubTimeout");
    if (t3.nodeName)
      this.dContainer = t3;
    else
      throw new Error("The tooltip has no valid container element.");
  }
  create() {
    this.dTooltip = document.createElement("div");
    this.dTooltip.className = "tooltip is-transparent is-hidden";
    this.dContainer.appendChild(this.dTooltip);
    return this;
  }
  ping(t3) {
    const n2 = t3.constructor === Array ? `<strong>${t3[0]}</strong><br>${t3[1]}: <em>${t3[2]}</em>` : t3;
    const e2 = 1 + (window.devicePixelRatio > 1 ? window.devicePixelRatio / 20 : 0);
    const i2 = this.dContainer.getBoundingClientRect();
    const r2 = i2.left - 15;
    const a2 = i2.top;
    const o2 = Et ? Et.clientX : 0;
    const s2 = Et ? Et.clientY : 0;
    this.dTooltip.innerHTML = n2;
    this.dTooltip.className = "tooltip";
    if (i2.width + r2 - o2 < 90) {
      this.dTooltip.style.left = "auto";
      this.dTooltip.style.right = `${i2.width - o2 + r2 + 25}px`;
    } else {
      this.dTooltip.style.left = `${o2 - r2}px`;
      this.dTooltip.style.right = "auto";
    }
    this.dTooltip.style.top = `${s2 / e2 - a2}px`;
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.oTooltipTimeout = setTimeout(() => {
      this.hide();
    }, 5e3);
  }
  hide() {
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.dTooltip.className = "tooltip is-transparent";
    this.oTooltipSubTimeout = setTimeout(() => {
      this.dTooltip.className = "tooltip is-transparent is-hidden";
    }, 300);
  }
}
function ca(t3) {
  if (!t3.ok)
    throw new Error(t3.status + " " + t3.statusText);
  if (204 === t3.status || 205 === t3.status)
    return;
  return t3.json();
}
function fa(t3, n2) {
  return fetch(t3, n2).then(ca);
}
class da {
  static getPromiseJSON(t3) {
    if ("string" === typeof t3 && t3)
      return fa(t3);
    throw new Error("No valid data API string provided.");
  }
  static truncateString(t3, n2) {
    if (t3.length > n2)
      return `${t3.slice(0, n2 - 3)}[...]`;
    return t3;
  }
  static getRandomInteger(t3, n2, e2) {
    let i2 = Math.floor(Math.random() * (t3 - n2 - 1)) + n2 + 1;
    if (e2)
      while (i2 === e2)
        i2 = this.getRandomInteger(t3, n2);
    return i2;
  }
}
class pa {
  static getRandomColor(t3 = "light", n2 = 170) {
    const e2 = () => da.getRandomInteger(0, 255);
    let i2 = [];
    while (!i2.length || !this.colorFilter(t3, n2, i2))
      i2 = [e2(), e2(), e2()];
    return ae(i2[0], i2[1], i2[2]);
  }
  static colorFilter(t3, n2, e2) {
    let i2 = false;
    if (!e2.length)
      i2 = false;
    else if (!t3)
      i2 = true;
    else {
      const r2 = (299 * e2[0] + 587 * e2[1] + 114 * e2[2]) / 1e3;
      if ("light" === t3)
        i2 = r2 < n2;
      else if ("dark" === t3)
        i2 = r2 > n2;
    }
    return i2;
  }
  static convertHexToRgb(t3) {
    return ae(t3);
  }
  static getRandomPalette(t3 = 10) {
    let n2 = t3;
    const e2 = [];
    while (n2--)
      e2.push(this.getRandomColor());
    return e2;
  }
  static getDarkerColor(t3) {
    return t3.darker(0.5);
  }
}
class ga {
  static sliceSampleData(t3, n2 = 50) {
    const e2 = da.getRandomInteger(0, t3.length - n2);
    const i2 = e2 + da.getRandomInteger(3, n2);
    return t3.slice(e2, i2);
  }
  static getRandomData(t3, n2) {
    const e2 = t3 || da.getRandomInteger(3, 10);
    const i2 = n2 || da.getRandomInteger(1, 4);
    const r2 = da.getRandomInteger(1, 50);
    const a2 = da.getRandomInteger(r2, 200);
    const o2 = {};
    o2.jConfig = { sTitle: "Random Chart Data", aAxisLabels: ["Y Axis", "X Axis"], aValues: (() => {
      const t4 = [];
      let n3 = i2;
      while (n3--)
        t4.push({ sName: `Type ${i2 - n3}` });
      return t4;
    })(), bTrim: true };
    o2.jConfig.aValues = ga.addColoursToConfig(o2.jConfig.aValues, false);
    o2.aData = [];
    let s2 = e2;
    while (s2--)
      o2.aData.push({ sLabel: `Item ${e2 - s2}`, aValues: (() => {
        const t4 = [];
        let n3 = i2;
        while (n3--)
          t4.push(da.getRandomInteger(r2, a2));
        return t4;
      })() });
    return o2;
  }
  static getEmptyData() {
    const t3 = {};
    t3.jConfig = { sTitle: "", aAxisLabels: ["", ""], aValues: [], bTrim: true };
    t3.aData = [];
    return t3;
  }
  static transformDataKeys(t3, n2) {
    return n2.map((n3) => {
      if (t3.aValues && !n3.aValues)
        n3.aValues = t3.aValues.map((t4) => parseInt(n3[t4.sKey]));
      if (n3.aValues)
        n3.aValues = n3.aValues.map((t4) => {
          const n4 = parseInt(t4);
          return isNaN(n4) ? 0 : n4;
        });
      if (t3.aAxisKeys && !n3.sLabel)
        n3.sLabel = n3[t3.aAxisKeys[0]];
      return n3;
    });
  }
  static addColoursToConfig(t3, n2 = true) {
    return t3.map((t4) => {
      if (!t4.sColor)
        t4.sColor = pa.getRandomColor().hex();
      if (n2)
        t4.oColor = pa.convertHexToRgb(t4.sColor);
      return t4;
    });
  }
}
class va {
  constructor(t3 = {}) {
    __publicField(this, "dSvg");
    __publicField(this, "d3Svg");
    __publicField(this, "iTransitionTime");
    __publicField(this, "dContainer");
    __publicField(this, "dLoader");
    __publicField(this, "d3Title");
    __publicField(this, "oTooltip");
    __publicField(this, "iWidth");
    __publicField(this, "iHeight");
    __publicField(this, "iInnerWidth");
    __publicField(this, "iInnerHeight");
    __publicField(this, "iInitialWidth");
    __publicField(this, "jPadding");
    __publicField(this, "jConfig");
    __publicField(this, "aData");
    __publicField(this, "sChartType");
    __publicField(this, "oKey");
    __publicField(this, "oAxis");
    __publicField(this, "oResizeWatcher");
    __publicField(this, "oChartOutWatcher");
    __publicField(this, "iResizeOffset");
    const { jConfig: n2, aData: e2, sContainer: i2 } = t3;
    let { dContainer: r2 } = t3;
    this.dSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.d3Svg = Wt(this.dSvg);
    this.iTransitionTime = 500;
    this.jPadding = { l: 5, r: 5, t: 5, b: 5 };
    this.dLoader = document.createElement("div");
    this.dLoader.className = "dt-loader";
    if (!r2 && i2)
      r2 = document.getElementById(i2);
    if (r2)
      this.setContainer(r2);
    if (n2)
      this.setConfig(n2);
    if (e2)
      this.setData(e2);
  }
  setContainer(t3) {
    if (t3.nodeName) {
      t3.appendChild(this.dLoader);
      this.dContainer = t3;
    } else
      throw new Error("No valid DOM element or ID provided for chart.");
  }
  setConfig(t3) {
    if (t3 && "[object Object]" === t3.toString()) {
      if (t3.aValues)
        t3.aValues = ga.addColoursToConfig(t3.aValues);
      this.jConfig = t3;
    } else
      throw new Error("No valid configuration provided for chart.");
  }
  setData(t3, n2 = true) {
    if (t3 && true === Array.isArray(t3)) {
      if (this.jConfig && n2)
        t3 = ga.transformDataKeys(this.jConfig, t3);
      this.aData = t3;
    } else
      throw new Error("No valid data provided for chart.");
  }
  updateData(t3, n2 = true, e2 = true) {
    this.setData(t3, n2);
    this.setDimensions();
    if (this.oAxis)
      this.oAxis.render();
    if (this.renderChart && e2)
      this.renderChart();
  }
  updateConfig(t3, n2 = false, e2 = false) {
    this.setConfig(t3);
    if (n2)
      this.setDimensions();
    if (this.renderChart)
      this.renderChart(true, e2);
  }
  setDimensions() {
    if (this.dContainer && this.dContainer.nodeName) {
      this.iWidth = this.dContainer.clientWidth;
      this.iHeight = this.dContainer.clientHeight;
      this.iInnerWidth = this.iWidth - this.jPadding.l - this.jPadding.r;
      this.iInnerHeight = this.iHeight - this.jPadding.t - this.jPadding.b;
    } else
      throw new Error("Cannot set dimensions of chart without container element.");
  }
  renderChart(t3, n2) {
    if (this.d3Title)
      this.d3Title.text(this.jConfig.sTitle);
  }
  init() {
    this.setDimensions();
    if (this.aData && this.jConfig && !isNaN(this.iWidth) && !isNaN(this.iHeight)) {
      this.iInitialWidth = this.iWidth;
      this.oTooltip = new ha(this.dContainer).create();
      this.d3Title = Wt(this.dContainer).append("div").attr("class", "title");
      this.dSvg.setAttribute("class", "chart");
      this.dContainer.appendChild(this.dSvg);
      this.oResizeWatcher = this.oResizeWatcher || window.addEventListener("resize", () => {
        this.setDimensions();
        this.iResizeOffset = this.iWidth - this.iInitialWidth;
        if (this.renderChart)
          this.renderChart();
        this.oTooltip.hide();
      });
      this.oChartOutWatcher = this.oChartOutWatcher || this.dSvg.addEventListener("mouseout", () => {
        this.oTooltip.hide();
      });
      if (this.renderChart)
        this.renderChart();
      this.dContainer.removeChild(this.dLoader);
      return this;
    }
    throw new Error("The chart is not ready for initialisation.");
  }
}
class ma {
  constructor({ d3Container: t3, aValues: n2, iOffsetX: e2 = 0, iOffsetY: i2 = 0 }) {
    __publicField(this, "d3Container");
    __publicField(this, "aValues");
    __publicField(this, "iOffsetX");
    __publicField(this, "iOffsetY");
    if (t3 && n2) {
      this.d3Container = t3;
      this.aValues = n2.slice(n2);
      this.iOffsetX = e2;
      this.iOffsetY = i2;
    } else
      throw new Error("Incorrect parameters provided to Key constructor.");
  }
  render() {
    this.d3Container.selectAll("g.key").remove();
    let t3 = 0;
    const n2 = this.d3Container.append("g").attr("class", "key");
    const e2 = n2.selectAll("text.label").data(this.aValues);
    const i2 = (t4, n3) => {
      let e3 = 0;
      if (n3)
        for (let i3 = 0; i3 < n3; i3++)
          e3 += t4[i3].iLabelWidth;
      return e3;
    };
    e2.enter().append("text").text((t4) => t4.sName).each((n3, e3, i3) => {
      const r3 = i3[e3].getBoundingClientRect().width + 15;
      this.aValues[e3].iLabelWidth = r3;
      t3 += r3 - 2;
    }).attr("class", "label").attr("x", (t4, n3) => !!t4 && i2(this.aValues, n3)).attr("y", 8).attr("width", 10).attr("height", 10).attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", "#222222");
    const r2 = n2.selectAll("rect.key").data(this.aValues);
    r2.enter().append("rect").attr("class", "key").attr("fill", (t4) => t4.sColor).attr("x", (t4, n3) => !!t4 && i2(this.aValues, n3) - 12).attr("y", 0).attr("width", 10).attr("height", 10);
    t3 = this.iOffsetX - t3 / 2;
    n2.attr("transform", `translate(${t3},${this.iOffsetY})`);
    return this;
  }
  position() {
    return this;
  }
}
var ya = Array.prototype.slice;
function _a(t3) {
  return t3;
}
var wa = 1, xa = 2, ba = 3, Ca = 4, Ma = 1e-6;
function Na(t3) {
  return "translate(" + (t3 + 0.5) + ",0)";
}
function Aa(t3) {
  return "translate(0," + (t3 + 0.5) + ")";
}
function ka(t3) {
  return function(n2) {
    return +t3(n2);
  };
}
function Ta(t3) {
  var n2 = Math.max(0, t3.bandwidth() - 1) / 2;
  if (t3.round())
    n2 = Math.round(n2);
  return function(e2) {
    return +t3(e2) + n2;
  };
}
function Sa() {
  return !this.__axis;
}
function Ea(t3, n2) {
  var e2 = [], i2 = null, r2 = null, a2 = 6, o2 = 6, s2 = 3, u2 = t3 === wa || t3 === Ca ? -1 : 1, l2 = t3 === Ca || t3 === xa ? "x" : "y", h2 = t3 === wa || t3 === ba ? Na : Aa;
  function c2(c3) {
    var f2 = null == i2 ? n2.ticks ? n2.ticks.apply(n2, e2) : n2.domain() : i2, d2 = null == r2 ? n2.tickFormat ? n2.tickFormat.apply(n2, e2) : _a : r2, p2 = Math.max(a2, 0) + s2, g2 = n2.range(), v2 = +g2[0] + 0.5, m2 = +g2[g2.length - 1] + 0.5, y2 = (n2.bandwidth ? Ta : ka)(n2.copy()), _2 = c3.selection ? c3.selection() : c3, w2 = _2.selectAll(".domain").data([null]), x2 = _2.selectAll(".tick").data(f2, n2).order(), b2 = x2.exit(), C2 = x2.enter().append("g").attr("class", "tick"), M2 = x2.select("line"), N2 = x2.select("text");
    w2 = w2.merge(w2.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
    x2 = x2.merge(C2);
    M2 = M2.merge(C2.append("line").attr("stroke", "currentColor").attr(l2 + "2", u2 * a2));
    N2 = N2.merge(C2.append("text").attr("fill", "currentColor").attr(l2, u2 * p2).attr("dy", t3 === wa ? "0em" : t3 === ba ? "0.71em" : "0.32em"));
    if (c3 !== _2) {
      w2 = w2.transition(c3);
      x2 = x2.transition(c3);
      M2 = M2.transition(c3);
      N2 = N2.transition(c3);
      b2 = b2.transition(c3).attr("opacity", Ma).attr("transform", function(t4) {
        return isFinite(t4 = y2(t4)) ? h2(t4) : this.getAttribute("transform");
      });
      C2.attr("opacity", Ma).attr("transform", function(t4) {
        var n3 = this.parentNode.__axis;
        return h2(n3 && isFinite(n3 = n3(t4)) ? n3 : y2(t4));
      });
    }
    b2.remove();
    w2.attr("d", t3 === Ca || t3 == xa ? o2 ? "M" + u2 * o2 + "," + v2 + "H0.5V" + m2 + "H" + u2 * o2 : "M0.5," + v2 + "V" + m2 : o2 ? "M" + v2 + "," + u2 * o2 + "V0.5H" + m2 + "V" + u2 * o2 : "M" + v2 + ",0.5H" + m2);
    x2.attr("opacity", 1).attr("transform", function(t4) {
      return h2(y2(t4));
    });
    M2.attr(l2 + "2", u2 * a2);
    N2.attr(l2, u2 * p2).text(d2);
    _2.filter(Sa).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t3 === xa ? "start" : t3 === Ca ? "end" : "middle");
    _2.each(function() {
      this.__axis = y2;
    });
  }
  c2.scale = function(t4) {
    return arguments.length ? (n2 = t4, c2) : n2;
  };
  c2.ticks = function() {
    return e2 = ya.call(arguments), c2;
  };
  c2.tickArguments = function(t4) {
    return arguments.length ? (e2 = null == t4 ? [] : ya.call(t4), c2) : e2.slice();
  };
  c2.tickValues = function(t4) {
    return arguments.length ? (i2 = null == t4 ? null : ya.call(t4), c2) : i2 && i2.slice();
  };
  c2.tickFormat = function(t4) {
    return arguments.length ? (r2 = t4, c2) : r2;
  };
  c2.tickSize = function(t4) {
    return arguments.length ? (a2 = o2 = +t4, c2) : a2;
  };
  c2.tickSizeInner = function(t4) {
    return arguments.length ? (a2 = +t4, c2) : a2;
  };
  c2.tickSizeOuter = function(t4) {
    return arguments.length ? (o2 = +t4, c2) : o2;
  };
  c2.tickPadding = function(t4) {
    return arguments.length ? (s2 = +t4, c2) : s2;
  };
  return c2;
}
function ja(t3) {
  return Ea(ba, t3);
}
function La(t3) {
  return Ea(Ca, t3);
}
class Va {
  constructor(t3) {
    __publicField(this, "d3Container");
    __publicField(this, "iTruncate");
    __publicField(this, "aAxisLabels");
    __publicField(this, "oScaleX");
    __publicField(this, "oScaleY");
    __publicField(this, "oTooltip");
    __publicField(this, "iWidth");
    __publicField(this, "iHeight");
    __publicField(this, "jPadding");
    if (t3.d3Container)
      Object.assign(this, t3);
    else
      throw new Error("Incorrect parameters provided to Axis constructor.");
  }
  render() {
    this.renderAxisX();
    this.renderAxisY();
    this.renderLabels();
    return this;
  }
  renderAxisX() {
    this.d3Container.selectAll("g.x-axis").remove();
    this.d3Container.append("g").attr("class", "x-axis").call(ja(this.oScaleX)).attr("transform", `translate(${this.jPadding.l},${this.iHeight})`).selectAll("text").attr("x", -5).attr("y", 6).attr("transform", "rotate(310)").attr("class", "x-labels").text((t3) => da.truncateString(t3, this.iTruncate)).style("text-anchor", "end").on("mousemove", (t3) => {
      if (this.oTooltip && t3.length > this.iTruncate)
        this.oTooltip.ping(`<strong>${t3}</strong>`);
    });
  }
  renderAxisY() {
    this.d3Container.selectAll("g.y-axis").remove();
    this.d3Container.append("g").attr("class", "y-axis").call(La(this.oScaleY)).attr("transform", `translate(${this.jPadding.l},0)`).selectAll(".y-axis .tick line").attr("x2", () => this.iWidth);
  }
  renderLabels() {
    this.d3Container.selectAll("text.labels").remove();
    this.d3Container.append("text").attr("class", "labels").attr("x", this.iHeight / -2 - this.jPadding.t / 2).attr("y", 10).attr("transform", "rotate(-90)").attr("text-anchor", "middle").text(this.aAxisLabels[0]);
    this.d3Container.append("text").attr("class", "labels").attr("x", (this.iWidth + this.jPadding.l + this.jPadding.r) / 2).attr("y", this.iHeight + (this.jPadding.b - 5)).attr("text-anchor", "middle").text(this.aAxisLabels[1]);
  }
}
class Da extends va {
  constructor(t3 = {}) {
    super(t3);
    __publicField(this, "d3ChartGroup");
    __publicField(this, "d3AxisGroup");
    __publicField(this, "oScaleX");
    __publicField(this, "oScaleY");
    __publicField(this, "iMinValue");
    __publicField(this, "iMaxValue");
    __publicField(this, "iSection");
    this.jPadding = { l: 45, r: 15, t: 25, b: 90 };
    this.oScaleY = la();
    this.oScaleX = Cr().padding(0.2);
  }
  setDimensions() {
    super.setDimensions();
    const t3 = this.jConfig.bTrim;
    let n2 = Number(t3 ? cr(this.aData, (t4) => cr(t4.aValues)) : 0);
    let e2 = Number(hr(this.aData, (t4) => hr(t4.aValues)));
    const i2 = Math.ceil(e2 / 15);
    if (t3) {
      const t4 = n2 > i2 ? n2 - i2 : 0;
      n2 = n2 > 0 ? t4 : n2;
      n2 = n2 < 0 ? n2 - i2 : n2;
      e2 += i2;
    }
    this.oScaleX.domain(this.aData.map((t4) => t4.sLabel)).range([0, this.iInnerWidth]);
    this.oScaleY.domain([n2, e2]).range([this.iInnerHeight, this.jPadding.t]);
    this.iMinValue = n2;
    this.iMaxValue = e2;
    this.iSection = i2;
  }
  renderChart() {
    super.renderChart();
    const { aAxisLabels: t3, iTruncate: n2 = 15 } = this.jConfig;
    const { iInnerWidth: e2, iInnerHeight: i2, oScaleX: r2, oScaleY: a2, jPadding: o2 } = this;
    this.d3AxisGroup = this.d3AxisGroup || this.d3Svg.append("g").attr("class", "axes-g");
    this.oAxis = new Va({ d3Container: this.d3AxisGroup, iTruncate: n2, aAxisLabels: t3, oScaleX: r2, oScaleY: a2, jPadding: o2, iWidth: e2, iHeight: i2, oTooltip: this.oTooltip }).render();
    this.d3ChartGroup = this.d3ChartGroup || this.d3Svg.append("g").attr("transform", `translate(${this.jPadding.l}, 0)`);
    this.oKey = new ma({ d3Container: Wt(this.dSvg), aValues: this.jConfig.aValues, iOffsetX: this.iInnerWidth / 2 + this.jPadding.l, iOffsetY: this.iHeight - 20 }).render();
  }
}
class Pa extends Da {
  constructor(t3 = {}) {
    super(t3);
    __publicField(this, "aBars");
    this.sChartType = "bar";
  }
  renderChart(n2 = false, e2 = true) {
    super.renderChart();
    const { aValues: i2, sBarType: r2 = "side" } = this.jConfig;
    const { iInnerHeight: a2, oScaleX: o2, oScaleY: s2 } = this;
    const u2 = o2.bandwidth() / i2.length;
    this.aBars = this.aBars || [];
    if (n2) {
      this.aBars.forEach((t3, n3) => {
        this.aBars[n3] = this.d3ChartGroup.selectAll(`rect.bars-${n3}`).data({});
        this.aBars[n3].exit().remove();
        this.aBars[n3] = void 0;
      });
      this.aBars = [];
    }
    i2.forEach((n3, i3) => {
      const { oColor: l2 } = n3;
      const h2 = "side" === r2 ? u2 * i3 : 0;
      if (!this.aBars[i3]) {
        this.aBars[i3] = this.d3ChartGroup.selectAll(`rect.bars-${i3}`).data(this.aData);
        this.aBars[i3].enter().append("rect").on("mousemove", (t3) => {
          this.oTooltip.ping([t3.sLabel, n3.sName, t3.aValues[i3]]);
        }).on("mouseover", (t3) => {
          t3.oColor = l2;
          Wt(Et.target).attr("fill", t3.oColor.darker(1));
        }).on("mousedown", (t3) => {
          if (this.jConfig.fnClickCallback)
            this.jConfig.fnClickCallback({ oEvent: Et, jData: t3 });
        }).on("mouseout", (t3) => {
          this.oTooltip.hide();
          Wt(Et.target).attr("fill", t3.oColor);
        }).attr("class", `bars bars-${i3}`).attr("fill", l2).attr("y", a2).attr("height", 0);
      }
      (() => {
        const n4 = this.d3ChartGroup.selectAll(`rect.bars-${i3}`);
        n4.data(this.aData).attr("x", (t3) => o2(t3.sLabel) + h2).attr("width", u2);
        if (e2)
          return n4.transition(false).ease(t).duration(this.iTransitionTime);
        return n4;
      })().attr("y", (t3) => {
        let n4 = t3.aValues[i3];
        n4 = n4 < 0 ? Math.abs(n4) : 0;
        return s2(t3.aValues[i3] + n4);
      }).attr("height", (t3) => {
        const n4 = this.iMinValue < 0 ? Math.abs(this.iMinValue) : 0;
        return a2 - s2(Math.abs(t3.aValues[i3]) - n4);
      });
    });
  }
}
var Ia = Math.PI, $a = 2 * Ia, Oa = 1e-6, Ra = $a - Oa;
function Ha() {
  this._x0 = this._y0 = this._x1 = this._y1 = null;
  this._ = "";
}
function Xa() {
  return new Ha();
}
Ha.prototype = Xa.prototype = { constructor: Ha, moveTo: function(t3, n2) {
  this._ += "M" + (this._x0 = this._x1 = +t3) + "," + (this._y0 = this._y1 = +n2);
}, closePath: function() {
  if (null !== this._x1) {
    this._x1 = this._x0, this._y1 = this._y0;
    this._ += "Z";
  }
}, lineTo: function(t3, n2) {
  this._ += "L" + (this._x1 = +t3) + "," + (this._y1 = +n2);
}, quadraticCurveTo: function(t3, n2, e2, i2) {
  this._ += "Q" + +t3 + "," + +n2 + "," + (this._x1 = +e2) + "," + (this._y1 = +i2);
}, bezierCurveTo: function(t3, n2, e2, i2, r2, a2) {
  this._ += "C" + +t3 + "," + +n2 + "," + +e2 + "," + +i2 + "," + (this._x1 = +r2) + "," + (this._y1 = +a2);
}, arcTo: function(t3, n2, e2, i2, r2) {
  t3 = +t3, n2 = +n2, e2 = +e2, i2 = +i2, r2 = +r2;
  var a2 = this._x1, o2 = this._y1, s2 = e2 - t3, u2 = i2 - n2, l2 = a2 - t3, h2 = o2 - n2, c2 = l2 * l2 + h2 * h2;
  if (r2 < 0)
    throw new Error("negative radius: " + r2);
  if (null === this._x1)
    this._ += "M" + (this._x1 = t3) + "," + (this._y1 = n2);
  else if (!(c2 > Oa))
    ;
  else if (!(Math.abs(h2 * s2 - u2 * l2) > Oa) || !r2)
    this._ += "L" + (this._x1 = t3) + "," + (this._y1 = n2);
  else {
    var f2 = e2 - a2, d2 = i2 - o2, p2 = s2 * s2 + u2 * u2, g2 = f2 * f2 + d2 * d2, v2 = Math.sqrt(p2), m2 = Math.sqrt(c2), y2 = r2 * Math.tan((Ia - Math.acos((p2 + c2 - g2) / (2 * v2 * m2))) / 2), _2 = y2 / m2, w2 = y2 / v2;
    if (Math.abs(_2 - 1) > Oa)
      this._ += "L" + (t3 + _2 * l2) + "," + (n2 + _2 * h2);
    this._ += "A" + r2 + "," + r2 + ",0,0," + +(h2 * f2 > l2 * d2) + "," + (this._x1 = t3 + w2 * s2) + "," + (this._y1 = n2 + w2 * u2);
  }
}, arc: function(t3, n2, e2, i2, r2, a2) {
  t3 = +t3, n2 = +n2, e2 = +e2, a2 = !!a2;
  var o2 = e2 * Math.cos(i2), s2 = e2 * Math.sin(i2), u2 = t3 + o2, l2 = n2 + s2, h2 = 1 ^ a2, c2 = a2 ? i2 - r2 : r2 - i2;
  if (e2 < 0)
    throw new Error("negative radius: " + e2);
  if (null === this._x1)
    this._ += "M" + u2 + "," + l2;
  else if (Math.abs(this._x1 - u2) > Oa || Math.abs(this._y1 - l2) > Oa)
    this._ += "L" + u2 + "," + l2;
  if (!e2)
    return;
  if (c2 < 0)
    c2 = c2 % $a + $a;
  if (c2 > Ra)
    this._ += "A" + e2 + "," + e2 + ",0,1," + h2 + "," + (t3 - o2) + "," + (n2 - s2) + "A" + e2 + "," + e2 + ",0,1," + h2 + "," + (this._x1 = u2) + "," + (this._y1 = l2);
  else if (c2 > Oa)
    this._ += "A" + e2 + "," + e2 + ",0," + +(c2 >= Ia) + "," + h2 + "," + (this._x1 = t3 + e2 * Math.cos(r2)) + "," + (this._y1 = n2 + e2 * Math.sin(r2));
}, rect: function(t3, n2, e2, i2) {
  this._ += "M" + (this._x0 = this._x1 = +t3) + "," + (this._y0 = this._y1 = +n2) + "h" + +e2 + "v" + +i2 + "h" + -e2 + "Z";
}, toString: function() {
  return this._;
} };
function za(t3) {
  return function n2() {
    return t3;
  };
}
function Ba(t3) {
  this._context = t3;
}
Ba.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._point = 0;
}, lineEnd: function() {
  if (this._line || 0 !== this._line && 1 === this._point)
    this._context.closePath();
  this._line = 1 - this._line;
}, point: function(t3, n2) {
  t3 = +t3, n2 = +n2;
  switch (this._point) {
    case 0:
      this._point = 1;
      this._line ? this._context.lineTo(t3, n2) : this._context.moveTo(t3, n2);
      break;
    case 1:
      this._point = 2;
    default:
      this._context.lineTo(t3, n2);
      break;
  }
} };
function qa(t3) {
  return new Ba(t3);
}
function Wa(t3) {
  return t3[0];
}
function Ya(t3) {
  return t3[1];
}
function Ga() {
  var t3 = Wa, n2 = Ya, e2 = za(true), i2 = null, r2 = qa, a2 = null;
  function o2(o3) {
    var s2, u2 = o3.length, l2, h2 = false, c2;
    if (null == i2)
      a2 = r2(c2 = Xa());
    for (s2 = 0; s2 <= u2; ++s2) {
      if (!(s2 < u2 && e2(l2 = o3[s2], s2, o3)) === h2)
        if (h2 = !h2)
          a2.lineStart();
        else
          a2.lineEnd();
      if (h2)
        a2.point(+t3(l2, s2, o3), +n2(l2, s2, o3));
    }
    if (c2)
      return a2 = null, c2 + "" || null;
  }
  o2.x = function(n3) {
    return arguments.length ? (t3 = "function" === typeof n3 ? n3 : za(+n3), o2) : t3;
  };
  o2.y = function(t4) {
    return arguments.length ? (n2 = "function" === typeof t4 ? t4 : za(+t4), o2) : n2;
  };
  o2.defined = function(t4) {
    return arguments.length ? (e2 = "function" === typeof t4 ? t4 : za(!!t4), o2) : e2;
  };
  o2.curve = function(t4) {
    return arguments.length ? (r2 = t4, null != i2 && (a2 = r2(i2)), o2) : r2;
  };
  o2.context = function(t4) {
    return arguments.length ? (null == t4 ? i2 = a2 = null : a2 = r2(i2 = t4), o2) : i2;
  };
  return o2;
}
class Fa extends Da {
  constructor(t3 = {}) {
    super(t3);
    __publicField(this, "aLines");
    __publicField(this, "aCircles");
    this.sChartType = "line";
    this.oScaleX = Nr();
  }
  renderChart(t3 = false) {
    super.renderChart();
    const { aValues: n2 } = this.jConfig;
    const { oScaleX: e2, oScaleY: i2 } = this;
    this.aLines = this.aLines || [];
    this.aCircles = this.aCircles || [];
    if (t3) {
      this.aLines.forEach((t4, n3) => {
        this.aLines[n3] = this.d3ChartGroup.selectAll(`path.lines-${n3}`).data([]);
        this.aLines[n3].exit().remove();
        this.aLines[n3] = void 0;
      });
      this.aLines = [];
    }
    if (t3) {
      this.aCircles.forEach((t4, n3) => {
        this.aCircles[n3] = this.d3ChartGroup.selectAll(`circle.circles-${n3}`).data([]);
        this.aCircles[n3].exit().remove();
        this.aCircles[n3] = void 0;
      });
      this.aCircles = [];
    }
    n2.forEach((t4, n3) => {
      const { oColor: r2 } = t4;
      if (!this.aLines[n3]) {
        this.aLines[n3] = Ga();
        this.d3ChartGroup.append("path").data([this.aData]).attr("class", `line lines-${n3}`).attr("stroke", r2);
      }
      this.aLines[n3].x((t5) => e2(t5.sLabel) + e2.bandwidth() / 2).y((t5) => i2(t5.aValues[n3]));
      this.d3ChartGroup.selectAll(`path.lines-${n3}`).data([this.aData]).attr("d", this.aLines[n3]);
      if (!this.aCircles[n3]) {
        this.aCircles[n3] = this.d3ChartGroup.selectAll(`circle.circles-${n3}`).data(this.aData);
        this.aCircles[n3].enter().append("circle").on("mousemove", (e3) => {
          this.oTooltip.ping([e3.sLabel, t4.sName, e3.aValues[n3]]);
        }).on("mouseover", (t5) => {
          t5.oColor = this.jConfig.aValues[n3].oColor;
          Wt(Et.target).attr("fill", t5.oColor.darker(1));
        }).on("mousedown", (t5) => {
          if (this.jConfig.fnClickCallback)
            this.jConfig.fnClickCallback({ oEvent: Et, jData: t5 });
        }).on("mouseout", (t5) => {
          this.oTooltip.hide();
          Wt(Et.target).attr("fill", t5.oColor);
        }).attr("class", `circles circles-${n3}`).attr("fill", r2).attr("r", 5);
      }
      this.d3ChartGroup.selectAll(`circle.circles-${n3}`).data(this.aData).attr("cy", (t5) => i2(t5.aValues[n3])).attr("cx", (t5) => e2(t5.sLabel) + e2.bandwidth() / 2);
    });
  }
}
function Ka(t3, n2) {
  var e2;
  if (null == t3)
    t3 = 0;
  if (null == n2)
    n2 = 0;
  function i2() {
    var i3, r2 = e2.length, a2, o2 = 0, s2 = 0;
    for (i3 = 0; i3 < r2; ++i3)
      a2 = e2[i3], o2 += a2.x, s2 += a2.y;
    for (o2 = o2 / r2 - t3, s2 = s2 / r2 - n2, i3 = 0; i3 < r2; ++i3)
      a2 = e2[i3], a2.x -= o2, a2.y -= s2;
  }
  i2.initialize = function(t4) {
    e2 = t4;
  };
  i2.x = function(n3) {
    return arguments.length ? (t3 = +n3, i2) : t3;
  };
  i2.y = function(t4) {
    return arguments.length ? (n2 = +t4, i2) : n2;
  };
  return i2;
}
function Ua(t3) {
  return function() {
    return t3;
  };
}
function Ja() {
  return 1e-6 * (Math.random() - 0.5);
}
function Za(t3) {
  var n2 = +this._x.call(null, t3), e2 = +this._y.call(null, t3);
  return Qa(this.cover(n2, e2), n2, e2, t3);
}
function Qa(t3, n2, e2, i2) {
  if (isNaN(n2) || isNaN(e2))
    return t3;
  var r2, a2 = t3._root, o2 = { data: i2 }, s2 = t3._x0, u2 = t3._y0, l2 = t3._x1, h2 = t3._y1, c2, f2, d2, p2, g2, v2, m2, y2;
  if (!a2)
    return t3._root = o2, t3;
  while (a2.length) {
    if (g2 = n2 >= (c2 = (s2 + l2) / 2))
      s2 = c2;
    else
      l2 = c2;
    if (v2 = e2 >= (f2 = (u2 + h2) / 2))
      u2 = f2;
    else
      h2 = f2;
    if (r2 = a2, !(a2 = a2[m2 = v2 << 1 | g2]))
      return r2[m2] = o2, t3;
  }
  d2 = +t3._x.call(null, a2.data);
  p2 = +t3._y.call(null, a2.data);
  if (n2 === d2 && e2 === p2)
    return o2.next = a2, r2 ? r2[m2] = o2 : t3._root = o2, t3;
  do {
    r2 = r2 ? r2[m2] = new Array(4) : t3._root = new Array(4);
    if (g2 = n2 >= (c2 = (s2 + l2) / 2))
      s2 = c2;
    else
      l2 = c2;
    if (v2 = e2 >= (f2 = (u2 + h2) / 2))
      u2 = f2;
    else
      h2 = f2;
  } while ((m2 = v2 << 1 | g2) === (y2 = (p2 >= f2) << 1 | d2 >= c2));
  return r2[y2] = a2, r2[m2] = o2, t3;
}
function to(t3) {
  var n2, e2, i2 = t3.length, r2, a2, o2 = new Array(i2), s2 = new Array(i2), u2 = 1 / 0, l2 = 1 / 0, h2 = -1 / 0, c2 = -1 / 0;
  for (e2 = 0; e2 < i2; ++e2) {
    if (isNaN(r2 = +this._x.call(null, n2 = t3[e2])) || isNaN(a2 = +this._y.call(null, n2)))
      continue;
    o2[e2] = r2;
    s2[e2] = a2;
    if (r2 < u2)
      u2 = r2;
    if (r2 > h2)
      h2 = r2;
    if (a2 < l2)
      l2 = a2;
    if (a2 > c2)
      c2 = a2;
  }
  if (u2 > h2 || l2 > c2)
    return this;
  this.cover(u2, l2).cover(h2, c2);
  for (e2 = 0; e2 < i2; ++e2)
    Qa(this, o2[e2], s2[e2], t3[e2]);
  return this;
}
function no(t3, n2) {
  if (isNaN(t3 = +t3) || isNaN(n2 = +n2))
    return this;
  var e2 = this._x0, i2 = this._y0, r2 = this._x1, a2 = this._y1;
  if (isNaN(e2)) {
    r2 = (e2 = Math.floor(t3)) + 1;
    a2 = (i2 = Math.floor(n2)) + 1;
  } else {
    var o2 = r2 - e2, s2 = this._root, u2, l2;
    while (e2 > t3 || t3 >= r2 || i2 > n2 || n2 >= a2) {
      l2 = (n2 < i2) << 1 | t3 < e2;
      u2 = new Array(4), u2[l2] = s2, s2 = u2, o2 *= 2;
      switch (l2) {
        case 0:
          r2 = e2 + o2, a2 = i2 + o2;
          break;
        case 1:
          e2 = r2 - o2, a2 = i2 + o2;
          break;
        case 2:
          r2 = e2 + o2, i2 = a2 - o2;
          break;
        case 3:
          e2 = r2 - o2, i2 = a2 - o2;
          break;
      }
    }
    if (this._root && this._root.length)
      this._root = s2;
  }
  this._x0 = e2;
  this._y0 = i2;
  this._x1 = r2;
  this._y1 = a2;
  return this;
}
function eo() {
  var t3 = [];
  this.visit(function(n2) {
    if (!n2.length)
      do {
        t3.push(n2.data);
      } while (n2 = n2.next);
  });
  return t3;
}
function io(t3) {
  return arguments.length ? this.cover(+t3[0][0], +t3[0][1]).cover(+t3[1][0], +t3[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function ro(t3, n2, e2, i2, r2) {
  this.node = t3;
  this.x0 = n2;
  this.y0 = e2;
  this.x1 = i2;
  this.y1 = r2;
}
function ao(t3, n2, e2) {
  var i2, r2 = this._x0, a2 = this._y0, o2, s2, u2, l2, h2 = this._x1, c2 = this._y1, f2 = [], d2 = this._root, p2, g2;
  if (d2)
    f2.push(new ro(d2, r2, a2, h2, c2));
  if (null == e2)
    e2 = 1 / 0;
  else {
    r2 = t3 - e2, a2 = n2 - e2;
    h2 = t3 + e2, c2 = n2 + e2;
    e2 *= e2;
  }
  while (p2 = f2.pop()) {
    if (!(d2 = p2.node) || (o2 = p2.x0) > h2 || (s2 = p2.y0) > c2 || (u2 = p2.x1) < r2 || (l2 = p2.y1) < a2)
      continue;
    if (d2.length) {
      var v2 = (o2 + u2) / 2, m2 = (s2 + l2) / 2;
      f2.push(new ro(d2[3], v2, m2, u2, l2), new ro(d2[2], o2, m2, v2, l2), new ro(d2[1], v2, s2, u2, m2), new ro(d2[0], o2, s2, v2, m2));
      if (g2 = (n2 >= m2) << 1 | t3 >= v2) {
        p2 = f2[f2.length - 1];
        f2[f2.length - 1] = f2[f2.length - 1 - g2];
        f2[f2.length - 1 - g2] = p2;
      }
    } else {
      var y2 = t3 - +this._x.call(null, d2.data), _2 = n2 - +this._y.call(null, d2.data), w2 = y2 * y2 + _2 * _2;
      if (w2 < e2) {
        var x2 = Math.sqrt(e2 = w2);
        r2 = t3 - x2, a2 = n2 - x2;
        h2 = t3 + x2, c2 = n2 + x2;
        i2 = d2.data;
      }
    }
  }
  return i2;
}
function oo(t3) {
  if (isNaN(h2 = +this._x.call(null, t3)) || isNaN(c2 = +this._y.call(null, t3)))
    return this;
  var n2, e2 = this._root, i2, r2, a2, o2 = this._x0, s2 = this._y0, u2 = this._x1, l2 = this._y1, h2, c2, f2, d2, p2, g2, v2, m2;
  if (!e2)
    return this;
  if (e2.length)
    while (true) {
      if (p2 = h2 >= (f2 = (o2 + u2) / 2))
        o2 = f2;
      else
        u2 = f2;
      if (g2 = c2 >= (d2 = (s2 + l2) / 2))
        s2 = d2;
      else
        l2 = d2;
      if (!(n2 = e2, e2 = e2[v2 = g2 << 1 | p2]))
        return this;
      if (!e2.length)
        break;
      if (n2[v2 + 1 & 3] || n2[v2 + 2 & 3] || n2[v2 + 3 & 3])
        i2 = n2, m2 = v2;
    }
  while (e2.data !== t3)
    if (!(r2 = e2, e2 = e2.next))
      return this;
  if (a2 = e2.next)
    delete e2.next;
  if (r2)
    return a2 ? r2.next = a2 : delete r2.next, this;
  if (!n2)
    return this._root = a2, this;
  a2 ? n2[v2] = a2 : delete n2[v2];
  if ((e2 = n2[0] || n2[1] || n2[2] || n2[3]) && e2 === (n2[3] || n2[2] || n2[1] || n2[0]) && !e2.length)
    if (i2)
      i2[m2] = e2;
    else
      this._root = e2;
  return this;
}
function so(t3) {
  for (var n2 = 0, e2 = t3.length; n2 < e2; ++n2)
    this.remove(t3[n2]);
  return this;
}
function uo() {
  return this._root;
}
function lo() {
  var t3 = 0;
  this.visit(function(n2) {
    if (!n2.length)
      do {
        ++t3;
      } while (n2 = n2.next);
  });
  return t3;
}
function ho(t3) {
  var n2 = [], e2, i2 = this._root, r2, a2, o2, s2, u2;
  if (i2)
    n2.push(new ro(i2, this._x0, this._y0, this._x1, this._y1));
  while (e2 = n2.pop())
    if (!t3(i2 = e2.node, a2 = e2.x0, o2 = e2.y0, s2 = e2.x1, u2 = e2.y1) && i2.length) {
      var l2 = (a2 + s2) / 2, h2 = (o2 + u2) / 2;
      if (r2 = i2[3])
        n2.push(new ro(r2, l2, h2, s2, u2));
      if (r2 = i2[2])
        n2.push(new ro(r2, a2, h2, l2, u2));
      if (r2 = i2[1])
        n2.push(new ro(r2, l2, o2, s2, h2));
      if (r2 = i2[0])
        n2.push(new ro(r2, a2, o2, l2, h2));
    }
  return this;
}
function co(t3) {
  var n2 = [], e2 = [], i2;
  if (this._root)
    n2.push(new ro(this._root, this._x0, this._y0, this._x1, this._y1));
  while (i2 = n2.pop()) {
    var r2 = i2.node;
    if (r2.length) {
      var a2, o2 = i2.x0, s2 = i2.y0, u2 = i2.x1, l2 = i2.y1, h2 = (o2 + u2) / 2, c2 = (s2 + l2) / 2;
      if (a2 = r2[0])
        n2.push(new ro(a2, o2, s2, h2, c2));
      if (a2 = r2[1])
        n2.push(new ro(a2, h2, s2, u2, c2));
      if (a2 = r2[2])
        n2.push(new ro(a2, o2, c2, h2, l2));
      if (a2 = r2[3])
        n2.push(new ro(a2, h2, c2, u2, l2));
    }
    e2.push(i2);
  }
  while (i2 = e2.pop())
    t3(i2.node, i2.x0, i2.y0, i2.x1, i2.y1);
  return this;
}
function fo(t3) {
  return t3[0];
}
function po(t3) {
  return arguments.length ? (this._x = t3, this) : this._x;
}
function go(t3) {
  return t3[1];
}
function vo(t3) {
  return arguments.length ? (this._y = t3, this) : this._y;
}
function mo(t3, n2, e2) {
  var i2 = new yo(null == n2 ? fo : n2, null == e2 ? go : e2, NaN, NaN, NaN, NaN);
  return null == t3 ? i2 : i2.addAll(t3);
}
function yo(t3, n2, e2, i2, r2, a2) {
  this._x = t3;
  this._y = n2;
  this._x0 = e2;
  this._y0 = i2;
  this._x1 = r2;
  this._y1 = a2;
  this._root = void 0;
}
function _o(t3) {
  var n2 = { data: t3.data }, e2 = n2;
  while (t3 = t3.next)
    e2 = e2.next = { data: t3.data };
  return n2;
}
var wo = mo.prototype = yo.prototype;
wo.copy = function() {
  var t3 = new yo(this._x, this._y, this._x0, this._y0, this._x1, this._y1), n2 = this._root, e2, i2;
  if (!n2)
    return t3;
  if (!n2.length)
    return t3._root = _o(n2), t3;
  e2 = [{ source: n2, target: t3._root = new Array(4) }];
  while (n2 = e2.pop())
    for (var r2 = 0; r2 < 4; ++r2)
      if (i2 = n2.source[r2])
        if (i2.length)
          e2.push({ source: i2, target: n2.target[r2] = new Array(4) });
        else
          n2.target[r2] = _o(i2);
  return t3;
};
wo.add = Za;
wo.addAll = to;
wo.cover = no;
wo.data = eo;
wo.extent = io;
wo.find = ao;
wo.remove = oo;
wo.removeAll = so;
wo.root = uo;
wo.size = lo;
wo.visit = ho;
wo.visitAfter = co;
wo.x = po;
wo.y = vo;
function xo(t3) {
  return t3.x;
}
function bo(t3) {
  return t3.y;
}
var Co = 10, Mo = Math.PI * (3 - Math.sqrt(5));
function No(t3) {
  var n2, e2 = 1, i2 = 1e-3, r2 = 1 - Math.pow(i2, 1 / 300), a2 = 0, o2 = 0.6, s2 = gr(), u2 = dn(h2), l2 = Gt("tick", "end");
  if (null == t3)
    t3 = [];
  function h2() {
    c2();
    l2.call("tick", n2);
    if (e2 < i2) {
      u2.stop();
      l2.call("end", n2);
    }
  }
  function c2(i3) {
    var u3, l3 = t3.length, h3;
    if (void 0 === i3)
      i3 = 1;
    for (var c3 = 0; c3 < i3; ++c3) {
      e2 += (a2 - e2) * r2;
      s2.each(function(t4) {
        t4(e2);
      });
      for (u3 = 0; u3 < l3; ++u3) {
        h3 = t3[u3];
        if (null == h3.fx)
          h3.x += h3.vx *= o2;
        else
          h3.x = h3.fx, h3.vx = 0;
        if (null == h3.fy)
          h3.y += h3.vy *= o2;
        else
          h3.y = h3.fy, h3.vy = 0;
      }
    }
    return n2;
  }
  function f2() {
    for (var n3 = 0, e3 = t3.length, i3; n3 < e3; ++n3) {
      i3 = t3[n3], i3.index = n3;
      if (null != i3.fx)
        i3.x = i3.fx;
      if (null != i3.fy)
        i3.y = i3.fy;
      if (isNaN(i3.x) || isNaN(i3.y)) {
        var r3 = Co * Math.sqrt(n3), a3 = n3 * Mo;
        i3.x = r3 * Math.cos(a3);
        i3.y = r3 * Math.sin(a3);
      }
      if (isNaN(i3.vx) || isNaN(i3.vy))
        i3.vx = i3.vy = 0;
    }
  }
  function d2(n3) {
    if (n3.initialize)
      n3.initialize(t3);
    return n3;
  }
  f2();
  return n2 = { tick: c2, restart: function() {
    return u2.restart(h2), n2;
  }, stop: function() {
    return u2.stop(), n2;
  }, nodes: function(e3) {
    return arguments.length ? (t3 = e3, f2(), s2.each(d2), n2) : t3;
  }, alpha: function(t4) {
    return arguments.length ? (e2 = +t4, n2) : e2;
  }, alphaMin: function(t4) {
    return arguments.length ? (i2 = +t4, n2) : i2;
  }, alphaDecay: function(t4) {
    return arguments.length ? (r2 = +t4, n2) : +r2;
  }, alphaTarget: function(t4) {
    return arguments.length ? (a2 = +t4, n2) : a2;
  }, velocityDecay: function(t4) {
    return arguments.length ? (o2 = 1 - t4, n2) : 1 - o2;
  }, force: function(t4, e3) {
    return arguments.length > 1 ? (null == e3 ? s2.remove(t4) : s2.set(t4, d2(e3)), n2) : s2.get(t4);
  }, find: function(n3, e3, i3) {
    var r3 = 0, a3 = t3.length, o3, s3, u3, l3, h3;
    if (null == i3)
      i3 = 1 / 0;
    else
      i3 *= i3;
    for (r3 = 0; r3 < a3; ++r3) {
      l3 = t3[r3];
      o3 = n3 - l3.x;
      s3 = e3 - l3.y;
      u3 = o3 * o3 + s3 * s3;
      if (u3 < i3)
        h3 = l3, i3 = u3;
    }
    return h3;
  }, on: function(t4, e3) {
    return arguments.length > 1 ? (l2.on(t4, e3), n2) : l2.on(t4);
  } };
}
function Ao() {
  var t3, n2, e2, i2 = Ua(-30), r2, a2 = 1, o2 = 1 / 0, s2 = 0.81;
  function u2(i3) {
    var r3, a3 = t3.length, o3 = mo(t3, xo, bo).visitAfter(h2);
    for (e2 = i3, r3 = 0; r3 < a3; ++r3)
      n2 = t3[r3], o3.visit(c2);
  }
  function l2() {
    if (!t3)
      return;
    var n3, e3 = t3.length, a3;
    r2 = new Array(e3);
    for (n3 = 0; n3 < e3; ++n3)
      a3 = t3[n3], r2[a3.index] = +i2(a3, n3, t3);
  }
  function h2(t4) {
    var n3 = 0, e3, i3, a3 = 0, o3, s3, u3;
    if (t4.length) {
      for (o3 = s3 = u3 = 0; u3 < 4; ++u3)
        if ((e3 = t4[u3]) && (i3 = Math.abs(e3.value)))
          n3 += e3.value, a3 += i3, o3 += i3 * e3.x, s3 += i3 * e3.y;
      t4.x = o3 / a3;
      t4.y = s3 / a3;
    } else {
      e3 = t4;
      e3.x = e3.data.x;
      e3.y = e3.data.y;
      do {
        n3 += r2[e3.data.index];
      } while (e3 = e3.next);
    }
    t4.value = n3;
  }
  function c2(t4, i3, u3, l3) {
    if (!t4.value)
      return true;
    var h3 = t4.x - n2.x, c3 = t4.y - n2.y, f2 = l3 - i3, d2 = h3 * h3 + c3 * c3;
    if (f2 * f2 / s2 < d2) {
      if (d2 < o2) {
        if (0 === h3)
          h3 = Ja(), d2 += h3 * h3;
        if (0 === c3)
          c3 = Ja(), d2 += c3 * c3;
        if (d2 < a2)
          d2 = Math.sqrt(a2 * d2);
        n2.vx += h3 * t4.value * e2 / d2;
        n2.vy += c3 * t4.value * e2 / d2;
      }
      return true;
    } else if (t4.length || d2 >= o2)
      return;
    if (t4.data !== n2 || t4.next) {
      if (0 === h3)
        h3 = Ja(), d2 += h3 * h3;
      if (0 === c3)
        c3 = Ja(), d2 += c3 * c3;
      if (d2 < a2)
        d2 = Math.sqrt(a2 * d2);
    }
    do {
      if (t4.data !== n2) {
        f2 = r2[t4.data.index] * e2 / d2;
        n2.vx += h3 * f2;
        n2.vy += c3 * f2;
      }
    } while (t4 = t4.next);
  }
  u2.initialize = function(n3) {
    t3 = n3;
    l2();
  };
  u2.strength = function(t4) {
    return arguments.length ? (i2 = "function" === typeof t4 ? t4 : Ua(+t4), l2(), u2) : i2;
  };
  u2.distanceMin = function(t4) {
    return arguments.length ? (a2 = t4 * t4, u2) : Math.sqrt(a2);
  };
  u2.distanceMax = function(t4) {
    return arguments.length ? (o2 = t4 * t4, u2) : Math.sqrt(o2);
  };
  u2.theta = function(t4) {
    return arguments.length ? (s2 = t4 * t4, u2) : Math.sqrt(s2);
  };
  return u2;
}
class ko extends va {
  constructor(t3 = {}) {
    super(t3);
    __publicField(this, "aBubbles");
    __publicField(this, "oScaleColor");
    __publicField(this, "d3AxisGroup");
    __publicField(this, "d3BubblesGroup");
    __publicField(this, "oForce");
    __publicField(this, "d3Circles");
    this.oScaleColor = la();
    this.sChartType = "bubble";
  }
  setDimensions() {
    super.setDimensions();
    this.oScaleColor.domain([0, hr(this.aData, (t3) => t3[this.jConfig.aValues[1].sKey])]).range(this.jConfig.aValues[1].aColors);
  }
  renderChart() {
    const { aAxisLabels: n2, aValues: e2 } = this.jConfig;
    const { iInnerWidth: i2, iInnerHeight: r2, jPadding: a2 } = this;
    const { sKey: o2, sName: s2 } = e2[0];
    const { sKey: u2, sName: l2, aColors: h2 } = e2[1];
    this.d3AxisGroup = this.d3AxisGroup || this.d3Svg.append("g").attr("class", "axes-g");
    this.oAxis = new Va({ d3Container: this.d3AxisGroup, aAxisLabels: n2, jPadding: a2, iWidth: i2, iHeight: r2 - 25 }).renderLabels();
    this.d3BubblesGroup = this.d3BubblesGroup || this.d3Svg.append("g").attr("transform", `translate(${this.jPadding.l}, 0)`);
    const c2 = () => {
      this.d3BubblesGroup.selectAll("circle").attr("cx", (t3) => t3.x).attr("cy", (t3) => t3.y);
    };
    this.oForce = No().nodes(JSON.parse(JSON.stringify(this.aData))).force("charge", Ao().strength((t3) => t3[o2] * (t3[o2] / 2) / -150)).force("center", Ka(this.iWidth / 2, this.iHeight / 2)).on("tick", () => {
      c2();
    });
    if (!this.d3Circles) {
      this.d3Circles = this.d3BubblesGroup.selectAll("circle.circles").data(this.oForce.nodes());
      this.d3Circles.enter().append("circle").on("mousemove", (t3) => {
        this.oTooltip.ping(`<strong>${t3.sLabel}</strong><br>${s2}: <em>${t3[o2]}</em><br>${l2}: <em>${t3[u2]}</em>`);
      }).on("mouseout", () => this.oTooltip.hide()).attr("class", "circles").attr("fill", (t3) => this.oScaleColor(t3[u2])).attr("r", 0).transition().ease(t).duration(this.iTransitionTime).attr("r", (t3) => t3[o2] / 2);
    } else
      this.d3BubblesGroup.attr("transform", `translate(${this.iResizeOffset / 2}, 0)`);
    this.oKey = new ma({ d3Container: Wt(this.dSvg), aValues: [{ sName: 0, sColor: h2[0] }, { sName: this.oScaleColor.domain()[1], sColor: h2[1] }], iOffsetX: this.iInnerWidth / 2 + this.jPadding.l + 10, iOffsetY: this.iHeight - 20, sType: "range" }).render();
  }
}
class To {
  static chart(t3, n2, e2) {
    let i2 = {};
    const r2 = { sContainer: t3, ...e2 };
    switch (n2) {
      case "line":
        i2 = this.createLineChart(r2);
        break;
      case "bubble":
        i2 = this.createBubbleChart(r2);
        break;
      default:
        i2 = this.createBarChart(r2);
    }
    return i2;
  }
  static createBarChart(t3) {
    return new Pa(t3).init();
  }
  static createLineChart(t3) {
    return new Fa(t3).init();
  }
  static createBubbleChart(t3) {
    return new ko(t3).init();
  }
  static getUtilities() {
    return da;
  }
  static getDataOps() {
    return ga;
  }
}
export {
  To as default
};
