import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { motion } from "framer-motion";
import { SkeletonCard } from "@/components/skeletons/Card.jsx";
import { Card } from "./Card";

export const CardList = ({ vehicles }) => {
  const VEHICLES_PER_PAGE = 4;

  const totalVehicles = vehicles.length;
  const [vehiclesPerPage, setvehiclesPerPage] = useState(VEHICLES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * vehiclesPerPage;
  const firstIndex = lastIndex - vehiclesPerPage;

  const [isLoading, setIsLoading] = useState(true);
  const container = {
    // ... existing container animation properties ...
  };
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after the timeout
    }, 2000); // Adjust the timeout duration as needed

    return () => {
      clearTimeout(loadingTimeout); // Clear the timeout if the component unmounts
    };
  }, []);
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-12 w-full">
          {isLoading
            ? // Display skeleton cards while loading
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <SkeletonCard />
                </div>
              ))
            : // Render actual vehicle cards

              vehicles
                .map((vehicle, index) => (
                  <div key={index}>
                    <motion.div
                      initial={{
                        x: -300,
                        opacity: 0,
                      }}
                      whileInView={{
                        x: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      }}
                      viewport={{ once: true }}
                    >
                      <Card vehicle={vehicle} />
                    </motion.div>
                  </div>
                ))
                .slice(firstIndex, lastIndex)}
        </div>
      </motion.div>
      <div className="mt-10 ">
        <Pagination
          currentPage={currentPage}
          vehiclesPerPage={vehiclesPerPage}
          setCurrentPage={setCurrentPage}
          totalVehicles={totalVehicles}
        />
      </div>
    </>
  );
};
