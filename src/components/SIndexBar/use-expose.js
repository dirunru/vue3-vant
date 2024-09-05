import { getCurrentInstance } from 'vue';
const extend = Object.assign;

// expose public api
export function useExpose(apis) {
  console.log('apis----------useExpose', apis);
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}