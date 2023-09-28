import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

import image from "@/assets/images/honda-civic.png";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "./context/UserContext";
import { MdEdit } from "react-icons/md";
import { Category } from "./Category";

export const ModCar = ({ vehicles, firstIndex, lastIndex }) => {
  const apiUrl = "http://localhost:3000/api/vehicle/";
  const [showModal, setShowModal] = useState(false);
  const { isAdmin } = useContext(UserContext);

  //* Controled inputs states
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [brandName, setBrandName] = useState("");
  const [model, setModel] = useState("");
  const [modelName, setModelName] = useState("");
  const [price, setPrice] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [images, setImages] = useState([]);

  const [dealer, setDealer] = useState("");

  //* Error States
  const [priceErr, setPriceErr] = useState(false);
  const [plateErr, setPlateErr] = useState(false);
  const [yearErr1, setYearErr1] = useState(false);
  const [yearErr2, setYearErr2] = useState(false);
  const [detailErr, setDetailErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [dealerErr, setDealerErr] = useState(false);

  const [categories, setCategories] = useState([]);
  const [dealers, setDealers] = useState([]);

  const handleFileChange = (e) => {
    const newImages = [...images];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }

    setImages(newImages);
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRearrange = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedItem] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedItem);
    setImages(newImages);
  };

  const fetchCategories = async () => {
    const res = await axios("/api/category");
    setCategories(res.data);
  };

  const fetchDealers = async () => {
    const res = await axios("/api/dealer");
    setDealers(res.data);
  };

  const [showCategory, setShowCategory] = useState(false);
  const categoryHandler = (e) => {
    e.preventDefault();
    setShowCategory(!showCategory);
  };

  useEffect(() => {
    console.log("vehicles :>> ", vehicles);
    fetchCategories();
    fetchDealers();

    vehicles.map((vehicle) => {
      console.log("vehicle.images :>> ", vehicle.images[0]);
    });
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [showCategory]);

  const handlerModal = (vehicle, plate) => {
    axios.get(`/api/vehicle/${plate}`).then(function (response) {
      console.log("response.data :>> ", response.data);
      setId(response.data.idvehcle);
      setBrand(JSON.stringify(response.data.model.brand));
      setBrandName(response.data.model?.brand?.name);
      setDealer(JSON.stringify(response.data.dealer));
      setDealerCity(response.data.dealer.city);

      setModel(JSON.stringify(response.data.model));
      setModelName(response.data.model.name);

      setImages(response.data.images);

      setPrice(response.data.price_per_day);
      setPlate(response.data.plate);
      setYear(response.data.year);
      setDetail(response.data.detail);
      setDescription(response.data.long_description);
      setCategory(JSON.stringify(response.data.category));
    });
    setShowModal(!showModal);
  };

  const handlerEdit = (e) => {
    e.preventDefault();
    console.log('Entra aca');

    const fields = [
      { state: price, setter: setPriceErr, id: "#priceInput" },
      { state: plate, setter: setPlateErr, id: "#plateInput" },
      { state: detail, setter: setDetailErr, id: "#detailInput" },
      {
        state: description,
        setter: setDescriptionErr,
        id: "#descriptionInput",
      },
    ];

    fields.forEach((field) => {
      if (!field.state) {
        field.setter(true);
        document.querySelector(field.id).classList.add("errInput");
      } else {
        field.setter(false);
        document.querySelector(field.id).classList.remove("errInput");
      }
    });

    if (!year || year.length === 0 || year > 2023 || year < 1886) {
      setYearErr1(!year || year.length === 0);
      setYearErr2((year > 2023 || year < 1886) && year != 0);
      document.querySelector("#yearInput").classList.add("errInput");
    } else {
      setYearErr1(false);
      setYearErr2(false);
      document.querySelector("#yearInput").classList.remove("errInput");
    }

    if (!category) {
      setCategoryErr(true);
      document.querySelector("#categoryInput").classList.add("errInput");
    } else {
      setCategoryErr(false);
      document.querySelector("#categoryInput").classList.remove("errInput");
    }

    if (
      year &&
      year.length !== 0 &&
      year < 2023 &&
      year > 1886 &&
      fields[3].state &&
      fields[2].state &&
      fields[1].state &&
      fields[0].state
    ) {
      if (isAdmin) {
        if (category) {
          handlerSubmit();
          setShowModal(!showModal);
        }
      } else {
        handlerSubmit();
        setShowModal(!showModal);
      }
    }
  };

  const handlerSubmit = async () => {
    let parsCategory;
    if (category) {
      parsCategory = JSON.parse(category);
    }
    let parsModel = JSON.parse(model);
    let parsBrand = JSON.parse(brand);
    let parsDealer = JSON.parse(dealer);

    console.log("ENTRA ACA");

    toast.promise(
      axios.put(apiUrl + plate, {
        name: "",
        plate: plate,
        detail: detail,
        year: +year,
        price_per_day: +price,
        long_description: description,
        deleted: false,
        category: {
          idcategory: parsCategory.idcategory,
          name: parsCategory.name,
          url: parsCategory.url,
          deleted: false,
        },
        images: [],
        dealer: {
          iddealer: parsDealer.iddealer,
          address: parsDealer.address,
          state: parsDealer.state,
          city: parsDealer.city,
          country: parsDealer.country,
          zip_code: parsDealer.zip_code,
        },
        model: {
          idmodel: parsModel.idmodel,
          name: parsModel.name,
          brandIdbrand: parsModel.brandIdbrand,
          deleted: false,
          brand: {
            idbrand: parsBrand.idbrand,
            name: parsBrand.name,
            url: parsBrand.url,
            deleted: false,
          },
        },
      }),
      {
        loading: "Loading...",
        success: (data) => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return `Edit has been successfully`;
        },
        error: "Error while editing",
      }
    );
  };

  return (
    <>
      {vehicles
        .map((vehicle) => {
          return (
            <div className=" w-5/12  m-3 rounded-2xl overflow-hidden shadow-md flex flex-col font-poppins hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between p-4">
                <div className="w-1/2">
                  <Image
                    className="w-full h-full aspect-video mix-blend-darken object-contain"
                    src={vehicle.images[0]?.url || image}
                    alt="mod-car"
                    width={500}
                    height={300}
                  />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-start gap-1 font-bold text-lg">
                    <p className="text-start truncate ">
                      {vehicle.model?.brand?.name}
                    </p>
                  </div>

                  <div>
                    <p>{vehicle.model.name}</p>
                  </div>
                  <p className="text-gray-400 font-semibold">{vehicle.year}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="ml-4">
                  <span className="font-semibold">
                    ${vehicle.price_per_day}
                  </span>
                  <span className="text-gray-400">/day</span>
                </p>
                <button
                  className="bg-green-400 font-semibold text-white px-8 py-3 rounded-tl-2xl hover:bg-black transition-all duration-300 ease-in-out"
                  onClick={() => handlerModal(vehicle, vehicle.plate)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })
        .slice(firstIndex, lastIndex)}

      {/* ------------------------------- EDIT MODAL ------------------------------- */}
      <div
        className={`fixed inset-0 z-30 bg-gray-500 bg-opacity-75 transition-opacity ${
          showModal ? "flex" : "hidden"
        }`}
        id="modalBg"
      ></div>
      <div
        id="modal"
        className={` z-50 min-h-full  justify-center items-center p-0 fixed inset-0  ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col m-5 px-10 pt-5 max-w-2xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <button
            className="p-4 self-end"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <GrClose />
          </button>

          <form
            noValidate
            onSubmit={handlerEdit}
            className="flex items-center flex-col "
          >
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="">
                <div className="m-[0.85rem]  ">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Brand
                  </label>

                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="brandInput"
                      type="text"
                      value={brandName}
                      readOnly
                      className="block w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    ></input>
                  </div>

                  <span className="flex items-center font-medium tracking-wide text-gray-300 text-xs mt-1 ml-1">
                    * This camp can't be modified
                  </span>
                </div>

                <div className="m-3">
                  <label className="block  text-sm font-medium leading-6 text-gray-900">
                    Model
                  </label>
                  <div>
                    <input
                      id="modelInput"
                      value={modelName}
                      readOnly
                      type="text"
                      className="block mt-2 w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    ></input>
                  </div>

                  <span className="flex items-center font-medium tracking-wide text-gray-300 text-xs mt-1 ml-1">
                    * This field can't be moddified
                  </span>
                </div>

                <hr className="mt-5 mb-5" />

                <div className="m-3">
                  <label
                    for="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price per day
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="priceInput"
                      type="number"
                      value={price}
                      onChange={() => setPrice(event.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label className="sr-only">Currency</label>
                      <select className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <option>USD</option>
                        <option>ARS</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  </div>
                  {priceErr ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The price can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <hr className="mt-5 mb-5" />

                {isAdmin ? (
                  <div className="m-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Dealer
                    </label>
                    <div className="flex items-center	mt-2">
                      <select
                        id="dealerInput"
                        /*    value={dealer.city} */
                        onChange={(e) => {
                          setDealer(e.target.value);
                          console.log("dealer :>> ", dealer);
                        }}
                        type="text"
                        className="block mt-2 w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      >
                        <option value="" disabled selected>
                          Select some dealer
                        </option>
                        {dealers.map((dealer) => {
                          return (
                            <option
                              value={JSON.stringify(dealer)}
                              key={dealer.iddealer}
                            >
                              {dealer.city}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                 {/*    {dealerErr && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        You must choose the dealer of your car
                      </span>
                    )} */}
                  </div>
                ) : (
                  <></>
                )}

                {/*    <div className="m-3">
                  <label className="block mb-2 text-sm font-medium leading-6 text-gray-900">
                    Upload multiple photos
                  </label>
                  <div>
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        multiple
                        type="file"
                        cursor-pointer
                        className=" text-xs block w-full  text-gray-500 pr-2
                                    ring-2 ring-gray-300 ring-inset rounded-md
                                    file:mr-1 file:py-2 file:px-2
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-secondary file:transition-all duration-200 ease-in-out
                                    "
                        onChange={handleFileChange}
                      />
                    </label>
                    <div>
                      {images.map((file, index) => (
                        <div key={index} className="mt-2">
                          <span>{file.url}</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="ml-2 text-red-500"
                          >
                            Delete
                          </button>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => handleRearrange(index, index - 1)}
                              className="ml-2 text-blue-500"
                            >
                              Move Up
                            </button>
                          )}
                          {index < images.length - 1 && (
                            <button
                              type="button"
                              onClick={() => handleRearrange(index, index + 1)}
                              className="ml-2 text-blue-500"
                            >
                              Move Down
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                
                </div> */}
              </div>

              <div>
                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Plate
                  </label>
                  <div>
                    <input
                      id="plateInput"
                      value={plate}
                      onChange={() => setPlate(event.target.value)}
                      type="text"
                      readOnly
                      className="block mt-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    />
                  </div>
                  <span className="flex items-center font-medium tracking-wide text-gray-300 text-xs mt-1 ml-1">
                    * This camp can't be modified
                  </span>
                </div>

                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Year
                  </label>
                  <div>
                    <input
                      id="yearInput"
                      type="number"
                      min="1886"
                      max="2023"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="block mt-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    />
                  </div>
                  {yearErr1 ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The year can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                  {yearErr2 ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Invalid year
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Detail
                  </label>
                  <div className="w-full max-w-sm mx-auto">
                    <textarea
                      id="detailInput"
                      className=" block mt-2 h-full w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      placeholder="Enter your car's detail here"
                      value={detail}
                      onChange={() => setDetail(event.target.value)}
                    ></textarea>
                  </div>

                  {detailErr ? (
                    <span className="flex  items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The details can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Long Description
                  </label>
                  <div className="w-full max-w-sm mx-auto">
                    <textarea
                      className=" w-full mt-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      id="descriptionInput"
                      placeholder="Enter your description here"
                      value={description}
                      onChange={() => setDescription(event.target.value)}
                    ></textarea>
                  </div>
                  {descriptionErr ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The description can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                {isAdmin ? (
                  <div className="m-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Category
                    </label>
                    <div className="flex items-center	mt-2">
                      <select
                        id="categoryInput"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          console.log("category :>> ", category);
                        }}
                        type="text"
                        className="block mt-2 w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      >
                        <option value="" disabled selected>
                          Select some category
                        </option>
                        {categories.map((category) => {
                          return (
                            <option
                              value={JSON.stringify(category)}
                              key={category.categoryId}
                            >
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        onClick={categoryHandler}
                        className="bg-primary text-neutral-50 rounded-xl p-2 ml-2"
                      >
                        <MdEdit />
                      </button>
                    </div>
                    {categoryErr && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        You must choose the category of your car
                      </span>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="m-5 mb-8 ">
              <button className="rounded-xl py-3 px-5 w-full text-white bg-primary hover:bg-secondary file:transition-all duration-200 ease-in-out">
                Submit
              </button>
            </div>
          </form>

          <div
            className={`fixed inset-0 z-30 bg-gray-500 bg-opacity-75 transition-opacity ${
              showCategory ? "flex" : "hidden"
            }`}
            id="modalBg"
          ></div>
          <div
            id="categoryModal"
            className={` z-50 min-h-full  justify-center items-center p-0 fixed inset-0 ${
              showCategory ? "flex" : "hidden"
            }`}
          >
            <Category
              categories={categories}
              setShowCategory={() => setShowCategory()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
