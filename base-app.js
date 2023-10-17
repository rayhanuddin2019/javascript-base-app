("use strict");
// top-level namespace
var dFanatics = dFanatics || {};
/*
 * Copyright (c) 2023 Rayhan Uddin. All rights reserved.
 * https://github.com/rayhanuddin2019/
 */
// sub-level namespace
dFanatics.Utils = dFanatics.Utils || {};
dFanatics.Models = dFanatics.Models || {};
dFanatics.Views = dFanatics.Views || {};

/*
 * Global two way data binding store and update
 * @usage  dFanatics.scopes['name'] = 'field name';
 * @usage2 data-bind="name" in text field;
 * @usage2 Call from anywhere
 */
dFanatics.scopes = dFanatics.scopes || {};

/* Two Way Data binding */
dFanatics.Utils.DataBind = function () {
  let bind_elements = document.querySelectorAll("[data-bind]");

  bind_elements.forEach(function (element) {
    //execute scope setter
    var propToBind = element.getAttribute("data-bind");
    addScopeProp(propToBind);

    if (element.type === "text" || element.tagName === "TEXTAREA") {
      element.onkeyup = function () {
        dFanatics.scopes[propToBind] = element.value;
      };
    }

    if (element.tagName === "SELECT") {
      element.addEventListener("change", function () {
        dFanatics.scopes[propToBind] = element.value;
      });
    }

    if (element.type === "checkbox") {
      element.addEventListener("change", function () {
        dFanatics.scopes[propToBind] = getAllCheckedelements(propToBind);
      });
    }

    function getAllCheckedelements(name) {
      var checkedBoxes = document.querySelectorAll(
        `input[data-bind="${name}"]:checked`
      );
      var items = [];
      for (var i = 0; i < checkedBoxes.length; i++) {
        items.push(checkedBoxes[i].value);
      }
      return [...new Set(items)];
    }

    function addScopeProp(prop) {
      //add property if needed
      if (!dFanatics.scopes.hasOwnProperty(prop)) {
        //value to populate with newvalue
        var value;
        Object.defineProperty(dFanatics.scopes, prop, {
          set: function (newValue) {
            value = newValue;

            bind_elements.forEach(function (element) {
              if (element.getAttribute("data-bind") === prop) {
                if (
                  element.type &&
                  (element.type === "text" || element.type === "textarea")
                ) {
                  element.value = newValue;
                } else if (element.tagName === "SELECT") {
                  element.value = newValue;
                } else if (!element.type) {
                  element.innerHTML = newValue;
                }
              }
            });
          },
          get: function () {
            return value;
          },
          enumerable: true
        });
      }
    }
  });
};

dFanatics.Utils.Browser = (function (bglobal) {
  // private members
  var is_mobile = false;
  // public members, exposed with return statement
  return {
    is_mobile: DetectAndUpdateDevice
  };
  // Public Method
  function DetectAndUpdateDevice() {
    var x = window.matchMedia("(max-width: 991px)");
    return x.matches;
  }
})(window);

