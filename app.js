const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const giveaway = document.querySelector('.eventday');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
/*
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based;
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
*/
let futureDate = new Date(2022, 5, 11, 10, 00, 00);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
giveaway.textContent = `Events Starts on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}0 am`;

const futureTime = futureDate.getTime();
function getRemaindingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this event has finished!</h4>`;
  }
}
// countdown;
let countdown = setInterval(getRemaindingTime, 1000);
//set initial values
getRemaindingTime();


//Toggle Hide and Show elements

window.onload = myFunctionone();
window.onload = myFunctiontwo();
window.onload = myFunctionthree();
window.onload = myFunctionfour();
window.onload = myFunctionfive();
window.onload = myFunctionsix();
window.onload = myFunctionseven();
window.onload = myFunctioneight();
window.onload = myFunctionnine();
window.onload = myFunctionten();
window.onload = myFunctioneleven();








function myFunctionone() {
  var i =document.getElementById('chevron1');
  var x = document.getElementById("wrapper1");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}

function myFunctiontwo() {
  var i =document.getElementById('chevron2');
  var x = document.getElementById("wrapper2");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}

function myFunctionthree() {
  var i =document.getElementById('chevron3');
  var x = document.getElementById("wrapper3");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}

function myFunctionfour() {
  var i =document.getElementById('chevron4');
  var x = document.getElementById("wrapper4");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}
function myFunctionfive() {
  var i =document.getElementById('chevron5');
  var x = document.getElementById("wrapper5");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}
function myFunctionsix() {
  var i =document.getElementById('chevron6');
  var x = document.getElementById("wrapper6");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}
function myFunctionseven() {
  var i =document.getElementById('chevron7');
  var x = document.getElementById("wrapper7");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}
function myFunctioneight() {
  var i =document.getElementById('chevron8');
  var x = document.getElementById("wrapper8");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}
function myFunctionnine() {
  var i =document.getElementById('chevron9');
  var x = document.getElementById("wrapper9");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}
function myFunctionten() {
  var i =document.getElementById('chevron10');
  var x = document.getElementById("wrapper10");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}

function myFunctioneleven() {
  var i =document.getElementById('chevron11');
  var x = document.getElementById("wrapper11");
  if (x.style.display === "none") {
    i.classList.add("fa-chevron-down");
    x.style.display = "block";
  } else {
    x.style.display = "none";
    i.classList.remove("fa-chevron-down");

  }
}


