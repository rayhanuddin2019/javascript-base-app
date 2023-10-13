var tCore = dFanatics.getInstance({
    debug: true,
    AfterModuleStart: function (thisModule, obj) {},
    BeforeModuleStart: function (module, obj) {}
  });

  /**
   *
   * Register Core module
   **/
  tCore.register("core_calender", function (sandbox, moduleSettings) {
   
    sandbox.init = function () {
        window.addEventListener("DOMContentLoaded", function () {
            var initial_component = {
                name: "months",    
                container: document.querySelector(".mycalender"),
                model: {
                  months: []        
                },
                view(model) {
                  const monthHTML = model.months.reduce(
                    (html, month) => html + `<button class="p-1 px-4 m-0.5 hover:text-blue-800 hover:border-blue-500 text-sm font-bold border-2 text-gray-600 border-gray-300 bg-white rounded-lg"><span class="w-full flex align-middle">${month}</span></button>`,
                    ""
                  );
                  return `<div class="js">${monthHTML}</div>`;
                },
          
                async controller(model) {
                  // data canbe update from rest api / ajax
                  model.months = ["january","fabruary", "march", "april"];        
                }
              };
            sandbox.addComponent(initial_component);
            sandbox.router();
        });
    };

    sandbox.router = function () {
      
         sandbox.showComponent("months");        
      
    };
    return sandbox;
  });

  tCore.startAll();