import {TWColorOpacity} from "../interfaces/tailwind-color.interface";
import {TWInvertOptions} from "../interfaces/tailwind-options.interface";
import {createColor} from "../utils/color.util";
import {converter, formatCss, formatHex, formatHex8, formatHsl, formatRgb, Mode, wcagLuminance} from "culori";
import {FindColorByMode} from "culori/require";

/**
 * Represents a powerful utility class for managing and manipulating colors
 * with TailwindCSS and TinyColor. Provides additional functionality for
 * color manipulation such as changing brightness, saturation, and generating
 * various color schemes.
 */
export class TailwindColor<M extends Mode = 'rgb'> {
  constructor(
    private _color: FindColorByMode<M>,
  ) {}

  /**
   * Retrieves the current color mode.
   *
   * @return {FindColorByMode<Mode>} The color determined by the active mode.
   */
  get color(): FindColorByMode<M> {
    return this._color;
  }

  /**
   * Determines if the current color is perceived as dark.
   *
   * @return {boolean} Returns true if the color is dark, otherwise false.
   */
  isDark(): boolean {
    return this.luminance < 0.5;
  }

  /**
   * Determines if the current color is considered "light" based on its luminance.
   *
   * @return {boolean} True if the color is light, otherwise false.
   */
  isLight(): boolean {
    return this.luminance >= 0.5;
  }

  /**
   * Retrieves the luminance value of the color.
   *
   * The luminance is a measure of the brightness or lightness of the color.
   *
   * @return {number} A value between 0 and 1 representing the luminance, where 0 is darkest (black) and 1 is brightest (white).
   */
  get luminance(): number {
    return wcagLuminance(this.color);
  }

  /**
   * Retrieves the alpha (opacity) value of the color.
   *
   * @return {number} The alpha value as a number between 0 (completely transparent) and 1 (completely opaque).
   */
  get alpha(): number {
    return this.color.alpha ?? 1;
  }

  /**
   * Sets the alpha (opacity) value for the color.
   *
   * @param {TWColorOpacity} alpha - The alpha value to set, represented as a percentage (0-100).
   * @return {this} The current instance for method chaining.
   */
  setAlpha(alpha: TWColorOpacity): this {
    this.color.alpha = alpha / 100;
    return this;
  }

  /**
   * Adjusts the lightness of the color by a specified value. If no value is provided, the lightness remains unchanged.
   *
   * @param {number|null} [lightness] - The adjustment value for the lightness. If undefined or null, no adjustment is made.
   * @return {this} The current instance with the updated lightness value.
   */
  setLightness(lightness?: number|null): this {
    if(lightness !== undefined && lightness !== null){
      const c = converter('oklch')(this.color);
      c.l = Math.max(0, Math.min(1, lightness));
      this._color = converter(this.color.mode)(c);
    }
    return this;
  }

  /**
   * Lightens the current color by the specified amount.
   *
   * @param {number} [amount] - The amount to lighten the color. If no value is provided, a default value will be used.
   * @return {this} The instance with the lightened color.
   */
  lighten(amount?: number): this {
    if(amount !== undefined && amount !== null){
      const c = converter('oklch')(this.color);
      this.setLightness(c.l + amount)
    }
    return this;
  }

  /**
   * Darkens the current color by a specified amount.
   *
   * @param {number} [amount] - The amount by which to darken the color. If not specified, a default value may be used.
   * @return {this} The current instance with the updated color.
   */
  darken(amount?: number): this {
    if(amount !== undefined && amount !== null){
      const c = converter('oklch')(this.color);
      this.setLightness(c.l - amount)
    }
    return this;
  }

  /**
   * Inverts the current color based on whether it is dark or light.
   *
   * @param {Partial<TWInvertOptions>} [options] Optional parameter to specify custom light and dark colors.
   * @return {TailwindColor} Returns the inverted color as a TailwindColor object.
   */
  invert(options?: Partial<TWInvertOptions>): TailwindColor {
    const colorLight = new TailwindColor(createColor(options?.light?.toString()) || createColor('#000000') as any);
    const colorDark = new TailwindColor(createColor(options?.dark?.toString()) || createColor('#FFFFFF') as any);
    return this.isDark() ? colorDark : colorLight;
  }

  /**
   * Converts the current color instance to the specified mode.
   *
   * @param {Mode} mode - The target color mode to convert to.
   * @return {TailwindColor} A new TailwindColor instance in the specified mode.
   */
  toMode<M extends Mode>(mode: M): TailwindColor<M> {
    return new TailwindColor(converter(mode)(this.color));
  }

  /**
   * Converts the given mode to a string representation.
   *
   * @param {Mode} mode - The mode to be converted to a string.
   * @return {string} A string representation of the provided mode.
   */
  toString<M extends Mode>(mode?: M|'hex'|'hex8'|null): string {
    switch(mode || this.color.mode){
      case 'hex': return formatHex(this.color);
      case 'hex8': return formatHex8(this.color);
      case 'rgb': return formatRgb(this.color);
      case 'hsl': return formatHsl(this.color);
      default: return formatCss(mode ? converter(mode as any)(this.color) : this.color);
    }
  }

}
