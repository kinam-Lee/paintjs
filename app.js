const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

canvas.width = 700; 
canvas.height = 700 ; 

ctx.lineWidth = 2.5; 
ctx.strockStyle = "#060606"; 

let painting = false; 

function stopPainting(){
    painting = false;
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
    }

}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    stopPainting();
}



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}