const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;

let gameState = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function drawGridLine(){

    for(let i = 1; i < 3;i++){
        ctx.strokeStyle = 'rgba(0, 0, 0)';
        ctx.lineWidth = 1; 
        ctx.beginPath();
        ctx.moveTo(canvas.width * i / 3, 0);
        ctx.lineTo(canvas.width * i / 3, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvas.height * i / 3);
        ctx.lineTo(canvas.width, canvas.height * i / 3);
        ctx.stroke();
    }
}

drawGridLine(); // Draw the grid when the script loads

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellWidth = canvas.width / 3;
    const cellHeight = canvas.height / 3; 

    const row = Math.floor(y / cellHeight);
    const col = Math.floor(x / cellWidth);

    // Draw X in the correct cell
    ctx.strokeStyle = 'rgba(0, 0, 0)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(col * cellWidth + cellWidth * 0.1, row * cellHeight + cellHeight * 0.1);
    ctx.lineTo((col + 1) * cellWidth - cellWidth * 0.1, (row + 1) * cellHeight - cellHeight * 0.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(col * cellWidth + cellWidth * 0.1, (row + 1) * cellHeight - cellHeight * 0.1);
    ctx.lineTo((col + 1) * cellWidth - cellWidth * 0.1, row * cellHeight + cellHeight * 0.1);
    ctx.stroke();
});

canvas.addEventListener('resize',()=>{
    canvas.width = window.innerWidth * .8;
    canvas.height = window.innerHeight * .8;
    drawGridLine();
})
function drawX(){}
function drawO(){}