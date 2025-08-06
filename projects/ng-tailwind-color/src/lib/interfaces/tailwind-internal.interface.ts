import {TWColorTone} from "./tailwind-color.interface";

/**
 * Represents a type alias `TWNil` which allows a value to be of a specified type `T`,
 * or `null`, or `undefined`.
 *
 * This type is often used in scenarios where a value can optionally be omitted or undefined.
 *
 * @template T The base type that can be combined with `null` and `undefined`.
 */
export type TWNil<T = any> = T|null|undefined;

/**
 * Represents a collection of named color data items.
 *
 * The TWColorData type is a Record where each key is a string representing the name
 * or identifier of a color, mapped to a value of type TWColorDataItem.
 *
 * This structure is typically used to store and organize color-related data
 * in an easily accessible and extensible way.
 *
 * For example, it can be used to define theme colors, palette definitions,
 * or other color configurations grouped by their identifiers.
 */
export type TWColorData = Record<string, TWColorDataItem>;
export type TWColorDataItem = Record<TWColorTone, TWColorDataValue>;
export type TWColorDataValue = string;
