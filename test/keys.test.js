'use strict';
var expect = require('chai').expect;

var keys = require('../src/keys');

describe('keys', function () {

  it('accumulates an object\'s own keys', function (done) {
    var obj = {foo:1, bar:2, baz:3};
    var expected = ['foo', 'bar', 'baz'];
    var actual = keys(obj);
    expect(actual).to.have.same.members(expected);
    done();
  });

  it('ignores keys of an object\'s prototype(s)', function (done) {
    var obj1 = {foo:1};
    var obj2 = Object.create(obj1);
    obj2.bar = 2;
    var obj3 = Object.create(obj2);
    obj3.baz = 3;
    var expected = ['baz'];
    var actual = keys(obj3);
    expect(actual).to.have.same.members(expected);
    done();
  });

  it('returns empty array if object has no keys', function (done) {
    var actual = keys({});
    expect(actual).to.be.an.array;
    expect(actual).to.be.empty;
    done();
  });
});