'use strict';

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

module.exports = hashAdapter;