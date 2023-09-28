"use strict";
import React, { useState } from 'react';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

function FavoriteButton(props) {
    const currentlyAFavorite = <Favorite/>;
    const notCurrentlyAFavorite = <FavoriteBorder />;

    const [favorite, setFavorite] = useState(props.favBool);

    const toggleFavorite = (vehicleId) => {
        setFavorite((favorite) => {
          if (favorite == true) {
            console.log("I clicked unfavorite")
            console.log(props)
            fetch(`/api/favorite/${props.userId}/vehicle/${vehicleId}`, { method: 'DELETE' })
            .then(console.log("This was a favorited vehicle, but now it isnt!"));

          }
          if (favorite == false) {
            console.log("I clicked favorite")
            fetch(`/api/favorite/${props.userId}/vehicle/${vehicleId}`, { method: 'POST' })
            .then(console.log("This was not a favorited vehicle. Now it is!"));
          }

          return !favorite;
        });
    }
    console.log(props)
    return (
        <button
            onClick={() => toggleFavorite(props.vehicleId)}
            key={props.vehicleId}>
        { favorite === true ? currentlyAFavorite : notCurrentlyAFavorite} 
        </button>
    );
}

export default FavoriteButton;