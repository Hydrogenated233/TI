const permanentUpg=[6,13,19,34];
function resetUpgAToB(a, b) {
    for (let i = a - 1; i < b; i++)if(!permanentUpg.includes(i+1))player.upgrades[i] = 0;
}
    //进入挑战
function resetResources(a) {
    if (a == 1) { player.trees = N(0); return; }
    if (a == 2) { player.money = N(0); return; }
    if (a == 3) { player.wood = N(0); return; }
}
function resetResourcesUntil(k) {
    for (let i = 1; i <= k; i++)resetResources(i);
}
var ChaReset = [
    [1, 3]
]
var ChaGoals = [
    N(50000)
]
deepFreezeArray(ChaGoals);
deepFreezeArray(ChaReset);
function enterCha(n) {
    player.chaIn = n;
    resetUpgAToB(ChaReset[n - 1][0], player.upgrades.length);
    resetResourcesUntil(ChaReset[n - 1][1]);
}
function exitCha() {
    if (checkComplete()) { player.chas[player.chaIn - 1] = 1; }
    player.chaIn = 0;
}
function checkComplete() {
    if (player.chaIn == 0) return false;
    if (player.trees.gte(ChaGoals[player.chaIn - 1])) return true;
    return false;
}