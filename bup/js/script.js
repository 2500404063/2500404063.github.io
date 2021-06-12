function bgmcontrol1() {
    document.querySelector("#audio_player").src = "./music/可惜我们不会再见了.mp3";
    jumpTo1();
}

function bgmcontrol2() {
    document.querySelector("#audio_player").src = "./music/summertime_sadness.mp3";
}


let speed;
let timer;
let count;
let t1, t2, t3, t4, index = 0, times = 0;
var list;

function jumpTo1() {
    list = document.getElementById("page1").getElementsByClassName("text_out");
    times = list.length;
    t1 = setInterval(() => {
        list[0].classList.replace("text_out", "text_fadein");
        index++;
        if (index == times) {
            index = 0;
            clearInterval(t1);
        }
    }, 2000);
}

function jumpTo2() {
    speed = (document.getElementById("page2").offsetTop - document.documentElement.scrollTop) / 10;
    timer = setInterval(function () {
        if (count <= 10) {
            document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
            count++;
        } else {
            count = 0;
            document.documentElement.scrollTop = document.getElementById("page2").offsetTop;
            clearInterval(timer);
        }
    }, 10);

    list = document.getElementById("page2").getElementsByClassName("text_out");
    times = list.length;
    t2 = setInterval(() => {
        list[0].classList.replace("text_out", "text_fadein");
        index++;
        if (index == times) {
            index = 0;
            clearInterval(t2);
        }
    }, 2000);
}

function jumpTo3() {
    speed = (document.getElementById("page3").offsetTop - document.documentElement.scrollTop) / 10;
    timer = setInterval(function () {
        if (count <= 10) {
            document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
            count++;
        } else {
            count = 0;
            document.documentElement.scrollTop = document.getElementById("page3").offsetTop;
            clearInterval(timer);
        }
    }, 10);

    list = document.getElementById("page3").getElementsByClassName("text_out");
    times = list.length;
    t3 = setInterval(() => {
        list[0].classList.replace("text_out", "text_fadein");
        index++;
        if (index == times) {
            index = 0;
            clearInterval(t3);
        }
    }, 2000);
}

function jumpTo4() {
    bgmcontrol2();
    speed = (document.getElementById("page4").offsetTop - document.documentElement.scrollTop) / 20;
    timer = setInterval(function () {
        if (count <= 20) {
            document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
            count++;
        } else {
            count = 0;
            document.documentElement.scrollTop = document.getElementById("page4").offsetTop;
            clearInterval(timer);
        }
    }, 10);

    list = document.getElementById("page4").getElementsByClassName("text_out");
    times = list.length;
    t4 = setInterval(() => {
        list[0].classList.replace("text_out", "text_fadein");
        index++;
        if (index == times) {
            index = 0;
            clearInterval(t4);
        }
    }, 2000);
}