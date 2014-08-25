# Client validation library

### Prerequisites

- jQuery
- underscore
- moment
- [ventage](https://github.com/a2labs/ventage)

### Installation

With script tags:

```html
<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/underscore/underscore.js"></script>
<!-- creates window.Ventage -->
<script src="bower_components/ventage/ventage.js"></script>
<!-- creates window.Vette -->
<script src="bower_components/vette/vette.js"></script>
```

Or as a require.js AMD module:

```javascript
// main.js
requirejs.config({
  paths: {
    "vette": "bower_components/vette/vette"
  }
});

// your custom module
define(["vette"], function (Vette) { });
```

### Use

Given the following example form...

```html
<form id="create-user">
  <h1>Create User</h1>
  <fieldset>
    <div>
      <label>email</label>
      <input name="email" type="text" />
      <p class="error-message"><!-- hidden --></p>
    </div>
    <div>
      <label>password</label>
      <input name="password" type="password" />
      <input name="verify-password" type="password" />
      <p class="error-message"><!-- hidden --></p>
    </div>
    <div>
      <button>login</button>
    </div>
  </fieldset>
</form>
```

Add validation rules to an instance of Vette.

```javascript
define(['vette'], function (Vette) {

  var ruleset = new Vette();
  ruleset.add('[name=email]', Vette.required());
  ruleset.add('[name=password]', Vette.minLength(10));
  ruleset.add('[name=password]', Vette.same('[name=verify-password']));

  // or

  // ruleset.add('[name=password]',
  //  Vette.minLength(10),
  //  Vette.same('[name=verify-password']));

});
```

Invoke validation when the user performs an action, like submitting a form.

```javascript
var $form = $('form#create-user');

$form.on('submit', function (e) {
  e.preventDefault();
  /*
   * `evaluate()` returns a promise that will be fulfilled if all
   * validation rules pass.
   */
  var evaluation = ruleset.evaluate($form);
  evaluation.done(function () {
    // submit the form via ajax or something
  });
  evaluation.fail(function (allViolations) {
    // show all violations in a big message
  });
});
```

Set up handlers for Vette events.

- `evaluating`: occurs before validation begins
- `evaluated`: occurs after validation finishes
- `validation-failed`: occurs when a specific rule generates a violation

```javascript
ruleset.on('validation-failed', function (selector, violations) {
  /*
   * Occurs when validation fails for a given field (selector).
   * All violations will be in the `violations` array. If you
   * want to display the *first* violation that occured, just
   * grab the first element of the array.
   */
  var firstViolation = violations[0];
  $form.find(selector)
    .addClass('invalid')
    .siblings('.error-message')
    .text(firstViolation)
    .show();
});

ruleset.on('evaluating', function () {
  /*
   * Occurs before fields are validated. Useful
   * for resetting form state, hiding previous error
   * messages, etc.
   */
  $form.find('.invalid').removeClass('invalid');
  $form.find('.error-message').hide();
});

ruleset.on('evaluated', function () {
  /*
   * Validation is complete.
   */
});
```

Profit!

### Available rules

#### Generic rules

- `required`: a field value is required (same as `minLength(1)`)
- `match(regex)`: a field value matches a particular regular expression
- `minLength(length)`: a string value must be a certain length
- `maxLength(length)`: a string value cannot be greater than a certain length
- `any(options)`: a field value may be any of an array of options (but must be one)
- `same(selector)`: a field has the same value as another field(s)
- `different(selector)`: a field has a different value as another field(s)

#### Numeric rules

- `numeric()`: a field value must be numeric
- `range(lower, upper, inclusive)`: a field value must be within a given numeric range (not inclusive by default)
- `gt(number)`: a field value must be greater than a given number
- `lt(number)`: a field value must be less than a given number
- `gteq(number)`: a field value must be greater to, or equal than, a given number
- `lteq(number)`: a field value must be less than, or equal to, a given number

#### Date rules

- `before(selector, inclusive)`: a date value must occur before a date value in another field (not inclusive by default)
- `after(selector, inclusive)`: a date value must occur after a date value in another field (not inclusive by default)

#### Advanced rules

Create a custom "accessor" to fetch the value of a field, provide intelligent defaults, etc.

```javascript
function defaultLevelValue($e) {
  // generate the value for [name=level]
  var value = Number($e.val());
  return isNaN(value) ? 'none' : value;
}

ruleset.add('[name=level]', Vette.accessor(
  defaultLevelValue,
  Vette.any(['none', 10, 15, 20])
));
```

Determine if a rule should even be evaluated by using a precondition. Useful if fields may or may not be present in your form at any given time.

```javascript
function isFieldPresent($e) {
  return $e.length > 0;
}

ruleset.add('[name=password]', Vette.precondition(
  isFieldPresent,
  Vette.minLength(10) //only executes if isFieldPresent() returns true
));
```

Compose several rules that can be reused together.

```javascript
var composed = Vette.compose(
  Vette.numeric(),
  Vette.gteq(10),
  Vette.lt(100)
);
ruleset.add('[name=team1-score]', composed);
ruleset.add('[name=team2-score]', composed);
```

### TODO

1. Configure validation rules declaratively
2. Auto-wire handlers
