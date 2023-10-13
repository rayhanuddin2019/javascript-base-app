("use strict");
// top-level namespace
var myApp = myApp || {};
/*
 * Copyright (c) 2023 Rayhan Uddin. All rights reserved.
 * https://github.com/rayhanuddin2019/
 */
// sub-level namespace
myApp.Utils = myApp.Utils || {};
myApp.Models = myApp.Models || {};
myApp.Views = myApp.Views || {};

/*
 * Global two way data binding store and update
 * @usage  myApp.scopes['name'] = 'field name';
 * @usage2 data-bind="name" in text field;
 * @usage2 Call from anywhere
 */
myApp.scopes = myApp.scopes || {};

/* Two Way Data binding */
myApp.Utils.DataBind = function () {
  let bind_elements = document.querySelectorAll("[data-bind]");

  bind_elements.forEach(function (element) {
    //execute scope setter
    var propToBind = element.getAttribute("data-bind");
    addScopeProp(propToBind);

    if (element.type === "text" || element.tagName === "TEXTAREA") {
      element.onkeyup = function () {
        myApp.scopes[propToBind] = element.value;
      };
    }

    if (element.tagName === "SELECT") {
      element.addEventListener("change", function () {
        myApp.scopes[propToBind] = element.value;
      });
    }

    if (element.type === "checkbox") {
      element.addEventListener("change", function () {
        myApp.scopes[propToBind] = getAllCheckedelements(propToBind);
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
      if (!myApp.scopes.hasOwnProperty(prop)) {
        //value to populate with newvalue
        var value;

        Object.defineProperty(myApp.scopes, prop, {
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

myApp.Utils.Browser = (function (bglobal) {
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

/**
 * The Media namespace.
 * @class Media
 * @static
 */

/*
 * Features
 * We can manage data change event  , Data can be observable
 * We can modularize
 * Subscrib and notify or broadcast globally
 */

myApp.getInstance = function (isettings) {
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
          AfterModuleStart: function () {},
          BeforeModuleStart: function () {},
          uniqueId: uniqueId,
          container: null,
          is_mobile: myApp.Utils.Browser.is_mobile()
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
      sandbox.init = function () {};

      sandbox.componentsByName = {};

      sandbox.addComponent = function (component) {
        this.componentsByName[component.name] = component;
        component.model = this.proxify(component.model);
      };

      sandbox.showComponent = function (name) {
        this.currentComponent = this.componentsByName[name];

        if (this.currentComponent) {
          this.currentComponent.controller(this.currentComponent.model);
        }

        this.updateView();
      };
      // Can be override from module
      sandbox.updateView = function () {
        if (this.currentComponent) {
          this.currentComponent.container.innerHTML = this.currentComponent.view(
            this.currentComponent.model
          );
        } else {
          this.currentComponent.container.innerHTML = `<h3>Not Found</h3>`;
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
  /**
   * Object instance singleton
   **/
  if (instance == null) {
    instance = new Core(isettings);
    // Hide the constructor so the returned object can't be new'd...
    instance.constructor = null;
  }
  instance.setSettings(isettings);
  window.addEventListener("DOMContentLoaded", function () {
    myApp.Utils.DataBind();
  });
  return instance;
};

//Usage

var tCore = myApp.getInstance({
  AfterModuleStart: function (thisModule, obj) {},
  BeforeModuleStart: function (module, obj) {}
});
/**
 *
 * Register Core module
 **/
tCore.register("core_calender", function (sandbox, moduleSettings) {
  var initial_component = {
    name: "months",    
    container: document.querySelector(".mycalender"),
    model: {
      months: []        
    },
    view(model) {
      const monthHTML = model.months.reduce(
        (html, month) => html + `<li>${month}</li>`,
        ""
      );
      return `<ul class="myapp-cl-m-lst">${monthHTML}</ul>
            `;
    },

    async controller(model) {
      // data canbe update from rest api / ajax
      model.months = ["january","fabruary", "march", "april"];        
    }
  };
  sandbox.init = function () {
    this.addComponent(initial_component);
    this.router();
  };

  sandbox.router = function () {
    window.addEventListener("DOMContentLoaded", function () {
      sandbox.showComponent("months");
      myApp.scopes["div"] = "init value";

      sandbox.Observable.notify(" Notify After Dom Ready");
    });

    sandbox.Observable.subscribe(function (data) {
      console.log("subcriber 1", data);
    });

    sandbox.Observable.subscribe(function (data) {
      console.log("subcriber 2" + data);
    });
  };
  return sandbox;
});

tCore.startAll();

document.querySelector(".wrapper").addEventListener("click", function () {
  if (this.classList.contains("flip")) {
    this.classList = "wrapper";
  } else {
    this.classList = "wrapper flip";
  }
});
document.querySelectorAll(".item").forEach((item, index) => {
  item.addEventListener("click", function (event) {
    myApp.scopes["bike"] = ["Bike"];
    myApp.scopes["radio"] = ["Car"];
    myApp.scopes["select"] = "audi";

    //              this.changeTitle(this._list, index)

    //       let changeInfo = {
    //         detail: {
    //           value: this._value,
    //           name: this._name
    //         },
    //         bubbles: true
    //       }
    //       let changeEvent = new CustomEvent('change', changeInfo)
    //       this.dispatchEvent(changeEvent)
  });
});
