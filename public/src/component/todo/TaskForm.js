import Component from '../Component.js';

class TaskForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=task]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const specificTask = {
                name: input.value
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
            <form class="todo-form">
                <input name="todo" required>
                <button>Add</button>
            </form>
            <p class="error"></p>
        </section>
        `;
    }
}

export default TaskForm;