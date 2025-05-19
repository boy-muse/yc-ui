import { App } from 'vue';
import _Tag from './index.vue';

export type TagInstance = InstanceType<typeof _Tag>;
export * from './type';

const Tag = Object.assign(_Tag, {
  install: (app: App) => {
    app.component('Yc' + _Tag.name, _Tag);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTag: typeof Tag;
  }
}

export default Tag;
