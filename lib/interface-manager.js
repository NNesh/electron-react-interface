(function () {
  'use strict'

  const path = require('path');

  const { BrowserWindow, ipcMain } = require('electron');
  const Component = require('./component');

  const React = require('react');
  const ReactDOM = require('react-dom');


module.exports =
  class InterfaceManager {
    constructor(pathComponents) {
      this.pathComponents = pathComponents;
    }

    addComponent(componentName, idin) {
      if (typeof idin !== 'string') return;

      BrowserWindow.getAllWindows().forEach((win) => {
        let arg = {
          element: path.join(this.pathComponents, componentName),
          idin: idin
        };

        win.webContents.send('elements-add', arg);
      });
    }

    removeComponent(id) {
      if (typeof id !== 'string') return;

      BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send('elements-remove', id);
      });
    }
  }
}).call(this);
