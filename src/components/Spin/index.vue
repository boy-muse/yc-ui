<template>
  <div class="yc-spin">
    <!-- 定义通用模板 -->
    <define-template>
      <div
        v-if="!hideIcon"
        :class="[
          'yc-spin-icon',
          {
            'yc-spin-icon-loading': !dot,
          },
        ]"
        :style="{
          fontSize: !isSizeInherit ? valueToPx(size) : '',
        }"
      >
        <slot name="icon">
          <div v-if="dot" class="yc-dot-loading">
            <div v-for="i in 5" :key="i" class="yc-dot-loading-item"></div>
          </div>
          <component v-else :is="renderLoading()" />
        </slot>
      </div>
      <div v-if="tip" class="yc-spin-tip">
        <slot name="tip">
          {{ tip }}
        </slot>
      </div>
    </define-template>
    <!-- 只有单独icon -->
    <reuse-template v-if="!$slots.default" />
    <!-- 有容器 -->
    <template v-else>
      <transition name="fade">
        <div v-if="loading" class="yc-spin-mask">
          <reuse-template />
        </div>
      </transition>
    </template>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { SpinProps, SpinSlots } from './type';
import { createReusableTemplate } from '@vueuse/core';
import { getGlobalConfig, valueToPx } from '@shared/utils';
defineOptions({
  name: 'Spin',
});
defineSlots<SpinSlots>();
withDefaults(defineProps<SpinProps>(), {
  size: 20,
  loading: false,
  dot: false,
  tip: '',
  hideIcon: false,
  isSizeInherit: false,
});
const { define: DefineTemplate, reuse: ReuseTemplate } =
  createReusableTemplate();
const { renderLoading } = getGlobalConfig();
</script>

<style lang="less" scoped>
@import './style/spin.less';
</style>
