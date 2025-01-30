import readline from 'readline'
import {isWon, isValidMove, plotBoard, whoWonFromMoves, randomMove, minMaxMove} from './utils.js'

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const field = new Array(9).fill(null)
const moves = []

const answer = await ask("Do you want to play as X? (y/n)")
const human = answer !== "y" 

let currentPlayer = false
while(!isWon(...moves)) {
    let move

    if(currentPlayer === human){
        plotBoard(field)
        console.log('Minmax recommends:', minMaxMove(moves, false, currentPlayer) + 1)
        move = parseInt(await ask("Enter a number between 1 and 9: ")) - 1
    } else {
        move = minMaxMove(moves, true, currentPlayer)
    }
    if(isValidMove(...[...moves, move])) {
        moves.push(move)
        field[move] = currentPlayer
        currentPlayer = !currentPlayer
    }
}

plotBoard(field)
const wonBy = whoWonFromMoves(...moves)
console.log("Game won by", typeof wonBy === "boolean" ? wonBy ? "O" : "X" : "nobody")
console.log("Gameplay took", moves.length, "moves")
process.exit(0);

