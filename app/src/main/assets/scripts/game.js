var myAudio = document.createElement("audio");
myAudio.src = "../audio/music.mp3";
myAudio.play();
myAudio.loop=true;
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    myAudio.play();
  } else {
    myAudio.pause();
  }
});
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
    var b = function() {};
    b.prototype = a;
    return new b
}
;
$jscomp.underscoreProtoCanBeSet = function() {
    var a = {
        a: !0
    }
      , b = {};
    try {
        return b.__proto__ = a,
        b.a
    } catch (c) {}
    return !1
}
;
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b)
        throw new TypeError(a + " is not extensible");
    return a
}
: null;
$jscomp.inherits = function(a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var c = $jscomp.setPrototypeOf;
        c(a, b)
    } else
        for (c in b)
            if ("prototype" != c)
                if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(b, c);
                    e && Object.defineProperty(a, c, e)
                } else
                    a[c] = b[c];
    a.superClass_ = b.prototype
}
;
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var e = a.length, l = 0; l < e; l++) {
        var A = a[l];
        if (b.call(c, A, l, a))
            return {
                i: l,
                v: A
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, e) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (e = 0; e < a.length - 1; e++) {
            var l = a[e];
            l in c || (c[l] = {});
            c = c[l]
        }
        a = a[a.length - 1];
        e = c[a];
        b = b(e);
        b != e && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
;
$jscomp.polyfill("Array.prototype.findIndex", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).i
    }
}, "es6", "es3");
var game_music, Game = function() {
    return Phaser.Scene.call(this, "game") || this
};
$jscomp.inherits(Game, Phaser.Scene);
Game.prototype.create = function() {
    function a() {
        p = game_config.cur_bet * game_config.cur_payline;
        p = Math.round(10 * p) / 10;
        R.setText(String(p))
    }
    function b() {
        B || "play" !== q || (
        p <= game_config.cur_cash ? (play_sound("Slot Machine Spin Button", d),
        game_config.cur_cash -= p,
        E(0),
        v && v.destroy(!0, !0),
        w && w.destroy(),
        t && clearInterval(t),
        B = !0,
        q = "spin",
        play_sound("Slot Arm Start", d),
        c()) : 1 >= game_config.cur_cash ? N("refill") : N("nocash"))
    }
    function c() {
        T();
        var u = 0
          , a = setInterval(function() {
            e(O[u]);
            u++;
            5 <= u && clearInterval(a)
        }, 300)
    }
    function e(a) {
        d.tweens.add({
            targets: a,
            y: 1474,
            duration: 800,
            ease: "Back.easeIn",
            onComplete: function() {
                l(a);
                0 === a.id && play_sound("Slot Machine Spin Loop", d)
            }
        })
    }
    function l(a) {
        a.y = 134;
        a.setTexture("symbols_blur");
        d.tweens.add({
            targets: a,
            y: 1474,
            duration: 500,
            ease: "Linear",
            loop: 2,
            onComplete: function() {
                A(a)
            }
        })
    }
    function A(a) {
        a.y = P("start", a.id);
        a.setTexture("symbols");
        d.tweens.add({
            targets: a,
            y: P("end", a.id),
            duration: 800,
            ease: "Back.easeOut",
            onComplete: function() {
                4 === a.id && (F(),
                B = !1)
            }
        });
        setTimeout(function() {
            play_sound("Slot Machine Stop " + Number(a.id + 1), d)
        }, 400)
    }
    function P(a, f) {
        return "start" === a ? -(134 * y[f] + 858) : 858 - 134 * y[f]
    }
    function T() {
        for (var a = 0; 5 > a; a++)
            y[a] = Math.floor(10 * Math.random());
        a = F(!0) * game_config.cur_bet;
        if (a > p) {
            var f = Math.round(100 * Math.random())
              , d = !1;
            f >= game_config.winning_rate && (d = !0);
            !d && a >= 3 * p && (f = Math.round(100 * Math.random()),
            f >= game_config.bigwin_rate && (d = !0));
            if (d)
                for (a = 0; 10 > a; a++) {
                    for (f = 0; 5 > f; f++)
                        y[f] = Math.floor(10 * Math.random());
                    if (F(!0) * game_config.cur_payline <= p)
                        break
                }
        }
    }
    function F(a) {
        for (var f = [], b = [], u = [], r = 0; 3 > r; r++) {
            for (var m = [], k = 0; 5 > k; k++) {
                var c = y[k] + r;
                10 <= c && (c -= 10);
                m.push(c)
            }
            f.push(m)
        }
        r = [];
        for (m = 0; m < game_config.cur_payline; m++) {
            k = [];
            c = !1;
            for (var n = -1, e = 0; 5 > e; e++) {
                var g = game_config.paylines[m][e][0]
                  , h = game_config.paylines[m][e][1]
                  , l = f[g][h];
                if (0 === k.length)
                    k.push([l, {
                        x: h,
                        y: g,
                        at: m
                    }]),
                    0 === l && (c = !0);
                else if (l === k[e - 1][0])
                    k.push([l, {
                        x: h,
                        y: g,
                        at: m
                    }]);
                else if (c && -1 === n)
                    k.push([l, {
                        x: h,
                        y: g,
                        at: m
                    }]),
                    n = l,
                    c = !1;
                else if (-1 != n)
                    if (l === n)
                        k.push([l, {
                            x: h,
                            y: g,
                            at: m
                        }]);
                    else if (0 === l)
                        k.push([k[e - 1][0], {
                            x: h,
                            y: g,
                            at: m
                        }]);
                    else
                        break;
                else if (0 === l)
                    k.push([k[e - 1][0], {
                        x: h,
                        y: g,
                        at: m
                    }]);
                else
                    break
            }
            r.push(k)
        }
        for (m = f = 0; m < r.length; m++)
            if (n = r[m][0],
            k = r[m],
            2 <= k.length)
                if (0 != n[0]) {
                    if (f += game_config.payvalues[n[0]][k.length - 2],
                    0 < game_config.payvalues[n[0]][k.length - 2])
                        for (b.push(n[1].at),
                        c = 0; c < k.length; c++)
                            u.push(r[m][c][1])
                } else {
                    c = e = 0;
                    g = r[m];
                    for (h = 0; h < g.length; h++)
                        if (0 === g[h][0])
                            e++;
                        else {
                            c = g[h][0];
                            break
                        }
                    if (2 <= e) {
                        b.push(n[1].at);
                        for (g = 0; g < k.length; g++)
                            u.push(r[m][g][1]);
                        f += game_config.payvalues[n[0]][e - 2]
                    }
                    if (0 < game_config.payvalues[c][k.length - 2])
                        for (b.push(n[1].at),
                        n = 0; n < k.length; n++)
                            u.push(r[m][n][1]);
                    f += game_config.payvalues[c][k.length - 2]
                }
        u = U(u);
        if (a)
            return f;
        q = "play";
        V(u);
        0 === f && play_sound("Slot Machine Bonus Lose", d);
        E(f * game_config.cur_bet);
        W(b);
        f * game_config.cur_bet > p ;
        70 < f * game_config.cur_bet && (f * game_config.cur_bet >= 4 * p ? Q("big_win") : f * game_config.cur_bet >= 3 * p && Q("you_win"))
    }
    function E(a) {
        1 < a && play_sound("Get Coins", d);
        a ? game_config.cur_cash += a : a = 0;
        a = Math.round(10 * a) / 10;
        X.setText(String(a));
        game_config.cur_cash = Math.round(10 * game_config.cur_cash) / 10;
        Y.setText(String(game_config.cur_cash));
        localStorage.setItem("wild_fruit", game_config.cur_cash)
    }
    function U(a) {
        return a = a.filter(function(a, d, b) {
            return d === b.findIndex(function(d) {
                return d.x === a.x && d.y === a.y
            })
        })
    }
    function V(a) {
        function f(a, d) {
            G.x = H + 170 * a - 47;
            G.y = 255 + 134 * d - 47;
        }
        for (var b = 0; b < a.length; b++)
            f(a[b].x, a[b].y)
    }
    function W(a) {
        if (0 < a.length)
            var f = setTimeout(function() {
                clearTimeout(f);
                var b = a.length
                  , c = 0;
                t = setInterval(function() {
                    B ? v && (v.destroy(!0, !0),
                    clearInterval(t)) : (I(!0, a[c]),
                    c++,
                    c >= b && (c = 0))
                }, 1E3)
            }, 1E3)
    }
    function Z() {
        d.tweens.add({
            targets: h,
            alpha: 0,
            duration: 300,
            onComplete: function() {
                h.destroy(!0, !0);
                q = "play"
            }
        })
    }
    function I(a, f) {
        function b(a) {
            for (var b = 0; 5 > b; b++) {
                var f = game_config.paylines[a]
                  , c = H + 170 * f[b][1]
                  , g = 255 + 134 * f[b][0]
                  , e = void 0;
                if (4 > b) {
                    f[b][0] === f[b + 1][0] ? e = "line1" : f[b][0] > f[b + 1][0] ? e = "line2" : f[b][0] < f[b + 1][0] && (e = "line3");
                    var h = d.add.sprite(c, g, e);
                    "line1" === e ? h.setOrigin(0, .5) : "line2" === e ? h.setOrigin(0, 1) : "line3" === e && h.setOrigin(0);
                    h.setTint(f[5]);
                    h.setBlendMode(Phaser.BlendModes.ADD);
                    v.add(h)
                }
                c = d.add.sprite(c, g, "circle");
                c.setTint(f[5]);
                c.setBlendMode(Phaser.BlendModes.ADD);
                v.add(c)
            }
        }
        v.destroy(!0, !0);
        v = d.add.group();
        if (a)
            b(f);
        else
            for (a = 0; a < game_config.cur_payline; a++)
                b(a)
    }
    function Q(a) {
        play_sound("Slot Machine Mega Win", d);
        q = "win";
        var b = d.add.group()
          , c = d.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0);
        c.alpha = 0;
        c.name = "dark";
        d.tweens.add({
            targets: c,
            alpha: .7,
            duration: 200
        });
        var e = d.add.sprite(config.width / 2, config.height / 2, "light1");
        d.tweens.add({
            targets: e,
            rotation: 6.28319,
            duration: 1E4,
            loop: -1
        });
        e.setBlendMode(Phaser.BlendModes.ADD);
        if ("big_win" === a) {
            var g = d.add.particles("coins");
            var h = g.createEmitter({
                x: config.width / 2,
                y: config.height + 100,
                lifespan: 3E3,
                frame: 0,
                angle: {
                    min: 235,
                    max: 300
                },
                rotate: {
                    min: 0,
                    max: 360
                },
                speed: {
                    min: 800,
                    max: 1300
                },
                gravityY: 660,
                quantity: 1,
                frequency: 99
            });
            var k = g.createEmitter({
                x: config.width / 2,
                y: config.height + 100,
                lifespan: 3E3,
                frame: 1,
                angle: {
                    min: 235,
                    max: 300
                },
                rotate: {
                    min: 0,
                    max: 360
                },
                speed: {
                    min: 800,
                    max: 1300
                },
                gravityY: 660,
                quantity: 1,
                frequency: 99
            });
            var l = g.createEmitter({
                x: config.width / 2,
                y: config.height + 100,
                lifespan: 3E3,
                frame: 2,
                angle: {
                    min: 235,
                    max: 300
                },
                rotate: {
                    min: 0,
                    max: 360
                },
                speed: {
                    min: 800,
                    max: 1300
                },
                gravityY: 660,
                quantity: 1,
                frequency: 99
            })
        }
        var n = d.add.sprite(config.width / 2, config.height / 2, a);
        n.setScale(0);
        d.tweens.add({
            targets: n,
            scaleX: 1,
            duration: 600,
            ease: "Back.easeOut",
            onComplete: function() {
                d.tweens.add({
                    targets: n,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 600,
                    ease: "Sine.easeInOut",
                    yoyo: !0,
                    onComplete: function() {
						integration.showInterstitial(),
                        "big_win" === a && (h.stop(),
                        k.stop(),
                        l.stop());
                        d.tweens.add({
                            targets: c,
                            alpha: 0,
                            duration: 300,
                            ease: "Linear"
                        });
                        d.tweens.add({
                            targets: n,
                            scaleY: 0,
                            scaleX: 0,
                            duration: 400,
                            ease: "Back.easeIn"
                        });
                        d.tweens.add({
                            targets: e,
                            scaleY: 0,
                            scaleX: 0,
                            duration: 500,
                            ease: "Back.easeIn",
                            onComplete: function() {
                                q = "play";
                                b.destroy(!0, !0);
                                "big_win" === a && setTimeout(function() {
                                    g.destroy()
                                }, 3E3)
                            }
                        })
                    }
                })
            }
        });
        d.tweens.add({
            targets: n,
            scaleY: 1,
            duration: 500,
            ease: "Back.easeOut"
        });
        b.addMultiple([c, e, n])
    }
    function N(a) {
        play_sound("Bonus Lose", d);
        q = a;
        var b = config.width / 2
          , c = config.height / 2;
        h = d.add.container(b, c);
        h.setDepth(1);
        var e = d.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0);
        e.alpha = 0;
        e.name = "dark";
        d.tweens.add({
            targets: e,
            alpha: .7,
            duration: 200
        });
        var g = "YOU DON'T HAVE\nENOUGH MONEY!";
        "refill" === a && (g = 'YOU DON\'T HAVE\nENOUGH MONEY!\nPress "OK" to get\n' + game_config.refill + " coins!");
        var m = d.add.sprite(config.width / 2 - b, config.height / 2 - c, "win_prompt");
        g = d.add.text(config.width / 2 - b, config.height / 2 - c, g, {
            fontFamily: "bebas",
            fontSize: 45,
            align: "center",
            color: "#73490d"
        }).setOrigin(.5);
        var k = draw_button(config.width / 2 - 70 - b, config.height / 2 - c + 160, "yes", d);
        b = draw_button(config.width / 2 + 70 - b, config.height / 2 - c + 160, "no", d);
        "refill" != a && (k.setVisible(!1),
        b.setVisible(!1));
        h.add([m, g, k, b]);
        h.alpha = 0;
        h.setScale(.7);
        d.tweens.add({
            targets: h,
            alpha: 1,
            duration: 400,
            scaleX: 1,
            scaleY: 1,
            ease: "Back.easeOut",
            onComplete: function() {
                h.add(e);
                e.setPosition(0, 0);
                h.sendToBack(e);
                "nocash" === a && (q = "nocash2")
            }
        })
    }
    function J() {
        d.tweens.add({
            targets: h,
            alpha: 0,
            duration: 300,
            onComplete: function() {
                h.destroy(!0, !0);
                q = "play"
            }
        })
    }
    var p = game_config.cur_bet * game_config.cur_payline;
    p = Math.round(10 * p) / 10;
    var d = this, O = [], y = [], g = config.width / 2 - game_config.main.width / 2, H = 301 + g, B = !1, h, v = this.add.group(), q = "play", t;
    this.add.tileSprite(0, 0, config.width, config.height, "tilebg").setOrigin(0, 0);
    this.add.sprite(config.width / 2, config.height / 2, "bg");
    var z = this.add.sprite(640 + g, 330, "machine");
    this.add.tileSprite(0, config.height, config.width, 102, "footer").setOrigin(0, 1);
    this.add.sprite(225 + g, 665, "res_bar");
	this.add.sprite(638 + g, 100, "game_titlegame");
    draw_button(941 + g, 666, "spin", this);
	draw_button(1150 + g, 665, "max", this);
	this.add.sprite(1097 + g, 665, "sep");
	this.add.sprite(642 + g, 665, "lines_bar");
    draw_button(1050 + g, 665, "plus_bet", this);
    draw_button(832 + g, 665, "minus_bet", this);
    draw_button(917 + g, 85, "sound", this);
    var x = draw_button(1025 + g, 85, "music", this);
    draw_button(253 + g, 85, "back", this);
    game_config.music || x.setTexture("btn_music_off");
    game_config.sound || x.setTexture("btn_sound_off");
    var Y = this.add.text(320 + g, 686, String(game_config.cur_cash), {
        fontFamily: "bebas",
        fontSize: 30,
        align: "right",
        color: "#FFFFFF"
    }).setOrigin(1, .5)
      , K = this.add.text(1080 + g, 680, String(game_config.cur_payline), {
        fontFamily: "bebas",
        fontSize: 0.1,
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5)
      , L = this.add.text(978 + g, 680, String(game_config.cur_bet), {
        fontFamily: "bebas",
        fontSize: 0.1,
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5)
	      , X = this.add.text(641 + g, 682, "0", {
        fontFamily: "bebas",
        fontSize: 42,
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5, .5)
      , R = this.add.text(320 + g, 644, String(p), {
        fontFamily: "bebas",
        fontSize: 30,
        align: "right",
        color: "#FFFFFF"
    }).setOrigin(1, .5);
    z = this.add.sprite(z.x, 391, "mask").setVisible(!1);
    z = new Phaser.Display.Masks.BitmapMask(this,z);
    for (x = 0; 5 > x; x++) {
        var M = this.add.tileSprite(H + 170 * x, 858 + 134 * Math.round(7 * Math.random()), 134, 4020, "symbols");
        M.id = x;
        M.setMask(z);
        O.push(M);
        y.push(Math.floor(10 * Math.random()))
    }
    var w, G = new Phaser.Geom.Rectangle(0,0,94,94);
    this.input.on("gameobjectdown", function(c, f) {
        f.button && ("full" === f.name && (this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()),
        this.tweens.add({
            targets: f,
            scaleX: .9,
            scaleY: .9,
            duration: 100,
            ease: "Linear",
            yoyo: !0,
            onComplete: function() {
                if ("play" === q)
                    if ("spin" === f.name)
                        b();
                    else if ("max" === f.name)
                        game_config.cur_payline = game_config.paylines.length,
                        game_config.cur_bet = game_config.bet_size[game_config.bet_size.length - 1],
                        L.setText(String(game_config.cur_bet)),
                        K.setText(String(game_config.cur_payline)),
                        a(),
                        b();
                    else if ("payout" === f.name) {
                        play_sound("click2", d);
                        q = "table";
                        h = d.add.container(0, 0);
                        h.setDepth(1);
                        var c = d.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0);
                        c.alpha = 0;
                        c.name = "dark";
                        d.tweens.add({
                            targets: c,
                            alpha: .7,
                            duration: 200
                        });
                        var e = d.add.sprite(config.width / 2, config.height / 2, "paytable");
                        e.alpha = 0;
                        e.setScale(.7);
                        d.tweens.add({
                            targets: e,
                            alpha: 1,
                            duration: 400,
                            scaleX: 1,
                            scaleY: 1,
                            ease: "Back.easeOut"
                        });
                        h.add([c, e]);
                        c = 290 + g;
                        e = 264;
                        for (var l = 0, m = 0; m < game_config.payvalues.length; m++) {
                            for (var k = "", p = 3; 0 <= p; p--)
                                k = 0 === game_config.payvalues[m][p] ? k + "-\n" : k + (String(game_config.payvalues[m][p]) + "\n");
                            k = d.add.text(c + 170 * l, e, k, {
                                fontFamily: "bebas",
                                lineSpacing: -8,
                                fontSize: 28,
                                align: "left",
                                color: "#FFFFFF"
                            }).setOrigin(0);
                            h.add(k);
                            l++;
                            5 <= l && (l = 0,
                            e += 220)
                        }
                    } else
                        "plus_lines" === f.name ? (play_sound("Button", d),
                        game_config.cur_payline++,
                        game_config.cur_payline > game_config.max_payline && (game_config.cur_payline = 1),
                        K.setText(String(game_config.cur_payline)),
                        t && (clearInterval(t),
                        w.destroy()),
                        I(),
                        a()) : "minus_lines" === f.name ? (play_sound("Button", d),
                        game_config.cur_payline--,
                        1 > game_config.cur_payline && (game_config.cur_payline = game_config.max_payline),
                        K.setText(String(game_config.cur_payline)),
                        t && (clearInterval(t),
                        w.destroy()),
                        I(),
                        a()) : "plus_bet" === f.name ? (play_sound("Button", d),
                        game_config.bet_at++,
                        game_config.bet_at >= game_config.bet_size.length && (game_config.bet_at = 0),
                        game_config.cur_bet = game_config.bet_size[game_config.bet_at],
                        L.setText(String(game_config.cur_bet)),
                        a()) : "minus_bet" === f.name ? (play_sound("Button", d),
                        game_config.bet_at--,
                        0 > game_config.bet_at && (game_config.bet_at = game_config.bet_size.length - 1),
                        game_config.cur_bet = game_config.bet_size[game_config.bet_at],
                        L.setText(String(game_config.cur_bet)),
                        a()) : "back" === f.name && (play_sound("click2", d),
                        t && clearInterval(t),
                        d.scene.start("menu"));
                else
                    "yes" === f.name ? (play_sound("Slot coins", d),
                    J(),
                    game_config.cur_cash = game_config.refill,
                    E()) : "no" === f.name && (play_sound("click2", d),
                    J());
                "sound" === f.name ? (switch_audio(f.name, f, d),
                play_sound("click2", d)) : "music" === f.name && (play_sound("click2", d),
                switch_audio(f.name, f, d))
            }
        }))
    }, this);
    this.input.on("pointerdown", function(a) {
        "table" === q ? (q = "wait",
        Z()) : "nocash2" === q && J()
    }, this);
    this.input.keyboard.on("keydown", function(a) {}, this)
}
;
function play_sound(a, b) {
    game_config.sound && b.sound.play(a)
}
function play_music(a, b) {
    var c = !0;
    game_config.music && game_music && game_music.isPlaying && (c = !1);
    c && game_config.music && (game_music = b.sound.add(a, {
        loop: !0
    }),
    myAudio.play())
}
function stop_music() {
    "undefined" !== typeof game_music && myAudio.pause()
}
function switch_audio(a, b, c) {
    "music" === a || "menu_music" === a ? game_config.music ? (game_config.music = !1,
    b.setTexture("btn_" + a + "_off"),
    myAudio.pause()) : (game_config.music = !0,
    b.setTexture("btn_" + a),
    myAudio.play(c)) : game_config.sound ? (game_config.sound = !1,
    b.setTexture("btn_" + a + "_off")) : (game_config.sound = !0,
    b.setTexture("btn_" + a))
}
function draw_button(a, b, c, e) {
    a = e.add.sprite(a, b, "btn_" + c).setInteractive();
    a.button = !0;
    a.name = c;
    return a
}
function container_add(a, b) {
    for (var c = b.length, e = 0; e < c; e++)
        b[e].x -= game_config.main.width / 2,
        b[e].y -= game_config.main.height / 2,
        a.add(b[e])
}
var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 720,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        parent: "game_content",
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Boot, Load, Menu, Game]
}
  , game = new Phaser.Game(config);
