import {TWColorData, TWNil} from "../interfaces/tailwind-internal.interface";
import {TWColor, TWColorTone} from "../interfaces/tailwind-color.interface";
import {TailwindColor} from "../models/tailwind-color.model";
import {TAILWIND_COLORS_V3} from "../data/tailwind-color-v3.data";
import {TAILWIND_COLORS_V4} from "../data/tailwind-color-v4.data";
import {Color, converter, formatRgb, parse} from 'culori';

/**
 * Retrieves a combined collection of color data from Tailwind color versions V3 and V4.
 *
 * @return {TWColorData} An object containing color names as keys and their respective color tones as values.
 *
 * @internal
 */
let colorsData: TWColorData;
export function getColors(): TWColorData {
  if(!colorsData){
    colorsData = {};
    [TAILWIND_COLORS_V3, TAILWIND_COLORS_V4].map(colors => {
      Object.keys(colors).map(color => {
        colorsData[color] = {} as any;
        Object.keys(colors[color]).map(_ => _ as unknown as TWColorTone).map(tone => {
          colorsData[color][tone] = colors[color][tone];
        });
      });
    });
  }
  return colorsData;
}

/**
 * Creates and returns a color instance based on the provided input.
 *
 * @param {TWNil<TWColor>|undefined} colorString - The input color, which can be undefined, an instance of TailwindColor, or an object with a `mode` property. It can also be a color string to be parsed.
 * @return {Color|null} Returns a valid color instance if the input is parsed successfully, or null if the input is invalid or undefined.
 *
 * @internal
 */
export function createColor(colorString?: TWNil<TWColor>): Color|null {

  // return color if its null or undefined
  if(!colorString){
    return null;
  }

  // check if color is instance of TailwindColor
  if(colorString instanceof TailwindColor){
    return colorString.color;
  }

  // check if colorString is color
  if(typeof colorString === 'object' && colorString?.mode){
    return colorString;
  }

  // parse color string
  const [color, opacity] = parseColorString(colorString.toString().toLowerCase()) || [null, null];

  // return null if color and opacity are null
  if(!color && !opacity){
    return null;
  }

  // create color instance
  const instance = parse(color);

  // return null if the TinyColor instance is not valid
  if(!instance){
    return null;
  }

  // set alpha if opacity is not null
  if(opacity !== null) {
    instance.alpha = opacity / 100;
    instance.alpha = opacity < 0 ? 0 : instance.alpha > 1 ? 1 : instance.alpha;
  }

  // return instance
  return instance;

}

/**
 * Parses a color string and returns the base color and opacity value if applicable.
 *
 * @param {string} color - The color string to be parsed. This can be a HEX color with an optional opacity or a plain color name.
 * @return {[string, number|null]} A tuple containing the base color as a string and the opacity as a number (if specified), or null if no opacity is provided.
 *
 * @internal
 */
export function parseColorString(color: string): [string, number|null]|null {
  switch(true){

    // parse hex color
    case color.startsWith('#'): {
      const [colorHex, colorOpacity] = color.split('/');
      return [colorHex, !isNaN(parseInt(colorOpacity)) ? parseInt(colorOpacity) : null];
    }

    // parse tailwind color
    case !!color.match(/([a-zA-Z]+)-([0-9]+)/i): {
      // split color strings
      const [colorString, colorOpacity] = color.split('/');
      const [colorName, colorTone] = colorString.split('-');
      // parse opacity and tone
      const opacity: number = !isNaN(parseInt(colorOpacity)) ? parseInt(colorOpacity) : 100;
      const name: string = colorName.trim().toLowerCase();
      const tone: TWColorTone = parseInt(colorTone) as TWColorTone;
      // return color if exists
      return getColors()[name] && getColors()[name][tone] ? [getColors()[name][tone], opacity] : null;
    }

  }

  // convert color to rgb
  const colorParsed = parse(color);
  const colorConverter = converter('rgb');

  // return plain color
  return colorParsed ? [formatRgb(colorConverter(colorParsed)), null] : null;

}
