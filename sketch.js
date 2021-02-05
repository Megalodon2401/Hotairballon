var balloon;
var database;

function setup(){
    createCanvas(500,500);

    database = firebase.database();
    
    balloon = createSprite(100,100, 50,50);
    balloon.shapeColor = "green";
    //ball = createSprite(250,250,10,10);
    //ball.shapeColor = "red";

    var balloonposition = database.ref('ball/position');
    balloonposition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        setPosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        setPosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        setPosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        setPosition(0,+1);
    }
    drawSprites();
}

function setPosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
    console.log("error in writing to the database");
}