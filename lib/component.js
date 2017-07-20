(function () {
  'use strict'

  class Component {
    constructor() {
      if (Component.id === undefined) {
        Component.id = 0;
      }
      else {
        Component.id += Component.id + 1;
      }
    }

    // Overriding method
    getClass() {}
  }
}).call(this);
