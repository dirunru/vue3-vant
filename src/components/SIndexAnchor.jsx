import { ref, reactive, computed, defineComponent } from 'vue';

// Utils
import { extend, BORDER_BOTTOM, getZIndexStyle, createNamespace } from './SIndexBar/utils';
import { INDEX_BAR_KEY } from './SIndexBar';
import { getScrollTop, getRootScrollTop } from './SIndexBar/utils';

// Composables
import { useRect, useParent, useExpose } from './SIndexBar/use';

const [name, bem] = createNamespace('index-anchor');

export const indexAnchorProps = {
  index: [Number, String]
};

export default defineComponent({
  name,
  props: indexAnchorProps,
  setup(props, { slots }) {
    const state = reactive({
      top: 0,
      left: null,
      rect: { top: 0, height: 0 },
      width: null,
      active: false
    });

    const root = ref();
    const { parent } = useParent(INDEX_BAR_KEY);

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <IndexAnchor> must be a child component of <IndexBar>.');
      }
      return;
    }

    const isSticky = () => state.active && parent.props.sticky;

    const anchorStyle = computed(() => {
      const { zIndex, highlightColor } = parent.props;

      if (isSticky()) {
        return Object.assign(getZIndexStyle(zIndex), {
          left: state.left ? `${state.left}px` : undefined,
          width: state.width ? `${state.width}px` : undefined,
          transform: state.top ? `translate3d(0, ${state.top}px, 0)` : undefined,
          color: highlightColor
        });
      }
    });

    const getRect = (scrollParent, scrollParentRect) => {
      const rootRect = useRect(root);
      state.rect.height = rootRect.height;
      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }

      return state.rect;
    };

    useExpose({
      state,
      getRect
    });

    return () => {
      const sticky = isSticky();

      return (
        <div ref={root} style={{ height: sticky ? `${state.rect.height}px` : undefined }}>
          <div style={anchorStyle.value} class={[bem({ sticky }), { [BORDER_BOTTOM]: sticky }]}>
            {slots.default ? slots.default() : props.index}
          </div>
        </div>
      );
    };
  }
});
