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
            return NextResponse.json({message: hasErrors}, {status: 400})
        }

        const hashedPassword = await hashPassword(password);
        //console.log(hashedPassword)
        const recCode = generateRecoveryCode();
        const hashedRecovery = await hashPassword(recCode);
        //console.log(recCode)

        const newUser = {
            username,
            passwdHash: hashedPassword,
            recovery: hashedRecovery,
            created: Date.now()
        }

        //console.log("UUSI KÄYTTÄJÄ: ", newUser)

        const client = await connectToMongoDB();
        const db = client.db("bookhaven");
        await db.collection("user").insertOne(newUser);

        return NextResponse.json({message: "User created successfully!", recovery: recCode}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong, try again later."}, {status: 500})
    }
   
}