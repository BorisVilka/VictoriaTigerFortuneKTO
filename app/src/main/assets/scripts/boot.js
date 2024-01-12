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
                    var d = Object.getOwnPropertyDescriptor(b, c);
                    d && Object.defineProperty(a, c, d)
                } else
                    a[c] = b[c];
    a.superClass_ = b.prototype
}
;
var Boot = function() {
    return Phaser.Scene.call(this, "boot") || this
};
$jscomp.inherits(Boot, Phaser.Scene);
Boot.prototype.preload = function() {
    this.load.image("bg_menu", "../img/bg_menu.png");
	this.load.image("splashscreen", "../img/splashscreen.png");
    this.load.spritesheet("game_title2", "../img/blank.png", {
        frameWidth: 100,
        frameHeight: 100
    });
    this.load.image("tilebg", "../img/tilebg.png");
	this.load.image("tilebgwhite", "../img/tilebgwhite.png");
    this.load.image("btn_start", "../img/btn_start.png")
}
;
Boot.prototype.create = function() {
    var a = localStorage.getItem("wild_fruit");
    null !== a && (game_config.cur_cash = a);
    this.scale.stopListeners();
    this.scene.start("load")
}
;
