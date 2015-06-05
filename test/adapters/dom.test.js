'use strict';
var expect = require('chai').expect;

var domAdapter = require('../../src/adapters/dom');

/**
 * Mocks only the portion of the DOM API that the adapter uses,
 *   namely: querySelector() and value
 */
var mock = function () {
  return {
    children: {},
    value: null,
    querySelector: function (selector) {
      return this.children[selector];
    }
  };
};

describe('jquery', function () {

  it('returns an adapter API', function (done) {
    var el = mock();
    var adapter = domAdapter(el);
    expect(adapter.find).to.be.a.function;
    expect(adapter.value).to.be.a.function;
    done();
  });

  describe('find()', function () {
    it('returns an adapter API', function (done) {
      var el = mock();
      var rootAdapter = domAdapter(el);
      var adapter = rootAdapter.find('');
      expect(adapter.find).to.be.a.function;
      expect(adapter.value).to.be.a.function;
      done();
    });
  });

  describe('value()', function () {
    it('returns the adapter\'s object', function (done) {
      var el = mock();
      var expected = el.value = 'value';
      var adapter = domAdapter(el);
      var actual = adapter.value();
      expect(actual).to.equal(expected);
      done();
    });

    it('returns a child element\'s value', function (done) {
      var el = mock();
      var childEl = mock();
      var expected = childEl.value = 'value';
      el.children['#child'] = childEl;
      var rootAdapter = domAdapter(el);
      var adapter = rootAdapter.find('#child');
      var actual = adapter.value();
      expect(actual).to.equal(expected);
      done();
    });
  });
});