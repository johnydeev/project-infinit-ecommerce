"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import { BiMenuAltLeft } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import {
  AiOutlineClose,
  AiOutlineCar,
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { LiaKeySolid } from "react-icons/lia";

import { BsNut } from "react-icons/bs";
import { GoStack } from "react-icons/go";
import { Infinit } from "./Infinit";
import axios from "axios";
import { UserContext } from "./context/UserContext";

export const Navbar = () => {
  const { user, getUser, isAdmin } = useContext(UserContext); // const [user, isUserLogged] = useState(false);
  const [sideMenu, isSideMenuOpen] = useState(false);
  const [MngmntOpen, isMngmntOpen] = useState(false);
  const [MngmntMobileOpen, isMngmntMobileOpen] = useState(false);
  const [userId, setUserId] = useState();
  const userContext = useContext(UserContext);
  let user2 = userContext.getUser();
  
  console.log("userID2: ");

  const openSidebar = () => {
    isSideMenuOpen(!sideMenu);

    document.querySelector("body").classList.add("no-scroll");
    document
      .querySelector("#home")
      .classList.add("sidebar-open-background-behind");
  };

  const closeSidebar = () => {
    if (sideMenu == true) {
      isSideMenuOpen(false);
      document.querySelector("body").classList.remove("no-scroll");
      document
        .querySelector("#home")
        .classList.remove("sidebar-open-background-behind");
    }
    isSideMenuOpen(false);
  };

  const managementClick = () => {
    if (!MngmntOpen) {
      isMngmntOpen(true);
      document.querySelector("#mngmnt").classList.remove("hide-mngmnt");
      document.querySelector("#mngmnt").classList.add("show-mngmnt");
    } else {
      isMngmntOpen(false);
      document.querySelector("#mngmnt").classList.add("hide-mngmnt");
      document.querySelector("#mngmnt").classList.remove("show-mngmnt");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  const managementClickMobile = () => {
    if (!MngmntMobileOpen) {
      isMngmntMobileOpen(true);
      document.querySelector("#modal").classList.remove("hide-mngmnt");
      document.querySelector("#modal").classList.add("show-mngmnt-mobile");

      document.querySelector("#modalBg").classList.remove("hide-mngmnt");
      document.querySelector("#modalBg").classList.add("show-mngmnt-mobile");
    } else {
      isMngmntMobileOpen(false);
      document.querySelector("#modal").classList.add("hide-mngmnt");
      document.querySelector("#modal").classList.remove("show-mngmnt-mobile");

      document.querySelector("#modalBg").classList.add("hide-mngmnt");
      document.querySelector("#modalBg").classList.remove("show-mngmnt-mobile");
    }
    closeSidebar();
  };

  return (
    <div
      className={`fixed top-0 p-6 pb-0 lg:px-12 ${
        sideMenu ? "border-[1px]-black border-b" : "shadow-sm"
      } w-full bg-white z-30 `}
    >
      <div className="flex items-center justify-between">
        {sideMenu ? (
          <button className="block lg:hidden" onClick={closeSidebar}>
            <AiOutlineClose size={30} />
          </button>
        ) : (
          <button className="block lg:hidden" onClick={openSidebar}>
            <BiMenuAltLeft size={30} />
          </button>
        )}

        <div className="sm:block hidden">
          <Link href="/">
            <Infinit />
          </Link>
        </div>
        <ul className="hidden lg:flex items-center gap-12 font-poppins">
          <li className="text-lg link-item">
            <Link href="/rent">Rent</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="/fleet">Fleet</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="/services">Services</Link>
          </li>

          {user && (
            <li className="text-lg link-item">
              <Link href="/favorites">Favorites</Link>
            </li>
          )}  
          
          <li className="text-lg link-item">
            <Link href="/about">About</Link>
          </li>
          {user && (
            <li className="text-lg link-item">
              <Link href={`/history/${user2.id}`}>History</Link>
            </li>
          )}

          {isAdmin === true ? (
            <li className="">
              <div className="relative  ">
                <button
                  onClick={managementClick}
                  type="button"
                  className="inline-flex items-center gap-x-1 text-lg link-item "
                  aria-expanded="false"
                >
                  <span>Management</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div id="mngmnt" className="hide-mngmnt">
                  <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {/* --------------------------------- FLEETS --------------------------------- */}
                      <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <AiOutlineCar className="w-6 h-6 group-hover:text-indigo-600" />
                        </div>
                        <Link
                          href="/dashboard/[path]"
                          as="/dashboard/fleet"
                          onClick={managementClick}
                        >
                          <div>
                            <button className="font-semibold text-gray-900">
                              Show Fleet
                              <span className="absolute inset-0"></span>
                            </button>
                            <p className="mt-1 text-gray-600">
                              Quickly access the cars you have rented.
                            </p>
                          </div>
                        </Link>
                      </div>
                      {/* ----------------------------------- ADD ---------------------------------- */}
                      <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 group-hover:text-indigo-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                        <Link
                          href="/dashboard/[path]"
                          as="/dashboard/add"
                          onClick={managementClick}
                        >
                          <div>
                            <button className="font-semibold text-gray-900">
                              Add Car
                              <span className="absolute inset-0"></span>
                            </button>
                            <p className="mt-1 text-gray-600">
                              Expand your leased fleet in a simple way.
                            </p>
                          </div>
                        </Link>
                      </div>
                      {/* ----------------------------------- MODIFY ---------------------------------- */}
                      <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <AiOutlineEdit className="w-6 h-6 group-hover:text-indigo-600" />
                        </div>
                        <Link
                          href="/dashboard/[path]"
                          as="/dashboard/modify"
                          onClick={managementClick}
                        >
                          <div>
                            <button className="font-semibold text-gray-900">
                              Edit your cars rental
                              <span className="absolute inset-0"></span>
                            </button>
                            <p className="mt-1 text-gray-600">
                              Adjust and update your vehicles' information for a
                              personalized experience.
                            </p>
                          </div>
                        </Link>
                      </div>
                      {/* --------------------------------- DELETE --------------------------------- */}
                      <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <AiOutlineDelete className="w-6 h-6 group-hover:text-indigo-600" />
                        </div>
                        <Link
                          href="/dashboard/[path]"
                          as="/dashboard/delete"
                          onClick={managementClick}
                        >
                          <div>
                            <button className="font-semibold text-gray-900">
                              Delete your car rental
                              <span className="absolute inset-0"></span>
                            </button>
                            <p className="mt-1 text-gray-600">
                              Easily remove vehicles from your leased fleet.
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>

        <div className="lg:block hidden font-poppins">
          {getUser() == null ? (
            <div className="flex items-center gap-8">
              <Link
                href={"/signup"}
                className="p-6 py-3 rounded-md bg-primary hover:bg-secondary shadow-lg text-white transition-all duration-200 ease-in-out"
              >
                Join now
              </Link>
              <Link
                href={"/login"}
                className="p-6 py-3 rounded-md bg-primary hover:bg-secondary shadow-md text-white  transition-all duration-200 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link
                href={"/account"}
                className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
              >
                Account
              </Link>
              <button className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out">
                <Link onClick={handleLogout} href={"/"}>
                  Logout
                </Link>
              </button>
            </div>
          )}
        </div>

        <div className="flex sm:hidden">
          <Link href="/">
            <Infinit />
          </Link>
        </div>
      </div>
      {/* SIDE MENU */}
      <div
        className={`absolute top-[79px] bg-white lg:hidden w-[65%] ${
          sideMenu ? "left-0" : "-left-[100%]"
        } transition-all duration-300 ease-in-out border-r-2 border-b-2 z-10 flex flex-col justify-between py-6`}
      >
        <ul className="flex flex-col gap-8 font-secondary mt-4">
          <li className="font-bold p-4 w-full">
            <Link
              href="/rent"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <LiaKeySolid size={25} />
              <p>Rent</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="/fleet"
              className="flex items-center gap-4 "
              onClick={closeSidebar}
            >
              <AiOutlineCar size={25} />
              <p>Fleet</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="/services"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <GoStack size={25} />
              <p>Services</p>
            </Link>
          </li>
          {isAdmin && (
            <li className="font-bold p-4  w-full cursor-pointer ">
              <div
                className="flex items-center gap-4"
                onClick={managementClickMobile}
              >
                <BsNut size={25} />
                <p>Management</p>
              </div>
              {/* </Link> */}
            </li>
          )}
          <li className="font-bold p-4  w-full ">
            <Link
              href="/services"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <AiOutlineInfoCircle size={25} />
              <p>Why us?</p>
            </Link>
          </li>
        </ul>

        {user == null ? (
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mx-4 font-poppins">
            <Link
              href="/signup"
              onClick={closeSidebar}
              className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white text-center transition-all duration-200 ease-in-out"
            >
              Join now
            </Link>
            <Link
              href="/login"
              onClick={closeSidebar}
              className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white text-center  transition-all duration-200 ease-in-out"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mx-4 font-poppins">
            <Link
              href="/account"
              onClick={closeSidebar}
              className=" w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white text-center transition-all duration-200 ease-in-out"
            >
              Account
            </Link>
            <button className=" w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white text-center transition-all duration-200 ease-in-out">
              <Link onClick={handleLogout} href={"/"}>
                Logout
              </Link>
            </button>
            {false ? (
              <button
                onClick={closeSidebar}
                className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </button>
            ) : null}
          </div>
        )}
      </div>
      {/* -------------------------------------------------------------------------- */
      /*                         MODAL FOR MOBILE ENGAGEMENT                        */
      /* -------------------------------------------------------------------------- */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity hide-mngmnt lg:hidden"
        id="modalBg"
        onClick={() => isSideMenuOpen(!sideMenu)}
      ></div>
      <div
        id="modal"
        className="flex min-h-full justify-center items-center p-0 fixed inset-0 hide-mngmnt lg:hidden"
      >
        <div className="relative">
          <div className=" m-5 max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {/* --------------------------------- FLEETS --------------------------------- */}
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <AiOutlineCar className="w-6 h-6 group-hover:text-indigo-600" />
                </div>
                <Link
                  href="/dashboard/[path]"
                  as="/dashboard/fleet"
                  onClick={managementClickMobile}
                >
                  <div>
                    <button className="font-semibold text-gray-900">
                      Show Fleet
                      <span className="absolute inset-0"></span>
                    </button>
                    <p className="mt-1 text-gray-600">
                      Quickly access the cars you have rented.
                    </p>
                  </div>
                </Link>
              </div>
              {/* ----------------------------------- ADD ---------------------------------- */}
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <Link
                  href="/dashboard/[path]"
                  as="/dashboard/add"
                  onClick={managementClickMobile}
                >
                  <div>
                    <button className="font-semibold text-gray-900">
                      Add Car
                      <span className="absolute inset-0"></span>
                    </button>
                    <p className="mt-1 text-gray-600">
                      Expand your leased fleet in a simple way.
                    </p>
                  </div>
                </Link>
              </div>
              {/* ----------------------------------- MODIFY ---------------------------------- */}
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <AiOutlineEdit className="w-6 h-6 group-hover:text-indigo-600" />
                </div>
                <Link
                  href="/dashboard/[path]"
                  as="/dashboard/modify"
                  onClick={managementClickMobile}
                >
                  <div>
                    <button className="font-semibold text-gray-900">
                      Edit your cars rental
                      <span className="absolute inset-0"></span>
                    </button>
                    <p className="mt-1 text-gray-600">
                      Adjust and update your vehicles' information for a
                      personalized experience.
                    </p>
                  </div>
                </Link>
              </div>
              {/* --------------------------------- DELETE --------------------------------- */}
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <AiOutlineDelete className="w-6 h-6 group-hover:text-indigo-600" />
                </div>
                <Link
                  href="/dashboard/[path]"
                  as="/dashboard/delete"
                  onClick={managementClickMobile}
                >
                  <div>
                    <button className="font-semibold text-gray-900">
                      Delete your car rental
                      <span className="absolute inset-0"></span>
                    </button>
                    <p className="mt-1 text-gray-600">
                      Easily remove vehicles from your leased fleet.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
};
