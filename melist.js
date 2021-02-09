const storedTaskDataString = localStorage.getItem('taskData');
const storedTaskData = JSON.parse(storedTaskDataString);
console.log(storedTaskData);
let taskData = storedTaskData || [];

/*let taskData = [
        {
            id: 1,
            priority: 'RED',
            status: 'DONE',
            title: 'Dupa',
            date: '27/07/2020',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },

        {
            id: 2,
            priority: 'YELLOW',
            status: 'TODO',
            title: 'Dupa',
            date: '27/07/2020',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 3,
            priority: 'YELLOW',
            status: 'TODO',
            title: 'Dupa',
            date: '27/07/2020',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
 
        {
            id: 4,
            priority: 'GREEN',
            status: 'TODO',
            title: 'Dupa',
            date: '27/07/2020',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 5,
            priority: 'GREEN',
            status: 'TODO',
            title: 'Dupa',
            date: '27/07/2020',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 6,
            priority: 'GREEN',
            status: 'TODO',
            title: 'Dupa',
            date: '27/07/2020',
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        }
    ];*/

function renderTaskList(container, list) {
    list.map(function(task){
        const newTaskTemplate = document.querySelector('#newTask');
        const newTask = newTaskTemplate.content.cloneNode(true);
        const taskDescription = newTask.querySelector('.taskDescription');
        const status = newTask.querySelector('.taskStatus');
        const title = newTask.querySelector('.taskTitle');
        const date = newTask.querySelector('.taskDate');
        taskDescription.textContent = task.desc;
        status.textContent = task.status;
        title.textContent = task.title;
        date.textContent = task.date;

        //obsługa usunięcia taska
        const deleteButton = newTask.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            const taskID = task.id;
            console.log('taskID: ', taskID);
 
            taskData = taskData.filter((t) => {
                return t.id !== taskID;
            })
            renderTasks();
        });

        //obsługa zmiany statusu
        const todoButton = newTask.querySelector('[value="TODO"]');
        const inprogressButton = newTask.querySelector('[value="IN_PROGRESS"]');
        const doneButton = newTask.querySelector('[value="DONE"]');

        todoButton.addEventListener('click', () => {
            task.status = 'TODO';
            renderTasks();    
        });

        inprogressButton.addEventListener('click', () => {
            task.status = 'IN_PROGRESS';
            renderTasks();    
        });

        doneButton.addEventListener('click', () => {
            task.status = 'DONE';
            renderTasks();    
        });

        //obsługa zmiany tytułu 
        const titleElement = newTask.querySelector('.taskTitle');
        titleElement.addEventListener('input', (event) => {
            console.log(event.target.textContent);
            task.title = event.target.textContent;
        });
        container.appendChild(newTask);
    }) 
};

function renderTasks() {
    const redTasks = document.querySelector('.redTasks');
    redTasks.textContent = '';
    const redTaskData = taskData.filter(({priority}) => {
        return priority === 'RED';
    });
    renderTaskList(redTasks, redTaskData);

    const yellowTasks = document.querySelector('.yellowTasks');
    yellowTasks.textContent = '';
    const yellowTaskData = taskData.filter(({priority}) => {
        return priority === 'YELLOW';
    });
    renderTaskList(yellowTasks, yellowTaskData);

    const greenTasks = document.querySelector('.greenTasks');
    greenTasks.textContent = '';
    const greenTaskData = taskData.filter(({priority}) => {
        return priority === 'GREEN';
    });
    renderTaskList(greenTasks, greenTaskData);
}
renderTasks();

function eventHandler() {
    const addButtons = document.querySelectorAll('.addButton');
    const dialog = document.getElementById('addForm');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            dialog.showModal();
        })
    });

    const cancelButton = document.querySelector('.addFormMenu').querySelector('[value="CANCEL"]');
    cancelButton.addEventListener('click', () => {
        dialog.close();
    })

    const addForm = dialog.querySelector('form');

    addForm.addEventListener('submit', (event) => {
        console.log('submit dupa', event);

        const formData = new FormData(addForm);
        const topic = formData.get('topic');
        const priority = formData.get('priority');
        const description = formData.get('description');
        const date = formData.get('date');

        console.log(topic, priority, description, date,);

        const newTask = {
            id: Date.now(),
            priority: priority,
            status: 'TODO',
            title: topic,
            date: date,
            desc: description,   
        }

        taskData.push(newTask);
        localStorage.setItem('taskData', JSON.stringify(taskData))
        console.log(taskData);
        renderTasks();      
    })
}
eventHandler();

