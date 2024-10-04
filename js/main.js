"use strict";
const f=30;
let upgrades=[0]
const upgradeEffect=[
    [100,"player.treesPerSec=player.treesPerSec.mul(1.5);"]
]
function saveGame(){
    localStorage.setItem("")
}
function N(x){
    return new ExpantaNum(x);
}
function buy(id){
    if (upgrades[id-1]==0 && player.money>=upgradeEffect[id-1][0]){
        upgrades[id-1]=1;
        document.getElementById("upgrade"+id).classList.add("buyed");
        player.money=player.money.sub(upgradeEffect[id-1][0]);
        eval(upgradeEffect[id-1][1]);
    }
}
function tick(){
    player.trees=player.trees.add(player.treesPerSec.div(f));
    updateDisplay();
}
function setIdInnerHtml(id, text){
    document.getElementById(id).innerHTML=text;
}
function sellTrees(){
    player.money=player.money.add(player.trees.mul(3));
    player.trees=N(0);
}
function updateDisplay(){
    setIdInnerHtml("treesDisplay","你有"+format(player.trees)+"棵树");
    setIdInnerHtml("treesPerSecDisplay","(+"+format(player.treesPerSec)+"/s)");
    setIdInnerHtml("moneyDisplay",format(player.money));
    setIdInnerHtml("moneyGetDisplay",format(player.trees.mul(3)));
}
var player={
    trees: N(0),
    treesPerSec: N(1),
    money: N(0)
};
setInterval(tick,1000/f);
