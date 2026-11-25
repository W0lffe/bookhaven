import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/app/db/database';
import { authenticate } from '@/app/auth/auth';

export async function POST(request) {

    const token = request.cookies.get("authToken")?.value;
    const user = await authenticate(token);
    console.log("user", user)

    if (!user) {
        return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { author, coverImage, title, pageCount, rating, readDate } = body;

        const requiredFields = ['author', 'coverImage', 'title', 'pageCount', 'rating', 'readDate'];
        for (const field of requiredFields) {
            if (body[field] === undefined || body[field] === null || (typeof body[field] === 'string' && body[field].trim() === '')) {
                return NextResponse.json({ error: `Field ${field} is required and cannot be empty.` }, { status: 400 });
            }
        }

        const client = await connectToMongoDB();
        const db = client.db("bookhaven");

        let authorRecord = await db.collection("author").findOne({
            name: author
        });

        if (!authorRecord) {
            const result = await db.collection("author").insertOne({ name: author });
            authorRecord = await db.collection("author").findOne({
                _id: result.insertedId
            });
            console.log("ei löydy, luotiin", authorRecord)
        }

        console.log("löyty", authorRecord)

        let bookRecord = await db.collection("book").findOne({ 
            title, authorId: authorRecord._id 
        })

        if (!bookRecord) {
            const book = {
                title,
                authorId: authorRecord._id,
                coverImage: coverImage ? coverImage : null,
                pageCount
            }

            const result = await db.collection("book").insertOne(book);
            bookRecord = await db.collection("book").findOne({
                _id: result.insertedId
            });
            console.log("ei löydy, luotiin", bookRecord)
            
        }

        console.log("löyty", bookRecord)

        const userBookRecord = await db.collection("userbook").findOne({ 
            userId: user.userId,
            bookId: bookRecord._id
        });

        if(userBookRecord){
            console.log("userBook löyty jo", userBookRecord)
            return NextResponse.json({ message: "Record exists already." }, { status: 400 });
        }

        const userBook = {
            userId: user.userId,
            bookId: bookRecord._id,
            rating,
            readDate
        }

        console.log("luotiin userBook", userBook)

        await db.collection("userbook").insertOne(userBook);

        return NextResponse.json({ message: "Record added successfully!" }, { status: 200 });

    } catch (error) {
        //console.error("Error adding book:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}