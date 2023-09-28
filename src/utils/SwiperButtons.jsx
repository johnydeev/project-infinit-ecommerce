import { useSwiper } from "swiper/react";
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai"
export const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex items-center gap-6 mt-10">
      <button
        onClick={() => {
          swiper.slidePrev();
        }}
        className="text-primary bg-tertiary hover:bg-primary transition-all duration-300 ease-in-out px-4 py-2 rounded-full"
      >
        <AiOutlineArrowLeft size={30}/>
      </button>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className="text-primary bg-tertiary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out px-4 py-2 rounded-full"
      >
        <AiOutlineArrowRight size={30}/>
      </button>
    </div>
  );
};
