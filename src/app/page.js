"use client";
import { shuffle } from "@/utils/arrayUtilities";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import bluecar from "@/assets/images/blue-car.jpg";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "@/components/Booking.jsx";
import { CardList } from "@/components/CardList";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchVehicles = async () => {
    const res = await axios("/api/vehicle");

    setVehicles(shuffle(res.data).slice(0, 10));
  };

  const fetchCategories = async () => {
    const res = await axios("/api/category");

    setCategories(res.data);
  };

  useEffect(() => {
    fetchVehicles();
    fetchCategories();
  }, []);

  return (
    <div id="" className="">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      >
        <Booking />
      </motion.div>
      <Hero />
      <div className=" flex-wrap justify-center items-center gap-4 mt-20 hidden lg:flex">
        {categories.map((category) => {
          return <Category category={category} />;
        })}
      </div>
      <div className=" flex-wrap justify-center items-center gap-4 mt-20 flex lg:hidden">
        <Swiper slidesPerView={3}>
          {categories.map((category) => {
            return (
              <SwiperSlide>
                <Category category={category} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div>
        <p className="font-poppins text-4xl mb-2 text-center mt-24">
          Take a look to our fleet
        </p>
        <CardList vehicles={vehicles} />
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center gap-8">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        className="flex flex-col max-w-md gap-4 "
      >
        <p className="text-6xl font-bold font-secondary">
          <span className="tracking-widest ">INFINIT</span> Wheels,{" "}
          <span className="text-tertiary">Infinite</span> Journeys: Your Drive,
          Your Story.
        </p>
        <p>
          We provide the best cars for you to build your own story on wheels.
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
        }}
        className="w-full lg:w-[35%]"
      >
        <Image src={bluecar} className="rounded-lg" alt="bluecar" />
      </motion.div>
    </div>
  );
};

const Category = ({ category }) => {
  return (
    <Link
      href={`/fleet/${category.name}`}
      className="w-48 h-24 rounded-xl bg-cover bg-center relative 
      before:bg-black before:content-{''} before:w-full before:h-full before:absolute before:opacity-20"
      style={{
        backgroundImage: `url(${category.url})`,
      }}
    >
      <div
        className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 text-white"
        key={category.idcategory}
      >
        <p
          className="font-poppins text-lg font-bold capitalize shadow-md"
          style={{ textShadow: "-2px 2px 5px rgba(0,0,0,1)" }}
        >
          {category.name}
        </p>
      </div>
    </Link>
  );
};
