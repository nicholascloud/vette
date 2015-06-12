# Vette 2.x

*NOTE* Version 1.x was built with RequireJS. This is no longer the case. Vette 2.x+ will only support CommonJS loaders like Browserify.

### Prerequisites

- Node.js + npm

### Installation

1. Run `npm install` in the project root to fetch dependencies.
2. Reference the Vette module in your own scripts.
3. Compile with a CommonJS module loader like Browserify. All dependencies should be included. 

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

  var ruleset = new Vette('jquery');
  ruleset.add('[name=email]', Vette.required());
  ruleset.add('[name=password]', Vette.minLength(10));
  ruleset.add('[name=password]', Vette.same('[name=verify-password']));

  // or

  // ruleset.add('[name=password]',
  //   Vette.minLength(10),
  //   Vette.same('[name=verify-password']));

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
   * want to display the *first* violation that occurred, just
   * grab the first element of the array. Note that all violations
   * are instances of Error or a subtype of Error.
   */
  var firstViolation = violations[0];
  $form.find(selector)
    .addClass('invalid')
    .siblings('.error-message')
    .text(firstViolation.message)
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

### Available validator rules

#### Generic rules

- `required`: a value is required (same as `minLength(1)`)
- `match(regex)`: a value matches a particular regular expression
- `minLength(length)`: a string value must be a certain length
- `maxLength(length)`: a string value cannot be greater than a certain length
- `any(options)`: a value may be any value in an array of options (but must be one)
- `same(selector)`: a value has the same value as another
- `different(selector)`: a value is different than another

#### Numeric rules

- `numeric()`: a value must be numeric
- `range(lower, upper, inclusive)`: a value must be within a given numeric range (not inclusive by default)
- `gt(number)`: a value must be greater than a given number
- `lt(number)`: a value must be less than a given number
- `gteq(number)`: a value must be greater to, or equal than, a given number
- `lteq(number)`: a value must be less than, or equal to, a given number

#### Collection rules

- `nodupe()`: no duplicate values may be present in an array value

#### Date rules

- `before(selector, inclusive)`: a date value must occur before another date value (not inclusive by default)
- `after(selector, inclusive)`: a date value must occur after another date value (not inclusive by default)

#### Advanced rules

Create a custom "accessor" to fetch values, provide intelligent defaults, etc.

```javascript
function defaultLevelValue($e) {
  // generate the value for [name=level]
  var value = $e.val();
  return !value ? 'none' : value;
}

ruleset.add('[name=level]', Vette.accessor(
  defaultLevelValue,
  Vette.any(['none', 'novice', 'journeyman', 'master'])
));
```

Determine if a rule should even be evaluated by using a precondition.

```javascript
function isNotEmpty(value) {
  return !!value;
}

ruleset.add('[name=middleName]', Vette.precondition(
  isNotEmpty,
  Vette.minLength(2) //only executes if isNotEmpty() returns true
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

### A word about adapters

Vette was originally coupled tightly to jQuery, but as it is useful in other contexts (besides just validating HTML form fields) it became obvious that the code would need to change a bit. When a Vette instance is created, an optional adapter name may be passed to the constructor.

```javascript
var ruleset = new Vette('jquery');
```

Adapters wrap object passed to `vette.evaluate()` and are used to find other nested objects or values within the evaluated object.

Consider an HTML `<form>` element. It may have many `<input>` elements as children, and each of these `<input>` elements has some value. So an adapter wraps the `<form>` element, can find other child elements by selector, and retrieve the values from those child elements.

Or consider a plain JavaScript object. It has named properties which themselves may be objects. An adapter can navigate the object tree, find properties, and return their values.

The `hashAdapter` shows the simple interface all adapters must possess. It encapsulates a single object and may look up properties on that object, or return values from those properties.

```javascript
function hashAdapter (object) {
  return {
    find: function (property) {
      return hashAdapter(object[property]);
    },
    value: function () {
      return object;
    }
  }
}
```

Internally, Vette uses the hash adapter to navigate the properties of an object.

```javascript
var foo = {
  bar: {
    baz: 'ding ding ding!'
  }
};

// Vette internals
var rootAdapter = hashAdapter(foo);
var barAdapter = hashAdapter.find('bar'); // {baz: 'ding ding ding!'}
var bazAdapter = barAdapter.find('baz'); // 'ding ding ding!'
var oopsAdapter = bazAdapter.find('doesNotExist'); // undefined
```

#### Pre-defined adapters

There are three pre-defined adapters in Vette.

1. `hash` - fetches properties and values from an object literal (default adapter)
2. `dom` - fetches elements and values in an HTML page using `Element.querySelector()` and `Element.value` syntax
3. `jquery` - fetches elements and values in an HTML page using `$Element.find()` and `$Element.val()` syntax. 

When a Vette instance is create it defaults to using the `hash` adapter. If another adapter name is passed to the constructor function, the instance will use that adapter instead. Objects passed to `vette.evaluate()` will be wrapped with the configured adapter.

#### Custom adapters

A custom adapter:

1. is a function that accepts a single argument--the object passed to `vette.evaluate()`--and returns
2. an object with two methods:
    1. `find(identifier)` - returns some value wrapped in the same kind of adapter, and
    2. `value()` - returns the actual value passed to the adapter function

(The `src/adapters/*.js` files are good reference implementations.)

To add a custom adapter to Vette, assign it as a property to Vette's adapters hash before creating a Vette instance:

```javascript
Vette.adapters.myAdapter = function (myObject) {
  // ...
};

var myObject = {/*...*/};
var ruleset = new Vette('myAdapter');
ruleset.add(/*...*/);
ruleset.evaluate(myObject);
```

## TODO:

- demos
- enhance `hashAdapter` with [l33teral](https://github.com/nicholascloud/l33teral)
