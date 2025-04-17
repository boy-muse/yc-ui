import { App } from 'vue';
import _TimePicker from './index.vue';
('Yc');

export type TimePickerInstance = InstanceType<typeof _TimePicker>;
export * from './type';

const TimePicker = Object.assign(_TimePicker, {
  install: (app: App) => {
    app.component('Yc' + _TimePicker.name, _TimePicker);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTimePicker: typeof TimePicker;
  }
}

export default TimePicker;
