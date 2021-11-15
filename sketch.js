var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieIMG, zombie, zombieGroup, zombieFasterGroup, zombieGiantGroup;
var zombieFaster,zombieFasterIMG, zombieGiant, zombieGiantIMG;
var bulletIMG,bullet,bulletGroup;
var score = 0;
var gameState = "PLAY";
var restart, restartIMG, gameOver, gameOverIMG;

function preload(){
  
  shooterImg = loadAnimation("assets/shooter_1.png","assets/shooter_2.png","assets/shooter_5.png");

  bgImg = loadImage("assets/graveyard2.jpg");

  zombieIMG = loadAnimation("assets/zombie1.png","assets/zombie2.png","assets/zombie3.png","assets/zombie4.png","assets/zombie5.png","assets/zombie6.png");

  zombieFasterIMG  = loadAnimation("assets/zombieFaster1.png","assets/zombieFaster2.png","assets/zombieFaster3.png","assets/zombieFaster4.png");

  zombieGiantIMG = loadAnimation("assets/zombieGiant1.png","assets/zombieGiant2.png","assets/zombieGiant3.png","assets/zombieGiant4.png","assets/zombieGiant5.png","assets/zombieGiant6.png");

  restartIMG = loadImage("assets/reset.png");

  gameOverIMG = loadImage("assets/gameover.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale = 1.1;


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-200, 50, 50);
 player.addAnimation("shooter",shooterImg);
   //player.scale = 0.3
 //  player.debug = true
   player.setCollider("rectangle",0,0,300,300);

   gameOver = createSprite(width/2, height/2);
   gameOver.addImage(gameOverIMG);
   gameOver.scale = 0.5;

   restart = createSprite(width/2, height/2-300,50,50);
   restart.addImage(restartIMG);
   restart.scale = 0.2;
   restart.debug = true;
   restart.setCollider("rectangle", 0, 0, 400, 400);

   zombieGroup = new Group();
   zombieFasterGroup = new Group();
   zombieGiantGroup = new Group();
   bulletGroup = new Group();

}

function draw() {

  background(0); 
  
  if(gameState === "PLAY"){

    bg.velocityX = -2;
    
    if(bg.x < 170){
      bg.x= width;
    }

    gameOver.visible = false;
    restart.visible = false;

    spawnBullets();
    
    spawnZombie();
    
    spawnZombieFaster();
    
    spawnZombieGiant();
    
    if(zombieGroup.isTouching(bulletGroup)){
      bulletGroup.destroyEach();
      zombieGroup.destroyEach();
      score = score + 2;
    }
    
    if(zombieFasterGroup.isTouching(bulletGroup)){
        bulletGroup.destroyEach();
        zombieFasterGroup.destroyEach();
        score = score + 5;
      }
      
      if(zombieGiantGroup.isTouching(bulletGroup)){
        bulletGroup.destroyEach();
        zombieGiantGroup.destroyEach();
        score = score + 10;
      }
      
      if(score>100 || zombieGroup.isTouching(player) || zombieFasterGroup.isTouching(player) 
      || zombieGiantGroup.isTouching(player)){
        gameState = "END";
      }
    }
    if(gameState === "END"){

     gameOver.visible = true
     restart.visible = true

     zombieFasterGroup.setVelocityXEach(0);
     zombieGiantGroup.setVelocityXEach(0);
     zombieGroup.setVelocityXEach(0);
     
     bg.velocityX = 0;

    }

    if(mousePressedOver(restart)){
      //console.log("YOU ARE DEAD");
      gameState = "PLAY";
      zombieFasterGroup.destroyEach();
      zombieGiantGroup.destroyEach();
      zombieGroup.destroyEach();
      score = 0;
      
    }
    drawSprites();
    textSize(40);
    fill("white");
    text("SCORE : "+ score, width-300, 100);

}

function spawnZombie(){

  if(frameCount % 225 === 0 ){
  zombie = createSprite(width-200,height-500);
  zombie.addAnimation("zombie",zombieIMG);
  zombie.scale = 3;
  zombie.velocityX = -4;
  zombie.lifeTime = 300;
  zombie.setCollider('rectangle',0,0,75,100);
  zombieGroup.add(zombie);
  }
}

function spawnBullets(){

if(keyWentDown("space")){
 bullet = createSprite(550,550,25,10);
 bullet.shapeColor = "red";
 bullet.velocityX = 20;
 bullet.lifeTime = 200;
 bulletGroup.add(bullet);


}
}

function spawnZombieFaster(){

  if(frameCount % 500 === 0 ){
  zombieFaster = createSprite(width-200,height-500);
  zombieFaster.addAnimation("faster",zombieFasterIMG);
  zombieFaster.scale = 2;
  zombieFaster.velocityX = -8;
  zombieFaster.lifeTime = 200;
  zombieFaster.setCollider('rectangle',0,0,200,400);
  zombieFasterGroup.add(zombieFaster);
  }
}

function spawnZombieGiant(){

  if(frameCount % 700 === 0 ){
  zombieGiant = createSprite(width-200,height-500);
  zombieGiant.addAnimation("Giant",zombieGiantIMG);
  zombieGiant.scale = 3
  zombieGiant.velocityX = -4;
  zombieGiant.lifeTime = 500;
  zombieGiant.setCollider('rectangle',0,0,200,400);
  zombieGiantGroup.add(zombieGiant);
  }
}
