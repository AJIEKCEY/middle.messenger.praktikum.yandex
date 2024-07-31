import App from './src/components/App/App.js'

const targetElement = document.getElementById('app');
document.customEventListeners = null;

const app = new App({}, targetElement )

app.render();
