import Component from '../Component.js';
import Tasks from './Tasks.js';

class TaskList extends Component {
    
    onRender(list) {
        const tasks = this.props.tasks;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        tasks.forEach(task => {
            const specificTask = new Tasks({ task, onUpdate, onRemove });
            list.appendChild(specificTask.renderDOM());
        });
        
            // .map(task => new Tasks({ task }))
            // .map(specificTask => specificTask.renderDOM())
            // .forEach(dom => list.appendChild(dom));
    }
    renderHTML() {

        return /*html*/`
            <ul class="todo-list"></ul>
        `;
    }
}

export default TaskList;
