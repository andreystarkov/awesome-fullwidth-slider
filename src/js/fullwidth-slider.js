/*  Awesome fullWidth Slider
    im@andreystarkov  */

$(function() {

    function rand(min, max){
        return Math.floor((Math.random()*max)+min);
    }

    var support = { animations : Modernizr.cssanimations },
        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },

        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
        effectSel = document.getElementById( 'fxselect' ),
        component = document.getElementById( 'nice-slider' ),
        items = component.querySelector( 'ul.itemwrap' ).children,
        current = 0,
        itemsCount = items.length,
        nav = component.querySelector( 'nav' ),
        navNext = nav.querySelector( '.next' ),
        navPrev = nav.querySelector( '.prev' ),
        isAnimating = false,
        rotateTime = 8000;

        var effects = ["fxSoftScale", "fxSnapIn","fxLetMeIn","fxStickIt","fxArchiveMe","fxVGrowth", "fxSlideBehind","fxSoftPulse", "fxCliffDiving", "fxPressAway"];
        var rotateInterval = setInterval(function(){autoInterval()},rotateTime);

        function init() {
            showNav();
            changeEffect();
            $('.slider-caption').each(function(){
                $(this).transition({x: rand(-500, 500)+'px', y: rand(-500, 500)+'px', 'opacity': 0}, 1);
            });
            navNext.addEventListener( 'click', function( ev ) { ev.preventDefault(); clearInterval(rotateInterval); navigate( 'next' ); } );
            navPrev.addEventListener( 'click', function( ev ) { ev.preventDefault(); clearInterval(rotateInterval); navigate( 'prev' ); } );
        }

        function hideNav() {
            nav.style.display = 'none';
        }

        function showNav() {
            nav.style.display = 'block';
        }

        function changeEffect() {
            var rnd = rand(0,effects.length);
            var effect = effects[rnd];
            $(component).attr('class', 'nice-slider nice-slider-fullwidth');
            classie.addClass( component, effect );
            showNav();
        }

       function captionChange(caption){

          // i will rewrite this

          var captionEffects = [
                {rotate: '100deg', scale: 0.6, opacity: 0, y: '-500px'},
                {rotate: '360deg', scale: 0.2, opacity: 0, x: '-50px'},
                {rotateX: '360deg', scale: 0.4, opacity: 0, y: '-350px'},
                {rotateX: '360deg', rotateY: '360deg', perspective: '30px', scale: 0.4, opacity: 0, y: '-750px'},
                {rotate: '30deg', scale: 0.8, opacity: 0, x: '-400px'},
                {scale: 6, rotateX: '60deg', perspective: '100px', rotateY: '30deg', opacity: 0, y: '300px', x: '500px'},
                {scale: 3, rotateX: '80deg', perspective: '170px', rotateY: '10deg', opacity: 0, x: '800px'},
                {scale: 0.8, rotateX: '10deg', perspective: '270px', rotateY: '120deg', opacity: 0, x: '100px'},
                {scale: 2, rotateX: '-20deg', perspective: '70px', rotateY: '45deg', opacity: 0, y: '-500px',x: '-900px'},
                {y: '-500px', opacity:0}, {y: '300px', opacity:0},
                {x: '300px', opacity:0}, {x: '-500px', scale: 0.8, opacity:0},
                {x: '-500px', scale: 0.8, opacity:0, rotateX: '10deg', perspective: '270px', rotateY: '120deg'},
                {y: '400px', scale: 0.8, opacity:0, rotateX: '180deg', perspective: '150px'},
                {y: '-500px', scale: 1.2, opacity:0, rotateX: '180deg', perspective: '100px'},
            ];

            var rnd = rand(0, captionEffects.length);
            caption.transition(captionEffects[rnd], 700);
        }

        function navigate( dir ) {

            isAnimating = true;
            var cntAnims = 0;

            var currentItem = items[ current ];

            if( dir === 'next' ) {
                current = current < itemsCount - 1 ? current + 1 : 0;
            }
            else if( dir === 'prev' ) {
                current = current > 0 ? current - 1 : itemsCount - 1;
            }

            captionChange($('.slider-caption', currentItem));

            var nextItem = items[ current ];

            var onEndAnimationCurrentItem = function() {
                this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
                var caption = $('.slider-caption', this);

                classie.removeClass( this, 'current' );
                classie.removeClass( this, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
                ++cntAnims;
                if( cntAnims === 2 ) {
                    isAnimating = false;
                }
                changeEffect();

            }

            var onEndAnimationNextItem = function() {

                var caption = $('.slider-caption', this);
                caption.css({display: 'block'});
                caption.transition({ rotate: '0deg', rotateY: '0deg', rotateX: '0deg', scale: 1, opacity: 1, y: '0px', x: '0px'}, 700);

                this.removeEventListener( animEndEventName, onEndAnimationNextItem );
                classie.addClass( this, 'current' );
                classie.removeClass( this, dir === 'next' ? 'navInNext' : 'navInPrev' );
                ++cntAnims;
                if( cntAnims === 2 ) {
                    isAnimating = false;
                }
                changeEffect();
            }

            if( support.animations ) {
                currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
                nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
            }

            else {
                onEndAnimationCurrentItem();
                onEndAnimationNextItem();
            }

            classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
            classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
        }

        function autoInterval()
        {
            navigate('next');
        }

        function myStopFunction()
        {
        clearInterval(rotateInterval);
        }
        init();
        changeEffect()
});

// helper functions

( function( window ) {

'use strict';

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}

else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

if ( typeof define === 'function' && define.amd ) {
  define( classie );
} else {
  window.classie = classie;
}

})( window );
