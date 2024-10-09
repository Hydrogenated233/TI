"use strict";
var notify = document.getElementById('notify');
let upgLookingAt=0;
hideNotify();
const f=30;
let nowLookAt="page1";
const upgradeEffect=[
    [N(100),"$"],
    [N(100),"$"],
    [N(500),"$"],
    [N(2500),"$"],
    [N(2500),"$"],
    [N(10000),"$"],
    [N(10),"木板"],
    [N(30),"木板"]
]
//填充文字

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
    wood: N(0)
};
function hardReset(){
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
        wood: N(0)
    };
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
        "加强机器<br>*1+ln(木板)<br>*"+"<span id='up8Effect'>"+"</span>"+"<br><span id='upgrade8Cost'></span>",
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
function getGain(){
  let gain=N(1);
  player.treesMoney=N(1);
  if(player.upgrades[0]) gain=gain.mul(1.5);
  if(player.upgrades[1]) gain=gain.mul(3);
  if(player.upgrades[2]) gain=gain.mul(5);
  if(player.upgrades[3]) gain=gain.mul(10);
  if(player.upgrades[4]) gain=gain.mul(5);
  if(player.upgrades[5]) player.autoMoney=0.1;
  if(player.upgrades[6]) player.treesMoney=player.treesMoney.mul(2);
  if(player.upgrades[7]) gain=gain.mul(player.wood.ln().add(1))
  return gain;
}
function tick(){
    let moneyGain=player.trees.mul(player.treesMoney.mul(3));
    player.trees=player.trees.add(getGain().div(f));
    player.money=player.money.add(moneyGain.mul(player.autoMoney).div(f));
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
    let woodGain=player.trees.mul(N(0.0001).mul(player.treesMoney));
    player.wood=player.wood.add(woodGain);
    player.trees=N(0);
}
function updateDisplay(){
    setIdInnerHtml("treesDisplay","你有"+format(player.trees)+"棵树");
    setIdInnerHtml("treesPerSecDisplay","(+"+format(getGain())+"/s)");
    setIdInnerHtml("moneyDisplay",format(player.money));
    setIdInnerHtml("moneyGetDisplay",format(player.trees.mul(player.treesMoney.mul(3))));
    setIdInnerHtml("woodDisplay",format(player.wood));
    setIdInnerHtml("woodGetDisplay",format(player.trees.mul(N(0.0001).mul(player.treesMoney))));
    if(upgLookingAt==8) setIdInnerHtml("up8Effect",format(player.wood.gt(0)?player.wood.ln().add(1):1))
}


load();
setInterval(tick,1000/f);

