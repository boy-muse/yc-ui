import { App } from 'vue';
import _ConfigProvider from './index.vue';
export type ConfigProviderInstance = InstanceType<typeof _ConfigProvider>;
export * from './type';

const ConfigProvider = Object.assign(_ConfigProvider, {
  install: (app: App) => {
    app.component('Yc' + _ConfigProvider.name, _ConfigProvider);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcConfigProvider: typeof ConfigProvider;
  }
}

export default ConfigProvider;
