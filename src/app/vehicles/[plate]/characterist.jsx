import React, { useState, useEffect } from "react";

const Caracteristicas = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const vehicleFeatures = [
    { icon: "❄️", text: "Air Conditioning" },
    { icon: "📶", text: "Bluetooth Connectivity" },
    { icon: "🚘", text: "Cruise Control" },
    { icon: "🔑", text: "Keyless Entry" },
    { icon: "📷", text: "Backup Camera" },
    { icon: "💡", text: "Power Windows" },
    { icon: "🚗", text: "Fuel Efficiency" },
    { icon: "⚙️", text: "Advanced Transmission" },
    { icon: "🛡️", text: "Safety Certified" },
  ];


  useEffect(() => {
    // Función para mezclar aleatoriamente la matriz
    const shuffleArray = (array) => {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    // Genera un número aleatorio entre 5 y 9
    const randomNumberOfFeatures = Math.floor(Math.random() * 5) + 5;

    // Mezcla aleatoriamente la matriz vehicleFeatures
    const shuffledFeatures = shuffleArray(vehicleFeatures);

    // Toma los primeros N elementos de la matriz mezclada, donde N es el número aleatorio
    const randomFeatures = shuffledFeatures.slice(0, randomNumberOfFeatures);

    // Actualiza el estado para mostrar las características aleatorias
    setVisibleFeatures(randomFeatures);
  }, []);

  return (
    <div className="features-block">
      <h3 className="text-xl font-semibold">Characterist</h3>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {visibleFeatures.map((feature, index) => (
          <li key={index} className="text-gray-400">
            <span className="text-2xl mr-2"> {feature.icon} </span>
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Caracteristicas;
