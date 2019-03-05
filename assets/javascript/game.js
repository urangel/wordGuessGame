var austinThings = ["mountBonnel", "wholeFoods", "bartonSprings", "heb", "grackles", "amysIceCream", "acl", "zilkerPark", "sxsw", "torchiesTacos", "ladyBirdLake", "congressBridge", "stateCapitol"];

//creating an array that consists of the letters of the english alphabet
var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

//creats an array consisting of the letters of the mystery word that was chosen at random from the list
var mysteryWordArray = austinThings[Math.floor(Math.random()*austinThings.length)].split("");
console.log(mysteryWordArray);

// checking to see if works with string
var mysteryWordString = mysteryWordArray.join("").toLocaleLowerCase();

console.log(mysteryWordString);

var uniqueLetters = mysteryWordString.split("").filter(onlyUnique).join("").toLocaleLowerCase();

console.log(uniqueLetters);

var uniqueLower = [];

var wordLeftToGuess = mysteryWordString;

var displayedWord = "";

var guessesLeft = 12;

var lettersCorrect = [];

var lettersWrong = [];

var wins = 0;

// when the document loads...

window.onload = function() {
    document.getElementById("guessesLeft").textContent = guessesLeft;
    document.getElementById("wins").textContent = wins;
    document.getElementById("mysteryWord").textContent = displayedWord;

}


// some functions

function guessesDecrease() {
    guessesLeft -= 1;
}


function winsIncrease() {
    wins += 1;
}

function restart() {
    mysteryWordArray = austinThings[Math.floor(Math.random()*austinThings.length)].split("");
    mysteryWordString = mysteryWordArray.join("").toLocaleLowerCase();
    console.log(mysteryWordArray);
    console.log(mysteryWordString);
    guessesLeft = 12;
    displayedWord = "";
    wordLeftToGuess = mysteryWordString;
    lettersCorrect = [];
    lettersWrong = [];
    uniqueLower = [];
    document.getElementById("mysteryWord").textContent = displayedWord;
    document.getElementById("lettersGuessed").textContent = "";
    document.getElementById("guessesLeft").textContent = guessesLeft;
    alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
    
    uniqueLetters = mysteryWordString.split("").filter(onlyUnique).join("").toLocaleLowerCase();
    console.log(uniqueLetters);
    
    for (i=0; i<uniqueLetters.length; i++){
        uniqueLower.push(uniqueLetters[i].toLowerCase());
    }
    
    for (i=0; i<mysteryWordArray.length; i++){
        displayedWord += "-";
    }

    console.log(uniqueLower);
    
}

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

// The beginning of user interactivity

document.onkeyup = function(event){
    var userGuess = event.key;
    
    if (uniqueLower.length >= 1){ //if all of the letters in the word have not been guessed... then play

        if (guessesLeft > 1){
            if (alphabet.indexOf(userGuess) >= 0){
                alphabet.splice(alphabet.indexOf(userGuess), 1 );
            
                if (uniqueLower.indexOf(userGuess) >= 0){
                       
                    // trying to put letters in order and allow for duplicate population
                    for (i=0; i<mysteryWordString.length; i++){
                        var position = wordLeftToGuess.indexOf(userGuess);

                        if (position >= 0){
                            console.log(displayedWord);
                            displayedWord = displayedWord.substring(0,position) + mysteryWordArray[position] + displayedWord.substring(position+1);
                            wordLeftToGuess = wordLeftToGuess.substring(0,position) + "-" + wordLeftToGuess.substring(position+1);
                            console.log(wordLeftToGuess);
                        }
                        document.getElementById("mysteryWord").textContent = displayedWord;
                    }
                    uniqueLower.splice(uniqueLower.indexOf(userGuess), 1);
                        
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