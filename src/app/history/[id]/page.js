"use client"


import React, { useEffect, useState } from 'react';
import History from '@/components/History'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

const HistoryPage = ({params}) => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState()
  const [lastName,setLastName] = useState()
  const [email, setEmail] = useState()
  
  const userID= params.id
  console.log("userID>>>", userID);

  const fetchHistory = ()=> {

    fetch('/api/reservations/'+userID) // Asegúrate de que la ruta sea correcta
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.reservations)) {
          setReservas(data.reservations);
          setName(data.reservations[0].user.first_name)
          setLastName(data.reservations[0].user.last_name)
          setEmail(data.reservations[0].user.email)
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos de historial:', error);
        setIsLoading(false);
      });    

  }  

  useEffect(() => { 
      fetchHistory()    
  }, [userID]);

  console.log("reservas>>>", reservas); 
  console.log("nombre", name,lastName,email);
 

  return (
    <div>
      <h1></h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <History reservas={reservas} name={name} lastName={lastName} email={email}/>
      )}
    </div>
  );
};

export default HistoryPage;
