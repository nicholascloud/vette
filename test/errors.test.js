'use strict';
var expect = require('chai').expect;

var errors = require('../src/errors'),
  MissingArgumentError = errors.MissingArgumentError;

describe('errors', function () {

  it('should expose MissingArgumentError constructor', function (done) {
    expect(errors).to.have.property('MissingArgumentError');
    expect(errors.MissingArgumentError).to.be.a.function;
    done();
  });

  describe('MissingArgumentError', function () {
    it('should inherit from Error', function (done) {
      var e = new MissingArgumentError();
      expect(Error.prototype.isPrototypeOf(e)).to.be.true;
      done();
    });

    it('should be named MissingArgumentError', function (done) {
      var e = new MissingArgumentError();
      expect(e.name).to.equal('MissingArgumentError');
      done();
    });

    it('should have a default message', function (done) {
      var e = new MissingArgumentError();
      expect(e.message).to.not.be.empty;
      expect(/unspecified$/.test(e.message)).to.be.true;
      done();
    });

    it('should have a default argument name', function (done) {
      var e = new MissingArgumentError();
      expect(e.argumentName).to.equal('unspecified');
      done();
    });

    it('should have a custom message', function (done) {
      var e = new MissingArgumentError('field');
      expect(/field$/.test(e.message)).to.be.true;
      done();
    });

    it('should have a custom argument name', function (done) {
      var e = new MissingArgumentError('field');
      expect(e.argumentName).to.equal('field');
      done();
    });

    it('should have a stack trace', function (done) {
      var e = new MissingArgumentError();
      expect(e.stack).to.be.an.array;
      expect(e.stack).to.not.be.empty;
      done();
    });
  });
});