/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('.same()', function () {
    var $field1, $field2;
    setup(function (done) {
      $doc.empty();
      $field1 = $('<input />');
      $field1.attr('name', 'field1');

      $field2 = $field1.clone();
      $field2.attr('name', 'field2');

      $doc.append($field1);
      $doc.append($field2);
      done();
    });

    test('should return undefined if value is the same as another field', function (done) {
      $field1.val('dog');
      $field2.val('dog');
      var rule = Vette.same('[name=field2]');
      var actual = rule($field1, $doc);
      assert.isUndefined(actual);
      done();
    });

    test('should return undefined if value is the same as multiple fields', function (done) {
      while($doc.find('input').length <= 10) {
        $doc.append('<input />');
      }
      $doc.find('input').addClass('field').val('dog');
      var rule = Vette.same('.field');
      var actual = rule($field1, $doc);
      assert.isUndefined(actual);
      done();
    });

    test('should return message if value is different than another field', function (done) {
      $field1.val('dog');
      $field2.val('cat');
      var expected = 'error';
      var rule = Vette.same('[name=field2]', expected);
      var actual = rule($field1, $doc);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });

    test('should return message if value is different than any of multiple fields', function (done) {
      while($doc.find('input').length <= 10) {
        $doc.append('<input />');
      }
      $doc.find('input').each(function (i, e) {
        $(e).addClass('field').val(i);
      });
      var expected = 'error';
      var rule = Vette.same('.field', expected);
      var actual = rule($field1, $doc);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });

  });
});