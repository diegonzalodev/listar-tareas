const formulario = document.getElementById("formulario");
const inputTodo = document.getElementById("todo");
const resultadoSection = document.getElementById("pintarTodo");

const fragment = document.createDocumentFragment();
const templateTodo = document.getElementById("templateTodo").content;

let tareas = [];


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
    mostrarHTML(tareas);
  }

  formulario.addEventListener("submit", agregarTodo);

  resultadoSection.addEventListener("click", (e) => {
    if (e.target.matches(".btn-danger")) {
      eliminarTodo(e.target.dataset.id);
    }
  })
});


function agregarTodo(e) {
  e.preventDefault();

  if (inputTodo.value.trim() === "") {
    mostrarAlerta();
    return;
  }

  const objetoTarea = {
    id: `${Date.now()}`,
    tarea: inputTodo.value
  }

  tareas.push(objetoTarea);

  mostrarHTML(tareas);
}

function eliminarTodo(id) {
  tareas = tareas.filter((item) => item.id !== id);

  mostrarHTML(tareas);
}

function mostrarHTML(arreglo) {
  limpiarHTML();
  localStorage.setItem("tareas", JSON.stringify(arreglo));

  arreglo.forEach((item) => {
    const clone = templateTodo.cloneNode(true);
    clone.querySelector("p").textContent = item.tarea;
    clone.querySelector(".btn-danger").dataset.id = item.id;

    fragment.appendChild(clone);
  })
  resultadoSection.appendChild(fragment);
}

function mostrarAlerta() {
  const alertaDiv = document.querySelector(".alert-danger");
  alertaDiv.classList.remove("d-none");

  setTimeout(() => {
    alertaDiv.classList.add("d-none");
  }, 3000);
}

function limpiarHTML() {
  while (resultadoSection.firstChild) {
    resultadoSection.removeChild(resultadoSection.firstChild);
  }
}