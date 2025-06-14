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
let starterChosen = false; // Add this flag

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
        for(let j = 0; j < 3; j++){
            if(gameState[i][j] === 'x'){
                drawX(i, j);
            } else if(gameState[i][j] === 'o'){
                drawO(i, j);
            }
        }
    }
}

drawGridLine(); // Draw the grid when the script loads

window.addEventListener('resize', () => {
    canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    cellWidth = canvas.width / 3;
    cellHeight = canvas.height / 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridLine();
    drawState();
    if (winner) {
        // Redraw winner text and line
        const winLine = checkWinner(); // This will also redraw the text
        if (winLine) drawWinnerLine(winLine, winner);
    } else if (!starterChosen) {
        drawStarterButtons();
    }
})

function drawX(row, col){
    ctx.strokeStyle = 'rgba(0, 0, 0)';
    ctx.lineWidth = 8;
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
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc((col + 0.5) * cellWidth, (row + 0.5) * cellHeight, cellWidth * 0.4, 0, Math.PI * 2);
    ctx.stroke();
}

function drawWinnerLine(arr, winner){
    row1 = arr[0][0];
    col1 = arr[0][1];

    row2 = arr[1][0];
    col2 = arr[1][1];

    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.lineWidth = 15;
    ctx.beginPath();

    if(row1 == 0 &&  col1 == 0 && row2 == 2 && col2 == 2){
        ctx.moveTo(0.05 * cellWidth, 0.05 * cellHeight);
        ctx.lineTo(2.95 * cellWidth, 2.95 * cellHeight);
    }else if(row1 == 2 && col1 == 0 && row2 == 0 && col2 == 2){
        ctx.moveTo(0.05 * cellWidth, 2.95 * cellHeight);
        ctx.lineTo(2.95 * cellWidth, 0.05 * cellHeight);
    }else if(col1 === 0 && col2 === 2){
        ctx.moveTo(col1 * cellWidth + cellWidth * 0.05, row1 * cellHeight + cellHeight * 0.5);
        ctx.lineTo(col2 * cellWidth + cellWidth * 0.95, row2 * cellHeight + cellHeight * 0.5);
    }else if(row1 === 0 && row2 === 2){
        ctx.moveTo(col1 * cellWidth + cellWidth * 0.5, row1 * cellHeight + 0.05 * cellHeight);
        ctx.lineTo(col2 * cellWidth + cellWidth * 0.5, row2 * cellHeight + 0.95 * cellHeight);
    }

    ctx.stroke();
}

function checkWinner(){
    for(let i = 0; i < 3; i++){
        // Check rows
        if(gameState[i][0] && gameState[i][0] === gameState[i][1] && gameState[i][1] === gameState[i][2]){
            winner = gameState[i][0];
            turnElement.textContent = 'Game Over!';
            return [[i,0],[i,2]];
        }
        // Check columns
        if(gameState[0][i] && gameState[0][i] === gameState[1][i] && gameState[1][i] === gameState[2][i]){
            winner = gameState[0][i];
            turnElement.textContent = 'Game Over!';
            return [[0,i],[2,i]];
        }
    }
    // Check diagonals
    if(gameState[0][0] && gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]){
        winner = gameState[0][0];
        turnElement.textContent = 'Game Over!';
        return [[0,0],[2,2]];
    }
    if(gameState[0][2] && gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]){
        winner = gameState[0][2];
        turnElement.textContent = 'Game Over!';
        return [[0,2],[2,0]];
    }
    return null;
}

// In your click handler:
const winLine = checkWinner();
if(winner && winLine){
    drawWinnerLine(winLine, winner);
    // Draw winner text
    const fontsize = canvas.height * 0.1;
    ctx.font = `${fontsize}px Arial`;
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(`${winner} is the winner!`, canvas.width / 2, canvas.height / 2);
    // Draw reset button
    drawResetButton();
}

function resetGame(){
    gameState = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    
    winner = null;
    turn = 'x';
    starterChosen = false;
    turnElement.textContent = "X turn";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridLine();
    drawStarterButtons(); // <--- draw at reset
}

