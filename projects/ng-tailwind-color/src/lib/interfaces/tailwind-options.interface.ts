import {TWColor, TWColorTone} from "./tailwind-color.interface";

export interface TWFindOptions {
  colors: string[];
  tones: TWColorTone[];
  minTone: TWColorTone;
  maxTone: TWColorTone;
}

export interface TWInvertOptions {
  light: TWColor;
  dark: TWColor;
}

export interface TWRandomOptions extends TWFindOptions {
  seed: string|null|undefined;
}
