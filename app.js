const inp = document.getElementById("input");
const btn = document.getElementById("btn");
const ul = document.querySelector("ul");
const div = document.getElementById("month");
const h1 = document.getElementById("day");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const period = document.getElementById("period");
const time = document.getElementById("time");
const continueBtn = document.getElementById("continue");
const timeContainer = document.getElementById("time-container");
const addItem = document.getElementById("add-item");
const todoContainer = document.getElementById("todo-container");
const emojiBox = document.getElementById("emoji-box");

let emojis = [
  "fruit",
  "vegetables",
  "wake",
  "sleep",
  "meat",
  "drink",
  "wake",
  "meeting",
];

// for dates

let days = [];
let hours = [];
let minutes = [];
let periods = ["AM", "PM"];
let todoLists = [];
let completeLists = [];
let newObj = {};
let state = true;

let timeHour,
  timeMinute,
  timePeriod,
  timeDisplay = "";

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

for (let i = 0; i <= 59; i++) {
  const formattedMinute = String(i).padStart(2, "0");
  minutes.push(formattedMinute);
}

// displaying day in words
h1.textContent = currentDay;

localStorage.setItem("month", monthInNum);

//day handling
function change(event) {
  today = event;
  const lists = document.querySelectorAll("li");
  lists.forEach((list) => {
    list.classList.remove("underline", "snap-center");

    if (list.value == event) {
      list.scrollIntoView({ behavior: "smooth", inline: "center" });
      list.classList.add("underline", "snap-center", "underline-offset-6");

      currentDay = new Date(2025, monthInNum - 1, event).toLocaleString(
        "default",
        { weekday: window.screen.width < "768" ? "short" : "long" }
      );
      h1.textContent = currentDay;
    }
  });

  todoLists.splice(0);
  todoContainer.replaceChildren();
  fetchList();
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
      li.scrollIntoView({ behavior: "smooth", inline: "center" });
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
    if (inp.value.toLowerCase().includes(emoji)) {
      emojiBox.classList.remove("hidden");
      emojiBox.classList.remove("border-1");
      img.setAttribute("src", `assets/${emoji}.png`);
      emojiBox.appendChild(img);
    } else if (!inp.value) {
      emojiBox.classList.add("hidden");
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

time.addEventListener("click", () => {
  timeContainer.classList.toggle("hidden");
});

(function getMonth() {
  let getMonth = localStorage.getItem("month");
  if (getMonth != monthInNum) {
    localStorage.clear();
  }
})();

addItem.addEventListener("click", () => {
  newObj = {
    id: Math.random(),
    day: today,
    todo: inp.value,
    time: timeDisplay,
    isComplete: false,
  };
  inp.value = "";
  time.textContent = "time";
  todoLists.push(newObj);

  if (newObj.todo) {
    localStorage.setItem(`day${today}`, JSON.stringify(todoLists));
    todoContainer.replaceChildren();
    fetchList();
  }

  timeDisplay = "";
});

function handleCheckBox(element) {
  let newLists = todoLists.map((list, index) => {
    if (list.id == element.dataset.indexNumber) {
      let state = list.isComplete;

      if (element.firstElementChild.tagName == "IMG") {
        element.lastElementChild.classList.toggle("line-through")
      } else {
        element.lastElementChild.classList.remove("no-underline");
        element.lastElementChild.classList.toggle("line-through");
        element.firstElementChild.firstElementChild.classList.remove(
          "bg-white"
        );
        element.firstElementChild.firstElementChild.classList.toggle(
          "bg-green-700"
        );
      }

      if (state) {
        state = false;
      } else {
        state = true;
      }
      return { ...list, isComplete: state };
    }

    return list;
  });

console.log(todoLists)
  updateLocalStorage(newLists);
  let getLists = JSON.parse(localStorage.getItem(`day${today}`));
  todoLists = getLists ? getLists : todoLists;
}

function updateLocalStorage(value) {
  localStorage.setItem(`day${today}`, JSON.stringify(value));
}

function fetchList() {
  let getLists = JSON.parse(localStorage.getItem(`day${today}`));
  todoLists = getLists ? getLists : todoLists;
  displayList();
}

function displayList() {
  todoLists.map((list) => {
    let div = document.createElement("div");
    const emoji = emojis.map((emoji) => {
      if (list.todo.toLowerCase().includes(emoji)) {
        div.innerHTML = `<div
          class="flex gap-5 items-center justify-between py-5 border-b-[4px] border-dashed border-gray-200"
        >
          <div class="flex md:gap-5 gap-3 items-center cursor-pointer" data-index-number="${list.id}" onclick="handleCheckBox(this)">
            <img src="assets/${emoji}.png" alt="" class="w-7" />
            <p class="text-xl ${list.isComplete && "line-through"} md:text-2xl">${list.todo}</p>
          </div>
          <button class="font-mono text-xl text-gray-300 cursor-pointer hover:text-red-900" data-index-number=${list.id} onclick="handleDelete(this)">del</button>
        </div>`;

        return true;
      }

      return false;
    });

    if (!emoji.some((element) => element === true)) {
      div.innerHTML = `<div
          class="flex gap-5 items-center justify-between py-5 border-b-[4px] border-dashed border-gray-200"
        >
          <div class="flex md:gap-5 gap-3 items-center cursor-pointer" data-index-number="${
            list.id
          }" onclick="handleCheckBox(this)">
          <div class="w-7 flex justify-center">
            <button class="w-5 h-5 border-2 rounded-full ${
              list.isComplete ? `bg-green-700` : `bg-white`
            } border-gray-300" value="${list.todo}" ></button> 
            </div>
            <p class="text-xl md:text-2xl ${
              list.isComplete ? `line-through` : `no-underline`
            } ">${list.todo}</p>
          </div>
          <button class="font-mono text-xl text-gray-300 cursor-pointer hover:text-red-900" data-index-number=${list.id} onclick="handleDelete(this)">del</button>
        </div>`;
    }

    if (list.day === today) {
    }
    if (todoLists) todoContainer.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", fetchList());

function handleDelete(element) {
  let newLists = todoLists.filter((li) => li.id != element.dataset.indexNumber);
  console.log(element)
  if (newLists.length >= 0) {
    localStorage.setItem(`day${today}`, JSON.stringify(newLists));
  }

  todoContainer.replaceChildren();
  fetchList();
}
