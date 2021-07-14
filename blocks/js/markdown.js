function text_md_onchange() {
    // document.getElementById("result").innerHTML = markdownToHtml(document.getElementById("text_md").value);
    document.getElementById("result").innerText = markdownToHtml(document.getElementById("text_md").value);
}

//For <h1 id='title_1'>...</h1>
let _convertTitleIdCount = 0;
//global labels
let _convertRuntime;

//Only for one complete markdown article.
function markdownToHtml(mdSrc) {
    _convertRuntime = {
        //false: toBeStart
        //true: toBeEnd
        'multiBold': false,
        'multiBoldStartFinished': false,
        'multiItalicized': false,
        'multiItalicizedStartFinished': false,
        //0: no quote
        //1: quote start finished
        //2: wait to be ended
        'quote': 0,
        //0: no ol
        //1: ol start finished
        //2: wait to be ended
        'ol': 0,
        'ul': 0,
        'originalBlock': false,
        'originalSet': new Array(),
        'codeBlock': false,
    };
    _convertTitleIdCount = 0;
    let lines = mdSrc.split(/\n/gm);
    for (let i = 0; i < lines.length; i++) {
        line = lines[i];
        lines[i] = _dispatcher(line);
    }
    let output = '';
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        output += element;
        if (index != lines.length - 1) output += '\n';
    }
    output = _convertOriginal(output);
    return output;
}
function _dispatcher(line) {
    //one sigle line labels
    let containedElements = {
        'title': false,
        'breakLine': false,
        'paragraph': false,
        'bold': false,
        'italicized': false,
        'blockquote': false,
        'ol': false,
        'ul': false,
        'splitLine': false,
        'link': false,
        'img': false,
    };
    line = _originalStart(line);
    line = _convertCodeBlock(line);

    if (!_convertRuntime['codeBlock']) {
        containedElements['title'] = _isContainTitle(line);
        if (containedElements['title']) {
            line = _convertTitle(line);
        }
        containedElements['paragraph'] = _isParagraph(line);
        if (containedElements['paragraph']) {
            line = _convertParagraph(line);
        }
        containedElements['splitLine'] = _isSplitLine(line);
        if (containedElements['splitLine']) {
            line = _convertSplitLine(line);
        }
        containedElements['bold'] = _isBold(line);
        if (containedElements['bold']) {
            line = _convertBold(line);
        }
        containedElements['italicized'] = _isItalicized(line);
        if (containedElements['italicized']) {
            line = _convertItalicized(line);
        }
        containedElements['blockquote'] = _isQuote(line);
        if (containedElements['blockquote']) {
            line = _convertQuote(line);
        }
        containedElements['ol'] = _isOl(line);
        containedElements['ul'] = _isUl(line);
        if (containedElements['ul'] || containedElements['ol']) {
            line = _convertOlUl(line);
        }
        containedElements['img'] = _isImg(line);
        if (containedElements['img']) {
            line = _convertImg(line);
        }
        containedElements['link'] = _isLink(line);
        if (containedElements['link']) {
            line = _convertLink(line);
        }
        containedElements['BreakLine'] = _isBreakLine(line);
        if (containedElements['BreakLine']) {
            line = _convertBreakLine(line);
        }
    }
    return line;
}

