function loaded() {
    setTimeout(function () {
        document.querySelector("#loading").style.display = "none"
    }, 1000);
}

function btn_myself() {
    window.open("./myself/index.html", "_self")
}

function btn_webdev() {
    window.open("./blocks/webdev.html", "_self")
}

function btn_appdev() {
    window.open("./blocks/appdev.html", "_self")
}

function btn_hardware() {
    window.open("./blocks/hardware.html", "_self")
}

function btn_ai() {
    window.open("./blocks/ai.html", "_self")
}

function btn_psyeco() {
    window.open("./blocks/psyeco.html", "_self")
}