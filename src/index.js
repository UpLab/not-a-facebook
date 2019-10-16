import MiniReactDOM from './modules/MiniReactDOM';
import App from './App';

// TODO: add JSX support
document.addEventListener('DOMContentLoaded', () => {
  MiniReactDOM.render(
    App(),
    document.getElementById('root')
  );
});
  