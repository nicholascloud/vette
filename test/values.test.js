'use strict';
var expect = require('chai').expect;

var values = require('../src/values');

describe('values', function () {

  it('accumulates an object\'s own values', function (done) {
    var obj = {foo:1, bar:2, baz:3};
    var expected = [1, 2, 3];
    var actual = values(obj);
    expect(actual).to.have.same.members(expected);
    done();
  });

  it('ignores values of an object\'s prototype(s)', function (done) {
    var obj1 = {foo:1};
    var obj2 = Object.create(obj1);
    obj2.bar = 2;
    var obj3 = Object.create(obj2);
    obj3.baz = 3;
    var expected = [3];
    var actual = values(obj3);
    expect(actual).to.have.same.members(expected);
    done();
  });

  it('returns empty array if object has no values', function (done) {
    var actual = values({});
    expect(actual).to.be.an.array;
    expect(actual).to.be.empty;
    done();
  });
});