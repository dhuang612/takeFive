//store the dom elements we need to manipulate into variables
//we will eventually need to dynamically grab this / can we use a function?


// var timerTitle = document.getElementById('standUp')
const standTimer = document.getElementById('stand');
const timerContainer = document.getElementById('timeRemain-container')
const createTimer = document.querySelector('.standTime')
const removeTimer = document.querySelector('.removeTime')
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
function startTimer(){
  const currentTime = standTimer.value
  const minutesHours = minutesOrHours();
  console.log(typeof minutesHours)
  const countdownTimer = new easytimer.Timer();
  if(minutesHours === 'minutes'){
    countdownTimer.start({countdown: true, startValues:{minutes: parseInt(currentTime)}})
  }else {
    countdownTimer.start({countdown: true, startValues:{hours: parseInt(currentTime)}})
  }
  const displayCountdown = document.querySelector('.countdown');
  countdownTimer.addEventListener('secondsUpdated', (e)=>{

    displayCountdown.innerText = `${countdownTimer.getTimeValues().hours.toString()}:${countdownTimer.getTimeValues().minutes.toString()}:${countdownTimer.getTimeValues().seconds.toString()}`;
  })

  // console.log(countdownTimer.getTimeValues())

}


function minutesOrHours(){
  //to get a radio button value you have to submit a 'form'
  var minutesHours = document.querySelector('input[name="time"]:checked').value
  let timerAmount;
  if(minutesHours === 'minutes'){
  return timerAmount = 'minutes';
  } else {
   return timerAmount = 'hours';
  }
}

function addTime(){
 let timerAmnt = `${standTimer.value} ${minutesOrHours()}`
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

  let timer = document.createElement('div');
  let timerDisplay = document.createElement('div');
  let timerH = document.createElement('h2');
  let timerShow = document.createElement('p');
  let startBtn = document.createElement('button');
  startBtn.innerText="start timer";
  startBtn.setAttribute('id', 'start');
  let displayTimerCountdown = document.createElement('p');
  displayTimerCountdown.setAttribute('class','countdown')
  displayTimerCountdown.innerText="00:00:00"
  setTimeout(()=>{
    let button = document.getElementById('start');
    if(button !== undefined){
      button.addEventListener('click', startTimer)
    }
  },400)


  timer.setAttribute('class', 'time')
   //maybe in here initialize a date time and do some sort of comparions
  timerH.textContent = name;
  timerShow.textContent = time;
  timerShow.appendChild(startBtn);
  timerDisplay.appendChild(timerH);
  timerDisplay.appendChild(timerShow);
  timerDisplay.appendChild(displayTimerCountdown)
  timer.appendChild(timerDisplay)
  timerContainer.appendChild(timer)
}


function removeTime(){
  while(timerContainer.firstChild){
    timerContainer.removeChild(timerContainer.firstChild)
  }
  browser.storage.local.clear()
}
