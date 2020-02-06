const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor"); 
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700; 
canvas.height = 700 ; 

ctx.lineWidth = 2.5; 
ctx.strokeStyle = "#060606"; 

let painting = false; 
let filling = false; 

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //console.log(event) ; 
    const x = event.offsetX; 
    const y = event.offsetY;


    if(!painting){
        ctx.beginPath();    
        ctx.moveTo(x, y);
        // console.log("path 생성-", x, y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke()
        // console.log("line 생성-", x, y)
        //console.log("strokeColor", ctx.strokeStyle);
    }

}


function onMouseUp(event){
    stopPainting();
}

function handleColorClick(event){
    // 아래 로그에 찍히는 많은 속성중 background 속성의 값을 활용한다. 
    //console.log(event.target.style); 
    const rgbColor = event.target.style.backgroundColor;
    //console.log(rgbColor);
    ctx.strokeStyle = rgbColor;
    //console.log(ctx.strokeStyle);
}

function handelRangeChange(event){
    //console.log(event.target.value);
    ctx.lineWidth = event.target.value; 

}

function handleModeClick(event){
    if(filling == true){
        filling = false; 
        mode.innerText = "FILL"; 
    }else{
        filling = true; 
        mode.innerText = "Paint";
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

//console.log(Array.from(colors));
//console.log(colors);

if(colors){
    Array.from(colors).forEach(colorTemp => colorTemp.addEventListener("click", handleColorClick));
}

if(range){
    range.addEventListener("input", handelRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}