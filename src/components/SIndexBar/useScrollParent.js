import { onMounted, ref } from 'vue';
import { inBrowser } from './utils';

const overflowScrollReg = /scroll|auto|overlay/i;
const defaultRoot = inBrowser ? window : undefined;

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el, root) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }

  return root;
}

export function useScrollParent(el, root) {
  const scrollParent = ref(null);
  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });

  return scrollParent;
}
