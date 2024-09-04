import {
  isRef,
  onDeactivated,
  onUnmounted,
  unref,
  watch
} from 'vue';
import { onMountedOrActivated } from './onMountedOrActivated';
import { inBrowser } from './utils';



export function useEventListener(
  type,
  listener,
  options,
) {
  if (!inBrowser) {
    return;
  }

  const { target = window, passive = false, capture = false } = options;

  let cleaned = false;
  let attached;

  const add = (target) => {
    if (cleaned) {
      return;
    }
    const element = unref(target);

    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive,
      });
      attached = true;
    }
  };

  const remove = (target) => {
    if (cleaned) {
      return;
    }
    const element = unref(target);

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  onUnmounted(() => remove(target));
  onDeactivated(() => remove(target));
  onMountedOrActivated(() => add(target));

  let stopWatch;

  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove(oldVal);
      add(val);
    });
  }

  return () => {
    stopWatch?.();
    remove(target);
    cleaned = true;
  };
}
