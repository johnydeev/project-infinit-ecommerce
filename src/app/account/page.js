"use client";

import { UserContext } from "@/components/context/UserContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from "axios";



export default function Account(){
    
    const [editable, setEditable] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [zipCode, setZipCode] = useState(0)
    const [addres, setAddres] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [identification, setIdentification] = useState('')
    
    // // //* Theese states are only for the put, not for Frontend
    // const [deleted, setDeleted] = useState(0)
    // const [idRole, setIdRole] = useState(0)
    // const [id, setId] = useState(0)
    const userContext = useContext(UserContext);
    let user = userContext.getUser()

    
    async function initialValues(){
        if(!(user===null || user === undefined)){
            console.log(user);
            axios.get(`/api/user/${user.email}`).then(function(response) {
                console.log(response);
                console.log(response.data);
                // setId(response.data.idUser)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setPhone(response.data.phone)
                setEmail(response.data.email)
                setIdentification(response.data.identification)
                setAddres(response.data.address)
                setCity(response.data.city)
                setCountry(response.data.country)
                setZipCode(response.data.zip_code)
                // setIdRole(response.data.idrole)
                // setDeleted(response.data.deleted)
            })
        }
    }

    useEffect(()=>{
        console.log('asd')
        initialValues()
    },[user])

    // const editHandler = ()=>{
    //     // toast.promise(
    //     //     axios.put("http://localhost:3000/api/user/", {
    //     //     idUser:+id,
    //     //     first_name: firstName,
    //     //     last_name: lastName,
    //     //     phone: +phone,
    //     //     identification: identification,
    //     //     password: password,
    //     //     address: addres,
    //     //     city: city,          
    //     //     country: country,          
    //     //     zip_code: +zipCode,          
    //     //     idrole: +idRole,          
    //     //     deleted: +deleted,          
    //     //     }),
    //     //     {
    //     //     loading: "Loading...",
    //     //     success: (data) => {
    //     //         return `Edit has been successfully`;
    //     //     },
    //     //     error: "Error while editing",
    //     //     }
    //     // );

    //     setEditable(false)
    // } 


    return(
        <div className="flex flex-col lg:flex-row mb-36 content-center">
            <div  className="flex flex-col self-center items-center w-2/3 lg:w-1/3 mb-20 lg:mr-10 lg:mb-0" >
                <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                width={300}
                height={300}
                className="rounded-full mb-10"/>
                <h1 className="font-extrabold text-6xl text-center">{firstName} <hr/>{lastName}</h1>
            </div>
            <div  className="relative flex flex-col p-2 w-full lg:w-2/3 h-fit rounded-lg border-solid border-8 border-zinc-300 self-center ">
                <div className="absolute p-2 -top-6 left-10 w-fit font-semibold bg-slate-100">
                    <h1>Data general</h1>
                </div>
                <div  className="flex flex-col">
                        <div className="relative flex flex-col m-4  rounded-lg border-solid border-4 border-primary">
                            <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100 ">
                                <h2>Account information</h2>
                            </div>
                            <div className="flex flex-col lg:flex-row p-6 h-full">
                                <div className="w-full lg:w-1/3 py-3 lg:py-0">
                                    <p >Email</p>
                                    <input id="email"
                                        value={email}
                                        type="email"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        disabled={!editable}
                                        className= {`appearance-none bg-transparent border-solid p-1 w-full lg:w-32 xl:w-52 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                    />
                                </div>
                                <div  className=" w-full lg:w-1/3 py-3 lg:py-0">
                                    <p>Phone number</p>
                                    <input id="pNumber"
                                        type="number"
                                        value={phone}
                                        onChange={(e)=> setPhone(e.target.value)}
                                        disabled={!editable}
                                        className={`appearance-none bg-transparent border-solid p-1 w-full lg:w-28 xl:w-52 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                    />
                                </div>
                                <div  className="w-full lg:w-1/3 py-3 lg:py-0">
                                    <p >Password</p>
                                    <input id="password"
                                        type="password"
                                        value={'contrasena'}
                                        disabled={!editable}
                                        className={`appearance-none bg-transparent border-solid p-1 w-full lg:w-32 xl:w-52 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    
                        <div  className="relative flex flex-col m-4 rounded-lg border-solid border-4 border-primary ">
                            <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100">
                                <h1>Sensitive data</h1>
                            </div>
                            <div  className="flex flex-row lg:flex-row flex-col p-5 justify-evenly">
                                <div className="relative flex flex-col my-4 w-full lg:w-2/3 rounded-lg border-solid border-2 border-zinc-800">
                                    <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100">
                                        <h1>Location</h1>
                                    </div>
                                    <div className="flex flex-col sm:flex-row p-4 h-full">
                                        <div className=" w-full sm:w-1/2" >
                                            <div className="my-2 ">
                                                <p>Zip Code</p>
                                                <input id="zipCode"
                                                    value={zipCode}
                                                    type="number"
                                                    onChange={(e)=> setZipCode(e.target.value)}
                                                    disabled={!editable}
                                                    className={`appearance-none bg-transparent border-solid p-1 w-full sm:w-20 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                                />
                                            </div>
                                            <div className="my-2">
                                                <p>Addres</p>
                                                <input id="addres"
                                                    value={addres}
                                                    onChange={(e)=> setAddres(e.target.value)}
                                                    disabled={!editable}
                                                    className={`appearance-none bg-transparent border-solid p-1 m-0  text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'} w-full sm:w-2/3`}
                                                />
                                            </div>
                                        </div>
                                        <div  className="w-full sm:w-1/2">
                                            <div className="my-2">
                                                <p>City</p>
                                                <input id="city"
                                                    value={city}
                                                    onChange={(e)=> setCity(e.target.value)}
                                                    disabled={!editable}
                                                    className={`appearance-none bg-transparent border-solid p-1 w-full sm:w-28 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                                />
                                            </div>
                                            <div >
                                                <p>Country</p>  
                                                <input id="country"
                                                    value={country}
                                                    onChange={(e)=> setCountry(e.target.value)}
                                                    disabled={!editable}
                                                    className={`appearance-none bg-transparent border-solid p-1 w-full sm:w-28 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex flex-col my-4 lg:w-1/4 w-full rounded-lg border-solid border-2 border-zinc-800">
                                    <div className="absolute p-1 -top-5 left-3 w-fit font-semibold bg-slate-100">
                                        <h1>Documentation</h1>
                                    </div>
                                    <div className="flex flex-col p-4 h-full justify-center	">
                                        <p>Identification</p>
                                        <input id="identification"
                                            value={identification}
                                            disabled={!editable}
                                            onChange={(e)=> setIdentification(e.target.value)}
                                            className={`appearance-none bg-transparent border-solid p-1 m-0 text-slate-500 transition duration-500  focus:border-indigo-700 focus:outline-none  ${editable?('outline-solid border-b-2 border-primary'): 'outline-none'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {editable? 
                    <button onClick={editHandler} className="bg-primary rounded-xl p-2 w-auto self-center text-white font-bold"> Save changes</button>
                    :
                    <button onClick={()=>setEditable(true)}  className="bg-primary rounded-xl p-2 w-auto self-center text-white font-bold"> Edit info </button>    
                } */}
                </div>

            </div>
        
    )
}