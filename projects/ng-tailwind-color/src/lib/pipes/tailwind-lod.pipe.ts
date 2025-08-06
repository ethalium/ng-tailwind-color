import {Optional, Pipe, PipeTransform} from "@angular/core";
import {TWColor, TWColorLoDAmount} from "../interfaces/tailwind-color.interface";
import {getTailwindService, TailwindService} from "../services/tailwind.service";
import {TWNil} from "../interfaces/tailwind-internal.interface";

@Pipe({
    name: 'twLoDHex', pure: true,
    standalone: false
})
export class TailwindLoDHexPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toString('hex') || null;
  }
}

@Pipe({
    name: 'twLoDRgb', pure: true,
    standalone: false
})
export class TailwindLoDRgbPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toString('rgb') || null;
  }
}

@Pipe({
    name: 'twLoDHsl', pure: true,
    standalone: false
})
export class TailwindLoDHslPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toString('hsl') || null;
  }
}


@Pipe({
    name: 'twLoDHsv', pure: true,
    standalone: false
})
export class TailwindLoDHsvPipe implements PipeTransform {
  constructor(
    @Optional() private twService: TailwindService = getTailwindService()
  ){}

  transform(value: TWNil<TWColor>, amount?: TWColorLoDAmount|null): TWColor|null {
    return this.twService.lightenOrDarken(value, amount)?.toString('hsv') || null;
  }
}
