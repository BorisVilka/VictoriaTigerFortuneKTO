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
var Load = function() {
    return Phaser.Scene.call(this, "load") || this
};
$jscomp.inherits(Load, Phaser.Scene);
Load.prototype.preload = function() {
    var a = this;
    this.add.tileSprite(0, 0, config.width, config.height, "tilebgwhite").setOrigin(0, 0);
    this.add.sprite(config.width / 2, config.height / 2, "splashscreen");
    this.anims.create({
        key: "title",
        frames: this.anims.generateFrameNumbers("game_title2"),
        frameRate: 0,
        repeat: -1
    });
    var b = this.add.rectangle(config.width / 2, 500, 600, 20);
    b.setStrokeStyle(4, 16777215);
    b.alpha = .7;
    var c = this.add.rectangle(config.width / 2, 500, 590, 10, 16777215);
    c.alpha = .8;
    this.load.on("progress", function(a) {
        c.width = 590 * a
    });
    this.load.on("complete", function() {
        b.destroy();
        c.destroy();
		a.scene.start("menu");
        var d = draw_button(config.width / 2, 510, "start", a);
        a.tweens.add({
            targets: d,
            scaleX: .9,
            scaleY: .9,
            yoyo: !0,
            duration: 800,
            repeat: -1,
            ease: "Sine.easeInOut"
        })
    }, this);
    this.input.on("gameobjectdown", function() {
        a.scene.start("menu")
    }, this);
    // this.load.image("symbols", "../img/symbols.png");
    // this.load.image("symbols_blur", "../img/symbols_blur.png");
    this.load.image("symbols", "../img/symbols_new.png");
    this.load.image("symbols_blur", "../img/symbols_blur_new.png");
    this.load.image("machine", "../img/machine.png");
    this.load.image("bg", "../img/bg.png");
    this.load.image("game_title", "../img/game_title.png");
	this.load.image("game_titlegame", "../img/game_titlegame.png");
    this.load.image("btn_play", "../img/btn_play.png");
    this.load.image("btn_policy", "../img/btn_policy.png");
    this.load.image("btn_about", "../img/btn_about.png");
    this.load.image("btn_menu_sound", "../img/btn_menu_sound.png");
    this.load.image("btn_menu_sound_off", "../img/btn_menu_sound_off.png");
    this.load.image("btn_menu_music", "../img/btn_menu_music.png");
    this.load.image("btn_menu_music_off", "../img/btn_menu_music_off.png");
    this.load.image("footer", "../img/footer.png");
    this.load.image("header", "../img/header.png");
    this.load.image("btn_spin", "../img/btn_spin.png");
    this.load.image("btn_max", "../img/btn_max.png");
    this.load.image("btn_back", "../img/btn_back.png");
    this.load.image("btn_sound", "../img/btn_sound.png");
	this.load.image("sep", "../img/sep.png");
    this.load.image("btn_sound_off", "../img/btn_sound_off.png");
    this.load.image("btn_music", "../img/btn_music.png");
    this.load.image("btn_music_off", "../img/btn_music_off.png");
    this.load.image("btn_plus_bet", "../img/btn_plus_bet.png");
	this.load.image("btn_max", "../img/btn_max.png");
    this.load.image("btn_minus_bet", "../img/btn_minus_bet.png");
    this.load.image("btn_plus_lines", "../img/btn_plus_lines.png");
    this.load.image("btn_minus_lines", "../img/btn_minus_lines.png");
    this.load.image("btn_full", "../img/btn_full.png");
    this.load.image("btn_no", "../img/btn_no.png");
    this.load.image("btn_yes", "../img/btn_yes.png");
    this.load.image("win_prompt", "../img/win_prompt.png");
    this.load.image("res_bar", "../img/res_bar.png");
    this.load.image("lines_bar", "../img/lines_bar.png");
    this.load.image("bet_bar", "../img/bet_bar.png");
    this.load.image("paytable", "../img/paytable.png");
    this.load.image("circle", "../img/circle.png");
    this.load.image("line1", "../img/line1.png");
    this.load.image("line2", "../img/line2.png");
    this.load.image("line3", "../img/line3.png");
    this.load.image("you_win", "../img/you_win.png");
    this.load.image("big_win", "../img/big_win.png");
    this.load.image("light1", "../img/light1.png");
    this.load.image("coin", "../img/coin.png");
    this.load.image("mask", "../img/mask.png");
    this.load.image("separate", "../img/separate.png");
    this.load.image("about", "../img/about.png");
    this.load.image("about_window", "../img/about_window.png");
    this.load.spritesheet("coins", "../img/coins.png", {
        frameWidth: 70,
        frameHeight: 70
    });
    this.load.spritesheet("lever", "../img/lever.png", {
        frameWidth: 77,
        frameHeight: 351
    });
    this.load.spritesheet("li", "../img/li.png", {
        frameWidth: 57.5,
        frameHeight: 397
    });
    this.load.audio("Slot Machine Spin Loop", "../audio/Slot Machine Spin Loop.mp3");
    this.load.audio("Slot Machine Mega Win", "../audio/Slot Machine Mega Win.mp3");
    this.load.audio("Slot Arm Start", "../audio/Slot Arm Start.mp3");
    this.load.audio("Get Coins", "../audio/Get Coins.mp3");
    this.load.audio("Slot line", "../audio/Slot line.mp3");
    this.load.audio("click2", "../audio/click2.mp3");
    this.load.audio("Button", "../audio/Button.mp3");
    this.load.audio("Bonus Lose", "../audio/Bonus Lose.mp3");
    this.load.audio("Slot coins", "../audio/Slot coins.mp3");
    this.load.audio("Slot Machine Spin Button", "../audio/Slot Machine Spin Button.mp3");
    this.load.audio("Slot Machine Bonus Lose", "../audio/Slot Machine Bonus Lose.mp3");
    for (var d = 1; 5 >= d; d++)
        this.load.audio("Slot Machine Stop " + d, "../audio/Slot Machine Stop " + d + ".mp3")
}
;
Load.prototype.create = function() {}
;
