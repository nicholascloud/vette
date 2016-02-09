'use strict';
var expect = require('chai').expect;

var isObject = require('../src/is-object');

describe('isObject', function () {

  it('returns true for value object', function (done) {
    expect(isObject({})).to.be.true;
    done();
  });

  it('returns false for value array', function (done) {
    expect(isObject([])).to.be.false;
    done();
  });

  it('returns false for value date', function (done) {
    expect(isObject(new Date())).to.be.false;
    done();
  });

  it('returns false for value null', function (done) {
    expect(isObject(null)).to.be.false;
    done();
  });

  it('returns false for value undefined', function (done) {
    expect(isObject(undefined)).to.be.false;
    done();
  });

  it('returns false for value true', function (done) {
    expect(isObject(true)).to.be.false;
    done();
  });

  it('returns false for value false', function (done) {
    expect(isObject(false)).to.be.false;
    done();
  });

  it('returns false for value string', function (done) {
    expect(isObject('')).to.be.false;
    done();
  });

  it('returns false for value NaN', function (done) {
    expect(isObject(NaN)).to.be.false;
    done();
  });

  it('returns false for value regex', function (done) {
    expect(isObject(/.*/)).to.be.false;
    done();
  });

  it('returns false for value number', function (done) {
    expect(isObject(123)).to.be.false;
    done();
  });
});