//DATE AND HOUR
let now = new Date();

let date = now.getDate();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let hour = now.getHours();
let minute = now.getMinutes();

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${date} ${month} ${year}, ${hour}:${minute}`;
