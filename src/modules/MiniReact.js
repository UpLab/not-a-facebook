class MiniReact {
  // TODO: 1. handle attributes
  // TODO: 2. handle events
  createElement(tag, attributes, ...children){
    return `<${tag}>${children.join('\n')}</${tag}>`;
  }
}

export default new MiniReact();
