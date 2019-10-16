import { isObject } from 'lodash';

class MiniReact {
  // TODO: handle events
  createElement(tag, attributes, ...children){
    if (typeof tag === 'function') {
      return tag(attributes);
    }
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

    children.flat().forEach((child) => {
      let childElement = child;
      if (typeof child === 'function') {
        childElement = child(attributes);
      }
      element.append(childElement);
    });

    return element;
  }
}

export default new MiniReact();
