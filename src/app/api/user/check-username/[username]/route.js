import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db/database";

export const GET = async (req, {params}) => {
    const {username} = await params;

    try {
        const client = await connectToMongoDB();
        const db = client.db("bookhaven");
        const user = await db.collection("user").findOne({username})
        
        return NextResponse.json({taken: user !== null}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }

}