'use strict';
var expect = require('chai').expect;

var Vette = require('../src/index');

describe('index#add()', function () {

  it('should add a rule to a Vette instance', function (done) {
    var vette = new Vette();
    var rules = vette.rules;
    function fakeRule() { }
    vette.add('foo', fakeRule);
    expect(rules).to.have.property('foo');
    expect(rules.foo).to.have.members([fakeRule]);
    done();
  });
});