const cookie = { set: SetCookie, remove: RemoveCookie, get: CookieGet };
function rPage() {
  const hlinks = document.querySelector(".head-links");
  const tasks = document.querySelector(".tasks");
  const tasks_C = document.querySelector(".tasks-C");
  const tasks_C_title = document.querySelector(".title-sec2");
  const Ctask = document.querySelector(".cTasks");
  var CTasksView = true;
  var currentList = parseFloat(cookie.get("currentList"));
  hlinks.innerHTML = "";
  tasks.innerHTML = "";
  var listas_names = [];
  var listas_list = GetTaskLists();
  for (var i = 0; i < listas_list.length; i++) {
    listas_names.push(Object.keys(listas_list[i])[0].replace("_", " "));
    if (i == currentList) {
      hlinks.innerHTML += `<li class="item_list_hlinks ${listas_names[
        i
      ].replace(" ", "_")}" id="selected">${listas_names[i]}</li>`;
    } else {
      hlinks.innerHTML += `<li class="item_list_hlinks ${listas_names[
        i
      ].replace(" ", "_")}" >${listas_names[i]}</li>`;
    }
  }

  hlinks.innerHTML += '<li id="addLists">+ Nova lista</li>';
  const addList = document.querySelector("#addLists");
  var itemsH = document.querySelectorAll(".item_list_hlinks");
  for (var i = 0; i < itemsH.length; i++) {
    (function (index) {
      itemsH[index].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        let name_i = itemsH[index].classList[1];
        console.log("clicked " + itemsH[index].classList[1]);
        let cf = confirm(
          `Voce Quer mesmo excluir a lista ${name_i.replace("_", " ")}?`
        );
        if (cf) {
          RemoveList(name_i);
          cookie.set("currentList", 0);
          currentList = index;
          itemsH[0].id = "selected";

          rPage();
        }
      });
      itemsH[index].addEventListener("click", () => {
        itemsH[currentList].id = "";
        cookie.set("currentList", index);
        currentList = index;
        itemsH[index].id = "selected";
        rPage();
      });
    })(i);
  }
  addList.addEventListener("click", () => {
    type = 2;
    var title_modal = document.querySelector("#title-modal");
    title_modal.textContent = "NOVA LISTA";
    openModal();
  });
  var tasksList = GetTaskList(listas_names[currentList].replace(" ", "_"));

  tasks.innerHTML = "";
  var tasksList = GetTaskList(listas_names[currentList].replace(" ", "_"));

  for (var i = 0; i < tasksList.tasks.length; i++) {
    tasks.innerHTML += `
    <li id="task_${i}_">
    <input type="checkbox" name="check" class="tasksID">
    <h1 id="title">${tasksList.tasks[i]}</h1>
    <button onclick="RemoveTs(${i},1)"><i id="trash" class="bi bi-trash-fill"></i></button>
  </li>
    `;
  }
  tasks_C.innerHTML = "";
  for (var i = 0; i < tasksList.tasksc.length; i++) {
    tasks_C.innerHTML += `
    <li id="task_${i}_">
    <input type="checkbox" checked name="check" class="tasksID">
    <h1 id="title">${tasksList.tasksc[i]}</h1>
    <button onclick="RemoveTs(${i},2)"><i id="trash" class="bi bi-trash-fill"></i></button>
  </li>
    `;
  }
  currentList = parseFloat(cookie.get("currentList"));
  var count_tasks_C =
    listas_list[currentList][listas_names[currentList].replace(" ", "_")].tasksc
      .length;
  if (count_tasks_C > 0) {
    if (CTasksView) {
      tasks_C.style.display = "block";
      tasks_C_title.innerHTML = `Concluidos(${count_tasks_C})`;
      CTasksView = false;
    } else {
      tasks_C.style.display = "none";
      tasks_C_title.innerHTML = `Concluidos(${count_tasks_C})`;
      CTasksView = true;
    }
    Ctask.style.display = "block";
    tasks_C_title.innerHTML = `Concluidos(${count_tasks_C})`;
    var tasks_C_icon = document.querySelector("#icon-seta");
    tasks_C_icon.addEventListener("click", () => {
      if (CTasksView) {
        tasks_C.style.display = "block";
        tasks_C_title.innerHTML = `Concluidos(${count_tasks_C})`;
        CTasksView = false;
      } else {
        tasks_C.style.display = "none";
        tasks_C_title.innerHTML = `Concluidos(${count_tasks_C})`;
        CTasksView = true;
      }
    });
  } else {
    Ctask.style.display = "none";
  }
  var tasksID = document.querySelectorAll(".tasksID");
  for (var i = 0; i < tasksID.length; i++) {
    (function (index) {
      tasksID[index].addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
          var itemName =
            listas_list[currentList][
              listas_names[currentList].replace(" ", "_")
            ].tasks[index];
          listas_list[currentList][
            listas_names[currentList].replace(" ", "_")
          ].tasksc.push(itemName);
          listas_list[currentList][
            listas_names[currentList].replace(" ", "_")
          ].tasks.splice(index, 1);

          let JSONstr = JSON.stringify(listas_list);
          cookie.set("listas", JSONstr);
          rPage();
        } else {
          let indexItem =
            index -
            listas_list[currentList][
              listas_names[currentList].replace(" ", "_")
            ].tasks.length;
          var itemName =
            listas_list[currentList][
              listas_names[currentList].replace(" ", "_")
            ].tasksc[indexItem];
          listas_list[currentList][
            listas_names[currentList].replace(" ", "_")
          ].tasks.push(itemName);
          listas_list[currentList][
            listas_names[currentList].replace(" ", "_")
          ].tasksc.splice(indexItem, 1);

          let JSONstr = JSON.stringify(listas_list);
          cookie.set("listas", JSONstr);
          rPage();
        }
      });
    })(i);
  }
}

function SetCookie(name, value) {
  if (name != null || value != null) {
    document.cookie = `${name}=${value}; expires=Thu, 18 Dec 2090 12:00:00 UTC`;
    return `${name}=${value}`;
  } else {
    return false;
  }
}

function FindWord(word, str) {
  return str.split(" ").some(function (w) {
    return w === word;
  });
}
function FindList(item, array) {
  for (var data in array) {
    if (array[data] == item) {
      return data;
    }
  }
}
function CookieGet(name) {
  var lista = document.cookie.split(";");
  var find = false;
  for (var i = 0; i < lista.length; i++) {
    let name_v = lista[i].split("=");
    let name_r = name_v[0].trim();
    if (name_r === name) {
      return name_v[1];
    }
  }
  return null;
}
function RemoveCookie(name) {
  document.cookie = `${name}=null}; expires=Thu, 18 Dec 2000 12:00:00 UTC`;
  return `${name}=null`;
}
