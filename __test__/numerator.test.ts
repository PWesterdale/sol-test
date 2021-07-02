import { numerate } from '../src/numerator';

describe('Roman Numerator', () => {
  it('Should allow a maximum number of 3999', () => {
    expect(() => {
      numerate(4000);
    }).toThrow();
  });

  describe.each([
    [1000, 'M'],
    [5, 'V'],
    [10, 'X'],
    [20, 'XX'],
    [1988, 'MCMLXXXVIII'],
    [1991, 'MCMXCI'],
    [3999, 'MMMCMXCIX'],
    //[6, 'VI'],
  ])('Numerator (%i)', (a, expected) => {
    test(`returns ${expected}`, () => {
      expect(numerate(a)).toBe(expected);
    });
  });
});
