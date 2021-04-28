var p1,p2,UFO1,UFO2,UFO3;
var blast,blastImage,space,spaceImage,gameOver;
var spaceShip,spaceShipImage, laserImage,gameOverImg;
var shoot = 0;
var score = 0;
var laser,ufoGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;

function preload() {
  gameOverImg=loadImage("Images/Game Over.png")
  spaceImage = loadImage("Images/space.png");
  spaceShipImage = loadAnimation("Images/Rocket_1.png","Images/Rocket_2.png");
  laserImage = loadAnimation("Images/Laser_1.png","Images/Laser_2.png","Images/Laser_3.png","Images/Laser_4.png");
  UFO1 = loadImage("Images/UFO_1.png");
  UFO2 = loadImage("Images/UFO_2.png");
  UFO3 = loadImage("Images/UFO_3.png");
  blastImage = loadImage("Images/blast.png");
  explasionImage = loadImage("Images/blast.png");
  explosionSound = loadSound("Sounds/explosion.mp3");
  laserSound = loadSound("Sounds/laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(300,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(250,600);
  spaceShip.addAnimation("spaceshipmoving",spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  ufoGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(200,700,2000,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);

    text("  press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addAnimation("laserMoving",laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.2;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(ufoGroup.isTouching(p2) || ufoGroup.isTouching(p1)) {
      ufoGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.visible=false;
      gameState = end;
    }
    
    if(ufoGroup.isTouching(laserGroup)) {
      ufoGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }
  
    UFOs();
    drawSprites();
    
    stroke("white");
    strokeWeight("4");
    fill("coral");
    textSize(30);
    text("score : " + score,210,60)
    
    if(ufoGroup.isTouching(endline)) {
      ufoGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;

    
    stroke("yellow");
    fill("red");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("The aliens destroyed the planet",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);
    text("Press 'r' to restart the game",canvas.width/2-400,canvas.height/2+300);

    if(keyDown("r")) {
      gameState = instruction;
      space.velocityY = (5 + score/10);
      spaceShip.visible=true;
      score=0;
    }

    
  }


  if(gameState === instruction) {
    stroke("tan");
    strokeWeight(4);
    fill("wheat");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE SHOOTERS------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+100);
    stroke("yellow");
    strokeWeight(1);
    fill("aqua");
    textSize(35);
    textFont("Apple Chancery");
    text("year 2500 .....",canvas.width/2-300,canvas.height/2-250);
    text(" Some aliens are coming towords Earth.",canvas.width/2-300, canvas.height/2 - 210);
    text("  You are a space fighter.",canvas.width/2-300,canvas.height/2-170);
    text("  Help the people and Earth !",canvas.width/2-300,canvas.height/2-130);
    text("  use right and left arrows to move your spaceship.",canvas.width/2-300,canvas.height/2-90);
    text("  press 's' to start game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    
  }
}
  

function UFOs() {
  if(frameCount % 110 === 0) {
  
    var ufo = createSprite(Math.round(random(50,950)),-20);
    ufo.velocityY = (6 + score/10);
    ufo.lifetime = 200;
    ufo.scale = random(0.4,0.5);
    //ufo.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: ufo.addImage(UFO1);
              ufo.setCollider("circle",-80,10,160);
              break;
      case 2: ufo.addImage(UFO2);
              ufo.setCollider("circle",50,0,150);
              break;
      case 3: ufo.addImage(UFO3);
              ufo.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(ufo.x);
    ufoGroup.add(ufo);
  }
}

