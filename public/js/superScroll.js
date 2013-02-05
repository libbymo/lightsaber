(function($){
	jQuery.fn.alternateScroller = function(options){
    console.log(this);
    var self = this;
    $(window).scroll(function(){
      for (var j = 0; j < self.length; j++){

        var $self       = $(self[j])
          , offsets     = $self.offset()
          , end         = $self.offset().top - $(window).height()/2;  // animation ends midscreen

        for (var i = 0; i < options.length; i++){
          if (options[i].trigger){                          // check if there's a trigger
            if (typeof options[i].trigger === "number"){
              console.log("number");
              end = options[i].trigger;
            }
            if (typeof options[i].trigger === "string"){
              var trigString = options[i].trigger;
              console.log("string");
              if(trigString[trigString.length - 1] === "%"){
                end = $(document).height() * (parseInt(trigString, 'decimal') / 100);
              } else {
                end = $(trigString).offset().top;           // end when element reaches top of screen.
              }
            }
          } else {

          }

          var start       = end - $(window).height()/2
            , position
            , inWindow    = ($(window).scrollTop() > start) && ($(window).scrollTop() < end)  // inAnimation
            , aboveWindow = ($(window).scrollTop() < start)                                   // aboveAnimation
            , belowWindow = ($(window).scrollTop() > end);                                    // belowAnimation

          
          // Which effect are we doing?
          switch(options[i].effect){
            case "slideLeft":

              if(inWindow){
                // var position  = 1 - (($(window).scrollTop() - start)/((end - start)));
                // this the same as:
                // difference between the animationEnd and where the scroll is now
                // divided by the entire animationRange gives the amount remaining.
                position  = ((end - $(window).scrollTop())/((end - start)));

                console.log("position: " + window.innerWidth * position);
                $self.css("right", "-" + window.innerWidth * position + "px");
              } 
              else if(aboveWindow){
                $self.css("right", "-" + window.innerWidth + "px");
              }
              else if(belowWindow){
                $self.css("right", "0px");
              }
              break;

            case "slideRight":

              if(inWindow){
                // var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
                position  = ((end - $(window).scrollTop())/((end - start)));
                console.log("position: " + window.innerWidth * position);
                $self.css("left", "-" + window.innerWidth * position + "px");
              } 
              else if(aboveWindow){
                $self.css("left", "-" + window.innerWidth + "px");
              }
              else if(belowWindow){
                $self.css("left", "0px");
              }
              break;

            case "slideLeftThru":

              $self.css('margin-left', - window.innerWidth - $self.outerWidth() + "px");

              if(inWindow || aboveWindow){
                // var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
                position  = ((end - $(window).scrollTop())/((end - start)));

                $self.css("left", (window.innerWidth + $self.width()) * position + "px"); 
                  // $self.css("right", "-" + (window.innerWidth) * position + "px"); 
                console.log("position: " + window.innerWidth * position);
              }
              else {
                $self.css("left", (2 * (window.innerWidth + $self.outerWidth())) + "px");
              }

              break;

            case "slideRightThru":

              $self.css('margin-right', - window.innerWidth - $self.outerWidth() + "px");

              if(inWindow || aboveWindow){
                // var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
                position  = ((end - $(window).scrollTop())/((end - start)));

                $self.css("right", (window.innerWidth + $self.width()) * position + "px"); 
                  // $self.css("right", "-" + (window.innerWidth) * position + "px"); 
                console.log("position: " + window.innerWidth * position);
              }
              else {
                $self.css("right", (2 * (window.innerWidth + $self.outerWidth())) + "px");
              }

              break;       

            case "slideUp":

              console.log('in slideup');
              $self.css('margin-top', - window.innerHeight - $self.outerHeight() + "px");

              if(inWindow){
                console.log('in window');
                position  = ((end - $(window).scrollTop())/((end - start)));
                $self.css("bottom", ((2 * window.innerHeight) + $self.outerHeight()) * position + "px"); 
                console.log("bottom: " + (2 * window.innerHeight) + $self.outerHeight() * position + "px");
              
              }
              // else {
              //   $self.css("top", (2 * (window.innerHeight + $self.outerHeight())) + "px");
              // }

              break;          

            default:
              console.log("nothing to do!");
          }
        }
      }
    });
	};
})(jQuery);

  // // super Scroller function, takes a trigger, a target to be modifide, and a class to apply to the target
  // var superScroller = function(_scrollElements) {
    
  //   console.log(window.innerHeight)

  //   for ( var i = 0; i < _scrollElements.length; i++){
      
  //     //consume the object
  //     consumeScrollers(_scrollElements[i])
  //   };
  // }

  //   , consumeScrollers = function(_scrollElement){
  //       // setting the trigger "window" to the top 
  //       // of the trigger element + duration
  //       var trigger   = _scrollElement.trigger
  //         , trigVal   = $(trigger).offset().top
  //         , duration  = window.innerHeight //_scrollElements[i].duration
  //         , end       = trigVal + duration
  //         , target    = _scrollElement.target
  //         , klass     = _scrollElement.klass
        
  //       // checking to see if we are within the window
  //       if(($(window).scrollTop() > trigVal) && ($(window).scrollTop() < end)){

  //         // if yes, applyling the class to the target
  //         $(target).addClass(klass);
  //         console.log(target + " Activated!");
  //       } else{
          
  //         // if outside of the window, removing the class
  //         $(target).removeClass(klass);
  //         console.log(target + " De-Activated!");
  //       };
  //   }

  //   // building an array of objects which contain all the 
  //   // info for each scrollable object
  //   , scrollElements =  [ { trigger  : "body"
  //                         , duration : 75
  //                         , target   : "#target-1"
  //                         , klass    : "activated" } 

  //                       , { trigger  : "#trigger-1"
  //                         , duration : 75
  //                         , target   : "#target-2"
  //                         , klass    : "activated" }

  //                       , { trigger  : "#trigger-2"
  //                         , duration : 75
  //                         , target   : "#target-3"
  //                         , klass    : "activated" } 

  //                       , { trigger  : "#trigger-3"
  //                         , duration : 75
  //                         , target   : "#target-4"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-4"
  //                         , duration : 75
  //                         , target   : "#target-5"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-5"
  //                         , duration : 75
  //                         , target   : "#target-6"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-6"
  //                         , duration : 75
  //                         , target   : "#target-7"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-7"
  //                         , duration : 75
  //                         , target   : "#target-8"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-8"
  //                         , duration : 75
  //                         , target   : "#target-9"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-10"
  //                         , duration : 75
  //                         , target   : "#target-11"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-11"
  //                         , duration : 75
  //                         , target   : "#target-12"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-12"
  //                         , duration : 75
  //                         , target   : "#target-13"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-13"
  //                         , duration : 75
  //                         , target   : "#target-14"
  //                         , klass    : "activated" } 
  //   ]
  
  // $(window).scroll(function(){
  //   console.log('scrollTop() ' + $(window).scrollTop());
  //   // calling the superScroller function on the array
  //   superScroller(scrollElements);
  // });


// Note.  position has something to do with innerWidth - elements.innerWidth
// ----------offset.left[+elements.width]---------remaining.

// window.innerWidth + element width 