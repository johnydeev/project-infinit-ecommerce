import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "@/assets/images/honda-civic.png";

export const DashCard = (props) => {
  return (
    <div className=" w-2/5  m-3 rounded-2xl overflow-hidden shadow-md flex flex-col font-poppins hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2">
          <Image
            className="w-full h-full aspect-video mix-blend-darken object-contain"
            width={500}
            height={300}
            alt="card"
            src={props.vehicle.images[0]?.url}
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-start gap-1 font-bold text-lg">
            {/* <p className="text-start truncate ">{props.vehicle.model.brand.name}</p> */}
          </div>

          <div>
            <p>{props.vehicle.model.name}</p>
          </div>
          <p className="text-gray-400 font-semibold">{props.vehicle.year}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="ml-4">
          <span className="font-semibold">${props.vehicle.price_per_day}</span>
          <span className="text-gray-400">/day</span>
        </p>
        <button className="bg-primary font-semibold text-white px-8 py-3 rounded-tl-2xl hover:bg-tertiary transition-all duration-300 ease-in-out">
          <Link href={`/vehicles/${props.vehicle.plate}`} passHref>
            Details
          </Link>
        </button>
      </div>
    </div>
  );
};
