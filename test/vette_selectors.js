/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette#selectors()', function () {
    setup(function (done) {
      $doc.empty();
      done();
    });

    test('empty array returned when no rules have been added', function (done) {
      var vette = new Vette();
      var actual = vette.selectors();
      assert.isArray(actual);
      assert.equal(0, actual.length);
      done();
    });

    test('all selectors returned after rules have been added', function (done) {
      var vette = new Vette();

      function fakeRule1($e, $root) {}
      function fakeRule2($e, $root) {}
      vette.add('[name=field1]', fakeRule1);
      vette.add('[name=field1]', fakeRule2);
      vette.add('[name=field2]', fakeRule1);
      vette.add('[name=field3]', fakeRule2);

      var actual = vette.selectors();
      assert.isArray(actual);
      assert.equal(3, actual.length);
      assert.sameMembers(['[name=field1]', '[name=field2]', '[name=field3]'], actual);
      done();
    });
  });
});