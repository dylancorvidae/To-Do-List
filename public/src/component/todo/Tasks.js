import Component from '../Component.js';

class Tasks extends Component {

    onRender(dom) {
        const task = this.props.task;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const completeButton = dom.querySelector('.complete-button');
        completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            onUpdate(task);
        });
        
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to remove "${task.name}"?`)) {
                onRemove(task);
            }
        });
    }

    renderHTML() {
        const task = this.props.task;

        return /*html*/`
            <li class="tasks">
                <span class="${task.completed ? 'complete' : ''}">${task.name}</span>
                <div class="task-buttons">
                    <button class="complete-button">    
                        ${task.completed ? ' Complete ' : ' Incomplete '}
                    </button>
                    <button class="remove-button">
                        🗑
                    </button>
                </div>
            </li>
        `;
    }
}

export default Tasks;