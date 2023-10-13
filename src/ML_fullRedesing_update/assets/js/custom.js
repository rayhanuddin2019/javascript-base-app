jQuery(function(){
        jQuery(".menu_bar").click(function() { 
        jQuery('.mobile_menu').addClass('mobile_menu_open'); 
        jQuery('.mobile_menu').slideDown('slow');

        jQuery('.header_right_wrap').addClass('dealy_show');
    });
    jQuery(".menu_close").click(function() { 
        jQuery('.mobile_menu').removeClass('mobile_menu_open'); 
        jQuery('.mobile_menu').slideUp('slow'); 
        
        jQuery('.header_right_wrap').removeClass('dealy_show');
    });

    jQuery(".event_btn_wrap .header_btn").click(function() { 
        jQuery('.events_list_wrap.events_hide_show').slideToggle(200);
    });
});


var nav = jQuery('.sticky_header');
jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 20) {
        nav.addClass("sticky").animate({
            margin: "slow",
            padding: "slow",
        });
    } else {
        nav.removeClass("sticky").animate({
            margin: "slow",
            padding: "slow",
        });
    }
});

function readMore(){
    //getting paragraphs
    let paragraph = this.closest('.short_content').querySelector('p');

    if(!this.classList.contains('ion-up')){
        this.classList.remove('ion-down');
        this.classList.add('ion-up');
        this.textContent = "Read less";
        paragraph.classList.remove('make-3line');
    } else{
        this.classList.remove('ion-up');
        this.classList.add('ion-down');
        this.textContent = "Read more";
        paragraph.classList.add('make-3line');
    }
}


const readMoreButtons = [...document.querySelectorAll('.b-show-more')];
    readMoreButtons.forEach((button)=>{
    button.addEventListener('click', readMore)
})


// menu ovelay 
jQuery(document).ready(function(){

    function mobileMenuFun(){
        let header_area = jQuery('.header_area ').outerHeight();
        let mb_singsocial_wrap = jQuery('.mb_singsocial_wrap').outerHeight();
        let allHeightArr = header_area + mb_singsocial_wrap;
        let slicknav_menu = jQuery('.slicknav_menu').outerHeight();
        let winHeight = jQuery(window).height() - allHeightArr;

        if (winHeight <= slicknav_menu) {
            jQuery('#menu_holder').addClass('fixed_bottom');
        }else{
            jQuery('#menu_holder').removeClass('fixed_bottom');
        }
    };

    mobileMenuFun();

    jQuery('#menu').slicknav({
        label: 'menu',
        openedSymbol:"",
        closedSymbol:"",
        allowParentLinks: false,
        prependTo:'#menu_holder',
        afterOpen: function (item) {
            mobileMenuFun();
        },
        afterClose: function (item) {
            mobileMenuFun();
        },
        
    });

    // header redesign js
    jQuery('.menu_list > li').each(function(item, index){
        let liImmediateCld = jQuery(this).find("> a").text();
        liImmediateCld = liImmediateCld.replace(/\s+/g, '');
        liImmediateCld = liImmediateCld.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        jQuery(this).addClass(`${liImmediateCld}`);
    });

    jQuery('.menu_list > li.inspiration > ul > li').each(function(item, index){
        let liImmediateCld = jQuery(this).find("> a").text();
        liImmediateCld = liImmediateCld.replace(/\s+/g, '');
        liImmediateCld = liImmediateCld.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        jQuery(this).addClass(`${liImmediateCld}`);
    });

    function menuManageFun(){
        let windWidth = jQuery(window).width();
        let marquee_style = jQuery('.marquee_style_area');
        if(windWidth <= 1280){
            let childMenuhtml = jQuery('.menu_list > li.inspiration > ul').html();
            jQuery('.menu_list').prepend(childMenuhtml);
            jQuery('.menu_list > li.inspiration').remove();
        }
        if(windWidth <= 767){
            let createDiv = jQuery('<div class="mb_singsocial_wrap">');
            let footer_socila_media_box = jQuery('.footer_socila_media_box');
            let signin_btn_wrap = jQuery('.signin_btn_wrap');

            let menu_search_bx = jQuery('.menu_search_bx ');

            let elementAppendarr = [signin_btn_wrap, footer_socila_media_box];
            let childElementAppend = jQuery(createDiv).append(elementAppendarr);
            jQuery('.main_menu_wrap').append(childElementAppend);
            
            jQuery('.mobile_menu').prepend(jQuery('.hamburger_bar'));

            jQuery('#menu_holder').prepend(menu_search_bx);
            jQuery('#menu_holder').append(childElementAppend);

            jQuery('.header_area').append(marquee_style);
        }else{
            jQuery('.header_area').prepend(marquee_style);
        }
        
        jQuery('.menu_list > li').each(function(index, item){
            if(!jQuery(item).hasClass('position-relative position-content-after')){
                jQuery(item).addClass('position-relative position-content-after');
                jQuery(item).find('> a').addClass('position-relative ion-down position-content-before');
                if(jQuery(item).hasClass('aboutus')){
                    jQuery(item).removeClass('position-relative position-content-after');
                    jQuery(item).find('> a').removeClass('position-relative ion-down position-content-before');
                }
            }
            if(jQuery(item).find("> ul").hasClass('d-flex')){
                jQuery(item).find('> ul').removeClass('d-flex align-center');
            }
        });
    };
    menuManageFun();

    if(matchMedia('only screen and (min-width: 1281px)').matches) {
        let clearTitem = setInterval(() => {
            jQuery('.inspiration > ul > li:first-child').addClass("active_item_menu");
            let menu_areadfHeight = jQuery('.menu_list li.inspiration > ul > li > ul').outerHeight();
            const activeItem = jQuery(".inspiration > ul > li.active_item_menu");
            jQuery(".inspiration > ul > li").hover(function(){
                jQuery(this).siblings().removeClass('active_item_menu');
                jQuery(this).addClass("active_item_menu");
                setHeight(this);
            });
    
            jQuery(".inspiration > ul > li").mouseleave(function(){
                jQuery(this).addClass('active_item_menu');
                setHeight(this)
            });
            
            function setHeight(item){
                let parentHeight = jQuery(item).parent().outerHeight();
                let childrenHeight = jQuery(item).find('.child-sub-menu').outerHeight(true);
                jQuery(item).parent().css("min-height", `${childrenHeight}px`);
            };
            
            setHeight(activeItem);
        }, 300);
        
        
       setTimeout(() => {
        clearInterval(clearTitem);
       }, 300);
    }

    if(matchMedia('only screen and (min-width: 767px) and (max-width: 1280px)').matches){

        let clearTitem = setInterval(() => {
            jQuery('.menu_list > li:first-child').addClass("active_item_menu");
            let menu_areadfHeight = jQuery('.menu_list > li > ul').outerHeight();
            const activeItem = jQuery(".menu_list > li.active_item_menu");
    
            jQuery(".menu_list > li").hover(function(){
                jQuery(this).siblings().removeClass('active_item_menu');
                jQuery(this).addClass("active_item_menu");
                setHeight(this);
            });
    
            jQuery(".menu_list > li").mouseleave(function(){
                jQuery(this).addClass('active_item_menu');
                setHeight(this)
            });
            
            function setHeight(item){
                let parentHeight = jQuery(item).parent().outerHeight();
                let childrenHeight = jQuery(item).find('> ul').outerHeight(true);
                jQuery(item).parent().css("min-height", `${childrenHeight}px`);
            };
            
            setHeight(activeItem);
        }, 300);
        
       setTimeout(() => {
        clearInterval(clearTitem);
       }, 300);
    }

    // hamburger_bar js
    jQuery('body').on('click', '.hamburger_bar', function(){
        if(!jQuery('.hamburger_bar').hasClass('menu_cross')){
            jQuery(this).addClass('menu_cross');
            if(jQuery(window).width() >= 768) {
                jQuery('.main_menu_wrap').slideDown(300);
            }

            if(jQuery(window).width() <= 767) {
                jQuery('#menu_holder').slideDown(300);
            }
        }else{
            jQuery(this).removeClass('menu_cross');
            if(jQuery(window).width() >= 768) {
                jQuery('.main_menu_wrap').slideUp(300);
            }

            if(jQuery(window).width() <= 767) {
                jQuery('#menu_holder').slideUp(300);
            }
        }
        mobileMenuFun();
    });
});

