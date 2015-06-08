'use strict';
var expect = require('chai').expect;

var Vette = require('../src/index');

describe('index#selectors()', function () {

  it('returns an empty array when no rules have been added', function (done) {
    var vette = new Vette();
    var actual = vette.selectors();
    expect(actual).to.be.an.array;
    expect(actual).to.be.empty;
    done();
  });

  it('returns all selectors after rules have been added', function (done) {
    var vette = new Vette();

    function fakeRule1() {}
    function fakeRule2() {}
    vette.add('foo', fakeRule1);
    vette.add('bar', fakeRule2);
    vette.add('baz', fakeRule1);
    vette.add('foo', fakeRule2);

    var actual = vette.selectors();
    expect(actual).to.be.an.array;
    expect(actual).to.have.length(3);
    expect(actual).to.have.members(['foo', 'bar', 'baz']);
    done();
  });
});