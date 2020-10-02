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
    displayTime(name, time);
  }, onError)
}

function displayTime(name, time){
  var timer = document.createElement('div');
  var timerDisplay = document.createElement('div');
  var timerH = document.createElement('h2');
  var timerShow = document.createElement('p');

  timer.setAttribute('class', 'time')
  timerH.textContent = name;
  timerShow.textContent = time;
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
