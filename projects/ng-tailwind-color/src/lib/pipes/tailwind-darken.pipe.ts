import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWNil} from "../interfaces/tailwind-internal.interface";

@Pipe({ name: 'twDarkenHex', pure: true })
export class TailwindDarkenHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toHex() || null;
  }
}

@Pipe({ name: 'twDarkenRgb', pure: true })
export class TailwindDarkenRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toRgb() || null;
  }
}

@Pipe({ name: 'twDarkenHsl', pure: true })
export class TailwindDarkenHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toHsl() || null;
  }
}

@Pipe({ name: 'twDarkenHsv', pure: true })
export class TailwindDarkenHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.darken(value, amount)?.toHsv() || null;
  }
}
