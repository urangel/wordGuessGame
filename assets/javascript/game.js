var austinThings = ["mountBonnel", "wholeFoods", "bartonSprings", "heb", "grackles", "amysIceCream", "acl", "zilkerPark", "sxsw", "torchiesTacos", "ladyBirdLake", "congressBridge", "stateCapitol"];

//creating an array that consists of the letters of the english alphabet
var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

//creats an array consisting of the letters of the mystery word that was chosen at random from the list
var mysteryWord = (austinThings[Math.floor(Math.random()*austinThings.length)]).split("");
console.log(mysteryWord);

var uniqueLetters = mysteryWord.filter(function(item, pos){
    return mysteryWord.indexOf(item) == pos;
})

console.log(uniqueLetters);

var uniqueLower = [];

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

function restart() {
    mysteryWord = (austinThings[Math.floor(Math.random()*austinThings.length)]).split("");
    console.log(mysteryWord);
    guessesLeft = 12;
    lettersCorrect = [];
    lettersWrong = [];
    document.getElementById("mysteryWord").textContent = "";
    document.getElementById("lettersGuessed").textContent = "";
    document.getElementById("guessesLeft").textContent = guessesLeft;
    document.getElementById("status").textContent = "Guess what Austin thing this is!";
    alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
    
    uniqueLetters = mysteryWord.filter(function(item, pos){
        return mysteryWord.indexOf(item) == pos;
    })
    
    for (i=0; i<uniqueLetters.length; i++){
        uniqueLower.push(uniqueLetters[i].toLowerCase());
    }
    
    console.log(uniqueLower);
    
}

// setting up so that word is only lowercase

for (i=0; i<uniqueLetters.length; i++){
    uniqueLower.push(uniqueLetters[i].toLowerCase());
}

console.log(uniqueLower);

// The beginning of user interactivity

document.onkeyup = function(event){
    var userGuess = event.key;
    
    if (uniqueLower.length >= 1){ //if all of the letters in the word have not been guessed... then play

        if (guessesLeft > 1){
            if (alphabet.indexOf(userGuess) >= 0){
                alphabet.splice(alphabet.indexOf(userGuess), 1 );
            
                if (uniqueLower.indexOf(userGuess) >= 0){
                    // lettersCorrect.push(userGuess); // Need to change this to make the word appear in order so it makes sense
                    // document.getElementById("mysteryWord").textContent = lettersCorrect;
                    $("#mysteryWord").html("<p>" + userGuess + "</p>");
                        if (uniqueLower.indexOf(userGuess) >=0){
                        uniqueLower.splice(uniqueLetters.indexOf(userGuess), 1);
                        }    
                    console.log(uniqueLower);
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
                alert("Please choose a letter in the alphabet that you haven't already chosen");
            }
        }

        else {
            guessesDecrease();
            document.getElementById("guessesLeft").textContent = guessesLeft;
            document.getElementById("status").textContent = "Game Over!";
            restart();
        }
    }
    else {
        document.getElementById("status").textContent = "You got it!";
        winsIncrease();
        document.getElementById("wins").textContent = wins;
        restart();
    }    
}
//if all of the letters in the mysteryword are guessed then the user wins...
// need to populate all instances of correct letter if it apppears multiple times in the mysteryWord
// need to put all correct guesses in the right order to form the word