import Component from '../Component.js';
import Header from './Header.js';
import Loading from './Loading.js';
import TaskForm from '../todo/TaskForm.js';
import TaskList from '../todo/TaskList.js';
import { getTasks, addTask, updateTask, removeTask } from '../../services/todo-api.js';

class TaskApp extends Component {

    onRender(dom) {
        const header = new Header({ title: 'To Do List' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');

        const loading = new Loading({ loading: false });
        main.appendChild(loading.renderDOM());

        const taskForm = new TaskForm({
            onAdd: task => {
                loading.update({ loading: true });
                // part 1: do work on the server
                return addTask(task)
                    .then(saved => {
                        // part 2: integrate back into our list
                        const tasks = this.state.tasks;
                        tasks.push(saved);
                        taskList.update({ tasks });
                    })
                    .finally(() => {
                        loading.update({ loading: false });
                    });
            }
        });
        main.appendChild(taskForm.renderDOM());

        const taskList = new TaskList({ 
            tasks: [],
            onUpdate: task => {
                loading.update({ loading: true });

                // part 1: do work on the server
                return updateTask(task)
                    .then(updated => {
                        // part 2: integrate back into our list
                        const tasks = this.state.tasks;
                        
                        // what to do with updated?
                        const index = tasks.indexOf(task);
                        tasks.splice(index, 1, updated);

                        taskList.update({ tasks });
                    })
                    .finally(() => {
                        loading.update({ loading: false });
                    });
            },
            onRemove: task => {
                loading.update({ loading: true });

                // part 1: do work on the server
                return removeTask(task.id)
                    .then(() => {
                        // part 2: integrate back into our list
                        const tasks = this.state.tasks;
                        
                        // remove from the list
                        const index = tasks.indexOf(task);
                        tasks.splice(index, 1);

                        taskList.update({ tasks });
                    })
                    .finally(() => {
                        loading.update({ loading: false });
                    });
            }
        });
        main.appendChild(taskList.renderDOM());

        getTasks({ showAll: true })
            .then(tasks => {
                this.state.tasks = tasks;
                taskList.update({ tasks });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                loading.update({ loading: false });
            });

    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                </main>
            </div>
        `;
    }
}

export default TaskApp;