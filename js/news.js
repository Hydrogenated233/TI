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