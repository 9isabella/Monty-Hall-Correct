var carDoor;
var otherDoor;
var user;
var userDoor;

var wins = 0;
var loses = 0;
var games = 0;
var winsStayed = 0;
var winsSwitched = 0;

var doorOne = document.getElementById('doorOne');
var doorTwo = document.getElementById('doorTwo');
var doorThree = document.getElementById('doorThree');

var simulateBtn = document.getElementById('simulateBtn');


doorOne.addEventListener('click', function() {
  chooseRandom(1);
});
doorTwo.addEventListener('click', function() {
  chooseRandom(2);
});
doorThree.addEventListener('click', function() {
  chooseRandom(3);
});


simulateBtn.addEventListener('click', function() {
  simulate(document.querySelector('#numberOfTimes').value);
});


//creates stay button
var stayButton = document.createElement("button");
stayButton.className = "btn btn-secondary btn-lg btn-block";
stayButton.id = "stayButtonId";
stayButton.type = "button";
stayButton.innerHTML = "Stay";
stayButton.addEventListener('click', function() {
  changeDoor(1);
});

//creates switch button
var switchButton = document.createElement("button");
switchButton.className = "btn btn-secondary btn-lg btn-block";
switchButton.id = "switchButtonId";
switchButton.type = "button";
switchButton.innerHTML = "Switch";
switchButton.addEventListener('click', function() {
  changeDoor(2);
});
var resetButton = document.createElement("button");

function chooseRandom(i) {
  user = i;

  //document.getElementById('simDiv').parentNode.removeChild(simDiv);

  //puts border around selected door
  if (user === 1) {
    document.getElementById("doorOneSelect").style.borderColor = "#83888C";
  } else if (user === 2) {
    document.getElementById("doorTwoSelect").style.borderColor = "#83888C";
  } else {
    document.getElementById("doorThreeSelect").style.borderColor = "#83888C";
  }

  carDoor = Math.floor(Math.random() * 3) + 1;

  if (carDoor === user) {
    //select random door that is not user to reveal
    if (carDoor === 1) { //userDoor/carDoor is 1
      goatDoor = Math.floor(Math.random() * 2) + 2;
      if (2 - goatDoor === 0) {
        otherDoor = 3;
        document.getElementById('doorTwoImg').src = "goat.png";
      } else {
        otherDoor = 2;
        document.getElementById('doorThreeImg').src = "goat.png";
      }
    } else if (carDoor === 2) { //userDoor/carDoor is 2
      goatDoor = Math.floor(Math.random() * 3) + 1;
      while (goatDoor === 2) {
        goatDoor = Math.floor(Math.random() * 3) + 1;
      }
      if (1 - goatDoor === 0) {
        otherDoor = 3;
        document.getElementById('doorOneImg').src = "goat.png";
      } else {
        otherDoor = 1;
        document.getElementById('doorThreeImg').src = "goat.png";
      }
    } else { //userDoor/carDoor is 3
      goatDoor = Math.floor(Math.random() * 2) + 1;
      if (2 - goatDoor === 0) {
        otherDoor = 1;
        document.getElementById('doorTwoImg').src = "goat.png";
      } else {
        otherDoor = 2;
        document.getElementById('doorOneImg').src = "goat.png";
      }
    }
  } else if (user === 1 && carDoor === 2) {
    //reveal door 3
    document.getElementById('doorThreeImg').src = "goat.png";
    otherDoor = 2;
  } else if (user === 1 && carDoor === 3) {
    //reveal door 2
    document.getElementById('doorTwoImg').src = "goat.png";
    otherDoor = 3;
  } else if (user === 2 && carDoor === 1) {
    //reveal door 3
    document.getElementById('doorThreeImg').src = "goat.png";
    otherDoor = 1;
  } else if (user === 2 && carDoor === 3) {
    //reveal door 1
    document.getElementById('doorOneImg').src = "goat.png";
    otherDoor = 3;
  } else if (user === 3 && carDoor === 1) {
    //reveal door 2
    document.getElementById('doorTwoImg').src = "goat.png";
    otherDoor = 1;
  } else if (user === 3 && carDoor === 2) {
    //reveal door 1
    document.getElementById('doorOneImg').src = "goat.png";
    otherDoor = 2;
  }

  //appends stay button
  document.getElementById('stayOrSwitch').appendChild(stayButton);

  //appends switch button
  document.getElementById('stayOrSwitch').appendChild(switchButton);

  //disable buttons once first choice has been made
  document.getElementById("doorOne").disabled = true;
  document.getElementById("doorTwo").disabled = true;
  document.getElementById("doorThree").disabled = true;

}

