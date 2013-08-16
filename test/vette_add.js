/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('#add()', function () {
    setup(function (done) {
      $doc.empty();
      done();
    });

    test('a rule is added to a Vette instance', function (done) {
      var vette = new Vette();
      var rules = vette._rules = {};
      function fakeRule($e, $root) { }
      vette.add('[name=field]', fakeRule);
      assert.property(rules, '[name=field]');
      assert.include(rules['[name=field]'], fakeRule);
      done();
    });
  });
});