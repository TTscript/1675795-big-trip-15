import Abstract from '../view/abstract.js';
const RenderPostition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPostition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPostition.BEFOREEND:
      container.append(child);
      break;
    case RenderPostition.BEFOREBEGIN:
      container.before(child);
      break;
    case RenderPostition.AFTEREND:
      container.after(child);
      break;
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export { RenderPostition, render, replace };
