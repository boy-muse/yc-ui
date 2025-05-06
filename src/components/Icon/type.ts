import { ObjectData } from '@shared/type';
export interface IconProps {
  type?: string;
  size?: number | string | number[];
  rotate?: number;
  spin?: boolean;
}

export interface IconFontOptions {
  src?: string;
  extraProps?: ObjectData;
}
