import {TailwindColor} from "../models/tailwind-color.model";
import {Color} from "culori";

/**
 * Represents a color type that can be used with Tailwind CSS styling.
 *
 * This type encompasses various types of color formats, including:
 * - TailwindColor: Official Tailwind CSS color classes.
 * - TWColorHex: Hexadecimal color values (e.g., #FFFFFF).
 * - TWColorRGB: RGB color values (e.g., rgb(255, 255, 255)).
 * - TWColorRGBA: RGBA color values (e.g., rgba(255, 255, 255, 0.5)).
 * - TWColorString: Named or string-based color definitions.
 * - string: Any custom string representation of a color not covered by the above types.
 */
export type TWColor = TailwindColor|Color|TWColorHex|TWColorRGB|TWColorRGBA|TWColorString|string;
export type TWColorHex = `#${string}` | `#${string}/${TWColorOpacity}`;
export type TWColorRGB = `rgb(${string},${string}, ${string})`;
export type TWColorRGBA = `rgba(${string},${string}, ${string}, ${number})`;
export type TWColorString = `${string}-${TWColorTone}` | `${string}-${TWColorTone}/${TWColorOpacity}`;

/**
 * A type representing allowable opacity values for Tailwind CSS color utilities.
 *
 * This type restricts the opacity value to specific increments of 5, ranging from 0 to 100.
 * Typically used in situations where predefined and consistent opacity levels are required.
 */
export type TWColorOpacity = 0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100;
export type TWColorTone = 50|100|200|300|400|500|600|700|800|900|950;

/**
 * Represents an amount of lightness or darkness used in color manipulation.
 *
 * This type can either be:
 * - A single number representing the amount.
 * - A tuple where the first value corresponds to the lighten amount (`TWColorLoDAmountLighten`)
 *   and the second value corresponds to the darken amount (`TWColorLoDAmountDarken`).
 */
export type TWColorLoDAmount = number|[TWColorLoDAmountLighten, TWColorLoDAmountDarken];
export type TWColorLoDAmountLighten = number;
export type TWColorLoDAmountDarken = number;
