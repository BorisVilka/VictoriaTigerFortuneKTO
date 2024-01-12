var rotate_shown = !1;
_rf_checkratio();
window.onresize = function(a) {
    _rf_checkratio()
}
;
window.addEventListener("orientationchange", function() {
    _rf_checkratio()
});
function _rf_checkratio() {
    var a = window.innerWidth / window.innerHeight;
    1 >= a && !rotate_shown && (rotate_shown = !0,
    _rf_rotate("show"));
    1 < a && rotate_shown && (rotate_shown = !1,
    _rf_rotate("hide"))
}
function _rf_rotate(a) {
    "show" === a ? (document.getElementById("rf_rotate").style.width = "100%",
    document.getElementById("rf_rotate").style.height = "100%",
    document.getElementById("rf_rotate").style.position = "absolute",
    document.getElementById("rf_rotate").style.opacity = "0.8",
    document.getElementById("rf_rotate").style.backgroundColor = "black",
    document.getElementById("rf_rotate").innerHTML = '<img src="rotate.png" style="top: 50%; left: 50%; position: relative; margin-top: -90px; margin-left: -140px;"/>') : (document.getElementById("rf_rotate").style.removeProperty("width"),
    document.getElementById("rf_rotate").style.removeProperty("height"),
    document.getElementById("rf_rotate").style.removeProperty("position"),
    document.getElementById("rf_rotate").style.removeProperty("opacity"),
    document.getElementById("rf_rotate").style.removeProperty("backgroundColor"),
    document.getElementById("rf_rotate").innerHTML = "")
}
;