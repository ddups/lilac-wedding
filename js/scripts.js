/*
* Author: Wisely Themes
* Author URI: http://themeforest.net/user/wiselythemes
* Theme Name: Lilac
* Version: 1.0.0
*/

/*jslint browser:true, devel: true, this: true */
/*global isDebug google, window, RichMarker, jQuery, mobileMenuTitle, hero100PercentHeight, twitter_username, contact_form_success_msg, contact_form_error_msg, c_days, c_hours, c_minutes, c_seconds, countdownEndMsg, friEvents, satEvents, sunEvents, bridesmaids, groomsmen, Waypoint, Freewall  */

var Lilac;

(function ($) {
    "use strict";

    $(document).ready(function () {

        Lilac = {

            isDebug: isDebug,
            initialized: false,
            mobMenuFlag: false,
            wookHandler: null,
            wookOptions: null,
            scrollPos: 0,
            sendingMail: false,
            mobileMenuTitle: mobileMenuTitle,
            hero100PercentHeight: hero100PercentHeight,
            twitter_username: twitter_username,
            contact_form_success_msg: contact_form_success_msg,
            contact_form_error_msg: contact_form_error_msg,
            c_days: c_days,
            c_hours: c_hours,
            c_minutes: c_minutes,
            c_seconds: c_seconds,
            countdownEndMsg: countdownEndMsg,
            friEvents: friEvents,
            satEvents: satEvents,
            sunEvents: sunEvents,
            bridesmaids: bridesmaids,
            groomsmen: groomsmen,
            amountOwed: 50,
            guestCount: 1,

            init: function () {

                var $tis = this;

                if ($tis.initialized) {
                    return;
                }

                $tis.initialized = true;
                $tis.build();
                $tis.events();
            },

            build: function () {

                var $tis = this;

                /**
                 * Preloader
                 */
                $tis.preloader();

                /**
                 * Navigation
                 */
                $tis.initNavigation();
                $tis.navigation();

                /**
                 * Dinamically create the menu for mobile devices
                 */
                $tis.createMobileMenu();

                /**
                 * Set the hero height to 100% of window height
                 */
                $tis.heroHeight();

                /**
                 * Create curved text
                 */
                $tis.curvedText();

                /**
                 * Activate placeholder in older browsers
                 */
                $('input, textarea').placeholder();

                /**
                 * Create the Hero background image grid
                 */
                $tis.initBgImages();
                $tis.bgImageGrid();

                /**
                 * Initialize Google Maps and populate with concerts locations
                 */
                // $tis.googleMap();
                $tis.initMap();

                /**
                 * Create schedule of events
                 */
                $tis.createSchedule();

                /**
                 * Create PrettyPhoto links
                 */
                $tis.createPrettyPhoto();

                /**
                 * Create Owl Sliders
                 */
                $tis.populateWeddingParty();

                /**
                 * Create Gallery
                 */
                // $tis.initGalleryThumbnails(83);
                // $tis.createGallery();
                $tis.createOwlSliders();

                /**
                 * Create Countdown
                 */
                $tis.countdown();

                 /**
                 * Initiate Parallax
                 */
                $tis.parallaxItems();

                /**
                 * Start NiceScroll
                 */
                $tis.startNiceScroll();

                /**
                 * Init RSVP form
                 */
                $tis.initRSVPForm();
            },

            events: function () {

                var $tis = this;

                /**
                 * Functions called on window resize
                 */
                $tis.windowResize();

                /**
                 * Resize embed videos
                 */
                $tis.resizeVideos();

                /**
                 * Contact form submit
                 */
                $tis.contactForm();

                /**
                 * Capture buttons click event
                 */
                $tis.buttons();

                /**
                 * Animate elements on scrolling
                 */
                $tis.animateElems();
            },

            preloader: function () {
                var isLoaded = setInterval(function () {
                    if (/loaded|complete/.test(document.readyState)) {
                        clearInterval(isLoaded);
                        $('#preloader').fadeOut(500);
                    }
                }, 10);
            },

            initNavigation: function () {
                let $home =
                    $('<li/>')
                        .append('<a href="#home">Home</a>');

                let $ourStory =
                    $('<li class="dropdown"/>')
                        .append('<a href="#our-story" >Our Story<b class="caret"></b></a>')
                        .append(
                            $('<ul class="dropdown-menu"/>')
                                .append('<li><a href="#photo-gallery">Photo Gallery</a></li>')
                        );

                let $theWedding =
                    $('<li class="dropdown"/>')
                        .append('<a href="#the-wedding" >The Wedding<b class="caret"></b></a>')
                        .append(
                            $('<ul class="dropdown-menu"/>')
                                .append('<li><a href="#the-venue">The Venue</a></li>')
                                .append('<li><a href="#accommodations">Accommodations</a></li>')
                                .append('<li><a href="#the-details">The Details</a></li>')
                                .append('<li><a href="#wedding-parties">Wedding Parties</a></li>')
                                .append('<li><a href="#gifts">Gift Registries</a></li>')
                        );

                let $rsvp =
                    $('<li/>')
                        .append('<a href="#rsvp">RSVP</a>');

                $('.nav.navbar-nav')
                    .append($home)
                    .append($ourStory)
                    .append($theWedding)
                    // .append($weddingParties)
                    .append($rsvp);
            },

            navigation: function () {

                $('.nav li a').on('click', function (event) {
                    var navActive = $(this),
                        scroll = 0;
					/*                                  ********TODO why is this commented?
					if ($.browser.mobile){
						$(".nav .dropdown-menu").attr('style', '');
					
						if (navActive.parent().hasClass("dropdown") && (!navActive.closest(".dropdown").hasClass("open") || !navActive.closest(".dropdown-menu").css('display') === 'block')) {
							event.preventDefault();
							return false;
						}
					}
					*/

                    if (navActive.attr('href').charAt(0) === "#") {
                        event.preventDefault();

                        if (navActive.attr('href') !== "#home") {
                            scroll = $(navActive.attr('href')).offset().top - 65;
                        }

                        $('html, body').stop().animate({
                            scrollTop: scroll
                        }, 1500, 'easeInOutExpo', function () {
                            navActive.blur();
							
							
							/*if ($.browser.mobile && navActive.closest(".dropdown").hasClass("open")){
								navActive.closest(".dropdown").removeClass("open").children("a:first").attr("aria-expanded", "false");
								navActive.closest(".dropdown-menu").css('display', 'none');
							}*/
                        });
                    } else {
                        window.open(navActive.attr('href'), "_self");
                    }
                });

                var sticky = new Waypoint.Sticky({
                    element: $('.nav-section')
                });

                sticky = sticky;

                $("#wrapper > section").waypoint({
                    handler: function (direction) {
                        var tis = $(this),
                            id = tis[0].element.id;

                        if (direction === "up") {
                            id = tis[0].element.previousElementSibling.id;
                        }

                        $(".nav a").removeClass("active");
                        $('nav a[href="#' + id + '"]').addClass("active");
                    },
                    offset: '50%'
                });

                $(window).load(function () {
                    var hash = location.hash.replace('#', '');

                    if (hash !== '') {
                        location.hash = '';
                        $('html, body').stop().animate({
                            scrollTop: $('#' + hash).offset().top - 65
                        }, 1500, 'easeInOutExpo');
                    }

                    sticky = new Waypoint.Sticky({
                        element: $('.nav-section')
                    });
                });
            },

            createMobileMenu: function (w) {

                var $tis = this,
                    $wrapper = $('#wrapper'),
                    $navMobile,
                    etype;

                if ($.browser.mobile) {
                    etype = 'touchstart';
                } else {
                    etype = 'click';
                }

                if (w !== null) {
                    w = $(window).innerWidth();
                }

                if (w <= 975 && !$tis.mobMenuFlag) {

                    $('body').prepend('<nav class="nav-mobile"><i class="fa fa-times"></i><h2><i class="fa fa-bars"></i>' + $tis.mobileMenuTitle + '</h2><ul></ul></nav>');

                    $('.nav-mobile > ul').html($('.nav').html());

                    $('.nav-mobile b').remove();

                    $('.nav-mobile ul.dropdown-menu').removeClass().addClass("dropdown-mobile");

                    $navMobile = $(".nav-mobile");

                    $("#nav-mobile-btn").on(etype, function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        setTimeout(function () {
                            $wrapper.addClass('open');
                            $navMobile.addClass('open');
                            $navMobile.getNiceScroll().show();
                        }, 25);

                        $(document).on(etype, function (e) {
                            if (!$(e.target).hasClass('nav-mobile') && !$(e.target).parents('.nav-mobile').length) {
                                $wrapper.removeClass('open');
                                $navMobile.removeClass('open');
                                $(document).off(etype);
                            }
                        });

                        $('>i', $navMobile).on(etype, function () {
                            $navMobile.getNiceScroll().hide();
                            $wrapper.removeClass('open');
                            $navMobile.removeClass('open');
                            $(document).off(etype);
                        });
                    });

                    $navMobile.niceScroll({
                        autohidemode: true,
                        cursorcolor: "#888888",
                        cursoropacitymax: "0.7",
                        cursorwidth: 10,
                        cursorborder: "0px solid #000",
                        horizrailenabled: false,
                        zindex: "1"
                    });

                    $navMobile.getNiceScroll().hide();

                    $tis.mobMenuFlag = true;

                    $('.nav-mobile li a').on('click', function (event) {
                        var navActive = $(this);
                        var scroll = 0;

                        if (navActive.attr('href') !== "#home") {
                            scroll = $(navActive.attr('href')).offset().top - 65;
                        }

                        $('html, body').stop().animate({
                            scrollTop: scroll
                        }, 1500, 'easeInOutExpo', function () {
                            navActive.blur();
                        });

                        $navMobile.getNiceScroll().hide();
                        $wrapper.removeClass('open');
                        $navMobile.removeClass('open');
                        $(document).off(etype);

                        event.preventDefault();
                    });
                }
            },

            heroHeight: function () {

                var $tis = this;

                if ($tis.hero100PercentHeight) {
                    $("#home").css({minHeight: $(window).innerHeight() + 'px'});

                    $(window).resize(function () {
                        $("#home").css({minHeight: $(window).innerHeight() + 'px'});
                    });
                }
            },

            initBgImages: function () {
                var $tis = this;
                let $freewall = $('#freewall');
                if ($freewall.length) {
                    let limitItem = 24;
                    let items = [];
                    for (var i = 1; i < limitItem; ++i) {
                        let localPath = 'file:///F:/Documents/Wedding%20Site/WeddingGalleryPics/{imageSrc}.jpg';
                        let prodPath = 'images/gallery/{imageSrc}.jpg';
                        let imgBase = $tis.isDebug ? localPath : prodPath;
                        let imgPath = imgBase.replace('{imageSrc}', `img (${i + 1})`);
                        items.push(
                            $('<div class="item"/>')
                                .append(`<img src="${imgPath}"/>`)
                        );
                    }

                    $.each(items.sort(function () { return 0.5 - Math.random() }), function (i, $item) {
                        $freewall.append($item);
                    });
                }
            },

            bgImageGrid: function () {

                if ($('#freewall').length) {
                    $("#freewall .item").each(function () {
                        var $item = $(this);
                        $item.width(Math.floor(260 + 200 * Math.random()));
                        let imgStr = $('>img', $item).attr('src');
                        $item.css('background-image', `url('${imgStr}')`);
                        $('>img', $item).remove();
                    });

                    $("#freewall").appendTo("#wrapper");

                    var wall = new Freewall("#freewall");
                    wall.reset({
                        selector: '.item',
                        animate: true,
                        cellW: 20,
                        gutterX: 0,
                        gutterY: 0,
                        onResize: function () {
                            wall.fitWidth();
                        }
                    });
                    wall.fitWidth();
                }
            },

            initMap: function() {
                let $theVenue = $('#the-venue .container').eq(0);
                let src = 'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJkYegvJ8Qs0wRNlkmMKc1RO4&key=AIzaSyB7VqycVSst6xsGOsbpgTpXAJESBrVKy-I';
            
                let $mapFrame = $(`<iframe class="map" src="${src}"/>`);
                $theVenue.append($mapFrame);
            
                let uluru =
                    { lat: 43.8148202, lng: -71.1444546 };
                let map = new google.maps.Map($mapFrame.get(0), {
                    zoom: 16,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            },

            createSchedule: function() {
                let $tis = this;
                let $schedule = $('#schedule').find('.timeline:first');
                
                $schedule.append($tis.createDayLabel('Friday'));
                $.each(friEvents, function (i, event) {
                    let side = i % 2 == 0 ? 'left' : 'right';
                    $schedule.append($tis.createEvent(event, side));
                });

                $schedule.append($tis.createDayLabel('Saturday'));
                $.each(satEvents, function (i, event) {
                    let side = i % 2 == 0 ? 'left' : 'right';
                    $schedule.append($tis.createEvent(event, side));
                });

                $schedule.append($tis.createDayLabel('Sunday'));
                $.each(sunEvents, function (i, event) {
                    let side = i % 2 == 0 ? 'left' : 'right';
                    $schedule.append($tis.createEvent(event, side));
                });

                /*
                <div class="timeline_footer">
                    <div class="punchline">And so the <span>Adventure<br>begins</span></div>
                </div>
                 */
                $schedule.append(
                    $('<div class="timeline_footer">')
                        .append('<div class="punchline">And then the real <span>Adventure<br>begins</span></div>')
                );
            },

            createDayLabel(day) {
                return $('<div/>')
                    .attr({
                        'class': 'year',
                        'data-animation-direction': 'from-top',
                        'data-animation-delay': '250',
                    })
                    .append(`<span class="ribbon">${day}</span>`);
            },

            createEvent(event, side) {
               let oppSide = side === 'right' ? 'left' : 'right';

               let $retDiv = $('<div/>')
                    .attr({
                        'class': `event_${side}`,
                        'data-animation-direction': `from-${oppSide}`,
                        'data-animation-delay': '250',
                    })
                    .append(
                        $('<div class="event_panel closed"/>')
                        // add a clock icon <i class="far fa-clock"></i>
                            .append(`<h3><small>${event.time}</small> | ${event.title}</h3>`)
                            .append(`<p>${event.text}</p>`)
                            .hover((event) => {
                                let $panel = $(event.target).closest('.event_panel');
                                if ($panel.hasClass('closed')) {
                                    $panel.removeClass('closed');
                                    $panel.find('p').slideToggle();
                                } else {
                                    $panel.find('p').slideToggle(() => $panel.addClass('closed'));
                                }
                            })
                    );

                return $retDiv;
            },

            getLatestTweets: function () {

                var $tis = this;

                $('.tweet').html('<div class="heartbeat"></div>');

                var twitterBox = document.createElement('div');
                twitterBox.setAttribute('id', 'twitter-box');

                $('body').append(twitterBox);

                $("#twitter-box").css({display: 'none'});

                try {
                    $("#twitter-box").tweet({
                        username: $tis.twitter_username,
                        modpath: 'twitter/',
                        count: 8,
                        loading_text: 'Loading tweets...',
                        template: '<h3>{screen_name}</h3><div class="info"><a href="http://twitter.com/{screen_name}" target="_blank">@{screen_name}</a> | <a href="http://twitter.com/{screen_name}/statuses/{tweet_id}/" target="_blank" class="time">{tweet_relative_time}</a></div><div>{text}</div>'
                    });
                } catch (err) {
                    console.log("Your twitter account is misconfigured. " + err);
                }

                var index = 0,
                    len = $(".tweet").length;

                $("#twitter-box li").each(function () {
                    if (index < len) {
                        $(".tweet").eq(index).html($(this).html());
                        index += 1;
                    } else {
                        return false;
                    }
                });

                $("#twitter-box").remove();
            },

            getInstagram: function () {

                var $tis = this;

                $('.instagram').html('<div class="heartbeat"></div>');

                $.ajax({
                    type: 'post',
                    url: 'instagram/instagram.php',
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (json) {
                        var feed = $.parseJSON(json),
                            len = $(".instagram").length,
                            index = 0,
                            feedLen = 0,
                            i = 0;

                        if (feed !== '' && feed.hasOwnProperty("data")) {
                            feedLen = feed.data.length;
                        }

                        while (i < feedLen) {
                            if (index < len) {
                                $(".instagram").eq(index).html('<img src="' + feed.data[i].images.standard_resolution.url + '" alt="" /><span><a href="' + feed.data[i].images.standard_resolution.url + '" data-gal="prettyPhoto[gallery]" title="' + feed.data[i].caption + '"><i class="fa fa-link"></i></a><a href="' + feed.data[i].link + '" target="_blank" title="View on Instagram"><i class="fa fa-external-link"></i></a></span>');
                                index += 1;
                            }
                            i += 1;
                        }

                        $tis.createPrettyPhoto();
                    },
                    error: function () {
                        console.log("Error getting Instagram feed");
                    }
                });
            },

            createPrettyPhoto: function () {

                $("a[data-gal^='prettyPhoto']").prettyPhoto({theme: 'lilac', hook: 'data-gal'});
            },

            createOwlSliders: function () {

                // if ($(".gallery-slider").length) {
                //     $(".gallery-slider").owlCarousel({
                //         dots: false,
                //         loop: true,
                //         autoplay: true,
                //         autoplaySpeed: 5000,
                //         autoplayHoverPause: true,
                //         margin: 10,
                //         itemsCustom: [
                //             [0, 1],
                //             [590, 2],
                //             [751, 2],
                //             [975, 3],
                //             [1183, 4],
                //             [1440, 5],
                //             [1728, 5]
                //         ]
                //     });
                // }

                if ($(".bridesmaids-groomsmen-slider").length) {
                    $(".bridesmaids-groomsmen-slider").owlCarousel({
                        itemsCustom: [
                            [0, 1],
                            [590, 2],
                            [751, 2],
                            [975, 3],
                            [1183, 4],
                            [1440, 4],
                            [1728, 4]
                        ],
                        nav: true
                    });
                }
            },

            populateWeddingParty: function () {
                let $tis = this;
                let localPath = 'file:///F:/Documents/Wedding%20Site/WeddingBioPhotos/{image}';
                let prodPath = 'images/bio-pics/{image}';
                let imgPath = isDebug ? localPath : prodPath;

                // loop over bridesmaids
                let delay = 50;
                let $bridesmaids = $('#bridesmaids-slider');
                $.each(bridesmaids, (i, b) => {
                    delay = (i < 4) ? delay + 200 : 0;
                    let image = imgPath.replace('{image}', `bridesmaids/${b.image}`);
                    $bridesmaids.append($tis.createBioElement(b.name, b.title, image, delay));
                });

                // loop over groomsmen
                delay = 50;
                let $groomsmen = $('#groomsmen-slider');
                $.each(groomsmen, (i, g) => {
                    delay = (i < 4) ? delay + 200 : 0;
                    let image = imgPath.replace('{image}', `groomsmen/${g.image}`);
                    $groomsmen.append($tis.createBioElement(g.name, g.title, image, delay));
                });
            },

            createBioElement: function(name, title, image, delay) {
                let animationDelay = delay ? ` data-animation-delay="${delay}"` : '';
                return $(`<div class="item" data-animation-direction="from-bottom" ${animationDelay}/>`)
                    .append(
                        $('<div class="image"/>')
                            .append($('<div class="info"/>')
                                .append($('<h3/>').text(name))
                                .append($('<span class="title"/>').text(title))
                            )
                            .append($(`<img src="${image}" alt=""/>`))
                    );
            },

            initGalleryThumbnails: function (numImages) {
                var $tis = this;
                let localPath = 'file:///F:/Documents/Wedding%20Site/WeddingGalleryPics/{image}.jpg';
                let prodPath = 'images/gallery/{image}.jpg';
                let imgBase = $tis.isDebug ? localPath : prodPath;
                let $gallery = $('#gallery-slider');
                let srcs = [];
                
                for (var i = 1; i <= numImages; i++) {
                    srcs.push(imgBase.replace('{image}', `img (${i})`));
                }
                
                srcs = srcs.sort(function () { return 0.5 - Math.random() });
                let lazyImg = 'images/lazy.jpg';
                for (var i = 0; i <= numImages; i++) {
                    let src = srcs[i];
                    $gallery.append($tis.createGalleryElement(src));
                }
            },

            createGalleryElement: function (image) {
                return $(`<div class="item" data-animation-direction="from-bottom"/>`)
                .append(
                    $('<div class="image"/>')
                        .append($('<div class="info"/>')
                            .append($('<h3/>').text("FUCK"))
                            .append($('<span class="title"/>').text("YOU"))
                        )
                        .append($(`<img src="${image}" alt=""/>`))
                );
            },

            createGallery: function () {
                let $gallery = $('#gallery');
                $gallery.flickity({
                    // options
                    cellAlign: 'center',
                    contain: true,
                    freeScroll: true,
                    wrapAround: true,
                    autoPlay: 5000,
                    pauseAutoPlayOnHover: false,
                    lazyLoad: 1,
                    pageDots : false
                });
                
                let flkty = $gallery.data('flickity');
                let $controlBar = $('.slideshow-controls');
                $controlBar.append(
                    $('<span/>')
                    .addClass('control')
                    .addClass('glyphicon')
                    .addClass('glyphicon-pause')
                    .attr('title', 'Pause Slideshow')
                    .on('click', function(){flkty.pausePlayer()})
                ).append(
                    $('<span/>')
                    .addClass('control')
                    .addClass('glyphicon')
                    .addClass('glyphicon-play')
                    .attr('title', 'Resume Slideshow')
                    .on('click', function(){flkty.playPlayer()})
                );
                // var $gallery = $(".gallery-scroller"),
                //     scrolling = false;

                // $(".gallery-right").on('click', function () {
                //     if (scrolling) {
                //         return false;
                //     }

                //     scrolling = true;
                //     $gallery.animate({scrollLeft: $gallery.scrollLeft() + 380}, function () {
                //         scrolling = false;
                //     });
                // });

                // $(".gallery-left").on('click', function () {
                //     if (scrolling) {
                //         return false;
                //     }

                //     scrolling = true;
                //     $gallery.animate({scrollLeft: $gallery.scrollLeft() - 380}, function () {
                //         scrolling = false;
                //     });
                // });

            },

            curvedText: function () {

                if ($(".curve").length) {
                    $('.curve').arctext({radius: 1000});

                    $(window).resize(function () {
                        $('.curve').arctext('set', {radius: 1000});
                    });
                }

                if ($(".curve2").length) {
                    $('.curve2').arctext({radius: 800, dir: -1});

                    $(window).resize(function () {
                        $('.curve2').arctext('set', {radius: 800, dir: -1});
                    });
                }
            },

            countdown: function (parent, date) {

                var $tis = this,
                    future = new Date(date),
                    counter,
                    $parent = $("" + parent);

                $parent.html('<div class="days"><span>' + $tis.c_days + '</span><div></div></div>' +
                        '<div class="hours"><span>' + $tis.c_hours + '</span><div></div></div>' +
                        '<div class="minutes"><span>' + $tis.c_minutes + '</span><div></div></div>' +
                        '<div class="seconds"><span>' + $tis.c_seconds + '</span><div></div></div>');

                function changeTime() {
                    var today = new Date(),
                        _dd = future - today;

                    if (_dd < 0) {
                        $parent.html('<div class="end">' + $tis.countdownEndMsg + '</div>');
                        clearInterval(counter);

                        return false;
                    }

                    var _dday = Math.floor(_dd / (60 * 60 * 1000 * 24) * 1),
                        _dhour = Math.floor((_dd % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1),
                        _dmin = Math.floor(((_dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1),
                        _dsec = Math.floor((((_dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);

                    $(".days > div", $parent).html(_dday);
                    $(".hours > div", $parent).html(_dhour);
                    $(".minutes > div", $parent).html(_dmin);
                    $(".seconds > div", $parent).html(_dsec);
                }

                counter = setInterval(changeTime, 1000);
            },

            parallaxItems: function () {

                if (!$.browser.mobile) {
                    $.stellar();
                } else {
                    $('.parallax').css({'background-position': '50% 50%', 'background-size': 'cover', 'background-attachment': 'scroll'});
                }
            },

            startNiceScroll: function () {

                $(document).ready(function () {
                    $(".gallery-scroller").niceScroll({
                        cursorcolor: '#fff',
                        cursorwidth: '0px',
                        background: '#fff',
                        cursorborder: '0px solid #1F2326',
                        zindex: '999',
                        autohidemode: false,
                        enablemousewheel: false,
                        touchbehavior: true
                    });
                });
            },

            initRSVPForm: function () {
                // add listners on button press
                $('#lodging-form').hide();
                $('#other-guest-form').hide();
                $('#staying-form').hide();
                $('#payment-info').hide();

                $('#attending-btn').click(function () {
                    $('#lodging-form').fadeIn();
                    $('#other-guest-form').fadeIn();
                    if ($('#staying-btn').hasClass('active')) {
                        $('#payment-info').show();
                    }
                });

                $('#not-attending-btn').click(function () {
                    $('#lodging-form').hide();
                    $('#other-guest-form').hide();
                    $('#payment-info').hide();
                });

                $('#staying-btn').click(function () {
                    $('#staying-form').fadeIn();
                    $('#payment-info').fadeIn();
                });

                $('#not-staying-btn').click(function () {
                    $('#staying-form').hide();
                    $('#payment-info').hide();
                });
            },
            
            windowResize: function () {

                var $tis = this;

                $(window).resize(function () {
                    var w = $(window).innerWidth();

                    $tis.createMobileMenu(w);
                });
            },

            resizeVideos: function () {

                var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='https://player.vimeo.com'], iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], object, embed"),
                    $fluidEl = $(".videoEmbed");

                $allVideos.each(function () {
                    var $el = $(this);
                    $el.attr('data-aspectRatio', $el.height() / $el.width()).removeAttr('height').removeAttr('width');
                });

                $(window).resize(function () {
                    var newWidth = $fluidEl.width();

                    $allVideos.each(function () {
                        var $el = $(this);
                        $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
                    });
                }).resize();
            },

            contactForm: function () {

                var $tis = this;

                $(".submit_form").on('click', function (e) {
                    e.preventDefault();

                    var $submit_btn = $(this),
                        $form = $submit_btn.closest("form"),
                        $fields = $("input, textarea, .radio-lilac", $form),
                        len = 0,
                        re = /\S+@\S+\.\S+/,
                        html = "contact",
                        error = false,
                        showError,
                        showSuccess,
                        stopSpin,
                        spinIcon = [];

                    $fields.each(function () {
                        var $field = $(this);

                        if ($field.attr('type') === "hidden") {
                            if ($field.hasClass('subject')) {
                                html += "&subject=" + $field.val();
                            } else if ($field.hasClass('fromName') || $field.hasClass('fromname')) {
                                html += "&fromname=" + $field.val();
                            } else if ($field.hasClass('fromEmail') || $field.hasClass('fromemail')) {
                                html += "&fromemail=" + $field.val();
                            } else if ($field.hasClass('emailTo') || $field.hasClass('emailto')) {
                                html += "&emailto=" + $field.val();
                            }
                        } else {
                            if ($field.hasClass('required') && $field.val() === "") {
                                $field.addClass('invalid');
                                error = true;
                            } else if ($field.attr('type') === "email" && $field.val() !== "" && re.test($field.val()) === false) {
                                $field.addClass('invalid');
                                error = true;
                            } else if ($field.attr('id') !== "recaptcha_response_field") {
                                $field.removeClass('invalid');
                                if ($field.hasClass('subject')) {
                                    html += "&subject=" + $field.val();
                                    html += "&subject_label=" + $field.attr("name");
                                } else if ($field.hasClass('fromName') || $field.hasClass('fromname')) {
                                    html += "&fromname=" + $field.val();
                                    html += "&fromname_label=" + $field.attr("name");
                                } else if ($field.hasClass('fromEmail') || $field.hasClass('fromemail')) {
                                    html += "&fromemail=" + $field.val();
                                    html += "&fromemail_label=" + $field.attr("name");
                                } else if ($field.hasClass('radio-lilac')) {
                                    html += "&field" + len + "_label=" + $field.data("value");
                                    html += "&field" + len + "_value=" + $('.active', $field).data("value");
                                    len += 1;
                                } else {
                                    html += "&field" + len + "_label=" + $field.attr("name");
                                    html += "&field" + len + "_value=" + $field.val();
                                    len += 1;
                                }
                            }
                        }
                    });

                    html += "&len=" + len;

                    showError = function () {
                        $submit_btn.width($submit_btn.width());

                        $('i', $submit_btn).each(function () {
                            var $icon = $(this),
                                iClass = $icon.attr("class");

                            $icon.removeClass(iClass).addClass('fa fa-times').delay(1500).queue(function (next) {
                                $(this).removeClass('fa fa-times').addClass(iClass);
                                next();
                            });
                        });

                        $submit_btn.addClass('btn-danger').delay(1500).queue(function (next) {
                            $(this).removeClass('btn-danger');
                            next();
                        });

                        $(".form_status_message").html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_error_msg + '</div>');
                    };

                    showSuccess = function () {
                        $submit_btn.width($submit_btn.width());

                        $('i', $submit_btn).each(function () {
                            var $icon = $(this),
                                iClass = $icon.attr("class");

                            $icon.removeClass(iClass).addClass('fa fa-check').delay(1500).queue(function (next) {
                                $(this).removeClass('fa fa-check').addClass(iClass);
                                next();
                            });
                        });

                        $submit_btn.addClass('btn-success').delay(1500).queue(function (next) {
                            $(this).removeClass('btn-success');
                            next();
                        });

                        $(".form_status_message").html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_success_msg + '</div>');
                    };

                    stopSpin = function () {
                        $('i', $submit_btn).each(function (i) {
                            var $icon = $(this);

                            $icon.removeClass('fa fa-cog fa-spin').addClass(spinIcon[i]);
                        });

                        $submit_btn.removeClass('disabled');
                    };

                    if (!error && !$tis.sendingMail) {
                        $tis.sendingMail = true;

                        $('i', $submit_btn).each(function (i) {
                            var $icon = $(this);

                            spinIcon[i] = $icon.attr("class");

                            $icon.removeClass(spinIcon[i]).addClass('fa fa-cog fa-spin');
                        });
                        $submit_btn.addClass('disabled');

                        $.ajax({
                            type: 'POST',
                            url: 'contact.php',
                            data: html,
                            success: function (msg) {
                                stopSpin();

                                if (msg === 'ok') {
                                    showSuccess();
                                    $form[0].reset();
                                } else {
                                    showError();
                                }

                                $tis.sendingMail = false;
                            },
                            error: function () {
                                stopSpin();

                                showError();
                                $tis.sendingMail = false;
                            }
                        });

                    } else {
                        showError();
                    }

                    return false;
                });
            },

            buttons: function () {
                var $tis = this;
                var first = true;

                $('.nav-logo, .scrollto').on('click', function (event) {
                    var navActive = $(this);
                    var scroll = 0;

                    event.preventDefault();

                    if (navActive.attr('href') !== "#home") {
                        scroll = $(navActive.attr('href')).offset().top - 65;
                    }

                    $('html, body').stop().animate({
                        scrollTop: scroll
                    }, 1500, 'easeInOutExpo', function () {
                        navActive.blur();
                    });
                });

                // Capture .bridesmaids-groomsmen-buttons Buttons click event.
                $(".bridesmaids-groomsmen-buttons .btn").on('click', function (e) {
                    e.preventDefault();

                    var t = $(this),
                        slider = t.data("slider");

                    if (!t.hasClass("active")) {
                        $(".bridesmaids-groomsmen-slider").addClass("hide").css({opacity: 0});

                        if (first) {
                            first = false;
                            $("#" + slider).removeClass("hide");
                        } else {
                            $("#" + slider).removeClass("hide").animate({opacity: 1}, 500);
                        }
                    }

                    $(".bridesmaids-groomsmen-buttons .btn").removeClass("active");
                    t.addClass("active");
                });

                // Capture custom radio buttons click event.
                $(".radio-lilac button").on('click', function (e) {
                    e.preventDefault();

                    var $t = $(this);

                    if ($t.hasClass("active")) {
                        return false;
                    }

                    $t.parent().find("button").removeClass("active");
                    $t.addClass("active");
                });

                /**************
                 * 
                 */

                $tis.updateAmountOwed();

                let oneNight = true;
                let linens = false;
                
                $('#one-night').click(() => {
                    if (!oneNight) {
                        let linens = $('#linen-yes').hasClass('active')
                            ? 15 : 0;
                        $tis.subtractAmount(50 + linens);
                        oneNight = true;
                    }
                });
        
                $('#two-nights').click(() => {
                    if (oneNight) {
                        let linens = $('#linen-yes').hasClass('active')
                            ? 15 : 0;
                        $tis.addAmount(50 + linens);
                        oneNight = false;
                    }
                });
        
                $('#linen-yes').click(() => {
                    if (!linens) {
                        let multiplier = $('#two-nights').hasClass('active') 
                            ? 2 : 1;
                        $tis.addAmount(15 * multiplier);
                        linens = true;
                    }
                });
        
                $('#linen-no').click(() => {
                    if (linens) {
                        let multiplier = $('#two-nights').hasClass('active') 
                            ? 2 : 1;
                        $tis.subtractAmount(15 * multiplier);
                        linens = false;
                    }
                });
        
                /*************
                 * 
                 */

                // Capture "Add guest" button click event.
                $(".add_button").on('click', function (e) {
                    e.preventDefault();

                    var $t = $(this),
                        $wrapper = $t.data("wrapper"),
                        html,
                        count = parseInt($("#" + $wrapper).data("count"), 10) + 1 || 1,
                        $input = $("#" + $t.data("input")),
                        val = $input.val();

                    if (val === "") {
                        $input.addClass("invalid");
                        return false;
                    }
                    $tis.guestCount++;
                    $tis.updateAmountOwed();
                    html = '<div class="input-group">' +
                            '<input type="text" class="form-control" name="' + $t.data("input") + '_' + count + '" value="' + val + '" />' +
                            '<span class="input-group-addon"><i class="fa fa-trash"></i></span>' +
                            '</div>';

                    $("#" + $wrapper).data("count", count).append(html);
                    $input.val('');
                    $input.removeClass("invalid");
                });

                // Capture "Remove guest" button click event.
                $('.add_list').on('click', '.input-group-addon', function () {
                    $(this).closest(".input-group").remove();
                    $tis.guestCount--;
                    $tis.updateAmountOwed();
                });
            },

            addAmount: function (amount) {
                this.amountOwed += amount;
                this.updateAmountOwed();
            },

            subtractAmount: function (amount) {
                this.amountOwed -= amount;
                this.updateAmountOwed();
            },

            updateAmountOwed: function () {
                let $tis = this,
                    amountOwed = $tis.amountOwed * $tis.guestCount;
                let href='http://www.paypal.me/EmmaAndDerekWedding/' + amountOwed;
                $('.amount-owed').text(amountOwed);
                $('#paypal-btn').attr('href', href);
                $('#form-amount-owed').attr('value', amountOwed);
            },

            animateElems: function () {

                if ($.browser.mobile) {
                    return false;
                }

                var animate = function () {
                    $('[data-animation-delay]').each(function () {
                        var $this = $(this),
                            s = $(window).scrollTop(),
                            h = $(window).height(),
                            d = parseInt($this.attr('data-animation-delay'), 10),
                            dir = $this.data('animation-direction');

                        if (dir === undefined) {
                            return false;
                        }

                        $this.addClass('animate-' + dir);

                        if (s + h >= $this.offset().top) {
                            if (isNaN(d) || d === 0) {
                                $this.removeClass('animate-' + dir).addClass('animation-' + dir);
                            } else {
                                setTimeout(function () {
                                    $this.removeClass('animate-me').addClass('animation-' + dir);
                                }, d);
                            }
                        }
                    });
                };

                if ($(window).innerWidth() >= 751) {
                    $(window).scroll(function () {
                        animate();
                    });

                    animate();
                }
            }
        };

        Lilac.init();
    });
}(jQuery));