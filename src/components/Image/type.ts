import { ClassName, PopupContainer } from '@shared/type';
export interface ImageProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
  description?: string;
  fit?: ImageObjectFit;
  alt?: string;
  hideFooter?: HideFooter;
  footerPosition?: FooterPostion;
  showLoader?: boolean;
  preview?: boolean;
  previewVisible?: boolean;
  defaultPreviewVisible?: boolean;
  previewProps?: ImagePreviewProps;
  footerClass?: ClassName;
}

export interface ImageEmits {
  (e: 'update:previewVisible', visible: boolean): void;
  (e: 'preview-visible-change', visible: boolean): void;
}

export interface ImageSlots {
  error(): void;
  ['error-icon'](): void;
  loader(): void;
  extra(): void;
  ['preview-actions'](): void;
}

export interface ImagePreviewProps {
  src?: string;
  visible?: boolean;
  defaultVisible?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  actionsLayout?: string[];
  popupContainer?: PopupContainer;
  escToClose?: boolean;
  wheelZoom?: boolean;
  keyboard?: boolean;
  defaultScale?: number;
  zoomRate?: number;
}

export interface ImagePreviewEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'close'): void;
}

export interface ImagePreviewSlots {
  actions(): void;
  arrow(): void;
}

export interface ImagePreviewGroupProps extends Omit<ImagePreviewProps, 'src'> {
  srcList?: string[];
  current?: number;
  defaultCurrent?: number;
  infinite?: boolean;
}

export interface ImagePreviewGroupEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'update:current', index: number): void;
  (e: 'change', index: number): void;
  (e: 'visible-change', value: boolean): void;
}

export interface ImagePreviewGroupSlots {
  actions(): void;
  default(): void;
}

export interface ImagePreviewActionProps {
  name?: string;
  disabled?: boolean;
}

export interface ImagePreviewActionEmits {
  (e: 'click', ev: MouseEvent): void;
  (e: 'dblclick', ev: MouseEvent): void;
  (e: 'contextmenu', ev: MouseEvent): void;
}

export interface ImagePreviewActionSlots {
  default(): void;
}

export type ImageObjectFit =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'scale-down';
export type HideFooter = boolean | 'never';
export type FooterPostion = 'inner' | 'outer';
