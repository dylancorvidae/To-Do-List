import AuthApp from './component/app/AuthApp.js';

const app = new AuthApp();
document.body.prepend(app.renderDOM());