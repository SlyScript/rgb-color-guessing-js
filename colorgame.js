var numSquare = 6;
var colors = generateRandomColors(numSquare); 
var squares = document.querySelectorAll(".square"); 
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    reset();
    setupModeButtons();
    setupSquares();
}

// Event that is used to reset everything when clicking New Colors or Play again which is actually the same button
resetButton.addEventListener("click", function(){
    reset();
})

// function that runs the both modes of play in the game
function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++ ){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected"); 
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquare = 3: numSquare = 6;
            // calling the entire reset button
            reset();  
        });
    }
}

// function that plays games
function setupSquares(){
    for(var i = 0 ; i < squares.length; i++){
        // adding click events to squares
        squares[i].addEventListener("click", function(){
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Corect!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else{
                messageDisplay.textContent = "Try Again";
                this.style.backgroundColor = "#232323";
            }
        });
    }
}

//function that resets everything on the page
function reset(){
    //Change the colors in there by firing the randomization again
    colors = generateRandomColors(numSquare);
    //Change the colorDisplay on the h1
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    //Change the color of the squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].classList.remove("disappear");
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].classList.add("disappear");
        }
    }
    // Cleaning message after reseting
    messageDisplay.textContent="";
    // Reseting the H1 to original color
    h1.style.backgroundColor = "steelblue";
    //Reseting button to "New Colors"
    resetButton.textContent = "New Colors";
}

// function that changes all squares to the correct one
function changeColors(color){
    //loop through squares 
    for(var i = 0; i < squares.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}
// function that randomly chooses the initial correct color
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// function that loops through random colors for all six
function generateRandomColors(num){
    // make an array to keep random colors in
    var arr = [];
    // repeat the randomColor() num times
    for(var i = 0; i < num; i++){
        // get random color and push into array
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

// function that generates one color
function randomColor(){
    // For the color Red
    var r = Math.floor(Math.random() * 256);
    // For the color Green
    var g = Math.floor(Math.random() * 256);
    // For the color blue;
    var b = Math.floor(Math.random() * 256);
    // returning the color as a string
    return "rgb(" + r + ", " + g + ", " + b + ")";
}