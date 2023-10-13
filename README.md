# javascript-base-app

## Features

1. Observer design pattern - module can communicate each other
2. Pub Sub Pattern - Broadcast something to all modules or specific subscriber module
3. global scopes - to store central data and change programatically
4. MVC - simple mvc that render components
5. Singletone base object
6. Seperate module - You can run single module if need.
7. Callback

## Global Notify

notify all subsribers globally when somethings happen 

![image](https://github.com/rayhanuddin2019/javascript-base-app/assets/47168831/b4703e90-b333-4079-923e-f0988c442978)

    sandbox.Observable.notify(" Notify After Dom Ready");
    
    sandbox.Observable.subscribe(function (data) {
      console.log("subcriber 1", data);
    });

## Event Based Oberserver 

 ![image](https://github.com/rayhanuddin2019/javascript-base-app/assets/47168831/6b229e86-5098-4518-b51a-e74be55744a5)

 ![image](https://github.com/rayhanuddin2019/javascript-base-app/assets/47168831/b8e7a276-188f-43a8-9395-baffc0dd3eca)

  
## Callback 

Module has start end callback function 

![image](https://github.com/rayhanuddin2019/javascript-base-app/assets/47168831/9938e26a-b15b-4852-b36d-7b1cb49528f2)


## Global Scopes

 * Global two way data binding store and update
 * @usage  myApp.scopes['name'] = 'field name';
 * @usage2 data-bind="name" in text field;
 * @usage2 Call from anywhere

![image](https://github.com/rayhanuddin2019/javascript-base-app/assets/47168831/f402ea8c-cf4f-4364-95b0-c88e39c360df)

 ## MVC - component
 Create a comppoent and add to sandbox object 
 add fetch , generate html, manipulate user data
 you can override mvc method from sandbox core .
 
 ![image](https://github.com/rayhanuddin2019/javascript-base-app/assets/47168831/4cba165e-e265-4ef1-830d-5eefa8817306)
 
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
      
     this.addComponent(initial_component); 
     sandbox.showComponent("months");    
 
## Module run

  We can run single module or all module instance 
  
     tCore.startAll();
  
     tCore.start('registered_module_name');
  
Copyright (c) 2023 Rayhan Uddin. All rights reserved.

## Inspired By 

addyosmani - https://addyosmani.com/

Nicholas C. Zakas - https://www.linkedin.com/in/nzakas

https://codepen.io/rayhanuddin2019/pen/ExGrvVe

