const formTask = document.getElementById("formTask")
const addBtn = document.getElementById("addBtn")
const taskInput = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")
const container = document.querySelector(".container")

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
const gerarId = () => "_" + Math.random().toString(36).substring(2, 9)

function renderTarefas() {
  taskList.innerHTML = ""

  tarefas.forEach((tarefa, index) => {
    const taskItem = document.createElement("div")
    const statusIcon = document.createElement("img")
    statusIcon.src = tarefa.feita ? "./src/images/circle-check.svg" : "./src/images/circle.svg"
    statusIcon.alt = tarefa.feita ? "Circulo amarelo" : "Circulo"

    statusIcon.width = "24"
    statusIcon.height = "24"
    statusIcon.loading = "lazy"
    const taskText = document.createElement("span")
    taskText.textContent = tarefa.texto


    taskItem.appendChild(statusIcon)
    taskItem.appendChild(taskText)

    taskItem.addEventListener("click", () => {
      tarefas[index].feita = !tarefas[index].feita
      salvarTarefas()
      renderTarefas()
    })

    const removeBtn = document.createElement('button');
    const removeIcon = document.createElement("img")
    removeIcon.src = tarefa.feita ? "./src/images/trash-white.svg" : "./src/images/trash.svg"
    removeIcon.alt = tarefa.feita ? "Lixeira amarela" : "Lixeira"
    removeBtn.alt = "Remover tarefa";
    removeIcon.loading = "lazy"

    removeBtn.appendChild(removeIcon)
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      tarefas = tarefas.filter((t) => t.id !== tarefa.id)
      salvarTarefas()
      renderTarefas()
    });

    if (tarefa.feita) {
      taskItem.classList.add("done")
    }

    taskItem.appendChild(removeBtn);
    taskList.appendChild(taskItem);
  });
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

formTask.addEventListener("submit", (e) => {
  e.preventDefault()
  const texto = taskInput.value.trim()

  if (texto !== "") {
    tarefas.push({ id: gerarId(), texto, feita: false })
    salvarTarefas()
    renderTarefas()
    taskInput.value = "";
  }
})

if (tarefas.length >= 5) {
  container.classList.add("margin")
}

renderTarefas()