// show more less more
 Element.prototype.readMoreByElement = function(options) {
    // default number
    options = options || {};

    var maxEle = options.maxEle || 0;
    var buttonHideText = options.buttonHideText || "Read Less";
    var buttonShowText = options.buttonShowText || "Read More";
    var isLineCollapse = options.isLineCollapse || false;
    var minLine = options.minLine || 1;

    // create button for show hide
    const button = document.createElement('a');
    button.classList.add('show-hide-btn');
    button.setAttribute('href', "#");
    button.textContent = buttonShowText;
    if(maxEle < this.childElementCount){
        this.append(button)
    };

    // get total element number
    const totalElementsNumber = this.childElementCount - 1;
    
    // return this function if number greater than total Elements
    if(maxEle > totalElementsNumber) return;

    // hide element out of number of elements
    const childElements = [...this.children];
    const hideElements = function(){
        childElements.slice(maxEle, childElements.length - 1).map(element => {
            element.style.display = "none";
        });
        if(isLineCollapse){
            const selectedElement = childElements[maxEle - 1];
            selectedElement.classList.add(`make-${minLine}line`);
        }
    };
    const showElements = function(){
        childElements.slice(maxEle, childElements.length - 1).map(element => {
            element.style.display = "block";
        });
        if(isLineCollapse){
            const selectedElement = childElements[maxEle - 1];
            selectedElement.classList.remove(`make-${minLine}line`);
        }
    };
    hideElements();
    
    button.addEventListener('click', function(e){
        e.preventDefault();
        // show or hide element & change button text & class
        if(!this.classList.contains('arrow-up')){
            this.classList.add('arrow-up');
            this.textContent = buttonHideText;
            showElements();
        } else{
            this.classList.remove('arrow-up');
            this.textContent = buttonShowText;
            hideElements();
        }
    })
}