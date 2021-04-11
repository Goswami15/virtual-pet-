//Create variables here
var database;
var dog1, dog2, dog3;
var foodS = 0;
var dogFood;
var milkbottle_img;
var milkbottle;
var feedDog, addFood;
var milkBottle;
var feedTime;
var lastFed;
var garden, washroom, bedroom;
var gameState, gameStateRef;

var currentTime;
function preload() {
  //load images here
  dog2 = loadImage("images/dogImg.png");
  dog3 = loadImage("images/dogImg1.png");
  milkbottle_img = loadImage("images/food.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");
  bedroom = loadImage("images/BedRoom.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 400);

  dog1 = createSprite(800, 200, 150, 150);
  dog1.addImage(dog2);
  dog1.scale = 0.2;

  dogFood = database.ref("Food");
  dogFood.on("value", readStock);
 
 
  feedDog = createButton("Feed Dog");
  feedDog.position(700, 95);
  feedDog.mousePressed(dogFeed);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(foodAdd);

  milkBottle = new Food();
}

function dogFeed() {
  if (foodS <= 0) {
    foodS = 0;
  } else {
    foodS = foodS - 1;
  }
  database.ref("/").update({
    Food: foodS,
    feedTime: hour(),
    gameState: "hungry",
  });
}

function foodAdd() {
  foodS = foodS + 1;
  database.ref("/").update({
    Food: foodS,
  });
}
function draw() {
  gameStateRef = database.ref("gameState");
 
  feedTime = database.ref("feedTime");
  gameStateRef.on("value", function (data) {
    
    gameState = data.val();
  });
  feedTime.on("value", function (data) {
    
    lastFed = data.val();
  });
  currentTime = hour();
  
  if (currentTime == (lastFed + 1)) {
    
    updateState("playing");
    milkBottle.garden();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    console.log("bathing");
    updateState("bathing");
    milkBottle.washroom();
  } else if (currentTime == (lastFed + 2)) {
   
    updateState("sleeping");
    milkBottle.bedroom();
  } else {
    
    updateState("hungry");
    background("blue");
    milkBottle.display();
   
    fill("white");
    textSize(20);
    text("Food Remaining: " + foodS, 250, 140);
    // if (lastFed >= 12) {
    //   text("last fed:" + (lastFed % 12) + " PM", 350, 30);
    // } else if (lastFed == 0) {
    //   text("Last Feed : 12 AM", 350, 30);
    // } else {
    //   text("Last Feed : " + lastFed + " AM", 350, 30);
    // }
  }
  if (gameState !== "hungry") {
    feedDog.hide();
    addFood.hide();
    dog1.remove();
  } else {
    console.log("Hungry executed")
    feedDog.show();
    addFood.show();
    dog1.addImage(dog2);
  }

  drawSprites();
  //add styles here
}

function readStock(data) {
  foodS = data.val();
  milkBottle.updateFoodStock(foodS);
}

function updateState(state) {
  database.ref("/").update({
    gameState: state,
  });
}
