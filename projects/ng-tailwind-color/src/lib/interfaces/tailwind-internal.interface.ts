import {TWColorTone} from "./tailwind-color.interface";

export type TWColorData = Record<string, TWColorDataItem>;
export type TWColorDataItem = Record<TWColorTone, TWColorDataHex>;
export type TWColorDataHex = string;
