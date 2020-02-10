const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor"); 
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");


const INITIAL_COLOR = "060606" ; 
const CANVAS_SIZE = 700; 

canvas.width = CANVAS_SIZE; 
canvas.height = CANVAS_SIZE ; 

ctx.strokeStyle = INITIAL_COLOR; 
ctx.lineWidth = 2.5; 


/*
// fillStyle : 캔버스의 배경색을 바꾸는것, strokeStyle : 도형이나 line의 색을 변경하는것
ctx.fillStyle = "green";
ctx.fillRect(0, 0, 50, 70);

ctx.fillStyle = "yellow";
ctx.fillRect(100, 100, 50, 70);
*/

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
    ctx.fillStyle = rgbColor;
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

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); 
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
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