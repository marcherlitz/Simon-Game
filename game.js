var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;



function nextSequence(){
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*buttonColours.length);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level+1;
}

$(".btn").click(function(event){
    userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name){
    var colorSound = new Audio("sounds/" + name +  ".mp3");
    colorSound.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    nextSequence();
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel ]){

        console.log("Sucess!");
    }else{
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if(userClickedPattern.length == gamePattern.length){
        console.log("penis");
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }

  
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

}