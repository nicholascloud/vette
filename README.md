# Client validation library

### Use

Set up a validation set for a given jQuery scope.

```javascript
var $form = $('form');
var validationSet = validation.createSet($form);
// or, `validation.createSet('form')`
```

Add validators.

```javascript
// selectors are scoped to $form
validationSet.add('[name=email]', validation.required());
validationSet.add('[name=password]', validation.required());
validationSet.add('[name=password]', validation.minLength(8));
```

Set up handlers.

```javascript
validationSet.on('evaluating', function () {
  $form.find('.invalid').removeClass('invalid');
  $form.find('.error-message').hide();
});

validationSet.on('validation-failed', function (selector, violations) {
  var firstViolation = violations[0];
  $form.find(selector)
    .addClass('invalid')
    .siblings('.error-message')
    .text(firstViolation)
    .show();
});
```

On submit, evaluate fields.

```javascript
$form.on('submit', function (e) {
  e.preventDefault();
  var evaluation = validationSet.evaluate();
  evaluation.done(function () {
    // submit $form.serialize()
  });
});
```