dFanatics.Utils.addEventListener = function(el, eventName, eventHandler, selector) {
  if (selector) {
    const wrappedHandler = (e) => {
      if (!e.target) return;
      const el = e.target.closest(selector);
      if (el) {
        eventHandler.call(el, e);
      }
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  } else {
    const wrappedHandler = (e) => {
      eventHandler.call(el, e);
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  }
}

dFanatics.Utils.On = function(eventName,elementSelector,handler){
  document.addEventListener(eventName, (event) => {
    if (event.target.closest(elementSelector)) {
      handler.call(event.target, event);
    }
  });
}

/**
 * The Filter namespace.
 * @class Filter
 * @static
 */

/*
 * Features
 * We can manage data change event  , Data can be observable
 * We can modularize
 * Subscrib and notify or broadcast globally
 */

dFanatics.getInstance = function (isettings) {
  var instance;
  function Core(settings) {
    /******************************************************************************************
     * Js Library Settings
     * Dom Elements selector
     * Other settings
     **********************************************************************************************/

    const uniqueId = Math.random().toString(36).substring(2, 9);

    this.setSettings = function (settings) {
      this.settings = Object.assign(
        {
          AfterModuleStart: function () { },
          BeforeModuleStart: function () { },
          uniqueId: uniqueId,
          container: null,
          debug: false,
          is_mobile: dFanatics.Utils.Browser.is_mobile()
        },
        settings
      );
    };

    this.setSettings(settings);

    this.version = 1.0;

    /*================================================================================
        * Ovservable Class
        * onChange, notifyEventListener
        ===================================================================================*/
    class Observable {
      constructor() {
        this.observers = [];
        this.eventListener = [];
      }

      subscribe(f) {
        this.observers.push(f);
      }

      unsubscribe(f) {
        this.observers = this.observers.filter(
          (subscriber) => subscriber !== f
        );
      }

      notify(data) {
        this.observers.forEach((observer) => observer(data));
      }

      notifyEventListener(eventName, event) {
        if (!this.eventListener[eventName]) {
          return;
        }
        this.eventListener[eventName].forEach((listener) => listener(event));
      }

      onChange(eventName, listener) {
        if (!this.eventListener[eventName]) {
          this.eventListener[eventName] = [];
        }
        this.eventListener[eventName].push(listener);
      }
    }

    var moduleData = {},
      moduleSettings = {};

    function Sandbox(sandbox) {
      sandbox.init = function () { };

      sandbox.componentsByName = {};

      sandbox.addComponent = function (component) {
        this.componentsByName[component.name] = component;
        component.model = this.proxify(component.model);
      };

      sandbox.showComponent = function (name) {
        if (name === undefined) {
          if (sandbox.settings.debug) {
            console.info(`Please provide component name`);
          }
          return '';
        }

        this.currentComponent = this.componentsByName[name];
        if (this.currentComponent) {
          this.currentComponent.controller(this.currentComponent);
        }
        this.updateView();
      };
      // Can be override from module
      sandbox.updateView = function () {
        if (this.currentComponent.container instanceof Element) {
          if (this.currentComponent) {
            this.currentComponent.container.innerHTML = this.currentComponent.view(
              this.currentComponent.model
            );
          } else {
            this.currentComponent.container.innerHTML = `<h3>Not Found</h3>`;
          }
        } else {
          if (sandbox.settings.debug) {
            console.info(`HTML Element Container not found in ${this.currentComponent.name} component . You can override showcomponet from module register`);
          }
        }
      };

      sandbox.proxify = function (model) {
        const self = this;
        return new Proxy(model, {
          set(target, property, value) {
            target[property] = value;
            self.updateView();
            return true;
          }
        });
      };

      return sandbox;
    }

    this.Observable = new Observable();

    this.register = function (moduleId, creator) {
      moduleData[moduleId] = {
        creator: creator,
        instance: null
      };
    };

    this.start = function (moduleId) {
      moduleData[moduleId].instance = moduleData[moduleId].creator(
        new Sandbox(this),
        moduleSettings
      );

      try {

        if (
          this.settings.hasOwnProperty("BeforeModuleStart") &&
          typeof this.settings.BeforeModuleStart === "function"
        ) {
          this.settings.BeforeModuleStart(
            moduleId,
            moduleData[moduleId].instance
          );
        }

        moduleData[moduleId].instance.init();

        if (
          this.settings.hasOwnProperty("AfterModuleStart") &&
          typeof this.settings.AfterModuleStart === "function"
        ) {
          this.settings.AfterModuleStart(moduleId, moduleData[moduleId].instance);
        }

      } catch (e) { console.log(e); }

    };
    this.stop = function (moduleId) {
      var data = moduleData[moduleId];
      if (data.instance) {
        data.instance.destroy();
        data.instance = null;
      }
    };

    this.startAll = function () {
      for (var moduleId in moduleData) {
        if (moduleData.hasOwnProperty(moduleId)) {
          this.start(moduleId);
        }
      }
    };
    this.stopAll = function () {
      for (var moduleId in moduleData) {
        if (moduleData.hasOwnProperty(moduleId)) {
          this.stop(moduleId);
        }
      }
    };
  }
  /**=======================================
   * Object instance singleton
   **=====================================*/
  if (instance == null) {
    instance = new Core(isettings);
    // Hide the constructor so the returned object can't be new'd...
    instance.constructor = null;
  }

  instance.setSettings(isettings);
  window.addEventListener("DOMContentLoaded", function () {
    dFanatics.Utils.DataBind();
  });

  return instance;
};


