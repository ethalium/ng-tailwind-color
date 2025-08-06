import {TWColor, TWColorTone} from "./tailwind-color.interface";

/**
 * Represents options that control the behavior for a color and tone search within the TW framework.
 *
 * This interface is designed to provide filtering and range constraints
 * for identifying matching color tones based on specified criteria.
 */
export interface TWFindOptions {
  colors: string[];
  tones: TWColorTone[];
  minTone: TWColorTone;
  maxTone: TWColorTone;
}

/**
 * Interface representing options for inverting colors between light and dark themes.
 *
 * @property light - Defines the color to be used for the light theme.
 * @property dark - Defines the color to be used for the dark theme.
 */
export interface TWInvertOptions {
  light: TWColor;
  dark: TWColor;
}

/**
 * Interface representing options for randomization functionality.
 *
 * Extends the `TWFindOptions` interface to allow additional settings
 * for generating or working with random functionality.
 *
 * Properties:
 * - `seed`: A string used to initialize the random generator. Can be set to a specific value for predictable output
 *   or left as `null` or `undefined` for random seeding.
 */
export interface TWRandomOptions extends TWFindOptions {
  seed: string|null|undefined;
}
