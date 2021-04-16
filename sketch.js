var monkey , mk_r, mk_c;
var ground, iGround;
var banana ,bananaImg, obstacle, obsImg;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  mk_r = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  mk_c = loadAnimation("sprite_1.png");
  
  bananaImg = loadImage("banana.png");
  obsImg = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", mk_r);
  monkey.addAnimation("collide", mk_c);
  
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  iGround = createSprite(300,278,600,7);
  iGround.visible = true;
  
}

function draw(){
  background("cyan");
  fill("black");
  text("SURVIVAL TIME: "+score, 450, 20);
  text("Score: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();

    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space") && monkey.y > 235) {
      monkey.velocityY = -14 ; 
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    } 
    if (monkey.isTouching(bananaGroup)){
      bananaScore = bananaScore+1;  
      bananaGroup.destroyEach();
       
    }
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", mk_c);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAME OVER", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to restart", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", mk_r);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(iGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImg);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obsImg);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.09 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}