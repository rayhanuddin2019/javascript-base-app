

// toggle dropdown in location page filter

// location category filter radio button checked & unchecked


window.onclick = function(event) {
    if(!event.target.classList.contains('drp-btn')){        
        document.querySelectorAll('.filter-item').forEach((sbox)=>sbox.classList.remove('active'));
    }      
}

// location category filter tabs
if(document.querySelectorAll('.search_category_top a:not(.reset_all_location_filter)')){
    const tabButtons = document.querySelectorAll('.search_category_top a:not(.reset_all_location_filter)');
    tabButtons.forEach((tabItem)=>{
        tabItem.addEventListener('click', function(){
            // get the index of tab content item
            let index = this.getAttribute('data-tab');

            //remove active class from tabButtons
            const tabButtons = this.parentElement.querySelectorAll('.search_category_top a:not(.reset_all_location_filter)');
            tabButtons.forEach((buttons)=>buttons.classList.remove('active'));

            //add active class
            this.classList.add('active');
            
            // active or deactivate tab content item
            const allTabContents = this.closest('.location_detail_filter_box').querySelectorAll('.tab-item');
            allTabContents.forEach((tabContent)=>tabContent.classList.remove('active'))
            this.closest('.location_detail_filter_box').querySelector(`.tab-item-${index}`).classList.add('active');
        })
    });
}

// location filter mobile option enable & disabled
if(document.querySelector('.all-filter-btn') && document.querySelector('.search-close-btn')){
    const filterOptionBtn = document.querySelector('.all-filter-btn');
    const filterCloseBtn = document.querySelector('.search-close-btn');
    filterOptionBtn.addEventListener('click', function(){
        document.querySelector('.location_detail_filter_box').classList.add('active');
    });
    filterCloseBtn.addEventListener('click', function(){
        document.querySelector('.location_detail_filter_box').classList.remove('active');
    })
}

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