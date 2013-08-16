/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('.minLength()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('returns undefined if value is greater than min length', function (done) {
      var text = 'minlength';
      $field.val(text);
      var rule = Vette.minLength(text.length - 1);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('returns undefined if value is equal to min length', function (done) {
      var text = 'minlength';
      $field.val(text);
      var rule = Vette.minLength(text.length);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('returns message if value is less than min length', function (done) {
      var text = 'minlength';
      $field.val(text);
      var expected = 'error';
      var rule = Vette.minLength(text.length + 1, expected);
      var actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });
  });
});