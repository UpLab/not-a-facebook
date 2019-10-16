import { isObject } from 'lodash';

class MiniReact {
  // TODO: 2. handle events
  createElement(tag, attributes, ...children){
    const element = document.createElement(tag);
    if (isObject(attributes)) {
      Object.entries(attributes).forEach(([key, value]) => {
        if (key.toLowerCase() === 'classname') {
          element.className = value;
          return;
        }
        element.setAttribute(key, value)
      });
    }
    element.append(...children);

    return element;
  }
}

export default new MiniReact();
