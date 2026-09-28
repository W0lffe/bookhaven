import { connectToMongoDB } from "@/app/db/database";
import { NextResponse } from "next/server";
import { validateUserData } from "./validate";
import { generateRecoveryCode, hashPassword } from "@/app/auth/auth";

export async function POST(req){

    try {
        const {username, password} = await req.json();
        const hasErrors = await validateUserData(username, password);

        if(hasErrors){
            //console.log(hasErrors)
            return NextResponse.json({message: hasErrors})
        }

        const hashedPassword = await hashPassword(password);
        //console.log(hashedPassword)
        const recCode = generateRecoveryCode();
        //console.log(recCode)

        const newUser = {
            username,
            passwdHash: hashedPassword,
            recovery: recCode,
            created: Date.now()
        }

        //console.log("UUSI KÄYTTÄJÄ: ", newUser)

        const client = await connectToMongoDB();
        const db = client.db("bookhaven");

        const result = await db.collection("user").insertOne(newUser);

        return NextResponse.json({message: "User created successfully!"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong, try again later."}, {status: 500})
    }
   
}