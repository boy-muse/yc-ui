import { CSSProperties } from 'vue';
import { TriggerProps } from '../Trigger';

export interface AvatarProps {
  shape?: AvatarShape;
  imageUrl?: string;
  size?: number;
  autoFixFontSize?: boolean;
  triggerType?: AvatarTriggerType;
  triggerIconStyle?: CSSProperties;
  objectFit?: ObjectFit;
}

export interface AvatarEmits {
  (e: 'click', ev: MouseEvent): void;
  (e: 'error', ev: Event): void;
  (e: 'load', ev: Event): void;
}

export interface AvatarSlots {
  default(): void;
  ['trigger-icon'](): void;
}

export interface AvatarGroupProps {
  shape?: AvatarShape;
  size?: number;
  autoFixFontSize?: boolean;
  maxCount?: number;
  zIndexAscend?: boolean;
  maxStyle?: CSSProperties;
  maxPopoverTriggerProps?: TriggerProps;
}

export interface AvatarGroupSlots {
  default(): void;
}

export type AvatarShape = 'square' | 'round';
export type AvatarTriggerType = 'mask' | 'button';
export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none';
