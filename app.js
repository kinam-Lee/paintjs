const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor"); 
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000000" ;
const INITIAL_BG_COLOR  = "#ffffff"; 
const CANVAS_SIZE = 700; 

canvas.width = CANVAS_SIZE; 
canvas.height = CANVAS_SIZE ; 

ctx.strokeStyle = INITIAL_COLOR; 
ctx.lineWidth = 2.5;
/* 이미지 저장시 default 값이 투명이므로 이에대한 처리를 위한 초기화작업 */ 
ctx.fillStyle = INITIAL_BG_COLOR; 
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

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


function handleContextMenu(event){
    //console.log(event);
    event.preventDefault(); /* 이걸 씀으로서 인해 event.defaultPrevented 값이 true로 변경 - 즉 우클릭 금지*/
}

function handelSaveBtnClick(){
    const imageDataURL = canvas.toDataURL(); // defualut 저장포맷은 png
    //console.log(imageDataURL);
    const link = document.createElement("a");
    link.href = imageDataURL
    link.download = "JSPaint"; 
    //console.log(link);
    link.click();
}   

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
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

if(saveBtn){
    saveBtn.addEventListener("click", handelSaveBtnClick);
}