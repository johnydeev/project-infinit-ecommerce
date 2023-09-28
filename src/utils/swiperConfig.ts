
interface SwiperConfig {
  spaceBetween: number;
  slidesPerView: number;
  breakpoints: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
  autoplay: {
    delay: number;
    disableOnInteraction: boolean;
  };
}

const swiperConfig: SwiperConfig = {
  spaceBetween: 30,
  slidesPerView: 5,
  autoplay: {
    delay: 2000, // Adjust the delay according to your preference (in milliseconds)
    disableOnInteraction: false, // Allow autoplay to continue even on user interaction
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
};

export default swiperConfig;
