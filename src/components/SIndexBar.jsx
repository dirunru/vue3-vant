import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, Teleport, watch } from 'vue';

// Utils

import { useChildren, useEventListener, useRect, useScrollParent, useExpose, useTouch } from './SIndexBar/use';
import {
  createNamespace,
  getRootScrollTop,
  getScrollTop,
  isDef,
  isHidden,
  makeNumberProp,
  preventDefault,
  setRootScrollTop,
  truthProp
} from './SIndexBar/utils';
function genAlphabet() {
  const charCodeOfA = 'A'.charCodeAt(0);
  const indexList = Array(26)
    .fill('')
    .map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}
// bem: callBack回调函数
const [name, bem] = createNamespace('index-bar');

export const indexBarProps = {
  sticky: truthProp,
  zIndex: [Number, String],
  teleport: '',
  highlightColor: String,
  stickyOffsetTop: makeNumberProp(0),
  indexList: {
    type: Array,
    default: genAlphabet
  }
};

export const INDEX_BAR_KEY = Symbol(name);

export default defineComponent({
  name,
  props: indexBarProps,
  emits: ['select', 'change'],
  setup(props, { emit, slots }) {
    const root = ref();
    const sidebar = ref();
    const activeAnchor = ref('');
    const touch = useTouch();
    const scrollParent = useScrollParent(root);
    const { children, linkChildren } = useChildren(INDEX_BAR_KEY);
    let selectActiveIndex = '';
    linkChildren({ props });
    const sidebarStyle = computed(() => {
      if (isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });

    const highlightStyle = computed(() => {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });

    const getActiveAnchor = (scrollTop, rects) => {
      for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    };
    const getMatchAnchor = (index) => children.find((item) => String(item.index) === index);

    const onScroll = () => {
      if (isHidden(root)) {
        return;
      }

      const { sticky, indexList } = props;
      const scrollTop = getScrollTop(scrollParent.value);
      const scrollParentRect = useRect(scrollParent);

      const rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));

      let active = -1;
      if (selectActiveIndex) {
        const match = getMatchAnchor(selectActiveIndex);
        if (match) {
          const rect = match.getRect(scrollParent.value, scrollParentRect);
          if (props.sticky && props.stickyOffsetTop) {
            active = getActiveAnchor(rect.top - props.stickyOffsetTop, rects);
          } else {
            active = getActiveAnchor(rect.top, rects);
          }
        }
      } else {
        active = getActiveAnchor(scrollTop, rects);
      }
      activeAnchor.value = indexList[active]?.index;
      if (sticky) {
        children.forEach((item, index) => {
          const { state, $el } = item;
          if (index === active || index === active - 1) {
            const rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }

          if (index === active) {
            state.active = true;
            state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1 && selectActiveIndex === '') {
            const activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }

      selectActiveIndex = '';
    };

    const init = () => {
      nextTick(onScroll);
    };

    useEventListener('scroll', onScroll, {
      target: scrollParent,
      passive: true
    });

    onMounted(init);

    watch(() => props.indexList, init);

    watch(activeAnchor, (value) => {
      if (value) {
        emit('change', value);
      }
    });

    const renderIndexes = () =>
      props.indexList.map((item) => {
        const active = item.index === activeAnchor.value;
        return (
          <span
            class={bem('index', { active: active, red: item.finish, green: !item.finish })}
            style={active ? highlightStyle.value : undefined}
            data-index={item.index}
          >
            {item.index}
          </span>
        );
      });

    const scrollTo = (index) => {
      selectActiveIndex = String(index);
      const match = getMatchAnchor(selectActiveIndex);
      if (match) {
        const scrollTop = getScrollTop(scrollParent.value);
        const scrollParentRect = useRect(scrollParent);
        const { offsetHeight } = document.documentElement;
        match.$el.scrollIntoView();

        if (scrollTop === offsetHeight - scrollParentRect.height) {
          onScroll();
          return;
        }

        if (props.sticky && props.stickyOffsetTop) {
          if (getRootScrollTop() === offsetHeight - scrollParentRect.height) {
            setRootScrollTop(getRootScrollTop());
          } else {
            setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
          }
        }

        emit('select', match.index);
      }
    };

    const scrollToElement = (element) => {
      const { index } = element.dataset;
      if (index) {
        scrollTo(index);
      }
    };

    const onClickSidebar = (event) => {
      scrollToElement(event.target);
    };

    let touchActiveIndex = '';

    const onTouchMove = (event) => {
      touch.move(event);

      if (touch.isVertical()) {
        preventDefault(event);

        const { clientX, clientY } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const { index } = target.dataset;

          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };

    const renderSidebar = () => (
      <div
        ref={sidebar}
        class={bem('sidebar')}
        style={sidebarStyle.value}
        onClick={onClickSidebar}
        onTouchstartPassive={touch.start}
      >
        {renderIndexes()}
      </div>
    );

    useExpose({ scrollTo });

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener('touchmove', onTouchMove, {
      target: sidebar
    });

    return () => (
      <div ref={root} class={bem()}>
        {props.teleport ? <Teleport to={props.teleport}>{renderSidebar()}</Teleport> : renderSidebar()}
        {slots.default?.()}
      </div>
    );
  }
});
