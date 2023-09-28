"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/swiper-bundle.min.css";

import { useRouter } from "next/navigation";
import Image from "next/image";

import mock from "@/assets/images/mock.png";
import peugeot from "@/assets/images/peugeot.jpg";
import peugeot2 from "@/assets/images/peugeot-2.jpg";
import peugeot3 from "@/assets/images/peugeot-3.jpg";
import peugeot4 from "@/assets/images/peugeot-4.jpg";
import peugeot5 from "@/assets/images/peugeot-5.jpg";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { BiDirections } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import Calendar from "react-calendar";
import swiperConfig from "@/utils/swiperConfig";
import { Booking } from "@/components/Booking";
import Characterist from "./characterist";


const Detail = ({params}) => {
  const [vehicle, setVehicle] = useState({});
  const router = useRouter();
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const fetchVehicle = async () => {
    const res = await axios("/api/vehicle/"+params.plate);
    //mocking images until DB is ready
    if (!res.data.images || !res.data.images.length) {
      res.data.images = [
        {
          url: peugeot
        },
        {
          url: peugeot2
        },
        {
          url: peugeot3
        },
        {
          url: peugeot4
        },
        {
          url: peugeot5
        },
      ]
    }
    setVehicle(res.data);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const openGalleryModal = (imageId) => {
    setSelectedImageId(imageId);
    setGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setGalleryOpen(false);
  };
  return (
    <>
      {isGalleryOpen && (
        <GalleryModal
          images={vehicle.images}
          close={closeGalleryModal}
          selectedImageId={selectedImageId}
        />
      )}
      <div
        className={`flex flex-col gap-4 ${
          isGalleryOpen ? "opacity-10" : "opacity-100"
        }`}
        id="detail"
      >
        <div className="flex items-center justify-between">
          <p className="text-2xl font-poppins font-semibold capitalize">{vehicle.model?.brand?.name +'  ' + vehicle.model?.name + '  '+vehicle.plate}</p>
          {/* <button
            onClick={() => {
              router.back();
            }}
            // className="text-xl text-blue-700 hover:text-purple-600"
          >
            Go back
          </button> */}
        </div>

        <div className="bg-white rounded-lg w-full h-full shadow-lg py-8 p-4 md:px-12 space-y-8">
          <Booking />
          <Gallery
            isGalleryOpen={isGalleryOpen}
            openGalleryModal={openGalleryModal}
            closeGalleryModal={closeGalleryModal}
            setSelectedImageId={setSelectedImageId}
            images={vehicle.images || []}
          />

          <Specs />
          <div className="flex flex-col items-start gap-6">
            <p className="text-poppins text-2xl mt-10">Description</p>

            <p className="text-gray-400 text-xl">{vehicle.long_description}</p>
          </div>        
          <Characterist/>

        <div class="flex justify-end">
          <button
            onClick={() => {
              router.back();
            }}
            // className="text-xl text-blue-700 hover:text-purple-600"
            className="w-1/6 bg-primary text-white p-4 rounded-md hover:bg-secondary transition-all duration-200"
          >
            Go back
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

const Gallery = ({
  isGalleryOpen,
  openGalleryModal,
  closeGalleryModal,
  images,
  setSelectedImageId,
}) => {
  return (
    <div className={`relative ${isGalleryOpen ? "opacity-10" : "opacity-100"}`}>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {/* Main Image */}
        <div
          className="w-full hover:brightness-75 transition-all duration-200 self-stretch cursor-pointer"
          onClick={() => openGalleryModal(images[0]?.url)}
        >
          <Image
            className="object-contain rounded-lg"
            src={images[0]?.url}
            alt="spec"
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          <div className="lg:grid flex flex-row items-center lg:grid-cols-2 lg:grid-row-2 gap-4 justify-center w-full">
            {images?.slice(1, 5).map((image, key) => (
              <div
                className=" flex justify-center items-center hover:brightness-75 transition-all duration-200 cursor-pointer"
                onClick={() => openGalleryModal(image.id)}
              >
                <Image
                  key={key}
                  className=" rounded-lg object-contain"
                  src={image.url}
                  alt={`Image ${image.id}`}
                />
              </div>
            ))}
          </div>
          <button
            className="w-full bg-primary text-white p-4 rounded-md hover:bg-secondary transition-all duration-200"
            onClick={openGalleryModal}
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

const GalleryModal = ({ selectedImageId, images, close }) => {
  return (
    <div
      className=" w-[90%] absolute top-[40rem] lg:top-[25rem] left-[5%] z-10 bg-white md:p-2 rounded-md opacity-100"
      id="gallery"
    >
      <div className="relative ">
        <button
          className="absolute z-30 right-0 group bg-white rounded-md m-4"
          onClick={close}
        >
          <AiOutlineClose size={40} className="group-hover:text-red-600" />
        </button>
        <Swiper
          {...swiperConfig}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-full"
          initialSlide={images.findIndex(
            (image) => image.id === selectedImageId
          )}
        >
          {images.map((image) => {
            return (
              <SwiperSlide
                key={image.id}
                className="flex justify-center items-center h-full"
              >
                <Image
                  className=" pointer-events-none object-cover md:aspect-auto h-screen md:h-full"
                  src={image.url}
                  alt="spec"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

const Specs = ({ specifications }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row">
      {specifications?.map((spec, index) => {
        return (
          <div className="flex items-center gap-4" key={index}>
            <Image src={spec.image} alt="spec" />
            <p className="font-poppins text-lg">{spec.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
