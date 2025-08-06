import {Injectable, Optional} from "@angular/core";
import {TWNil} from "../interfaces/tailwind-internal.interface";
import {TWColor, TWColorLoDAmount, TWColorTone} from "../interfaces/tailwind-color.interface";
import {TWFindOptions, TWInvertOptions, TWRandomOptions} from "../interfaces/tailwind-options.interface";
import {TailwindColor} from "../models/tailwind-color.model";
import {getTailwindDataService, TailwindDataService} from "./tailwind-data.service";
import {createColor} from "../utils/color.util";

export function getTailwindService(): TailwindService {
  return new TailwindService();
}

@Injectable({ providedIn: 'root' })
export class TailwindService {

  /**
   * Constructs an instance of the class.
   *
   * @param {TailwindDataService} [data] An optional instance of the TailwindDataService.
   * If not provided, the default service instance is retrieved and assigned.
   */
  constructor(
    @Optional() private data: TailwindDataService = getTailwindDataService()
  ){}

  /**
   * Finds and returns an array of TailwindColor objects filtered based on the specified options.
   *
   * @param {Partial<TWFindOptions>} [options] - Optional parameters to customize the search behavior.
   *   - `colors`: An array of color names to filter. Defaults to all available color names.
   *   - `tones`: An array of tones to include. Defaults to all available tones.
   *   - `minTone`: The minimum tone value to include. Defaults to 50.
   *   - `maxTone`: The maximum tone value to include. Defaults to 950.
   * @return {TailwindColor[]} An array of TailwindColor objects that match the specified filtering options.
   */
  find(options?: Partial<TWFindOptions>): TailwindColor[] {

    // create options array
    const opts: TWFindOptions = {
      colors: (options?.colors || this.data.colorNames).map(c => c.trim().toLowerCase()),
      tones: (options?.tones || this.data.colorTones),
      minTone: options?.minTone || 50,
      maxTone: options?.maxTone || 950,
    }

    // create array for colors
    const colors: TailwindColor[] = [];

    // add colors
    this.data.colorNames.filter(name => opts.colors.includes(name)).map(name => {
      Object.keys(this.data.colors[name]).map(_ => parseInt(_) as unknown as TWColorTone).map(tone => {

        // check if tone is part of opts.tones
        if(!opts.tones.includes(tone)){
          return;
        }

        // check if tone is in range
        if(tone < opts.minTone || tone > opts.maxTone){
          return;
        }

        // create color
        const color = createColor(this.data.colors[name][tone]);

        // add tone to array
        if(color) {
          colors.push(new TailwindColor<any>(color));
        }

      });
    });

    // return colors
    return colors;

  }

  /**
   * Resolves the provided color and fallback to a TailwindColor instance or null if neither is valid.
   *
   * @param {TWNil<TWColor>} [color] - The primary color to resolve. Can be undefined or null.
   * @param {TWNil<TWColor>} [fallback] - The fallback color used if the primary color is invalid. Can be undefined or null.
   * @return {TailwindColor|null} A TailwindColor instance if the resolution is successful, otherwise null.
   */
  resolve(color?: TWNil<TWColor>, fallback?: TWNil<TWColor>): TailwindColor|null {
    const c = createColor(color) || createColor(fallback);
    return c ? new TailwindColor<any>(c) : null;
  }

  /**
   * Selects a random TailwindColor from the available colors.
   * The selection can be influenced by providing an optional seed value.
   *
   * @param {Partial<TWRandomOptions>} [options] - An optional configuration object.
   *        If `options.seed` is provided, it is used to generate a deterministic random selection.
   * @return {TailwindColor} - The randomly selected TailwindColor.
   */
  random(options?: Partial<TWRandomOptions>): TailwindColor {
    const colors = this.find(options);
    if(options?.seed){
      const seed = Math.trunc(Math.round(options.seed.split('').reduce((seed, char) => seed + char.charCodeAt(0), 0)) / 100);
      let count = -1;
      const pickColor = (): TailwindColor => {
        for(let color of colors){
          count++;
          if(count === seed){
            return color;
          }
        }
        return pickColor();
      }
      return pickColor();
    }
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  /**
   * Determines whether a given color is considered "light."
   *
   * @param {TWNil<TWColor>} [color] - The color to be evaluated. If not provided, a default behavior will be applied.
   * @return {boolean} Returns `true` if the color is light, otherwise `false`.
   */
  isLight(color?: TWNil<TWColor>): boolean {
    return this.resolve(color)?.isLight() || false;
  }

  /**
   * Determines if the provided color is considered dark.
   *
   * @param {TWNil<TWColor>} [color] - The optional color parameter to evaluate.
   * @return {boolean} True if the color is dark, otherwise false.
   */
  isDark(color?: TWNil<TWColor>): boolean {
    return this.resolve(color)?.isDark() || false;
  }

  /**
   * Lightens a given color by the specified amount.
   *
   * @param {TWNil<TWColor>} [color] - The color to lighten. Can be null or undefined.
   * @param {TWNil<number>} [amount] - The amount to lighten the color. Can be null or undefined.
   * @return {TailwindColor|null} The lightened color if the operation is successful, otherwise null.
   */
  lighten(color?: TWNil<TWColor>, amount?: TWNil<number>): TailwindColor|null {
    return this.resolve(color)?.lighten(amount ?? undefined) || null;
  }

  /**
   * Darkens a given color by a specified amount.
   *
   * @param {TWNil<TWColor>} [color] - The color to be darkened. If not provided, the method will use the default color logic.
   * @param {TWNil<number>} [amount] - The amount by which to darken the color. If not specified, a default amount will be used.
   * @return {TailwindColor|null} The darkened color as a TailwindColor object, or null if the operation could not be completed.
   */
  darken(color?: TWNil<TWColor>, amount?: TWNil<number>): TailwindColor|null {
    return this.resolve(color)?.darken(amount ?? undefined) || null;
  }

  /**
   * Modifies the brightness of a given color by either lightening or darkening it,
   * depending on whether the color is considered light or not.
   *
   * @param {TWNil<TWColor>} [color] - The color to be modified.
   * @param {TWNil<TWColorLoDAmount>} [amount] - The amount by which to lighten or darken the color.
   *                                              Can be a single value or an array containing separate
   *                                              amounts for lightening and darkening.
   * @return {TailwindColor|null} The modified color if successful, or null if input is invalid.
   */
  lightenOrDarken(color?: TWNil<TWColor>, amount?: TWNil<TWColorLoDAmount>): TailwindColor|null {
    const amounts = Array.isArray(amount) ? amount : [amount, amount];
    return this.isLight(color) ? this.darken(color, amounts[1]) : this.lighten(color, amounts[0]);
  }

  /**
   * Inverts the given color based on the provided options.
   *
   * @param {TWNil<TWColor>} [color] - The color to be inverted. If not provided, the method will attempt to resolve a default color.
   * @param {Partial<TWInvertOptions>} [options] - Optional parameters to customize the inversion process.
   * @return {TailwindColor|null} The inverted color as a TailwindColor object, or null if the color cannot be resolved.
   */
  invert(color?: TWNil<TWColor>, options?: Partial<TWInvertOptions>): TailwindColor|null {
    return this.resolve(color)?.invert(options) || null;
  }

}
