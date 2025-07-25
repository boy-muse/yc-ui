<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :disabled="disabled"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    :on-trigger-mouseenter="handleCalcStyle"
    :on-trigger-mouseclick="handleCalcStyle"
    need-transform-origin
    auto-set-position
    auto-fit-popup-min-width
    ref="triggerRef"
    v-bind="triggerProps"
  >
    <yc-doption
      :disabled="disabled"
      :theme="theme"
      :class="$attrs.class"
      :style="$attrs.style"
      is-submenu
      ref="optionRef"
    >
      <slot />
      <template #suffix>
        <icon-arrow-right />
      </template>
    </yc-doption>
    <template #content>
      <div :class="['yc-dropdown', `yc-dropdown-theme-${theme}`]">
        <yc-scrollbar
          :style="{
            maxHeight: popupMaxHeight,
          }"
        >
          <div class="yc-dropdown-list">
            <slot name="content" />
          </div>
        </yc-scrollbar>
        <div v-if="$slots.footer" class="yc-dropdown-footer">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, nextTick, StyleValue } from 'vue';
import { IconArrowRight } from '@shared/icons';
import {
  unrefElement,
  isUndefined,
  isBoolean,
  valueToPx,
  useControlValue,
} from '@shared/utils';
import useContext from './hooks/useContext';
import {
  DsubmenuProps,
  DsubmenuSlots,
  DsubmenuEmits,
  DropdownExpose,
  Doption as YcDoption,
} from './index';
import { default as YcTrigger, TriggerInstance } from '@/components/Trigger';
import YcScrollbar from '@/components/Scrollbar';
defineOptions({
  name: 'Dsubmenu',
});
defineSlots<DsubmenuSlots>();
const props = withDefaults(defineProps<DsubmenuProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'rt',
  disabled: false,
  triggerProps: () => {
    return {};
  },
  popupMaxHeight: 200,
});
const emits = defineEmits<DsubmenuEmits>();
const {
  defaultPopupVisible,
  popupVisible,
  trigger: _trigger,
  position: _position,
  popupMaxHeight: _popupMaxHeight,
} = toRefs(props);
// 接收注入
const { theme } = useContext().inject();
// 受控的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emits('update:popupVisible', val);
    emits('popup-visible-change', val);
  }
);
// option的实例
const optionRef = ref();
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 位置
const position = computed(() => {
  return ['rt', 'lt'].includes(_position.value) ? _position.value : 'rt';
});
// 触发方式
const trigger = computed(() => {
  return ['hover', 'click'].includes(_trigger.value) ? _trigger.value : 'hover';
});
// 最大高度
const popupMaxHeight = computed(() => {
  if (
    (isBoolean(_popupMaxHeight.value) && !_popupMaxHeight.value) ||
    isUndefined(_popupMaxHeight)
  ) {
    return '';
  }
  return valueToPx(
    isBoolean(_popupMaxHeight.value) ? 200 : _popupMaxHeight.value
  );
});
// 处理计算style
const handleCalcStyle = async () => {
  await nextTick();
  const dom = unrefElement(optionRef);
  if (!dom) return;
  const { left, top, right, width } = dom.getBoundingClientRect();
  const x = position.value == 'rt' ? right : left - width;
  const y = top - 5;
  triggerRef.value?.updatePosition(x, y);
};
defineExpose<DropdownExpose>({
  show() {
    computedVisible.value = true;
  },
  hide() {
    computedVisible.value = false;
  },
});
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
