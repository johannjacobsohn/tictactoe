import {isWon, isValidMove, plotBoard, whoWonFromMoves, randomMove, minMaxMove} from './utils.js'

const field = [null, null, null, null, null, null, null, null, null]
let currentPlayer = false
const minMaxPlayer = Math.random() > 0.5
const moves = []
while(!isWon(...moves)) {
    const move = currentPlayer === minMaxPlayer ? minMaxMove(moves, true, currentPlayer) : randomMove(field) 

    if(isValidMove(...[...moves, move])) {
        moves.push(move)
        field[move] = currentPlayer
        currentPlayer = !currentPlayer
    }
}

plotBoard(field)

const wonBy = whoWonFromMoves(...moves)

if (wonBy === null) {
    console.log("Game is a draw")
} else {
    console.log("Game won by", wonBy ? "O" : "X", wonBy === minMaxPlayer ? "(minmax)" : "(random)")
}

console.log("Gameplay took", moves.length, "moves")