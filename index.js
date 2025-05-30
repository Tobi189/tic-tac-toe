const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;

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