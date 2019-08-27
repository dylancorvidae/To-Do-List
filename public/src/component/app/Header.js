import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <header>
            <img src="assets/corvidae-circle-white.png" alt="Corvid logo" class="logo">
            <h1>Corvidae</h1>
        </header>
        `;
    }
}

export default Header;