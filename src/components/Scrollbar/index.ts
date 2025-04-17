import { App } from 'vue';
import _Scrollbar from './index.vue';
('Yc');

export type ScrollbarInstance = InstanceType<typeof _Scrollbar>;
export * from './type';

const Scrollbar = Object.assign(_Scrollbar, {
  install: (app: App) => {
    app.component('Yc' + _Scrollbar.name, _Scrollbar);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcScrollbar: typeof Scrollbar;
  }
}

export default Scrollbar;
