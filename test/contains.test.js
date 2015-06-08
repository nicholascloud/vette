'use strict';
var expect = require('chai').expect;

var contains = require('../src/contains');

describe('contains', function () {

  it('returns true if a value is found in an array', function (done) {
    var array = [1, 2, 3];
    var actual = contains(array, 3);
    expect(actual).to.be.true;
    done();
  });

  it('returns true if a reference is found in an array', function (done) {
    var ref = function () {};
    var array = ['a', 'b', 'c', ref];
    var actual = contains(array, ref);
    expect(actual).to.be.true;
    done();
  });

  it('returns false if a value is absent from an array', function (done) {
    var array = ['a', 'b', 'c'];
    var actual = contains(array, 'd');
    expect(actual).to.be.false;
    done();
  });

  it('returs false if a reference is absent from an array', function (done) {
    var array = ['a', 'b', 'c'];
    var actual = contains(array, function () {});
    expect(actual).to.be.false;
    done();
  });

  it('returns false if the array is empty', function (done) {
    var actual = contains([], 'q');
    expect(actual).to.be.false;
    done();
  });

  it('throws an exception if the collection is not an array', function (done) {
    var fn = function () {
      contains({}, 'q');
    };
    expect(fn).to.throw(TypeError, /collection/);
    done();
  });
});