import {ModuleWithProviders, NgModule, Type} from "@angular/core";
import {TailwindService} from "./services/tailwind.service";
import {TailwindHexPipe, TailwindHslPipe, TailwindHsvPipe, TailwindRgbPipe} from "./pipes/tailwind-resolve.pipe";
import {
  TailwindInvertHexPipe,
  TailwindInvertHslPipe,
  TailwindInvertHsvPipe,
  TailwindInvertRgbPipe
} from "./pipes/tailwind-invert.pipe";
import {
  TailwindDarkenHexPipe,
  TailwindDarkenHslPipe,
  TailwindDarkenHsvPipe,
  TailwindDarkenRgbPipe
} from "./pipes/tailwind-darken.pipe";
import {
  TailwindLightenHexPipe,
  TailwindLightenHslPipe,
  TailwindLightenHsvPipe,
  TailwindLightenRgbPipe
} from "./pipes/tailwind-lighten.pipe";

const declarations: Type<any>[] = [
  TailwindHexPipe,
  TailwindRgbPipe,
  TailwindHslPipe,
  TailwindHsvPipe,

  TailwindInvertHexPipe,
  TailwindInvertRgbPipe,
  TailwindInvertHslPipe,
  TailwindInvertHsvPipe,

  TailwindLightenHexPipe,
  TailwindLightenRgbPipe,
  TailwindLightenHslPipe,
  TailwindLightenHsvPipe,

  TailwindDarkenHexPipe,
  TailwindDarkenRgbPipe,
  TailwindDarkenHslPipe,
  TailwindDarkenHsvPipe,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
})
export class TailwindModule {
  static forRoot(): ModuleWithProviders<TailwindModule> {
    return {
      ngModule: TailwindModule,
      providers: [TailwindService],
    }
  }
}
