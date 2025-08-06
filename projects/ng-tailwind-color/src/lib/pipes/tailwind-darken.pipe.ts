import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWNil} from "../interfaces/tailwind-internal.interface";

@Pipe({
    name: 'twDarkenHex', pure: true,
    standalone: false
})
export class TailwindDarkenHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toString('hex') || null;
  }
}

@Pipe({
    name: 'twDarkenRgb', pure: true,
    standalone: false
})
export class TailwindDarkenRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toString('rgb') || null;
  }
}

@Pipe({
    name: 'twDarkenHsl', pure: true,
    standalone: false
})
export class TailwindDarkenHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toString('hsl') || null;
  }
}

@Pipe({
    name: 'twDarkenHsv', pure: true,
    standalone: false
})
export class TailwindDarkenHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toString('hsv') || null;
  }
}
