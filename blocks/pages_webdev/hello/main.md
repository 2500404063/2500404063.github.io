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
    contentRequester.onreadystatechange = function() {
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
* [ ] test
* [x] TETE
- 
{[{
方向导数为函数在某一个方向上的导数，具体地，定义xy平面上一点(a, b)以及单位向量$\vec u = (\cos \theta , \sin \theta )$，在曲面z=f(x, y)上，从点(a, b, f(a, b))出发，沿$\vec u = (\cos \theta , \sin \theta )$方向走t单位长度后，函数值z为F(t)=f(a+tcosθ, b+tsinθ)，则点(a, b)处$\vec u = (\cos \theta , \sin \theta )$方向的方向导数为：
}]}

{[{
$$
\begin{aligned} &\left.\frac{d}{d t} f(a+t \cos \theta, b+t \sin \theta)\right|_{t=0} \\=& \lim _{t \rightarrow 0} \frac{f(a+t \cos \theta, b+t \sin \theta) - f(a, b)}{t} \\=& \lim _{t \rightarrow 0} \frac{f(a+t \cos \theta, b+t \sin \theta) - f(a, b+t \sin \theta)}{t} + \lim _{t \rightarrow 0} \frac{f(a, b+t \sin \theta) - f(a, b)}{t} \\=& \frac{\partial}{\partial x} f(a, b) \frac{d x}{d t}+\frac{\partial}{\partial y} f(a, b) \frac{d y}{d t} \\=& f_x (a, b) \cos \theta+ f_y (a, b) \sin \theta \\=&\left(f_x (a, b), f_y (a, b)\right) \cdot(\cos \theta, \sin \theta) \end{aligned}
$$
}]}
