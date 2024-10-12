"use strict";
var notify = document.getElementById('notify');
let upgLookingAt=0;
hideNotify();
const f=30;
const softs=[
    [N(5000), N(0.7), 'pow']
];
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
function deepCopyUnfrozenArray(arr) {  
    // 创建一个新的空数组来存放副本  
    let copy = [];  
    // 遍历原数组的每个元素  
    for (let i = 0; i < arr.length; i++) {  
      const element = arr[i];
      // 如果元素是数组，则递归地复制它  
      if (Array.isArray(element)) {  
        copy[i] = deepCopyUnfrozenArray(element);  
      }else{   
        copy[i] = element;  
      }  
    }  
    return copy;  
  } 
deepFreezeArray(softs);

let nowLookAt="page1";
const upgradeEffect=[
    [N(100),"$"],
    [N(100),"$"],
    [N(500),"$"],
    [N(2500),"$"],
    [N(2500),"$"],
    [N(10000),"$"],
    [N(10),"木板"],
    [N(30),"木板"],
    [N(50),"木板"],
    [N(80),"木板"],
    [N(110),"木板"],
    [N(300),"木板"],
    [N(500),"木板"],
    [N(1000),"木板"],
]

/*
报错可能：
upgradeEffect
upgrades[id]
upgrades[id]Cost
*/
let tmp=[];
for(let i=0;i<upgradeEffect.length;i++){
    tmp.push(0);
}
let player={
    trees: N(0),
    treesMoney: N(1),
    treesPerSec: N(1),
    money: N(0),
    upgrades: tmp,
    autoMoney: 0,
    autoWood: 0,
    wood: N(0)
};
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
function hardReset(){
    var c1=prompt("您确定要硬重置吗？输入“111*111”的答案确定")=="12321";
    if(c1){
        let tmp=[];
        for(let i=0;i<upgradeEffect.length;i++){
            tmp.push(0);
        }
        player={
            trees: N(0),
            treesMoney: N(1),
            treesPerSec: N(1),
            money: N(0),
            upgrades: tmp,
            autoMoney: 0,
            autoWood: 0,
            wood: N(0)
        };
    }
    save();
};


function noneBefore(){
    document.getElementById(nowLookAt).style.display="none";
}
function switchTo(k){
    noneBefore();
    nowLookAt='page'+k;
    document.getElementById(nowLookAt).style.display="block";
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
  setTimeout(function() {
    hideNotify()
  }, 1000)
}
function convertToB16(n) {
    let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let x = n % 16
    return codes[(n - x) / 16] + codes[x]
}
function fixUpgradesColor(){
    for(let i=1;i<=player.upgrades.length;i++){
        if(player.upgrades[i-1]==1){
            document.getElementById("upgrade"+i).classList.add("buyed");
        }else{
            document.getElementById("upgrade"+i).classList.remove("buyed");
        }
        if(!(player.upgrades[i-2]==1 || i==1)){
            document.getElementById("upgrade"+i).classList.add("cantBuy");
        }else{
            document.getElementById("upgrade"+i).classList.remove("cantBuy");
        }
    }
}
function N(x){
    return new ExpantaNum(x);
}
function showText(id){
    upgLookingAt=id;
    let effectTexts=[
        "洒水机<br>*1.5<br><span id='upgrade1Cost'></span>",
        "员工1<br>*3<br><span id='upgrade2Cost'></span>",
        "基因改良<br>*5<br><span id='upgrade3Cost'></span>",
        "机器种植<br>*10<br><span id='upgrade4Cost'></span>",
        "机器收割<br>*5<br><span id='upgrade5Cost'></span>",
        "合同<br>每秒获得10%$<br><span id='upgrade6Cost'></span>",
        "加强木<br>树价值*2<br><span id='upgrade7Cost'></span>",
        "加强机器<br>*1+|ln(木板)|<br>*"+"<span id='up8Effect'>"+"</span>"+"<br><span id='upgrade8Cost'></span>",
        "肥料<br>软上限1 延迟500<br>"+"<span id='upgrade9Cost'></span>",
        "员工2<br>*6<br>"+"<span id='upgrade10Cost'></span>",
        "大树<br>树价值*2<br>"+"<span id='upgrade11Cost'></span>",
        "金坷垃<br>软上限1 延迟1000<br>"+"<span id='upgrade12Cost'></span>",
        "锯<br>每秒获得1%木板<br>"+"<span id='upgrade13Cost'></span>",
        "更好的肥料<br>软上限1-> ^0.72<br>"+"<span id='upgrade14Cost'></span>",
        ]
        let text=document.getElementById("page"+JSON.stringify(id<7?1:2)+"Text");
        text.display="block";
        text.innerHTML=effectTexts[id-1];
        document.getElementById("upgrade"+id+"Cost").innerHTML=format(upgradeEffect[id-1][0])+upgradeEffect[id-1][1];
}

