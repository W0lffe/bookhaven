import { NextResponse } from "next/server"
import { validateUserData } from "./validate";
import { generateToken } from "@/app/auth/auth";

export const POST = async (req) => {

    try {
        
        const {username, password, expire} = await req.json();
        const {message, userDetails} = await validateUserData(username, password);
        //console.log(message, userDetails)

        if(message){
            //console.log(message)
            return NextResponse.json({message}, {status: 400})
        }

        const token = generateToken(userDetails, expire);
        const response = NextResponse.json({message: "Login successful!"}, {status: 200});

        let cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        }

        if(expire){
            cookieOptions = {
                ...cookieOptions,
                maxAge: 60 * 60 * 24
            }
        }
        //console.log(cookieOptions)

        response.cookies.set("authToken", token, cookieOptions)
        return response;

    } catch (error) {
        return NextResponse.json({error}, {status: 500})

    }
}