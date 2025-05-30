const socket = io();

const time = document.getElementById('time');
const stopwatch = document.getElementById('stopwatch');
const measure = document.getElementById('measure');
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');

let currentValue = null;
let activeCircle = 0;

function updateCircles(newValue) {
  if (newValue !== currentValue) {
    currentValue = newValue;
    if (activeCircle === 0) {
      circle1.style.backgroundColor = newValue == 1 ? 'red' : 'rgb(181, 180, 180)';
      circle2.style.backgroundColor = 'rgb(26, 26, 26)';
      activeCircle = 1;
    } else {
      circle2.style.backgroundColor = newValue == 1 ? 'red' : 'rgb(181, 180, 180)';
      circle1.style.backgroundColor = 'rgb(26, 26, 26)';
      activeCircle = 0;
    }

    if (audioEnabled) {
      playClick(newValue == 1 ? 1000 : 600);
    }
  }
}

socket.on('beat', (msg) => {
  const array = msg.split(".");
  updateCircles(array[1]);
  measure.textContent = array[0];
});

socket.on('time', (msg) => {
  const timeStr = msg.split(".");
  time.textContent = timeStr[0];
});

socket.on('stopwatch', function(msg){
  const array = msg.split(":");
  array.pop();  
  let string= array.join(':');   
  stopwatch.innerHTML = string;
});