function getTVolume(x) {
    const meter_cubed = 2.3687253991903575e104
    if (x.gte("ee9")) return "大神啊！你的点数已经可以制造1个多元宇宙了！"
    if (x.gte("1e785")) return `如果你每秒写3个数字，那么把你的树数写下来需要${formatTime.fromSeconds(x.log10().floor().add(1).div(3))}`
    if (x.gte(Number.MAX_VALUE)) return `如果你的每棵树占据一个普朗克单位，你的树数足以制造${x.div(Number.MAX_VALUE).format()}个无限`
    const prefixes = [
        { value: 1e113, name: "维度", verb: "制造" },
        { value: 3.4e80, name: "可观测宇宙", verb: "制造" },
        { value: 1e73, name: "玉夫座空洞", verb: "制造" },
        { value: 5e68, name: "本星系团", verb: "制造" },
        { value: 3.3e61, name: "星系", verb: "制造" },
        { value: 3.3e55, name: "本地泡", verb: "制造" },
        { value: 1.7e48, name: "奥尔特云", verb: "制造" },
        { value: 1.7e45, name: "星云", verb: "制造" },
        { value: 8e36, name: "超巨星", verb: "制造" },
        { value: 5e32, name: "红巨星", verb: "制造" },
        { value: 1.41e27, name: "太阳", verb: "制造" },
        { value: 1.53e24, name: "木星", verb: "制造" },
        { value: 1.08e21, name: "地球", verb: "制造" },
        { value: 4.5e17, name: "矮行星", verb: "制造" },
        { value: 5e12, name: "大型小行星", verb: "制造" },
        { value: 3.3e8, name: "万里长城", verb: "填满" },
        { value: 2.6006e6, name: "吉萨大金字塔", verb: "填满" },
        { value: 2.5e3, name: "奥运规模的游泳池", verb: "填满" },
        { value: 1, name: "冰箱", verb: "填满" },
        { value: 7.5e-4, name: "酒瓶", verb: "填满" },
        { value: 3.555e-6, name: "茶匙", verb: "填满" },
        { value: 5e-8, name: "米", verb: "制造" },
        { value: 6.2e-11, name: "沙子", verb: "制造" },
        { value: 9e-17, name: "红细胞", verb: "制造" },
        { value: 5e-21, name: "病毒", verb: "制造" },
        { value: 7.23e-30, name: "氢原子", verb: "制造" },
        { value: 1e-42, name: "原子核", verb: "制造" },
        { value: 2.82e-45, name: "质子", verb: "制造" },
        { value: 1e-54, name: "立方阿米", verb: "占据" },
        { value: 1e-63, name: "立方仄米", verb: "占据" },
        { value: 1e-72, name: "立方幺米", verb: "占据" },
        { value: 1e-81, name: "立方柔米", verb: "占据" },
        { value: 1e-90, name: "立方亏米", verb: "占据" },
    ]
    for (let prefix of prefixes) {
        if (x.gte(prefix.value * meter_cubed)) {
            return `如果你的每棵树占据一个普朗克单位，你的树足以${prefix.verb}${x.div(prefix.value * meter_cubed).format()}个${prefix.name}`
        }
    }
    return `如果你的每棵树占据一个普朗克单位，你的树足以占据${formatWhole(x)}个普朗克单位`
}
class formatTime {
    constructor(miliseconds) {
        this._ms = E(miliseconds)
    }
    static fromYears(years) {
        return new formatTime(E(years).mul(31536e6))
    }
    static fromDays(days) {
        return new formatTime(E(days).mul(864e5))
    }
    static fromHours(hours) {
        return new formatTime(E(hours).mul(36e5))
    }
    static fromMinutes(minutes) {
        return new formatTime(E(minutes).mul(6e4))
    }
    static fromSeconds(seconds) {
        return new formatTime(E(seconds).mul(1e3))
    }
    static fromMilliseconds(milliseconds) {
        return new formatTime(milliseconds)
    }
    copyFrom(other) {
        this._ms = other._ms
    }
    get totalYears() {
        return this._ms.div(31536e6);
    }
    get totalDays() {
        return this._ms.div(864e5);
    }
    get totalHours() {
        return this._ms.div(36e5);
    }
    get totalMinutes() {
        return this._ms.div(6e4);
    }
    get totalSeconds() {
        return this._ms.div(1e3);
    }
    get totalMilliseconds() {
        return this._ms;
    }
    get years() {
        if (this._ms.isneg()) return ExpantaNum.ceil(this.totalYears);
        return ExpantaNum.floor(this.totalYears);
    }
    get days() {
        if (this._ms.isneg()) return new formatTime(this._ms.neg()).days.neg()
        return ExpantaNum.floor(this.totalDays.sub(this.totalDays.div(365).floor().times(365)));
    }
    get hours() {
        if (this._ms.isneg()) return new formatTime(this._ms.neg()).hours.neg()
        return ExpantaNum.floor(this.totalHours.sub(this.totalHours.div(24).floor().times(24)));
    }
    get minutes() {
        if (this._ms.isneg()) return new formatTime(this._ms.neg()).minutes.neg()
        return ExpantaNum.floor(this.totalMinutes.sub(this.totalMinutes.div(60).floor().times(60)));
    }
    get seconds() {
        if (this._ms.isneg()) return new formatTime(this._ms.neg()).seconds.neg()
        return ExpantaNum.floor(this.totalSeconds.sub(this.totalSeconds.div(60).floor().times(60)));
    }
    get milliseconds() {
        if (this._ms.isneg()) return new formatTime(this._ms.neg()).milliseconds.neg()
        return ExpantaNum.floor(this.totalMilliseconds.sub(this.totalMilliseconds.div(1e3).floor().times(1e3)));
    }
    toString() {
        if (this.totalMilliseconds.lt(1)) return '0毫秒'
        let string = ''
        if (this.years.neq(0)) string = string + (formatWhole(this.years) + '年')
        if (this.days.neq(0) && this.years.lt(4e14)) string = string + (formatWhole(this.days) + '天')
        if (this.hours.neq(0) && this.years.lt(4e12)) string = string + (formatWhole(this.hours) + '时')
        if (this.minutes.neq(0) && this.years.lt(5e10)) string = string + (formatWhole(this.minutes) + '分')
        if (this.seconds.neq(0) && this.years.lt(1e9)) string = string + (formatWhole(this.seconds) + '秒')
        if (this.milliseconds.neq(0) && this.years.lt(4e7)) string = string + (formatWhole(this.milliseconds) + '毫秒')
        return string
    }
    toJSON() {
        return this.toString()
    }
}

function formatGain(a, e, res = "") {
    const g = ExpantaNum.add(a, e.div(30))
    const DT = ExpantaNum("10^^6")

    if (g.neq(a)) {
        if (a.gte(DT)) {
            var oom = E(g).slog(10).sub(E(a).slog(10)).mul(30)
            if (oom.gte(1e-3)) return oom.format() + " 数量级^^2"
        }

        if (a.gte('ee100')) {
            var tower = E(a).slog(10).sub(1.3010299956639813).floor();

            var oom = E(g).iteratedlog(10, tower).sub(E(a).iteratedlog(10, tower)).mul(30), rated = false;

            if (oom.gte(1)) rated = true
            else if (tower > 2) {
                tower--
                oom = E(g).iteratedlog(10, tower).sub(E(a).iteratedlog(10, tower)).mul(30)
                if (oom.gte(1)) rated = true
            }

            if (rated) return oom.format() + " 数量级^" + tower
        }

        if (a.gte(1e100)) {
            const oom = g.div(a).log10().mul(30)
            if (oom.gte(1)) return oom.format() + " 数量级"
        }
    }

    return format(e) + res
}