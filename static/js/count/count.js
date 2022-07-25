// countUp rebuild
var __assign = this && this.__assign || function () {
    return (__assign = Object.assign || function (t) {
        for (var i, a = 1, s = arguments.length; a < s; a++) {
            i = arguments[a];
            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
        }
        return t
    }).apply(this, arguments)
}, CountUp = function () {
    function t(t, i, a, s) {
        var n = this;
        this.target = t, this.endVal = a, this.options = s, this.defaults = {
            startVal: i || 0,
            decimalPlaces: 0,
            duration: 2,
            useEasing: !0,
            useGrouping: !0,
            smartEasingThreshold: 999,
            smartEasingAmount: 333,
            separator: $(t).data('separator')==undefined?',':$(t).data('separator'),
            decimal: ".",
            prefix: "",
            suffix: ""
        }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.count = function (t) {
            n.startTime || (n.startTime = t);
            var i = t - n.startTime;
            n.remaining = n.duration - i, n.useEasing ? n.countDown ? n.frameVal = n.startVal - n.easingFn(i, 0, n.startVal - n.endVal, n.duration) : n.frameVal = n.easingFn(i, n.startVal, n.endVal - n.startVal, n.duration) : n.countDown ? n.frameVal = n.startVal - (n.startVal - n.endVal) * (i / n.duration) : n.frameVal = n.startVal + (n.endVal - n.startVal) * (i / n.duration), n.countDown ? n.frameVal = n.frameVal < n.endVal ? n.endVal : n.frameVal : n.frameVal = n.frameVal > n.endVal ? n.endVal : n.frameVal, n.frameVal = Number(n.frameVal.toFixed(n.options.decimalPlaces)), n.printValue(n.frameVal), i < n.duration ? n.rAF = requestAnimationFrame(n.count) : null !== n.finalEndVal ? n.update(n.finalEndVal) : n.callback && n.callback()
        }, this.formatNumber = function (t) {
            var i, a, s, e, r, o = t < 0 ? "-" : "";
            if (i = Math.abs(t).toFixed(n.options.decimalPlaces), i += "", a = i.split("."), s = a[0], e = a.length > 1 ? n.options.decimal + a[1] : "", n.options.useGrouping) {
                r = "";
                for (var l = 0, h = s.length; l < h; ++l) 0 !== l && l % 3 == 0 && (r = n.options.separator + r), r = s[h - l - 1] + r;
                s = r
            }
            return n.options.numerals && n.options.numerals.length && (s = s.replace(/[0-9]/g, function (t) {
                return n.options.numerals[+t]
            }), e = e.replace(/[0-9]/g, function (t) {
                return n.options.numerals[+t]
            })), o + n.options.prefix + s + e + n.options.suffix
        }, this.easeOutExpo = function (t, i, a, s) {
            return a * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + i
        }, this.options = __assign(__assign({}, this.defaults), s), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(a), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el = t, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined"
    }

    return t.prototype.determineDirectionAndSmartEasing = function () {
        var t = this.finalEndVal ? this.finalEndVal : this.endVal;
        this.countDown = this.startVal > t;
        var i = t - this.startVal;
        if (Math.abs(i) > this.options.smartEasingThreshold) {
            this.finalEndVal = t;
            var a = this.countDown ? 1 : -1;
            this.endVal = t + a * this.options.smartEasingAmount, this.duration = this.duration / 2
        } else this.endVal = t, this.finalEndVal = null;
        this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing
    }, t.prototype.start = function (t) {
        this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal))
    }, t.prototype.pauseResume = function () {
        this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused
    }, t.prototype.reset = function () {
        cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal)
    }, t.prototype.update = function (t) {
        cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal || this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count))
    }, t.prototype.printValue = function (t) {
        var i = this.formattingFn(t);
        this.el[0].innerHTML = i
    }, t.prototype.ensureNumber = function (t) {
        return "number" == typeof t && !isNaN(t)
    }, t.prototype.validateValue = function (t) {
        var i = Number(t);
        return this.ensureNumber(i) ? i : (this.error = "[CountUp] invalid start or end value: " + t, null)
    }, t.prototype.resetDuration = function () {
        this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration
    }, t
}();