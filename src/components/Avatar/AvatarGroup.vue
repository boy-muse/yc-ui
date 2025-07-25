<template>
  <div class="yc-avatar-group">
    <component
      v-for="(node, index) in nodes.visible"
      :key="index"
      :is="node"
      :style="{
        zIndex: zIndexAscend ? index + 1 : nodes.visible.length - index,
        marginLeft: index ? valueToPx(-size / 4) : '',
      }"
    />
    <yc-popover
      v-if="maxCount > 0 && nodes.hide.length"
      :trigger-props="maxPopoverTriggerProps"
    >
      <yc-avatar
        :style="{
          zIndex: zIndexAscend ? nodes.visible.length : 0,
          marginLeft: valueToPx(-size / 4),
          ...maxStyle,
        }"
      >
        {{ `+${nodes.hide.length}` }}
      </yc-avatar>
      <template #content>
        <component
          v-for="(node, index) in nodes.hide"
          :key="index"
          :is="node"
          :style="{
            border: '2px solid #fff',
            zIndex: zIndexAscend ? index + 1 : nodes.hide.length - index,
            marginLeft: index ? valueToPx(-size / 4) : '',
          }"
        />
      </template>
    </yc-popover>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, useSlots } from 'vue';
import { AvatarGroupProps, AvatarGroupSlots } from './type';
import { findComponentsFromVnodes, valueToPx } from '@shared/utils';
import useContext from './hooks/useContext';
import YcAvatar from './index';
import YcPopover from '@/components/Popover';
defineOptions({
  name: 'AvatarGroup',
});
defineSlots<AvatarGroupSlots>();
const props = withDefaults(defineProps<AvatarGroupProps>(), {
  size: 40,
  shape: 'round',
  autoFixFontSize: true,
  maxCount: 0,
  zIndexAscend: false,
  maxStyle: () => {
    return {};
  },
  maxPopoverTriggerProps: () => {
    return {};
  },
});
const { maxCount } = toRefs(props);
// 注入
useContext().provide(props);
// 获取插槽内元素
const slots = useSlots();
const nodes = computed(() => {
  const avatars = findComponentsFromVnodes(
    slots.default?.() || [],
    YcAvatar.name as string
  );
  return {
    visible: maxCount.value > 0 ? avatars.slice(0, maxCount.value) : avatars,
    hide: avatars.slice(maxCount.value),
  };
});
</script>

<style lang="less" scoped>
.yc-avatar-group {
  height: fit-content;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  &:deep(.yc-avatar) {
    flex-shrink: 0;
    border: 2px solid #fff;
  }
}
</style>
