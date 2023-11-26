import {TailwindColor} from "../models/tailwind-color.model";

export type TWColor = TailwindColor|TWColorHex|TWColorRGB|TWColorRGBA|TWColorString|string;
export type TWColorHex = `#${string}` | `#${string}/${TWColorOpacity}`;
export type TWColorRGB = `rgb(${string},${string}, ${string})`;
export type TWColorRGBA = `rgba(${string},${string}, ${string}, ${number})`;
export type TWColorString = `${string}-${TWColorTone}` | `${string}-${TWColorTone}/${TWColorOpacity}`;

export type TWColorOpacity = 0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100;
export type TWColorTone = 50|100|200|300|400|500|600|700|800|900|950;
