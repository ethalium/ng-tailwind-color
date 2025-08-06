import {getTailwindService} from "./tailwind.service";

describe('TailwindService', () => {

  // get tailwind service
  const twService = getTailwindService();

  // testing find
  it('find should return 22 colors', () => {
    expect(twService.find({ minTone: 50, maxTone: 50 }).length).toBe(22);
  });

  // testing tailwind color
  it('color "blue-500" should return "rgb(43, 127, 255)"', () => {
    expect(twService.resolve('blue-500')?.toString('rgb')).toBe('rgb(43, 127, 255)');
  })

  // testing transparent keyword
  it('color "transparent" should return "rgba(0, 0, 0, 0)"', () => {
    expect(twService.resolve('transparent')?.toString('rgb')).toBe('rgba(0, 0, 0, 0)');
  });

  // testing white keyword
  it('color "white" should return "rgba(255, 255, 255)"', () => {
    expect(twService.resolve('white')?.toString('rgb')).toBe('rgb(255, 255, 255)');
  });

  // testing color with opacity
  it('color "#dc2626/50" should return "rgba(220, 38, 38, 0.5)"', () => {
    expect(twService.resolve('#dc2626/50')?.toString('rgb')).toBe('rgba(220, 38, 38, 0.5)');
  });

});
