'use strict';
var expect = require('chai').expect;

var extend = require('../src/extend');

describe('extend', function () {

  it('returns an empty object if no arguments are provided', function (done) {
    var actual = extend();
    expect(actual).to.be.an.object;
    expect(actual).to.be.empty;
    done();
  });

  it('returns the first argument if it is the only argument', function (done) {
    var obj = {foo: 'foo'};
    var actual = extend(obj);
    expect(actual).to.equal(obj);
    done();
  });

  it('copies properties from additional objects to the target', function (done) {
    var obj1 = {foo: 'foo'};
    var obj2 = {bar: function () {}};
    var obj3 = {bin: {}, baz: []};
    var actual = extend(obj1, obj2, obj3);
    expect(actual).to.equal(obj1);
    expect(actual).to.have.property('foo');
    expect(actual).to.have.property('bar');
    expect(actual).to.have.property('bin');
    expect(actual).to.have.property('baz');
    expect(actual.foo).to.equal(obj1.foo);
    expect(actual.bar).to.equal(obj2.bar);
    expect(actual.bin).to.equal(obj3.bin);
    expect(actual.baz).to.equal(obj3.baz);
    done();
  });
});