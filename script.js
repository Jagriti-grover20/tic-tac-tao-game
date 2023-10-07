// initialising some variables
const boxes= document.querySelectorAll(".box");
const gameInfo= document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");
// current Player mark
let currentPlayer;
// 3*3 grid current loc: to track grid
let gameGrid;
const winningPositions = [
    // all the possibilities of winning
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// let's create a function to initialise the game
function initGame()
{
    currentPlayer="X";
    gameGrid= [ "","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText =""; 
        boxes[index].style.pointerEvents = "all";
        // remove green color
        box.classList= `box box${index+1}`;

    });
    // hide the newGameBtn for beginning
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();

function checkGameOver(){
 let answer="";
  winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[0]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]] && (gameGrid[position[1]]===gameGrid[position[2]]))){
        // check if X is winner or O
        if(gameGrid[position[0]] === "X")
        answer= "X";
        else
        answer="O";
        
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";

        })
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
  });
//   we have a winner
  if(answer!==""){
    gameInfo.innerText= `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
//   if no winner
let fillCount=0;
gameGrid.forEach((box)=>{
    if(box!=""){
        fillCount++;
    }
});
if(fillCount===9){
    gameInfo.innerText="Game Tied !";
    newGameBtn.classList.add("active");
}
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText= `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    // agar particular block is empty
    if(gameGrid[index]=== ""){
        // changing in UI- O / X
        boxes[index].innerHTML = currentPlayer;
        // showing the logic
        gameGrid[index]=currentPlayer;
          // to remove cursor pointer from block
        boxes[index].style.pointerEvents ="none";
        // swap the turn
        swapTurn();
        // check if someone wins and the game is over  
        checkGameOver();
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
    // index->which box to select
        handleClick(index);
    })
});
newGameBtn.addEventListener("click",initGame);
