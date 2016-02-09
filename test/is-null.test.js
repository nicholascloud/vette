'use strict';
var expect = require('chai').expect;

var isNull = require('../src/is-null');

describe('isNull', function () {

  it('returns true for value null', function (done) {
    expect(isNull(null)).to.be.true;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isNull([])).to.be.false;
    done();
  });

  it('returns false for value date', function (done) {
    expect(isNull(new Date())).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isNull(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isNull(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isNull(false)).to.be.false;
    done();
  });

  it('returns false for value object', function (done) {
    expect(isNull({})).to.be.false;
    done();
  });

  it('returns false for value string', function (done) {
    expect(isNull('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isNull(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isNull(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isNull(123)).to.be.false;
    done();
  });
});