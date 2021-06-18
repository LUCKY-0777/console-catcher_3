var PLAY,END,
 gameState;

var bgimg,hellkimg,groundimg,obstacle1,obstacle2,obstacle3,restartimg,gameoverimg,consoleimg;

var bg,hellking,alien_gamer,ground,invisibleGround,gameOver,restart,obstacle,console,rand;

var ObstaclesGroup,consolegroup;

var score=0;

function preload(){
 bgimg=loadImage("space_10.png");
 hellkimg=loadImage("retroship_06_189.png");
 alienimg=loadAnimation("alienBlue_walk_10.png","alienBlue_walk_11.png");
 groundimg=loadImage("sprite_0[1].png_10.png");
 obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
 obstacle3=loadImage("obstacle3.png");
  restartimg=loadImage("sprite_0.png_10-1.png");
  gameoverimg=loadImage("sprite_0.png_10.png");
  consoleimg=loadImage("video_game_controller_10.png");
}

function setup() {
  
 PLAY = 1;
 END = 0;
gameState = PLAY;
  
  bg=createSprite(200,200);
bg.addImage("bg",bgimg);

 hellking=createSprite(50,360,20,20);
 hellking.addImage("hellking",hellkimg);
 

 alien_gamer=createSprite(240,360,20,20);
alien_gamer.addAnimation("alienBlue",alienimg);
alien_gamer.scale="0.5";
alien_gamer.setCollider("circle",0,0,45);


 ground=createSprite(200,390,400,20);
ground.addImage("sprite",groundimg);
 ground.velocityX=-2;
ground.x=ground.width/2;

 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

 gameOver = createSprite(200,200);
 restart = createSprite(200,230);
gameOver.addImage("gameover",gameoverimg);
gameOver.scale = 0.5;
restart.addImage("restart",restartimg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;
  



textFont("Georgia");    
textStyle(BOLD);
  
  consolegroup =new Group();
  ObstaclesGroup =new Group();
}

function draw() {
 background("cyan");
 
 if (gameState ===PLAY){
   
   spawnObstacles();
   spawnconsole();
   
   if(ground.x < 0){
  ground.x=ground.width/2;
}
alien_gamer.collide(ObstaclesGroup);

 if (keyDown("space")&&alien_gamer.y>=355) {
  alien_gamer.velocityY=-10;
 }
   if(consolegroup.isTouching(alien_gamer)){
     consolegroup.destroyEach();
     score=score+1;
   }
   
   if(hellking.isTouching(alien_gamer)){
      gameState = END;
    }
    
    if(score>=10){
     gameState = END;
    }
   
   if(ObstaclesGroup.isTouching(alien_gamer)){
     ground.velocityX=-6;
      }
   if(alien_gamer.x<=0){
     gameState=END; 
   }
 }
   
 
 if (gameState === END){
    
    gameOver.visible = true;
    restart.visible = true;
    alien_gamer.visible = false;
    hellking.visible = false;
    bg.visible = false;
   ground.visible= false;  
  
    ground.velocityX = 0;
    hellking.velocityX = 0;
    alien_gamer.velocityX = 0;
    
    ObstaclesGroup.destroyEach();
    consolegroup.destroyEach();
    
    ObstaclesGroup.setVelocityXEach(0);
    consolegroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    consolegroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();

 }
 }


alien_gamer.velocityY=alien_gamer.velocityY+0.5;
alien_gamer.collide(invisibleGround);
hellking.collide(invisibleGround);


drawSprites();
alien_gamer.collide(ground); 
hellking.collide(ground);

fill("cyan");
textSize(25);
text("score:",55,80);
text(score,135,80);

}

 function reset(){
 gameState = PLAY;
 restart.visible=0;
 gameOver.visible=0;
 alien_gamer.visible = true;
    hellking.visible = true;
    bg.visible = true;
    ground.visible=true;
 score=0;
 alien_gamer.x=240;
 }
 
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    obstacle = createSprite(400,365,10,40);
    obstacle.velocityX=-(4+(score/1)); 
    
     
   rand = Math.round(random(1,3));
    switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
     case 3: obstacle.addImage(obstacle3);
            break;        
    default:break;         
    }
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 110;
  
    ObstaclesGroup.add(obstacle);
  }
}

function spawnconsole() {

  if (World.frameCount % 60 === 0) {
    console = createSprite(400,320,40,10);
    console.y  = random(240,280);
    console.addImage("video",consoleimg);
    console.scale = 0.3;
    console.velocityX=-(4+(score/1));
    
    
    console.lifetime = 134;
    
    consolegroup.add(console);
  }
  
}