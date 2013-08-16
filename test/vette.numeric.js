/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.numeric()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('should return undefined when field value is numeric', function (done) {
      $field.val(123);
      var rule = Vette.numeric();
      var actual = rule($field);
      assert.isUndefined(actual);

      $field.val('123');
      actual = rule($field);
      assert.isUndefined(actual);

      done();
    });

    test('should return message when the field value is not numeric', function (done) {
      $field.val('abc');
      var expected = 'error';
      var rule = Vette.numeric(expected);
      var actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });
  });

});