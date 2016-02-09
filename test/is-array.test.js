'use strict';
var expect = require('chai').expect;

var isArray = require('../src/is-array');

describe('isArray', function () {

  it('returns true for value array', function (done) {
    expect(isArray([])).to.be.true;
    done();
  });

  it('returns false for value date', function (done) {
    expect(isArray(new Date())).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isArray(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isArray(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isArray(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isArray(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isArray({})).to.be.false;
    done();
  });

  it('returns false for value string', function (done) {
    expect(isArray('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isArray(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isArray(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isArray(123)).to.be.false;
    done();
  });
});