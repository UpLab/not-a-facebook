class MiniReactDOM {
  render(html, parent){
    parent.innerHTML = html;
  }
}

export default new MiniReactDOM();
