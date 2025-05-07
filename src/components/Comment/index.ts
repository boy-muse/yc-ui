import { App } from 'vue';
import _Comment from './index.vue';
export type CommentInstance = InstanceType<typeof _Comment>;
export * from './type';

const Comment = Object.assign(_Comment, {
  install: (app: App) => {
    app.component('Yc' + _Comment.name, _Comment);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcComment: typeof Comment;
  }
}

export default Comment;
