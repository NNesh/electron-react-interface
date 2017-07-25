(function () {
  'use strict'

  const React = require('react');

  const { Component } = require('./module');


module.exports =
  class PrintComponent extends Component {
    constructor() {
      super();
    }

    getClass() {
      return (
        <h1>Prop</h1>
      );
    }
  }
}).call(this);
