import {Injectable} from "@angular/core";
import {TAILWIND_COLORS} from "../data/tailwind-color.data";
import {TWColorData, TWNil} from "../interfaces/tailwind-internal.interface";
import {TinyColor, tinycolor} from "@thebespokepixel/es-tinycolor";
import {TWColor, TWColorTone} from "../interfaces/tailwind-color.interface";
import {TWFindOptions, TWInvertOptions, TWRandomOptions} from "../interfaces/tailwind-options.interface";
import {TailwindColor} from "../models/tailwind-color.model";

export function getTailwindService(): TailwindService {
  return new TailwindService();
}

@Injectable({ providedIn: 'root' })
export class TailwindService {

  /** Returns the color data */
  private get colors(): TWColorData {
    return TAILWIND_COLORS;
  }

  /** Returns a list of all color names */
  private get colorNames(): string[] {
    return Object.keys(this.colors).map(c => c.trim().toLowerCase()).sort();
  }

  /** Returns a list of all color tones */
  private get colorTones(): TWColorTone[] {
    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  }

  /** Returns a list of all colors based on the provided find options */
  find(options?: Partial<TWFindOptions>): TailwindColor[] {

    // create options object
    const opts: TWFindOptions = {
      colors: ((options?.colors && Array.isArray(options.colors) ? options.colors : this.colorNames)).map(c => c.trim().toLowerCase()),
      tones: (options?.tones && Array.isArray(options.tones) ? options.tones : this.colorTones),
      minTone: options?.minTone || 50,
      maxTone: options?.maxTone || 950,
    };

    // create array for colors
    const colors: TailwindColor[] = [];

    // add colors
    this.colorNames.filter(name => opts.colors.includes(name)).map(name => {
      (Object.keys(this.colors[name]) as unknown as TWColorTone[]).filter((tone) => this.colorTones.includes(parseInt(tone as any) as any)).map(tone => {
        colors.push(new TailwindColor(tinycolor(this.colors[name][tone], {})));
      });
    });

    // return colors
    return colors;

  }

  /** Resolves a color */
  resolve(color?: TWNil<TWColor>, fallback?: TWNil<TWColor>): TailwindColor|null {
    const c = parseColor(color) || parseColor(fallback);
    return c ? new TailwindColor(c) : null;
  }

  /** Returns a random color based on the provided find options and seed */
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

  /** Returns true if the provided color is light */
  isLight(color?: TWNil<TWColor>): boolean {
    return this.resolve(color)?.isLight() || false;
  }

  /** Returns true if the provided color is dark */
  isDark(color?: TWNil<TWColor>): boolean {
    return this.resolve(color)?.isDark() || false;
  }

  /** Lighten a color by the provided amount */
  lighten(color?: TWNil<TWColor>, amount?: TWNil<number>): TailwindColor|null {
    return this.resolve(color)?.lighten(amount ?? undefined) || null;
  }

  /** Darken a color by the provided amount */
  darken(color?: TWNil<TWColor>, amount?: TWNil<number>): TailwindColor|null {
    return this.resolve(color)?.darken(amount ?? undefined) || null;
  }

  /** Inverts a color */
  invert(color?: TWNil<TWColor>, options?: Partial<TWInvertOptions>): TailwindColor|null {
    return this.resolve(color)?.invert(options) || null;
  }

}

function parseColor(colorString?: TWNil<TWColor>): TinyColor|null {
  // check if the color is instanceof TailwindColor
  if(colorString instanceof TailwindColor) return colorString.tinyColor;
  // normalize color string
  const c = (colorString || '').trim().toLowerCase().replace(/ /g, '');
  // return null if no color is set
  if(!c) return null;
  // split color into pieces
  const [rawColor, rawOpacity] = c.split('/');
  // parse opacity and set to 100 if null
  const opacity = rawOpacity && !isNaN(parseInt(rawOpacity)) ? parseInt(rawOpacity) : 100;
  // parse color
  const color = tinycolor(getColor(TAILWIND_COLORS, rawColor) as any || rawColor, {});
  // return null if the tinyColor instance is not valid
  if(!color.isValid()) return null;
  // set opacity
  color.setAlpha(opacity);
  // return tinyColor instance
  return color;
}

function getColor(colorObject: TWColorData, tailwindColor: string): TWColor|null {
  const [twCategory, twTone] = tailwindColor?.trim()?.toLowerCase()?.split('/')[0]?.split('-') || [null, null];
  if(twCategory && twTone){
    for(let [_, colors] of Object.entries(colorObject).filter(o => o[0].trim().toLowerCase() === twCategory)) {
      for (let [_, color] of Object.entries(colors).filter(o => parseTone(o[0]) === parseTone(twTone))) {
        return color as TWColor;
      }
    }
  }
  return null;
}

function parseTone(tone: any): number {
  try {
    if (!isNaN(parseInt(tone))) {
      return parseInt(tone);
    }
    return 0;
  } catch {
    return 0;
  }
}
