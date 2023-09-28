"use client";

import { CardList } from "@/components/CardList";
import { UserContext } from "@/components/context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";



export default function Favorites(){

    const [vehicles, setVehicles] = useState([]);

    const userContext = useContext(UserContext);
    const [user, setUser] = useState()

    const fetchUser = () => {
        if (!user) {
            const aux = userContext.getUser()
            setUser(aux)
        }
    }

    const fetchFavorites = async () => {
        if(!(user===null || user === undefined)){
            try {
                axios(`/api/favorite/${user.id}`).then(res => {
                    console.log(res)
                    setVehicles(res.data);
                })
            } catch (error) {
                console.error("Error al obtener los vehículos favoritos:", error);
            }
        }
    };
    useEffect(()=>{
        fetchUser()
    },[user])
    useEffect(()=>{
        fetchFavorites()
    },[user])


    return(
        <div>
            <div className="flex flex-col mb-36 content-center">
                <h1>My Favorites vehicles</h1>
                <CardList vehicles={vehicles} />
            </div>
        </div>


    )
}