function _isContainTitle(line) {
    let pos = line.search(/#/);
    if (pos >= 0) {
        return true;
    }
    else {
        return false;
    }
}

function _isBreakLine(line) {
    //1. does not exist h1
    //2. does not exist <blockquote>
    //3. is not '<p>'
    //4. is not '</p>'
    //5. empty
    //6. [ol / ol]
    //7. in ol
    //8. [ul / ul]
    //9. in ul
    //10. ---
    //11. <img>
    if (line.search(/<h[1-6].*<\/h[1-6]>/) >= 0) {
        return false;
    }
    if (line.search(/(<blockquote>)|(<\/blockquote>)/) >= 0) {
        return false;
    }
    if (line.search('<p>') >= 0 || line.search('</p>') >= 0) {
        return false;
    }
    if (line == '') {
        return false;
    }
    if (line.replace(/\s*/g, '') == '[ol' || line.replace(/\s*/g, '') == 'ol]') {
        return false;
    }
    if (_convertRuntime['ol'] > 0) {
        return false;
    }
    if (line.replace(/\s*/g, '') == '[ul' || line.replace(/\s*/g, '') == 'ul]') {
        return false;
    }
    if (_convertRuntime['ul'] > 0) {
        return false;
    }
    if (line == '---') {
        return false;
    }
    if (line.search('<img') >= 0) {
        return false;
    }
    return true;
}

function _isParagraph(line) {
    if (line == '{' || line == '}') {
        return true;
    } else {
        return false;
    }
}

function _isBold(line) {
    if (line.search(/\*\*\S/) >= 0 && line.search(/\S\*\*/) >= 0) {
        _convertRuntime['multiBold'] = false;
        return true;
    } else if (line.search(/\*\*\S/) >= 0) {
        _convertRuntime['multiBold'] = true;
        return true;
    } else if (line.search(/\S\*\*/) >= 0) {
        return true;
    } else {
        return false;
    }
}

function _isItalicized(line) {
    if (line.search(/[^\*\s]*\*[^\*\s]+/) >= 0 &&
        line.search(/[^\*\s]\*[^\*]*/) >= 0) {
        _convertRuntime['multiItalicized'] = false;
        return true;
    } else if (line.search(/[^\*\s]*\*[^\*\s]+/) >= 0) {
        _convertRuntime['multiItalicized'] = true;
        return true;
    } else if (line.search(/[^\*\s]\*[^\*]*/) >= 0) {
        return true;
    } else {
        return false;
    }
}

function _isQuote(line) {
    if (_convertRuntime['quote'] == 1) {
        if (line.search(/^>\s.*$/) == -1) {
            _convertRuntime['quote'] = 2;
            return true;
        }
    }
    if (line.search(/^>\s.*$/) >= 0) {
        return true;
    } else {
        return false;
    }
}

function _isOl(line) {
    if (line.replace(/\s*/g, "") == '[ol') {
        return true;
    }
    if (line.replace(/\s*/g, "") == 'ol]') {
        return true;
    }
    if (_convertRuntime['ol'] > 0) {
        return true;
    }
    return false;
}

function _isUl(line) {
    if (line.replace(/\s*/g, "") == '[ul') {
        return true;
    }
    if (line.replace(/\s*/g, "") == 'ul]') {
        return true;
    }
    if (_convertRuntime['ul'] > 0) {
        return true;
    }
    return false;
}

function _isSplitLine(line) {
    if (line == '---') {
        return true;
    }
}

function _isLink(line) {
    if (line.search(/\[.*\]\(.*\)/) >= 0) {
        return true;
    } else if (line.search(/\[.*\]new\(.*\)/) >= 0) {
        return true;
    } else {
        return false;
    }
}

function _isImg(line) {
    if (line.search(/!\[.*\]\(.*\)/ >= 0)) {
        return true;
    } else {
        return false;
    }
}

function _originalStart(line) {
    let originalExisted = false;
    let pos0 = -1, pos1 = -1;
    while (true) {
        pos0 = line.search(/\{:.*?:\}/);
        if (pos0 >= 0) {
            pos1 = line.search(/:\}/);
            _convertRuntime['originalSet'].push(line.slice(pos0 + 2, pos1));
            line = line.replace(/\{:.*?:\}/, '{-:WAIT_' + (_convertRuntime['originalSet'].length - 1) + ':-}');
        } else {
            break;
        }
    }
    return line;
}

