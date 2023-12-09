window.addEventListener("load", function (e) {
    let btnPlay = document.querySelector(".about-bottom__play");
    let video = document.querySelector("#about-bottom__video");
    /*header */
    let navbarIcon = document.querySelector(".header-mobile__bars-icon");
    let navbarContent = document.querySelector(
        ".header-mobile__navbar-content"
    );
    let navbarIconClosed = document.querySelector(
        ".header-mobile__navbar-icon-closed"
    );
    let overlay = document.querySelector(".header-mobile__overlay");

    navbarIcon.addEventListener("click", function (e) {
        e.preventDefault();
        navbarContent.classList.toggle("open");
        overlay.classList.add("open-modal");
    });

    navbarIconClosed.addEventListener("click", function (e) {
        e.preventDefault();
        navbarContent.classList.toggle("open");
        overlay.classList.remove("open-modal");
    });

    overlay.addEventListener("click", function (e) {
        e.preventDefault();
        navbarContent.classList.toggle("open");
        this.classList.toggle("open-modal");
    });

    /*our-services */
    const ourServicesSlide = document.querySelector(
        ".our-services-mobile__slider"
    ); // row
    const ourServicesItem = document.querySelectorAll(
        ".our-services-mobile__item"
    );
    const ourServicesDots = document.querySelectorAll(
        ".our-services__bottom-slide-dot"
    );

    carouselSlide(ourServicesSlide, ourServicesItem, ourServicesDots);

    /** the-person__slide */

    const thePersonSlide = document.querySelector(
        ".the-person-desktop__slider"
    ); // row
    const thePersonItem = document.querySelectorAll(
        ".the-person-desktop__item"
    );
    const thePersonDots = document.querySelectorAll(".the-person__slide-dot");

    carouselSlide(thePersonSlide, thePersonItem, thePersonDots);

    /*gallery */

    const gallerySlide = document.querySelector(".gallery__slider"); // row

    const galleryItem = document.querySelectorAll(".gallery__mobile-item");

    const galleryDots = document.querySelectorAll(".gallery__slide-dot");

    carouselSlide(gallerySlide, galleryItem, galleryDots);

    function carouselSlide(slide, slideItem, dotsBox) {
        let itemIndex = 0,
            intervalId;

        const autoSlide = () => {
            intervalId = setInterval(() => {
                slideImg(++itemIndex);
            }, 2000);
        };

        autoSlide();
        const slideImg = () => {
            itemIndex =
                itemIndex === slideItem.length
                    ? 0
                    : itemIndex < 0
                    ? slideItem.length - 1
                    : itemIndex;

            slide.style.transform = `translate(-${itemIndex * 100}%)`;

            if (!dotsBox[itemIndex].classList.contains("active")) {
                if (dotsBox[itemIndex - 1] === undefined) {
                    dotsBox[dotsBox.length - 1].classList.remove("active");
                } else {
                    dotsBox[itemIndex - 1].classList.remove("active");
                }
            }

            dotsBox[itemIndex].classList.add("active");
        };

        slide.addEventListener("mouseover", function (e) {
            console.log(e.target);
            clearInterval(intervalId);
        });

        slide.addEventListener("mouseleave", autoSlide);
    }

    let isClick = false;
    btnPlay.addEventListener("click", function (e) {
        if (e.target.closest(".about-bottom__play")) {
            if (video.paused) {
                video.play();
                btnPlay.style.opacity = 0;
                isClick = false;
            } else {
                video.pause();
                btnPlay.style.opacity = 1;
                isClick = true;
            }
        }
    });

    video.addEventListener("mouseover", function (e) {
        btnPlay.style.opacity = 1;
        video.style.cursor = "pointer";

        let timeOut;
        if (!isClick) {
            timeOut = setTimeout(function () {
                btnPlay.style.opacity = 0;
            }, 4500);
        }
        if (isClick) {
            clearTimeout(timeOut);
            btnPlay.style.opacity = 1;
        }
        if (video.ended) {
            clearTimeout(timeOut);
        }
    });

    video.addEventListener("mouseout", function (e) {
        btnPlay.style.opacity = 0;
        if (video.paused) {
            btnPlay.style.opacity = 1;
            isClick = true;
        }
    });

    video.addEventListener("click", function (e) {
        video.style.cursor = "pointer";
        if (video.paused) {
            video.play();
            btnPlay.style.opacity = 0;
            isClick = false;
        } else {
            video.pause();
            btnPlay.style.opacity = 1;
            isClick = true;
        }
    });

    /*_____________________________questions-client_____________________________ */

    function accordionFc() {
        let accordion = document.querySelectorAll(
            ".questions-client__accordion-btn"
        );

        if (accordion) {
            Array.from(accordion).forEach(function (item, index) {
                item.addEventListener("click", function (e) {
                    let panel = this.nextElementSibling;
                    let btnPlus = this.children;

                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                        panel.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "end",
                        });
                    }

                    Array.from(btnPlus).forEach(function (item) {
                        let iconPlus = item.children[0];
                        item.classList.toggle("active");
                        if (iconPlus.classList.contains("fa-plus")) {
                            iconPlus.classList.remove("fa-plus");
                            iconPlus.classList.add("fa-minus");
                        } else {
                            iconPlus.classList.remove("fa-minus");
                            iconPlus.classList.add("fa-plus");
                        }
                    });

                    this.classList.toggle("active");
                    this.parentNode.classList.toggle("active");
                });
            });
        }
    }

    accordionFc();
});
