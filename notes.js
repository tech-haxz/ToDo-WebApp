let container = document.querySelector(".container");
let taskField = document.getElementById("inpTask");
let btn = document.getElementById("btn");
let rmbtn = document.getElementById("rmbtn");
let fetData = document.getElementById("fetchdata");

let counter = 0;

function addTask() {
  if (taskField.value.trim() === "") {
    alert("Add a task first.");
    counter = 0;
    return false;
  }
  localStorage.setItem("count", counter);
  let count = parseInt(localStorage.getItem("count"));
  localStorage.setItem(`task${count}`, taskField.value);
  let Val = localStorage.getItem(`task${count}`);
  container.innerHTML += `<div class="content"><input type="checkbox" class="box">
  <span>${Val}</span></div>`;
  linethroughText(0);
}

function Remove() {
  let choice = confirm("Do you want to clear stored data?");
  if (choice) {
    localStorage.clear();
    container.innerHTML = "";
    alert("Data has been removed from LocalStorage!");
  }
}

function ftchdata() {
  let len = parseInt(localStorage.getItem("count"));

  if (!isNaN(len)) {
    for (let i = 1; i <= len; i++) {
      let item = localStorage.getItem(`task${i}`);
      container.innerHTML += `<div class="content"><input type="checkbox" class="box">
    <span>${item}</span></div>`;
    }
  } else {
    container.innerHTML += "<p>Tasks not added yet!</p>";
    return false;
  }
}

function linethroughText(len) {
  for (let i = len; i < container.children.length; i++) {
    let item = container.children[i];
    let box = item.children;

    box[0].addEventListener("click", () => {
      if (box[0].checked) {
        item.children[1].classList.add("complete");
      } else {
        item.children[1].classList.remove("complete");
      }
    });
  }
}

btn.addEventListener("click", () => {
  counter++;
  container.style.marginTop = "20px";
  addTask();
});

rmbtn.addEventListener("click", () => {
  Remove();
});

fetData.addEventListener("click", () => {
  container.style.marginTop = "20px";
  container.innerHTML = "<h2>---------Tasks----------</h2>";
  ftchdata();
  fetData.disabled = true;
  fetData.style.color = "black";

  linethroughText(1);
});
