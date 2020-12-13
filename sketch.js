//https://editor.p5js.org/RukmaniG/sketches/NMvFE6Mw5
//https://docs.google.com/spreadsheets/d/1l9mEKhaPOs4EzU5kSbgqSVgfkRStret8vk-A3ehE9HE/edit#gid=0
//https://docs.google.com/spreadsheets/d/e/2PACX-1vRaTpYh7Qpx70S2eKWeJXtCoFCp6kT99RTsClhx7Jxy-9ewH_1zsCKUQviWLzmGYgVdA7qqQTX-VaiG/pubhtml#
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario, marioAnim, marioAnim_collided, ground, groundImage, iground;
var cloud,cloudImage, brickImage, bricksGroup;
var obstacleGroup, obstacleImage, obstacle1, obstacle2, obstacle3, obstacle4;
var score = 0,highscore=0;
var gameOver, restart, gameOverImg, restartImg;
var jumpSound,dieSound,checkPointSound; 

function preload() {
  marioAnim = loadAnimation('mario00.png', 'mario01.png', 'mario02.png', 'mario03.png');
  marioAnim_collided = loadAnimation('collided.png');
  groundImage = loadImage('ground2.png');
  cloudImage = loadImage('bg.png');
  brickImage = loadImage('brick.png');
  obstacle1 = loadImage('obstacle1.png');
  obstacle2 = loadImage('obstacle2.png');
  obstacle3 = loadImage('obstacle3.png');
  obstacle4 = loadImage('obstacle4.png');
  gameOverImg = loadImage('gameOver.png');
  restartImg = loadImage('restart.png');

   jumpSound=loadSound('jump.mp3');
  dieSound=loadSound('die.mp3');
  checkPointSound=loadSound('checkPoint.mp3');
}


function setup() {
  createCanvas(600, 200);
  mario = createSprite(50, 180, 20, 50);
  mario.addAnimation('running', marioAnim);
  mario.addAnimation('collided', marioAnim_collided)
//  mario.setCollider('rectangle', 0, 0, 30,30);
//  mario.debug = true;
  //mario.scale=;
  //creating ground so that Mario doesnt go further down
  ground = createSprite(200, 190, 200, 20);
  ground.addImage('g1', groundImage);
  ground.x = ground.width/2;
  cloud = createSprite(200, 190, 200, 20);
  cloud.addImage('c1', cloudImage);
  cloud.x = cloud.width/2;
 // cloud.scale=0.9
  //to show forward movement of Mario
 // ground.velocityX = -4;
  //cloud.velocityX=-4;
  //to make Mario collide with the iground to remove the gap between Mario and the ground image and also make visibility false
 iground = createSprite(300, 195, 600, 10);

  iground.visible = false;

  bricksGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
 
}

function draw() {

  background('#6185f8');
  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    score.visible=true;
    ground.velocityX = -(4+score/100);
    
    score = score+getFrameRate()/30;
    
     
 // text("SCORE : " + Math.round(score), 300, 50);
    //text("HighSCORE : " + Math.round(highscore), 500, 100);
    
 //   console.log("Score :"+Math.round(score)+"  "+"HighScore  "+Math.round(highscore) );
    
    
    if (keyDown("space") && mario.y >= 100) {
      mario.velocityY = -10; // to make Mario jump up
      jumpSound.play();     
    }
    
    if(score%100===0 && score>0)
      {
      //  checkPointSound.play();
       
      }

    //add gravity
    mario.velocityY = mario.velocityY + 0.5;
    if (ground.x < 0) {
      ground.x = ground.width / 2; // to give ground infinite look
    }
    if (cloud.x < 0) {
      cloud.x = cloud.width / 2; // to give cloud infinite look
    }


    //for displaying objects
    spawnbricks();
    spawnObstacle();

    if (obstacleGroup.isTouching(mario)) {
      gameState = END;
      text("SCORE : " + score, 300, 50);
      dieSound.play();
     // mario.velocityY=-12;
      //jumpSound.play();
    }
    
    if (bricksGroup.isTouching(mario)) {
     text("SCORE : " + score, 300, 50);
    }

  } else {
    if (gameState === END) {   
      gameOver.depth=gameOver.depth+4;
      restart.depth=restart.depth+4;
     
      gameOver.visible = true;
      restart.visible = true;
    
      ground.velocityX = 0;
     // cloud.velocityX = 0;
      mario.velocityY = 0;
          if(highscore<score)
            {
              highscore=score;
            }

mario.changeAnimation('collided', marioAnim_collided)
      obstacleGroup.setLifetimeEach(-1);

      bricksGroup.setLifetimeEach(-1);

      obstacleGroup.setVelocityXEach(0);
      bricksGroup.setVelocityXEach(0);

     /* for(var i=0; i <obstacleGroup.length;i++){ if(obstacleGroup.get(i).isTouching(mario)){ obstacleGroup.get(i).destroy();}}
     */
      if(mousePressedOver(restart))
        {
          reset();
        }
      
      
 
    }
  }
  

  // to make Mario jummp

  mario.collide(ground);




//console.log(restart.visible)

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  
  text("Score : " + Math.round(score), 300, 50);
    text("HighScore : " + Math.round(highscore), 300, 70);
  
}

function reset()
{
  
  gameState=PLAY;
  obstacleGroup.destroyEach();
  bricksGroup.destroyEach();
  mario.changeAnimation("running",marioAnim);
  score=0;
  
}
function spawnbricks() {
  if (frameCount % 60 === 0) {

    var brick = createSprite(300, 50, 40, 10);
    brick.velocityX = -(4+score/100);
    brick.addImage('b1', brickImage);
    brick.y = Math.round(random(10, 60));



    
   
    ground.depth = ground.depth + 4;
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 4;
            

   
    bricksGroup.add(brick);
     brick.lifetime = 124;


  }
  
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    obstacleImage = createSprite(600, 130); // width and height not required
    obstacleImage.velocityX = -(4+score/100); //-ve value to make obstacle to move from left to right

    var r = Math.round(random(1, 4));
    //console.log("R = "+r);
    switch (r) {
      case 1:
        obstacleImage.addImage('o1', obstacle1);
        break;
      case 2:
        obstacleImage.addImage('o2', obstacle2);
        break;
      case 3:
        obstacleImage.addImage('o3', obstacle3);
        break;
      case 4:
        obstacleImage.addImage('o4', obstacle4);
        break;
      default:
        break;

    }
    
    obstacleGroup.add(obstacleImage);
    obstacleImage.lifetime = 300;
  }

}
