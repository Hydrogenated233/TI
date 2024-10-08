function deepCopyProps(source,target) {//+1
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
function transformToE(object) {//+1
    for(let key in object) {
    if(typeof object[key] === "string" && !new E(object[key]).isNaN()) {
        object[key] = new E(object[key]);
    }
    if(typeof object[key] === "object") {
        transformToE(object[key]);
    }
    }
}
var formatsave = {//+1
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
function save() {//借鉴的
    addNotify("保存成功");
    localStorage.setItem("tree-inc", formatsave.encode(player));
}
function load() {//+1
    addNotify("加载成功");
    let loadplayer = localStorage.getItem("tree-inc");
    if(loadplayer != null) {
        let loadplayer = formatsave.decode(localStorage.getItem("tree-inc"));
        transformToE(loadplayer);
        deepCopyProps(loadplayer, player);
    }
}
function loadText() {//+1
    var loadplayer=prompt("请输入你的存档：");
    if(loadplayer != null) {;
        localStorage.setItem("tree-inc", loadplayer)
        load();
    }
    addNotify("导入成功");
}
function copyToClipboard(textToCopy) {//+1
    if(document.execCommand('copy')) {
    // 创建textarea
    var textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // 使textarea不在viewport，同时设置不可见
    textArea.style.position = "fixed";
    textArea.style.opacity = 0;
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    addNotify("复制成功");
    return new Promise((res, rej) => {
        // 执行复制命令并移除文本框
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
    });
    } else if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    // navigator clipboard 向剪贴板写文本
    return navigator.clipboard.writeText(textToCopy);
    }
    addNotify("复制失败");
}
function export_copy() {//+1
    save()
    return copyToClipboard(formatsave.encode(player));
} 
setInterval(save,30000);