import {TWColorTone} from "./tailwind-color.interface";

export type TWNil<T = any> = T|null|undefined;

export type TWColorData = Record<string, TWColorDataItem>;
export type TWColorDataItem = Record<TWColorTone, TWColorDataHex>;
export type TWColorDataHex = string;
