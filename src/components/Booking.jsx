import React, { useEffect, useContext, useState } from "react";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/swiper-bundle.min.css";
import Image from "next/image";
import { DatePicker } from "antd";
import Link from "next/link";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import swiperConfig from "@/utils/swiperConfig";

import honda from "../assets/images/honda-civic.png";

export const Booking = () => {
  const [modal, setModal] = useState(false);

  const [vehiclesModal, setVehiclesModal] = useState(false);

  const [vehicles, setVehicles] = useState([]);

  const [displayedVehicles, setDisplayedVehicles] = useState([]);
  const [showAllVehicles, setShowAllVehicles] = useState(false);

  const [locations, setLocations] = useState([{}]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const maxDisplayCount = showAllVehicles ? vehicles.length : 2;
    setDisplayedVehicles(vehicles.slice(0, maxDisplayCount));
  }, [vehicles, showAllVehicles]);

  useEffect(() => {
    if (!vehiclesModal) {
      setShowAllVehicles(false);
    }
  }, [vehiclesModal]);

  const hideModal = () => {
    setModal(false);
  };

  const [query, setQuery] = useState("");

  const [location, setLocation] = useState("");

  const searchLocations = (searchQuery) => {
    axios
      .get(`/api/location/${searchQuery}`)
      .then((res) => {
        setLocations(res.data);
        if (res.data.length > 0) {
          setModal(true);
        } else {
          setModal(false);
        }
      })
      .catch((error) => {});
  };
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === "") {
      setModal(false);
    } else {
      setModal(true);
      debounce(searchLocations(newQuery), 300);
    }
  };

  const filterVehicles = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    console.log("location :>> ", location.city);
    console.log("dates :>> ", startDate, endDate);

    let object = {
      city: location.city,
      startDate: startDate,
      endDate: endDate,
    };

    if (object.city == undefined) {
      Toast.fire({
        icon: "error",
        title: "You must enter a location",
      });
      return;
    }

    if (object.startDate == undefined || object.endDate == undefined) {
      Toast.fire({
        icon: "error",
        title: "You must enter a range of dates",
      });
      return;
    }

    axios
      .post("/api/dealer", object)
      .then((res) => {
        console.log("res.data.length :>> ", res.data.length);

        if (res.data.length > 0) {
          setVehicles(res.data);
          setVehiclesModal(true);
        } else {
          Toast.fire({
            icon: "error",
            title: "Cannot find vehicles in that location",
          });
        }
      })
      .catch((error) => {
        setVehiclesModal(false);
        Toast.fire({
          icon: "error",
          title: "Cannot find vehicles in that location",
        });

        console.error("Error: ", error);
      });
  };

  return (
    <>
      <div className="w-full p-6 bg-[#00243f] relative flex flex-col lg:flex-row items-center justify-around rounded-md shadow-md gap-4 mb-12">
        {/* Location */}
        {/* Location */}
        <div
          className="flex flex-col lg:flex-row items-center w-full relative "
          onClick={() => {
            searchLocations();
          }}
        >
          <div className="relative w-full">
            <label className="absolute left-12 uppercase text-gray-400 top-2 text-[10px] tracking-widest w-full">
              Origin
            </label>
            <button className="absolute top-5 left-3 group">
              <MdMyLocation className="group-hover:text-purple-600" size={25} />
            </button>
            <input
              type="text"
              placeholder={`Where are you from? Enter your city, state or country`}
              value={
                location
                  ? `${location.city}, ${location.state}, ${location.country}`
                  : query
              }
              className="w-full  shadow-md rounded-lg pl-12 text-sm  py-5 pt-7  border-r-[1px] border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800 "
              onChange={handleInputChange}
              onFocus={() => {
                setQuery("");
                setLocation("");
              }}
            />
          </div>

          {modal && (
            <Modal
              locations={locations}
              setLocation={setLocation}
              query={query}
              hideModal={hideModal}
            />
          )}
        </div>

        {/* Calendar */}

        <div className="flex flex-col lg:flex-row items-center w-full">
          <div className="relative w-full">
            <label className="absolute left-12 uppercase text-gray-400 top-2 text-[10px] tracking-widest">
              DATES
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="rounded-tl-md rounded-tr-md w-full rounded-b-none   lg:rounded-l-md lg:rounded-r-none p-5  outline-blue-800"
            />
          </div>

          <div className="relative w-full">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="w-full rounded-r-md rounded-l-md  lg:rounded-r-md  rounded-t-none p-5 border-gray-200 lg:rounded-l-none  text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
            />
          </div>
        </div>

        <button
          onClick={() => {
            filterVehicles();
          }}
          className="bg-white text-black font-bold py-4 rounded-lg w-full lg:w-[20%] hover:bg-gray-200 transition-all duration-200"
        >
          Continue
        </button>
      </div>

      <div>
        {vehiclesModal && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md shadow-md p-2 my-10"
          >
            <button
              className="hover:text-purple-700 p-2"
              onClick={() => {
                setVehiclesModal(false);
              }}
            >
              Close
            </button>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 grid-flow-row auto-rows-auto">
                {displayedVehicles.map((vehicle) => {
                  return (
                    <div className="flex flex-row-reverse justify-between p-2 shadow-md rounded-lg gap-6">
                      <div>
                        <Image
                          src={vehicle.images[0]?.url || honda}
                          width={200}
                          height={200}
                          className="w-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col justify-between w-full items-start">
                        <div className="flex flex-col">
                          <div className="flex items-start gap-1 font-bold text-lg">
                            <p className="text-start uppercase">
                              {vehicle.model?.brand?.name}
                            </p>
                            <p className="uppercase">{vehicle.model?.name}</p>
                            <p className="text-gray-400 font-semibold">
                              {vehicle.year}
                            </p>
                          </div>
                          <p className="font-poppins capitalize">
                            {vehicle.long_description}
                          </p>
                        </div>
                        <div className="flex items-end justify-between w-full">
                          <div>
                            <span className="font-semibold">
                              ${vehicle.price_per_day}
                            </span>
                            <span className="text-gray-400">/day</span>
                          </div>
                          <button className="bg-primary font-semibold text-white px-8 py-3 hover:bg-tertiary transition-all duration-300 ease-in-out rounded-md">
                            <Link href={`/vehicles/${vehicle.plate}`} passHref>
                              Details
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {!showAllVehicles && (
                <div className="text-center mt-4">
                  <button
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-tertiary"
                    onClick={() => setShowAllVehicles(true)}
                  >
                    View More
                  </button>
                </div>
              )}
            </div>

            <div className="block lg:hidden">
              <Swiper {...swiperConfig}>
                {vehicles.map((vehicle) => {
                  return (
                    <SwiperSlide className="">
                      <div className="flex w-screen flex-col justify-between p-2 shadow-md rounded-lg gap-6">
                        <div>
                          <Image
                            src={vehicle.images[0]?.url || honda}
                            width={500}
                            height={500}
                            className="w-full object-contain"
                          />
                        </div>

                        <div className="flex flex-col justify-between w-full items-start">
                          <div className="flex flex-col">
                            <div className="flex items-start gap-1 font-bold text-lg">
                              <p className="text-start">
                                {vehicle.model?.brand?.name}
                              </p>
                              <p>{vehicle.model?.name}</p>
                              <p className="text-gray-400 font-semibold">
                                {vehicle.year}
                              </p>
                            </div>
                            <p className="font-poppins">
                              {vehicle.long_description}
                            </p>
                          </div>
                          <div className="flex items-end justify-between w-full">
                            <div>
                              <span className="font-semibold">
                                ${vehicle.price_per_day}
                              </span>
                              <span className="text-gray-400">/day</span>
                            </div>
                            <button className="bg-primary font-semibold text-white px-8 py-3 hover:bg-tertiary transition-all duration-300 ease-in-out rounded-md">
                              <Link
                                href={`/vehicles/${vehicle.plate}`}
                                passHref
                              >
                                Details
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

const Modal = ({ locations, setLocation, query, hideModal }) => {
  return (
    <div className="absolute w-full top-20 bg-white shadow-md rounded-md z-30">
      <p className="p-2 bg-gray-200 font-poppins uppercase text-lg font-semibold">
        Results
      </p>
      <ul className="bg-white mt-2">
        {locations.map((location) => {
          const lowerCaseQuery = query.toLowerCase();
          const locationString = `${location.city}, ${location.state}, ${location.country}`;
          const startIndex = locationString
            .toLowerCase()
            .indexOf(lowerCaseQuery);

          if (startIndex === -1) {
            return null;
          }

          return (
            <li
              key={location.id}
              onClick={() => {
                console.log("Location clicked"); // Add this line
                setLocation(location);
                hideModal();
              }}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {locationString.substring(0, startIndex)}
              <span className="text-purple-600 font-bold">
                {locationString.substring(
                  startIndex,
                  startIndex + query.length
                )}
              </span>
              {locationString.substring(startIndex + query.length)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
