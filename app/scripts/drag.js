/**
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * Implementing Drag and Drop functionality in AngularJS is easier than ever.
 * Demo: http://codef0rmer.github.com/angular-dragdrop/
 * 
 * @version 1.0.5
 *
 * (c) 2013 Amit Gharat a.k.a codef0rmer <amit.2006.it@gmail.com> - amitgharat.wordpress.com
 */
(function(e, t, n) {
    "use strict";
    var r = t.module("ngDragDrop", []).service("ngDragDropService", ["$timeout", "$parse", function(i, s) {
        this.callEventCallback = function(e, t, n, r) {
            function f(t) {
                var n = t.indexOf("(") !== -1 ? t.indexOf("(") : t.length,
                    r = t.lastIndexOf(")") !== -1 ? t.lastIndexOf(")") : t.length,
                    i = t.substring(n + 1, r),
                    o = t.match(/^[^.]+.\s*/)[0].slice(0, -1);
                o = e[o] && typeof e[o].constructor === "function" ? o : null;
                return {
                    callback: t.substring(o && o.length + 1 || 0, n),
                    args: (i && i.split(",") || []).map(function(t) {
                        return s(t)(e)
                    }),
                    constructor: o
                }
            }
            if (!t) return;
            var i = f(t),
                o = i.callback,
                u = i.constructor,
                a = [n, r].concat(i.args);
            e.$apply((e[o] || e[u][o]).apply(e, a))
        };
        this.invokeDrop = function(e, s, o, u) {
            var a = "",
                f = "",
                l = {},
                c = {},
                h = null,
                p = {},
                d = {},
                v, m, g = null,
                y = s.scope(),
                b = e.scope();
            a = e.ngattr("ng-model");
            f = s.ngattr("ng-model");
            v = b.$eval(a);
            m = y.$eval(f);
            g = s.find("[jqyoui-draggable]:last");
            c = y.$eval(s.attr("jqyoui-droppable")) || [];
            l = b.$eval(e.attr("jqyoui-draggable")) || [];
            l.index = this.fixIndex(b, l, v);
            c.index = this.fixIndex(y, c, m);
            h = t.isArray(v) ? l.index : null;
            p = t.isArray(v) ? v[h] : v;
            if (t.isArray(m) && c && c.index !== n) {
                d = m[c.index]
            } else if (!t.isArray(m)) {
                d = m
            } else {
                d = {}
            }
            if (l.animate === true) {
                this.move(e, g.length > 0 ? g : s, null, "fast", c, null);
                this.move(g.length > 0 && !c.multiple ? g : [], e.parent("[jqyoui-droppable]"), r.startXY, "fast", c, function() {
                    i(function() {
                        e.css({
                            position: "relative",
                            left: "",
                            top: ""
                        });
                        g.css({
                            position: "relative",
                            left: "",
                            top: "",
                            display: ""
                        });
                        this.mutateDraggable(b, c, l, a, f, d, e);
                        this.mutateDroppable(y, c, l, f, p, h);
                        this.callEventCallback(y, c.onDrop, o, u)
                    }.bind(this))
                }.bind(this))
            } else {
                i(function() {
                    this.mutateDraggable(b, c, l, a, f, d, e);
                    this.mutateDroppable(y, c, l, f, p, h);
                    this.callEventCallback(y, c.onDrop, o, u)
                }.bind(this))
            }
        };
        this.move = function(t, r, i, s, o, u) {
            if (t.length === 0) {
                if (u) {
                    e.setTimeout(function() {
                        u()
                    }, 300)
                }
                return false
            }
            var a = 9999,
                f = t.offset(),
                l = r && r.is(":visible"),
                c = r.hasClass("ng-hide");
            if (i === null && r.length > 0) {
                if (r.attr("jqyoui-draggable") !== n && r.ngattr("ng-model") !== n && r.is(":visible") && o && o.multiple) {
                    i = r.offset();
                    if (o.stack === false) {
                        i.left += r.outerWidth(true)
                    } else {
                        i.top += r.outerHeight(true)
                    }
                } else {
                    if (c) r.removeClass("ng-hide");
                    i = r.css({
                        visibility: "hidden",
                        display: "block"
                    }).offset();
                    r.css({
                        visibility: "",
                        display: l ? "block" : "none"
                    })
                }
            }
            t.css({
                position: "absolute",
                "z-index": a
            }).css(f).animate(i, s, function() {
                if (c) r.addClass("ng-hide");
                if (u) u()
            })
        };
        this.mutateDroppable = function(e, n, r, i, o, u) {
            var a = e.$eval(i);
            e.dndDragItem = o;
            if (t.isArray(a)) {
                if (n && n.index >= 0) {
                    a[n.index] = o
                } else {
                    a.push(o)
                }
                if (r && r.placeholder === true) {
                    a[a.length - 1]["jqyoui_pos"] = u
                }
            } else {
                s(i + " = dndDragItem")(e);
                if (r && r.placeholder === true) {
                    a["jqyoui_pos"] = u
                }
            }
        };
        this.mutateDraggable = function(e, r, i, o, u, a, f) {
            var l = t.equals(t.copy(a), {}),
                c = e.$eval(o);
            e.dndDropItem = a;
            if (i && i.placeholder) {
                if (i.placeholder != "keep") {
                    if (t.isArray(c) && i.index !== n) {
                        c[i.index] = a
                    } else {
                        s(o + " = dndDropItem")(e)
                    }
                }
            } else {
                if (t.isArray(c)) {
                    if (l) {
                        if (i && i.placeholder !== true && i.placeholder !== "keep") {
                            c.splice(i.index, 1)
                        }
                    } else {
                        c[i.index] = a
                    }
                } else {
                    s(o + " = dndDropItem")(e);
                    if (e.$parent) {
                        s(o + " = dndDropItem")(e.$parent)
                    }
                }
            }
            f.css({
                "z-index": "",
                left: "",
                top: ""
            })
        };
        this.fixIndex = function(e, r, i) {
            if (r.applyFilter && t.isArray(i) && i.length > 0) {
                var s = e[r.applyFilter](),
                    o = s[r.index],
                    u = n;
                i.forEach(function(e, n) {
                    if (t.equals(e, o)) {
                        u = n
                    }
                });
                return u
            }
            return r.index
        }
    }]).directive("jqyouiDraggable", ["ngDragDropService", function(e) {
        return {
            require: "?jqyouiDroppable",
            restrict: "A",
            link: function(n, i, s) {
                var o, u;
                var a = function(a, f) {
                    if (a) {
                        o = n.$eval(i.attr("jqyoui-draggable")) || [];
                        i.draggable({
                            disabled: false
                        }).draggable(n.$eval(s.jqyouiOptions) || {}).draggable({
                            start: function(i, s) {
                                u = t.element(this).css("z-index");
                                t.element(this).css("z-index", 99999);
                                r.startXY = t.element(this).offset();
                                e.callEventCallback(n, o.onStart, i, s)
                            },
                            stop: function(r, i) {
                                t.element(this).css("z-index", u);
                                e.callEventCallback(n, o.onStop, r, i)
                            },
                            drag: function(t, r) {
                                e.callEventCallback(n, o.onDrag, t, r)
                            }
                        })
                    } else {
                        i.draggable({
                            disabled: true
                        })
                    }
                };
                n.$watch(function() {
                    return n.$eval(s.drag)
                }, a);
                a()
            }
        }
    }]).directive("jqyouiDroppable", ["ngDragDropService", function(e) {
        return {
            restrict: "A",
            priority: 1,
            link: function(n, r, i) {
                var s = function(s, o) {
                    if (s) {
                        r.droppable({
                            disabled: false
                        }).droppable(n.$eval(i.jqyouiOptions) || {}).droppable({
                            over: function(r, i) {
                                var s = n.$eval(t.element(this).attr("jqyoui-droppable")) || [];
                                e.callEventCallback(n, s.onOver, r, i)
                            },
                            out: function(r, i) {
                                var s = n.$eval(t.element(this).attr("jqyoui-droppable")) || [];
                                e.callEventCallback(n, s.onOut, r, i)
                            },
                            drop: function(r, s) {
                                if (t.element(s.draggable).ngattr("ng-model") && i.ngModel) {
                                    e.invokeDrop(t.element(s.draggable), t.element(this), r, s)
                                } else {
                                    e.callEventCallback(n, (n.$eval(t.element(this).attr("jqyoui-droppable")) || []).onDrop, r, s)
                                }
                            }
                        })
                    } else {
                        r.droppable({
                            disabled: true
                        })
                    }
                };
                n.$watch(function() {
                    return n.$eval(i.drop)
                }, s);
                s()
            }
        }
    }]);
    $.fn.ngattr = function(e, n) {
        var r = t.element(this).get(0);
        return r.getAttribute(e) || r.getAttribute("data-" + e)
    }
})(window, window.angular)