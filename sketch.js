var PLAY = 1;
var END = 0;
var gameState = PLAY;
var coin,coin2;
var mario_jump;
var mario_running,mario_running2;
var mario_wins;
var gameover,restart;
var mario;
var victory;
var wallpaper,ground,groundImage,invisibleGround;
var obt1,obt2,obt3,obt4;
var score = 0;
var obstacleGroup;

function preload(){


  bgImg = loadImage("assets/wallpaper.jpg");
  groundImage = loadImage("assets/ground2.png");
  coinImg = loadImage("assets/coin.png");
  coin2Img = loadImage("assets/coin2.png");
  jump = loadImage("assets/mario_jumping.png");
  running = loadImage("assets/mario_running.png");
  running2 = loadImage("assets/mario_running2.png");
  mario = loadImage("assets/mario_starts.png");
  win = loadImage("assets/mario_wins.png");
  victory = loadImage("assets/victory.png");
  gameOver = loadImage("assets/mario_gameover.png");
  restartImg = loadImage("assets/restart.png");
  obstacle1 = loadImage("assets/mario_obt1.png");
  obstacle2 = loadImage("assets/mario_obt2.png");
  obstacle3 = loadImage("assets/mario_obt3.png");
  obstacle4 = loadImage("assets/mario_obt4.png");

  sound1 = loadSound("sounds/mario_jump_sound.wav");
  sound2 = loadSound("sounds/mario_bg_sound.wav");
  sound3 = loadSound("sounds/mario_collect_coins.wav");
  sound4 = loadSound("sounds/mario_fails_sound.wav");


}




function setup() {

  createCanvas(2000,800);
  
 // bg = createSprite(1000,100);
 // bg.addImage(bgImg);
 // bg.scale = 2
  
  mario = createSprite(50,550,20,50);
  mario.addImage(running)
  mario.addImage("finish",gameOver)
 // mario.addImage("jumping",jump)
  mario.scale = 0.5;
  mario.velocityX = 5;

  ground = createSprite(200,610,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  restart = createSprite(1000,450);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible = false;
  
  obstacleGroup = new Group()

  invisibleGround = createSprite(200,580,width*5,10);
  invisibleGround.visible = false;

  console.log("Hello"+ 5);
  
  score = 0;
}

function draw() {
  background(255,255,255);  

  image(bgImg,0,0,width*2,800)


  if(gameState === PLAY){

    if(!sound2.isPlaying()){
      sound2.play()
    }
    
    
  textSize(40)
  text("score :"+ score , 1500,100);
  score = score +Math.round (frameCount / 60)
    

    if(keyWentDown("space")&& mario.y >= 250) {
      mario.velocityY = -10;
      mario.addImage(jump)
      sound1.play()
    }

    
    if(keyWentUp("space")){
      mario.addImage(running)
    }
    
    if(obstacleGroup.isTouching(mario)){
       gameState = END
       sound4.play()
      
      
    }
    
    mario.velocityY = mario.velocityY + 0.8
   
  
  
  
  
  
  
  
  camera.position.x = mario.x 
  
  spawnObstacles()
    

  }

  if(gameState === END){
    sound2.stop();

    obstacleGroup.destroyEach()

    mario.changeImage("finish")

    mario.velocityX = 0
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  mario.collide(invisibleGround);

  if(mario.x > 3000){
    //finish()
  }
  drawSprites();
}
function spawnObstacles(){
  if(frameCount % 60 == 0){
    var obstacles = createSprite(1000,550,30,30);
    
    obstacles.scale = 0.5;
    obstacleGroup.add(obstacles)

  var rand = Math.round(random(1,4))

 switch(rand){
      
  case 1:
    obstacles.addImage(obstacle1);
    break;
    
    case 2:
      obstacles.addImage(obstacle2);
      break;

   case 3:
    obstacles.addImage(obstacle3);
    break;

    case 4:
    obstacles.addImage(obstacle4);
    break;

   

  default:
    break;
    
 }
  }



}
function finish(){

  swal({
    title:"Game Finish",
    text:"Thank You For Playing",
    imageUrl:"https://github.com/Hussainlokhandwala/self-designer/blob/main/assets/mario_wins.png",
    imageSize:"150x150",
    confirmButtonText:"OK"
  })
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  gameOver.visible = false;
  obstacleGroup.destroyEach();

  mario.changeAnimation("running",mario_running);
  
 
  
  score = 0;
}