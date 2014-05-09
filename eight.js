var array = ["x", 1, 2, 3, 4, 5, 6, 7, 8];
var numbers = [];
var deviceWidth, deviceHeight;
var startSec;
var startMin;
var startHr;
var totalStep = 0;
var clockId;
var gameStarted = false;
var downButton = null;
var xButtonColor = "white";

function init()
{
  array = shuffle(array);
  //array = [1,2,3,4,5,6,7,"x",8];
  for(var i = 0; i < array.length; i++) {
    if(array[i] != "x") {
      document.getElementsByTagName("button")[i].style.backgroundColor="skyblue";
      document.getElementsByTagName("button")[i].style.color="black";
      document.getElementsByTagName("button")[i].innerHTML=array[i];
    }
    else {
      document.getElementsByTagName("button")[i].style.backgroundColor=xButtonColor;
      document.getElementsByTagName("button")[i].style.color=xButtonColor;
      document.getElementsByTagName("button")[i].innerHTML="x";
    }
  }
  var start = new Date();
  startSec = start.getSeconds();
  startMin = start.getMinutes();
  startHr = start.getHours();
  clock();
  clockId = setInterval(clock, 1000);
  totalStep = 0;
  $("#totalStep").html(totalStep);
}

function isNeighbour(x,y)
{
  var i = getIndex(x);
  var j = getIndex(y);
  if( (j == i-1&&i%3 != 0) || (j == i+1 && i%3 !=2) || j == i+3 || j == i-3)
    return true;
  return false;
}
$(document).ready(function() {
  $("#begin").click( function() {
    gameStarted = true;
    init();
  });
  $(".ui-block-i button").mousedown(function() {
    downButton = this;
  });
  $(".ui-block-i button").mouseup(function() {
    if($(this).html() != "x") {
      $(this).css("background-color","skyblue");
      $(this).css("color","black");
    }
    downButton = null;
  });
  $(".ui-block-i button").mouseover(function() {
    if(!gameStarted)
      return;
    if(downButton != null&& $(this).html() == "x" && (isNeighbour(this,downButton))) {
      $(this).css("background-color","skyblue");
      $(this).css("color","black");
      $(this).html($(downButton).html());
      $(downButton).html("x");
      $(downButton).css("background-color", xButtonColor);
      $(downButton).css("color",xButtonColor);
      totalStep++;
      $("#totalStep").html(totalStep);
      if(sucess()) {
        clearInterval(clockId);
        gameStarted = false;
        alert("Congratulations!");
      }
    }
  });
  $(".ui-block-i button").mouseout(function() {
    if($(this).html() != "x") {
      $(this).css("background-color","skyblue");
      $(this).css("color","black");
    }
  });
});

function clock()
{
  $("#totalTime").html("time1");
  var now = new Date();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();
  var totalhr = hr - startHr;
  var totalmin = min - startMin;
  var totalsec = sec - startSec;
  if (totalsec < 0) {
    totalsec += 60;
    totalmin -= 1;
  }
  if (totalmin < 0) {
    totalmin += 60;
    totalhr -= 1;
  }
  var timeText = totalhr + "h" + totalmin + "&prime;" + totalsec + "&Prime;";
  $("#totalTime").html(timeText);

}
function get0index()
{
  var index;
  $("button").each(function(i) {
    if($(this).html() == "x") {
      index = i;
      return i;
    }
  });
  return index;
}
function getIndex(x)
{
  var index;
  $("button").each(function(i) {
    if($(this).html() == $(x).html()) {
      index = i;
      return i;
    }
  });
  return index;
}

var shuffle = function(v)
{
  for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
  return v;
}

function swap(x,y)
{
  var tmp=-1;
  totalStep++;
  tmp = $("#button"+x).html();
  $("#button"+x).html($("#button"+y).html());
  $("#button"+y).html(tmp);
  $("#totalStep").html(totalStep);
  $("#button"+x).css("background-color","skyblue");
  $("#button"+x).css("color","black");
  $("#button"+y).css("background-color",xButtonColor);
  $("#button"+y).css("color",xButtonColor);
  if(sucess()) {
    clearInterval(clockId);
    gameStarted = false;
    alert("Congratulations!");
  }
}

$(document).keydown(function(e){
  if (!gameStarted)
    return;
  var index = get0index();
  if(e.keyCode == 38) { //up
    if(index < 6) {
      swap(index, index+3);
    }
  } else if (e.keyCode == 40) { //down
    if(index > 2) {
      swap(index, index-3);
    }
  } else if (e.keyCode == 37) { //left
    if(index % 3 != 2) {
      swap(index, index+1);
    }
  } else if(e.keyCode == 39) { //right
    if(index % 3 != 0) {
      swap(index, index -1);
    }
  }
});

function sucess()
{
  for(var i = 0; i < array.length-1; i++)
    if($("#button"+i).html() != i+1)
      return false;
  return true;
}
