import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";

@Pipe({ name: 'twLightenHex', pure: true })
export class TailwindLightenHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toHex() || null;
  }
}

@Pipe({ name: 'twLightenRgb', pure: true })
export class TailwindLightenRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toRgb() || null;
  }
}

@Pipe({ name: 'twLightenHsl', pure: true })
export class TailwindLightenHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toHsl() || null;
  }
}

@Pipe({ name: 'twLightenHsv', pure: true })
export class TailwindLightenHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWColor|null, amount?: number|null): TWColor|null {
    return this.twService.lighten(value, amount)?.toHsv() || null;
  }
}
