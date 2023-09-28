"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/swiper-bundle.min.css";
import swiperConfig from "@/utils/swiperConfig";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import { useRouter } from "next/navigation";
import Image from "next/image";

import mock from "@/assets/images/mock.png";
import peugeot from "@/assets/images/peugeot.jpg";
import peugeot2 from "@/assets/images/peugeot-2.jpg";
import peugeot3 from "@/assets/images/peugeot-3.jpg";
import peugeot4 from "@/assets/images/peugeot-4.jpg";
import peugeot5 from "@/assets/images/peugeot-5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faSquareShareNodes } from "@fortawesome/free-solid-svg-icons";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { BiDirections } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

import Calendar from "react-calendar";
import { Booking } from "@/components/Booking";
import Characterist from "./characterist";
import AvailabilityCalendar from "./AvailabilityCalendar";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { UserContext } from "@/components/context/UserContext";
import { Hidden } from "@mui/material";
import { toast } from "sonner";

const Detail = ({ params }) => {
  const [vehicle, setVehicle] = useState({});
  const router = useRouter();
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const { getUser } = useContext(UserContext)

  const handleShowMessage = (message) => {
    setMessageContent(message);
    setShowMessage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCloseMessage = () => {
    setShowMessage(false);
  };




  const fetchVehicle = async () => {
    const res = await axios("/api/vehicle/" + params.plate);
    //mocking images until DB is ready
    if (!res.data.images || !res.data.images.length) {
      res.data.images = [
        {
          url: peugeot,
        },
        {
          url: peugeot2,
        },
        {
          url: peugeot3,
        },
        {
          url: peugeot4,
        },
        {
          url: peugeot5,
        },
      ];
    }
    setVehicle(res.data);
  };


  const [reservations, setReservations] = useState([])
  const [hasReserved, setHasReserved] = useState(false)

  const fetchReservations = async () => {
    let user = (getUser() ||{})
    if(JSON.stringify(user) !== '{}'){
    axios.get(`/api/reservations/${user.id}`)
      .then(res => {
        setReservations(res.data.reservations)
      })
      .catch(err => console.log('Error trayendo reservations'));
  }}

  useEffect(() => userBooked(), [reservations]);

  const userBooked = () => {
    if (reservations.length >= 1) {
      reservations.forEach(reserv => {
        if (reserv.userIduser === getUser().id && reserv.vehicle.plate == params.plate) {
          console.log(reserv );
          setHasReserved(true)
        }
        return null;
      })
    }
  }

  useEffect(() => {
    fetchVehicle();
    fetchReservations()
  }, []);


  const [ratingAverage, setRatingAverage] = useState(0)

  useEffect(() => {
    let totalRating = 0
    if (!(vehicle.ratings === undefined) && vehicle.ratings.length >= 1) {
      vehicle.ratings.forEach((rate) => {
        totalRating += rate.rate
      })
      setRatingAverage(totalRating / vehicle.ratings.length)
      const radioElement = document.querySelector(`input[type="radio"][name="stars-main"][value="${Math.floor(totalRating / vehicle.ratings.length)}"]`);
      if (radioElement) {
        radioElement.checked = true;
      }
    }
  }, [vehicle])


  /* ----------------------------- Handlers policy ---------------------------- */

  const openGalleryModal = (imageId) => {
    setSelectedImageId(imageId);
    setGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setGalleryOpen(false);
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookUrl, "_blank");
    setMenuVisible(false);
  };

  const shareOnWhatsApp = () => {
    const textToShare =
      "¡Look this incredible vehicle to rent! " + window.location.href;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      textToShare
    )}`;
    window.open(whatsappUrl, "_blank");
    setMenuVisible(false);
  };
  return (
    <div>
      {isGalleryOpen && (
        <GalleryModal
          images={vehicle.images}
          close={closeGalleryModal}
          selectedImageId={selectedImageId}
        />
      )}
      <div
        className={`flex flex-col gap-4 ${isGalleryOpen ? "opacity-10" : "opacity-100"
          }`}
        id="detail"
      >
        <div className="flex items-center justify-between">
          <p className="text-2xl font-poppins font-semibold capitalize">
            {vehicle.model?.brand?.name +
              "  " +
              vehicle.model?.name +
              "  " +
              vehicle.plate}
          </p>

          <div className="ml-auto" style={{ position: "relative" }}>
            <button
              className="bg-primary text-white p-2 rounded-md hover:bg-secondary transition-all duration-200 fixed-share-button"
              onClick={toggleMenu}
              style={{ fontSize: "0.8rem" }}
            >
              <span style={{ marginRight: "0.5rem" }}>
                <FontAwesomeIcon icon={faSquareShareNodes} />
              </span>
              Share
            </button>

            {menuVisible && (
              <div
                className="flex items-end"
                style={{ position: "absolute", top: "100%", left: "0" }}
              >
                <button
                  onClick={shareOnFacebook}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 "
                >
                  <FontAwesomeIcon icon={faFacebook} className="mr-1" />
                </button>
                <button
                  onClick={shareOnWhatsApp}
                  className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 "
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-1" />
                </button>
              </div>
            )}
          </div>

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
          {/* <Booking /> */}
          <AvailabilityCalendar idvehicle={vehicle.idvehicle} />
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

            <p className="text-gray-400 text-xl capitalize">
              {vehicle.long_description}
            </p>
          </div>

          <Characterist />

          <Rating ratingAverage={ratingAverage} ratingsVehicle={vehicle.ratings || []} idvehicle={vehicle.idvehicle || []} hasReserved={hasReserved} />

          <div className="flex justify-end">
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


          <div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  handleShowMessage(
                    <div className="policy-list">
                      <div
                        className="relative flex flex-col justify-center content-center"
                        tabIndex="-1"
                      >
                        <button
                          onClick={() => setShowMessage(false)}
                          className=" absolute right-0 top-0"
                        >
                          <AiOutlineClose className="w-10 h-10" />
                        </button>
                        <h2 className="policy-title m-5">PRODUCT POLICES</h2>
                        <div className=" p-5 flex flex-row flex-wrap justify-around">
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Extended warranty:
                            </h3>
                            <p className="policy-description">
                              High-end cars often come with an extended warranty
                              that covers mechanical and electronic components
                              for a longer period than standard vehicles. This
                              can provide homeowners peace of mind and cover
                              costly repairs.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Roadside Assistance Programs:{" "}
                            </h3>
                            <p className="policy-description">
                              High-end cars often come with roadside assistance
                              programs that provide help in the event of
                              problems such as a dead battery, flat tires, or
                              the need to tow.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Genuine Parts Replacement Policy:{" "}
                            </h3>
                            <p className="policy-description">
                              Some manufacturers offer service packages that
                              cover regular maintenance for the first few years
                              of ownership. This can include oil changes,
                              inspections, and other maintenance tasks, making
                              life easier for the owner and ensuring the vehicle
                              is kept in top condition.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Access to Exclusive Events:{" "}
                            </h3>
                            <p className="policy-description">
                              High-end car owners can receive invitations to
                              exclusive events such as new model launches, track
                              driving events, and other brand-related events.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Premium Customer Service:
                            </h3>
                            <p className="policy-description">
                              High-end brands often offer a higher level of
                              customer service, including more personalized
                              treatment and access to dedicated service
                              representatives.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Special Financing Programs:{" "}
                            </h3>
                            <p className="policy-description">
                              Some manufacturers offer preferential interest
                              rates or exclusive financing programs for high-end
                              vehicles.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Continuous Upgrade Program:{" "}
                            </h3>
                            <p className="policy-description">
                              In an effort to keep our high-end vehicles at the
                              forefront of technology and performance, we offer
                              a continuous upgrade program. This allows owners
                              to trade in their current models for the latest
                              versions with an attractive discount. We want you
                              to always drive the latest and the best.
                            </p>
                          </div>
                          <div className="policy">
                            <h3 className="policy-subtitle">
                              Exclusive Driving Experience:{" "}
                            </h3>
                            <p className="policy-description">
                              As the owner of a high-end luxury car from our
                              brand, you will have exclusive access to unique
                              driving experiences. This includes track driving
                              events, exclusive scenic routes, and the
                              opportunity to test drive our newest models before
                              anyone else. We want you to fully enjoy your
                              driving experience.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                className="w-36 bg-primary text-white p-4 rounded-md hover:bg-secondary transition-all duration-200 mx-auto  autoFocus"
              >
                Policy product
              </button>
            </div>
            {showMessage && (
              <>
                <div className=" fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-50 bg-black w-screen h-screen z-30" />

                <div className=" absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/3 my-32 w-11/12 h-auto p-5 flex items-center justify-center  bg-white rounded-xl drop-shadow-lg  z-40">
                  <div className="w-full">{messageContent}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
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
            width={500}
            height={500}
            objectFit="cover"
            src={images[1]?.url}
            alt="spec"
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          <div className="lg:grid flex flex-row items-center lg:grid-cols-2 lg:grid-row-2 gap-4 justify-center w-full">
            {images?.slice(2, 6).map((image, key) => (
              <div
                className=" flex  justify-center items-center hover:brightness-75 transition-all duration-200 cursor-pointer"
                onClick={() => openGalleryModal(image.id)}
              >
                <Image
                  key={key}
                  className=" rounded-lg object-cover"
                  width={500}
                  objectFit="cover"
                  height={500}
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
                  width={500}
                  height={500}
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
            <Image
              src={spec.image}
              alt="spec"
              layout="fill"
              objectFit="contain"
            />
            <p className="font-poppins text-lg">{spec.description}</p>
          </div>
        );
      })}
    </div>
  );
};

const Rating = ({ ratingAverage, ratingsVehicle, idvehicle, hasReserved }) => {
  const { getUser } = useContext(UserContext)

  const [ratings, setRatings] = useState(ratingsVehicle)
  useEffect(() => {
    setRatings(ratingsVehicle)
  }, [ratingsVehicle])

  let [totalAverage, setTotalAverage] = useState(ratingAverage || 0)


  const user = (getUser()||{})

  const [count1Star, setCount1Star] = useState(0)
  const [count2Star, setCount2Star] = useState(0)
  const [count3Star, setCount3Star] = useState(0)
  const [count4Star, setCount4Star] = useState(0)
  const [count5Star, setCount5Star] = useState(0)

  const [ratingObj, setRatingObj] = useState({})

  const [anyOtherRv, setAnyOtherRv] = useState(false)


  useEffect(() => {
    setCount1Star(ratings?.filter(rate => rate.rate === 1).length)
    setCount2Star(ratings?.filter(rate => rate.rate === 2).length)
    setCount3Star(ratings?.filter(rate => rate.rate === 3).length)
    setCount4Star(ratings?.filter(rate => rate.rate === 4).length)
    setCount5Star(ratings?.filter(rate => rate.rate === 5).length)
    setRatingObj(ratings.find((rat) => rat.iduser === user.id))
    setTotalAverage(ratingObj ? (ratingAverage !== 0 ? (ratingAverage + ratingObj.rate) / 2 : ratingObj.rate) : ratingAverage)

    setAnyOtherRv((ratings.find((rat) => rat.iduser !== user.id)) ? true : false)

  }, [ratings])



  const [showModal, setShowModal] = useState(false)
  const [userRatingSelected, setUserRatingSelected] = useState(0)


  const handlerRating = (value) => {
    //* Si el usuario no probo este auto, no puede mostrar el modal
    setShowModal(!showModal)
    setUserRatingSelected(value)
  }

  const handlerDelete = () => {
    axios.delete(`/api/rating/${user.id}/vehicle/${idvehicle}`).then((response) => {
      setTimeout(() => {
        location.reload()
      }, 300);
    })

    
  }
  /* -------------------------------------------------------------------------- */
  /*                              paged for ratings                             */
  /* -------------------------------------------------------------------------- */

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Rating</h3>
      <ModalRate showModal={showModal} setShowModal={setShowModal} userRating={userRatingSelected} vehicleID={idvehicle} setRatingObj={setRatingObj} setRatings={setRatings} ratings={ratings} />
      <div className="flex justify-around lg:flex-row flex-col ">
        <div className="lg:w-5/12 w-full 2xl:p-5 p-4 shadow-xl rounded-xl">
          <div>
            <div className="flex items-center my-4 text-center sm:text-left">
              <p className="text-7xl font-bold mr-4">{totalAverage}</p>
              <div>
                <div className="flex lg:my-4 my-2">
                  {(() => {
                    const stars = [];
                    let counterStars = totalAverage
                    for (let i = 0; i < 5; i++) {
                      if (counterStars > 1) {
                        counterStars--
                        stars.push(<BsStarFill className='text-yellow-300 text-2xl ' key={i} />);
                      } else if (counterStars >= 0.1 && counterStars <= 0.9) {
                        counterStars = Math.floor(counterStars)
                        stars.push(<BsStarHalf className='text-yellow-300 text-2xl ' key={i} />);
                      } else {
                        stars.push(<BsStar className='text-yellow-300 text-2xl' key={i} />);
                      }
                    }
                    return stars
                  })()}
                </div>
                <p className="text-slate-700">Total reviews {ratings.length}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 p-2">
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-base flex items-center font-bold text-primary">1 <BsStarFill /> </span>
                <span className="text-sm font-medium text-primary">
                  {count1Star}
                </span>
              </div>
              <div className="w-full  rounded-full h-2.5 bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(count1Star * 100) / ratings.length || 0}%` }}></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-base flex items-center font-bold text-primary">2 <BsStarFill /> </span>
                <span className="text-sm font-medium text-primary">{count2Star}</span>
              </div>
              <div className="w-full  rounded-full h-2.5 bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(count2Star * 100) / ratings.length || 0}%` }}></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-base flex items-center font-bold text-primary">3 <BsStarFill /> </span>
                <span className="text-sm font-medium text-primary">{count3Star}</span>
              </div>
              <div className="w-full  rounded-full h-2.5 bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(count3Star * 100) / ratings.length || 0}%` }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-base flex items-center font-bold text-primary">4 <BsStarFill /> </span>
                <span className="text-sm font-medium text-primary">{count4Star}</span>
              </div>
              <div className="w-full  rounded-full h-2.5 bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(count4Star * 100) / ratings.length || 0}%` }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-base flex items-center font-bold text-primary">5 <BsStarFill /> </span>
                <span className="text-sm font-medium text-primary">{count5Star}</span>
              </div>
              <div className="w-full  rounded-full h-2.5 bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(count5Star * 100) / ratings.length || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <Slider {...settings} className=" lg:w-5/12 w-full  lg:m-0 mt-10 rounded-xl flex flex-col justify-center slider-rating " >
          {ratings.length >= 1 &&
            <>
              {ratings.map((oneRating) => {
                if (!(oneRating.iduser === user.id)) {
                  return (
                    <div className="relative h-full p-7 rounded-xl lg:text-xl text-lg ">
                      <p className="absolute right-5 top-5 text-sm text-slate-500 ">{oneRating.date.slice(0, 10)}</p>
                      <h1 className="text-black font-bold my-2">{oneRating.user.first_name + ' ' + oneRating.user.last_name}</h1>
                      <div className="flex lg:my-4 my-2">
                        {(() => {
                          const stars = [];
                          for (let i = 0; i < oneRating.rate; i++) {
                            stars.push(<BsStarFill className='text-yellow-300' key={i} />);
                          }
                          return stars
                        })()}
                      </div>
                      <p>{oneRating.description}</p>
                    </div>
                  )
                }
              })}

            </>
          }
          {(!anyOtherRv && ratingObj) && <div className='text-center justify-center content-center w-full p-10 font-medium text-xl opacity-50'> Others have not yet shared their experiences!</div>}
          {(!anyOtherRv && !ratingObj && hasReserved) && <div className={`text-center justify-center content-center w-full p-10 font-medium text-xl opacity-50`}> Be the first to share your review!</div>}
          {(!anyOtherRv && !ratingObj && !hasReserved) && <div className={`text-center justify-center content-center w-full p-10 font-medium text-xl opacity-50`}> Not qualified yet :(</div>}
        </Slider>
      </div>

      {hasReserved &&
        <div className="w-full lg:w-11/12 p-8 shadow-xl rounded-xl self-center mt-10">
          {!(ratingObj === undefined)
            ?
            <div className="relative">
              <div className="relative  p-5 rounded-xl lg:text-xl text-lg ">
                <p className="absolute right-5 top-5 text-sm text-slate-500 ">{ratingObj.date?.slice(0, 10)}</p>
                <h1 className="text-black font-bold my-2">{user?.name}</h1>
                <div className="flex lg:my-4 my-2">
                  {(() => {
                    const stars = [];
                    for (let i = 0; i < ratingObj.rate; i++) {
                      stars.push(<BsStarFill className='text-yellow-300' key={i} />);
                    }
                    return stars
                  })()}
                </div>
                <p>{ratingObj.description}</p>
              </div>
              <AiFillDelete className="absolute bottom-0 right-0 text-xl text-primary" onClick={handlerDelete}/>
            </div>
            :
            <div className="flex flex-col w-full ">
              <h3 className="font-medium text-lg">Rate your experience!</h3>
              <form className={`rating self-center my-2 sm:text-5xl text-4xl`}>
                <label>
                  <input type="radio" name="stars-main" value="1" onClick={() => { handlerRating(1) }} />
                  <span className="icon"><BsStarFill /></span>
                </label>
                <label>
                  <input type="radio" name="stars-main" value="2" onClick={() => { handlerRating(2) }} />
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                </label>
                <label>
                  <input type="radio" name="stars-main" value="3" onClick={() => { handlerRating(3) }} />
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                </label>
                <label>
                  <input type="radio" name="stars-main" value="4" onClick={() => { handlerRating(4) }} />
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                </label>
                <label>
                  <input type="radio" name="stars-main" value="5" onClick={() => { handlerRating(5) }} />
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                  <span className="icon"><BsStarFill /></span>
                </label>
              </form>
            </div>
          }
        </div>}
    </div>
  )
}

