'use strict';
var expect = require('chai').expect;

var compare = require('../src/compare');

describe('compare', function () {

  describe('when exclusive', function () {

    it('should return an api object', function (done) {
      var api = compare(false);
      expect(api).to.have.property('btw');
      expect(api).to.have.property('lt');
      expect(api).to.have.property('gt');
      done();
    });

    describe('btw', function () {
      it('should return true when the value is between two numbers', function (done) {
        var low = 1, high = 10, a = low + 1;
        while (a < high) {
          var actual = compare().btw(a, low, high);
          expect(actual).to.be.true;
          a += 1;
        }
        done();
      });

      it('should return false when the value is equal to low', function (done) {
        var low = 1, high = 10, a = low;
        var actual = compare().btw(a, low, high);
        expect(actual).to.be.false;
        done();
      });

      it('should return false when the value is equal to high', function (done) {
        var low = 1, high = 10, a = high;
        var actual = compare().btw(a, low, high);
        expect(actual).to.be.false;
        done();
      });

      it('should return false when the value is less than low', function (done) {
        var low = 1, high = 10, a = low - 1;
        var actual = compare().btw(a, low, high);
        expect(actual).to.be.false;
        done();
      });

      it('should return false when the value is greater than high', function (done) {
        var low = 1, high = 10, a = high + 1;
        var actual = compare().btw(a, low, high);
        expect(actual).to.be.false;
        done();
      });
    });

    describe('gt', function () {
      it('should return true when a is greater than b', function (done) {
        var a = 2, b = 1;
        var actual = compare().gt(a, b);
        expect(actual).to.be.true;
        done();
      });

      it('should return false when a is less than b', function (done) {
        var a = 0, b = 1;
        var actual = compare().gt(a, b);
        expect(actual).to.be.false;
        done();
      });

      it('should return false when a is equal to b', function (done) {
        var a = 1, b = 1;
        var actual = compare().gt(a, b);
        expect(actual).to.be.false;
        done();
      });
    });

    describe('lt', function () {
      it('should return true when a is less than b', function (done) {
        var a = 0, b = 1;
        var actual = compare().lt(a, b);
        expect(actual).to.be.true;
        done();
      });

      it('should return false when a is greater than b', function (done) {
        var a = 2, b = 1;
        var actual = compare().lt(a, b);
        expect(actual).to.be.false;
        done();
      });

      it('should return false when a is equal to b', function (done) {
        var a = 1, b = 1;
        var actual = compare().lt(a, b);
        expect(actual).to.be.false;
        done();
      });
    });
  });

  describe('when inclusive', function () {

    it('should return an api object', function (done) {
      var api = compare(true);
      expect(api).to.have.property('btw');
      expect(api).to.have.property('lt');
      expect(api).to.have.property('gt');
      done();
    });

    describe('btw', function () {
      it('should return true when the value is between two numbers', function (done) {
        var low = 1, high = 10, a = low + 1;
        while (a < high) {
          var actual = compare(true).btw(a, low, high);
          expect(actual).to.be.true;
          a += 1;
        }
        done();
      });

      it('should return true when the value is equal to low', function (done) {
        var low = 1, high = 10, a = low;
        var actual = compare(true).btw(a, low, high);
        expect(actual).to.be.true;
        done();
      });

      it('should return true when the value is equal to high', function (done) {
        var low = 1, high = 10, a = high;
        var actual = compare(true).btw(a, low, high);
        expect(actual).to.be.true;
        done();
      });

      it('should return false when the value is less than low', function (done) {
        var low = 1, high = 10, a = low - 1;
        var actual = compare(true).btw(a, low, high);
        expect(actual).to.be.false;
        done();
      });

      it('should return false when the value is greater than high', function (done) {
        var low = 1, high = 10, a = high + 1;
        var actual = compare(true).btw(a, low, high);
        expect(actual).to.be.false;
        done();
      });
    });

    describe('gt', function () {
      it('should return true when a is greater than b', function (done) {
        var a = 2, b = 1;
        var actual = compare(true).gt(a, b);
        expect(actual).to.be.true;
        done();
      });

      it('should return false when a is less than b', function (done) {
        var a = 0, b = 1;
        var actual = compare(true).gt(a, b);
        expect(actual).to.be.false;
        done();
      });

      it('should return true when a is equal to b', function (done) {
        var a = 1, b = 1;
        var actual = compare(true).gt(a, b);
        expect(actual).to.be.true;
        done();
      });
    });

    describe('lt', function () {
      it('should return true when a is less than b', function (done) {
        var a = 0, b = 1;
        var actual = compare(true).lt(a, b);
        expect(actual).to.be.true;
        done();
      });

      it('should return false when a is greater than b', function (done) {
        var a = 2, b = 1;
        var actual = compare(true).lt(a, b);
        expect(actual).to.be.false;
        done();
      });

      it('should return true when a is equal to b', function (done) {
        var a = 1, b = 1;
        var actual = compare(true).lt(a, b);
        expect(actual).to.be.true;
        done();
      });
    });
  });

});