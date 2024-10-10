import App from './src/App'

document.addEventListener('DOMContentLoaded', () => {
  const app = App()

  const targetEl = document.querySelector('#app');

  if (targetEl){
    targetEl.appendChild(app.getContent());
    return true
  } else {
    console.error('Not found element width selector: ', targetEl)
    return false
  }
});
