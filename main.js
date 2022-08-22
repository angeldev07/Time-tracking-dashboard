//buttons to update data 
const actions = [...document.querySelectorAll(".action")];
//hours content
const hours = [...document.querySelectorAll(".hour")];
//last hours content
const last = [...document.querySelectorAll(".last-hour")];

let currentSelection = "weekly";
let mydata;

const msjHour = {
  weekly: "Last-Week - ",
  daily: "Yesterday - ",
  monthly: "Last-Mont - ",
};

//Cargamos la informacion principal (weekly) - load main info (weekly)
fetch("./data.json")
  .then((response) => response.json())
  .then((hours) => {
    mydata = hours;
    currentHours(mydata, currentSelection);
  });

//Agregamos los eventos - add the events
actions.forEach((action) => {
  //Removemos la clase 'select' si la tiene - Remove the 'select' class if it has it
  action.addEventListener("click", () => {
    actions.forEach((action) => {
      action.classList.remove("select");
    });
    //añadimos la clase select - add 'select' class
    action.classList.add("select");
    //obtenemos el indicador para saer que datos mostrar
    currentSelection = action.id;
    //Actualizamos los datos - update data on html
    currentHours(mydata, currentSelection);
  });
});

//funcion para cargar los datos del json al html - function to load data from json to html document
function currentHours(hoursData, currentSelection) {
  hoursData.forEach((hour, i) => {
    //tomamos los datos de importancia - take important data 
    const { current, previous } = hour.timeframes[currentSelection];
    //Actualizamos los datos - update data
    hours[i].textContent = current + "hrs";
    last[i].textContent = msjHour[currentSelection] + previous + "hrs";
  });
}

