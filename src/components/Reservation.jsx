"use client"
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const Reservation = ({idvehicle}) => {

const [dateRange, setDateRange] = useState();  
const [AvailableDates, setAvailableDates] = useState()


const fetchAvailability = async () => {
    try {
        if (idvehicle) {
        const response = await axios(`/api/availability/${idvehicle}`);
        console.log("res.data",response.data);        
        const powerRange = response.data.map((dateRange) => ({
        
            start: new Date(dateRange.start.split("T")[0]), 
            end: new Date(dateRange.end.split("T")[0]),     
        
        }));
        setAvailableDates(powerRange);            
        }    
        } catch (error) {
            console.error("Error fetching availability: ", error);            
        }         
    } 
    useEffect(() => {
    fetchAvailability()   
    }, [idvehicle]); 

    console.log("Availability dates", AvailableDates);
    
    return (
    <div className="availability-calendar-container">
        <div className="availability-calendar">
            <div className="calendar-label">
            Display of availability and busy dates:
        
                <DatePicker                              
                excludeDateIntervals={ AvailableDates}
                monthsShown={2}
                withPortal          
                showIcon         
                placeholderText="Show availability"
                />
            </div>
        </div>
    </div>
    )
}

export default Reservation