const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll('.select img')];

// First function with player choice and adding border to a picked option
function handSelection() {

    game.playerHand = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px #f14196';
};

// Function with computer choice
function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

// Function with info about game result
function checkResult(player, ai) {
    // console.log(player, ai);
    if (player === ai) {
        return 'draw';
    } else if ((player === "paper" && ai === "stone") || (player === "stone" && ai === "scissors") || (player === "scissors" && ai === "paper")) {
        return 'win';
    } else {
        return 'loss';
    }
}

// Publishing the result

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "You won!"
        document.querySelector('[data-summary="who-win"]').style.color = "#f14196";
    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Computer won!"
        document.querySelector('[data-summary="who-win"]').style.color = "#f14196";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Draw!"
        document.querySelector('[data-summary="who-win"]').style.color = "#f14196";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
}
//Main function
function startGame() {
    if (!game.playerHand) {
        return alert("Choose an option!");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame()
}

hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.start').addEventListener('click', startGame)