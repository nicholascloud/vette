'use strict';
var expect = require('chai').expect;

var difference = require('../src/difference');

describe('difference', function () {

  it('returns empty array if no arrays provided', function (done) {
    var actual = difference();
    expect(actual).to.be.an.array;
    expect(actual).to.be.empty;
    done();
  });

  it('returns the same array if only one array provided', function (done) {
    var expected = [1, 2, 3];
    var actual = difference(expected);
    expect(actual).to.be.an.array;
    expect(actual).to.have.members(expected);
    done();
  });

  it('returns an empty array if the first collection is empty', function (done) {
    var array1 = [],
      array2 = [2, 3],
      array3 = [4];
    var actual = difference(array1, array2, array3);
    expect(actual).to.be.an.array;
    expect(actual).to.be.empty;
    done();
  });

  it('returns empty array if values found in all arrays', function (done) {
    var array1 = [1, 2, 3],
      array2 = [1],
      array3 = [2, 3];
    var actual = difference(array1, array2, array3);
    expect(actual).to.be.an.array;
    expect(actual).to.be.empty;
    done();
  });

  it('returns array of only values found in first array that are not found in others', function (done) {
    var array1 = [1, 2, 3],
      array2 = ['a', 'b'],
      array3 = [2];
    var expected = [1, 3];
    var actual = difference(array1, array2, array3);
    expect(actual).to.be.an.array;
    expect(actual).to.have.members(expected);
    done();
  });
});