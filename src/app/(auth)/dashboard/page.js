"use client";

import React, { useContext, useEffect, useState } from "react";

import {
  AiOutlineClose,
  AiOutlineCar,
  AiOutlinePlus,
  AiTwotoneDelete,
} from "react-icons/ai";

import { FaPencilAlt } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/components/context/UserContext";
import { MdNoAccounts, MdOutlineMobileOff } from "react-icons/md";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import LoadingScreenDashboard from "./loading";


export default function dashboard(){
  const path  = usePathname();
  const {isAdmin} = useContext(UserContext)
  let screenWidth;
  if (typeof window !== "undefined") {
    screenWidth = window.innerWidth;
  }


  return (
    <>
      {/* <LoadingScreenDashboard > */}
      { isAdmin?
        <>
        { screenWidth >= 1080?
                  <div className="flex items-center">
                  <Sidebar/>
                  {path === "/dashboard" &&
                  <div className="flex flex-col justify-center items-center w-9/12 ml-12 text-center font-bold text-5xl">
                    <p>Select one option</p>
                    <HiMiniArrowSmallLeft className="w-12"/>
                  </div>}
                </div> 
                :
                <div className='w-full mt-52 mb-40 px-10 flex flex-col items-center text-center font-bold text-6xl'>
                <p>Sorry!</p>
                <p className='text-3xl mt-5'>This section isn't available for this device </p>
                <MdOutlineMobileOff className='text-center w-32 h-32 mt-8'/>
              </div>
        }
        </>
        :
        <div className='w-full mt-52 mb-40 px-10 flex flex-col items-center text-center font-bold text-6xl'>
        You don't have acces to this page!
        <MdNoAccounts className='text-center w-32 h-32 mt-8'/>
      </div>}
      {/* </LoadingScreenDashboard> */}
    </>
  )
} 

const Sidebar = () => {
  return (
    <>
        <div className="w-[200px] ml-12  bg-primary h-full rounded-lg">
        <ul className="flex flex-col gap-2 font-secondary mt-4">
          <li className="font-bold p-4  w-full ">
            <Link
            href="/dashboard/[path]" 
            as="/dashboard/fleet"
            className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <AiOutlineCar size={25} />
              <p>Fleet</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link 
            href="/dashboard/[path]" 
            as="/dashboard/add"
              className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  "
            >
              <AiOutlinePlus size={25} />
              <p>New car</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
            href="/dashboard/[path]" 
            as="/dashboard/delete"
            className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <AiTwotoneDelete size={25} />
              <p>Delete</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
            href="/dashboard/[path]" 
            as="/dashboard/modify"
            className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <FaPencilAlt size={25} />
              <p>Modify a car</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <button className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <SiGoogleanalytics size={25} />
              <p>Analytics</p>
            </button>
          </li>
        </ul>
      </div>

    </>
  );
};

