/**
 * Foil-slider slider jQuery plugin
 * @author  David González <davidggdev@gmail.com>
 * @version 0.1
 * @since   2022-09-11
 */
(function ($) {
    "use strict";

    $.fn.foilSlider = function (options) {
        let _this = this;
        let _foil_slider = new FoilSlider(this, options);
        try {
            if (!_foil_slider)
                throw new Error('Something goes very wrong');

        } catch (e) {
            console.error(e.name + ': ' + e.message);
            return false;
        }
    };
})(jQuery);

/**
 * Main class core
 */
class FoilSlider {
    /** Main element */
    _foil_e_content = null;
    /** Options get by instance create */
    _foil_options = [];
    /** Main slider content */
    _foil_content = null;
    /** Main inner slider content */
    _foil_e_content_viewport = null;
    /** Stablish turn number */
    _foil_turn = 1;
    /** Timer to handle pauses */
    _foil_timer = null;
    /** Clases for position container */
    _foil_classes_foils = [];
    /** Position X on touch */
    _foil_initialX = null;
    /** Position Y on touch */
    _foil_initialY = null;
    /** Own instance */
    _foil_instance_id = "";
    /** Controls content */
    _foil_e_content_controls = null;
    /** Specch text shows */
    _foil_slide_speech_turn = 1;

    /**
     * Initiates and calls the creation of elements necessary to execute the slider.
     * @param {object} options Collection of available options 
     * @returns bool
     */
    constructor(element, options) {
        try {
            this._foil_timer = ms => new Promise(res => setTimeout(res, ms));
            this._foil_options = options;
            this._foil_instance_id = this.makeid(5);
            this._foil_e_content = $(element);
            $(this._foil_e_content).addClass("foil-slider fl_" + this._foil_instance_id);

            this._foil_classes_foils = [
                [
                    ['-left', '-center'],
                    ['-center', '-right'],
                    ['-right', '-left']
                ],
                [
                    ['-center', '-right'],
                    ['-right', '-left'],
                    ['-left', '-center']
                ],
                [
                    ['-right', '-left'],
                    ['-left', '-center'],
                    ['-center', '-right']
                ]
            ];

            if (this._foil_e_content.length === 0)
                throw new Error('Main element [foil-slider] not defined');

            if ($(this._foil_e_content).find("img,div").length === 0)
                throw new Error('Main element [foil-slider] cannot be empty');


            this.createSliderViewport();
            this.createSliderDivElements();
            this.createAnimations();
            this.turnListener();
            this.swipeListener();
            return true;
        } catch (e) {
            console.error(e.name + ': ' + e.message);
            return false;
        }
    }

    /**
     * Create viewport slider element
     */
    createSliderViewport() {
        $(this._foil_e_content).append(
            $(this.createElement('div', 'foil-slider-viewport'))
        ); this._foil_e_content_viewport = $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport');
        $(this._foil_e_content).append(
            $(this.createElement('div', 'foil-slider-controls'))
        ); this._foil_e_content_controls = $('.fl_' + this._foil_instance_id + ' .foil-slider-controls');
        $(this._foil_e_content_controls).append(
            $(this.createElement('div', 'foil-slider-turn'))
        ); this._foil_e_content_turn = $('.fl_' + this._foil_instance_id + ' .foil-slider-turn');
        $(this._foil_e_content_controls).append(
            $(this.createElement('div', 'foil-slider-text'))
        ); this._foil_e_content_text = $('.fl_' + this._foil_instance_id + ' .foil-slider-text');
    }

    /**
     * Make divs with from img elements inside of main element
     */
    createSliderDivElements() {
        let _this = this;
        let innerId = 0;
        let positions = ['-left', '-center', '-right'];

        $(_this._foil_e_content).find("img,div").each(function (iteration, element) {
            if ($(element)[0].nodeName === 'IMG') {
                innerId = ((iteration) + 1);
                _this._foil_e_content_viewport.append(
                    $(_this.createElement('div', 'foil-slide slide-' + innerId, '', ''))
                );
                $('.fl_' + _this._foil_instance_id + ' .foil-slider-viewport .slide-' + innerId).addClass(positions[iteration]);
                $('.fl_' + _this._foil_instance_id + ' .foil-slider-viewport .slide-' + innerId).append($(element));
               
                $('.fl_' + _this._foil_instance_id + ' .foil-slider-controls .foil-slider-text').append(
                    $(_this.createElement('div', 'foil-slider-speech slide-' + innerId, '', '', $(element).attr('alt')))
                );
                $('.foil-slider-speech.slide-2').addClass('-active');
            }
        });
    }

    /**
     * Add animation to slide
     */
    createAnimations() {
        let animationDuration = (this._foil_options.animationSeconds !== undefined) ? this._foil_options.animationSeconds : "1";
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .slide-1').css({ "animation-duration": animationDuration + "s" });
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .slide-2').css({ "animation-duration": animationDuration + "s" });
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .slide-3').css({ "animation-duration": animationDuration + "s" });
    }

