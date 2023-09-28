"use client";
import { CardList } from "@/components/CardList";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Fleet() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(true); // Add showAll state

  const fetchVehicles = async () => {
    const res = await axios("/api/vehicle");
    setVehicles(res.data);
    setSelectedCategory(null); // Clear selected category when showing all
    setShowAll(true); // Set showAll to true
  };

  const fetchCategories = async () => {
    const res = await axios("/api/category");
    setCategories(res.data);
  };

  const fetchVehiclesByCategory = async (name) => {
    const res = await axios(`/api/category/${name}`);
    setSelectedCategory(name);
    setVehicles(res.data);
    setShowAll(false); // Set showAll to false when a category is selected
  };

  useEffect(() => {
    fetchVehicles();
    fetchCategories();
  }, []);

  return (
    <div className="">
      <div className="lg:flex hidden flex-wrap justify-center items-center gap-4 mt-20">
        {categories.map((category) => {
          return (
            <Category
              key={category.idcategory}
              category={category}
              fetchVehiclesByCategory={fetchVehiclesByCategory}
              selectedCategory={selectedCategory}
            />
          );
        })}
      </div>
      {/*    <div className=" flex-wrap justify-center items-center gap-4 mt-20 flex lg:hidden">
        <Swiper slidesPerView={3}>
          {categories.map((category) => {
            return (
              <SwiperSlide>
                <Category
                  key={category.idcategory}
                  category={category}
                  fetchVehiclesByCategory={fetchVehiclesByCategory}
                  selectedCategory={selectedCategory}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div> */}

       {selectedCategory && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          onClick={fetchVehicles}
        >
          View All
        </button>
      )}
      <CardList vehicles={vehicles} />
    </div>
  );
}

const Category = ({ category, fetchVehiclesByCategory, selectedCategory }) => {
  const isSelected = category.name === selectedCategory;

  return (
    <button
      className={`w-48 h-24 rounded-xl bg-cover bg-center relative   before:w-full before:h-full before:absolute before:opacity-20 ${
        isSelected ? "bg-blue-500" : "bg-gray-200"
      }`}
      style={{
        backgroundImage: `url(${category.url})`,
      }}
      onClick={() => fetchVehiclesByCategory(category.name)}
    >
      <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 text-white">
        <p
          className={`font-poppins text-lg font-bold capitalize shadow-md text-white`}
          style={{ textShadow: "-2px 2px 5px rgba(0,0,0,1)" }}
        >
          {category.name}
        </p>
      </div>
    </button>
  );
};