function changeDoor(choice) {
  if (choice === 1) { //if they choose to stay
    if (user === carDoor) {
      wins++;
      winsStayed++;
    } else {
      loses++;
    }
  } else if (choice === 2) { //if they switch

    //switch border selector
    document.getElementById("doorOneSelect").style.borderColor = "#691D2A";
    document.getElementById("doorTwoSelect").style.borderColor = "#691D2A";
    document.getElementById("doorThreeSelect").style.borderColor = "#691D2A";
    if(otherDoor ===1){
      document.getElementById("doorOneSelect").style.borderColor = "#83888C";
    }else if(otherDoor ===2){
      document.getElementById("doorTwoSelect").style.borderColor = "#83888C";
    }else{
      document.getElementById("doorThreeSelect").style.borderColor = "#83888C";
    }

    if (otherDoor === carDoor) {
      wins++;
      winsSwitched++;
    } else {
      loses++;
    }
  }

  //remove stay and switch buttons
  switchButton.parentNode.removeChild(switchButton);
  stayButton.parentNode.removeChild(stayButton);

  games++;

  //show car
  if (carDoor === 1) {
    document.getElementById('doorOneImg').src = "car.png";
  } else if (carDoor === 2) {
    document.getElementById('doorTwoImg').src = "car.png";
  } else if (carDoor === 3) {
    document.getElementById('doorThreeImg').src = "car.png";
  }

  proportions();

  //create reset button
  resetButton.className = "btn btn-secondary btn-lg btn-block";
  resetButton.id = "resetButtonId";
  resetButton.type = "button";
  resetButton.innerHTML = "New Game";
  document.getElementById('reset').appendChild(resetButton);
  resetButton.addEventListener('click', function() {
    reset();
  });

}

function proportions() {
  document.getElementById('wins').textContent = "Wins: " + wins;
  document.getElementById('loses').textContent = "Loses: " + loses;

  var percentStayed = (winsStayed / games) * 100;
  var percentSwitched = (winsSwitched / games) * 100;

  document.getElementById('winsWhenStayed').textContent = "You've won " + percentStayed + " % of games when you stayed";
  document.getElementById('winsWhenSwitched').textContent = "You've won " + percentSwitched + " % of games when you switched";
}

function reset() {
  //re-enable buttons
  document.getElementById("doorOne").disabled = false;
  document.getElementById("doorTwo").disabled = false;
  document.getElementById("doorThree").disabled = false;

  //reset all variables
  carDoor = 0;
  otherDoor = 0;
  user = 0;

  //reset door images
  document.getElementById('doorOneImg').src = "door.png";
  document.getElementById('doorTwoImg').src = "door.png";
  document.getElementById('doorThreeImg').src = "door.png";

  //reset all border colors
  document.getElementById("doorOneSelect").style.borderColor = "#691D2A";
  document.getElementById("doorTwoSelect").style.borderColor = "#691D2A";
  document.getElementById("doorThreeSelect").style.borderColor = "#691D2A";

  //clear text
  document.getElementById('result').textContent = "";

  //remove reset button
  resetButton.parentNode.removeChild(resetButton);
}

function simulate(times) {
  for(i = 0; i < times; i++){
    carDoor = Math.floor(Math.random() * 3) + 1;
    userDoor = Math.floor(Math.random()*3)+1;
    switchOrNah = Math.floor(Math.random()*2)+1;
    if(switchOrNah === 1){ //staying
      if(userDoor === carDoor){
        wins++;
        winsStayed++;
      }else{
        loses++;
      }
    }else if(switchOrNah === 2){//switching
      if(userDoor === carDoor){
        loses++;
      }else{
        wins++;
        winsSwitched++;
      }
    }
    games++;
  }
  proportions();
}
