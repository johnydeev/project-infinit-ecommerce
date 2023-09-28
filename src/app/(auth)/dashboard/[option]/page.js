'use client'
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '../page';
import { Toaster } from 'sonner';
import { Form } from '@/components/Form';
import { useContext, useEffect, useState } from 'react';
import { DeleteCard } from '@/components/DeleteCard';
import axios from 'axios';
import { ModCar } from '@/components/ModCar';
import { Pagination } from '@/components/Pagination';
import { DashCard } from '@/components/DashCard';
import { UserContext } from '@/components/context/UserContext';
import { MdNoAccounts, MdOutlineMobileOff } from "react-icons/md";
import LoadingScreenDashboard from '../loading';




const DashboardPage = () => {
  const router = useRouter();
  const path = usePathname();
  const [vehicles, setVehicles] = useState([])
  const { isAdmin } = useContext(UserContext)



  
  let screenWidth;
  if (typeof window !== "undefined") {
    screenWidth = window.innerWidth;
  }
  
  const VEHICLES_PER_PAGE = 6;
  const totalVehicles = vehicles.length;
  const [vehiclesPerPage, setvehiclesPerPage] = useState(VEHICLES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * vehiclesPerPage;
  const firstIndex = lastIndex - vehiclesPerPage;

  const renderComponent = () => {
    if (vehicles) {
      switch (path) {
        case '/dashboard/fleet':
          return vehicles.map((vehicle, index) => { return <DashCard key={index} vehicle={vehicle} /> }).slice(firstIndex, lastIndex)
        case '/dashboard/add':
                    return <Form />;
        case '/dashboard/delete':
          return vehicles.map((vehicle, index) => { return <DeleteCard key={index} vehicle={vehicle} /> }).slice(firstIndex, lastIndex)
        case '/dashboard/modify':
          return <ModCar vehicles={vehicles} firstIndex={firstIndex} lastIndex={lastIndex} />
      }
    }
  };


  const fetchVehicles = async () => {
    setVehicles(((await axios("/api/vehicle")).data));
  };
  useEffect(() => {
    try {
      fetchVehicles()
    } catch {
      console.error("Error fetching vehicles:", error);
    }
  }, [])

  return (
    <>
      <LoadingScreenDashboard>
        {screenWidth >= 1020 ?
          <>
            {isAdmin ?
              <div className="flex items-center justify-evenly h-full">
                <Sidebar />
                <div className="lg:w-4/6 w-full py-10 lg:mx-10 h-auto rounded-2xl shadow-md font-poppins content-around flex-col bg-white">
                  <Toaster position="bottom-right" richColors expand={false} />
                  <div className="flex flex-wrap justify-around pb-10">
                    {vehicles && vehicles.length > 0 ? renderComponent() : null}
                  </div>
                  {!('/dashboard/add' == path) && (
                    <Pagination
                      currentPage={currentPage}
                      vehiclesPerPage={vehiclesPerPage}
                      setCurrentPage={setCurrentPage}
                      totalVehicles={totalVehicles}
                    />
                  )}
                </div>
              </div>
              :
              <div className='w-full mt-52 mb-40 px-10 flex flex-col items-center text-center font-bold text-6xl'>
                You don't have acces to this page!
                <MdNoAccounts className='text-center w-32 h-32 mt-8' />
              </div>
            }
          </>
          :
          <div className='w-full mt-52 mb-40 px-10 flex flex-col items-center text-center font-bold text-6xl'>
            <p>Sorry!</p>
            <p className='text-3xl mt-5'>This section isn't available for this device </p>
            <MdOutlineMobileOff className='text-center w-32 h-32 mt-8' />
          </div>}
      </LoadingScreenDashboard>
    </>
  );

};

export default DashboardPage;

