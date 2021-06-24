# Event System

# Event System

# Event System

## Introduction

## Introduction

## Introduction

### The Event Object

### The Event Object

### The Event Object

#### Events

#### Events

#### Events

##### H5Test

##### H5Test

##### H5Test

###### H6Test

###### H6Test

###### H6Test

> This quote 1

>> This quote 2
>>> This quote 3

**这是加粗** __这也是加粗__  
*这是倾斜* _这也是倾斜_  
***这是加粗倾斜*** ~~这是加删除线~~  

NewLine 1: A new line is br  
NewLine 2: A new line is br  
Paragraph 1: A new paragraph is a label p

Paragraph 2: A new paragraph is a label p

Split Line: the effect is same. label hr  
triple - * _
***

---

___

Unordered List:
* List Content
  + The Second list
  + Just double space before + * -
  + List Content
* List Content
  + The Second list
* List Content

Ordered List:
1. List Content
2. List Content
3. List Content
3. Whatever the number is, the result it same.

表头|表头|表头
---|----|----
内容|内容|内容
内容|内容|内容

`Single Line Code`
```javascript
let contentContainer = document.getElementById("contentBody");
let contentRequester = new XMLHttpRequest();
function getPage(obj) {
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
            contentContainer.innerHTML = converter.makeHtml(contentRequester.responseText);
            var codeBlocks = document.querySelectorAll('pre code');
            for (const key in codeBlocks) {
                const element = codeBlocks[key];
                hljs.highlightBlock(element);
                hljs.lineNumbersBlock(element, {
                    singleLine: true,
                    startFrom: 1
                });
            }
        }
    }
}
```



* [ ] 没选中的复选框
* [x] 选中复选框
- [ ] test
- [x] TETE