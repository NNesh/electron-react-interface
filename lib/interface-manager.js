(function () {
  'use strict'

  const { BrowserWindow, ipcMain } = require('electron');
  const Component = require('./component');


module.exports =
  class InterfaceManager {
    constructor() {}

    addComponent(component, props, idin) {
      if (!component instanceof Component) return;
      if (typeof idin !== 'string') return;

      BrowserWindow.getAllWindows().forEach((win) => {
        let arg = {
            element: reactClass,
            props: props,
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
