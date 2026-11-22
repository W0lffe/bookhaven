import { NextResponse } from 'next/server';
// Assuming a database client exists in src/app/db/
import { connectToMongoDB } from '@/app/db/database';
import { authenticate } from '@/app/auth/auth';

export async function POST(request) {

    const token = request.cookies.get("authToken")?.value;
    const user = await authenticate(token);
    console.log("user", user)

    if(!await authenticate(token)){
        return NextResponse.json({message: "Unauthorized!"}, { status: 401 });
    }

    try {
        const body = await request.json();
        const { author, coverImage, title, pageCount, userId, rating, readDate } = body;



        // 1. Data Validation
        // Ensure no nulls, no empty strings, and all required fields are present
        const requiredFields = ['author', 'coverImage', 'title', 'pageCount', 'rating', 'readDate'];
        for (const field of requiredFields) {
            if (body[field] === undefined || body[field] === null || (typeof body[field] === 'string' && body[field].trim() === '')) {
                return NextResponse.json({ error: `Field ${field} is required and cannot be empty.` }, { status: 400 });
            }
        }

        const client = await connectToMongoDB();
        const db = client.db("bookhaven");

        // 2. Handle Author
        // Check if author exists
        let authorRecord = await db.author.findUnique({ where: { name: author } });
        
        if (!authorRecord) {
            // Create new author
            authorRecord = await db.author.create({
                data: { name: author }
            });
        }

        // 3. Handle Book
        // Check if book exists (using title as a unique identifier for this example)
        let bookRecord = await db.book.findUnique({ where: { title: title } });

        if (!bookRecord) {
            // Create new book
            bookRecord = await db.book.create({
                data: {
                    authorId: authorRecord.id,
                    coverImage: coverImage,
                    title: title,
                    pageCount: parseInt(pageCount)
                }
            });
        }

        // 4. Create UserBook
        await db.userBook.create({
            data: {
                userId: userId,
                bookId: bookRecord.id,
                rating: parseInt(rating),
                readDate: new Date(readDate)
            }
        });

        // 5. Success Response
        return NextResponse.json({ message: "Success" }, { status: 200 });

    } catch (error) {
        console.error("Error adding book:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}