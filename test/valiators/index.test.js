'use strict';
var expect = require('chai').expect;

var index = require('../../src/validators/index');

describe('index', function () {

  describe('numeric validators', function () {
    it('should have numeric validator', function (done) {
      expect(index.numeric).to.be.a.function;
      done();
    });

    it('should have range validator', function (done) {
      expect(index.range).to.be.a.function;
      done();
    });

    it('should have gt validator', function (done) {
      expect(index.gt).to.be.a.function;
      done();
    });

    it('should have gteq validator', function (done) {
      expect(index.gteq).to.be.a.function;
      done();
    });

    it('should have lt validator', function (done) {
      expect(index.lt).to.be.a.function;
      done();
    });

    it('should have lteq validator', function (done) {
      expect(index.lteq).to.be.a.function;
      done();
    });

    it('should have numeric validator', function (done) {
      expect(index.numeric).to.be.a.function;
      done();
    });
  });

  describe('boolean validators', function () {
    it('should have bool validator', function (done) {
      expect(index.bool).to.be.a.function;
      done();
    });
  });

  describe('date validators', function () {
    it('should have before validator', function (done) {
      expect(index.before).to.be.a.function;
      done();
    });

    it('should have after validator', function (done) {
      expect(index.after).to.be.a.function;
      done();
    });
  });

  describe('email validators', function (done) {
    it('should have email validator', function (done) {
      expect(index.email).to.be.a.function;
      done();
    });
  });

  describe('generic validators', function () {
    it('should have required validator', function (done) {
      expect(index.required).to.be.a.function;
      done();
    });

    it('should have match validator', function (done) {
      expect(index.match).to.be.a.function;
      done();
    });

    it('should have minLength validator', function (done) {
      expect(index.minLength).to.be.a.function;
      done();
    });

    it('should have maxLength validator', function (done) {
      expect(index.maxLength).to.be.a.function;
      done();
    });

    it('should have any validator', function (done) {
      expect(index.any).to.be.a.function;
      done();
    });

    it('should have same validator', function (done) {
      expect(index.same).to.be.a.function;
      done();
    });

    it('should have different validator', function (done) {
      expect(index.different).to.be.a.function;
      done();
    });
  });

  describe('advanced validators', function () {
    it('should have accessor validator', function (done) {
      expect(index.accessor).to.be.a.function;
      done();
    });

    it('should have compose validator', function (done) {
      expect(index.compose).to.be.a.function;
      done();
    });

    it('should have precondition validator', function (done) {
      expect(index.precondition).to.be.a.function;
      done();
    });
  });

});