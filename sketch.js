var dog,sadDog,happyDog;
var foodS,foodStock;
var addFood;
var foodObj;
var  feed,lastFed;
var database;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog");
  feed.position(800,95);
 feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  //write code to display text lastFed time here
fill(255,255,254)
textSize(15)
if(lastFed>=12){
text("Last Feed: "+lastFed%12+"PM",350,30)
}else if(lastFed==0){
  text("Last Fed:12 PM",350,30)
}else {
text("Last Fed:"+lastFed+"AM",350,30)
}   

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  readCurrentFoodStock();
foodS--
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
  var food_stock_val=foodS
if(food_stock_val<=0){
foodObj.updateFoodStock(food_stock_val  *0)
}else {
  foodObj.updateFoodStock(food_stock_val  *-1)
}


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function readCurrentFoodStock(){
  food=database.ref('Food')
  food.on("value",readStock)
}
