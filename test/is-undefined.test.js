'use strict';
var expect = require('chai').expect;

var isUndefined = require('../src/is-undefined');

describe('isUndefined', function () {

  it('returns true for value undefined', function (done) {
    expect(isUndefined(undefined)).to.be.true;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isUndefined([])).to.be.false;
    done();
  });

  it('returns false for value date', function (done) {
    expect(isUndefined(new Date())).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isUndefined(null)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isUndefined(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isUndefined(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isUndefined({})).to.be.false;
    done();
  });

  it('returns false for value string', function (done) {
    expect(isUndefined('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isUndefined(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isUndefined(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isUndefined(123)).to.be.false;
    done();
  });
});