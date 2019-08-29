import Component from '../Component.js';
import store from '../../services/store.js';

class TaskForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=task]');
        const error = dom.querySelector('p.error');
        const signOutButton = dom.querySelector('button.signout-button');
        
        //creating sign out ability
        signOutButton.addEventListener('click', () => {
            function signOut() {
                store.removeToken();
                const searchParams = new URLSearchParams(location.search);
                location = searchParams.get('redirect') || './auth.html';
            }
            signOut();
        });

        //add new task
        form.addEventListener('submit', event => {
            event.preventDefault();

            const specificTask = {
                name: input.value,
                completed: false
            };

            error.textContent = '';

            onAdd(specificTask)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }

    renderHTML() {
        return /*html*/`
        <section class="todo-form-section">
            <h2>Goals & Tasks</h2>
                <button class="signout-button">Sign Out</button>
                <form class="todo-form">
                    <input name="task" required>
                    <button>Add</button>
                </form>
                <p class="error"></p>
        </section>
        `;
    }
}

export default TaskForm;