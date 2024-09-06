import { ref, inject, computed, onUnmounted, getCurrentInstance } from 'vue';
// anchor中使用的，所以获取到的是anchor的实例
export function useParent(key) {
  const parent = inject(key, null);
  console.log('parent', parent);
  if (parent) {
    const instance = getCurrentInstance();
    const { link, unlink, internalChildren } = parent;
    link(instance);
    onUnmounted(() => unlink(instance));

    const index = computed(() => internalChildren.indexOf(instance));
    console.log('parent', parent);
    return {
      parent,
      index
    };
  }

  return {
    parent: null,
    index: ref(-1)
  };
}
