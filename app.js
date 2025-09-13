const inp = document.getElementById("input");
const btn = document.getElementById("btn");
const ul = document.querySelector("ul");
const div = document.getElementById("month");
const checkbox = document.getElementById("check-box");
const h1 = document.getElementById("day");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const period = document.getElementById("period");
const time = document.getElementById("time");
const continueBtn = document.getElementById("continue");
const timeContainer = document.getElementById("time-container");
const addItem = document.getElementById("add-item");
const todoContainer = document.getElementById("todo-container");

let emojis = ["fruit", "vegetables", "wake", "sleep", "meat", "drink"];

// for dates

let days = [];
let hours = [];
let minutes = [];
let periods = ["AM", "PM"];
let todoObj = [];
let newObj = {};

let timeHour,
  timeMinute,
  timePeriod,
  timeDisplay = "time";

let date = new Date();
let currentMonth = date.toLocaleString("default", { month: "numeric" });

let noOfDays = new Date(date.getFullYear(), 0, 0).getDate();
let today = date.getDate();
let monthInNum = new Date().toLocaleString("default", {
  month: "numeric",
});

let currentDay = new Date().toLocaleString("default", {
  weekday: window.screen.width < "768" ? "short" : "long",
});

let formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
let formattedTime = formatter.format(date);

// to get the full days in a month for display
for (let i = 1; i <= noOfDays; i++) {
  days.push(i);
}

for (let i = 1; i <= 12; i++) {
  hours.push(i);
}

for (let i = 1; i <= 59; i++) {
  const formattedMinute = String(i).padStart(2, "0");
  minutes.push(formattedMinute);
}

// displaying day in words
h1.textContent = currentDay;

//day handling
function change(event) {
  const lists = document.querySelectorAll("li");
  lists.forEach((list) => {
    list.classList.remove("underline", "snap-center");

    if (list.value == event) {
      list.classList.add("underline", "underline-offset-6");
      list.scrollIntoView({behavior: "smooth", inline: "center"})
      currentDay = new Date(2025, monthInNum - 1, event).toLocaleString(
        "default",
        { weekday: window.screen.width < "768" ? "short" : "long" }
      );
      h1.textContent = currentDay;
      today = event;
    }
  });
}

//displaying days
days.map((day) => {
  let li = document.createElement("li");
  li.textContent = day;
  li.setAttribute("value", day);
  li.setAttribute("onclick", `change(${day})`);
  li.classList.add("font-mono");
  if (li.textContent == today) {
    

    li.classList.add(
      "snap-center",
      "p-2",
      "rounded-full",
      "underline",
      "underline-offset-6"
    );

    document.addEventListener("DOMContentLoaded", function () {
        li.scrollIntoView({behavior: "smooth", inline : "center"})
    });
  }

  if (li.textContent < today) {
    li.classList.add("opacity-20");
  }
  ul.appendChild(li);
});

let img = document.createElement("img");

inp.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && inp.value) {
    addItem.click();
  }

  emojis.map((emoji) => {
    if (inp.value.includes(emoji)) {
      checkbox.classList.remove("hidden");
      checkbox.classList.remove("border-1");
      img.setAttribute("src", `assets/${emoji}.png`);
      checkbox.appendChild(img);
    } else if (!inp.value) {
      checkbox.classList.add("hidden");
    }
  });
});

inp.addEventListener("keypress", (event) => {
  if (event.key == "Enter" && inp.value) {
    addItem.click();
  }
});

hours = [...hours, ...hours];

hours.map((hr) => {
  let li = document.createElement("li");
  li.classList.add("cursor-pointer");
  li.textContent = hr;
  li.setAttribute("onclick", `handleHour(${hr})`);
  hour.appendChild(li);
});

minutes.map((min) => {
  let li = document.createElement("li");
  li.textContent = min;
  li.classList.add("cursor-pointer");
  li.setAttribute("onclick", `handleMinute("${min}")`);
  minute.appendChild(li);
});

periods.map((pr) => {
  let li = document.createElement("li");
  li.setAttribute("onclick", `handlePeriod("${pr}")`);
  li.classList.add("cursor-pointer");
  li.textContent = pr;
  period.appendChild(li);
});

function handleHour(value) {
  timeHour = value;
  timeDisplay = timeHour + ":";
  time.textContent = timeDisplay;
}

function handleMinute(value) {
  console.log(value);
  timeMinute = value;
  timeDisplay = timeHour + ":" + timeMinute;
  time.textContent = timeDisplay;
}

function handlePeriod(value) {
  timePeriod = value;
  timeDisplay = timeHour + ":" + timeMinute + " " + timePeriod;
  console.log(timeDisplay);
  time.textContent = timeDisplay;
}

continueBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (timeDisplay.length > 6) {
    time.textContent = timeDisplay;
    timeContainer.classList.add("hidden");
  } else {
    time.textContent = "time";
    timeContainer.classList.add("hidden");
  }
});

console.log(timeDisplay);

time.addEventListener("click", () => {
  timeContainer.classList.toggle("hidden");
});

addItem.addEventListener("click", () => {
  newObj = { day: today, todo: inp.value, time: timeDisplay };
  inp.value = "";
  time.textContent = "time";
  todoObj.push(newObj);

  let div = document.createElement("div");
  let em;
  emojis.map((emoji) => {
    if (newObj.todo.includes(emoji)) {
      em = emoji;
    } else {
      em = "";
    }
  });

  console.log(em);

  div.innerHTML = `<div
          class="flex gap-5 items-center justify-between py-5 border-b-[4px] border-dashed border-gray-200"
        >
          <div class="flex gap-5 items-center">
            <img src="assets/${em ? em : "fruit"}.png" alt="" class="w-7" />
            <p class="text-xl md:text-2xl font-mono">${newObj.todo}</p>
          </div>

          <div class="flex gap-3 items-center">
            <p class="md:text-2xl opacity-40 font-mono">${newObj.time}</p>
          </div>
        </div>`;

  if (newObj.todo) {
    todoContainer.appendChild(div);
  }

  timeDisplay = "";
});
