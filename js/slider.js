var Slider = {

    images: null,
    selector: null,
    active: null,

    init: function(data) {
        this.selector = data.selector;  
        this.images = data.images;
    },
    
    check: function () {
        if (this.images.filter(':animated').length > 0) { return; }
    },

    next: function () {
        this.active = this.images.filter(':visible');
        var next;

        if (! this.active.next().length) {
            next = this.images.filter(':first');
        } else {
            next = this.active.next();
        }
        this.change(this.active, next);
        
    },

    prev: function () {
        this.active = this.images.filter(':visible');
        var prev;
        
        if (!this.active.prev().length) {
            prev = this.images.filter(':last');
        } else {
            prev = this.active.prev();
        }
        this.change(this.active, prev);
    },
    
    change: function (activeElement, newElement) {
        this.check();
        activeElement.fadeOut('fast', function() {
            newElement.fadeIn();
        });
    },

    stop: function () {
        this.active = this.images.filter(':visible').hide();
    }
}

