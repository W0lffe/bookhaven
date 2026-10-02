import { NextResponse } from "next/server"
import { validateUserData } from "./validate";

export const POST = async (req) => {

    try {
        
        const {username, password} = await req.json();
        const hasErrors = await validateUserData(username, password);

        if(hasErrors){
            //console.log(hasErrors)
            return NextResponse.json({message: hasErrors}, {status: 400})
        }  

        return NextResponse.json({message: "YEEEE"}, {status: 200})

    } catch (error) {
        return NextResponse.json({error}, {status: 500})

    }
}