const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const turnElement = document.getElementById('turn');
canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight) * 0.8;

let cellWidth = canvas.width / 3;
let cellHeight = canvas.height / 3; 
let turn = 'x';
let winner = null;
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

function drawState(){
    for(let i = 0; i < 3; i++){
        for(let j = 0;j < 3; j++){
            if(gameState[i][j] === null){
                return;
            }else{
                if(gameState[i][j] === 'x'){
                    drawX(i,j);
                }else{
                    drawO(i,j);
                }
            }
        }
    }
}

drawGridLine(); // Draw the grid when the script loads

window.addEventListener('resize', () => {
    canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    cellWidth = canvas.width / 3;
    cellHeight = canvas.height / 3;
    drawState();
    drawGridLine();
    drawWinnerLine(checkWinner(), winner);
    
})

function drawX(row, col){
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
}
function drawO(row, col){
    ctx.strokeStyle = 'rgba(0,0,0)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc((col + 0.5) * cellWidth, (row + 0.5) * cellHeight, cellWidth * 0.4, 0, Math.PI * 2);
    ctx.stroke();
}

function drawWinnerLine(arr, winner){
    ctx.strokeStyle = 'rgba(0,0,0)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Start at center of first cell
    ctx.moveTo(
        arr[0][1] * cellWidth + cellWidth / 10,
        arr[0][0] * cellHeight + cellHeight / 10
    );
    // End at center of second cell
    ctx.lineTo(
        arr[1][1] * cellWidth + cellWidth / 2,
        arr[1][0] * cellHeight + cellHeight / 2
    );
    ctx.stroke();
}

function checkWinner(){
    for(let i = 0; i < 3; i++){
        // Check rows
        if(gameState[i][0] && gameState[i][0] === gameState[i][1] && gameState[i][1] === gameState[i][2]){
            winner = gameState[i][0];
            turnElement.textContent = `${gameState[i][0]} wins`;
            return [[i,0],[i,2]];
        }
        // Check columns
        if(gameState[0][i] && gameState[0][i] === gameState[1][i] && gameState[1][i] === gameState[2][i]){
            winner = gameState[0][i];
            turnElement.textContent = `${gameState[0][i]} wins`;
            return [[0,i],[2,i]];
        }
    }
    // Check diagonals
    if(gameState[0][0] && gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]){
        winner = gameState[0][0];
        turnElement.textContent = `${gameState[0][0]} wins`;
        return [[0,0],[2,2]];
    }
    if(gameState[0][2] && gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]){
        winner = gameState[0][2];
        turnElement.textContent = `${gameState[0][2]} wins`;
        return [[2,0],[0,2]];
    }

    return null;
}


 


canvas.addEventListener("click", (e) => {
    if(winner) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellWidth = canvas.width / 3;
    const cellHeight = canvas.height / 3; 

    const row = Math.floor(y / cellHeight);
    const col = Math.floor(x / cellWidth);

    if(gameState[row][col] !== null) {
        return; // Cell already occupied
    }else{
        if(turn === 'x'){
            drawX(row,col);
            turn = 'o';
            turnElement.textContent = "O turn";
            gameState[row][col] = 'x'
        }else{
            drawO(row,col);
            turn = 'x';
            turnElement.textContent = "X turn";
            gameState[row][col] = 'o';
        }
    }
    const winLine = checkWinner();
    if(winner && winLine){
        drawWinnerLine(winLine, winner);
    }
    
});