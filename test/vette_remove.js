/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('#remove()', function () {
    setup(function (done) {
      $doc.empty();
      done();
    });

    test('a single rule is removed from a Vette instance', function (done) {
      var vette = new Vette();
      var rules = vette._rules = {};

      function fakeRule1($e, $root) { }
      function fakeRule2($e, $root) { }

      vette.add('[name=field]', fakeRule1);
      vette.add('[name=field]', fakeRule2);
      assert.property(rules, '[name=field]');
      assert.include(rules['[name=field]'], fakeRule1);
      assert.include(rules['[name=field]'], fakeRule2);

      vette.remove('[name=field]', fakeRule2);
      assert.property(rules, '[name=field]');
      assert.include(rules['[name=field]'], fakeRule1);
      assert.notInclude(rules['[name=field]'], fakeRule2);

      done();
    });

    test('multiple rules are removed from a Vette instance', function (done) {
      var vette = new Vette();
      var rules = vette._rules = {};

      function fakeRule1($e, $root) { }
      function fakeRule2($e, $root) { }

      vette.add('[name=field]', fakeRule1);
      vette.add('[name=field]', fakeRule2);
      assert.property(rules, '[name=field]');
      assert.include(rules['[name=field]'], fakeRule1);
      assert.include(rules['[name=field]'], fakeRule2);

      vette.remove('[name=field]', fakeRule1, fakeRule2);
      assert.property(rules, '[name=field]');
      assert.notInclude(rules['[name=field]'], fakeRule1);
      assert.notInclude(rules['[name=field]'], fakeRule2);

      done();
    });

    test('all rules are removed for a selector from a vette instance', function (done) {
      var vette = new Vette();
      var rules = vette._rules = {};

      function fakeRule1($e, $root) { }
      function fakeRule2($e, $root) { }

      vette.add('[name=field]', fakeRule1);
      vette.add('[name=field]', fakeRule2);
      assert.property(rules, '[name=field]');
      assert.include(rules['[name=field]'], fakeRule1);
      assert.include(rules['[name=field]'], fakeRule2);

      vette.remove('[name=field]');
      assert.notProperty(rules, '[name=field]');

      done();
    });
  });
});