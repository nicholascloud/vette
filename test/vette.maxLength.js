/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.maxLength()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('returns undefined if value is less than max length', function (done) {
      var text = 'maxlength';
      $field.val(text);
      var rule = Vette.maxLength(text.length + 1);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('returns undefined if value is equal to max length', function (done) {
      var text = 'maxlength';
      $field.val(text);
      var rule = Vette.maxLength(text.length);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('returns message if value is greater than max length', function (done) {
      var text = 'maxlength';
      $field.val(text);
      var expected = 'error';
      var rule = Vette.maxLength(text.length - 1, expected);
      var actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });
  });
});