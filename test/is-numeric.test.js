'use strict';
var expect = require('chai').expect;

var isNumeric = require('../src/is-numeric');

describe('isNumeric', function () {

  it('returns false for value date', function (done) {
    expect(isNumeric(new Date())).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isNumeric(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isNumeric(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isNumeric(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isNumeric(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isNumeric({})).to.be.false;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isNumeric([])).to.be.false;
    done();
  });

  it('returns false for non-numeric value string', function (done) {
    expect(isNumeric('not a number')).to.be.false;
    done();
  });

  it('returns false for empty value string', function (done) {
    expect(isNumeric('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isNumeric(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isNumeric(/.*/)).to.be.false;
    done();
  });

  it('returns true for numeric value string', function (done) {
    expect(isNumeric('123')).to.be.true;
    done();
  });

  it('returns true for padded numeric value string', function (done) {
    expect(isNumeric('  123 ')).to.be.true;
    done();
  });

  it('returns true for value number', function (done) {
    expect(isNumeric(123)).to.be.true;
    done();
  });
});