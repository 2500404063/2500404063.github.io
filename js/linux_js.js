let console_area = document.getElementById('console_area');
let display_area = document.getElementById('display_area');
let cmd_input = document.getElementById('cmd_input');

function write(text, { color, weight, size }) {
    var a = document.createElement('a');
    var text = document.createTextNode(text);
    a.appendChild(text);
    a.setAttribute('class', '');
    if (color != undefined) a.style.color = color;
    if (weight != undefined) a.style.fontWeight = weight;
    if (size != undefined) a.style.fontSize = size;
    display_area.appendChild(a);
}

function writeln(text, { color, weight, size }) {
    write(text, { color: color, weight: weight, size: size });
    display_area.appendChild(document.createElement('br'));
}


cmd_input.onkeyup = function (ev) {
    key = ev.keyCode;
    if (key == 13) {
        cmd = cmd_input.value;
        cmd_input.value = '';
        shell_caller(cmd);
    }
}

cmd_input.onblur = function (ev) {
    cmd_input.focus();
}


let history_cmds = new Array();

let commands = {
    'help': {
        'path': '/etc/bin/help',
        'description': 'show what commands can use.'
    },
    'cd': {
        'path': '/etc/bin/cd',
        'description': 'to change current directory.'
    },
    'ls': {
        'path': '/etc/bin/ls',
        'description': 'to show files in current directory.'
    },
    'md': {
        'path': '/etc/bin/md',
        'description': 'to open a markdown type file.'
    },
    'echo': {
        'path': '/etc/bin/ls',
        'description': 'to show files in current directory.'
    }
}

function shell_caller(cmd_line) {
    var cmd = cmd_line.match(/^[a-z]+(?=\s?)/);
    if (cmd != null) {
        cmd = cmd[0];
    } else {
        return -1;
    }
    if (commands[cmd] == undefined) {
        writeln('no such command found!', { color: 'red' });
        return -1;
    }
    var parameters = cmd_line.slice(cmd.length + 1);
    if (parameters != '') {
        eval('shell_' + cmd + "('" + parameters + "');");
    } else {
        eval('shell_' + cmd + '();');
    }
}

function getOptions(parameters) {
    parameters = parameters + ' ';
    var options = new Array();
    var t = '';
    for (var i of parameters) {
        if (i != ' ') {
            t = t + i;
        } else {
            if (t != '') {
                options.push(t);
                t = '';
            }
        }
    }
    return options;
}


function hello() {
    writeln("Welcome to Felix's blog.", { size: '48px', weight: 'bold' });
    writeln('', {});
    writeln("Now you are at console window.You can use linux type commands.", { size: '24px', weight: 'bold' });
    writeln("Input <help> to see what commands can be used.", { size: '24px', weight: 'bold' });
}

function shell_help() {
    writeln('Commands you can use: ', {});
    var index = 0;
    for (var i in commands) {
        writeln(index.toString() + '.' + i, {});
        index++;
    }
}

function shell_cd(parameters) {

    console.log(parameters);
}

function shell_echo(parameters) {
    options = getOptions(parameters);
    for (var i of options) {
        writeln(i, {});
    }
}

// Init
{
    hello();
    cmd_input.focus();
}