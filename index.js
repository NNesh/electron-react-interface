(function () {
  'use strict'

  const { app, BrowserWindow } = require('electron');
  const url = require('url');
  const path = require('path');

  const React = require('react');

  const { InterfaceManager, Component } = require('./module');


  let interfaceManager = new InterfaceManager(__dirname);

  let win;

  function createWindow() {
    win = new BrowserWindow({width: 800, height: 640, show: false});

    win.on('closed', () => {
      win = null;
    });
    win.on('ready-to-show', () => {
      interfaceManager.addComponent('print-component', 'workspace');

      win.show();
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