const ModalRate = ({ showModal, setShowModal, userRating, vehicleID, setRatingObj, setRatings, ratings }) => {

  const [selectedRating, setSelectedRating] = useState(userRating);
  useEffect(() => {
    setSelectedRating(userRating);
  }, [userRating])

  const [detail, setDetail] = useState('')
  const { getUser } = useContext(UserContext)
  const user = getUser()

  function getFormattedDateAndTime() {
    const date = new Date();
    const offset = date.getTimezoneOffset() * -1;
    const offsetHours = Math.floor(offset / 60);
    const offsetMinutes = offset % 60;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const offsetString = `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(Math.abs(offsetMinutes)).padStart(2, '0')}`;
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetString}`;
    return formattedDate;
  }

  const [errDetail, setErrDetail] = useState(false)
  const hanlderPostReview = async (e) => {
    e.preventDefault()
    console.log(selectedRating);


    let objetRating = {
      date: getFormattedDateAndTime(),
      description: detail,
      iduser: user.id,
      rate: +selectedRating,
      user: {
        iduser: user.id,
        name: user.name
      }
    }

    if(detail.length >= 1 && detail){
    toast.promise(axios.post(`/api/rating/${user.id}/vehicle/${vehicleID}`, {
      rate: selectedRating,
      date: getFormattedDateAndTime(),
      description: detail
    }),{
      loading: "Loading...",
      success: (data) => {

        setErrDetail(false)
        setRatings([...ratings, objetRating])
        setRatingObj(objetRating)
        setShowModal(false)
  
        return `Post has been created successfully`;
      },
      error: "Error while creating post"}
      )}else{
      setErrDetail(true)
    }
  }

  useEffect(() => {
    const radioElement = document.querySelector(`input[type="radio"][name="stars-modal"][value="${userRating}"]`);
    if (radioElement) {
      radioElement.checked = true;
    }
  }, [showModal])



  return (
    <div className={`${showModal ? 'flex' : 'hidden'}`}>
      <div
        className={`fixed inset-0 z-30 bg-gray-500 bg-opacity-75 transition-opacity ${showModal ? "flex" : "hidden"
          }`}
        id="modalBg"
      ></div>
      <div className={` z-50 min-h-full  justify-center items-center p-0 fixed inset-0 ${showModal ? "flex" : "hidden"
        }`} >
        <div className={`flex flex-col items-center m-5 px-10 pb-17 p-10 max-w-2xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 relative`}>
          <button className="absolute top-0 right-0 m-5" onClick={() => setShowModal(false)}><AiOutlineClose className="w-5 h-5" /></button>
          <h1 className="font-bold text-2xl">How did you find the service?</h1>
          <form className="flex flex-col items-center">
            <div className="ratingModal">
              <label>
                <input type="radio" name="stars-modal" value="1" onChange={() => setSelectedRating(1)} />
                <span className="iconModal"><BsStarFill /></span>
              </label>
              <label>
                <input type="radio" name="stars-modal" value="2" onChange={() => setSelectedRating(2)} />
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
              </label>
              <label>
                <input type="radio" name="stars-modal" value="3" onChange={() => setSelectedRating(3)} />
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
              </label>
              <label>
                <input type="radio" name="stars-modal" value="4" onChange={() => setSelectedRating(4)} />
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
              </label>
              <label>
                <input type="radio" name="stars-modal" value="5" onChange={() => setSelectedRating(5)} />
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
                <span className="iconModal"><BsStarFill /></span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 text-center">
                Describe us your experience!
              </label>
              <div className="w-full max-w-sm mx-auto">
                <textarea
                  id="detailInput"
                  className= {`block mt-2 h-full w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ${errDetail?'ring-red-500':''} focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300 `}
                  placeholder="Write here..."
                  value={detail}
                  onChange={() => setDetail(event.target.value)}
                ></textarea>
              {errDetail&&<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> It can't be empty!</span>}
              </div>
            </div>
            <button className="bg-primary text-white font-medium rounded-xl py-2 mt-6 w-full  " onClick={hanlderPostReview}>Post Review</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Detail;
