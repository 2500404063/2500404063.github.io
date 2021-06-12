document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, { passive: false });

function bgmcontrol1() {
    document.querySelector("#audio_player").src = "./music/可惜我们不会再见了.mp3";
    document.querySelector("#audio_player").play();
    jumpTo1();
}

function bgmcontrol2() {
    document.querySelector("#audio_player").src = "./music/summertime_sadness.mp3";
    document.querySelector("#audio_player").play();
}


let speed;
let timer;
let count;
let t1, t2, t3, t4, index = 0, times = 0;
var list;
function jumpTo1() {
    window.location.hash = "page1";
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
    window.location.hash = "page2";
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
    window.location.hash = "page3";
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
    window.location.hash = "page4";
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