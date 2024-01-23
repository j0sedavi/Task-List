var modal = document.querySelector(".modal");
var add = document.querySelector("#add");
var cancel = document.querySelector("#cancel");
var input_modal = document.querySelector("#input-modal");
var new_task = document.querySelector(".new_task");
var isOpen = false;
var type = 0;
function openModal() {
  modal.style.display = "flex";
  new_task.style.display = "none";
  input_modal.focus();
  isOpen = true;
  input_modal.value = "";
  setInterval(() => {
    if (input_modal.value.replace(/\s/g, "").length == 0) {
      add.disabled = "disabled";
    } else {
      add.disabled = "";
    }
  }, 100);
}
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && isOpen) {
    if (input_modal.value.replace(/\s/g, "").length == 0) {
      add.disabled = "disabled";
    } else {
      add.disabled = "";
      if (type == 1) {
        NewTask(listas_names[cookie.get("currentList")], input_modal.value);
      } else if (type == 2) {
        NewList(input_modal.value);
      }
      closeModal();
      rPage();
    }
  }
});
function closeModal() {
  modal.style.display = "none";
  new_task.style.display = "flex";
}
cancel.addEventListener("click", () => {
  closeModal();
  isOpen = false;
});
new_task.addEventListener("click", () => {
  type = 1;
  var title_modal = document.querySelector("#title-modal");
  title_modal.textContent = "NOVA TAREFA";
  openModal();
});
var listas_names = [];
var listas_list = GetTaskLists();
const tasks = document.querySelector(".tasks");
for (var i = 0; i < listas_list.length; i++) {
  listas_names.push(Object.keys(listas_list[i])[0]);
}
add.addEventListener("click", () => {
  if (type == 1) {
    var listas_names = [];
    var listas_list = GetTaskLists();
    const tasks = document.querySelector(".tasks");
    for (var i = 0; i < listas_list.length; i++) {
      listas_names.push(Object.keys(listas_list[i])[0]);
    }
    NewTask(listas_names[cookie.get("currentList")], input_modal.value);
  } else if (type == 2) {
    NewList(input_modal.value);
  }
  closeModal();
  rPage();
});
