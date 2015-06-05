'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters/hash');

describe('hash', function () {

  it('returns an adapter API', function (done) {
    var adapter = hashAdapter({});
    expect(adapter.find).to.be.a.function;
    expect(adapter.value).to.be.a.function;
    done();
  });

  describe('find()', function () {
    it('returns an adapter API', function (done) {
      var rootAdapter = hashAdapter({});
      var adapter = rootAdapter.find('');
      expect(adapter.find).to.be.a.function;
      expect(adapter.value).to.be.a.function;
      done();
    });
  });

  describe('value()', function () {
    it('returns the adapter\'s object', function (done) {
      var expected = {};
      var adapter = hashAdapter(expected);
      var actual = adapter.value();
      expect(actual).to.equal(expected);
      done();
    });

    it('returns a property value from it\'s root object', function (done) {
      var obj = {foo: 'bar'};
      var rootAdapter = hashAdapter(obj);
      var adapter = rootAdapter.find('foo');
      var actual = adapter.value();
      expect(actual).to.equal('bar');
      done();
    });
  });
});