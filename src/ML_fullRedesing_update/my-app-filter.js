var tCore = dFanatics.getInstance({
    debug: true,
    AfterModuleStart: function (thisModule, obj) {},
    BeforeModuleStart: function (module, obj) {}
  });

  /**
   *
   * Register Core module
   **/
  tCore.register("blog_filter", function (sandbox, moduleSettings) {
      sandbox.init = function () {
        window.addEventListener("DOMContentLoaded", function () {
            var initial_component = {
                name: "blog_filter",    
                container: document.querySelector(".ml-filter-content-area"),
                dom : {
                  loadmore: document.querySelector('.ml-blog-view-more'),
                  reset: document.querySelector('.reset_all_location_filter')
                },
                request_options: {
                  action : 'blog_filter_action',
                  page: 1,
                  has_more: true 
                },
                // observable
                model: {
                  blog_content: [],                  
                  filter_options: {}        
                },
                view(model) {
                  const blogHTML = model.blog_content.reduce(
                    (html, post) => html + `<div class="blog_style_wrap">
                    <div class="blog_style_img position-relative w-100">
                        <a href="#"><img class="w-100 blog_main_img" decoding="async" src="https://marbslifestyle.com/wp-content/uploads/2023/05/Nosso-summer-Club-lux-lounge-area-600x400.jpeg" alt="Finding the Perfect Balance: Luxury Family-Friendly Hotels in Marbella"></a>
                    </div>                
                    <div class="blog_style_info_bx">
                        <div class="blog_style_info">
                            <div class="blog_catg_name">
                                <span class="mlf font-s12">Accommodations</span>
                            </div>
    
                            <div class="blog_catg_title_info typescale-style">
                                <h6><a class="sf make-3line" href="#">${post.title}</a></h6>
                                <p class="mlf make-2line only_desktop_view">${post.body}</p>
                            </div>
                        </div>
    
                        <div class="blog_bottm_style position-relative position-content-after d-flex align-center justify-content-between">
                            <a href="#" class="read_more_btn mlf position-relative position-content-after ion-ios-arrow-forward position-content-before">Read more</a>
                            <span class="blog_date mlf font-s12">15 Sep 2023</span>
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
                    method: "GET", // *GET, POST, PUT, DELETE, etc.  
                    mode:"cors",             
                    credentials: "omit", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                       //'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    //body: Object.assign(model.request_options,model.filter_options), // body data type must match "Content-Type" header
                  }).then(function(res){
                    return res.json();
                  }).then(function(data){
                    component.model.blog_content = data;
                   // if(!data.hasnext){
                      component.request_options.has_more = false; // check query next  
                    //}                                    
                                                                                
                  });                  
               
                }
              };
            sandbox.addComponent(initial_component);
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
            sandbox.componentsByName['blog_filter'].request_options['page'] = 1;               
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
          sandbox.componentsByName['blog_filter'].model.filter_options = {};
          sandbox.componentsByName['blog_filter'].request_options['page'] = 1;
          sandbox.showComponent('blog_filter');
        });      
       
    };
    return sandbox;
  });

  tCore.startAll();