'use strict';
var expect = require('chai').expect;

var each = require('../src/each');

describe('each', function () {

  it('iterates over a collection and applies the iteratee to each item', function (done) {
    var array = ['a', 'b', 'c'];
    var elements = [];
    var indexes = [];
    each(array, function (element, index, collection) {
      elements.push(element);
      indexes.push(index);
      expect(collection).to.equal(array);
    });
    expect(elements).to.have.length(3);
    expect(elements).to.have.members(['a', 'b', 'c']);
    expect(indexes).to.have.length(3);
    expect(indexes).to.have.members([0, 1, 2]);
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

  it('iterates over an object and applies the iteratee to each value', function (done) {
    var obj = {
      a: 1,
      b: 2,
      c: 3
    };
    var keys = [];
    var values = [];
    each(obj, function (value, key, object) {
      keys.push(key);
      values.push(value);
      expect(object).to.equal(obj);
    });
    expect(keys).to.have.length(3);
    expect(keys).to.have.members(['a', 'b', 'c']);
    expect(values).to.have.length(3);
    expect(values).to.have.members([1, 2, 3]);
    done();
  });

  it('should not iterate over empty objects', function (done) {
    var obj = {};
    var actual = false;
    each(obj, function () {
      actual = true;
    });
    expect(actual).to.be.false;
    done();
  });
});