function drawResetButton() {
    const btnWidth = canvas.width * 0.3;
    const btnHeight = canvas.height * 0.1;
    const btnX = (canvas.width - btnWidth) / 2;
    const btnY = canvas.height / 2 + canvas.height * 0.08;

    // Draw button background
    ctx.fillStyle = '#1976d2';
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);

    // Draw button text
    ctx.font = `${btnHeight * 0.5}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Reset', canvas.width / 2, btnY + btnHeight / 2);

    // Store for click detection
    window.resetBtnBounds = { x: btnX, y: btnY, width: btnWidth, height: btnHeight };
}

function drawStarterButtons() {
    const Width = canvas.width * 0.7;
    const Height = canvas.height * 0.12;
    const X = canvas.width / 2 - Width / 2;
    const Y = canvas.height / 2 - Height * 1.5;

    // Background
    ctx.fillStyle = '#1976d2';
    ctx.fillRect(X, Y, Width, Height);

    // Text
    ctx.font = `${Height * 0.5}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Choose the first player:', canvas.width / 2, Y + Height / 2);

    // X Button
    const btnWidth = Width * 0.4;
    const btnHeight = Height * 0.9;
    const btnX = canvas.width / 2 - btnWidth - 10;
    const btnY = Y + Height + 20;
    ctx.fillStyle = '#388e3c';
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
    ctx.font = `${btnHeight * 0.6}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.fillText('X', btnX + btnWidth / 2, btnY + btnHeight / 2);

    // O Button
    const btnOX = canvas.width / 2 + 10;
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(btnOX, btnY, btnWidth, btnHeight);
    ctx.font = `${btnHeight * 0.6}px Arial`;
    ctx.fillStyle = '#fff';
    ctx.fillText('O', btnOX + btnWidth / 2, btnY + btnHeight / 2);

    // Store bounds for click detection
    window.starterBtnBounds = {
        x: { x: btnX, y: btnY, w: btnWidth, h: btnHeight },
        o: { x: btnOX, y: btnY, w: btnWidth, h: btnHeight }
    };
}

// At the end of resetGame, draw the starter buttons:
function resetGame(){
    gameState = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    winner = null;
    turn = 'x';
    starterChosen = false;
    turnElement.textContent = "X turn";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridLine();
    drawStarterButtons(); // <--- draw at reset
}

// On initial load, show starter buttons
drawGridLine();
drawStarterButtons();

// Update your click handler:
canvas.addEventListener("click", (e) => {
    // Starter selection
    if (!starterChosen && window.starterBtnBounds) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const bx = window.starterBtnBounds.x;
        const bo = window.starterBtnBounds.o;
        if (x >= bx.x && x <= bx.x + bx.w && y >= bx.y && y <= bx.y + bx.h) {
            turn = 'x';
            turnElement.textContent = "X turn";
            starterChosen = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGridLine();
            drawState();
            return;
        }
        if (x >= bo.x && x <= bo.x + bo.w && y >= bo.y && y <= bo.y + bo.h) {
            turn = 'o';
            turnElement.textContent = "O turn";
            starterChosen = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGridLine();
            drawState();
            return;
        }
        return; // Don't allow board play until starter chosen
    }

    // Check if reset button was clicked (always allow this)
    if (winner && window.resetBtnBounds) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { x: bx, y: by, width: bw, height: bh } = window.resetBtnBounds;
        if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
            resetGame();
            window.resetBtnBounds = null;
            return;
        }
    }

    if(!starterChosen) return; // Don't allow play until starter chosen
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
        // Draw winner text last so it appears on top
        const fontsize = canvas.height * 0.1;
        ctx.font = `${fontsize}px Arial`;
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(`${winner} is the winner!`, canvas.width / 2, canvas.height / 2);
        // Draw reset button
        drawResetButton();
    }
});

// Also, in your resize handler, redraw the starter buttons if needed:
window.addEventListener('resize', () => {
    canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    cellWidth = canvas.width / 3;
    cellHeight = canvas.height / 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridLine();
    drawState();
    if (!starterChosen) {
        drawStarterButtons();
    } else if (winner) {
        const winLine = checkWinner();
        if (winLine) drawWinnerLine(winLine, winner);
        const fontsize = canvas.height * 0.1;
        ctx.font = `${fontsize}px Arial`;
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(`${winner} is the winner!`, canvas.width / 2, canvas.height / 2);
        drawResetButton();
    }
});