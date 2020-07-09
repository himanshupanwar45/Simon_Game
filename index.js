var buttonColors = ['red','green','yellow','blue'];
var gamePattern = [];
var userClickedPattern = [];

//variables:

var level = 0;
var started = false;

//functions 

	$(document).click(function() {

        if(!started){
            // $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });




   

$(".btn").click(function(){
    var userChosenColor = this.id;
    
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
    
    
});


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);

    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    
    $("#level-title").text("Level " + level);
    level++;
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}

function playSound(name){
     new Audio("sounds/" + name + ".mp3").play();
 }

function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");

     setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
     },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        StartOver();
      }
}


function StartOver(){
    gamePattern = [];
    level=0;
    started = false;
}
 