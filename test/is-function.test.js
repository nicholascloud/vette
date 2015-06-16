'use strict';
var expect = require('chai').expect;

var isFunction = require('../src/is-function');

describe('is-function', function () {

  it('returns false for objects', function (done) {
    expect(isFunction({})).to.be.false;
    done();
  });

  it('returns false for arrays', function (done) {
    expect(isFunction([])).to.be.false;
    done();
  });

  it('returns false for date', function (done) {
    expect(isFunction(new Date())).to.be.false;
    done();
  });

  it('returns false for regular expressions', function (done) {
    expect(isFunction(/.*/)).to.be.false;
    done();
  });

  it('returns false for strings', function (done) {
    expect(isFunction('')).to.be.false;
    done();
  });

  it('returns false for numbers', function (done) {
    expect(isFunction(1)).to.be.false;
    done();
  });

  it('returns false for booleans', function (done) {
    expect(isFunction(true)).to.be.false;
    done();
  });

  it('returns false for errors', function (done) {
    expect(isFunction(new Error())).to.be.false;
    done();
  });

  it('returns false for arguments', function (done) {
    expect(isFunction(arguments)).to.be.false;
    done();
  });

  it('returns false for null', function (done) {
    expect(isFunction(null)).to.be.false;
    done();
  });

  it('returns false for undefined', function (done) {
    expect(isFunction(undefined)).to.be.false;
    done();
  });

  it('returns true for functions', function (done) {
    expect(isFunction(function () {})).to.be.true;
    done();
  });

  it('returns true for methods', function (done) {
    var object = {method: function () {}};
    expect(isFunction(object.method)).to.be.true;
    done();
  });
});