import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWInvertOptions} from "../interfaces/tailwind-options.interface";

@Pipe({ name: 'twInvertHex', pure: true })
export class TailwindInvertHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, options?: Partial<TWInvertOptions>): TWColor|null {
    return this.twService.invert(value, options)?.toHex() || null;
  }
}

@Pipe({ name: 'twInvertRgb', pure: true })
export class TailwindInvertRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, options?: Partial<TWInvertOptions>): TWColor|null {
    return this.twService.invert(value, options)?.toRgb() || null;
  }
}

@Pipe({ name: 'twInvertHsl', pure: true })
export class TailwindInvertHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, options?: Partial<TWInvertOptions>): TWColor|null {
    return this.twService.invert(value, options)?.toHsl() || null;
  }
}

@Pipe({ name: 'twInvertHsv', pure: true })
export class TailwindInvertHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, options?: Partial<TWInvertOptions>): TWColor|null {
    return this.twService.invert(value, options)?.toHsv() || null;
  }
}
