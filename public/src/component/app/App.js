import Component from '../Component.js';
import TaskApp from './TaskApp.js';

class App extends Component {

    onRender(dom) {
        const taskApp = new TaskApp();
        dom.prepend(taskApp.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
            </div>
        `;
    }
}

export default App;