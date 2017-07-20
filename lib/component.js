(function () {
  'use strict'


module.exports =
  class Component {
    constructor() {
      if (Component.id === undefined) {
        Component.id = 0;
      }
      else {
        Component.id += Component.id + 1;
      }

      this.id = Component.id;
    }

    // Overriding method
    getClass() {}
  }
}).call(this);
