<template>
  <slot />
</template>

<script lang="ts" setup>
import { toRefs, provide, useSlots } from 'vue';
import { ConfigProviderProps, ConfigconfigSlots } from './type';
import {
  CONFIG_PROVIDER_PROVIDE_KEY,
  ConfigProviderProvide,
} from '@shared/utils';
defineOptions({
  name: 'ConfigProvider',
});
defineSlots<ConfigconfigSlots>();
const props = withDefaults(defineProps<ConfigProviderProps>(), {
  zIndex: 1001,
  size: 'medium',
  popupContainer: 'body',
  updateAtScroll: true,
  scrollToClose: false,
  exchangeTime: true,
});
const {
  zIndex,
  size,
  updateAtScroll,
  scrollToClose,
  exchangeTime,
  popupContainer,
} = toRefs(props);
const slots = useSlots();
provide<ConfigProviderProvide>(CONFIG_PROVIDER_PROVIDE_KEY, {
  slots,
  zIndex,
  size,
  updateAtScroll,
  scrollToClose,
  exchangeTime,
  popupContainer,
});
</script>
