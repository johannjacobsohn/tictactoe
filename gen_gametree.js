// Generate the entire game tree for Tic Tac Toe
// by brute force going through every possible game
// and storing the results in a tree structure
// The tree structure encodes the game as depth = move, eg. 3rd level = 3rd move
// Index encodes the board field, eg. 0 = top left, 1 = top middle, 2 = top right, etc 
// Alternating levels are alternating players, eg. first level is first played, ie X, second level is second player, ie O, etc
// The end nodes will be the results of the game: false = X wins, true = O wins, or null = draw
//
// Eg, the simples game is 
// X O X
// O X O
// X - -
// would be encoded as 
// {
//   0: {
//       1: {
//           2: {
//               3: {
//                   4: {
//                       5: {
//                           6: false
//                       }
//                   }
//               }
//           }
//       }    
//   } 
// }
//
//
// Fun obvious fact, every complete game of Tic Tac Toe max 9 moves, min 5 moves
// So in theory, the game tree will have 9! nodes, except we stop playing once the game is won

import { isValidMove, isWon } from './utils.js';
import fs from "fs"

const gameTree = {} 

// going through every possible game by brute force
for (let i = 0; i < 9; i++) { // first move, X starts
    gameTree[i] = {}; // create a new node for the first move
    for (let j = 0; j < 9; j++) { // second move
        if (!isValidMove(i, j)) continue
        gameTree[i][j] = {}
        for (let k = 0; k < 9; k++) { // 3rd move
            if (!isValidMove(i, j, k)) continue
            gameTree[i][j][k] = gameTree[i][j][k] || {}
            for (let l = 0; l < 9; l++) { // 4th move
                if (!isValidMove(i, j, k, l)) continue
                gameTree[i][j][k][l] = gameTree[i][j][k][l] || {}

                for (let m = 0; m < 9; m++) { // 5th move
                    if (!isValidMove(i, j, k, l, m)) continue
                    if(isWon(i, j, k, l, m)) {
                        gameTree[i][j][k][l][m] = false
                        continue;
                    }
                    gameTree[i][j][k][l][m] = {}

                    for (let n = 0; n < 9; n++) { // 6th move
                        if (!isValidMove(i, j, k, l, m, n)) continue
                        if (isWon(i, j, k, l, m, n)) {
                            gameTree[i][j][k][l][m][n] = true
                            continue;
                        }
                        gameTree[i][j][k][l][m][n] = {}  

                        for (let o = 0; o < 9; o++) { // 7th move
                            if (!isValidMove(i, j, k, l, m, n, o)) continue
                            if (isWon(i, j, k, l, m, n, o)) {
                                gameTree[i][j][k][l][m][n][o] = false
                                continue;
                            }
                            gameTree[i][j][k][l][m][n][o] = {}

                            for (let p = 0; p < 9; p++) { // 8th move
                                if (!isValidMove(i, j, k, l, m, n, o, p)) continue
                                if (isWon(i, j, k, l, m, n, o, p)) {
                                    gameTree[i][j][k][l][m][n][o][p] = true
                                    continue;
                                }
                                gameTree[i][j][k][l][m][n][o][p] = {}

                                for (let q = 0; q < 9; q++) {  // 9th and final move
                                    if (!isValidMove(i, j, k, l, m, n, o, p, q)) continue

                                    gameTree[i][j][k][l][m][n][o][p][q] = null;

                                    if (isWon(i, j, k, l, m, n, o, p, q)) {
                                        gameTree[i][j][k][l][m][n][o][p][q] = false
                                    }
                                }
                            }                            
                        }
                    }
                }
            }
        }
    }
}

var json = JSON.stringify(gameTree, null, 2);

fs.writeFile('gametree.json', json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
});