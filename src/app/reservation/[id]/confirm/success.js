"use client";
import React, { useEffect } from "react";

import { useRouter } from 'next/navigation';


export default function Success() {
  const { push } = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      push("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Success!</h2>
        <p className="text-lg text-gray-600">
          Your reservation was registered. Enjoy!
        </p>
      </div>
    </div>
  );
}