  //Create variables here
  var foodS,foodStock,database;
  var dog,happyDog,dogImg,happyImg;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyImg=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  
  dog=createSprite(250,400,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  
}

function draw() {  
  background("deeppink");

  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyImg);
  }else if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
  }

  drawSprites();
  
  textSize(15);
  textFont("Algerian");
  fill("blue")
  text("Note:Press the up arrow to feed drago milk",70,50);
  textSize(20)
  fill("yellow")
  text("Food Remaining:"+foodS,150,150);


}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
if(x<=0){
  x=0
}else{
  x=x-1
}


  database.ref('/').update({
  Food:x
  })
}



