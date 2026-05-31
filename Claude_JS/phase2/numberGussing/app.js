
const MAX_ATTEMPTS = 7;

let secret, attempts = 0, guesses = [], gameOver = false;

const resetGame_btn = document.querySelector('.reset-btn');

if (resetGame_btn) {

    resetGame_btn.addEventListener("click", resetGame)
}


function resetGame() {
    secret = Math.floor(Math.random() * 100) + 1;


    attempts = 0;
    guesses = [];
    gameOver = false;

    const feedback = document.getElementById("feedback");
    const history = document.getElementById("history");
    const result_banner = document.getElementById("result-banner");
    const guess_input = document.getElementById("guess-input");
    const lo = document.getElementById("lo");
    const hi = document.getElementById("hi");

    feedback.textContent = "";
    history.innerHTML = "";
    result_banner.style.display = "none";
    guess_input.value = "1";
    guess_input.disabled = false;

    const bar = document.getElementById("attempts-bar");

    bar.innerHTML = "";
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const dot = document.createElement("div");
        dot.className = "attempt-dot";
        dot.id = "dot-" + i;
        bar.appendChild(dot);
    }

}
const makeGuess_btn = document.getElementById("makeGuess");


if (makeGuess_btn) {

    makeGuess_btn.addEventListener("click", makeGuess);
}

function makeGuess() {


    if (gameOver) return;

    const input = document.getElementById("guess-input");
    const guess = Number(input.value);


    if (isNaN(guess) || guess < 1 || guess > 100) {
        const feedback = document.getElementById("feedback");
        feedback.textContent = "Please enter a nuber 1 and 100";
        feedback.style.color = "var(--color-text-danger)";

        return;
    }
    attempts++;

    guesses.push(guess);



    const dot = document.getElementById("dot-" + (attempts - 1));
    if (dot) dot.classList.add(attempts === MAX_ATTEMPTS ? "last" : "used");

    const pill = document.createElement("span");
    pill.className = "guess-pill";

    const fb = document.getElementById("feedback");
    const lo = document.getElementById("lo");
    const hi = document.getElementById("hi");

    if (guess === secret) {
        fb.textContent =
            "Correct! You got it in " +
            attempts +
            (attempts === 1 ? " try!" : " tries!");
        fb.style.color = "var(--color-text-success)";
        pill.classList.add("win");
        pill.textContent = guess + " ✓";

        gameOver = true;
        input.disabled = true;
        showResult(true);
    }

    else if (guess > secret) {
        fb.textContent = "Too high — go lower.";
        fb.style.color = "var(--color-text-danger)";
        pill.classList.add("high");
        pill.textContent = guess + " ↓";
        hi.textContent = guess - 1;
    } else {
        fb.textContent = "Too low — go higher.";
        fb.style.color = "var(--color-text-info)";
        pill.classList.add("low");
        pill.textContent = guess + " ↑";
        lo.textContent = guess + 1;
    }

    document.getElementById("history").appendChild(pill);
    input.value = "";
    input.focus();



    if (!gameOver && attempts >= MAX_ATTEMPTS) {
        fb.textContent = "Out of guesses! The number was " + secret + ".";
        fb.style.color = "var(--color-text-secondary)";
        input.disabled = true;
        gameOver = true;
        showResult(false);
    }
}






function showResult(won) {
    const banner = document.getElementById("result-banner");
    const text = document.getElementById("result-text");
    banner.style.display = "block";
    text.textContent = won
        ? "Nice work. The answer was " +
        secret +
        ". Want to see how the code works?"
        : "The secret was " + secret + ". Try again or explore the code below.";
}


document
    .getElementById("guess-input")
    .addEventListener("keydown", function (e) {
        if (e.key === "Enter") makeGuess();
    });

resetGame();