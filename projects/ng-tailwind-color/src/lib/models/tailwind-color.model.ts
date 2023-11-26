import tinyColor, {Instance as TinyColor} from 'tinycolor2';
import {TWColorOpacity} from "../interfaces/tailwind-color.interface";
import {TWInvertOptions} from "../interfaces/tailwind-options.interface";

export class TailwindColor {
  /** @internal */
  constructor(public readonly tinyColor: TinyColor) {}

  /**
   * Return an indication whether the color's perceived brightness is dark.
   */
  isDark(): boolean { return this.tinyColor.isDark() }

  /**
   * Return an indication whether the color's perceived brightness is light.
   */
  isLight(): boolean { return this.tinyColor.isLight() }

  /**
   * Get red / green / blue
   */
  get red(): number { return this.tinyColor.toRgb().r }
  get green(): number { return this.tinyColor.toRgb().g }
  get blue(): number { return this.tinyColor.toRgb().b }

  /**
   * Returns the perceived brightness of the color, from 0-255.
   */
  get brightness(): number { return this.tinyColor.getBrightness() }

  /**
   * Returns the perceived luminance of a color, from 0-1.
   */
  get luminance(): number { return this.tinyColor.getLuminance() }

  /**
   * Returns the alpha value of the color
   */
  get alpha(): number { return this.tinyColor.getAlpha(); }

  /**
   * Sets the alpha value on the current color.
   */
  setAlpha(alpha: TWColorOpacity): this {
    this.tinyColor.setAlpha(alpha / 100);
    return this;
  }

  /**
   * Brighten the color a given amount.
   *
   * @param amount - The amount to brighten by. The valid range is 0 to 100.
   *  Default value: 10.
   */
  brighten(amount?: number): this {
    this.tinyColor.brighten(amount);
    return this;
  }

  /**
   * Lighten the color a given amount. Providing 100 will always return white.
   *
   * @param amount - The amount to lighten by. The valid range is 0 to 100.
   *  Default value: 10.
   */
  lighten(amount?: number): this {
    this.tinyColor.lighten(amount);
    return this;
  }

  /**
   * Darken the color a given amount.
   *  Providing 100 will always return black.
   *
   * @param amount - The amount to darken by. The valid range is 0 to 100.
   *  Default value: 10.
   */
  darken(amount?: number): this {
    this.tinyColor.darken(amount);
    return this;
  }

  /**
   * Desaturate the color a given amount.
   *  Providing 100 will is the same as calling greyscale.
   *
   * @param amount - The amount to desaturate by. The valid range is 0 to 100.
   *  Default value: 10.
   */
  desaturate(amount?: number): this {
    this.tinyColor.desaturate(amount);
    return this;
  }

  /**
   * Saturate the color a given amount.
   *
   * @param amount - The amount to saturate by. The valid range is 0  to 100.
   *  Default value: 10.
   */
  saturate(amount?: number): this {
    this.tinyColor.saturate(amount);
    return this;
  }


  /**
   * Completely desaturates a color into greyscale.
   * Same as calling desaturate(100).
   */
  greyscale(): TailwindColor {
    return new TailwindColor(this.tinyColor.greyscale());
  }

  /**
   * Spin the hue a given amount. Calling with 0, 360, or -360 will do nothing.
   *
   * @param amount - The amount to spin by. The valid range is -360 to 360.
   */
  spin(amount: number): TailwindColor {
    return new TailwindColor(this.tinyColor.spin(amount));
  }

  /**
   * Gets an analogous color scheme based off of the current color.
   *
   * @param results - The amount of results to return.
   *  Default value: 6.
   * @param slices - The amount to slice the input color by.
   *  Default value: 30.
   */
  analogous(results?: number, slices?: number): TailwindColor[] {
    return this.tinyColor.analogous(results, slices).map(c => new TailwindColor(c));
  }

  /**
   * Gets the complement of the current color
   */
  complement(): TailwindColor {
    return new TailwindColor(this.tinyColor.complement());
  }

  /**
   * Gets a monochromatic color scheme based off of the current color.
   *
   * @param results - The amount of results to return.
   *  Default value: 6.
   */
  monochromatic(results?: number): TailwindColor[] {
    return this.tinyColor.monochromatic(results).map(c => new TailwindColor(c));
  }

  /**
   * Gets a split complement color scheme based off of the current color.
   */
  splitComplement(): [TailwindColor, TailwindColor, TailwindColor] {
    return this.tinyColor.splitcomplement().map(c => new TailwindColor(c)) as any;
  }

  /**
   * Gets a triad based off of the current color.
   */
  triad(): [TailwindColor, TailwindColor, TailwindColor] {
    return this.tinyColor.triad().map(c => new TailwindColor(c)) as any;
  }

  /**
   * Gets a tetrad based off of the current color.
   */
  tetrad(): [TailwindColor, TailwindColor, TailwindColor, TailwindColor] {
    return this.tinyColor.tetrad().map(c => new TailwindColor(c)) as any;
  }

  /**
   * Returns the hsva values interpolated into a string with the following format:
   * "hsva(xxx, xxx, xxx, xx)".
   */
  toHsv(): string {
    return this.tinyColor.toHsvString().trim().toLowerCase();
  }

  /**
   * Returns the hex value of the color -with a # appened.
   */
  toHex(): string {
    return this.tinyColor.toHexString().trim().toLowerCase();
  }

  /**
   * Returns the RGBA values interpolated into a string with the following format:
   * "RGBA(xxx, xxx, xxx, xx)".
   */
  toRgb(): string {
    return this.tinyColor.toRgbString().trim().toLowerCase();
  }

  /**
   * Returns the hsla values interpolated into a string with the following format:
   * "hsla(xxx, xxx, xxx, xx)".
   */
  toHsl(): string {
    return this.tinyColor.toHslString().trim().toLowerCase();
  }

  /**
   * Inverts the current color
   */
  invert(options?: Partial<TWInvertOptions>): TailwindColor {
    const [colorLight, colorDark] = [
      new TailwindColor(tinyColor(options?.light?.toString() || '#000000')),
      new TailwindColor(tinyColor(options?.dark?.toString() || '#FFFFFF')),
    ];
    return this.isDark() ? colorDark : colorLight;
  }

  /**
   * Returns the RGBA values interpolated into a string with the following format:
   * "RGBA(xxx, xxx, xxx, xx)".
   */
  toString(): string {
    return this.toRgb();
  }

}
