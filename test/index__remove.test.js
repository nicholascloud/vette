'use strict';
var expect = require('chai').expect;

var Vette = require('../src/index');

describe('Vette#remove()', function () {

  it('should remove a single rule from a Vette instance', function (done) {
    var vette = new Vette();

    function fakeRule1() { }
    function fakeRule2() { }

    vette.add('foo', fakeRule1);
    vette.add('foo', fakeRule2);
    expect(vette.rules).to.have.property('foo');
    expect(vette.rules.foo).to.have.members([fakeRule1, fakeRule2]);

    vette.remove('foo', fakeRule2);
    expect(vette.rules).to.have.property('foo');
    expect(vette.rules.foo).to.have.members([fakeRule1]);
    expect(vette.rules.foo).to.not.include.members([fakeRule2]);

    done();
  });

  it('should remove multiple rules from a Vette instance', function (done) {
    var vette = new Vette();

    function fakeRule1() { }
    function fakeRule2() { }
    function fakeRule3() { }

    vette.add('foo', fakeRule1);
    vette.add('foo', fakeRule2);
    vette.add('foo', fakeRule3);
    expect(vette.rules).to.have.property('foo');
    expect(vette.rules.foo).to.have.members([fakeRule1, fakeRule2, fakeRule3]);

    vette.remove('foo', fakeRule1, fakeRule2);
    expect(vette.rules).to.have.property('foo');
    expect(vette.rules.foo).to.include.members([fakeRule3]);

    done();
  });

  it('should remove a selector from a Vette instance when all of it\'s rules are removed', function (done) {
    var vette = new Vette();

    function fakeRule1() { }
    function fakeRule2() { }

    vette.add('foo', fakeRule1);
    vette.add('foo', fakeRule2);
    expect(vette.rules).to.have.property('foo');
    expect(vette.rules.foo).to.have.members([fakeRule1, fakeRule2]);

    vette.remove('foo', fakeRule1, fakeRule2);
    expect(vette.rules).to.not.have.property('foo');

    done();
  });

  it('should remove all rules for a selector from a Vette instance', function (done) {
    var vette = new Vette();

    function fakeRule1() { }
    function fakeRule2() { }

    vette.add('foo', fakeRule1);
    vette.add('foo', fakeRule2);
    expect(vette.rules).to.have.property('foo');
    expect(vette.rules.foo).to.include.members([fakeRule1]);
    expect(vette.rules.foo).to.include.members([fakeRule2]);

    vette.remove('foo');
    expect(vette.rules).to.not.have.property('foo');

    done();
  });
});