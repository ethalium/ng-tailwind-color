import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWNil} from "../interfaces/tailwind-internal.interface";

@Pipe({ name: 'twHex', pure: true })
export class TailwindHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, fallback?: TWColor|null): TWColor|null {
    return this.twService.resolve(value, fallback)?.toHex() || null;
  }
}

@Pipe({ name: 'twRgb', pure: true })
export class TailwindRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, fallback?: TWColor|null): TWColor|null {
    return this.twService.resolve(value, fallback)?.toRgb() || null;
  }
}

@Pipe({ name: 'twHsl', pure: true })
export class TailwindHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, fallback?: TWColor|null): TWColor|null {
    return this.twService.resolve(value, fallback)?.toHsl() || null;
  }
}

@Pipe({ name: 'twHsv', pure: true })
export class TailwindHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, fallback?: TWColor|null): TWColor|null {
    return this.twService.resolve(value, fallback)?.toHsv() || null;
  }
}
