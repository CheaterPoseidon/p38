var player, playerImage, banana, bananaImage, bananaGroup, obstacle, obstacleImage, obstacleGroup, ground, scene, sceneImage

var score

var GameState

function preload() {
  playerImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  sceneImage = loadImage("jungle.jpg")

}

function setup() {

  createCanvas(displayWidth,displayHeight-111);
  scene = createSprite(displayWidth/2,height/2, width, height)
  scene.addImage("scene", sceneImage);

  scene.x = scene.width / 2;
  scene.scale=3.5
  scene.velocityX = -10;
  player = createSprite(100,645, 10, 10);
  player.addAnimation("running", playerImage);
  player.scale = 0.3;
  ground = createSprite(200,680, 400, 10);
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  score = 0;

  GameState="Play"

}

function draw() {

  
  camera.position.y=player.y
if (score>=10){
  GameState="End"
}
if (GameState=="Play"){
if(scene.x<0){
  scene.x=scene.width/2
  
}

  
  ground.visible = false;


  if (keyDown("space") && player.y >= 349.3) {
    player.velocityY = -25;
  }
  player.velocityY = player.velocityY + 0.8;
  player.collide(ground);

for(var i=0;i<bananaGroup.length;i++){
if(bananaGroup.get(i).isTouching(player)){
  bananaGroup.get(i).destroy()
  score = score + 2;
}
}

for(var i=0;i<obstacleGroup.length;i++){
  if(obstacleGroup.get(i).isTouching(player)){
    obstacleGroup.get(i).destroy()
    score = score - 1;
    player.scale = 0.15;
  }
  }

  console.log(player.y);
  switch (score) {
    case 10:
      player.scale = 0.18;
      break;
    case 20:
      player.scale = 0.22;
      break;
    case 30:
      player.scale = 0.25;
      break;
    case 40:
      player.scale = 0.28;
      break;
    case 50:
      player.scale = 0.3;
      break;
    default:
      break;
  }

  spawnBanana();
  spawnStone();
  drawSprites();
}
  else if(GameState=="End"){
    scene.velocityX=0
    player.velocityY=0
    bananaGroup.destroyEach()
    obstacleGroup.destroyEach()
    drawSprites();
    fill("red")
    textSize(100)
    text("You Win!",displayWidth/3,displayHeight/3)
  }
  
  fill("white");
  text("score: " + score, player.x,150)
}

function spawnBanana() {
  if (frameCount % 80 == 0) {
    banana = createSprite(displayWidth, random(400, 525), 5, 5)
    banana.addImage("bananie", bananaImage);
    banana.velocityX = -7.5;
    banana.scale = 0.15
    bananaGroup.add(banana);
  }

}

function spawnStone() {
  if (frameCount % 100 == 0) {
    obstacle = createSprite(displayWidth, 645, 5, 5);
    obstacle.addImage("stone", obstacleImage);
    obstacle.velocityX = -7.5;
    obstacle.scale = 0.3;
    obstacleGroup.add(obstacle);
  }
}