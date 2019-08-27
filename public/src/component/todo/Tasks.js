import Component from '../Component.js';

class Tasks extends Component {

    onRender(dom) {
        const task = this.props.task;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            task.inactive = !task.inactive;
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
                <span class="${task.inactive ? 'inactive' : ''}">${task.name}</span>
                <div>
                    <button class="inactive-button">
                        Make ${task.inactive ? 'Active' : 'Inactive'}
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