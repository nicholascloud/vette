'use strict';
var expect = require('chai').expect;

var flatten = require('../src/flatten');

describe('flatten', function () {

  it('flattens a multi-dimensional array in one dimension', function (done) {
    var array = [
      ['a1', 'a2', 'a3'],
      ['b1', 'b2', 'b3'],
      [
        ['c1', 'c2', 'c3']
      ]
    ];
    var expected = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', ['c1', 'c2', 'c3']];
    var actual = flatten(array);
    expect(actual).to.deep.include.members(expected);
    done();
  });

  it('flattens a multi-dimensional array in all dimensions', function (done) {
    var array = [
      ['a1', 'a2', 'a3'],
      ['b1', 'b2', 'b3'],
      [
        ['c1', 'c2', 'c3']
      ]
    ];
    var expected = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    var actual = flatten(array, true);
    expect(actual).to.deep.include.members(expected);
    done();
  });
});