function _convertTitle(line) {
    //symbol:#/##/###/####/#####/######
    //1. only one line
    //2. only one space before main text
    if (line.search(/^(#{1})\s.*$/) >= 0) {
        return '<h1 id=\'md_h1_' + _convertTitleIdCount++ + '\'>' + line.substr(2, line.length - 2) + '</h1>';
    } else if (line.search(/^(#{2})\s.*$/) >= 0) {
        return '<h2 id=\'md_h2_' + _convertTitleIdCount++ + '\'>' + line.substr(3, line.length - 3) + '</h2>';
    } else if (line.search(/^(#{3})\s.*$/) >= 0) {
        return '<h3 id=\'md_h3_' + _convertTitleIdCount++ + '\'>' + line.substr(4, line.length - 4) + '</h3>';
    } else if (line.search(/^(#{4})\s.*$/) >= 0) {
        return '<h4 id=\'md_h4_' + _convertTitleIdCount++ + '\'>' + line.substr(5, line.length - 5) + '</h4>';
    } else if (line.search(/^(#{5})\s.*$/) >= 0) {
        return '<h5 id=\'md_h5_' + _convertTitleIdCount++ + '\'>' + line.substr(6, line.length - 6) + '</h5>';
    } else if (line.search(/^(#{6})\s.*$/) >= 0) {
        return '<h6 id=\'md_h6_' + _convertTitleIdCount++ + '\'>' + line.substr(7, line.length - 7) + '</h6>';
    } else {
        return "<h1>Markdown convert error: on function _convertTitle(line)</h1>";
    }
}

function _convertParagraph(line) {
    if (line == '{') {
        return '<p>'
    } else if (line == '}') {
        return '</p>'
    } else {
        return '<h1>Markdown convert error: on function _convertParagraph(line)</h1>';
    }
}

function _convertBreakLine(line) {
    return line + '<br>';
}

function _convertBold(line) {
    if (_convertRuntime['multiBold'] == false) {
        while (true) {
            //Single Line
            let start = line.search(/\*\*\S/);
            if (start >= 0) {
                line = line.slice(0, start) + "<strong>" + line.slice(start + 2);
            }
            start = line.search(/\S\*\*/);
            if (start >= 0) {
                line = line.slice(null, start + 1) + "</strong>" + line.slice(start + 3);
            }
            if (start == -1) break;
        }
    } else {
        //Multiple Line
        let start = line.search(/\*\*\S/);
        if (start >= 0 && _convertRuntime['multiBoldStartFinished'] == false) {
            line = line.slice(0, start) + "<strong>" + line.slice(start + 2);
            _convertRuntime['multiBoldStartFinished'] = true;
        }
        start = line.search(/\S\*\*/);
        if (start >= 0) {
            line = line.slice(null, start + 1) + "</strong>" + line.slice(start + 3);
            _convertRuntime['multiBold'] = false;
            _convertRuntime['multiBoldStartFinished'] = false;
        }
    }
    return line;
}

function _convertItalicized(line) {
    if (_convertRuntime['multiItalicized'] == false) {
        while (true) {
            //Single Line
            let start = line.search(/[^\*\s]*\*[^\*\s]+/);
            if (start >= 0) {
                line = line.slice(0, start) + "<em>" + line.slice(start + 1);
            }
            start = line.search(/[^\*\s]\*[^\*]*/);
            if (start >= 0) {
                line = line.slice(null, start + 1) + "</em>" + line.slice(start + 2);
            }
            if (start == -1) break;
        }
    } else {
        //Multiple Line
        let start = line.search(/[^\*]*\*[^\*\s]+/);
        if (start >= 0 && _convertRuntime['multiItalicizedStartFinished'] == false) {
            line = line.slice(0, start) + "<em>" + line.slice(start + 1);
            _convertRuntime['multiItalicizedStartFinished'] = true;
        }
        start = line.search(/[^\*\s]+\*[^\*]*/);
        if (start >= 0) {
            line = line.slice(null, start + 1) + "</em>" + line.slice(start + 2);
            _convertRuntime['multiItalicized'] = false;
            _convertRuntime['multiItalicizedStartFinished'] = false;
        }
    }
    return line;
}

function _convertQuote(line) {
    if (_convertRuntime['quote'] == 0) {
        _convertRuntime['quote'] = 1;
        line = '<blockquote>\n' + line.slice(2) + '<br>';
        return line;
    }
    if (_convertRuntime['quote'] == 1) {
        return line.slice(2);
    }
    if (_convertRuntime['quote'] == 2) {
        _convertRuntime['quote'] = 0;
        return '</blockquote>\n' + line;
    }
}

function _convertOlUl(line) {
    if (line.replace(/\s*/g, "") == '[ul') {
        _convertRuntime['ul']++;
        return '<ul>';
    }
    else if (line.replace(/\s*/g, "") == 'ul]') {
        _convertRuntime['ul']--;
        return '</ul>';
    }
    if (line.replace(/\s*/g, "") == '[ol') {
        _convertRuntime['ol']++;
        return '<ol>';
    }
    else if (line.replace(/\s*/g, "") == 'ol]') {
        _convertRuntime['ol']--;
        return '</ol>';
    } else {
        let wordPos = line.search(/\S/);
        return '<li>' + line.slice(wordPos) + '</li>';
    }
}

function _convertSplitLine(line) {
    return '<hr>';
}

function _convertLink(line) {
    while (true) {
        let pos0 = line.search(/\[.*\]new\(.*\)/);
        if (pos0 >= 0) {
            let pos1 = line.indexOf(']', pos0);
            let pos2 = line.indexOf('(', pos1);
            let pos3 = line.indexOf(')', pos2);
            line = line.slice(0, pos0) + "<a target='_blank' href='" + line.slice(pos2 + 1, pos3) + "'>" + line.slice(pos0 + 1, pos1) + "</a>" + line.slice(pos3 + 1);
        } else if ((pos0 = line.search(/\[.*\]\(.*\)/)) >= 0) {
            let pos1 = line.indexOf(']', pos0);
            let pos2 = line.indexOf('(', pos1);
            let pos3 = line.indexOf(')', pos2);
            line = line.slice(0, pos0) + "<a href='" + line.slice(pos2 + 1, pos3) + "'>" + line.slice(pos0 + 1, pos1) + "</a>" + line.slice(pos3 + 1);
        } else {
            break;
        }
    }
    return line;
}

function _convertImg(line) {
    let pos0 = line.search(/!\[.*\]\(.*\)/);
    if (pos0 >= 0) {
        let pos1 = line.indexOf(']', pos0);
        let pos2 = line.indexOf('(', pos1);
        let pos3 = line.indexOf(')', pos2);
        line = line.slice(0, pos0) + "<img"
            + " src='" + line.slice(pos2 + 1, pos3) + "'"
            + " alt='" + line.slice(pos0 + 2, pos1) + "'"
            + " title='" + line.slice(pos0 + 2, pos1) + "'"
            + ">" + line.slice(pos3 + 1);
    }
    return line;
}

function _convertOriginal(output) {
    for (let i = 0; i < _convertRuntime['originalSet'].length; i++) {
        const element = _convertRuntime['originalSet'][i];
        output = output.replace(RegExp("\{-:WAIT_" + i + ":\-}"), element);
    }
    return output;
}

function _convertCodeBlock(line) {
    if (line.search(/^(```)/) >= 0 && _convertRuntime['codeBlock'] == false) {
        line = '<pre><code>';
        _convertRuntime['codeBlock'] = true;
    } else if (line.search(/^(```)$/) >= 0 && _convertRuntime['codeBlock'] == true) {
        line = '</pre></code>';
        _convertRuntime['codeBlock'] = false;
    }
    if (_convertRuntime['codeBlock']) {
        line = line;
    }
    return line;
}