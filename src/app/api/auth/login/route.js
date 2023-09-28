import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../database";

export async function POST(request) {
  const { email, password } = await request.json();


  const user = await getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    console.log(user);

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        email,
        name: user.first_name + " " + user.last_name,
        id: user.iduser
      },
      process.env.JWT_SECRET
    );

    const response = NextResponse.json({
      msg: "Login successfull",
      token,
      isAdmin: user.idrole == 1,
      email: user.email
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        msg: "Invalid Email or Password. Please check your credentials and try again.",
      },
      {
        status: 401,
      }
    );
  }
}
