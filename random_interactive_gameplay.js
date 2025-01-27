import readline from 'readline'
import {isWon, isValidMove, plotBoard, whoWonFromMoves, randomMove} from './utils.js'

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
    let move = randomMove(field)

    if(currentPlayer === human){
        plotBoard(field)
        move = parseInt(await ask("Enter a number between 1 and 9: ")) - 1
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

