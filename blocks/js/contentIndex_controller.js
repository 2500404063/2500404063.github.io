var loadingCode = "<div class='loadingParent'><div class='spinner-border text-primary' role='status' style='font-size:2rem;width: 5rem;height: 5rem;'></div></div>";

let indexURL = ["~"];
let root = document.body.dataset['root']

function buildContentIndex() {
    //Prepare and render a fixed button.
    var container = document.querySelector("#contentIndex");
    if (indexURL.length > 1) {
        container.innerHTML = "<div class='rounded-1 border list-struct my-1 p-2' onclick='getOutOfNode();'>Go Back</div>\n";
    } else {
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
        } else {
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
    setTimeout(function() {
        document.querySelector("#contentIndex").classList.remove("anim-slide-left");
    }, 400);
}

function getOutOfNode() {
    if (indexURL.length > 1) indexURL.pop();
    document.querySelector("#contentIndex").classList.add("anim-slide-right");
    buildContentIndex();
    setTimeout(function() {
        document.querySelector("#contentIndex").classList.remove("anim-slide-right");
    }, 400);
}

//These are for getting page.
let contentContainer = document.getElementById("contentBody");
let contentRequester = new XMLHttpRequest();
let isBack = true;
window.addEventListener('popstate', function(ev) {
    if (isBack) {
        getDefaultPage();
    } else {
        isBack = true;
    }
}, false)

function getDefaultPage() {
    isBack = false;
    var url = window.location.hash.slice(1).split('_');
    if (url != '') {
        var _indexURL = ['~'];
        var _contentArray = contentArray;
        let i = 0;
        for (i; i < url.length; i++) {
            const element = url[i];
            const key = Object.keys(_contentArray)[element];
            if (key == undefined) {
                break;
            }
            _indexURL.push(key)
            _contentArray = _contentArray[key]
        }
        if (typeof _contentArray == 'string') {
            var pageURL = _contentArray;
            getPage(undefined, pageURL, _indexURL);
        } else if (i < url.length) {
            var pageURL = 'The URL was wrong. Cannot locate passage.';
            getPage(undefined, pageURL, ['~']);
        } else {
            var pageURL = 'The URL was not integral.';
            getPage(undefined, pageURL, ['~']);
        }
    } else {
        _getDefaultPage();
    }
}

function getPage(obj, apageURL, aindexURL) {
    isBack = false;
    var navbar = document.getElementById('navigationBar');
    var _indexURL = aindexURL;
    var _contentArray = contentArray;
    if (apageURL == undefined) {
        _indexURL = Array.from(indexURL);
        _indexURL.push(obj.dataset.tag);
    }

    var navStr = `<a class="label">Home</a>`;
    var location = new Array()
    for (let i = 1; i < _indexURL.length; i++) {
        navStr += `<a> / </a><a class="label">${_indexURL[i]}</a>`
        if (i > 1) {
            _contentArray = _contentArray[_indexURL[i - 1]]
        }
        const element = _indexURL[i];
        var index = 0;
        for (const key in _contentArray) {
            if (key == element) break;
            else index++;
        }
        location.push(index);
    }
    window.location.hash = location.join('_');
    navbar.innerHTML = navStr;


    contentContainer.innerHTML = loadingCode;
    if (document.documentElement.clientWidth < 768) {
        document.getElementById("contentWarp").style.display = 'block';
        document.getElementById("navigation").style.display = 'none';
    }
    document.querySelector("#contentBody").classList.add("anim-tender-show");
    setTimeout(function() {
        document.querySelector("#contentBody").classList.remove("anim-tender-show");
    }, 400);

    var _contentArray = contentArray;
    for (const key in indexURL) {
        if (indexURL[key] != "~") {
            _contentArray = _contentArray[indexURL[key]];
        }
    }
    var pageURL = '';
    if (apageURL != undefined) {
        pageURL = apageURL;
    } else {
        pageURL = _contentArray[obj.dataset.tag];
    }
    //Now we start to GET content.
    contentRequester.open("GET", pageURL, true);
    contentRequester.send();
    contentRequester.onreadystatechange = function() {
        if (contentRequester.readyState == 4 && contentRequester.status == 200) {
            contentContainer.innerHTML = markdownToHtml(contentRequester.responseText);
            decodeHeaders();
            try {
                MathJax.typeset();
            } catch (error) {
                console.log(error);
            }
            var codeBlocks = document.getElementById('contentBody').querySelectorAll('pre code');
            for (const key in codeBlocks) {
                const element = codeBlocks[key];
                hljs.highlightAll();
                hljs.lineNumbersBlock(element, {
                    singleLine: true
                });
            }
        } else if (contentRequester.readyState == 4 && contentRequester.status == 404) {
            contentContainer.innerHTML = `<h1>404 Not Found</h1><p>At: ${Date()}</p><p>Requested: ${pageURL}</p><p>Please contact website administrator</p>`;
        }
    }
}

function _getDefaultPage() {
    isBack = false;
    contentContainer.innerHTML = loadingCode;
    if (document.documentElement.clientWidth < 768) {
        document.getElementById("contentWarp").style.display = 'block';
        document.getElementById("navigation").style.display = 'none';
    }
    document.querySelector("#contentBody").classList.add("anim-tender-show");
    setTimeout(function() {
        document.querySelector("#contentBody").classList.remove("anim-tender-show");
    }, 400);
    var nodeName = "Default Page";
    var pageURL = contentArray[nodeName];
    //Now we start to GET content.
    contentRequester.open("GET", pageURL, true);
    contentRequester.send();
    contentRequester.onreadystatechange = function() {
        if (contentRequester.readyState == 4 && contentRequester.status == 200) {
            contentContainer.innerHTML = markdownToHtml(contentRequester.responseText);
            decodeHeaders();
            try {
                MathJax.typeset();
            } catch (error) {
                console.log(error);
            }
            var codeBlocks = document.querySelectorAll('pre code');
            for (const key in codeBlocks) {
                const element = codeBlocks[key];
                hljs.highlightAll();
                hljs.lineNumbersBlock(element, {
                    singleLine: true
                });
            }
        } else if (contentRequester.readyState == 4 && contentRequester.status == 404) {
            contentContainer.innerHTML = `<h1>404 Not Found</h1><p>At: ${Date()}</p><p>Requested: ${pageURL}</p><p>Please contact website administrator</p>`;
        }
    }
}

var lastClickTime;

function showMenu() {
    clickTime = new Date();
    if (clickTime - lastClickTime < 220) {
        if (document.documentElement.clientWidth < 768) {
            document.getElementById("navigation").style.display = 'block';
            document.getElementById("contentWarp").style.display = 'none';
            document.querySelector("#navigation").classList.add("anim-tender-show");
            setTimeout(function() {
                document.querySelector("#navigation").classList.remove("anim-tender-show");
            }, 400);
        }
    }
    lastClickTime = clickTime;
}