function buy(id){
    if(upgradeEffect[id-1][1]=='$'){
        if (player.upgrades[id-1]==0 && player.money.gt(upgradeEffect[id-1][0]) && (player.upgrades[id-2]==1 || id==1)){
            player.upgrades[id-1]=1;
            player.money=player.money.sub(upgradeEffect[id-1][0]);
        }
    }
    if(upgradeEffect[id-1][1]=='木板'){
        if (player.upgrades[id-1]==0 && player.wood.gt(upgradeEffect[id-1][0]) && (player.upgrades[id-2]==1 || id==1)){
            player.upgrades[id-1]=1;
            player.wood=player.wood.sub(upgradeEffect[id-1][0]);
        }
    }
}
function upgEffect(){
  let gain=N(1);
    let softsCal=deepCopyUnfrozenArray(softs);
    player.treesMoney=N(1);
    if(player.upgrades[0]) gain=gain.mul(1.5);
    if(player.upgrades[1]) gain=gain.mul(3);
    if(player.upgrades[2]) gain=gain.mul(5);
    if(player.upgrades[3]) gain=gain.mul(10);
    if(player.upgrades[4]) gain=gain.mul(5);
    if(player.upgrades[5]) player.autoMoney=0.1;
    if(player.upgrades[6]) player.treesMoney=player.treesMoney.mul(2);
    if(player.upgrades[7]) gain=gain.mul(player.wood.ln().abs().add(1));
    if(player.upgrades[8]) softsCal[0][0]=softsCal[0][0].add(500);
    if(player.upgrades[9]) gain=gain.mul(6);
    if(player.upgrades[10]) player.treesMoney=player.treesMoney.mul(2);
    if(player.upgrades[11]) softsCal[0][0]=softsCal[0][0].add(1000);
    if(player.upgrades[12]) player.autoWood=0.01;
    if(player.upgrades[13]) softsCal[0][1]=N(0.72);
    player.treesPerSec=gain;
    for(let i=0;i<softsCal.length;i++){
        let e=document.getElementById("soft"+(i+1))
        if(player.treesPerSec.gt(softsCal[i][0]))e.style.display="block";
        else e.style.display="none";
        gain=gain.softcap(softsCal[i][0],softsCal[i][1],softsCal[i][2]);
        e=document.getElementById("soft"+(i+1)+"Start");
        e.innerHTML=softsCal[i][0];
        e=document.getElementById("soft"+(i+1)+"Effect");
        e.innerHTML=softsCal[i][1];
    }
    for(let i=0;i<softsCal.length;i++){
        
    }
    return gain;
}
function tick(){
    let moneyGain=player.trees.mul(player.treesMoney.mul(3));
    let woodGain=player.trees.mul(N(0.0003).mul(player.treesMoney));
    player.trees=player.trees.add(upgEffect().div(f));
    player.money=player.money.add(moneyGain.mul(player.autoMoney).div(f));
    player.wood=player.wood.add(woodGain.mul(player.autoWood).div(f));
    fixUpgradesColor();
    updateDisplay();
}
function setIdInnerHtml(id, text){
    document.getElementById(id).innerHTML=text;
}
function sellTrees(){
    let moneyGain=player.trees.mul(player.treesMoney.mul(3));
    player.money=player.money.add(moneyGain);
    player.trees=N(0);
}
function makeWood(){
    let woodGain=player.trees.mul(N(0.0003).mul(player.treesMoney));
    player.wood=player.wood.add(woodGain);
    player.trees=N(0);
}
function updateDisplay(){
    let rains=document.getElementsByClassName('rain');
    for(let i=0;i<rains.length;i++)rains[i].style="color:"+getUndulatingColor();
    setIdInnerHtml("treesDisplay",format(player.trees));
    setIdInnerHtml("treesPerSecDisplay",format(upgEffect()));
    setIdInnerHtml("treesPerSecDisplayNS",format(player.treesPerSec));
    setIdInnerHtml("moneyDisplay",format(player.money));
    setIdInnerHtml("moneyGetDisplay",format(player.trees.mul(player.treesMoney.mul(3))));
    setIdInnerHtml("woodDisplay",format(player.wood));
    setIdInnerHtml("woodGetDisplay",format(player.trees.mul(N(0.0001).mul(player.treesMoney))));
    if(upgLookingAt==8) setIdInnerHtml("up8Effect",format(player.wood.gt(0)?player.wood.ln().add(1):1))
}


load();
setInterval(tick,1000/f);

