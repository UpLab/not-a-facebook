import MiniReactDOM from './modules/MiniReactDOM';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  MiniReactDOM.render(
    App(),
    document.getElementById('root')
  );
});
  