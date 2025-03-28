import Swiper, { Navigation, Pagination, EffectFade, Thumbs, Autoplay } from "swiper";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelectorAll("[data-slider]");
  const sliderWidthThumbs = document.querySelector("[data-slider-thumbs]");
  slider.forEach((el) => {
    createSlider(el);
  });
  createSliderWidthThumbs(sliderWidthThumbs);
});

function createSliderWidthThumbs(el) {
  const swiperThumbs = new Swiper(document.querySelector(".slider--control")?.querySelector(".swiper"), {
    modules: [Navigation],
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: document.querySelector(".slider--control")?.querySelector("[data-slider-next]"),
      prevEl: document.querySelector(".slider--control")?.querySelector("[data-slider-prev]")
    }
  });
  const swiperMain = new Swiper(el?.querySelector(".swiper"), {
    modules: [Thumbs],
    slidesPerView: "auto",
    spaceBetween: 30,
    thumbs: {
      swiper: swiperThumbs
    },
    breakpoints: {
      1200: {
        slidesPerView: 1
      }
    }
  });
}

function createSlider(el) {
  let swiper = Swiper;
  let init = false;
  const desktop = window.matchMedia("(min-width: 768px)");
  const mobile = window.matchMedia("(min-width: 0px) and (max-width: 768px)");
  const looped = el.querySelectorAll(".swiper-slide").length > 2;
  const loop = el.hasAttribute("data-loop");
  const wrapper = el.querySelector(".swiper-wrapper");
  const animate = el.hasAttribute("data-slider-animate");
  const slidesQuantity = parseInt(el.getAttribute("data-slider-slides"), 10);
  const slidesQuantityTab = parseInt(
    el.getAttribute("data-slider-slides-tab"),
    10
  );
  const slidesQuantityMob = parseInt(
    el.getAttribute("data-slider-slides-mob"),
    10
  );
  const pagination = el.querySelector("[data-slider-pagination]") || null;
  const desktopOnly = !!el.hasAttribute("data-slider-desktop");
  const mobileOnly = !!el.hasAttribute("data-slider-mobile");
  const effect = el.hasAttribute("data-slider-fade") ? "fade" : null;
  const timeline = document.querySelectorAll(".timeline__item");
  const articleHistory = document.querySelectorAll(".article-history");
  const infoSlides = el.querySelectorAll("[data-picture-info]") || null;
  const infoTitle = el.querySelector("[data-slider-title]") || null;
  const isAuto = el.hasAttribute("data-auto");

  function initSlider(el) {
    if (mobileOnly && mobile.matches) {
      if (!init) {
        init = true;
        swiper = callSlider(el);
      }
    } else if (mobileOnly && desktop.matches) {
      if (init) {
        swiper.destroy();
        swiper = undefined;
        wrapper.removeAttribute("style");
        init = false;
      }
    } else if (!desktopOnly || (desktopOnly && desktop.matches)) {
      if (!init) {
        init = true;
        swiper = callSlider(el);
      }
    } else if (desktopOnly && mobile.matches) {
      if (init) {
        swiper.destroy();
        swiper = undefined;
        wrapper.removeAttribute("style");
        init = false;
      }
    }
  }

  function callSlider(el) {
    return new Swiper(el.querySelector(".swiper"), {
      modules: [Navigation, Pagination, EffectFade, Thumbs, Autoplay],
      slidesPerView: slidesQuantity,
      spaceBetween: 30,
      slideVisibleClass: "slider__slide--visible",
      watchSlidesProgress: true,
      loop: !loop ? looped : false,
      effect: effect,
      dragging: true,
      autoHeight: false,
      autoplay: isAuto ? { delay: 3000 } : false,
      pagination: {
        el: pagination,
        clickable: true,
        type: "bullets",
        bulletClass: "bullet",
        bulletActiveClass: "bullet--active"
      },
      navigation: {
        nextEl: el.querySelector("[data-slider-next]"),
        prevEl: el.querySelector("[data-slider-prev]")
      },
      breakpoints: {
        1200: {
          slidesPerView: slidesQuantity || "auto",
          spaceBetween: 40
        },
        768: {
          slidesPerView: slidesQuantityTab || 2,
          spaceBetween: 20
        },
        320: {
          slidesPerView: slidesQuantityMob || "auto",
          spaceBetween: 15
        }
      },
      on: {
        init(swiper) {
          const currentIndex = swiper.realIndex;
          historyToggle(currentIndex);
          timelineToggle(currentIndex, swiper);
        },
        click(swiper) {
          const currentIndex = swiper.clickedIndex;
          historyToggle(currentIndex);
          timelineToggle(currentIndex);
          swiper.slideTo(currentIndex);
        },
        slideChange(swiper) {
          const currentIndex = swiper.realIndex;
          timelineToggle(currentIndex, swiper);
          historyToggle(currentIndex);
          changeInfo(currentIndex);
          if (animate) {
            const activeSlide = swiper.slides.filter(el => el.classList.contains("swiper-slide-next"));
            if (!activeSlide) return;
            const bubble = activeSlide[0].querySelector(".article-slide__detail");
            if (!bubble) return;
            const detailSlides = document.querySelectorAll(".article-slide__detail");
            detailSlides.forEach(temp => temp.classList.remove("animate"));
            bubble.classList.add("animate");
          }
        },
        snapGridLengthChange: function() {
          if (timeline.length > 0) {
            if (this.snapGrid.length != this.slidesGrid.length) {
              this.snapGrid = this.slidesGrid.slice(0);
            }
          }
        }
      }
    });
  }

  function changeInfo(currentIndex) {
    if (!infoTitle || !infoSlides) return;
    infoTitle.textContent = infoSlides[currentIndex].dataset.pictureInfo;
  }

  function timelineToggle(currentIndex, swiper) {
    if (timeline.length > 0) {
      timeline.forEach((item, idx) => {
        item.classList.remove("active");
        item.addEventListener("click", () => {
          timeline.forEach((item) => {
            item.classList.remove("active");
          });
          if (swiper) {
            swiper.slideTo(idx);
            item.classList.add("active");
            historyToggle(idx);
          }
        });
      });
      timeline.item(currentIndex).classList.add("active");
    }
  }

  function historyToggle(currentIndex) {
    if (articleHistory.length > 0) {
      articleHistory.forEach(el => el.classList.remove("active"));
      articleHistory.item(currentIndex).classList.add("active");
    }
  }

  initSlider(el);
  window.addEventListener("resize", () => {
    initSlider(el);
  });
}
