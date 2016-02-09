'use strict';
var expect = require('chai').expect;

var isNumber = require('../src/is-number');

describe('isNumber', function () {

  it('returns false for value date', function (done) {
    expect(isNumber(new Date())).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isNumber(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isNumber(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isNumber(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isNumber(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isNumber({})).to.be.false;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isNumber([])).to.be.false;
    done();
  });

  it('returns false for non-numeric value string', function (done) {
    expect(isNumber('not a number')).to.be.false;
    done();
  });

  it('returns false for empty value string', function (done) {
    expect(isNumber('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isNumber(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isNumber(/.*/)).to.be.false;
    done();
  });

  it('returns false for numeric value string', function (done) {
    expect(isNumber('123')).to.be.false;
    done();
  });

  it('returns false for padded numeric value string', function (done) {
    expect(isNumber('  123 ')).to.be.false;
    done();
  });

  it('returns true for value number', function (done) {
    expect(isNumber(123)).to.be.true;
    done();
  });

});