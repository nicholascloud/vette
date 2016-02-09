'use strict';
var expect = require('chai').expect;

var isDate = require('../src/is-date');

describe('isDate', function () {

  it('returns true for value date', function (done) {
    expect(isDate(new Date())).to.be.true;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isDate([])).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isDate(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isDate(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isDate(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isDate(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isDate({})).to.be.false;
    done();
  });

  it('returns false for value string', function (done) {
    expect(isDate('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isDate(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isDate(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isDate(123)).to.be.false;
    done();
  });
});