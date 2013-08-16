/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.required()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('should return undefined if field has a value', function (done) {
      $field.val(123);
      var rule = Vette.required();
      var actual = rule($field);
      assert.isUndefined(actual);

      $field.val('abc');
      actual = rule($field);
      assert.isUndefined(actual);

      done();
    });

    test('should return message if field has no value', function (done) {
      var expected = 'error';
      var rule = Vette.required(expected);

      var actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);

      $field.val('');
      actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);

      $field.val(' ');
      actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);

      done();
    });

  });
});