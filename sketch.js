var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage,gameOverImage,gameOver,restartImage,restart;
var play=1;
var end=0;
var gameState=play;
//var message

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  // cargar imagenes de restar y gameover 
  restartImage=loadImage("restart.png")
  gameOverImage=loadImage("gameOver.png")
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");

  Sound=loadSound("jump.mp3")
  Sound1=loadSound("die.mp3")
  Sound2=loadSound("checkpoint.mp3")

  
}

function setup() {
  var message="esto es un mensaje"
  console.log(message)

  createCanvas(windowWidth,windowHeight)
 /* document.getElementById("defaultCanvas0").style.setProperty('padding-top',((window.innerHeight - 200)/2).toString()+"px");
  console.log((window.innerHeight - 600).toString())
  document.getElementById("defaultCanvas0").style.setProperty('padding-left',((window.innerWidth - 600)/2).toString()+"px");
  console.log(window.innerWidth)*/

  //crear sprite de trex
  trex = createSprite(50,height-40 ,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  gameOver=createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;

  restart=createSprite(width/2,height/2)
  restart.addImage(restartImage)
  restart.visible=false;
  
  //crear sprite de suelo
  ground = createSprite(width/2,height-10,width,125);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  trex.addAnimation("collided",trex_collided)

  
  
  //crear suelo invisible
  invisibleGround = createSprite(width/2,height-5,width,1);
  invisibleGround.visible = false;
  var rand=Math.round(random(1,100))
  //console.log(rand);
 //console.log("Hola"+"Mundo")
 score=0;
obstaclesGroup=createGroup();
cloudsGroup=createGroup();

trex.setCollider("circle",0,0,40)
trex.debug=true;
//inteligencia artificial
 //trex.setCollider("rectangle",0,0,180,trex.height);
 //trex.debug=true

}



function draw() {
  //establecer color de fondo
  background(220);
  //console.log(message)
 
  text("Puntuación:"+score,width-100,50);
  //score=score+Math.round(frameCount/60)
  if(gameState===play){
    ground.velocityX = -(4+3*score/100);
    score=score+Math.round(getFrameRate()/60)
    //console.log(score)
    if(score>0 && score%100===0){
      Sound2.play();
      //console.log(score)
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if((touches.lenght>0 || keyDown("space")) && trex.y >= height-100) {
      trex.velocityY = -10;
      Sound.play();
      touches=[];
    }
    
    trex.velocityY = trex.velocityY + 0.8
    spawnObstacles(); 

    spawnClouds();
    if(obstaclesGroup.isTouching(trex)){
      gameState=end
      //trex.velocityY=-8
      Sound1.play();
    }
   
    
  }
  else if(gameState===end){
    ground.velocityX=0;

    trex.velocityY=0;
    
    gameOver.visible=true;
    restart.visible=true;
    trex.changeAnimation("collided",trex_collided)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    if((touches.length>0 || mousePressedOver(restart))){
      console.log("Reinicia el juego")
      reset();
      touches=[];
    } 
    if (mousePressedOver()){

    }

    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
  }
  
  trex.collide(invisibleGround);

  drawSprites();
  
}

function reset(){
  gameState=play;
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running)
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
}




//FUNCION PARA CREAR NUBES 
function spawnClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(10,60))
    cloud.scale=0.9;
    cloud.velocityX=-3
    cloud.lifetime=200;
    //console.log(trex.depth);
    //console.log(cloud.depth);
    cloud.depth=trex.depth
    trex.depth=trex.depth + 1
    cloudsGroup.add(cloud)
  }
}
  function spawnObstacles(){
    if(frameCount%60==0){
      var obstacle=createSprite(600,165,10,40);
      obstacle.velocityX=-(6+score/100);

    var rand=Math.round(random(1,6))
  
 switch(rand){
  case 1: obstacle.addImage(obstacle1);
          break;
  case 2: obstacle.addImage(obstacle2);
          break;
  case 3: obstacle.addImage(obstacle3);
          break; 
  case 4: obstacle.addImage(obstacle4);
          break;  
  case 5: obstacle.addImage(obstacle5);
          break;   
  case 6: obstacle.addImage(obstacle6);
          break;  
  default:break;        
 }
 obstacle.scale=0.5;
 obstacle.lifetime=300;
 obstaclesGroup.add(obstacle)
    }
    
  }
 



