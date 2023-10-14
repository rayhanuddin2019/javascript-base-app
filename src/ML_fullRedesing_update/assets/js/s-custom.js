

// toggle dropdown in location page filter
if(document.querySelectorAll('.location_detail_filter_box .drp-btn')){
    const drpButtons = document.querySelectorAll('.location_detail_filter_box .drp-btn');   
    drpButtons.forEach((button)=>{
        button.addEventListener('click', function(e){
            e.preventDefault();
            const current = this;
            drpButtons.forEach(function(nbutton){
                if(nbutton === current){
                    !nbutton.parentElement.classList.contains('active') ? nbutton.parentElement.classList.add('active') : nbutton.parentElement.classList.remove('active');
                }else{
                    nbutton.parentElement.classList.remove('active')
                }  
            });
            
        })
    });
}


// location category filter radio button checked & unchecked
if(document.querySelectorAll('.filter_checkbox_area .radio-btn input')){
    const locFilInputs = document.querySelectorAll('.filter_checkbox_area .radio-btn input');
    locFilInputs.forEach((input)=>{
        input.addEventListener('click', function(event){
            //remove checked from all items according to parent          
            var parent = this.closest('.filter_checkbox_area');
            var cele = event;
            const drop = parent.previousElementSibling;
            const allChecked = parent.querySelectorAll('input:checked');
            const allLabels = parent.querySelectorAll('input:checked ~ label');
            const text = drop.getAttribute('data-text');
            const name = parent.getAttribute('data-name') || text;
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
                        name: name,
                        values: parent.querySelectorAll('input:checked')                
                    }                   
                  })
            );
        })
    });
}

// location category filter tabs
// if(document.querySelectorAll('.search_category_top a:not(.reset_all_location_filter)')){
//     const tabButtons = document.querySelectorAll('.search_category_top a:not(.reset_all_location_filter)');
//     tabButtons.forEach((tabItem)=>{
//         tabItem.addEventListener('click', function(){
//             // get the index of tab content item
//             let index = this.getAttribute('data-tab');

//             //remove active class from tabButtons
//             const tabButtons = this.parentElement.querySelectorAll('.search_category_top a:not(.reset_all_location_filter)');
//             tabButtons.forEach((buttons)=>buttons.classList.remove('active'));

//             //add active class
//             this.classList.add('active');
            
//             // active or deactivate tab content item
//             const allTabContents = this.closest('.location_detail_filter_box').querySelectorAll('.tab-item');
//             allTabContents.forEach((tabContent)=>tabContent.classList.remove('active'))
//             this.closest('.location_detail_filter_box').querySelector(`.tab-item-${index}`).classList.add('active');
//         })
//     });
// }

// location filter mobile option enable & disabled
// if(document.querySelector('.all-filter-btn') && document.querySelector('.search-close-btn')){
//     const filterOptionBtn = document.querySelector('.all-filter-btn');
//     const filterCloseBtn = document.querySelector('.search-close-btn');
//     filterOptionBtn.addEventListener('click', function(){
//         document.querySelector('.location_detail_filter_box').classList.add('active');
//     });
//     filterCloseBtn.addEventListener('click', function(){
//         document.querySelector('.location_detail_filter_box').classList.remove('active');
//     })
// }

//location filter desktop toggle map & scroller design
if(document.querySelector('.loc-map-btn')){
    const dLocMapBtn = document.querySelector('.loc-map-btn');
    const dLocBlogBtn = document.querySelector('.loc-blog-btn');
    const dLocMap = document.querySelector('.loc-p-map');
    const dCatLocItems = document.querySelector('.cat-loc-items');

    dLocMapBtn.addEventListener('click', function(){
        this.closest('.loc-toggle-options').querySelectorAll('span').forEach((span) => span.classList.remove('active'));
        this.classList.add('active');
        dLocMap.classList.add('active');
        dCatLocItems.classList.add('active');
    });

    dLocBlogBtn.addEventListener('click', function(){
        this.closest('.loc-toggle-options').querySelectorAll('span').forEach((span) => span.classList.remove('active'));
        this.classList.add('active');
        dLocMap.classList.remove('active');
        dCatLocItems.classList.remove('active');
    });
}

// location filter map functionality
if(document.querySelector('.filter-toggle-btn')){
    const filterToggleButton = document.querySelector('.filter-toggle-btn');
    filterToggleButton.addEventListener('click', function(){
        if(!this.classList.contains('map')) {
            this.classList.add('map');
            dLocMap.classList.add('active');
        } else{
            this.classList.remove('map');
            dLocMap.classList.remove('active');
        } 
    });
}