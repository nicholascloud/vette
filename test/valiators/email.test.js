'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var emailValidator = require('../../src/validators').email;

describe('email', function () {

  it('should return a message if the email is invalid', function (done) {
    var expectedMessage = 'email address is invalid';
    var obj = {
      email: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var emailAdapter = rootAdapter.find('email');
    var rule = emailValidator();
    var actualMessage = rule(emailAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return a custom message if the email is invalid', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      email: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var emailAdapter = rootAdapter.find('email');
    var rule = emailValidator(expectedMessage);
    var actualMessage = rule(emailAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return undefined if the email is valid', function (done) {
    var obj = {
      email: 'foo@bar.com'
    };
    var rootAdapter = hashAdapter(obj);
    var emailAdapter = rootAdapter.find('email');
    var rule = emailValidator();
    var actualMessage = rule(emailAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });
});