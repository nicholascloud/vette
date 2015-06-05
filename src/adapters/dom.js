'use strict';

function domAdapter (el) {
  return {
    find: function (selector) {
      return domAdapter(el.querySelector(selector));
    },
    value: function () {
      return el.value;
    }
  }
}

module.exports = domAdapter;