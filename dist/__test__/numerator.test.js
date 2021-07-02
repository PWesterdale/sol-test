"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numerator_1 = require("../src/numerator");
describe('Roman Numerator', function () {
    it('Should allow a maximum number of 3999', function () {
        expect(function () {
            numerator_1.numerate(4000);
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
    ])('Numerator (%i)', function (a, expected) {
        test("returns " + expected, function () {
            expect(numerator_1.numerate(a)).toBe(expected);
        });
    });
});
