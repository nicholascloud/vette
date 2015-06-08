'use strict';
var expect = require('chai').expect;

var adapters = require('../../src/adapters/index');

describe('index', function () {

  it('should have a hash adapter', function (done) {
    expect(adapters.hash).to.be.a.function;
    done();
  });

  it('should have a jquery adapter', function (done) {
    expect(adapters.jquery).to.be.a.function;
    done();
  });

  it('should have a dom adapter', function (done) {
    expect(adapters.dom).to.be.a.function;
    done();
  });
});