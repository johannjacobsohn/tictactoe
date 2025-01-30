import gametree from "./gametree.json"  with { type: "json" };

export function whoWon(fields) {
    // check rows
    if(typeof fields[0] === "boolean" && fields[0] === fields[1] && fields[1] === fields[2]) return fields[0]
    if(typeof fields[3] === "boolean" && fields[3] === fields[4] && fields[4] === fields[5]) return fields[3]
    if(typeof fields[6] === "boolean" && fields[6] === fields[7] && fields[7] === fields[8]) return fields[6]

    // check columns
    if(typeof fields[0] === "boolean" && fields[0] === fields[3] && fields[3] === fields[6]) return fields[0]
    if(typeof fields[1] === "boolean" && fields[1] === fields[4] && fields[4] === fields[7]) return fields[1]
    if(typeof fields[2] === "boolean" && fields[2] === fields[5] && fields[5] === fields[8]) return fields[2]

    // check diagonals
    if(typeof fields[0] === "boolean" && fields[0] === fields[4] && fields[4] === fields[8]) return fields[0]
    if(typeof fields[2] === "boolean" && fields[2] === fields[4] && fields[4] === fields[6]) return fields[2]

    return null // draw
}

export function state2Char(state, number) {
    if(state === null) return number + 1
    if(state === false) return 'X'
    if(state === true) return 'O'
}

export function plotBoard(fields) {
    console.log(state2Char(fields[0], 0), state2Char(fields[1], 1), state2Char(fields[2], 2))
    console.log(state2Char(fields[3], 3), state2Char(fields[4], 4), state2Char(fields[5], 5))
    console.log(state2Char(fields[6], 6), state2Char(fields[7], 7), state2Char(fields[8], 8))
}

export function whoWonFromMoves(i, j = undefined, k = undefined, l, m = undefined, n = undefined, o = undefined, p = undefined, q = undefined) {
    // we are exploiting the fact that object[undefined] = value does nothing
    const fields = {}
    fields[i] = false
    fields[j] = true
    fields[k] = false
    fields[l] = true
    fields[m] = false
    fields[n] = true
    fields[o] = false
    fields[p] = true
    fields[q] = false

    return whoWon(fields)
}

export function isWon(i, j = undefined, k = undefined, l, m = undefined, n = undefined, o = undefined, p = undefined, q = undefined) {
    // we are exploiting the fact that object[undefined] = value does nothing
    const fields = {}
    fields[i] = false
    fields[j] = true
    fields[k] = false
    fields[l] = true
    fields[m] = false
    fields[n] = true
    fields[o] = false
    fields[p] = true
    fields[q] = false

    const wonBy = whoWon(fields)
    if(wonBy !== null) {
        // plotBoard(fields)
        // console.log("game is won by", wonBy ? "O" : "X")
        return true
    }
    // special case: if all fields are filled, it's a draw, so technically won, but won by nobody
    if (typeof q === "number") {
        // console.log('draw')
        return true
        
    }
    return false
}

export function isValidMove(i, j = 100, k = 101, l = 102, m = 103, n = 104, o = 105, p = 106, q = 107) {
    // if two fields are identical, return false, true otherwise
    const noDups = i !== j && i !== k && i !== l && i !== m && i !== n && i !== o && i !== p && i !== q &&
           j !== k && j !== l && j !== m && j !== n && j !== o && j !== p && j !== q &&
           k !== l && k !== m && k !== n && k !== o && k !== p && k !== q &&
           l !== m && l !== n && l !== o && l !== p && l !== q &&
           m !== n && m !== o && m !== p && m !== q &&
           n !== o && n !== p && n !== q &&
           o !== p && o !== q &&
           p !== q

    return noDups
}

export function randomMove(field) {
    const moves = field.filter(i => i !== null) 
    const possibleMoves = Array(9).fill(null).map((_, i) => i).filter(i => !moves.includes(i))
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    return move
}


/*
    find the best move for the current player based on the game subtree
 */
export function minMaxMove(moves, currentPlayer) {
    let subtree = gametree
    moves.forEach(move => {
        subtree = subtree[move]
    })

    // calc minmax for each subtree
    // console.log(subtree, moves, moves.length)
    if(typeof subtree === "boolean" || subtree === null){
        console.log("minmax return", 0)
        return 0
    }
    const recommendation = Object.entries(subtree)
        .map(([key, value]) => ({ key, value: minMax(value, true, currentPlayer) }))
        .sort((a, b) => a.value - b.value)
        .map(({ key }) => key)
        .slice(-1)[0] // get the last one, which is (one of) the best moves
    return parseInt(recommendation)
}

export function minMax(tree, maximizingPlayer, currentPlayer) {
    if(typeof tree === "boolean"){
        return tree === currentPlayer ? 1 : -1
    } else if(tree === null){
        return 0
    }

    if (maximizingPlayer) {
        let value = -Infinity
        Object.values(tree).forEach((subtree) => {
            value = Math.max(value, minMax(subtree, false, currentPlayer))
        })

        return value
    } else {
        let value = Infinity
        Object.values(tree).forEach((subtree) => {
            value = Math.min(value, minMax(subtree, true, currentPlayer))
        })

        return value
    }
}