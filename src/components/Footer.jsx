"use client";
import Link from "next/link";
import {
  BsFillChatTextFill,
  BsInfoCircleFill,
  BsApple,
  BsAndroid,
  BsWhatsapp,
  BsAndroid2,
} from "react-icons/bs";

import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

import { IoMdCall } from "react-icons/io";

import { useState } from "react";

export const Footer = () => {
  const [showDropStore, setShowDropStore] = useState(false);
  const [showDropAbout, setShowDropAbout] = useState(false);
  const [showDropAssistance, setShowDropAssistance] = useState(false);
  const [showDropContact, setShowDropContact] = useState(false);

  return (
    <div className="my-20 font-poppins">
      <div className="block md:hidden ">
        <footer>
          <ul>
            <li className="">
              <FooterButton
                name={"Store"}
                id={1}
                selectedState={setShowDropStore}
              />

              {!showDropStore ? null : <StoreLinks />}
            </li>
            <li className="">
              <FooterButton
                name={"About"}
                id={2}
                selectedState={setShowDropAbout}
              />
              {!showDropAbout ? null : <AboutLinks />}
            </li>
            <li className="">
              <FooterButton
                name={"Assistance"}
                id={3}
                selectedState={setShowDropAssistance}
              />
              {!showDropAssistance ? null : <AssistanceLinks />}
            </li>
            <li className="">
              <FooterButton
                name={"Contact Us"}
                id={4}
                selectedState={setShowDropContact}
              />
              {!showDropContact ? null : <ContactLinks />}
            </li>
          </ul>
        </footer>
      </div>
      <div className="hidden md:block">
        <footer className="flex justify-evenly items-baseline">
          <div className="space-y-4">
            <p className="uppercase font-bold">Store</p>
            <StoreLinks />
          </div>
          <div className="space-y-4">
            <p className="uppercase font-bold">About</p>
            <AboutLinks />
          </div>
          <div className="space-y-4">
            <p className="uppercase font-bold">Assistance</p>
            <AssistanceLinks />
          </div>
          <div className="space-y-4">
            <p className="uppercase font-bold">Contact us</p>
            <ContactLinks />
          </div>
        </footer>
      </div>
    </div>
  );
};

const FooterButton = ({ name, selectedState, id }) => {
  const [selected, setSelected] = useState(false);

  const toggle = () => {
    setSelected(!selected);
    selectedState(!selected);
    return id;
  };

  return (
    <button
      className="px-6 uppercase py-4 flex items-center justify-between w-full border-t-[1px] border-gray-300"
      onClick={toggle}
    >
      <span>{name}</span>
      {selected ? (
        <AiOutlineArrowUp size={15} />
      ) : (
        <AiOutlineArrowDown size={15} />
      )}
    </button>
  );
};

const StoreLinks = () => {
  return (
    <div className="flex flex-col gap-3 mb-2 px-6 md:px-0">
      <Link href="/products" className="hover:underline">
        Rent
      </Link>
      <Link href="/products/sedans" className="hover:underline">
        Sedans
      </Link>
      <Link href="/products/pickups" className="hover:underline">
        Pick Ups
      </Link>
    </div>
  );
};

const AboutLinks = () => {
  return (
    <div className="flex flex-col gap-3 mb-2 px-6 md:px-0">
      <button className="hover:underline">
        Store locator
      </button>
    </div>
  );
};

const AssistanceLinks = () => {
  return (
    <div className="flex flex-col gap-3 mb-2 px-6 md:px-0 items-start">
      <button  className="hover:underline">
        FAQ
      </button>
      <button className="hover:underline">
        On the go service
      </button>
      <button className="hover:underline">
        Consumer defense
      </button>
    </div>
  );
};

const ContactLinks = () => {
  return (
    <div className="mt-4 flex flex-col items-start gap-6 px-6 md:px-0">
      <button className="flex items-center gap-3">
        <BsFillChatTextFill size={15} />
        <p className="hover:underline">Chat with us</p>
      </button>

      <button className="flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-5 md:w-6">
            <BsWhatsapp size={15} />
          </div>

          <div className="flex flex-col">
            <p className="hover:underline">Whatsapp</p>
          </div>
        </div>

        <div className="flex flex-col ml-10 mt-4">
          <span className="text-gray-500 text-sm">Mon-Fri 08am - 09pm</span>
          <span className="text-gray-500 text-sm">Sat-Sun 09am - 09pm</span>
        </div>
      </button>
    </div>
  );
};