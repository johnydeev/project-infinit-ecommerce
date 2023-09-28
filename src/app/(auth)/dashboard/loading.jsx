"use client";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
export default function LoadingScreenDashboard({children}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return children

}
