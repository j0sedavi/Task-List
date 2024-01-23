//index
if (window.location.href.split("/")[3] == "index.html") {
  //index
  const button_new = document.getElementById("button-new");
  if (cookie.get("listas")) {
    button_new.innerHTML = '<i class="bi bi-list"></i>  Ver listas';
  } else {
    button_new.innerHTML =
      '<i class="bi bi-plus-circle-fill"></i> Criar nova lista';
  }
  button_new.addEventListener("click", () => {
    start();
    window.location.href = "list.html";
  });
}

//list

if (window.location.href.split("/")[3] == "list.html") {
  if (!cookie.get("listas")) {
    window.location.href = "index.html";
  }
  const hlinks = document.querySelector(".head-links");
  const tasks = document.querySelector(".tasks");

  var currentList = parseFloat(cookie.get("currentList"));
  hlinks.innerHTML = "";
  tasks.innerHTML = "";
  var listas_names = [];
  var listas_list = GetTaskLists();
  for (var i = 0; i < listas_list.length; i++) {
    listas_names.push(Object.keys(listas_list[i])[0].replace("_", " "));
    if (i == currentList) {
      hlinks.innerHTML += `<li id="selected">${listas_names[i]}</li>`;
    } else {
      hlinks.innerHTML += `<li>${listas_names[i]}</li>`;
    }
  }
  hlinks.innerHTML += '<li id="addLists">+ Nova lista</li>';
  var tasksList = GetTaskList(listas_names[currentList].replace(" ", "_"));

  function RemoveTs(item, area) {
    var clist = cookie.get("currentList");
    tasksList = GetTaskList(listas_names[clist].replace(" ", "_"));
    if (area == 1) {
      var nameItem = tasksList.tasks[item];
    } else if (area == 2) {
      var nameItem = tasksList.tasksc[item];
    }
    var confm = confirm(`Voce quer deletar a tarefa ${nameItem}?`);
    if (confm) {
      if (area == +1) {
        Removetask(
          listas_names[clist].replace(" ", "_"),
          tasksList.tasks[item],
          area
        );
        console.log("1");
      } else if (area == +2) {
        console.log("2");
        Removetask(
          listas_names[clist].replace(" ", "_"),
          tasksList.tasksc[item],
          area
        );
      }
    }
    rPage();
  }
  rPage();
}
