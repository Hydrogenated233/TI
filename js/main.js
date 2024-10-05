"use strict";
const f=30;
let nowLookAt="page1";
const upgradeEffect=[
    [100,"player.treesPerSec=player.treesPerSec.mul(1.5);"],
    [100,"player.treesPerSec=player.treesPerSec.mul(3);"]
]
function save() {//借鉴的
    localStorage.setItem("tree-inc", formatsave.encode(player));
}
function noneBefore(){
    document.getElementById(nowLookAt).style.display="none";
}
function switchTo(k){
    noneBefore();
    nowLookAt='page'+k;
    document.getElementById(nowLookAt).style.display="block";
}
function load() {//+1
    let loadplayer = localStorage.getItem("tree-inc");
    if(loadplayer != null) {
      let loadplayer = formatsave.decode(localStorage.getItem("tree-inc"));
      transformToE(loadplayer);
      deepCopyProps(loadplayer, player);
    }
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
function deepCopyProps(source,target) {//+2
  for (let key in source) {  
        if (source.hasOwnProperty(key)) {  
            // 如果源对象的属性是对象或数组，则递归复制  
            if ((typeof source[key] === 'object' && !(source[key] instanceof ExpantaNum)) && source[key] !== null) {  
                // 如果目标对象没有这个属性，或者属性是null，则创建一个新的  
                if (!target.hasOwnProperty(key) || target[key] == null || Array.isArray(source[key]) !== Array.isArray(target[key])) {  
                    target[key] = Array.isArray(source[key]) ? [] : {};  
                }  
                // 递归复制属性  
                deepCopyProps(source[key], target[key]);  
            } else {  
                // 如果属性不是对象或数组，则直接复制  
                target[key] = source[key];  
            }  
        }  
    }  
}
function transformToE(object) {//+3
    for(let key in object) {
      if(typeof object[key] === "string" && !new E(object[key]).isNaN()) {
        object[key] = new E(object[key]);
      }
      if(typeof object[key] === "object") {
        transformToE(object[key]);
      }
    }
  }
function hardReset(){
    player={
        trees: N(0),
        treesPerSec: N(1),
        money: N(0),
        upgrades: [0,0]
    };
}
function N(x){
    return new ExpantaNum(x);
}
function buy(id){
    if (player.upgrades[id-1]==0 && player.money>=upgradeEffect[id-1][0] && (player.upgrades[id-2]==1 || id==1)){
        player.upgrades[id-1]=1;
        player.money=player.money.sub(upgradeEffect[id-1][0]);
        eval(upgradeEffect[id-1][1]);
    }
}
function tick(){
    player.trees=player.trees.add(player.treesPerSec.div(f));
    fixUpgradesColor();
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
    money: N(0),
    upgrades: [0,0]
};
var formatsave = {
    encoder: new TextEncoder(),
    decoder: new TextDecoder(),
    startString: 'TreesIncSaveFormat',
    endString: 'EndOfSaveFile',
    steps: [{
        encode: JSON.stringify,
        decode: JSON.parse
      },
      {
        encode: x => formatsave.encoder.encode(x),
        decode: x => formatsave.decoder.decode(x)
      },
      {
        encode: x => pako.deflate(x),
        decode: x => pako.inflate(x)
      },
      {
        encode: x => Array.from(x).map(i => String.fromCharCode(i)).join(""),
        decode: x => Uint8Array.from(Array.from(x).map(i => i.charCodeAt(0)))
      },
      {
        encode: x => btoa(x),
        decode: x => atob(x)
      },
      {
        encode: x => x.replace(/=+$/g, "").replace(/0/g, "0a").replace(/\+/g, "0b").replace(/\//g, "0c"),
        decode: x => x.replace(/0b/g, "+").replace(/0c/g, "/").replace(/0a/g, "0")
      },
      {
        encode: x => formatsave.startString + x + formatsave.endString,
        decode: x => x.slice(formatsave.startString.length, -formatsave.endString.length),
      }
    ],
    encode(s) {
      return this.steps.reduce((x, f) => f.encode(x), s);
    },
    decode(s) {
      return this.steps.reduceRight((x, f) => f.decode(x), s);
    },
}
load();
setInterval(tick,1000/f);
setInterval(save,30000);
