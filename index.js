// accessing all variables
const time = document.getElementsByClassName("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const stop = document.getElementById("stop");
const setAlarm = document.getElementById("setAlarm");
const zone = document.getElementById("zone");
const alarmContainer = document.getElementsByClassName("container");
let alarmList = [];
const audio = new Audio(
  "./assets/best_alarm.mp3"
);
audio.loop = true;
audio.load();
// creating functions
// display current time to users
function displayTime() {
  const now = new Date()
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  time[0].innerText = now;
  for (let alarm of alarmList) {
    if (now == alarm.time) {
      audio.play();
      stop.style.opacity = "1";
      stop.style.cursor = "pointer";
    }
  }
  setInterval(displayTime, 1000);
}
displayTime();
// setting up an alarm
function createAlarm() {
  let hrs = hours.value;
  let min = minutes.value;
  let sec = seconds.value;
  const zoneTime = zone.value;
  if (parseInt(hrs) > 24 || parseInt(min) > 59 || parseInt(sec) > 59) {
    alert(
      "Please enter a valid time for setting up an alarm. Hourse should not be greater than 12 and minutes and seconds should not be greater that 59"
    );
    return;
  }
  if (parseInt(hrs) > 12) {
    const set = parseInt(hrs) % 12;
    if (set == 0) {
      hrs = "12";
    } else {
      hrs = "0" + set;
    }
  }
  if (parseInt(hrs) == 0) {
    alert("please Enter the valid time");
    return;
  }
  if (parseInt(hrs) < 10) {
    hrs = "0" + parseInt(hrs);
  } else {
    hrs = "" + parseInt(hrs);
  }
  if (parseInt(min) < 10) {
    min = "0" + parseInt(min);
  } else {
    min = "" + parseInt(min);
  }
  if (parseInt(sec) < 10) {
    sec = "0" + parseInt(sec);
  } else {
    sec = "" + parseInt(sec);
  }
  const time = `${hrs}:${min}:${sec} ${zoneTime}`;
  alarmList.push({
    time,
    id: Math.random() * 100,
  });
  hours.value = "00";
  minutes.value = "00";
  seconds.value = "00";
  renderAlarm();
}
// rendering all the alarms
function renderAlarm() {
  alarmContainer[0].innerHTML = "";
  for (let alarm of alarmList) {
    const html = `<div class="alarm">
    <ion-icon name="alarm-outline"></ion-icon>
    <span>${alarm.time}</span>
    <button type="button" id=${alarm.id}>Delete</button>
  </div>`;
    alarmContainer[0].insertAdjacentHTML("afterbegin", html);
    const deleteBtn = document.querySelectorAll(".alarm button");
    for (let btn of deleteBtn) {
      btn.addEventListener("click", (e) => {
        const AlarmId = e.target.getAttribute("id");
        deleteAlarm(AlarmId);
      });
    }
  }
}
// delteting the particular alarm
function deleteAlarm(id) {
  alarmList = alarmList.filter((a) => a.id != id);
  renderAlarm();
}
// stoping an alarm
function stopAlarm() {
  audio.pause();
  stop.style.opacity = "0.6";
  stop.style.cursor = "not-allowed";
}
// adding an event listeners
setAlarm.addEventListener("click", (e) => {
  e.preventDefault();
  createAlarm();
});
stop.addEventListener("click", stopAlarm);
hours.addEventListener("blur", (e) => {
  e.preventDefault();
  const hrs = e.target.value;
  if (parseInt(hrs) < 10) {
    e.target.value = "0" + parseInt(hrs);
  }
});
minutes.addEventListener("blur", (e) => {
  e.preventDefault();
  const minute = e.target.value;
  if (parseInt(minute) < 10) {
    e.target.value = "0" + parseInt(minute);
  }
});
seconds.addEventListener("blur", (e) => {
  e.preventDefault();
  const second = e.target.value;
  if (parseInt(second) < 10) {
    e.target.value = "0" + parseInt(second);
  }
});
