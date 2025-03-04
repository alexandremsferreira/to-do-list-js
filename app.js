const taskList = document.querySelector('#taskList')
const taskInput = document.querySelector('#taskInput')
const addTaskBtn = document.querySelector('#addTaskBtn')

const data = []

function addTask() {
    const inputValue = taskInput.value
    if (inputValue.trim()) {
        const task = {
            id: Date.now(),
            description: inputValue,
            completed: false
        }
        data.push(task)
        taskInput.value = ''
        createTaskLI(task)
    }
}

function createTaskLI(task) {
    const taskItem = document.createElement('li')
    taskItem.classList.add('list-group-item', 'd-flex', 'align-items-center')
    taskItem.setAttribute('data-id', task.id)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id, taskItem))

    const span = document.createElement('span')
    span.textContent = task.description

    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = '<i class="bi bi-trash"></i>'
    removeBtn.style.marginLeft = 'auto'
    removeBtn.classList.add('btn', 'btn-remove')
    removeBtn.addEventListener('click', () => removeTask(task.id, taskItem))

    taskItem.appendChild(checkbox)
    taskItem.appendChild(span)
    taskItem.appendChild(removeBtn)
    taskList.prepend(taskItem)

}

function removeTask(taskId, taskItem) {
    const index = data.findIndex(task => task.id === taskId)
    if (index !== -1) {
        if (!data[index].completed) {
            const userConfirmed = confirm('Você ainda não completou a tarefa! Tem certeza que deseja excluir?')
            if (!userConfirmed) {
                return
            }
        }
        data.splice(index, 1)
        taskItem.remove()
    }
}

function toggleTaskCompletion(taskId, taskItem) {
    const task = data.find(task => task.id === taskId)
    if (task) {
        task.completed = !task.completed
        taskItem.classList.toggle('completed', task.completed)
    }
}

addTaskBtn.addEventListener('click', addTask)

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask()
    }
})
