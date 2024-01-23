function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
function start() {
  if (!cookie.get("listas")) {
    console.log("started");
    let modelJson = [
      {
        Minha_Lista: {
          tasks: [],
          tasksc: [],
        },
      },
    ];
    let strV = JSON.stringify(modelJson);
    cookie.set("listas", strV);
    cookie.set("currentList", 0);
  }
}
function GetTaskLists() {
  var listas = cookie.get("listas");
  if (isJSON(listas)) {
    return JSON.parse(listas);
  }
}
function GetTaskList(name) {
  var name_f = name.replace(" ", "_");
  var listas = cookie.get("listas");
  if (isJSON(listas)) {
    var data = JSON.parse(listas);
    for (var i = 0; i < data.length; i++) {
      if (Object.keys(data[i])[0] == name_f) {
        return data[i][name_f];
      }
    }
    return null;
  }
}
function NewTask(list, name) {
  var listas = JSON.parse(cookie.get("listas"));
  var list_f = list.replace(" ", "_");
  for (var i = 0; i < listas.length; i++) {
    if (Object.keys(listas[i])[0] == list_f) {
      listas[i][list_f].tasks.push(name);
      let JSONstr = JSON.stringify(listas);
      cookie.set("listas", JSONstr);
      return listas;
    }
  }
  return null;
}
function Removetask(list, name, area) {
  area = area == null ? 1 : area;
  var listas = JSON.parse(cookie.get("listas"));
  var list_f = list.replace(" ", "_");
  for (var i = 0; i < listas.length; i++) {
    if (Object.keys(listas[i])[0] == list_f) {
      let clist = listas[i][list_f];
      let index = clist.tasks.indexOf(name);
      let index2 = clist.tasksc.indexOf(name);
      // console.log(
      //   `name: ${name}; lista: ${list_f}; index: ${index},${index2}; lista: ${listas}; tasksc: ${listas[i][list_f].tasksc}`
      // );
      if (index !== -1 && area == 1) {
        listas[i][list_f].tasks.splice(index, 1);
      } else if (index2 !== -1 && area == 2) {
        listas[i][list_f].tasksc.splice(index2, 1);
      }

      let JSONstr = JSON.stringify(listas);
      cookie.set("listas", JSONstr);
      return listas;
    }
  }
  return null;
}
function RemoveList(NameList) {
  var listas = JSON.parse(cookie.get("listas"));
  var list_f = NameList.replace(" ", "_");
  for (var i = 0; i < listas.length; i++) {
    if (Object.keys(listas[i])[0] == list_f) {
      let idx = listas.findIndex((item) => list_f in item);
      if (idx !== -1) {
        listas.splice(idx, 1);
      }
      let JSONstr = JSON.stringify(listas);
      cookie.set("listas", JSONstr);
      return listas;
    }
  }
  return null;
}
function NewList(nameList) {
  var nameList_f = nameList.replace(" ", "_");
  var listas = cookie.get("listas");
  if (isJSON(listas)) {
    var data = JSON.parse(listas);
    for (var i = 0; i < data.length; i++) {
      if (Object.keys(data[i])[0] == nameList_f) {
        return null;
      }
    }
    let modelJson = {};
    modelJson[nameList_f] = {
      tasks: [],
      tasksc: [],
    };

    data.push(modelJson);
    let strV = JSON.stringify(data);
    cookie.set("listas", strV);
    return modelJson;
  }
}
