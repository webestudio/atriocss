/*
 * Atrio Desk - HTML5 UI Kit - JS
 * Author: Jorge Bravo
 * WebSite: https://atriocss.atrio.site
 */
$(document).ready(function() {

    if (is_function("bxSlider")) {
        $(".slideshow").bxSlider({
            mode: "horizontal",
            // 'horizontal', 'vertical', 'fade'
            pager: true,
            speed: 500,
            // transition time
            startSlide: 0,
            infiniteLoop: true,
            captions: true,
            adaptiveHeight: false,
            touchEnabled: true,
            pause: 4000,
            autoControls: true,
            controls: true,
            autoStart: true,
            auto: true
        });
    }

    if (is_function("fancybox")) {
        $("[data-fancybox]").fancybox({
            protect: true,
            animationEffect: "zoom",
            transitionEffect: "tube"
        });

        $("body").on("click", ".nav-toggler", function() {
            $(".menu-collapse").toggleClass("show");
        });
    }
    /*---------------------------------
    	Tabs
    -----------------------------------*/
    // tab setup
    $(".tab-content")
        .addClass("clearfix")
        .not(":first")
        .hide();
    $("ul.tabs").each(function() {
        var current = $(this).find("li.current");
        if (current.length < 1) {
            $(this)
                .find("li:first")
                .addClass("current");
        }
        current = $(this)
            .find("li.current a")
            .attr("href");
        $(current).show();
    });

    // tab click
    $('ul.tabs a[href^="#"]').on("click", function(e) {
        e.preventDefault();
        var tabs = $(this)
            .parents("ul.tabs")
            .find("li");
        var tab_next = $(this).attr("href");
        var tab_current = tabs
            .filter(".current")
            .find("a")
            .attr("href");
        $(tab_current).hide();
        tabs.removeClass("current");
        $(this)
            .parent()
            .addClass("current");
        $(tab_next).show();
        history.pushState(null, null, window.location.search + $(this).attr("href"));
        return false;
    });

    // tab hashtag identification and auto-focus
    var wantedTag = window.location.hash;
    if (wantedTag != "") {
        var allTabs = $('ul.tabs a[href^=" + wantedTag + "]')
            .parents("ul.tabs")
            .find("li");
        var defaultTab = allTabs
            .filter(".current")
            .find("a")
            .attr("href");
        $(defaultTab).hide();
        allTabs.removeClass("current");
        $('ul.tabs a[href^=" + wantedTag + "]')
            .parent()
            .addClass("current");
        $("#" + wantedTag.replace("#", "")).show();
    }

    /*---------------------------------
    	Notice
    -----------------------------------*/
    $(".notice").on("click", "a.fa-times", function(e) {
        e.preventDefault();
        var notice = $(this).parents(".notice");
        $(this).hide();
        notice.fadeOut("slow");
    });

    /*------------------------------
    // Accordion
    ------------------------------*/
    $('.accordion > dd:not(.active)').hide();
    var allPanels = $('.accordion > dd');
    $('.accordion > dt > a').click(function() {
        $this = $(this);
        $target = $this.parent().next();

        if (!$target.hasClass('active')) {
            allPanels.removeClass('active').slideUp();
            $target.addClass('active').slideDown();
        }

        return false;
    });

    // Helpers
    $("input[type=checkbox]").addClass("checkbox");
    $("input[type=radio]").addClass("radio");
    $("input[type=file]").addClass("file");
    $("[disabled=disabled]").addClass("disabled");
    $("table").find("tr:even").addClass("alt");
    $("table").find("tr:first-child").addClass("first");
    $("table").find("tr:last-child").addClass("last");
});

function is_function(func) {
    return typeof window[func] !== 'undefined' && $.isFunction(window[func]);
}

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */
(function($) {
    "use strict";
    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null
        };
        var div = document.createElement('div'),
            ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
        div.className = 'fit-vids-style';
        div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

        ref.parentNode.insertBefore(div, ref);

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function() {
            var selectors = [
                "iframe[src*='player.vimeo.com']",
                "iframe[src*='www.youtube.com']",
                "iframe[src*='www.kickstarter.com']",
                "object",
                "embed"
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var $allVideos = $(this).find(selectors.join(','));

            $allVideos.each(function() {
                var $this = $(this);
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
})(jQuery);

/*
 HTML5 Shiv v3.6.2pre | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 Uncompressed source: https://github.com/aFarkas/html5shiv
*/
(function(l, f) {
    function m() {
        var a = e.elements;
        return "string" == typeof a ? a.split(" ") : a
    }

    function i(a) {
        var b = n[a[o]];
        b || (b = {}, h++, a[o] = h, n[h] = b);
        return b
    }

    function p(a, b, c) {
        b || (b = f);
        if (g) return b.createElement(a);
        c || (c = i(b));
        b = c.cache[a] ? c.cache[a].cloneNode() : r.test(a) ? (c.cache[a] = c.createElem(a)).cloneNode() : c.createElem(a);
        return b.canHaveChildren && !s.test(a) ? c.frag.appendChild(b) : b
    }

    function t(a, b) {
        if (!b.cache) b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag();
        a.createElement = function(c) {
            return !e.shivMethods ? b.createElem(c) : p(c, a, b)
        };
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/\w+/g, function(a) {
            b.createElem(a);
            b.frag.createElement(a);
            return 'c("' + a + '")'
        }) + ");return n}")(e, b.frag)
    }

    function q(a) {
        a || (a = f);
        var b = i(a);
        if (e.shivCSS && !j && !b.hasCSS) {
            var c, d = a;
            c = d.createElement("p");
            d = d.getElementsByTagName("head")[0] || d.documentElement;
            c.innerHTML = "x<style>article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
            c = d.insertBefore(c.lastChild, d.firstChild);
            b.hasCSS = !!c
        }
        g || t(a, b);
        return a
    }
    var k = l.html5 || {},
        s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        r = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        j, o = "_html5shiv",
        h = 0,
        n = {},
        g;
    (function() {
        try {
            var a = f.createElement("a");
            a.innerHTML = "<xyz></xyz>";
            j = "hidden" in a;
            var b;
            if (!(b = 1 == a.childNodes.length)) {
                f.createElement("a");
                var c = f.createDocumentFragment();
                b = "undefined" == typeof c.cloneNode ||
                    "undefined" == typeof c.createDocumentFragment || "undefined" == typeof c.createElement
            }
            g = b
        } catch (d) {
            g = j = !0
        }
    })();
    var e = {
        elements: k.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video",
        version: "3.6.2pre",
        shivCSS: !1 !== k.shivCSS,
        supportsUnknownElements: g,
        shivMethods: !1 !== k.shivMethods,
        type: "default",
        shivDocument: q,
        createElement: p,
        createDocumentFragment: function(a, b) {
            a || (a = f);
            if (g) return a.createDocumentFragment();
            for (var b = b || i(a), c = b.frag.cloneNode(), d = 0, e = m(), h = e.length; d < h; d++) c.createElement(e[d]);
            return c
        }
    };
    l.html5 = e;
    q(f)
})(this, document);