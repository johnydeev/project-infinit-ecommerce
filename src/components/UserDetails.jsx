"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserDetails({ callback, data, loading, ready }) {
  const [firstName, setFirstName] = useState(data.first_name || "");
  const [lastName, setLastName] = useState(data.last_name || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [identification, setIdentification] = useState(data.identification || "");

  const [address, setAddress] = useState({
    street: data.address?.street || "",
    city: data.address?.city || "",
    zipCode: data.address?.zip_code || null,
    country: data.address?.country || "",
  });

  const [countries, setCountries] = useState([]);

  const [phoneError, setPhoneError] = useState("");
  const [identificationError, setIdentificationError] = useState("");

  const validatePhone = (inputValue) => {
    if (/^[0-9]{10}$/.test(inputValue)) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number.");
    }
  };

  const validateIdentification = (inputValue) => {
    if (inputValue.trim() !== "") {
      setIdentificationError("");
    } else {
      setIdentificationError("Identification is required.");
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneError) {
      return;
    }
    if (identificationError) {
      return;
    }
    loading();
    axios.put(`/api/user/${data.email}`, {
      firstName,
      lastName,
      phone,
      address,
      identification,
    }).then(function(response) {
      ready();
      callback();
      setSubmitted(true);
    }).finally(function(){
      ready();
    });
  };

  const isButtonDisabled =
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    phone.trim() === "" ||
    identification.trim() === "";

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        setCountries(data);
        console.log("countries :>> ", countries);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="sm:mx-auto px-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center justify-between w-full flex-wrap ">
            <div className="flex flex-col sm:w-[48%] w-full mb-6 sm:mb-0">
              <label>First Name</label>
              <input
                type="text"
                className="px-1 py-1.5 border-black border-2 rounded-md"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-[48%] w-full">
              <label>Last Name</label>
              <input
                type="text"
                className="px-2 py-1.5 border-black border-2 rounded-md"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="number"
              className={`px-2 py-1.5 border-black border-2 rounded-md ${
                submitted && phoneError ? "border-red-500" : ""
              }`}
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                validatePhone(inputValue);
                setPhone(inputValue);
              }}
            />
            {phoneError && (
              <p className="text-red-500">{phoneError}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>ID/Passport</label>
            <input
              type="text"
              className={`px-2 py-1.5 border-black border-2 rounded-md ${
                identificationError ? "border-red-500" : ""
              }`}
              value={identification}
              onChange={(e) => {
                const inputValue = e.target.value;
                validateIdentification(inputValue);
                setIdentification(inputValue);
              }}
            />
            {submitted && identificationError && (
              <p className="text-red-500">{identificationError}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Country</label>
            <select
              id="country"
              name="country"
              value={address.country}
              className="px-2 py-1.5 border-black border-2 rounded-md"
              onChange={(e) => {
                const selectedCountry = e.target.value;
                setAddress((prevState) => ({
                  ...prevState,
                  country: selectedCountry,
                }));
              }}
            >
              <option selected={address.country}>Select your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Street</label>
            <input
              type="text"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={address.street}
              onChange={(e) => {
                setAddress((prevState) => ({
                  ...prevState,
                  street: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={address.city}
              onChange={(e) => {
                setAddress((prevState) => ({
                  ...prevState,
                  city: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex flex-col">
            <label>Zip Code</label>
            <input
              type="text"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={address.zipCode}
              onChange={(e) => {
                setAddress((prevState) => ({
                  ...prevState,
                  zipCode: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-8 mt-6">
          <button
            onClick={handleSubmit}
            className={`w-full shadow-md transition-all duration-300 font-medium text-white text-sm px-8 py-2 rounded-md ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-primary cursor-pointer"
            }`}
            disabled={isButtonDisabled}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
