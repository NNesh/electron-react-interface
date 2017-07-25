(function () {
  'use strict'

  const React = require('react');
  const ReactDOM = require('react-dom');

  const EventEmitter = require('event-emitter');

  const { ipcRenderer } = require('electron');


module.exports =
  class ElementsManager {
    constructor(idin) {
      if (typeof idin !== 'string') throw new Error('ID should has string type');

      this.emitter = new EventEmitter();

      function App() {
        return (
          <div id='workspace'>
          </div>
        );
      }

      ipcRenderer.on('elements-add', (event, arg) => {
        this.onAddedElement(() => {
          event.sender.send('added');
        });

        this.addElement(arg.element, arg.idin);
      });

      ipcRenderer.on('elements-remove', (event, arg) => {
        this.removeElement(arg);
      });

      ReactDOM.render(<App />, document.getElementById(idin));
    }

    addElement(componentName, idin) {
      if ((Element === null) || (typeof idin !== 'string')) return;

      let NewComponent = require(componentName);
      let component = new NewComponent();

      let found = ReactDOM.findDOMNode(document.getElementById(idin));

      if (found === null) return;

      let created = React.createElement(component.getClass);
      let div = document.createElement('div');

      ReactDOM.render(created, div, () => {
        let renderer = ReactDOM.findDOMNode(div);

        if (renderer !== null) {
          renderer.childNodes.forEach((element) => {
            found.appendChild(element);
          });
        }
      });

      this.emitter.emit('did-on-added-element');
      this.emitter.emit('did-on-updated-interface');
    }

    removeElementById(id) {
      let found = ReactDOM.findDOMNode(document.getElementById(id));

      if ((found !== null) && (found.parentNode)) {
        found.parentNode.removeChild(found);
        ReactDOM.unmountComponentAtNode(found);
      }

      this.emitter.emit('did-on-removed-element');
      this.emitter.emit('did-on-updated-interface');
    }

    onUpdatedInterface(callback) {
      this.emitter.on('did-on-updated-interface', callback);
    }

    onAddedElement(callback) {
      this.emitter.on('did-on-added-element', callback);
    }

    onRemovedElement(callback) {
      this.emitter.on('did-on-removed-element', callback);
    }

    onRenderElement(callback) {
      this.emitter.on('did-on-added-element', callback);
    }
  }
}).call(this);
