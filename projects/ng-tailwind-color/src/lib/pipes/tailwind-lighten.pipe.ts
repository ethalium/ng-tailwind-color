import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWNil} from "../interfaces/tailwind-internal.interface";

@Pipe({
    name: 'twLightenHex', pure: true,
    standalone: false
})
export class TailwindLightenHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toString('hex') || null;
  }
}

@Pipe({
    name: 'twLightenRgb', pure: true,
    standalone: false
})
export class TailwindLightenRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toString('rgb') || null;
  }
}

@Pipe({
    name: 'twLightenHsl', pure: true,
    standalone: false
})
export class TailwindLightenHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toString('hsl') || null;
  }
}

@Pipe({
    name: 'twLightenHsv', pure: true,
    standalone: false
})
export class TailwindLightenHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toString('hsv') || null;
  }
}
