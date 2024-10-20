"use strict";
var notify = document.getElementById('notify');
let upgLookingAt = 0;
hideNotify();
const f = 30;
//软上限
const softs = [
    [N(5000), N(0.7), 'pow'],
    [N('1.5e10'), N(0.7), 'pow']
];
//冻结数组
function deepFreezeArray(arr) {
    // 首先冻结当前数组  
    const frozenArr = Object.freeze(arr);
    // 遍历数组中的每个元素  
    for (let i = 0; i < frozenArr.length; i++) {
        // 如果元素是数组，则递归地冻结它  
        if (Array.isArray(frozenArr[i])) {
            deepFreezeArray(frozenArr[i]);
        }
        // 如果元素是原始值（如数字、字符串、布尔值等），则不需要进一步处理  
    }
}
//解冻数组
function deepCopyUnfrozenArray(arr) {
    // 创建一个新的空数组来存放副本  
    let copy = [];
    // 遍历原数组的每个元素  
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        // 如果元素是数组，则递归地复制它  
        if (Array.isArray(element)) {
            copy[i] = deepCopyUnfrozenArray(element);
        } else {
            copy[i] = element;
        }
    }
    return copy;
}
deepFreezeArray(softs);
let nowLookAt = "page1";
//升级效果
var upgradeEffect = [
    [N(100), "$"],
    [N(100), "$"],
    [N(500), "$"],
    [N(2500), "$"],
    [N(5000), "$"],
    [N(10000), "$"],
    [N(10), "木板"],
    [N(30), "木板", N(0)],
    [N(50), "木板"],
    [N(80), "木板"],
    [N(110), "木板"],
    [N(300), "木板"],
    [N(500), "木板"],
    [N(1000), "木板"],
    [N(3000), "木板"],
    [N(5000), "木板"],
    [N(7000), "木板"],
    [N(10000), "木板"],
    [N(20000), "木板"],
    [N(25000), "木板"],
    [N(30000), "木板"],
    [N(45000), "木板"],
    [N(50000), "木板"],
    [N(80000), "木板"],
    [N('2e6'), "木板"],
    [N('2e7'), "木板"],
    [N('e14'), "$", N(0)],
]
//初始化2
let tmp = [];
for (let i = 0; i < upgradeEffect.length; i++) {
    tmp.push(0);
}
let player = {
    trees: N(0),
    treesT: N(0),
    treesValue: N(1),
    treesPerSec: N(1),
    money: N(0),
    upgrades: tmp,
    passiveMoney: 0,
    passiveWood: 0,
    wood: N(0),
    chaIn: 0,
    chas: [0],
    totalTime: N(0),
};
let k = 1;
let lastPage = 'page1';
function whichPageIn(n) { return JSON.stringify((upgradeEffect[n - 1][1] == "$") ? 1 : 2); }
for (let i = 1; i <= player.upgrades.length; i++) {
    // 创建一个新的 div 元素
    let p = whichPageIn(i)
    let Div = document.getElementById('page' + p);
    if (lastPage == 'page' + p && i != 1) {
        k++;
        console.log(k, i);
    } else {
        k = 1; lastPage = 'page' + p;
        console.log(k, i);
    }
    let e = document.createElement("button");
    e.textContent = i;
    e.classList.add("up");
    e.id = "upgrade" + i;
    e.addEventListener("click", function () {
        buy(i);
    });
    e.addEventListener(
        "mouseover",
        (event) => {
            showText(i);
        },
        false,
    );
    e.addEventListener(
        "mouseout",
        (event) => {
            showText(0);
        },
        false,
    );
    Div.appendChild(e);
    if (k % 5 === 0 && i !== player.upgrades.length) {
        Div.appendChild(document.createElement("br"));
    }
}
//彩色
function getUndulatingColor(period = Math.sqrt(760)) {
    let t = new Date().getTime()
    let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
    let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
    let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
    a = convertToB16(Math.floor(a * 128) + 128)
    b = convertToB16(Math.floor(b * 128) + 128)
    c = convertToB16(Math.floor(c * 128) + 128)
    return "#" + String(a) + String(b) + String(c)
}
//硬重置
function hardReset1(a) {
    if (a) {
        let tmp = [];
        for (let i = 0; i < upgradeEffect.length; i++) {
            tmp.push(0);
        }
        player = {
            trees: N(0),
            treesT: N(0),
            treesValue: N(1),
            treesPerSec: N(1),
            money: N(0),
            upgrades: tmp,
            passiveMoney: 0,
            passiveWood: 0,
            wood: N(0),
            chaIn: 0,
            chas: [0],
            totalTime: N(0),
        };
    };
    save();
}
//硬重置
function hardReset() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://v1.jinrishici.com/all.txt", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseText = xhr.responseText;
                console.log(responseText);
                let c1 = prompt(`您确定要硬重置吗？\n输入“${responseText}”确定`) == responseText;
                hardReset1(c1);
            } else {
                let c2 = prompt(`请求失败:${xhr.status}\n请输入“我确定我要对我的存档进行一次硬重置”确定`) == "我确定我要对我的存档进行一次硬重置";
                hardReset1(c2);
            }
        }
    };
    // 发送请求
    xhr.send();

}
//隐藏原页面
function noneBefore() {
    document.getElementById(nowLookAt).style.display = "none";
}
//切换至pagek
function switchTo(k) {
    noneBefore();
    nowLookAt = 'page' + k;
    document.getElementById(nowLookAt).style.display = "block";
}
// 显示通知框  
function showNotify(str) {//+1
    notify.classList.remove('hide');
    notify.innerHTML = str
}
// 隐藏通知框  
function hideNotify() {//+1
    notify.classList.add('hide');
}
function addNotify(str) {//+1
    showNotify(str)
    setTimeout(function () {
        hideNotify()
    }, 1000)
}
function convertToB16(n) {
    let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let x = n % 16
    return codes[(n - x) / 16] + codes[x]
}
//升级颜色
function fixUpgradesColor() {
    for (let i = 1; i <= player.upgrades.length; i++) {
        if (player.upgrades[i - 1] == 1) {
            document.getElementById("upgrade" + i).classList.add("buyed");
        } else {
            document.getElementById("upgrade" + i).classList.remove("buyed");
        }
        if (!(player.upgrades[i - 2] == 1 || i == 1)) {
            document.getElementById("upgrade" + i).classList.add("cantBuy");
        } else {
            document.getElementById("upgrade" + i).classList.remove("cantBuy");
        }
    }
}
function N(x) {
    return new ExpantaNum(x);
}
//显示升级文字
function showText(id) {
    upgLookingAt = id;
    let effectTexts = [
        ["洒水机", "<br>*1.5"],
        ["员工1", "<br>*3"],
        ["基因改良", "<br>*5"],
        ["机器种植", "<br>*10"],
        ["机器收割", "<br>*5"],

        ["*合同*", "<br>每秒获得10%$"],
        ["加强木", "<br>树价值*2"],
        ["加强机器", "<br>*1+|ln(木板+1)|"],
        ["肥料", "<br>软上限1 延迟500"],
        ["员工2", "<br>*6"],

        ["大树", "<br>树价值*2"],
        ["金坷垃", "<br>软上限1 延迟1000"],
        ["*锯*", "<br>每秒获得1%木板"],
        ["更好的肥料", "<br>软上限1-> ^0.72"],
        ["沃土", "<br>软上限1-> ^0.74"],

        ["大棚", "<br>*2"],
        ["竞争", "<br>解锁挑战"],
        ["认可", "<br>树价值*2"],
        ["*好锯*", "<br>每秒获得5%木板"],
        ["更多员工", "<br>*10"],

        ["温控系统", "<br>软上限1-> ^0.8"],
        ["全天候光照", "<br>*2"],
        ["员工<sup>2</sup>", "<br>*15"],
        ["宣传部", "<br>树价值*5"],
        ["校招", "<br>*20"],

        ["员工<sup>员工</sup>", "<br>*30"],
        ["上市", "<br>*1+|log(tree+1)|"],
    ]
    if (id != 0) {
        let text = document.getElementById("page" + whichPageIn(id) + "Text");
        text.style.display = "block";
        let mainT = `<span class="skyB">[升级${id}]${effectTexts[id - 1][0]}</span>${effectTexts[id - 1][1]}<br>${format(upgradeEffect[id - 1][0]) + upgradeEffect[id - 1][1]}`;
        let eff = upgradeEffect[id - 1][2] != undefined ? `<br><span class="green">当前：*<span id="upg${id}Effect">${upgradeEffect[id - 1][2]}</span>` : "";
        text.innerHTML = mainT + eff;
    } else for (let i = 1; i <= 2; i++)document.getElementById("page" + i + "Text").innerHTML = '';


}
//购买升级
function buy(id) {
    if (upgradeEffect[id - 1][1] == '$') {
        if (player.upgrades[id - 1] == 0 && player.money.gt(upgradeEffect[id - 1][0]) && (player.upgrades[id - 2] == 1 || id == 1)) {
            player.upgrades[id - 1] = 1;
            player.money = player.money.sub(upgradeEffect[id - 1][0]);
        }
    }
    if (upgradeEffect[id - 1][1] == '木板') {
        if (player.upgrades[id - 1] == 0 && player.wood.gt(upgradeEffect[id - 1][0]) && (player.upgrades[id - 2] == 1 || id == 1)) {
            player.upgrades[id - 1] = 1;
            player.wood = player.wood.sub(upgradeEffect[id - 1][0]);
        }
    }
}
var gainNCS;
//升级效果
function getGain() {
    let gain = N(1);
    player.passiveMoney = 0; player.passiveWood = 0;
    let softsCal = deepCopyUnfrozenArray(softs);
    player.treesValue = N(1);
    if (player.upgrades[0]) gain = gain.mul(1.5);
    if (player.upgrades[1]) gain = gain.mul(3);
    if (player.upgrades[2]) gain = gain.mul(5);
    if (player.upgrades[3]) gain = gain.mul(10);
    if (player.upgrades[4]) gain = gain.mul(5);
    if (player.upgrades[5]) player.passiveMoney = 0.1;
    if (player.upgrades[6]) player.treesValue = player.treesValue.mul(2);
    upgradeEffect[7][2] = player.wood.add(1).ln().abs().add(1);
    if (player.upgrades[7]) gain = gain.mul(upgradeEffect[7][2]);
    if (player.upgrades[8]) softsCal[0][0] = softsCal[0][0].add(500);
    if (player.upgrades[9]) gain = gain.mul(6);
    if (player.upgrades[10]) player.treesValue = player.treesValue.mul(2);
    if (player.upgrades[11]) softsCal[0][0] = softsCal[0][0].add(1000);
    if (player.upgrades[12]) player.passiveWood = 0.01;
    if (player.upgrades[13]) softsCal[0][1] = N(0.72);
    if (player.upgrades[14]) softsCal[0][1] = N(0.74);
    if (player.upgrades[15]) gain = gain.mul(2);
    if (player.upgrades[17]) player.treesValue = player.treesValue.mul(2);
    if (player.upgrades[18]) player.passiveWood = 0.05;
    if (player.upgrades[19]) gain = gain.mul(10);
    if (player.upgrades[21]) gain = gain.mul(2);
    if (player.upgrades[22]) gain = gain.mul(15);
    if (player.upgrades[23]) player.treesValue = player.treesValue.mul(5);
    if (player.upgrades[24]) gain = gain.mul(20);
    if (player.upgrades[25]) gain = gain.mul(30);
    upgradeEffect[26][2] = player.trees.add(1).log10().abs().add(1);
    if (player.upgrades[26]) gain = gain.mul(upgradeEffect[26][2]);

    document.getElementById('p3').style.display = player.upgrades[16] ? "inline-block" : "none";

    if (player.chas[0]) softsCal[0][1] = N(0.78);
    if (player.upgrades[20]) softsCal[0][1] = N(0.8);

    gainNCS = gain;

    if (player.chaIn == 1) gain = gain.pow(0.85);

    player.treesPerSec = gain;

    for (let i = 0; i < softsCal.length; i++) {
        let e = document.getElementById("soft" + (i + 1))
        if (player.treesPerSec.gt(softsCal[i][0])) e.style.display = "block";
        else e.style.display = "none";
        gain = gain.softcap(softsCal[i][0], softsCal[i][1], softsCal[i][2]);
        e = document.getElementById("soft" + (i + 1) + "Start");
        e.innerHTML = format(softsCal[i][0]);
        e = document.getElementById("soft" + (i + 1) + "Effect");
        e.innerHTML = format(softsCal[i][1]);
    }
    for (let i = 0; i < softsCal.length; i++) {

    }
    return gain;
}
//一帧
function tick() {
    let moneyGain = player.trees.mul(player.treesValue.mul(3));
    let woodGain = player.trees.mul(N(0.0003).mul(player.treesValue));
    player.trees = player.trees.add(getGain().div(f));
    player.treesT = player.treesT.add(getGain().div(f));
    player.money = player.money.add(moneyGain.mul(player.passiveMoney).div(f));
    player.wood = player.wood.add(woodGain.mul(player.passiveWood).div(f));
    fixUpgradesColor();
    updateDisplay();
    player.totalTime = player.totalTime.add(1000 / f);
}
function setIdInnerHtml(id, text) {
    document.getElementById(id).innerHTML = text;
}
//制作资源
function sellTrees() {
    let moneyGain = player.trees.mul(player.treesValue.mul(3));
    player.money = player.money.add(moneyGain);
    player.trees = N(0);
}
function makeWood() {
    let woodGain = player.trees.mul(N(0.0003).mul(player.treesValue));
    player.wood = player.wood.add(woodGain);
    player.trees = N(0);
}
function calaNextUpgTime() {
    let nextUpg = -1;
    for (let i = 0; i < upgradeEffect.length; i++)if (player.upgrades[i] == 0) { nextUpg = i + 1; break; }
    if (nextUpg == -1) return "已购买所有升级";
    else {
        let woodGain = player.trees.mul(N(0.0003).mul(player.treesValue));
        let moneyGain = player.trees.mul(player.treesValue.mul(3));
        let woodPerSec = player.treesPerSec.mul(N(0.0003).mul(player.treesValue));
        let moneyPerSec = player.treesPerSec.mul(player.treesValue.mul(3));
        let cost = upgradeEffect[nextUpg - 1][0];
        let coin = upgradeEffect[nextUpg - 1][1];
        let nowHave = coin=="$" ? player.money.add(moneyGain): player.wood.add(woodGain);
        let time = (cost.sub(nowHave).div(coin=="$"?moneyPerSec:woodPerSec)).max(0);
        return `下一个升级预计在${formatTime.fromSeconds(time)}后可购买`;
    }
}
//更新显示
function updateDisplay() {
    let woodGain = player.trees.mul(N(0.0003).mul(player.treesValue));
    let moneyGain = player.trees.mul(player.treesValue.mul(3));
    let rains = document.getElementsByClassName('rain');
    if (upgLookingAt != 0 && upgradeEffect[upgLookingAt - 1][2] != undefined) document.getElementById(`upg${upgLookingAt}Effect`).innerHTML = format(upgradeEffect[upgLookingAt - 1][2]);
    for (let i = 0; i < rains.length; i++)rains[i].style = "color:" + getUndulatingColor();
    for (let i = 0; i < player.chas.length; i++) if (player.chas[i] == 1 || player.chaIn == i + 1 && player.trees.gte(ChaGoals[i])) document.getElementById(`cha${i + 1}`).classList.add(player.chas[i] == 1 ? "chaF" : (player.chaIn == i + 1 && player.trees.gte(ChaGoals[i]) ? "chaCanF" : ""));
    setIdInnerHtml("treesDisplay", format(player.trees));
    setIdInnerHtml("treesTDisplay", format(player.treesT));
    setIdInnerHtml("treesVDisplay", getTVolume(player.trees));
    setIdInnerHtml("treesPerSecDisplay", formatGain(player.trees, getGain()));
    setIdInnerHtml("treesPerSecDisplayNS", formatGain(player.trees, player.treesPerSec));
    setIdInnerHtml("treesPerSecDisplayNCS", formatGain(player.trees, gainNCS));
    setIdInnerHtml("moneyDisplay", format(player.money));
    setIdInnerHtml("moneyGetDisplay", format(moneyGain));
    setIdInnerHtml("woodDisplay", format(player.wood));
    setIdInnerHtml("woodGetDisplay", format(woodGain));
    setIdInnerHtml("nextUpgTimeDisplay", calaNextUpgTime());
    setIdInnerHtml("totalTimeDisplay", formatTime.fromMilliseconds(player.totalTime));
    setIdInnerHtml("chaDisplay", player.chaIn == 0 ? "你未进入任何挑战" : "你现在在挑战" + player.chaIn + "内");
}


load();
setInterval(tick, 1000 / f);

