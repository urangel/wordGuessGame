var austinThings = ["mountBonnel", "wholeFoods", "bartonSprings", "heb", "grackles", "amysIceCream", "acl", "zilkerPark", "sxsw", "torchiesTacos", "ladyBirdLake", "congressBridge", "stateCapitol"];

//defining the userGuess variable to take the key that was pressed
document.onkeyup(event){
    var userGuess = event.key;
}

//creating an array that consists of the letters of the english alphabet
var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

var guessesLeft = 12;

var lettersCorrect = [];

var lettersWrong = [];

var wins = 0;

// The beginning of user interactivity
for (i=0; guessesLeft > 0; i++){
    for (j=0; j<austinThings[i]; j++){
        if (userGuess === austinThings[j]){
            // add the user guessed letter *that is correct* to the array lettersCorrect
            lettersCorrect.push(userGuess);
        }
        else {
            // adds the user guessed letter *that is wrong* to the array lettersWrong
            lettersWrong.push(userGuess);
            // gives you one less try because you guessed wrong
            guessesLeft - 1;
            document.getElementById("guessesLeft").textContent = guessesLeft;
        }
    }
}


// document.getElementById("cpuPick").textContent = "Computer chooses: " + cpu;