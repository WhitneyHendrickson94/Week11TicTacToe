//Create variables for players
const Player_X = "X";
const Player_O = "O";

//create array with tile positions on grid
const Winning_Combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//Get HTML Elements with Jquery 
const tiles = $("*[data-cell]");
const gameboard = $("#game-grid");
const gameOverMessage = $("#game-over-message");
const PlayAgain = $("#playAgainButton");
const WinnerText = $("#winner-text");


//create variable for turn
let PlayerOTurn = false;
//Calling function to start game
startGame();
//setting event listener to start game function on the click of the playagain button
(PlayAgain).click(startGame);

//defining what the startGame function shoudl do
function startGame(){
    //remove pieces from tiles once the game is restarted, and removing/readding the event listener
    //this block of code is what is causing this assignment to be incomplete
    //tile.removeClass() is throwing an error as not being a function
    //I have tried to doublec check variable spelling and documentation for jquery - but have 
    //been unable to locate specific documentation on this specific situation
    Array.from(tiles).forEach(tile =>{
       tile.removeClass(Player_X)
       tile.removeClass(Player_O)
       tile.removeEventListener("click", tileClick)
       tile.addEventListener("click", tileClick, { once: true})
    })
//calling hover pieces for the game
    setBoardHoverClass();
//removing the game-over-message from the last game
    gameOverMessage.removeClass("show")
}

//defining what should happen on  a tile click
function tileClick(event){
    const tile = event.target;
    const currentPlayer = PlayerOTurn ? Player_O : Player_X
    placeMark(tile, currentPlayer)
    if (checkWin(currentPlayer)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

//defining what shoudl show in the end of game message as part of the endGame function
function endGame(draw) {
    if (draw) {
        WinnerText = `Cat game! It's a tie!`
    } else {
        WinnerText = `Player ${PlayerOTurn ? Player_O : Player_X} wins!`
    }
    gameOverMessage.addClass('show')
}

//determining what a draw is
function isDraw(){
    return [...tiles].every(tile =>{
        return tile.classList.contains(Player_X) || tile.classList.contains(Player_O)
    })
}

//functionality of placing a mark on the board
function placeMark(tile, currentPlayer) {
    tile.addClass(currentPlayer)
    alert(`It is ${currentPlayer}'s turn!`)
}

//functionality of swapping turns
function swapTurns() {
    PlayerOTurn = !PlayerOTurn
}

//functionality of pieces hovering over board on turn
function setBoardHoverClass() {
    gameboard.removeClass(Player_X)
    gameboard.removeClass(Player_O)
    
    if (PlayerOTurn) {
        gameboard.addClass(Player_O)
    } else {
        gameboard.addClass(Player_X)
    }
}

//functionatliy of checking if there is a winner 
function checkWin(currentPlayer) {
    return Winning_Combos.some(combination => {
        return combinations.every(index => {
            return tiles[index].classList.contains(currentPlayer)
        })
    })
}








