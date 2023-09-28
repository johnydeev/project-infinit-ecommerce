import Image from "next/image";
import React from "react";

import image from "@/assets/images/honda-civic.png";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "sonner";

export const DeleteCard = (props) => {
  const deleteCar = () => {
    Swal.fire({
      title: `Delete the car with the id ` + props.vehicle?.idvehicle + `?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(axios.delete(`/api/vehicle/${props.vehicle.plate}`), {
          loading: "Loading...",
          success: (data) => {
            document
              .querySelector(`#cards${props.vehicle.idvehicle}`)
              .classList.add("opacity-0");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            return `The car rent has been deleted successfully`;
          },
          error: "Error while deleting car",
        });
      }
    });
  };
  console.log(props);
  return (
    <div
      id={`cards${props.vehicle.idvehicle}`}
      className=" w-2/5  m-3 rounded-2xl overflow-hidden shadow-md flex flex-col font-poppins hover:shadow-lg transition-opacity duration-500 ease-in-out "
    >
      <div className="flex items-center justify-between p-4 ">
        <div className="w-1/2">
          <Image
            className="w-full h-full aspect-video mix-blend-darken object-contain"
            src={props.vehicle.images[0]?.url || image}
            alt="delete-card"
            width={500}
            height={300}
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-start gap-1 font-bold text-lg">
            <p className="text-start truncate ">
              {props.vehicle.model.brand.name}
            </p>
          </div>

          <div>
            <p>{props.vehicle.model.name}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="ml-4">
          <span className="font-semibold">${props.vehicle?.price_per_day}</span>
          <span className="text-gray-400">/day</span>
        </p>
        <button
          className="bg-red-600 font-semibold text-white px-8 py-3 rounded-tl-2xl hover:bg-black transition-all duration-300 ease-in-out"
          onClick={() => {
            deleteCar();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
