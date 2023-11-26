<p align="center" style="font-size: 40px;">Angular Tailwind Color Helpers/Pipes</p>

<p align="center">Angular helper functions/pipe for coloring (build on top of TinyColor2)</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@fusoionic/ng-tailwind-color" target="_blank"><img src="https://img.shields.io/npm/v/@fusoionic/ng-tailwind-color.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-tailwind-color" target="_blank"><img src="https://img.shields.io/npm/l/@fusoionic/ng-tailwind-color.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-tailwind-color" target="_blank"><img src="https://img.shields.io/npm/dm/@fusoionic/ng-tailwind-color.svg" alt="NPM Downloads" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-tailwind-color" target="_blank"><img src="https://img.shields.io/bundlephobia/min/@fusoionic/ng-tailwind-color?label=size" alt="Package Size" /></a>
</p>

## Installation
`npm i @fusoionic/ng-tailwind-color`

## Usage

---

#
### Module:
Import `TailwindModule` from `@fusoionic/ng-tailwind-color`

```typescript
import { TailwindModule } from '@fusoionic/ng-tailwind-color';

@NgModule({
  imports: [
    TailwindModule.forRoot({ ... }), // inject services
    TailwindModule, // inject pipes
  ]
})
```
#
### Resolve color
Resolve color with pipe
```html
<!-- Tailwind string -->
<span [style.color]="'red-500' | twHex"></span>

<!-- Tailwind string with alpha/opacity -->
<span [style.color]="'red-500/50' | twRgb"></span> <!-- 50 = 0.5 -->
```

```typescript
import {TailwindService} from '@fusoionic/ng-tailwind-color';

export class AppComponent implements OnInit {
  constructor(
    private twService: TailwindService,
  ){}

  ngOnInit(){
    this.twService.resolve('red-500').darken(50).toHex();
  }
}

```

## Available Pipes

---
```html
twHex - Resolves color to HEX
twRgb - Resolves color to RGBA
twHsl - Resolves color to HSL
twHsv - Resolves color to HSV

twInvertHex - Inverts color and returns it as HEX
twInvertRgb - Inverts color and returns it as RGBA
twInvertHsl - Inverts color and returns it as HSL
twInvertHsv - Inverts color and returns it as HSV

twLightenHex - Lightens color by given amount and returns it as HEX
twLightenRgb - Lightens color by given amount and returns it as RGBA
twLightenHsl - Lightens color by given amount and returns it as HSL
twLightenHsv - Lightens color by given amount and returns it as HSV

twDarkenHex - Darkens color by given amount and returns it as HEX
twDarkenRgb - Darkens color by given amount and returns it as RGBA
twDarkenHsl - Darkens color by given amount and returns it as HSL
twDarkenHsv - Darkens color by given amount and returns it as HSV
```
