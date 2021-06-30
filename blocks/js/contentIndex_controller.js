// var contentArray = {
//     "Default Page": "./pages/default/default.md",
//     "Html": {
//         "Elements": {
//             "item1_1_1": "./pages/hello/main.md"
//         },
//         "item1_1": "./pages/hello/main.md",
//     },
//     "list2": {
//         "item2_1": "./pages/hello/main.md",
//         "item2_2": "./pages/hello/main.md"
//     }
// };
// Code above will be defined in different blocks' pages folder.

var loadingCode = "<div class='loadingParent'><div class='spinner-border text-primary' role='status' style='font-size:2rem;width: 5rem;height: 5rem;'></div></div>";

let indexURL = ["~"];

function buildContentIndex() {
    //Prepare and render a fixed button.
    var container = document.querySelector("#contentIndex");
    if (indexURL.length > 1) {
        container.innerHTML = "<div class='rounded-1 border list-struct my-1 p-2' onclick='getOutOfNode();'>Go Back</div>\n";
    }
    else {
        container.innerHTML = "<div class='rounded-1 border list-struct my-1 p-2' onclick='getOutOfNode();'>Home Now</div>\n";
    }
    //Start to analyse URL
    var _contentArray = contentArray;
    for (const key in indexURL) {
        if (indexURL[key] != "~") {
            _contentArray = _contentArray[indexURL[key]];
        }
    }
    //Start to build and render structure.
    for (const v in _contentArray) {
        if (typeof _contentArray[v] != "string") {
            container.innerHTML +=
                "<div class='rounded-1 border list-struct my-1 p-2' onclick='getIntoNode(this);' data-tag='" + v + "'>" +
                v + " →" +
                "</div>\n";
        }
        else {
            container.innerHTML +=
                "<div class='rounded-1 border list-struct my-1 p-2' onclick='getPage(this);' data-tag='" + v + "'>" +
                v +
                "</div>\n";
        }
        //Many symbols for choosing: ←→  ⇠⇢  ⇨⇦  ⬅➡
    }
}

function getIntoNode(obj) {
    var nodeName = obj.dataset.tag;
    indexURL.push(nodeName);
    document.querySelector("#contentIndex").classList.add("anim-slide-left");
    buildContentIndex();
    setTimeout(function () {
        document.querySelector("#contentIndex").classList.remove("anim-slide-left");
    }, 400);
}

function getOutOfNode() {
    if (indexURL.length > 1) indexURL.pop();
    document.querySelector("#contentIndex").classList.add("anim-slide-right");
    buildContentIndex();
    setTimeout(function () {
        document.querySelector("#contentIndex").classList.remove("anim-slide-right");
    }, 400);
}

//These are for getting page.
let contentContainer = document.getElementById("contentBody");
let contentRequester = new XMLHttpRequest();
function getPage(obj) {
    contentContainer.innerHTML = loadingCode;
    if (document.documentElement.clientWidth < 768) {
        document.getElementById("contentWarp").style.display = 'block';
        document.getElementById("navigation").style.display = 'none';
    }
    document.querySelector("#contentBody").classList.add("anim-tender-show");
    setTimeout(function () {
        document.querySelector("#contentBody").classList.remove("anim-tender-show");
    }, 400);
    // var contentContainer = window.frames[0].document.getElementById("contentBody");
    var nodeName = obj.dataset.tag;
    var _contentArray = contentArray;
    for (const key in indexURL) {
        if (indexURL[key] != "~") {
            _contentArray = _contentArray[indexURL[key]];
        }
    }
    var pageURL = _contentArray[nodeName];
    //Now we start to GET content.
    contentRequester.open("GET", pageURL, true);
    contentRequester.send();
    contentRequester.onreadystatechange = function () {
        if (contentRequester.readyState == 4 && contentRequester.status == 200) {
            contentContainer.innerHTML = getMathJaxMarkDown(contentRequester.responseText);
            MathJax.typeset();
            contentContainer.innerHTML = converter.makeHtml(contentContainer.innerHTML);
            var codeBlocks = document.querySelectorAll('pre code');
            for (const key in codeBlocks) {
                const element = codeBlocks[key];
                hljs.highlightAll();
                hljs.lineNumbersBlock(element, {
                    singleLine: true
                });
            }
        }
    }
}

function getDefaultPage() {
    contentContainer.innerHTML = loadingCode;
    if (document.documentElement.clientWidth < 768) {
        document.getElementById("contentWarp").style.display = 'block';
        document.getElementById("navigation").style.display = 'none';
    }
    document.querySelector("#contentBody").classList.add("anim-tender-show");
    setTimeout(function () {
        document.querySelector("#contentBody").classList.remove("anim-tender-show");
    }, 400);
    // var contentContainer = window.frames[0].document.getElementById("contentBody");
    var nodeName = "Default Page";
    var pageURL = contentArray[nodeName];
    //Now we start to GET content.
    contentRequester.open("GET", pageURL, true);
    contentRequester.send();
    contentRequester.onreadystatechange = function () {
        if (contentRequester.readyState == 4 && contentRequester.status == 200) {
            contentContainer.innerHTML = getMathJaxMarkDown(contentRequester.responseText);
            MathJax.typeset();
            contentContainer.innerHTML = converter.makeHtml(contentContainer.innerHTML);
            var codeBlocks = document.querySelectorAll('pre code');
            for (const key in codeBlocks) {
                const element = codeBlocks[key];
                hljs.highlightAll();
                hljs.lineNumbersBlock(element, {
                    singleLine: true
                });
            }
        }
    }
}

var lastClickTime;
function showMenu() {
    clickTime = new Date();
    if (clickTime - lastClickTime < 300) {
        if (document.documentElement.clientWidth < 768) {
            document.getElementById("navigation").style.display = 'block';
            document.getElementById("contentWarp").style.display = 'none';
            document.querySelector("#navigation").classList.add("anim-tender-show");
            setTimeout(function () {
                document.querySelector("#navigation").classList.remove("anim-tender-show");
            }, 400);
        }
    }
    lastClickTime = clickTime;
}

function getMathJaxMarkDown(str) {
    var mathlist = new Array();
    var count = 0;
    var start = -1, end = -1;
    var operation = str;
    while ((start = operation.search(/\{\[\{[\s\S]*?\}\]\}/ig)) >= 0) {
        end = operation.search(/\}\]\}/ig);
        mathlist.push(operation.slice(start + 3, end));
        operation = operation.replace(/\{\[\{[\s\S]*?\}\]\}/, "{^{" + count + "}^}");
        count++;
    }
    operation = converter.makeHtml(operation);
    for (let index = 0; index < mathlist.length; index++) {
        const element = mathlist[index];
        operation = operation.replace("{^{" + index + "}^}", element);
    }
    return operation;
}