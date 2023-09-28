"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/components/context/UserContext";
import { Infinit } from "@/components/Infinit";
import { useRouter } from 'next/navigation';


export default function Login({idvehicle,setShowLoginModal}) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const userContext = useContext(UserContext);

  console.log("Params>>", idvehicle);

  const { push } = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const fetchUser = () => {
    axios
      .post("/api/auth/login", userData)
      .then((res) => {
        userContext.loginUser(res.data.token, res.data.isAdmin );
        console.log(res.data);
        Toast.fire({
          icon: "success",
          title: res.data.msg,
        }).then(() => {
          push(`/reservation/${idvehicle}`);         
        });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data.msg,
        });
      });
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (userData.email.length <= 0 || userData.password.length <= 0) {
      Toast.fire({
        icon: "error",
        title: "You must complete all fields",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      return;
    }

    fetchUser();
  };

  const handleButton = () => {    
    setShowLoginModal(false);
  }

  return (
    <div className="flex  flex-col  bg-white justify-around">
      
      <div className="flex min-h-full flex-1 flex-col items-center px-6 py-12 lg:px-8">          
            <div className="relative flex justify-center items-center w-full"> 
              <Link href="/">
                  <Infinit />
              </Link>
              <button 
                  className="absolute right-4 text-black rounded-full hover:bg-primary hover:text-white w-6" 
                  onClick={handleButton}
              >
                  X
              </button>
            </div>
          

        <p className="text-lg sm:text-2xl worksans-regular mt-10 border-b-primary border-b-4 pb-2 ">
          Sign in to your account
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full w-full sm:max-w-sm">
          <form action="" className="space-y-6" onSubmit={handleUserLogin}>
            <div className="flex flex-col">
              <label className="">Email address</label>
              <input
                type="text"
                className={`px-2 py-1.5 border-black border-2 rounded-md ${
                  submitted === true && userData.email === ""
                    ? "border-red-500"
                    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
                    ? ""
                    : ""
                }`}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              <div className="flex items-center">
                {submitted && userData.email === "" && (
                  <p className="text-red-500">Email is required.</p>
                )}
                {submitted &&
                  userData.email !== "" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email) && (
                    <p className="text-red-500">Invalid email address.</p>
                  )}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between flex-nowrap">
                <label className="flex-1 ">Password</label>
                <Link
                  href="/forgot-password"
                  className="flex-2 text-indigo-600 hover:text-indigo-500 "
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                className={`px-2 py-1.5 border-black border-2 rounded-md ${
                  submitted == true && userData.password === ""
                    ? "border-red-500"
                    : ""
                }`}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
              {submitted && userData.password === "" && (
                <p className="text-red-500">Password is required.</p>
              )}
            </div>

            <button className="w-full hover:bg-primary shadow-md bg-black  transition all duration-300 font-medium text-white text-sm px-8 py-2 rounded-md">
              Sign in
            </button>
          </form>

          <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-4 w-full">
            <p>Or sign in with Google</p>
            <div className="md:block hidden">
              <GoogleLogin
                /*   onSuccess={showUserInformation} */
                onError={() => {
                  console.log("Login Failed");
                }}
                shape="pill"
                size="large"
                logo_alignment="left"
                text="signin_with"
                type="icon"
              />
            </div>
            <div className="md:hidden block ">
              <GoogleLogin
                onError={() => {
                  console.log("Login Failed");
                }}
                shape="pill"
                size="large"
                logo_alignment="left"
                text="signin_with"
                type="standard"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 text-sm flex-wrap ">
            <p className="text-gray-500 mr-2">Not a member?</p>
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Join and drive your way through the world!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

}