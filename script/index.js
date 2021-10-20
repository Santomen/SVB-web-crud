//importamos la app de firebase
import app from "./base.js";
//para agregar data que sería el create en las funciones se necesita collection y addoc
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
//esta es la base de datos
const db = getFirestore(app);
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");
//esto es asincrono

let editStatus = false;
let id = "";
//READ
//va a traer desde la firebase todas las tarea de una colección la ed abajo es con await
const getTasks = () => getDocs(collection(db, "task"));
//cuando la ventana se carga traera o ejecutara la fun de arriba
//cuando el DOM haya cargado va a ejecutar un evento
window.addEventListener("DOMContentLoaded", (e) => {
  //guardo la infor recuperada en  querySnapshot, el cual es un objeto
  //de cada documento voy a ver el documento y vere los datpos de cada documento
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const task = doc.data();
      task.id = doc.id;
      //abajo se utiliza data-id="" la cual es una propiedad a la cual le asignaremos el id de cada elemento de la base de datos, asi serán unicos
      taskContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
      <h3 class="h5">${task.title}</h3>
      <p>${task.description}</p>
      <div>
      <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
      <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
      </div>
      </div>`;
      //selecciona todos lo elementos que tanga la clase indicada con querySelectorAll
      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteTask(e.target.dataset.id);
        });
      });
      //Modificar datos
      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          editStatus = true;
          id = doc.id;
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          taskForm["btn-task-form"].innerText = "Update";
        });
      });
    });
  });
});

//crear y agregar datos a la base,
// addDoc sería agregar un nuevo documento luego está collection y luego en db indicamos la base y donde dice task es el nombre de la collection
const saveTask = (title, description) =>
  addDoc(collection(db, "task"), {
    title,
    description
  });
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  if (!editStatus) {
    //si el edit es falso gurda datos nuevo como si nada
    await saveTask(title.value, description.value);
  } else {
    await updateTask(id, {
      title: title.value,
      description: description.value
    });
    editStatus = false;
    id = "";
    taskForm["btn-task-form"].innerText = "Save";
  }
  //conexion a la base creara la coleccion task y guardara un titulo y la desc
  //como es asicrono devolvera una respuesta cuando se haya ejecutado
  //la cual se guardará en response, aunque no es necesario guarxar la respuesta
  await getTasks();
  title.focus(); //hara que aqui se localice el cursor
  taskForm.reset(); //una vez que se hayan registrado los datos se borrara
});

//UPDATES
//metodo que se actualiza cada vez que existen cambios,acada vez que orucca un cambio en la base de datos:
// es como el getDocs pero este no es asincrono
const onGetTasks = (callback) => onSnapshot(collection(db, "task"), callback);

//DELETE
const deleteTask = (id) => deleteDoc(doc(db, "task", id));

//Obtener tareas pro id
const getTask = (id) => getDoc(doc(db, "task", id));
//Para actualizar
const updateTask = (id, updateTask) =>
  updateDoc(doc(db, "task", id), updateTask);
