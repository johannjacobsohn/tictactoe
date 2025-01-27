import {isWon, isValidMove, plotBoard, isWonFromMoves} from './utils.js'

const field = [null, null, null, null, null, null, null, null, null]
let currentPlayer = false
const moves = []
while(!isWon(...moves)) {
    let move = Math.floor(Math.random() * 9)
    if(isValidMove(...[...moves, move])) {
        moves.push(move)
        field[move] = currentPlayer
        currentPlayer = !currentPlayer
    }
}

plotBoard(field)
const wonBy = isWonFromMoves(...moves)
console.log("Game won by", typeof wonBy === "boolean" ? wonBy ? "O" : "X" : "nobody")
console.log("Gameplay took", moves.length, "moves")