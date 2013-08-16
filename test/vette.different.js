/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.different()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      $field.attr('name', 'field1');
      $doc.append($field);
      done();
    });

    test('should return undefined if value is different than another field', function (done) {
      $field.val('dog');
      $doc.append('<input name="field2" value="cat" />');
      var rule = Vette.different('[name=field2]');
      var actual = rule($field, $doc);
      assert.isUndefined(actual);
      done();
    });

    test('should return undefined if value is different than multiple fields', function (done) {
      var value = 0;
      while($doc.find('input').length <= 10) {
        $doc.append('<input class="field" value="' + (value += 1) + '" />');
      }
      $field.val(value += 1);
      var rule = Vette.different('.field');
      var actual = rule($field, $doc);
      assert.isUndefined(actual);
      done();
    });

    test('should return message if value is same as another field', function (done) {
      $field.val('dog');
      $doc.append('<input name="field2" value="dog" />');
      var expected = 'error';
      var rule = Vette.different('[name=field2]', expected);
      var actual = rule($field, $doc);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });

    test('should return message if value is same as any of multiple fields', function (done) {
      var value = 0;
      while($doc.find('input').length <= 10) {
        $doc.append('<input class="field" value="' + (value += 1) + '" />');
      }
      $field.val($doc.find('.field').first().val());
      var expected = 'error';
      var rule = Vette.different('.field', expected);
      var actual = rule($field, $doc);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });

  });
});