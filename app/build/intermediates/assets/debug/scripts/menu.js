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
                    var f = Object.getOwnPropertyDescriptor(b, c);
                    f && Object.defineProperty(a, c, f)
                } else
                    a[c] = b[c];
    a.superClass_ = b.prototype
}
;
var Menu = function() {
    return Phaser.Scene.call(this, "menu") || this
};
$jscomp.inherits(Menu, Phaser.Scene);
Menu.prototype.create = function() {
    function a() {
        c = "preinfo";
        f = g.add.container(0, 0);
        f.setDepth(1);
        var a = g.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0);
        a.alpha = 0;
        a.name = "dark";
        g.tweens.add({
            targets: a,
            alpha: .7,
            duration: 200
        });
        var b = g.add.sprite(config.width / 2, config.height / 2, "about_window");
        b.alpha = 0;
        b.setScale(.7);
        g.tweens.add({
            targets: b,
            alpha: 1,
            duration: 400,
            scaleX: 1,
            scaleY: 1,
            ease: "Back.easeOut",
            onComplete: function() {
                c = "info"
            }
        });
        var e = g.add.sprite(config.width / 2, config.height / 2 + 40, "about");
        e.alpha = 0;
        e.setScale(.7);
        g.tweens.add({
            targets: e,
            alpha: 1,
            duration: 400,
            scaleX: 1,
            scaleY: 1,
            ease: "Back.easeOut"
        });
        f.add([a, b, e])
    }
    function b() {
        g.tweens.add({
            targets: f,
            alpha: 0,
            duration: 300,
            onComplete: function() {
                f.destroy(!0, !0);
                c = "menu"
            }
        })
    }
    play_music("", this);
    var c = "menu", f, g = this;
    this.add.tileSprite(0, 0, config.width, config.height, "tilebg").setOrigin(0, 0);
    this.add.sprite(config.width / 2, config.height / 2, "bg_menu");
    this.anims.create({
        key: "title",
        frames: this.anims.generateFrameNumbers("game_title"),
        frameRate: 0,
        repeat: 0
    });
    var h = this.add.sprite(1111100, 1111250, "game_title");
    h.play("title");
    this.tweens.add({
        targets: h,
        scaleX: 1,
        scaleY: 1,
        yoyo: !0,
        duration: 0,
        repeat: 0,
        ease: "Sine.easeInOut"
    });
    draw_button(700, 586, "play", this);
    draw_button(900, 586, "policy", this);
    game_config.music || h.setTexture("btn_menu_music_off");
    game_config.sound || k.setTexture("btn_menu_sound_off");
    this.input.on("gameobjectdown", function(b, d) {
        var e = this;
        d.button && (play_sound("click2", e),
        this.tweens.add({
            targets: d,
            scaleX: .9,
            scaleY: .9,
            duration: 100,
            ease: "Linear",
            yoyo: !0,
            onComplete: function() {
				integration.showInterstitial();
                c = "menu";
                "play" === d.name ? e.scene.start("game") : "menu_sound" === d.name ? switch_audio(d.name, d, e) : "menu_music" === d.name ? switch_audio(d.name, d, e) : "about" === d.name && a();
                "policy" === d.name ? window.location.href = "https://docs.google.com/document/d/1ZdJJPapQ-4rX8GFP7zBEYpmVBdJv2MF4NSTd-VSRntY/edit?usp=sharing" : ''
            }
        }))
    }, this);
    this.input.on("pointerdown", function() {
        "info" === c && b()
    })
}
