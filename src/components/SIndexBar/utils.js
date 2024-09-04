import { unref } from 'vue';
export const isObject = (val) => val !== null && typeof val === 'object';
export const isDef = (val) => val !== undefined && val !== null;
export const isFunction = (val) => typeof val === 'function';
export const inBrowser = typeof window !== 'undefined';
// background-color=> backgroundColor
const camelizeRE = /-(\w)/g;
export const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());

export function get(object, path) {
  console.log('argments', object, path);
  const keys = path.split('.');
  let result = object;
  keys.forEach((key) => {
    result = isObject(result) ? result[key] ?? '' : '';
  });
  return result;
}
export function createTranslate(name) {
  console.log('name', name); //  s-van-index-bar
  const prefix = camelize(name) + '.'; // sVanIndexBar
  return (path, ...args) => {
    // const messages = locale.messages(); // 国际化，但是vanIndexBar没有国际化
    const messages = '';
    const message = get(messages, prefix + path) || get(messages, path);
    return isFunction(message) ? message(...args) : message;
  };
}

function genBem(name, mods) {
  if (!mods) {
    return '';
  }
  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + genBem(name, item), '');
  }
  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '');
}

export function createBEM(name) {
  return (el, mods) => {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? `${name}__${el}` : name;

    return `${el}${genBem(el, mods)}`;
  };
}

export function createNamespace(name) {
  const prefixedName = `s-van-${name}`;
  return [prefixedName, createBEM(prefixedName), createTranslate(prefixedName)];
}
export function isHidden(elementRef) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';
  const parentHidden = el.offsetParent === null && style.position !== 'fixed';
  return hidden || parentHidden;
}
export const truthProp = {
  type: Boolean,
  default: true
};
export function getScrollTop(el) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
export function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
export function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
export function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
export const makeNumericProp = (defaultVal) => ({
  type: [Number, String],
  default: defaultVal
});

export const makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal
});
