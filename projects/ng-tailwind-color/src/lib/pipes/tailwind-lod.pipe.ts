import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor, TWColorLoDAmount} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWNil} from "../interfaces/tailwind-internal.interface";

@Pipe({ name: 'twLoDHex', pure: true })
export class TailwindLoDHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toHex() || null;
  }
}

@Pipe({ name: 'twLoDRgb', pure: true })
export class TailwindLoDRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toRgb() || null;
  }
}

@Pipe({ name: 'twLoDHsl', pure: true })
export class TailwindLoDHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toHsl() || null;
  }
}


@Pipe({ name: 'twLoDHsv', pure: true })
export class TailwindLoDHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toHsv() || null;
  }
}
