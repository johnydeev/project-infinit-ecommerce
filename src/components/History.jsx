"use client"
import React from 'react';

const getLocationString = (vehicle) => {
  const dealer = vehicle?.dealer;
  if (dealer) {
    const address = dealer.address || 'N/A';
    const city = dealer.city || 'N/A';
    const state = dealer.state || 'N/A';
    return `${address}, ${city}, ${state}`;
  } else {
    return 'N/A, N/A, N/A';
  }
};

const History = ({ reservas, name, lastName, email }) => {
  console.log('Reservas:', reservas);

  return (
    <div>    
        <h1 className="flex flex-wrap justify-center mb-10 items-center text-3xl font-semibold h-[108px] bg-[#00243f] text-white">My Reservations</h1>

      <div className="mb-8 p-2 text-center bg-primary text-white items-center">
              <p className="font-semibold text-xl">Reservator data:</p>
              <div className=''>
                <p>Name: {name} {lastName}</p>
                <p>Email: {email}</p>

              </div>
      </div>
      <div className="gap-3 flex flex-row flex-wrap items-center justify-evenly mb-40">
        {Array.isArray(reservas) && reservas.map((reservation) => (
          <div
            key={reservation.idreservation}
            className="bg-white p-4 rounded shadow-lg flex flex-col flex-wrap content-center items-center h-[300px] w-[280px] mb-2"
          >
            <h2 className="text-xl font-semibold mb-2">
              Reserva ID: {reservation.idreservation}
            </h2>
            
            <div className="mb-2">
              <p className="font-semibold ">Reservation data:</p>
              <p className='bg-primary text-white p-1'>Start date: {new Date(reservation.checkin_date).toLocaleDateString()}</p>
              <p p className='bg-primary text-white mt-1 p-1'>End date: {new Date(reservation.checkout_date).toLocaleDateString()}</p>
              {/* <p>Location: {getLocationString(reservation.vehicle)}</p> */}
            </div>
            <div className="mb-2">
           {/*    <p className="font-semibold">Brand: {reservation.vehicle.modelIdmodel}</p> */}
              <p>Year: {reservation.vehicle.year }</p>
              {
                // <div>
                //   {/* <p>Model: {reservation.vehicle.model}</p> */}
                //   <p>Year: {reservation.vehicle.year }</p>
                //   <p>Plate: {reservation.vehicle.plate }</p>
                //   <p>Price: ${reservation.vehicle.price_per_day } per day</p>
                //   <p>Detail: {reservation.vehicle.detail }</p>                  
                // </div>
              // ) : (
                // <p>Model: N/A</p>
              }
            </div>
            <div className="flex items-center justify-between">
              <div className="text-blue-500 font-semibold">
                Price: ${reservation.vehicle?.price_per_day || 'N/A'} per day
              </div>
              {reservation.vehicle?.images && reservation.vehicle?.images.length > 0 && (
                <img
                  src={reservation.vehicle?.images[0]?.url}
                  alt={reservation.vehicle?.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
