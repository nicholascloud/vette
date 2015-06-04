'use strict';

function jqueryAdapter ($el) {
  return {
    find: function (selector) {
      return jqueryAdapter($el.find(selector));
    },
    value: function () {
      return $el.val();
    }
  }
}

module.exports = jqueryAdapter;