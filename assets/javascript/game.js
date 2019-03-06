var austinThings = ["mountBonnel", "wholeFoods", "bartonSprings", "heb", "grackles", "amysIceCream", "acl", "zilkerPark", "sxsw", "torchiesTacos", "ladyBirdLake", "congressBridge", "stateCapitol"];

//creating an array that consists of the letters of the english alphabet
var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

//creats an array consisting of the letters of the mystery word that was chosen at random from the list
var mysteryWordArray = austinThings[Math.floor(Math.random()*austinThings.length)].split("");
console.log(mysteryWordArray);

//creates a string from the array and makes it all lower case
var mysteryWordString = mysteryWordArray.join("").toLocaleLowerCase();

console.log(mysteryWordString);

//returns a string of unique characters from the mystery word
var uniqueLetters = mysteryWordString.split("").filter(onlyUnique).join("").toLocaleLowerCase();

console.log(uniqueLetters);

var uniqueLower = [];

var wordLeftToGuess = mysteryWordString;

// this is what will be on the screen
var displayedWord = "";

var guessesLeft = 12;

var lettersWrong = [];

var wins = 0;

var losses = 0;

// when the document loads display the stats

window.onload = function() {
    updateGuessesLeft();
    updateWins();
    updateLosses();
    updateDisplayedWord();

}

// some functions

function updateGuessesLeft () {
    document.getElementById("guessesLeft").textContent = guessesLeft;
}

function updateWins () {
    document.getElementById("wins").textContent = wins;
}

function updateLosses () {
    document.getElementById("losses").textContent = losses;
}

function updateDisplayedWord () {
    document.getElementById("mysteryWord").textContent = displayedWord;
}

function updateLettersGuessed () {
    document.getElementById("lettersGuessed").textContent = lettersWrong;
}

function guessesDecrease() {
    guessesLeft -= 1;
}

function lossesIncrease() {
    losses++;
}

function winsIncrease() {
    wins += 1;
}

// resets all the mysteryword related containers
function restart() {
    mysteryWordArray = austinThings[Math.floor(Math.random()*austinThings.length)].split("");
    mysteryWordString = mysteryWordArray.join("").toLocaleLowerCase();
    console.log(mysteryWordArray);
    console.log(mysteryWordString);
    guessesLeft = 12;
    displayedWord = "";
    wordLeftToGuess = mysteryWordString;
    lettersWrong = [];
    uniqueLower = [];
    document.getElementById("lettersGuessed").textContent = "";
    updateGuessesLeft();
    alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
    
    uniqueLetters = mysteryWordString.split("").filter(onlyUnique).join("").toLocaleLowerCase();
    console.log(uniqueLetters);
    
    for (i=0; i<uniqueLetters.length; i++){
        uniqueLower.push(uniqueLetters[i].toLowerCase());
    }
    
    for (i=0; i<mysteryWordArray.length; i++){
        displayedWord += "-";
    }

    updateDisplayedWord();

    console.log(uniqueLower);
    
}

//filter function that returns only unique characters
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


// setting up so that word is only lowercase

for (i=0; i<uniqueLetters.length; i++){
    uniqueLower.push(uniqueLetters[i].toLowerCase());
}

// console.log(uniqueLower);

for (i=0; i<mysteryWordArray.length; i++){
    displayedWord += "-";
}

// The beginning of user interactivity. A key is pressed to guess if it is in the word.

document.onkeyup = function(event){
    var userGuess = event.key;
    
    //If all of the letters in the word have not been guessed... then play
    if (uniqueLower.length >= 1){ 

        //If you still have more guesses then keep guessing.
        if (guessesLeft > 1){

            // If the letter in the alphabet has not been guessed yet then continue
            if (alphabet.indexOf(userGuess) >= 0){
                alphabet.splice(alphabet.indexOf(userGuess), 1 );
            
                if (uniqueLower.indexOf(userGuess) >= 0){
                       
                    // trying to put letters in order and allow for duplicate population
                    for (i=0; i<mysteryWordString.length; i++){
                        // creating a position variable so that I can cut and build strings with the guessed letter in order
                        var position = wordLeftToGuess.indexOf(userGuess);

                        // if the letter is in the word, change displayed word to show the letter where it is in the word 
                        // and change the wordleft to guess so that it no longer contains that letter 
                        if (position >= 0){
                            displayedWord = displayedWord.substring(0,position) + mysteryWordArray[position] + displayedWord.substring(position+1);
                            console.log(displayedWord);
                            wordLeftToGuess = wordLeftToGuess.substring(0,position) + "-" + wordLeftToGuess.substring(position+1);
                            console.log(wordLeftToGuess);
                        }

                        //updating the displayed word to reflect the correct letter chosen
                        // document.getElementById("mysteryWord").textContent = displayedWord;
                        updateDisplayedWord();
                    } 

                    //removing the letter from the array containing the letters left to guess
                    uniqueLower.splice(uniqueLower.indexOf(userGuess), 1);
                        
                    console.log(uniqueLower);
                }
                else {
                    // adds the user guessed letter *that is wrong* to the array lettersWrong
                    lettersWrong.push(userGuess);
                    updateLettersGuessed();
                    // gives you one less try because you guessed wrong
                    guessesDecrease();
                    updateGuessesLeft();
                }

            }
            // because the letter was already chose alert to choose a different letter
            else {
                alert("Please choose a letter in the alphabet that you haven't already chosen");
            }
        }

        //If player runs out of guesses then they lose a point and the game starts again
        else {
            guessesDecrease();
            lossesIncrease();
            updateLosses();
            updateGuessesLeft();
            document.getElementById("status").textContent = "The word was: " + mysteryWordString + "Try another...";
            restart();
        }
    }

    // If the player guesses all of the letters in the word they win and get a point. The game restarts.
    else {
        document.getElementById("status").textContent = "You got it! Try another";
        winsIncrease();
        updateWins();
        restart();
    }    
}