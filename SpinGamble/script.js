/**
 * Steps:
 * 1. Deposit
 * 2. Number of lines to bet
 * 3. Bet amount
 * 4. Spin the slot machine
 * 5. Check win
 * 6. Give the winnings
 * 7. Play again
 */

const prompt = require("prompt-sync") ()

const rows = 3
const columns = 3

const symbolCounts = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8
}

const symbolValues = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
}

const getDeposit = () => {
  while (true) {
    const depositAmount = parseFloat(prompt("Enter a deposit amount: "))

    if (isNaN(depositAmount) || depositAmount <= 0) {
      console.log("Invalid deposit amount. Try again.")
      } 
    else return depositAmount
  }
}

const getNumberofLines = () => {
  while (true) {
    const numberOfLines = parseFloat(prompt("Enter number of lines to bet (1-3): "))

    if (isNaN(numberOfLines) || numberOfLines <= 0) {
      console.log("Invalid number of lines. Try again.")
    }
    else if (numberOfLines > 3) {
      console.log("Number of lines cannot be greater than 3.")
    }
    else if (getDeposit / numberOfLines < 3) {
      console.log("You have not that much balance to bet on " + numberOfLines + " lines. Min bet is $3")
    } else return numberOfLines
  }
}

const getBetAmount = (balance, lines) => {
  while (true) {
    const betAmount = parseFloat(prompt("Enter the bet amount per line: "))
    
    if (isNaN(betAmount) || betAmount <= 0) {
      console.log("Invalid bet amount. Try again.")
    }
    else if (betAmount > (balance / lines)) {
      console.log("You have not that much balance to bet.")
    }
    else if (betAmount < 3) {
      console.log("Bet amount cannot be smaller than $3.")
    }
    else return betAmount
  }
}

const spin = () => {
  const symbols = []

  for (const [symbol, count] of Object.entries(symbolCounts)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol)
    }
  }

  const reels = []

  for (let i = 0; i < columns; i++) {
    reels.push([])
    const reelSymbols = [...symbols]
    for (let j = 0; j < rows; j++) {
      const randomIndex = Math.floor(Math.random()*reelSymbols.length)
      const selectedSymbol = reelSymbols[randomIndex]
      reels[i].push(selectedSymbol)
      reelSymbols.splice(randomIndex, 1)
    }
  } return reels
}

const transpose = (reels) => {
  const tRows = []

  for (let i = 0; i < rows; i ++)  {
    tRows.push([])
    for (let j = 0; j < columns; j++) {
      tRows[i].push(reels[j][i])
    }
  } return tRows
}

const printSlots = (tRows) => {
  for (const row of tRows) {
    let rowString = ""
    for (const [i, symbol] of row.entries()) {
      rowString += symbol
      if (i != row.length - 1) {
        rowString += " | "
      }
    }
    console.log(rowString)
  }
}

const getWin = (rows, bet, lines) => {
  let win = 0

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row]
    let allSame = true

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false
        break
      }
    }

    if (allSame) {
      win += bet * symbolValues[symbols[0]]
    }
  } return win
}

const game = () => {
  let balance = getDeposit()

  while (true) {
    console.log("You have a balance of $" + balance)
    const lines = getNumberofLines()
    const bet = getBetAmount(balance, lines)
    balance -= bet * lines
    const reels = spin()
    const tRows = transpose(reels)
    printSlots(tRows)
    const winnings = getWin(tRows, bet, lines)
    balance += winnings
    console.log("You won, $" + winnings.toString()) 

    if (balance <= 3) {
      console.log("Balance is not enough to play :(")

      const askDeposit = prompt("Do you want to deposit to continue? (y/n)")

      if (askDeposit != "y") break
      else balance += getDeposit()
    } 

    else {
      const playAgain = prompt("Do you want to play again? (y/n): ")
      if (playAgain != "y") break
    }
  }
}

game()