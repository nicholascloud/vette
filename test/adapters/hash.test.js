'use strict';
var expect = require('chai').expect;

var hash = require('../../src/adapters/hash');

describe('hash', function () {

  it('returns an adapter API', function (done) {
    var adapter = hash({});
    expect(adapter.find).to.be.a.function;
    expect(adapter.value).to.be.a.function;
    done();
  });

  describe('find()', function () {
    it('returns an adapter API', function (done) {
      var rootAdapter = hash({});
      var adapter = rootAdapter.find('');
      expect(adapter.find).to.be.a.function;
      expect(adapter.value).to.be.a.function;
      done();
    });
  });

  describe('value()', function () {
    it('returns the adapter\'s object', function (done) {
      var expected = {};
      var adapter = hash(expected);
      var actual = adapter.value();
      expect(actual).to.equal(expected);
      done();
    });

    it('returns a property value from it\'s root object', function (done) {
      var obj = {foo: 'bar'};
      var rootAdapter = hash(obj);
      var adapter = rootAdapter.find('foo');
      var actual = adapter.value();
      expect(actual).to.equal('bar');
      done();
    });
  });
});