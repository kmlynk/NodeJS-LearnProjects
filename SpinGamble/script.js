/**
 * 1. Deposit
 * 2. Number of lines to bet
 * 3. Bet amount
 * 4. Spin the slot machine
 * 5. Check win
 * 6. Give the winnings
 * 7. Play again
 */

const prompt = require("prompt-sync") ()

const getDeposit = () => {
  while (true) {
    const depositAmount = parseFloat(prompt("Enter a deposit amount: "))

    if (isNaN(DepositAmount) || DepositAmount <= 0) {
      console.log("Invalid deposit amount. Try again.")
      } 
    else {
      return DepositAmount
    }
  }
}

const getNumberofLines = () => {
  while (true) {
    const numberOfLines = parseFloat(prompt("Enter number of lines to bet: "))

    if (isNaN(numberOfLines) || numberOfLines <= 0) {
      console.log("Invalid number of lines. Try again.")
    }
    else if (numberOfLines > 3) {
      console.log("Number of lines cannot be greater than 3.")
    }
    else return numberOfLines
  }
}

const getBetAmount = () => {
  while (true) {
    const betAmount = parseFloat(prompt("Enter the bet amount: "))

    if (isNaN(betAmount) || betAmount <= 0) {
      console.log("Invalid bet amount. Try again.")
    }
    else if(betAmount < 10) {
      console.log("Bet amount cannot be smaller than 10$.")
    }
    else return betAmount
  }
}