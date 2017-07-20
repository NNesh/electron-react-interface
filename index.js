(function () {
  'use strict'

  const { app, BrowserWindow } = require('electron');
  const url = require('url');
  const path = require('path');

  const Component = require('./lib/component');


  let win;

  function createWindow() {
    win = new BrowserWindow({width: 800, height: 640});

    win.on('closed', () => {
      win = null;
    });
    win.on('focus', () => {
      let component1 = new Component();
      let component2 = new Component();
      console.log('Component 1: %s', component1.id);
      console.log('Component 2: %s', component2.id);
    });

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

    win.webContents.openDevTools();
  }

  app.on('ready', () => {
    createWindow();
  })

  app.on('window-all-closed', () => {
    app.quit();
  })
}).call(this);
