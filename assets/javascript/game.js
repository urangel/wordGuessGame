var austinThings = ["mountBonnel", "wholeFoods", "bartonSprings", "heb", "grackles", "amysIceCream", "acl", "zilkerPark", "sxsw", "torchiesTacos", "ladyBirdLake", "congressBridge", "stateCapitol"];

//creating an array that consists of the letters of the english alphabet
var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

//creats an array consisting of the letters of the mystery word that was chosen at random from the list
var mysteryWord = (austinThings[Math.floor(Math.random()*austinThings.length)]).split("");

var guessesLeft = 12;

var lettersCorrect = [];

var lettersWrong = [];

var wins = 0;

// when the document loads...

window.onload = function() {
    document.getElementById("guessesLeft").textContent = guessesLeft;
    document.getElementById("wins").textContent = wins;

}


// some functions

function guessesDecrease() {
    guessesLeft -= 1;
}


function winsIncrease() {
    wins += 1;
}

// The beginning of user interactivity

document.onkeyup = function(event){
    var userGuess = event.key;
    

    if (alphabet.indexOf(userGuess) >= 0){
        alphabet.splice(alphabet.indexOf(userGuess), 1 );
    
        if (mysteryWord.indexOf(userGuess) >= 0){
            // add the user guessed letter *that is correct* to the array lettersCorrect
            for (k=0; k<mysteryWord.length; k++){
                if (userGuess === mysteryWord[k])
            }
            lettersCorrect.push(userGuess);
            document.getElementById("mysteryWord").textContent = lettersCorrect;
        }
        else {
          // adds the user guessed letter *that is wrong* to the array lettersWrong
          lettersWrong.push(userGuess);
          document.getElementById("lettersGuessed").textContent = lettersWrong;
          // gives you one less try because you guessed wrong
          guessesDecrease();
          document.getElementById("guessesLeft").textContent = guessesLeft;
        }

    }
    else {
        alert("Please choose a letter in the alphabet that you haven't already chosen")
    }


       
}

// need to populate all instances of correct letter if it apppears multiple times in the mysteryWord


//defining the userGuess variable to take the key that was pressed
document.onkeyup(event){
    var userGuess = event.key;
}