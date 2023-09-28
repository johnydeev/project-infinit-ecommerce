"use client";
import { CardList } from "@/components/CardList";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FleetByCategory({ params: { name } }) {
  const [vehiclesByCategory, setVehiclesByCategory] = useState([]);

  console.log("name :>> ", name);

  const fetchVehicles = async () => {
    const res = await axios(`/api/category/${name}`);
    console.log("res :>> ", res.data);

    setVehiclesByCategory(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      <p className="font-poppins capitalize font-bold text-4xl">{name}</p>
      {vehiclesByCategory.length == 0 && (
        <div>
          <p className="text-lg">
            Sorry, we dont have those vehicles at the moment!
          </p>
        </div>
      )}
      <CardList vehicles={vehiclesByCategory} />
    </div>
  );
}
