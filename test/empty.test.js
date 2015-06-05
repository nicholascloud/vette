'use strict';
var expect = require('chai').expect;

var empty = require('../src/empty');

describe('empty', function () {

  describe('when string', function () {
    it('returns true when the string has a length of zero', function (done) {
      var target = '';
      var actual = empty(target);
      expect(actual).to.be.true;
      done();
    });

    it('returns false when the string has a length greater than zero', function (done) {
      var target = 'target';
      var actual = empty(target);
      expect(actual).to.be.false;
      done();
    });
  });

  describe('when array', function () {
    it('returns true when the array has a length of zero', function (done) {
      var target = [];
      var actual = empty(target);
      expect(actual).to.be.true;
      done();
    });

    it('returns false when the array has a length greater than zero', function (done) {
      var target = [1];
      var actual = empty(target);
      expect(actual).to.be.false;
      done();
    });
  });

  describe('when object', function () {
    it('returns true when the object has none of its own keys', function (done) {
      var target = {};
      var actual = empty(target);
      expect(actual).to.be.true;
      done();
    });

    it('returns false when the object has its own keys', function (done) {
      var target = {foo: 'bar'};
      var actual = empty(target);
      expect(actual).to.be.false;
      done();
    });
  });
});