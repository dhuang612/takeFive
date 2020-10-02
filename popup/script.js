//store the dom elements we need to manipulate into variables
//we will eventually need to dynamically grab this / can we use a function?
// var timerTitle = document.getElementById('standUp')
var standTimer = document.getElementById('stand');
var timerContainer = document.getElementById('timeRemain-container')
var createTimer = document.querySelector('.standTime')
var removeTimer = document.querySelector('.removeTime')
createTimer.addEventListener('click', addTime)
removeTimer.addEventListener('click',removeTime)

function onError(error){
  console.log(error)
}


//create a function to pull the data from local storage
initialize()

function initialize(){
  var getStorageItems = browser.storage.local.get(null)
  getStorageItems.then((results)=> {
    var timeKeys = Object.keys(results);
    for(let timeKey of timeKeys){
      var currVal = results[timeKey];
      displayTime(timeKey, currVal)
    }
  }, onError)
}

//timer function to count down the remaining time
function timer(){
  let minutes;
  let hours;
 var countDown = minutesOrHours();
//  if(countDown === 'minutes'){
//   minutes = parseInt(standTimer.value, 0);
//  } else {
//    hours = parseInt(standTimer.value, 0)
//  }
//  var current = (hours * 3600) + (minutes * 60)
//  if(current > 0){

//  }
 console.log('hit the timer!')
}


function minutesOrHours(){
  //to get a radio button value you have to submit a 'form'
  var minutesHours = document.querySelector('input[name="time"]:checked').value
  let timerAmount;
  if(minutesHours === 'minutes'){
  return timerAmount  = ' minutes';
  } else {
   return timerAmount = ' hours';
  }
}

function addTime(){
 let timerAmnt = standTimer.value+ minutesOrHours()
  var timerName ='standup'
  var currTime = browser.storage.local.get(timerName);
  currTime.then((result)=>{
    var exists = Object.keys(result);
    if(exists < 1 && timerName !== '' && timerAmnt !== ''){
      timerName.value = '';
      timerAmnt.value = '';
      storeTime(timerName, timerAmnt);
    }
  }, onError)

}
function storeTime(name, time){
  let storeTime = browser.storage.local.set({[name]: time})
  storeTime.then(()=>{
    //maybe in here initialize a date time and do some sort of comparions
    displayTime(name, time);
  }, onError)
}

function displayTime(name, time){
  var timer = document.createElement('div');
  var timerDisplay = document.createElement('div');
  var timerH = document.createElement('h2');
  var timerShow = document.createElement('p');
  var startBtn = document.createElement('button');
  startBtn.innerText="start timer";
  startBtn.setAttribute('id', 'start')
  setTimeout(()=>{
    var button = document.getElementById('start');
    if(button !== undefined){
      button.addEventListener('click',timer)
    }
  },3000)


  timer.setAttribute('class', 'time')
   //maybe in here initialize a date time and do some sort of comparions
  timerH.textContent = name;
  timerShow.textContent = time;
  timerShow.appendChild(startBtn);
  timerDisplay.appendChild(timerH);
  timerDisplay.appendChild(timerShow);
  timer.appendChild(timerDisplay)
  timerContainer.appendChild(timer)
}


function removeTime(){
  while(timerContainer.firstChild){
    timerContainer.removeChild(timerContainer.firstChild)
  }
  browser.storage.local.clear()
}
