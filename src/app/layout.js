"use client";

import { Navbar } from "@/components/Navbar";
import "./globals.css";
import "@/assets/styles/swiperStyles.css";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "@/components/context/UserContext";

// export const metadata = {
//   title: "INFINIT",
// };

const clientId =
  "394954289615-hgk85f9ul09op4flt4evf7ngpdaomb8a.apps.googleusercontent.com";

export default function RootLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <html lang="en">
          <body className="h-full bg-gray-100 ">
            <Navbar  />
            <div className="mt-40 mx-5 md:mx-12 lg:mx-20" id="home">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
