const searchTaskInput = document.querySelector('#searchTaskInput')
const taskList = document.querySelector('#taskList')
const taskInput = document.querySelector('#taskInput')
const addTaskBtn = document.querySelector('#addTaskBtn')

const data = []

function addTask() {
    const inputValue = taskInput.value.trim()
    if (inputValue) {
        const task = {
            id: Date.now(),
            description: inputValue,
            completed: false
        }
        data.push(task)
        taskInput.value = ''
        renderTask() // Atualiza a lista
    }
}

function renderTask(filteredTasks = data) {
    taskList.innerHTML = '' // Limpa a lista
    filteredTasks.forEach(createTaskLI) // Cria cada item da lista
}

function createTaskLI(task) {
    const taskItem = document.createElement('li')
    taskItem.classList.add('list-group-item', 'd-flex', 'align-items-center')
    taskItem.setAttribute('data-id', task.id)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id))

    const span = document.createElement('span')
    span.textContent = task.description

    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = '<i class="bi bi-trash"></i>'
    removeBtn.style.marginLeft = 'auto'
    removeBtn.classList.add('btn', 'btn-remove')
    removeBtn.addEventListener('click', () => removeTask(task.id))

    taskItem.appendChild(checkbox)
    taskItem.appendChild(span)
    taskItem.appendChild(removeBtn)
    taskList.prepend(taskItem)
}

function removeTask(taskId) {
    const index = data.findIndex(task => task.id === taskId)
    if (index !== -1) {
        if (!data[index].completed) {
            const userConfirmed = confirm('Você ainda não completou a tarefa! Tem certeza que deseja excluir?')
            if (!userConfirmed) return
        }
        data.splice(index, 1)
        renderTask() // Re-renderiza a lista
    }
}

function toggleTaskCompletion(taskId) {
    const task = data.find(task => task.id === taskId)
    if (task) {
        task.completed = !task.completed
        renderTask() // Atualiza a lista
    }
}

function searchTask() {
    const searchTerm = searchTaskInput.value.toLowerCase().trim()
    const filteredTasks = data.filter(task => task.description.toLowerCase().includes(searchTerm))
    renderTask(filteredTasks) // Mostra apenas as tarefas filtradas
}

addTaskBtn.addEventListener('click', addTask)

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') addTask()
})

searchTaskInput.addEventListener('keyup', searchTask)
