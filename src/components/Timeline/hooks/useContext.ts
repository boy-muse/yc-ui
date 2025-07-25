import {
  ref,
  Ref,
  toRefs,
  computed,
  useSlots,
  provide as _provide,
  inject as _inject,
} from 'vue';
import {
  TimelineProps as _TimelineProps,
  TimelineLabelPosition,
  TimelineMode,
} from '../type';
import { Props, Direction, RequiredDeep } from '@shared/type';
import { findComponentsFromVnodes } from '@shared/utils';
import TimelineItem from '../TimelineItem.vue';

const TIMELINE_CONTEXT_KEY = 'timeline-context';
type TimelineContext = {
  direction: Ref<Direction>;
  mode: Ref<TimelineMode>;
  reverse: Ref<boolean>;
  labelPosition: Ref<TimelineLabelPosition>;
};
type TimelineProps = RequiredDeep<_TimelineProps>;

export default () => {
  const provide = (props: Props) => {
    const {
      direction,
      labelPosition,
      reverse,
      mode: _mode,
    } = toRefs(props as TimelineProps);
    const slots = useSlots();
    // 动态计算mode
    const mode = computed(() => {
      if (direction.value == 'vertical') {
        return ['left', 'right', 'alternate'].includes(_mode.value)
          ? _mode.value
          : 'left';
      } else;
      {
        return ['top', 'bottom', 'alternate'].includes(_mode.value)
          ? _mode.value
          : 'bottom';
      }
    });
    // timelineitem
    const timelineItems = computed(() => {
      return findComponentsFromVnodes(
        slots.default?.() || [],
        TimelineItem.name
      );
    });
    _provide<TimelineContext>(TIMELINE_CONTEXT_KEY, {
      direction,
      mode,
      labelPosition,
      reverse,
    });
    return {
      direction,
      mode,
      timelineItems,
    };
  };
  const inject = () => {
    return _inject<TimelineContext>(TIMELINE_CONTEXT_KEY, {
      direction: ref('vertical'),
      mode: ref('left'),
      labelPosition: ref('same'),
      reverse: ref(false),
    });
  };
  return {
    provide,
    inject,
  };
};
