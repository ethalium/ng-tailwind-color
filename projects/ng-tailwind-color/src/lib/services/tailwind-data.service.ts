import {Injectable} from "@angular/core";
import {TWColorData} from "../interfaces/tailwind-internal.interface";
import {TWColorTone} from "../interfaces/tailwind-color.interface";
import {getColors} from "../utils/color.util";

export function getTailwindDataService(): TailwindDataService {
  return new TailwindDataService();
}

@Injectable({ providedIn: 'root' })
export class TailwindDataService {
  private _colors!: TWColorData;
  private _colorNames!: string[];

  /**
   * Retrieves the color data by aggregating and processing tailwind color versions.
   *
   * This method combines colors from multiple versions of Tailwind (e.g., TAILWIND_COLORS_V3 and TAILWIND_COLORS_V4)
   * into a single object format. If the colors have not been already initialized, they are processed and stored.
   *
   * @return {TWColorData} An object representing the combined and processed tailwind color data.
   */
  get colors(): TWColorData {
    if(!this._colors) {
      this._colors = getColors();
    }
    return this._colors;
  }

  /**
   * Retrieves a sorted array of color names in lowercase, trimmed format.
   *
   * @return {string[]} An array of sorted, lowercase, and trimmed color names.
   */
  get colorNames(): string[] {
    if(!this._colorNames){
      this._colorNames = Object.keys(this.colors).map(c => c.trim().toLowerCase()).sort();
    }
    return this._colorNames;
  }

  /**
   * Retrieves an array of predefined color tone levels.
   *
   * @return {TWColorTone[]} An array containing color tone values, ranging from light to dark.
   */
  get colorTones(): TWColorTone[] {
    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  }

}
