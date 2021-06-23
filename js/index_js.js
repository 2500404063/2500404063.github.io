function loaded() {
    setTimeout(function(){
        document.querySelector("#loading").style.display = "none"
    },1000);
}

function btn_myself(){
    window.open("./myself/index.html","_blank")
}

function btn_webdev(){
    window.open("./webdev/index.html","_blank")
}