import {getTailwindService} from "./tailwind.service";

describe('TailwindService', () => {

  // get tailwind service
  const twService = getTailwindService();

  // testing find
  it('find should return 22 colors', () => {
    expect(twService.find({ minTone: 50, maxTone: 50 }).length).toBe(22);
  });

  // testing transparent keyword
  it('color "transparent" should return "rgba(0, 0, 0, 0)"', () => {
    expect(twService.resolve('transparent')?.toRgb()).toBe('rgba(0, 0, 0, 0)');
  });

  // testing white keyword
  it('color "white" should return "rgba(255, 255, 255)"', () => {
    expect(twService.resolve('white')?.toRgb()).toBe('rgb(255, 255, 255)');
  });

  // testing white keyword
  it('color "#dc2626/50" should return "rgba(220, 38, 38, 0.5)"', () => {
    expect(twService.resolve('#dc2626/50')?.toRgb()).toBe('rgba(220, 38, 38, 0.5)');
  });

});
