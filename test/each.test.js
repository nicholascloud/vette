'use strict';
var expect = require('chai').expect;

var each = require('../src/each');

describe('each', function () {

  it('iterates over a collection and applies the iteratee to each item', function (done) {
    var actual = ['a', 'b', 'c'];
    var expected = ['foo-a', 'foo-b', 'foo-c'];
    each(actual, function (element, index, collection) {
      collection[index] = 'foo-' + element;
    });
    expect(actual).to.deep.include.members(expected);
    done();
  });

  it('should not iterate over empty collections', function (done) {
    var array = [];
    var actual = false;
    each(array, function () {
      actual = true;
    });
    expect(actual).to.be.false;
    done();
  });
});