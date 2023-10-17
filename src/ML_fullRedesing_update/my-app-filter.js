var tCore = dFanatics.getInstance({
    debug            : true,
    AfterModuleStart : function (thisModule, obj) {},
    BeforeModuleStart: function (module, obj) {}
  });

  /**
   *
   * Register Core module
   **/
  tCore.register("blog:filter", function (sandbox, moduleSettings) {
      sandbox.init = function () {
        window.addEventListener("DOMContentLoaded", function () {
            var post_component = {
                name     : "blog_filter",
                container: document.querySelector(".ml-filter-content-area"),
                dom      : {
                  loadmore: document.querySelector('.ml-blog-view-more'),
                  reset   : document.querySelector('.reset_all_location_filter'),
                  popup_box : document.querySelector('.location_detail_filter_box')                  
                },
                request_options: {
                  action  : 'blog_filter_action',
                  page    : 1,
                  has_more: true
                },
                // observable
                model: {
                  blog_content  : [],
                  filter_options: {}
                },
                view(model) {
                  const blogHTML = model.blog_content.reduce(
                    (html, post) => html + `<div class="blog_style_wrap">
                    <div class = "blog_style_img position-relative w-100">
                    <a href  = "#"><img class = "w-100 blog_main_img" decoding = "async" src = "https://marbslifestyle.com/wp-content/uploads/2023/05/Nosso-summer-Club-lux-lounge-area-600x400.jpeg" alt = "Finding the Perfect Balance: Luxury Family-Friendly Hotels in Marbella"></a>
                    </div>                
                    <div  class = "blog_style_info_bx">
                    <div  class = "blog_style_info">
                    <div  class = "blog_catg_name">
                    <span class = "mlf font-s12">Accommodations</span>
                            </div>
    
                            <div   class = "blog_catg_title_info typescale-style">
                            <h6><a class = "sf make-3line" href = "#">${post.title}</a></h6>
                            <p     class = "mlf make-2line only_desktop_view">${post.body}</p>
                            </div>
                        </div>
    
                        <div  class = "blog_bottm_style position-relative position-content-after d-flex align-center justify-content-between">
                        <a    href  = "#" class = "read_more_btn mlf position-relative position-content-after ion-ios-arrow-forward position-content-before">Read more</a>
                        <span class = "blog_date mlf font-s12">15 Sep 2023</span>
                        </div>
                    </div>
                </div>`,
                    ""
                  );
                  return `${blogHTML}`;
                },          
                async controller(component) {                
                  // data canbe update from rest api / ajax
                  var url = 'https://jsonplaceholder.typicode.com/posts';
                      url = url + "?" + new URLSearchParams(Object.assign(component.request_options,component.model.filter_options)).toString();
                
                  await fetch(url, {
                    method     : "GET",    // *GET, POST, PUT, DELETE, etc.  
                    mode       : "cors",
                    credentials: "omit",   // include, *same-origin, omit
                    headers    : {
                      "Content-Type": "application/json",
                       //'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect      : "follow",        // manual, *follow, error
                    referrerPolicy: "no-referrer",   // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    //body: Object.assign(model.request_options,model.filter_options), // body data type must match "Content-Type" header
                  }).then(function(res){
                    return res.json();
                  }).then(function(data){
                    component.model.blog_content = data;
                   // if(!data.hasnext){
                      component.request_options.has_more = false;  // check query next  
                    //}                                    
                                                                                
                  });                  
               
                }
              };
            // search by name
            var title_component = {
              name     : "search_by_name",
              container: document.querySelector(".ml-filter-content-area"),
              dom      : {
                              
              },
              request_options: {
                action  : 'blog_autocomplete_action',                            
              },
              // observable
              model: {
                blog_content  : [],
                filter_options: {}
              },
              view(model) {
                const titleHTML = model.blog_content.reduce(
                  (html, post) => html + `<div class="blog_style_wrap">
                  <div class = "blog_style_img position-relative w-100">
                  <a   href  = "#"><img class = "w-100 blog_main_img" decoding = "async" src = "https://marbslifestyle.com/wp-content/uploads/2023/05/Nosso-summer-Club-lux-lounge-area-600x400.jpeg" alt = "Finding the Perfect Balance: Luxury Family-Friendly Hotels in Marbella"></a>
                  </div>                
                  <div  class = "blog_style_info_bx">
                  <div  class = "blog_style_info">
                  <div  class = "blog_catg_name">
                  <span class = "mlf font-s12">Accommodations</span>
                          </div>
  
                          <div   class = "blog_catg_title_info typescale-style">
                          <h6><a class = "sf make-3line" href = "#">${post.title}</a></h6>
                          <p     class = "mlf make-2line only_desktop_view">${post.body}</p>
                          </div>
                      </div>
  
                      <div  class = "blog_bottm_style position-relative position-content-after d-flex align-center justify-content-between">
                      <a    href  = "#" class = "read_more_btn mlf position-relative position-content-after ion-ios-arrow-forward position-content-before">Read more</a>
                      <span class = "blog_date mlf font-s12">15 Sep 2023</span>
                      </div>
                  </div>
              </div>`,
                  ""
                );
                return `${titleHTML}`;
              },          
              async controller(component) {                
                // data canbe update from rest api / ajax
                var url = 'https://jsonplaceholder.typicode.com/posts';
                    url = url + "?" + new URLSearchParams(Object.assign(component.request_options,component.model.filter_options)).toString();
              
                await fetch(url, {
                  method     : "GET",    // *GET, POST, PUT, DELETE, etc.  
                  mode       : "cors",
                  credentials: "omit",   // include, *same-origin, omit
                  headers    : {
                    "Content-Type": "application/json",
                     //'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  redirect      : "follow",        // manual, *follow, error
                  referrerPolicy: "no-referrer",   // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                  //body: Object.assign(model.request_options,model.filter_options), // body data type must match "Content-Type" header
                }).then(function(res){
                  return res.json();
                }).then(function(data){
                  component.model.blog_content = data;  
                });                  
             
              }
            };  
            sandbox.addComponent(post_component);
            sandbox.addComponent(title_component);
            sandbox.router();
        });
    };

    sandbox.router = function () {      
         sandbox.showComponent('blog_filter');
         // filter change   
         document.querySelectorAll('.filter_checkbox_area').forEach((option) => { 
          option.addEventListener("Onselect:change", (event) => { 
            const selected_values = [];
            event.detail.values.forEach(function(item){
              selected_values.push(item.value);
            });
            sandbox.componentsByName['blog_filter'].request_options['page']                 = 1;
            sandbox.componentsByName['blog_filter'].model.filter_options[event.detail.name] = selected_values;
            sandbox.showComponent('blog_filter');      
          });
        });
        // loadmore
        sandbox.componentsByName['blog_filter'].dom.loadmore.addEventListener('click', function(e){
          e.preventDefault();         
          sandbox.componentsByName['blog_filter'].request_options['page'] = sandbox.componentsByName['blog_filter'].request_options['page'] + 1;
          sandbox.showComponent('blog_filter'); 
        })
        // reset
        sandbox.componentsByName['blog_filter'].dom.reset.addEventListener('click', function(e){
          e.preventDefault();          
          sandbox.componentsByName['blog_filter'].model.filter_options    = {};
          sandbox.componentsByName['blog_filter'].request_options['page'] = 1;
          sandbox.showComponent('blog_filter');
        });
        // mobile     
        dFanatics.Utils.On('click','.all-filter-btn', sandbox.mobileOpenCloseCallback.bind({open: 1})); 
        dFanatics.Utils.On('click','.search-close-btn,.filter-search-btn', sandbox.mobileOpenCloseCallback.bind({open: 0}));          
      };

    sandbox.mobileOpenCloseCallback = function(e){
      e.preventDefault();    
      if(this.open){
        sandbox.componentsByName['blog_filter'].dom.popup_box.classList.add('active');
      }else{
        sandbox.componentsByName['blog_filter'].dom.popup_box.classList.remove('active');
      }     
    } 
    return sandbox;
  });

  tCore.register("dom:select", function (sandbox, moduleSettings) {
    sandbox.selectOptionCallback = function(event){
       //remove checked from all items according to parent          
       var   parent     = this.closest('.filter_checkbox_area');
       var   cele       = event;
       const drop       = parent.previousElementSibling;
       const allChecked = parent.querySelectorAll('input:checked');
       const allLabels  = parent.querySelectorAll('input:checked ~ label');
       const text       = drop.getAttribute('data-text');
       const name       = parent.getAttribute('data-name') || text;
       if( parent.getAttribute('data-single') ){
          const temp = this.checked;
          allChecked.forEach((input)=>input.checked = false);
          allLabels.forEach((label)=>!label.classList.contains('active') ? label.classList.add('active') : label.classList.remove('active'));
          // checked only clicked item            
          this.checked = temp;
          if( text ) {
              if( this.checked ){            
                  drop.innerHTML = this.nextElementSibling.innerHTML;
              }else{
                  drop.innerHTML = text;
              }
          }
       }else{
          if( text ) {
              if(allChecked.length){                   
                  drop.innerHTML = allChecked[0].nextElementSibling.innerHTML;
              }else{
                  drop.innerHTML = text;
              } 
          }                               
       }    
       parent.dispatchEvent(
          new CustomEvent('Onselect:change', {
              detail: {
                  checked: this.checked,
                  current: cele,
                  name   : name,
                  values : parent.querySelectorAll('input:checked')
              }                   
          })
       );
    }
    sandbox.selectOpenCloseCallback = function(e){
      e.preventDefault();
      e.target.parentElement.classList.toggle('active');       
    }
    sandbox.init = function () {         
      dFanatics.Utils.On('click','.filter_checkbox_area .radio-btn input', sandbox.selectOptionCallback);        
      dFanatics.Utils.On('click','.location_detail_filter_box .drp-btn',  sandbox.selectOpenCloseCallback);      
    }
    return sandbox;
  });
  tCore.register("dom:tab", function (sandbox) {
    sandbox.init = function(){     
      dFanatics.Utils.On('click','.ml-tab-wrapper [data-tab]', sandbox.tabOptionCallback); 
    }
    sandbox.tabOptionCallback = function(e){
      e.preventDefault();
      e.target.classList.add('active');       
      [...e.target.parentNode.children].every((child) => { 
          if(child !== e.target){
            child.classList.remove('active');
          }
      });
      [...document.querySelectorAll('.tabs-content .tab-item')].forEach((child) => {      
        if(child.dataset.target === e.target.dataset.tab){         
          child.classList.add('active');
        }else{
          child.classList.remove('active');
        }   
      });         
    }    
    return sandbox;
  });

  tCore.startAll();