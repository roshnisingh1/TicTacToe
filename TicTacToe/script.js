const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


var currentPlayer;  
var gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const X ="X";
const O = "O";

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI update
    boxes.forEach((box , index) => {
     box.innerText  = "";
     box.style.pointerEvents = "all";
    //initialise box with css properties again
     box.classList = `box box${index + 1}` ; 
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


initGame();

function swapTurn() {
    if( currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }   

    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
let answer = "";

//check for winner
winningPositions.forEach((position) => {
    if ( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" ||  gameGrid[position[2]] !=="") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))  {
            
            //check for winner
             if (gameGrid[position[0]] === "X") 
                answer = "X";
                 else   
                answer = "O";

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

       //now we have a winner
         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
         
       }
   });
//it means we have a winner
   if (answer !== ""){
       gameInfo.innerText = `🏆 Winner Player- ${answer} `;
      newGameBtn.classList.add("active");
    return
   }

//when there is no winner
let fillCount = 0;
gameGrid.forEach((box) => {
    if (box !== "") {
        fillCount++;
    }  

});

//bored s filled, game is tie

if (fillCount === 9) {
    gameInfo.innerText = `Game Tied!`;
    newGameBtn.classList.add("active");
    return;

}
}


function handleClick(index) {
    if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap kro turn ko 
    swapTurn();
    //check kro game over hua ya nahi
    checkGameOver();
    }
} 


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
                       
// Sound Effects
const clickSound = document.getElementById("clickSound");


// Play on tile click
boxes.forEach(box => {
  box.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});