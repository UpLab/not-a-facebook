import MiniReact from './modules/MiniReact';

const App = () => {
  return MiniReact.createElement(
    "div",
    {
      className: "f"
    },
    MiniReact.createElement("h1", null, "Hello, world!"),
    MiniReact.createElement("p", null, "Lorem ipsum")
  );
}

export default App;
