'use strict';
var expect = require('chai').expect;

var jqueryAdapter = require('../../src/adapters/jquery');

/**
 * Mocks only the portion of the jQuery API that the adapter uses,
 *   namely: find() and val()
 */
var $mock = function () {
  return {
    children: {},
    value: null,
    find: function (selector) {
      return this.children[selector];
    },
    val: function () {
      return this.value;
    }
  };
};

describe('jquery', function () {

  it('returns an adapter API', function (done) {
    var $el = $mock();
    var adapter = jqueryAdapter($el);
    expect(adapter.find).to.be.a.function;
    expect(adapter.value).to.be.a.function;
    done();
  });

  describe('find()', function () {
    it('returns an adapter API', function (done) {
      var $el = $mock();
      var rootAdapter = jqueryAdapter($el);
      var adapter = rootAdapter.find('');
      expect(adapter.find).to.be.a.function;
      expect(adapter.value).to.be.a.function;
      done();
    });
  });

  describe('value()', function () {
    it('returns the adapter\'s object', function (done) {
      var $el = $mock();
      var expected = $el.value = 'value';
      var adapter = jqueryAdapter($el);
      var actual = adapter.value();
      expect(actual).to.equal(expected);
      done();
    });

    it('returns a child element\'s value', function (done) {
      var $el = $mock();
      var $child = $mock();
      var expected = $child.value = 'value';
      $el.children['#child'] = $child;
      var rootAdapter = jqueryAdapter($el);
      var adapter = rootAdapter.find('#child');
      var actual = adapter.value();
      expect(actual).to.equal(expected);
      done();
    });
  });
});