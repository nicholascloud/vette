'use strict';
var expect = require('chai').expect;

var isString = require('../src/is-string');

describe('isString', function () {

  it('returns true for value string', function (done) {
    expect(isString('')).to.be.true;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isString([])).to.be.false;
    done();
  });

  it('returns false for value date', function (done) {
    expect(isString(new Date())).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isString(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isString(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isString(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isString(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isString({})).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isString(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isString(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isString(123)).to.be.false;
    done();
  });
});