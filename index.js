(function () {
  'use strict'

  const { app, BrowserWindow } = require('electron');
  const url = require('url');
  const path = require('path');


  let win;

  function createWindow() {
    win = new BrowserWindow({width: 800, height: 640});

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
      win = null;
    });

    console.log('created window');
  }

  app.on('ready', () => {
    createWindow();
  })

  app.on('window-all-closed', () => {
    app.quit();
  })
}).call(this);
