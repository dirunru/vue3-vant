import { unref } from 'vue';
export const BORDER = 'van-hairline';
export const BORDER_BOTTOM = `${BORDER}--bottom`;
export const isObject = (val) => val !== null && typeof val === 'object';
export const isDef = (val) => val !== undefined && val !== null;
export const isFunction = (val) => typeof val === 'function';
// 是不是pc端
export const inBrowser = typeof window !== 'undefined';

// background-color=> backgroundColor
const camelizeRE = /-(\w)/g;
export const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());

/**
 * @param {Object} object 目标对象
 * @param {String} path 'obj.a.b'
 * @returns {any} 返回对象的值
 */
export function get(object, path) {
  const keys = path.split('.');
  let result = object;
  keys.forEach((key) => {
    result = isObject(result) ? result[key] ?? '' : '';
  });
  return result;
}

/**
 * @param {*} name
 * @returns {Function}
 */
export function createTranslate(name) {
  const prefix = camelize(name) + '.'; // sVanIndexBar
  return (path, ...args) => {
    // const messages = locale.messages(); // 国际化，但是vanIndexBar没有国际化
    const messages = '';
    const message = get(messages, prefix + path) || get(messages, path);
    return isFunction(message) ? message(...args) : message;
  };
}
// 轮询进行拼接class类名
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
  console.log('name, mods', name, mods);
  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '');
}

export function createBEM(name) {
  return (el, mods) => {
    // 如果传入的不是string类型就置空，默认是name
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }
    el = el ? `${name}__${el}` : name;
    return `${el}${genBem(el, mods)}`;
  };
}
// 拼接类名
export function createNamespace(name) {
  const prefixedName = `s-van-${name}`;
  return [prefixedName, createBEM(prefixedName), createTranslate(prefixedName)];
}
// 判断ref元素是否隐藏
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

export function getZIndexStyle(zIndex) {
  const style = {};
  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }
  return style;
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
export const truthProp = {
  type: Boolean,
  default: true
};
