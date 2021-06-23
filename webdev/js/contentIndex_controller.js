var contentArray = {
    "Default Page": "./pages/default/default.md",
    "list1": {
        "list1_1": {
            "item1_1_1": "./pages/hello/main.md"
        },
        "item1_1": "./pages/hello/main.md",
        "item1_2": "./pages/hello/main.md"
    },
    "list2": {
        "item2_1": "./pages/hello/main.md",
        "item2_2": "./pages/hello/main.md"
    }
};

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
    window.location.hash = "contentBody";
    setTimeout(function () {
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
        document.querySelector("#contentBody").classList.add("anim-tender-show");
        setTimeout(function () {
            document.querySelector("#contentBody").classList.remove("anim-tender-show");
        }, 400);
        contentRequester.open("GET", pageURL, true);
        contentRequester.send();
        contentRequester.onreadystatechange = function () {
            if (contentRequester.readyState == 4 && contentRequester.status == 200) {
                contentContainer.innerHTML = converter.makeHtml(contentRequester.responseText);
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
    }, 120);
}

function getDefaultPage() {
    window.location.hash="contentBody";
    setTimeout(function () {
        var pageURL = "./pages/default/default.md";
        //Now we start to GET content.
        contentRequester.open("GET", pageURL, true);
        contentRequester.send();
        contentRequester.onreadystatechange = function () {
            if (contentRequester.readyState == 4 && contentRequester.status == 200) {
                contentContainer.innerHTML = converter.makeHtml(contentRequester.responseText);
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
    }, 120);
}

var lastClickTime;
function showMenu() {
    clickTime = new Date();
    if (clickTime - lastClickTime < 300) {
        window.location.hash = "";
    }
    lastClickTime = clickTime;
}
