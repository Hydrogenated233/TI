let texts=[
    {
        text: `你好，这是这个游戏的一个新闻，这也成为了我的一个滚动新闻！`
    },
    {
        text: `点一下获得一棵树(树>10000时可用)`
    },
    {
        get text() {
            return `你有${(1/textslength*100).toFixed(2)}%的概率看到这条新闻`
          }
    },
    {
        text: `你觉得${BigInt(2)**BigInt(1024)}是无限吗？`
    },
    {
        text: `你觉得1.79F308是无限吗？`
    },
    {   
        get text(){
            return `根据AI智能分析，你有${format(player.trees)}棵树。`
        }
    },
    {
        text: `|0'''''1'''''2'''''3'''''4|一把尺子`
    },
    {
        text: `|0'''''1'''''2'''''3'''''3'''''3|一把尺子但<span class="soft">(受硬上限限制)</span>` 
    },
    {
        text: `1+1=${Math.SQRT2}`
    },
    {
        text: `|0'''''1'''''√2'''''√3'''''2'''''√5'''''√6'''''√7'''''2√2'''''3'''''√10'''''√11'''''2√3'''''√13'''''√14'''''√15'''''4|这把尺子<span class="soft">(受软上限限制)</span>`
    },
    {
        text: `好消息，我将会在 5小时|超奇异究临界折算 后更新 超奇异究临界折算(1200% ^10 ^^2) 翻译:${format(N(604661760000000000).tetr(2))}小时`
    },
    {
        text: `授人以渔，不如授人以渔，不如授人以氵渔，不如授人以氵氵渔，不如授人以氵氵氵渔，不如授人以氵氵氵氵渔，不如授人以氵氵氵氵氵渔....——名称把头炸了`
    },
    {
        text: `Giving people fish is not as good as giving people the first fish dimension is not as good as giving people the second fish dimension……——6左爷6`
    },
    {
        text: `授人以鱼，不如授人以渔，不如授人以氵渔，不如授人以氵氵渔，不如授人以氵氵氵渔，不如授人以氵氵氵氵渔，不如授人以氵氵氵氵氵渔，不如授人以氵氵氵氵氵氵渔，不如授人以氵氵氵氵氵氵氵渔，不如授人以鱼度提升，不如授人以鱼度献祭，不如授人以鱼物质星系，不如授人以无限，不如授人以挑战，不如授人以无限挑战，不如授人以永恒，不如受人以永恒挑战，不如授人以时间膨胀。——<sup>01000000a7</sup>`
    },
    {
        text: `我有个问题，站在楼顶往楼下扔一块反物质算不算高空抛物？————seanxlx`
    },
    {
        text: `授人以鱼，不如授人以渔，不如授人以氵渔，不如授人以氵氵渔，不如授人以氵氵氵渔，不如授人以氵氵氵氵渔，不如授人以氵氵氵氵氵渔，不如授人以氵氵氵氵氵氵渔，不如授人以氵氵氵氵氵氵氵渔，不如授人以鱼度提升，不如授人以鱼度献祭，不如授人以鱼物质星系，不如授人以无限，不如授人以挑战，不如授人以无限挑战，不如授人以永恒，不如受人以永恒挑战，不如授人以时间膨胀，不如授人以元鱼，不如授人以元渔，不如授人以元氵渔，不如授人以元氵氵渔，不如授人以元鱼度提升，不如授人以专精研究，不如授人以量子，不如授人以单量子挑战，不如授人以双量子挑战，不如授人以衰变之树，不如授人以大撕裂，不如授人以幽鱼，不如授人以幽鱼光子，不如授人以鱼色实验室，不如授人以希格斯鱼色子，不如授人以现实，不如授人以级别，不如授人以锻体器，不如授人以助推器，不如授人以强化器，不如授人以阶层，不如授人以时间速度，不如授人以黑洞压缩机，不如授人以鱼宙射线，不如授人以四重阶层，不如授人以鱼素阶层，不如授人以超新星，不如授人以鱼子树，不如授人以鱼色子，不如授人以五重阶层，不如授人以费鱼子，不如授人以辐射鱼，不如授人以鱼子，不如授人以鱼度，不如授人以鱼宙弦，不如授人以鱼基定理，不如授人以烚，不如授人以熵，不如授人以鱼子挑战，不如授人以黑暗，不如授人以暗射线，不如授人以黑暗之鱼，不如授人以深渊之鱼，不如授人以六重阶层，不如授人以黑暗狂奔，不如授人以物质，不如授人以加速器，不如授人以降伏器，不如授人以超越级别，不如授人以序数，不如授人以自动点击，不如授人以因子，不如授人以因子转换，不如授人以助推器，不如授人以助推器挑战，不如授人以增幅，不如授人以流形，不如授人以基数，不如授人以黑暗衰减，不如授人以奇点，不如授人以奇点升级，不如授人以ω挑战，不如授人以增幅宇宙，不如授人以分型引擎，不如授人以分型转换，不如授人以分型提升，不如授人以红色鱼料，不如授人以红鱼料收割机，不如授人以红色鱼料机器，不如授人以红色鱼料厂，不如授人以红色鱼料代理，不如授人以红色鱼料星球，不如授人以红色鱼料银河，不如授人以红色鱼料增强剂，不如授人以颜色提升，不如授人以黄色鱼料，不如授人以黄鱼料收割机，不如授人以黄鱼香料机器，不如授人以黄色鱼料厂，不如授人以黄色鱼料代理，不如授人以黄色鱼料星球，不如授人以黄色鱼料银河，不如授人以黄色鱼料增强剂，不如授人以绿色鱼料，不如授人以绿鱼料收割机，不如授人以绿色鱼料机器，不如授人以绿色鱼料厂，不如授人以绿色鱼料代理，不如授人以绿色鱼料星球，不如授人以绿色鱼料银河，不如授人以绿色鱼料增强剂，不如授人以蓝色鱼料，不如授人以蓝鱼料收割机，不如授人以蓝色鱼料机器，不如授人以蓝色鱼料厂，不如授人以蓝色鱼料代理，不如授人以蓝色鱼料星球，不如授人以蓝色鱼料银河，不如授人以蓝色鱼料增强剂，不如授人以紫色鱼料，不如授人以紫鱼料收割机，不如授人以紫色鱼料机器，不如授人以紫色鱼料厂，不如授人以紫色鱼料代理，不如授人以紫色鱼料星球，不如授人以紫色鱼料银河，不如授人以紫色鱼料增强剂，不如授人以声望，不如授人以彩色鱼料，不如授人以鱼料升级，不如授人以结晶鱼料，不如授人以结晶升级，不如授人以 Ansuz 符文，不如授人以 Jera 符文，不如授人以 Raido 符文，不如授人以 Othala 符文，不如授人以提升升级，不如授人以转生挑战，不如授人以奥术鱼料，不如授人以奥术鱼料雕文，不如授人以奥术鱼料法术书，不如授人以奥术鱼料向导，不如授人以奥术鱼料神殿，不如授人以奥术鱼料崇拜，不如授人以奥术鱼料之神，不如授人以奥术鱼料强化剂，不如授人以奥术附魔，不如授人以经验，不如授人以养鱼经验增幅，不如授人以自动点击养鱼经验，不如授人以养鱼经验转生，不如授人以转生点，不如授人以转生点升级，不如授人以养鱼经验涨落，不如授人以养鱼经验系数，不如授人以养鱼经验通量，不如授人以养鱼经验电池，不如授人以重启，不如授人以瓦特，不如授人以发电机特权，不如授人以挑战，不如授人以反应堆，不如授人以氢，不如授人以氦，不如授人以核反应堆核心，不如授人以渔子，不如授人以光子，不如授人以棱镜，不如授人以渔子升级，不如授人以重力井，不如授人以暗物质，不如授人以暗之升级，不如授人以欧米伽驱动，不如授人以欧米伽等级，不如授人以鱼分，不如授人以鱼文知识，不如授人以养鱼经验点数，不如授人以养鱼感悟，不如授人以黄金鱼，不如授人以养鱼树，不如授人以英鱼知识，不如授人以英鱼网格。——happyrourou436`
    },
    {
        text: `这个游戏会有超奇异究临界折算吗？等我写到49个资源就能有。`
    },
    {
        text: `质量增量重制版NG+5: 夸克超奇异究临界元折算(7.5e-102930129% ^12 ^^3)开始次数为1。`
    },
    {
        text: `对，但《原》米研新开世游。游在“提”幻世，这，神选将授“眼”，引元力。你演“旅”，旅中邂逅性能异伴，击敌，找散亲。`
    },
    {
        text: `这条新闻是由第一新闻维度生成的，第一新闻维度是由第二新闻维度生成的...，当你有1.79e308条新闻时，你可以获得一个无限新闻。`
    }
]
let textslength = texts.length;
function news(){
    let rand = Math.floor(Math.random() * textslength)
    let e = document.getElementById("newsText")
    let msg = texts[rand].text;
    e.innerHTML = msg
    let textWidth = e.clientWidth;
    let parentWidth = e.parentElement.clientWidth;
    e.style.transition = '';
    e.style.transform = 'translateX(' + (parentWidth + 10) + 'px)';
    let dist = parentWidth + e.clientWidth
    let rate = 100;
    let transformDuration = dist / rate;
    e.style.transition = 'transform ' + transformDuration + 's linear';
    e.style.transform = 'translateX(-' + (textWidth) + 'px)';
    e.addEventListener('transitionend', onNewsEnd)
  }
var onNewsEnd = () => {
    let e = document.getElementById("newsText")
    e.removeEventListener('transitionend', onNewsEnd)
    setTimeout(news, 1000)
}
news()