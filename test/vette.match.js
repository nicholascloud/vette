/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.match()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    var REGEX = /^[\d]{3}-[\d]{3}-[\d]{4}$/i;

    test('returns undefined if value matches regex', function (done) {
      $field.val('111-222-3333');
      var rule = Vette.match(REGEX);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('returns message if value does not match regex', function (done) {
      $field.val('(111) 222-3333');
      var expected = 'error';
      var rule = Vette.match(REGEX, expected);
      var actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });
  });
});