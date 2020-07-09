var uScore = 0;  //user score
var cScore = 0;  //computer score
const userScore_span = document.querySelector("#userScore");
const computerScore_span = document.querySelector("#compScore");
const scoreBoard_div = document.querySelector(".scoreBoard");
const result_p = document.querySelector(".result");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");
const lizard_div = document.getElementById("lizard");
const spock_div = document.getElementById("spock");

function getCompChoice() {
    const choices = ['r', 'p', 's', 'l', 'sp'];
    const randomNum = Math.floor(Math.random() * 5);
    return choices[randomNum];
}

function word(letter) {
    if (letter === "r") return "Rock" ;
    if (letter === "p") return "Paper" ;
    if (letter === "s") return "Scissor" ;
    if (letter === "l") return "Lizard" ;
    return "Spock" ;
}

function win(userChoice, compChoice) {
    uScore++;
    userScore_span.textContent = uScore;
    computerScore_span.textContent = cScore;
    result_p.textContent = `${word(userChoice)} beats ${word(compChoice)}. You Win !!`;
    result_p.style.color = "#09eb36";
}

function lose(userChoice, compChoice) {
    cScore++;
    userScore_span.textContent = uScore;
    computerScore_span.textContent = cScore;
    result_p.textContent = `${word(userChoice)} loses to ${word(compChoice)}. You Lose :( `;
    result_p.style.color = "#c91306";
}

function draw(userChoice, compChoice) {
    result_p.textContent = `${word(userChoice)} equals ${word(compChoice)}. Its a draw . . . `;
    result_p.style.color = "#aaad00";
}

function game(userChoice) {
    const compChoice = getCompChoice();
    switch (userChoice + compChoice) {
        case "rs":
        case "rl":
        case "psp":
        case "pr":
        case "sp":
        case "sl":
        case "lp":
        case "lsp":
        case "spr":
        case "sps":
        win(userChoice, compChoice);
        break;

        case "rsp":
        case "rp":
        case "ps":
        case "pl":
        case "ssp":
        case "sr":
        case "lr":
        case "ls":
        case "spp":
        case "spl":
        lose(userChoice, compChoice);
        break;

        case "rr":
        case "pp":
        case "ss":
        case "ll":
        case "spsp":
        draw(userChoice, compChoice);
        break;
    }
    /* let compChoice = getComputerChoice();

    if(userChoice === compChoice){
        draw(userChoice, compChoice);
    }else{
        if( ((choices.indexOf(userChoice)+1)%5) === choices.indexOf(compChoice) ){
            win(userChoice, compChoice);
        }else{
            lose(userChoice, compChoice);
        }
    }*/
}

function main() {
    rock_div.addEventListener("click", function() {
        game("r");
    });

    paper_div.addEventListener("click", function() {
        game("p");
    });

    scissor_div.addEventListener("click", function() {
        game("s");
    });

    lizard_div.addEventListener("click", function() {
        game("l");
    });

    spock_div.addEventListener("click", function() {
        game("sp");
    });
}

main();