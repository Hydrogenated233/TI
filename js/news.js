let texts=[
    {
        text: "你好，这是这个游戏的一个新闻，这也成为了我的一个滚动新闻！"
    },
    {
        text: "点一下获得一棵树(树>10000时可用)"
    },
    {
        get text() {
            return `你有${(1/textslength*100).toFixed(2)}%的概率看到这条新闻`
          }
    },
    {
        text: `你觉得${BigInt(2)**BigInt(1024)}是无限吗？`
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