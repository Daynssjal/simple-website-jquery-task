$(function() {
    

    // WINDOW
    var win = $(window);
    

    // SIDEBAR NAVIGATION AND MENU ICON ANIMATION
    var menuIcon = $('.menu-icon');
    var menuLinks = $('.menu').find('a');
    var sidebar = $('.sidebar');
    var heading = $('.header-heading');
    var leftTextDivs = $('.left');
    var slideDivs = $('.slide');
    
    menuIcon.on('click', function () {
        if (window.matchMedia("(max-width: 830px)").matches) {
            $(this).toggleClass('active');      // change menu icon
            sidebar.toggleClass('visible-responsive');
        } else {
            $(this).toggleClass('active');      // change menu icon
            sidebar.toggleClass('visible');     // slide the sidebar into the viewport
            heading.toggleClass('move');        // move heading to the right
            leftTextDivs.toggleClass('moved');  // move text divs to the right
            slideDivs.toggleClass('moved');     // reduce size of and move main divs to the right    
        }
    });
    
    
    // CHANGE POSITION OF SOCIAL ICONS BASED ON THE VP WIDTH
    var socialIcons = $('#social-icons');
    var footer = $('#contact');
    
    win.on('load', function() {
        // if ($(document).innerWidth() < 830) {
        if (window.matchMedia("(max-width: 830px)").matches) {
            footer.append(socialIcons); 
        } else {
            sidebar.append(socialIcons);
        }
    });
    
    
    // FUNCTION - RESTORE ORIGINAL CLASSES
    function restoreClass () {
        sidebar.removeClass('visible');
        sidebar.removeClass('visible-responsive');
        heading.removeClass('move');        
        leftTextDivs.removeClass('moved'); 
        slideDivs.removeClass('moved'); 
    }
    
    function restoreIconClass () {
        menuIcon.removeClass('active');
    }
    
    
    // CHANGE POSITION OF SOCIAL ICONS BASED ON THE VP WIDTH
    // HIDE NAVIGATION SIDEBAR ON RESIZE, RESTORE MENU IDLE CLASS
    win.on('resize', function() {
        if (window.matchMedia("(max-width: 830px)").matches) {
            footer.append(socialIcons);
        } else {
            sidebar.append(socialIcons);
        }
        restoreIconClass();
        restoreClass();
    });
    

    // NAVIGATION ANIMATION - SCROLL TO SELECTED SECTION
    menuLinks.on('click', function(e) {
        e.preventDefault();
        var scrollToPoint = this.hash;                                  // catch the destination
        var newScrollTop = $(scrollToPoint).offset().top;               // identify the scrolltop of the destination
        $('html, body').animate({ scrollTop : newScrollTop }, 1000);    // scroll to the destination
        
    });
    
    
    // PARALLAX EFFECT - HEADER AND HEADING
    var headerBg = $('.header-bg');
    var headerOffset = headerBg.offset().top;
    var headingOffset = heading.offset().top;
    
    win.on('scroll', function () {
        var winScrollTop = $(this).scrollTop();
        var winBottom = $(this).scrollTop() + $(this).innerHeight();
        
        headerBg.css('background-position', 'center ' + -(Math.floor(headerOffset - winScrollTop) * 0.2) + 'px');
        // make header background scroll by 4/5 slower than the window 
        heading.css('top', (headingOffset -(Math.floor(headingOffset - winScrollTop) * 0.5)) + 'px');
        // make header background scroll by 1/2 slower than the window
        
        var headingCurrentTop = parseInt(heading.css('top'));
        if ( headingCurrentTop > 370 ) {
            heading.fadeOut();  // if heading top is 370px and more, fade it out
        } else {
            heading.fadeIn();   // if heading top is below 370px, fade it back in
        }
    });
    

    // OVERLAY
    var overlay = $('#overlay');
    var slider = $('#slider');
    var images = $('main').find('img');
    var imgClones = images.clone();
   
    overlay.hide();
    slider.append(imgClones);
    
    images.on('click', function () {
        var clickedImg = images.index($(this));
        var displayedImg = slider.find('img').eq(clickedImg);
        overlay.show();
        displayedImg.fadeIn();
    });


    // SLIDER
    Slider.init({
        selector: slider,
        images: imgClones
    });
   
    var forwards = $('.arrow-right');
    var backwards = $('.arrow-left');

    forwards.on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        Slider.next();
    });
    backwards.on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        Slider.prev();
    });

    $(document).on('keydown', function(e) {
        var arrow = { left: 37, right: 39 };
        switch(e.which) {
            case arrow.right :
                Slider.next();
                break;
            case arrow.left:
                Slider.prev();
                break;
        }
    });

    overlay.on('click', function() {
        Slider.stop();
        overlay.hide();
    });
});