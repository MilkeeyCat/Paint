const canv = document.querySelector("#canvas");
const ctx = canv.getContext("2d");
let isMouseClicked = false;
let color = "#000";
let lineWidth = 50;
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
        coords.push([e.clientX, e.clientY, ctx.fillStyle]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, lineWidth / 2, 0, Math.PI * 2);
        // ctx.arc(e.clientX, e.clientY, lineWidth / 2, 0, Math.PI * 2);
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
        const color = crd[2];

        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        
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
    }
});
document.addEventListener("contextmenu", () => {
    window.event.preventDefault();
    const editMenu = document.querySelector("#penMenu");
    const input = editMenu.querySelector("input[type='range']");
    const svgCircle = editMenu.querySelector("svg > circle");
    const colorValue = editMenu.querySelector(".hex > input[type='text']");
    let mouseDown = false;
    
    editMenu.onmousedown = () => {
        color = colorValue.value;
        console.log(color);
        svgCircle.setAttribute("fill", color);
        editMenu.onmousemove = () => {
            color = colorValue.value;
            svgCircle.setAttribute("fill", color);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;    
        }   
    }
    
    editMenu.onmouseup = () => {
        mouseDown = false;
    }
    
    svgCircle.setAttribute("r", lineWidth/2);
    
    input.oninput = (e) => {
        lineWidth = input.value;
        svgCircle.setAttribute("r", lineWidth/2);
        ctx.lineWidth = lineWidth;
    }
    
    editMenu.style.top = window.event.clientY + "px";
    editMenu.style.left = window.event.clientX + "px";
    editMenu.style.display = "flex";
    
    this.onmousedown =  function(e){
        if(e.target != editMenu && !editMenu.contains(e.target)) {
            editMenu.style.display = "none";
        }
    }
});