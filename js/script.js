// pageloader
$(window).on('load', function () {
    $('.preloader').css('visibility', 'hidden').css('opacity', '0');
});

$(document).ready(function () {

    // nav related
    $('.settings-icon').click(function () {
        $(this).addClass('rotate-before');
    });

    $('.settings-icon').on('animationend', function () {
        $(this).removeClass('rotate-before');
    });

    mq();

    $(window).resize(mq);

    function mq() {
        if (window.matchMedia("(max-width: 991px)").matches) {
            $('#nav-container').removeClass('container').addClass('container-fluid');
        } else {
            $('#nav-container').removeClass('container-fluid').addClass('container');
        }
    }

    function checkScrollNPlaceSocials() {
        let scroll = $(window).scrollTop();
        if (scroll >= 600) {
            $(".socials").addClass("socials-right");
        }
        else {
            $(".socials").removeClass("socials-right");
        }
    }

    function checkForNavBg() {
        $('nav').toggleClass('nav-bg', $(this).scrollTop() > $('nav').height());
    }

    checkScrollNPlaceSocials();
    checkForNavBg();

    $(window).scroll(function () {
        // nav
        checkForNavBg();
        // socials
        checkScrollNPlaceSocials();
    });

    // settings & overlay 
    function settingsClick() {
        $('.overlay').toggleClass('overlay-visible');
        $('.settings-wrapper').toggleClass('settings-wrapper-visible');
    }

    $('.settings-icon').click(settingsClick);

    $('.overlay').click(settingsClick);

    const themeBgColors = ["#4ead68", "#8739fa", "#d763cd", "#888464", "#3986fa", "#e23655", "#b1767f", "#f85b38", "#2badad", "#9496a2", "#a04163", "rebeccapurple"];

    themeBgColors.forEach(function (value, index) {
        if (index === 0) {
            $('.theme-list').append(`
                <button class="active-theme"><span class="theme-color" style="background:${value}"></span></button>
            `);
        }
        else {
            $('.theme-list').append(`
                <button><span class="theme-color" style="background:${value}"></span></button>
            `);
        }
    });

    function changeCss(className, classValue) {
        // we need invisible container to store additional css definitions
        let cssMainContainer = $('#css-modifier-container');
        if (cssMainContainer.length == 0) {
            cssMainContainer = $('<div id="css-modifier-container"></div>');
            cssMainContainer.hide();
            cssMainContainer.appendTo($('body'));
        }

        // and we need one div for each class
        let classContainer = cssMainContainer.find('div[data-class="' + className + '"]');
        if (classContainer.length == 0) {
            classContainer = $('<div data-class="' + className + '"></div>');
            classContainer.appendTo(cssMainContainer);
        }

        // append additional style
        classContainer.html('<style>' + className + ' {' + classValue + '}</style>');
    }

    $('.theme-list button').click(function () {
        $('.active-theme').removeClass('active-theme');
        $(this).addClass('active-theme');
        let color = $(this).children().eq(0).css("background-color");
        $('.bg-theme').each(function () {
            $(this).css("background", color);
        });
        changeCss('.hover-theme:hover', `color:${color}!important`);
        changeCss('.white-hover-theme:hover', `color:${color}!important`);
        $('.fill-theme').each(function () {
            $(this).css("fill", color);
        });
        $('.color-theme').each(function () {
            $(this).css("color", color);
        });
        changeCss('.slick-dots .slick-active', `background: ${color}!important`);
    });

    $('.about-scroll-down').click(function () {
        $('.nav-item a')[1].click();
    });

    $('.nav-item').click(function () {
        $(this).children()[0].click();
    });

    // skrollr

    function checkSkrollr() {
        // Test here to check if on desktop / large screens.
        if ($(window).width() > 1024) {
            // Save the instance of Skrollr to the Window.
            window.skrollrInstance = skrollr.init({
                forceHeight: false,
                smoothScrolling: false
            });
            // If not on a large screen.
        } else {
            //  If Skrollr is NOT undefined, let's do the work.
            if (window.skrollrInstance !== undefined) {
                // Use Skrollr's destroy() method on the instance.
                window.skrollrInstance.destroy();
                // Now set the variable to be completely undefined.
                window.skrollrInstance = undefined;
            }
        }
    }

    checkSkrollr();
    $(window).resize(checkSkrollr);

    // slick
    $('.portfolio-wrapper').slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 3,
        appendDots: $('.dots-wrapper'),
        autoplay: true,
        autoplaySpeed: 15000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    const carouselItems = [
        {
            src: "img/movie.PNG",
            name: "Movie App",
            github: "https://github.com/FaridAliyev/Movie-App",
            link: "https://fa-movie.herokuapp.com/"
        },
        {
            src: "img/stitchfix.PNG",
            name: "Stitchfix",
            github: "https://github.com/FaridAliyev/Stitchfix",
            link: "https://stitchfixx.herokuapp.com/"
        },
        {
            src: "img/deals.PNG",
            name: "Deals Shop",
            github: "https://github.com/FaridAliyev/Deals-Shop",
            link: null
        },
        {
            src: "img/perivallo.PNG",
            name: "Perivallo",
            github: "https://github.com/FaridAliyev/Perivallo-Social-Media-App",
            link: null
        },
        {
            src: "img/eduhome.PNG",
            name: "Eduhome",
            github: "https://github.com/FaridAliyev/Eduhome-ASP.NET-Core-Project",
            link: null
        },
        {
            src: "img/fiorello.PNG",
            name: "Fiorello",
            github: "https://github.com/FaridAliyev/Fiorello-FrontEndProject",
            link: null
        },
        {
            src: "img/test-app.PNG",
            name: "Test App",
            github: "https://github.com/FaridAliyev/Test-App",
            link: "https://faridaliyev.github.io/Test-App/index.html"
        },
        {
            src: "img/portfolio.PNG",
            name: "Portfolio",
            github: "https://github.com/FaridAliyev/Portfolio-for-bro",
            link: "https://azeraliyev11.github.io/Portfolio/"
        },
    ];

    carouselItems.forEach(element => {
        if (element.link) {
            $('.portfolio-wrapper').slick('slickAdd', `
                <div class="carousel-item">
                    <div class="image">
                        <img src="${element.src}" draggable="false">
                    </div>
                    <div class="access">
                        <a href="${element.github}" class="white-hover-theme" target="_blank"><i class="uil uil-github"></i></a>
                        <a href="${element.link}" class="white-hover-theme" target="_blank"><i class="uil uil-external-link-alt"></i></a>
                        <span>${element.name}</span>
                    </div>
                </div>
            `);
        }
        else {
            $('.portfolio-wrapper').slick('slickAdd', `
                <div class="carousel-item">
                    <div class="image">
                        <img src="${element.src}" draggable="false">
                    </div>
                    <div class="access">
                        <a href="${element.github}" class="white-hover-theme" target="_blank"><i class="uil uil-github"></i></a>
                        <a class="disabled" target="_blank" title="Not Available"><i class="uil uil-external-link-alt"></i></a>
                        <span>${element.name}</span>
                    </div>
                </div>
            `);
        }
    });

    // skills

    const skillItems = [
        {
            name: "HTML",
            icon: `<i class="uil uil-html5"></i>`
        },
        {
            name: "CSS",
            icon: `<i class="fab fa-css3-alt"></i>`
        },
        {
            name: "SASS",
            icon: `<i class="fab fa-sass"></i>`
        },
        {
            name: "BOOTSTRAP",
            icon: `<i class="fa-brands fa-bootstrap"></i>`
        },
        {
            name: "JAVASCRIPT",
            icon: `<i class="fa-brands fa-js-square"></i>`
        },
        {
            name: "JQUERY",
            icon: null
        },
        // {
        //     name: "AJAX",
        //     icon: null
        // },
        {
            name: "REACT",
            icon: `<i class="fa-brands fa-react"></i>`
        },
        {
            name: "REDUX",
            icon: null
        },
        {
            name: "NPM",
            icon: `<i class="fab fa-npm"></i>`
        },
        {
            name: "GIT",
            icon: `<i class="fab fa-git-alt"></i>`
        },
        {
            name: "C#",
            icon: null
        },
        {
            name: "ASP.NET",
            icon: null
        },
        {
            name: "RESTful APIs",
            icon: `<i class="fa-solid fa-server"></i>`
        },
        {
            name: "MS SQL",
            icon: `<i class="fas fa-database"></i>`
        },
        // {
        //     name: "C",
        //     icon: null
        // },
        // {
        //     name: "C++",
        //     icon: null
        // },
    ]

    skillItems.forEach(function (value, index) {
        if (index % 2 === 0) {
            if (value.icon) {
                $('.skills-left').append(`<span class="color-theme">${value.icon} ${value.name}</span>`);
            }
            else {
                $('.skills-left').append(`<span class="color-theme">${value.name}</span>`);
            }
        }
        else {
            if (value.icon) {
                $('.skills-right').append(`<span class="color-theme">${value.icon} ${value.name}</span>`);
            }
            else {
                $('.skills-right').append(`<span class="color-theme">${value.name}</span>`);
            }
        }
    });

    // footer

    $('.btt-btn').click(function () {
        $(window).scrollTop(0);
    });
});