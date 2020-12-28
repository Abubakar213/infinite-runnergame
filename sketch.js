//variables

var monkey , monkey_running,monkey_stable;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var ground;
var background1,backgroundImg;
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_stable = loadImage("sprite_1.png"); 
  backgroundImg = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(displayWidth,displayHeight);
  
  
  monkey = createSprite(displayWidth-1700,displayHeight-200,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.25;
  monkey.velocityX=4;
  
  
  ground =createSprite(displayWidth-900,displayHeight-100,displayWidth+1000,10);
  ground.visible=true;
  
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  score=0;

}


function draw() {
   background("jungle.png");
   image(backgroundImg,-displayWidth*2,0,displayWidth*5,displayHeight);
    
    ground.velocityX = -(4 + 3* score/100)
    
    if (ground.x < 900){
      ground.x= displayWidth/2;
      
    }
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    //add gravity
    monkey.velocityY =monkey.velocityY + 0.8
    monkey.collide(ground);
    spawnObstacles();
    spawnFood();
    if(obstaclesGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      monkey.velocityX = 0;                  
      
     
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
     
      FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
  }
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
  
  camera.position.x=monkey.x;
  drawSprites();
  //displaying score
  textSize(50);
  fill("white");
  text("Score: "+ score, 500,50);
   stroke("black");
  textSize(50);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,30,50);
}
function spawnObstacles(){
 
  if (frameCount % 100 === 0){
   var obstacle = createSprite(displayWidth,displayHeight-135,10,40);
   obstacle.velocityX = -(10 + score/100);
   obstacle.addImage("obstacle",obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  } 
}
function spawnFood(){
  if (frameCount  % 200 === 0){
    var banana = createSprite(1200,120,10,40);
    banana.y = Math.round(random(300,500));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -7;
    //assign lifetime to the variable
    banana.lifetime = 200;
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}




