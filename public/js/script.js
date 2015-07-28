! function(a) {
    "use strict";
    var b = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return b.Android() || b.BlackBerry() || b.iOS() || b.Opera() || b.Windows()
        }
    };
    a(document).ready(function() {
        function d() {
            a("#bars").on("click", function() {
                return 0 == a(".navigation").hasClass("nav-active") && a(".navigation").addClass("nav-active"), a("body").css({
                    overflow: "hidden"
                }), !1
            }), a("#bars-close").on("click", function() {
                return a(".navigation").hasClass("nav-active") && a(".navigation").removeClass("nav-active"), a("body").css({
                    overflow: "visible"
                }), !1
            }), a(".nav-l").closest("body").find(".bars").css({
                left: "15px",
                right: "auto"
            }), a(".nav-l").closest("body").find("#header .logo").css("margin-left", "50px")
        }

        function e() {
            a("#menu > li").each(function() {
                a(this).find("> ul").length && (a(this).append('<span><i class="fa fa-angle-down"></i></span>'), a(this).find("li").each(function() {
                    a(this).find("ul").length && a(this).append('<span><i class="fa fa-angle-right"></i></span>')
                }))
            }), a(".navigation ul li").each(function() {
                a(this).find("ul").length && a(this).addClass("menu-parent")
            })
        }

        function f() {
            var b = a(".navigation").data("menu-type"),
                d = window.innerWidth,
                e = a(".navigation"),
                f = a(".header");
            b > d ? (e.addClass("nav").removeClass("nav-desktop").closest(".header"), f.next().css("margin-top", 0), a(".bars, .bars-close, .logo-banner").show(), a(".navigation .sub-menu").each(function() {
                a(this).removeClass("left right")
            })) : (e.removeClass("nav").addClass("nav-desktop").closest(".header"), f.css("background-color", "#fff").find(".logo").css({
                opacity: "1",
                visibility: "visible"
            }), f.next().css("margin-top", a(".header").height()), a(".bars, .bars-close, .logo-banner").hide(), a(".navigation .sub-menu").each(function() {
                var b = a(this).offset().left,
                    d = a(this).width(),
                    e = c - (b + d);
                60 > e ? a(this).removeClass("left").addClass("right") : a(this).removeClass("right"), 60 > b ? a(this).removeClass("right").addClass("left") : a(this).removeClass("left")
            }))
        }

        function g() {
            var b = a("#menu"),
                d = parseInt(b.attr("data-responsive"), 10),
                e = c,
                f = a(".header");
            b.length && (d > 0 ? d >= e ? f.length && 0 == f.hasClass("header-responsive") && f.addClass("header-responsive") : (f.length && 1 == f.hasClass("header-responsive") && a(".header").removeClass("header-responsive"), a(".menu-active").removeClass("menu-active")) : alert("false"))
        }

        function h() {
            a(".navigation.nav .menu-parent").on("click", " > a", function() {
                var b = a(this);
                return 0 == b.parent().hasClass("active") ? (b.parent("li").addClass("active"), b.parent().find(">ul").slideDown()) : (b.parent("li").removeClass("active"), b.parent("li").find(">ul").slideUp()), !1
            })
        }

        function i() {
            var b = a(".dropdown-cn");
            b.each(function() {
                var d = a(this),
                    e = d.find(".current > a").text();
                d.find(".dropdown-head").prepend(e)
            }), b.on("click", function(b) {
                a(this).toggleClass("open"), b.stopPropagation()
            }), a(document).click(function() {
                b.removeClass("open")
            })
        }

        function j() {
            a(".select select").change(function() {
                var b = a(this),
                    c = b.parent(".select").find("span"),
                    d = b.find("option:selected").text();
                c.text(d)
            })
        }

        function k() {
            a(".form-field .field-input").on("keydown", function() {
                var b = a(this).parent(".form-field").find("label");
                0 == b.hasClass("forcus") && b.addClass("focus")
            }).on("keyup", function() {
                var b = a(this),
                    c = b.parent(".form-field").find("label");
                "" != b.val() ? 0 == c.hasClass("forcus") && c.addClass("focus") : c.removeClass("focus")
            })
        }

        function l() {
            a(".calendar-input,.calendar").datepicker({
            	minDate: 0; 
                showOtherMonths: !0,
                selectOtherMonths: !0,
                dayNamesMin: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sta"]
            })

            
        	
    	}

        function m() {
            if (a("#owl-magazine-ds").length) {
                a("#owl-magazine-ds").owlCarousel({
                    autoPlay: !1,
                    slideSpeed: 500,
                    navigation: !1,
                    pagination: !1,
                    mouseDrag: !1,
                    addClassActive: !0,
                    singleItem: !0,
                    afterAction: function() {
                        var b = a("#magazine-thum");
                        b.find(".active").removeClass("active"), b.find(".thumnail-item").eq(this.currentItem).addClass("active")
                    }
                });
                var b = a("#owl-magazine-ds").data("owlCarousel");
                a("#magazine-thum").on("click", ".thumnail-item", function() {
                    var c = a(this);
                    if (0 == c.hasClass("active")) {
                        var d = a(this).index();
                        c.parent("#magazine-thum").find(".active").removeClass("active"), c.addClass("active"), b.goTo(d)
                    }
                })
            }
        }

        function n() {
            var b = a(window).scrollTop();
            b > 100 ? 0 == a("#header").hasClass("header-stick") && (a("#header").addClass("header-stick"), a(".navigation.nav").closest("body").find("#header").find(".logo").css({
                opacity: "1",
                visibility: "visible"
            })) : (a("#header").removeClass("header-stick"), a(".navigation.nav").closest("body").find("#header").css("background-color", "transparent").find(".logo").css({
                opacity: "0",
                visibility: "hidden"
            }))
        }

        function o() {
            a(".price-slider").length && a(".price-slider").slider({
                min: 0,
                max: 1500,
                step: 1,
                range: !0,
                create: function() {
                    var d = a(this),
                        e = a(this).find(".range").attr("value").split(",");
                    d.slider("values", e), d.prepend("<label class='label-min'>$" + e[0] + "</label>"), d.append("<label class='label-max'>$" + e[1] + "</label>")
                },
                slide: function(b, c) {
                    var d = a(this),
                        e = c.values;
                    d.find(".label-min").text("$" + e[0]), d.find(".label-max").text("$" + e[1]), d.find(".range").attr("value", e)
                }
            })
        }

        function p() {
            a(".time-slider").length && a(".time-slider").slider({
                min: 0,
                max: 1440,
                step: 1,
                create: function() {
                    var d = a(this),
                        e = parseInt(d.attr("data-start"), 10),
                        f = parseInt(d.attr("data-end"), 10),
                        g = Math.floor(e / 60);
                    if (0 == isNaN(f)) {
                        d.slider("option", "range", !0), d.slider("values", [e, f]);
                        var h = Math.floor(f / 60),
                            i = q(h, f - 60 * h, !0),
                            j = q(g, e - 60 * g, !0);
                        d.prepend("<label class='label-min'>" + j + "</label>"), d.append("<label class='label-max'>" + i + "</label>"), d.find(".range").attr("value", j + "," + i)
                    } else {
                        var j = q(g, e - 60 * g, !1);
                        d.slider("value", e), d.slider("option", "range", "min"), d.append("<label class='label-max'>" + j + "</label>"), d.find(".range").attr("value", j)
                    }
                },
                slide: function(b, c) {
                    var f, g, h, i, j, d = a(this),
                        e = d.slider("option", "range");
                    1 == e ? (f = c.values, g = Math.floor(f[0] / 60), h = Math.floor(f[1] / 60), i = q(g, f[0] - 60 * g, !0), j = q(h, f[1] - 60 * h, !0), d.find(".label-min").text(i), d.find(".label-max").text(j), d.find(".range").attr("value", i + "," + j)) : (f = c.value, g = Math.floor(f / 60), i = q(g, f - 60 * g, !1), d.find(".label-max").text(i), d.find(".range").attr("value", i))
                }
            })
        }

        function q(a, b, c) {
            var g, d = a,
                e = b,
                f = "";
            return 1 == c ? (1 == d.length && (d = "0" + d), 10 > e && (e = "0" + e), 0 == e && (e = "00"), d >= 12 ? 12 == d ? (d = d, e = e, f = " PM") : (d -= 12, e = e, f = " PM", 12 == d && 0 == e && (d = 11, e = 59)) : (d = d, e = e, f = " AM"), 0 == d && (d = 12, e = e, f = " AM"), g = d + ":" + e + f) : (24 == d && 0 == e && (d = 23, e = "59"), 10 > e && (e = "0" + e), f = "m", g = d + "h " + e + f), g
        }

        function r() {
            function d() {
                var d = this.currentItem;
                c.find(".owl-item").removeClass("synced").eq(d).addClass("synced"), void 0 !== a("#slide-room-sm").data("owlCarousel") && e(d)
            }

            function e(a) {
                var b = c.data("owlCarousel").owl.visibleItems,
                    d = a,
                    e = !1;
                for (var f in b)
                    if (d == b[f]) var e = !0;
                0 == e ? d > b[b.length - 1] ? c.trigger("owl.goTo", d - b.length + 2) : (-1 == d - 1 && (d = 0), c.trigger("owl.goTo", d)) : d == b[b.length - 1] ? c.trigger("owl.goTo", b[1]) : d == b[0] && c.trigger("owl.goTo", d - 1)
            }
            var b = a("#slide-room-lg"),
                c = a("#slide-room-sm");
            b.owlCarousel({
                singleItem: !0,
                autoPlay: !1,
                slideSpeed: 1e3,
                navigation: !1,
                pagination: !1,
                transitionStyle: "fade",
                afterAction: d
            }), c.owlCarousel({
                slideSpeed: 1e3,
                mouseDrag: !1,
                navigation: !0,
                navigationText: ["<span class='prev-next-room prev-room'></span>", "<span class='prev-next-room next-room'></span>"],
                itemsCustom: [
                    [320, 3],
                    [480, 5],
                    [768, 6],
                    [992, 7],
                    [1200, 8]
                ],
                pagination: !1,
                afterInit: function(a) {
                    a.find(".owl-item").eq(0).addClass("synced")
                }
            }), a("#slide-room-sm").on("click", ".owl-item", function(c) {
                if (c.preventDefault(), a(this).hasClass("synced")) return !1;
                var d = a(this).data("owlItem");
                b.trigger("owl.goTo", d)
            })
        }

        function s() {
            a(".progress-rv").each(function() {
                var d = a(this).attr("data-value"),
                    e = 10 * d;
                a(this).append("<div style='width:" + e + "%'><span>" + d + "</span></div>")
            })
        }

        function t() {
            a(".post-slide").length > 0 && a(".post-slide").owlCarousel({
                autoPlay: 8e3,
                slideSpeed: 1e3,
                navigation: !0,
                pagination: !1,
                singleItem: !0,
                autoHeight: !0,
                transitionStyle: "fade",
                navigationText: ["<i class='fa  fa-angle-left'></i>", "<i class='fa  fa-angle-right'></i>"]
            })
        }

        function u() {
            a(".page-slide").length > 0 && a(".page-slide").owlCarousel({
                autoPlay: 1e4,
                slideSpeed: 1e3,
                navigation: !1,
                pagination: !0,
                singleItem: !0,
                autoHeight: !0,
                navigationText: ["<i class='fa  fa-angle-left'></i>", "<i class='fa  fa-angle-right'></i>"]
            })
        }

        function v() {
            a(".table-radio tbody tr").on("click", function() {
                var b = a(this);
                0 == b.hasClass("warning") && (b.parents(".table-radio").find(".warning").removeClass("warning"), b.addClass("warning"), b.find(".radio").prop("checked", !0))
            })
        }

        function w() {
            a(".scroll-table").length && (b.any() || a(".scroll-table").niceScroll({
                touchbehavior: !1,
                background: "#e2e2e2",
                cursoropacitymin: 1,
                cursorcolor: "#141414",
                ursoropacitymax: .6,
                cursorwidth: 5,
                cursorborder: "0px solid #fff",
                railalign: "right"
            }))
        }

        function x() {
            if (c >= 1200) {
                var b = a(window).scrollTop(),
                    d = a("#header").outerHeight();
                a(".detail-cn").each(function() {
                    var f = a(this),
                        g = f.offset().top,
                        h = f.outerHeight(),
                        i = f.find(".scroll-heading"),
                        j = i.outerHeight(),
                        k = b - g + d;
                    k > 0 ? h - k >= 0 && h - j > k ? i.css({
                        position: "fixed",
                        top: +d + "px"
                    }) : i.css({
                        position: "static"
                    }) : i.css({
                        position: "static"
                    })
                }), a(".scroll-heading a").on("click", function() {
                    var b = a(this).attr("href");
                    return a("html, body").stop().animate({
                        scrollTop: a(b).offset().top - 70
                    }, 1e3), !1
                })
            }
        }

        function y() {
            a(".bar-cl .fill").each(function() {
                var b = a(this),
                    c = b.attr("data-price"),
                    d = 100 * (c / 600);
                b.css({
                    height: d + "%"
                })
            }), a(".ul-bar li").on("click", ".bar-cl", function() {
                a(this).parents(".ul-bar").find(".active").removeClass("active"), a(this).parents("li").addClass("active")
            })
        }

        function z() {
            c > 1199 && a(".bg-parallax").length && a(".bg-parallax").each(function() {
                a(this).parallax("50%", .1)
            })
        }

        function B() {
            if (a("#hotel-maps").length) {
                var b, c = new google.maps.LatLngBounds,
                    d = {
                        zoom: 16,
                        scrollwheel: !1,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                b = new google.maps.Map(document.getElementById("hotel-maps"), d);
                var h, i, e = [
                        ["Bondi Beach", 41.0237, -73.701239],
                        ["Coogee Beach", 41.005615, -73.69566551],
                        ["Cronulla Beach", 40.9756737, -73.65614],
                        ["Manly Beach", 40.973478, -73.8433],
                        ["Maroubra Beach", 41.04579, -73.7464],
                        ["Maroubra Beach", 41.0563, -73.75618],
                        ["Maroubra Beach", 40.9442, -73.8554]
                    ],
                    f = [
                        ["                                        <div class='maps-item'>                                            <a href='#' class='maps-image'>                                                <img src='images/hotel/img-10.jpg' alt=''>                                            </a>                                            <div class='maps-text'>                                                <h2><a href='#'>The Cosmopolitan</a></h2>                                                <span>                                                    <i class='glyphicon glyphicon-star'></i>                                                    <i class='glyphicon glyphicon-star'></i>                                                    <i class='glyphicon glyphicon-star'></i>                                                    <i class='glyphicon glyphicon-star'></i>                                                    <i class='glyphicon glyphicon-star'></i>                                                </span>                                                <address>Great Cumberland Place, London W1H 7DL</address>                                                <p>My stay at cumberland hotel was amazing, loved the location, was close to all the major attraction.. <a href=''>view all 125 reviews</a>                                                </p>                                                <hr class='hr'>                                                <span class='price'>From-<ins>$345</ins>/night</span>                                            </div>                                        </div>                                    "]
                    ],
                    g = new google.maps.InfoWindow({
                        maxWidth: 600
                    }),
                    j = "images/icon-maker.png";
                for (i = 0; i < e.length; i++) {
                    var k = e[i],
                        l = new google.maps.LatLng(k[1], k[2]);
                    c.extend(l), h = new google.maps.Marker({
                        position: l,
                        map: b,
                        icon: j,
                        title: k[0]
                    }), google.maps.event.addListener(h, "click", function(a) {
                        return function() {
                            g.setContent(f[0][0]), g.open(b, a)
                        }
                    }(h, i)), b.fitBounds(c)
                }
            }
        }

        function C() {
            if (a("#contact-maps").length) {
                var b = a("#contact-maps"),
                    c = b.data("map-zoom"),
                    d = b.data("map-latlng").split(",")[0],
                    e = b.data("map-latlng").split(",")[1],
                    f = b.data("map-content"),
                    g = new google.maps.LatLng(d, e),
                    h = {
                        center: g,
                        zoom: c,
                        scrollwheel: !1,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    i = new google.maps.Map(document.getElementById("contact-maps"), h),
                    j = new google.maps.Marker({
                        position: g
                    });
                j.setMap(i);
                var k = new google.maps.InfoWindow({
                    content: f,
                    maxWidth: 200
                });
                google.maps.event.addListener(j, "click", function() {
                    k.open(i, j)
                })
            }
        }

        function D() {
            a("#contact-form").length > 0 && a("#contact-form").validate({
                rules: {
                    name: {
                        required: !0,
                        minlength: 2
                    },
                    email: {
                        required: !0,
                        email: !0
                    },
                    message: {
                        required: !0,
                        minlength: 10
                    }
                },
                messages: {
                    name: {
                        required: "Please enter your first name.",
                        minlength: a.format("At least {0} characters required.")
                    },
                    email: {
                        required: "Please enter your email.",
                        email: "Please enter a valid email."
                    },
                    message: {
                        required: "Please enter a message.",
                        minlength: a.format("At least {0} characters required.")
                    }
                },
                submitHandler: function(b) {
                    return a("#submit-contact").html("Sending..."), a(b).ajaxSubmit({
                        success: function(b) {
                            a("#contact-content").slideUp(600, function() {
                                a("#contact-content").html(b).slideDown(600), a(".submit-contact").html("Submit")
                            })
                        }
                    }), !1
                }
            })
        }
        var c = a(window).width();
        d(), g(), i(), j(), k(), l(), m(), o(), p(), r(), w(), y(), s(), t(), u(), v(), B(), C(), D(), a(window).load(function() {
            a("#preloader").fadeOut(1e3), f(), n(), e(), h(), z()
        }), a(window).resize(function() {
            f(), g()
        }), a(window).scroll(function() {
            n(), x()
        }), a(window).on("load resize", function() {
            var b = a(window).height();
            a(".page-not-found, .page-comingsoon").css("min-height", b);
            var c = a(".navigation").data("menu-type"),
                d = window.innerWidth,
                e = a(window).scrollTop();
            c > d && 100 > e && a(".header").css("background-color", "transparent").find(".logo").css({
                opacity: "0",
                visibility: "hidden"
            })
        })
    })
}(jQuery);