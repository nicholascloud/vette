'use strict';
var expect = require('chai').expect;

var isBoolean = require('../src/is-boolean');

describe('isBoolean', function () {

  it('returns true for value true', function (done) {
    expect(isBoolean(true)).to.be.true;
    done();
  });

  it('returns true for value false', function (done) {
    expect(isBoolean(false)).to.be.true;
    done();
  });

  it('returns false for value date', function (done) {
    expect(isBoolean(new Date())).to.be.false;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isBoolean([])).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isBoolean(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isBoolean(undefined)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isBoolean({})).to.be.false;
    done();
  });

  it('returns false for value string', function (done) {
    expect(isBoolean('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isBoolean(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isBoolean(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isBoolean(123)).to.be.false;
    done();
  });
});