let currentBalance = 0;
let betAmount = 0;

function setInitialAmount() {
    const amount = parseInt(document.getElementById('initialAmount').value);
    if (amount > 0) {
        currentBalance = amount;
        document.getElementById('currentBalance').textContent = currentBalance;
        
        // Hide setup section and show game content
        document.getElementById('setupSection').style.display = 'none';
        document.getElementById('gameContent').style.display = 'block';
        
        updateGameState();
    }
}

function resetGame() {
    // Show setup section and hide game content
    document.getElementById('setupSection').style.display = 'block';
    document.getElementById('gameContent').style.display = 'none';
    
    // Reset all values
    currentBalance = 0;
    document.getElementById('currentBalance').textContent = '0';
    document.getElementById('initialAmount').value = '';
    document.getElementById('betAmount').value = '';
    document.getElementById('dice1').textContent = '?';
    document.getElementById('dice2').textContent = '?';
    document.getElementById('dice3').textContent = '?';
    document.getElementById('result').textContent = '';
    document.getElementById('status').textContent = '';
    document.getElementById('status').className = 'status';
}

function updateGameState() {
    document.getElementById('betAmount').max = currentBalance;
    if (currentBalance <= 0) {
        // Show reset button and hide bet controls
        document.getElementById('betControls').style.display = 'none';
        document.getElementById('resetButton').style.display = 'block';
    } else {
        // Show bet controls and hide reset button
        document.getElementById('betControls').style.display = 'block';
        document.getElementById('resetButton').style.display = 'none';
        validateBet();
    }
}

function validateBet() {
    betAmount = parseInt(document.getElementById('betAmount').value) || 0;
    if (betAmount > currentBalance) {
        betAmount = currentBalance
        document.getElementById('betAmount').value = betAmount;
    }
    const isValidBet = betAmount > 0 && betAmount <= currentBalance;
    setButtonsEnabled(isValidBet);
}

function playBet(betType) {
    betAmount = parseInt(document.getElementById('betAmount').value) || 0;

    // Temporarily disable buttons during roll
    setButtonsEnabled(false);

    // Roll the dice
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    
    // Display dice values
    document.getElementById('dice1').textContent = dice1;
    document.getElementById('dice2').textContent = dice2;
    document.getElementById('dice3').textContent = dice3;

    const sum = dice1 + dice2 + dice3;
    let won = false;
    let winAmount = 0;

    // Check win conditions
    if (betType === 'high' && sum >= 12) {
        won = true;
        winAmount = betAmount;
    } else if (betType === 'mid' && sum === 11) {
        won = true;
        winAmount = betAmount * 5;
    } else if (betType === 'low' && sum <= 10) {
        won = true;
        winAmount = betAmount;
    }

    // Update balance and display result
    const result = document.getElementById('result');
    result.textContent = `Sum: ${sum}`;
    const status = document.getElementById('status');
    if (won) {
        currentBalance += winAmount;
        status.textContent = `You won ฿${winAmount}!`;
        status.className = 'status win';
    } else {
        currentBalance -= betAmount;
        status.textContent = `You lost ฿${betAmount}.`;
        status.className = 'status lose';
    }

    // Update display
    document.getElementById('currentBalance').textContent = currentBalance;
    
    // Update game state
    updateGameState();
}

function setButtonsEnabled(enabled) {
    document.getElementById('highBtn').disabled = !enabled;
    document.getElementById('midBtn').disabled = !enabled;
    document.getElementById('lowBtn').disabled = !enabled;
}