    /**
     * Handle controls click's and move
     * @call _this.moveRTL();
     */
    turnListener() {
        let _this = this;
        $('.fl_' + this._foil_instance_id + ' .foil-slider-controls .foil-slider-turn').click(function (e) {
            $(this).css({ "pointer-events": "none" });
            _this.moveRTL();
        });
    }

    /**
     * Handle mobile swipe rigth listener
     */
    swipeListener() {
        var container = document.querySelector('.fl_' + this._foil_instance_id);
        container.addEventListener("touchstart", this.startTouch, false);
        container.addEventListener("touchmove", this.moveTouch, false);
        container._this = this;
    }

    /**
     * Event on start touch on mobile
     * @param {event} e 
     */
    startTouch(e) {
        this._foil_initialX = e.touches[0].clientX;
        this._foil_initialY = e.touches[0].clientY;
        $('.foil-slider').css({ "pointer-events": "none" });
    }

    /**
     * Event on swipe on mobile
     * @call _this.moveRTL();
     * @param {event} e 
     * @returns 
     */
    moveTouch(e) {
        if (this._foil_initialX === null) {
            return;
        }

        if (this._foil_initialY === null) {
            return;
        }

        var currentX = e.touches[0].clientX;
        var currentY = e.touches[0].clientY;

        var diffX = this._foil_initialX - currentX;
        var diffY = this._foil_initialY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // swipe right
            if (diffX < 0) {
                e.currentTarget._this.moveRTL();
            }
        }

        this._foil_initialX = null;
        this._foil_initialY = null;

        e.preventDefault();
    }
    
    /**
     * Active RTL moveRTL
     */
    moveRTL() {
        let _this = this;
        let classesFoilsPointer = (_this._foil_turn) - 1;
        let animationDuration = (this._foil_options.animationSeconds !== undefined) ? this._foil_options.animationSeconds : "1";
        let animationIntDuration = parseFloat(animationDuration) * 1000;
        
        (async function () {
            _this.addClassAnimations();

            await _this._foil_timer(animationIntDuration);
            _this.moveSlideFirst(classesFoilsPointer);

            await _this._foil_timer(1);
            _this.moveSlideSecond(classesFoilsPointer);

            await _this._foil_timer(1);
            _this.moveSlideThird(classesFoilsPointer);

            await _this._foil_timer(1);
            _this.removeClassAnimations();
            $('.foil-slider-turn').css({ "pointer-events": "all" });
            $('.foil-slider').css({ "pointer-events": "all" }); 

            // Move slide text
            $('.foil-slider-speech').removeClass('-active');  
            $('.fl_' + _this._foil_instance_id + ' .foil-slider-controls .foil-slider-text .foil-slider-speech.slide-' + _this._foil_slide_speech_turn ).addClass('-active'); 
            _this._foil_slide_speech_turn--;
            if(_this._foil_slide_speech_turn<1){
                _this._foil_slide_speech_turn = 3;
            } 
        }());

        if (_this._foil_turn > 2) {
            _this._foil_turn = 1;
        } else {
            _this._foil_turn++;
        }
    }

    /**
     * Move first slide
     * @param {int} classesFoilsPointer 
     */
    moveSlideFirst(classesFoilsPointer) {
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .slide-1')
            .removeClass(this._foil_classes_foils[classesFoilsPointer][0][0])
            .addClass(this._foil_classes_foils[classesFoilsPointer][0][1]);
    }

    /**
     * Move second slide
     * @param {int} classesFoilsPointer 
     */
    moveSlideSecond(classesFoilsPointer) {
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .slide-2')
            .removeClass(this._foil_classes_foils[classesFoilsPointer][1][0])
            .addClass(this._foil_classes_foils[classesFoilsPointer][1][1]);
    }

    /**
     * Move third slide
     * @param {int} classesFoilsPointer 
     */
    moveSlideThird(classesFoilsPointer) {
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .slide-3')
            .removeClass(this._foil_classes_foils[classesFoilsPointer][2][0])
            .addClass(this._foil_classes_foils[classesFoilsPointer][2][1]);
    }

    /**
     * Add animations css
     */
    addClassAnimations() {
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .foil-slide.-left').addClass('-play-1');
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .foil-slide.-center').addClass('-play-2');
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .foil-slide.-right').addClass('-play-3');
    }

    /**
     * Remove animations css
     */
    removeClassAnimations() {
        $('.fl_' + this._foil_instance_id + ' .foil-slider-viewport .foil-slide')
            .removeClass('-play-1')
            .removeClass('-play-2')
            .removeClass('-play-3');
    }

    /**
    * Returns the html code needed to create a custom html element
    * @param {string} type 
    * @param {string} className 
    * @param {string} idName 
    * @param {string} attribute 
    * @param {string} content 
    * @returns 
    */
    createElement(type, className, idName, attribute, content) {
        let idFiltered = (idName != undefined) ? 'id="' + idName + '"' : '';
        let attributeFiltered = (attribute != undefined) ? attribute : '';
        let contentFiltered = (content != undefined) ? content : '';
        return '<' + type + ' class="' + className + '" ' + idFiltered + ' ' + attributeFiltered + '>' + contentFiltered + '</' + type + '>'
    }

    /**
     * Generate a random id
     * @param {int} length 
     * @returns 
     */
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}
