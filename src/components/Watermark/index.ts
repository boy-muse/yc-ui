import { App } from 'vue';
import _Watermark from './index.vue';

export type WatermarkInstance = InstanceType<typeof _Watermark>;
export * from './type';

const Watermark = Object.assign(_Watermark, {
  install: (app: App) => {
    app.component('Yc' + _Watermark.name, _Watermark);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcWatermark: typeof Watermark;
  }
}

export default Watermark;
