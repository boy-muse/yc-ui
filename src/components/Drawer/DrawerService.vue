<template>
  <yc-drawer
    v-bind="props"
    v-model:visible="visible"
    @ok="onOk?.()"
    @cancel="onCancel?.()"
    @before-open="onBeforeOpen?.()"
    @before-close="onBeforeClose?.()"
    @open="onOpen?.()"
    @close="handleClose"
  >
    <template #title>
      <component :is="getSlotFunction(title)" />
    </template>
    <div class="yc-drawer-body-content">
      <component :is="getSlotFunction(content)" />
    </div>
  </yc-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { DrawerServiceProps } from './type';
import { getSlotFunction } from '@shared/utils';
import YcDrawer from './Drawer.vue';
const props = withDefaults(defineProps<DrawerServiceProps>(), {
  placement: 'right',
  title: '',
  mask: true,
  maskClosable: true,
  closable: true,
  okText: '确认',
  cancelText: '取消',
  okLoading: false,
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
  unmountOnClose: false,
  width: 250,
  height: 250,
  popupContainer: 'yc-overlay-drawer',
  drawerStyle: () => {
    return {};
  },
  escToClose: true,
  renderToBody: false,
  header: true,
  footer: true,
  hideCancel: false,
  onBeforeCancel: () => {
    return true;
  },
  onBeforeOk: () => {
    return true;
  },
});
const { onClose, serviceClose } = props;
// visible
const visible = ref<boolean>(false);
// 处理close
const handleClose = () => {
  serviceClose?.();
  onClose?.();
};
onMounted(() => {
  visible.value = true;
});
</script>
