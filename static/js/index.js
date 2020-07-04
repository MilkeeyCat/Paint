const canv = document.querySelector("#canvas");
const ctx = canv.getContext("2d");
let isMouseClicked = false;
const color = "#f01";
const lineWidth = 50;
let coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

ctx.fillStyle = color;
ctx.strokeStyle = color;
ctx.lineWidth = lineWidth;

canv.onmousedown = () => {
    isMouseClicked = true;
}
canv.onmouseup = () => {
    isMouseClicked = false;
    ctx.beginPath();
    coords.push(0);
}
canv.addEventListener("mousemove", function(e) {
    if(isMouseClicked) {
        coords.push([e.clientX, e.clientY]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        
    }
});

const clear = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = color;
    ctx.beginPath();
    coords = [];
}

const save = () => {
    localStorage.setItem("coords", JSON.stringify(coords));
}

const replay = () => {
    const crds = JSON.parse(localStorage.getItem("coords"));

    const handler = setInterval(() => {
        if(!crds.length) {
            clearInterval(handler);
            ctx.beginPath();
            return;
        }
        const crd = crds.shift();
        const e = {
            clientX: crd[0],
            clientY: crd[1]
        };  

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

    }, 30);
}

document.addEventListener("keydown", (e) => {
    if(e.key == "c") {
        clear();
    } else if(e.key == "s") {
        save();
    } else if(e.key == "r") {
        clear();
        replay();
    } else if(e.ctrlKey) {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            const editMenu = document.querySelector("#editMenu");
            editMenu.style.display = "block";
        });
    }
});