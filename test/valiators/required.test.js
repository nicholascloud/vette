'use strict';
var expect = require('chai').expect;

var requiredValidator = require('../../src/validators').required;

describe('required', function () {

  describe('- string values', function () {

    it('returns a default message if string value is empty', function (done) {
      var expectedMessage = 'value is required';
      var adapter = {
        value: function () {
          return '';
        }
      };
      var rule = requiredValidator(null, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns a custom message if string value is empty', function (done) {
      var expectedMessage = 'expected message';
      var adapter = {
        value: function () {
          return '';
        }
      };
      var rule = requiredValidator(expectedMessage, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns undefined if the string is empty but length is not checked', function (done) {
      var adapter = {
        value: function () {
          return '';
        }
      };
      var rule = requiredValidator(null, false);
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

    it('returns undefined if the string value is not empty', function (done) {
      var adapter = {
        value: function () {
          return 'not empty';
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

  });

  describe('- array values', function () {

    it('returns a default message if array value is empty', function (done) {
      var expectedMessage = 'value is required';
      var adapter = {
        value: function () {
          return [];
        }
      };
      var rule = requiredValidator(null, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns a custom message if array value is empty', function (done) {
      var expectedMessage = 'expected message';
      var adapter = {
        value: function () {
          return [];
        }
      };
      var rule = requiredValidator(expectedMessage, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns undefined if the array is empty but length is not checked', function (done) {
      var adapter = {
        value: function () {
          return [];
        }
      };
      var rule = requiredValidator(null, false);
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

    it('returns undefined if the array value is not empty', function (done) {
      var adapter = {
        value: function () {
          return ['not empty'];
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });
  });

  describe('- number values', function () {

    it('returns a default message if number value is zero', function (done) {
      var expectedMessage = 'value is required';
      var adapter = {
        value: function () {
          return 0;
        }
      };
      var rule = requiredValidator(null, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns a custom message if number value is zero', function (done) {
      var expectedMessage = 'expected message';
      var adapter = {
        value: function () {
          return 0;
        }
      };
      var rule = requiredValidator(expectedMessage, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns undefined if the number is zero but length is not checked', function (done) {
      var adapter = {
        value: function () {
          return 0;
        }
      };
      var rule = requiredValidator(null, false);
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

    it('returns undefined if the number value is greater than zero', function (done) {
      var adapter = {
        value: function () {
          return 1;
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

    it('returns undefined if the number value is less than zero', function (done) {
      var adapter = {
        value: function () {
          return -1;
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });
  });

  describe('- object values', function () {

    it('returns a default message if object value has no own keys', function (done) {
      var expectedMessage = 'value is required';
      var adapter = {
        value: function () {
          return {};
        }
      };
      var rule = requiredValidator(null, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns a custom message if object value has no own keys', function (done) {
      var expectedMessage = 'expected message';
      var adapter = {
        value: function () {
          return {};
        }
      };
      var rule = requiredValidator(expectedMessage, true);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns undefined if the object has no own keys but length is not checked', function (done) {
      var adapter = {
        value: function () {
          return {};
        }
      };
      var rule = requiredValidator(null, false);
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

    it('returns undefined if the object value has own keys', function (done) {
      var adapter = {
        value: function () {
          return {key: 'not empty'};
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

  });

  describe('- null values', function () {

    it('returns a default message if value is null', function (done) {
      var expectedMessage = 'value is required';
      var adapter = {
        value: function () {
          return null;
        }
      };
      var rule = requiredValidator(null);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns a custom message if value is null', function (done) {
      var expectedMessage = 'expected message';
      var adapter = {
        value: function () {
          return null;
        }
      };
      var rule = requiredValidator(expectedMessage);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns undefined if the value is not null', function (done) {
      var adapter = {
        value: function () {
          return 'not null';
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

  });

  describe('- undefined values', function () {

    it('returns a default message if value is undefined', function (done) {
      var expectedMessage = 'value is required';
      var adapter = {
        value: function () {
          return undefined;
        }
      };
      var rule = requiredValidator(null);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns a custom message if value is undefined', function (done) {
      var expectedMessage = 'expected message';
      var adapter = {
        value: function () {
          return undefined;
        }
      };
      var rule = requiredValidator(expectedMessage);
      var error = rule(adapter);
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(expectedMessage);
      done();
    });

    it('returns undefined if the value is not undefined', function (done) {
      var adapter = {
        value: function () {
          return 'not undefined';
        }
      };
      var rule = requiredValidator();
      var error = rule(adapter);
      expect(error).to.be.undefined;
      done();
    });

  });

});