import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/app/db/database';
import { comparePasswords } from '@/app/auth/auth';

export async function POST(req) {
  try {
    const { username, recCode } = await req.json();
    //console.log(username, recCode)

    if (!username || username.trim().length === 0 || !recCode || recCode.trim().length === 0) {
      return NextResponse.json({ message: 'Username and recovery code are required.' }, { status: 400 });
    }

    const client = await connectToMongoDB();
    const db = client.db("bookhaven");
    
    const user = await db.collection("user").findOne({username})

    if (!user) {
      return NextResponse.json({ message: 'Invalid username or recovery code.' }, { status: 401 });
    }

    const isMatch = await comparePasswords(recCode, user.recovery);

    if (isMatch) {
      return NextResponse.json({ message: 'Redirecting...' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid username or recovery code.' }, { status: 401 });
  } catch (error) {
      console.error('Recovery Error:', error);
      return NextResponse.json({ message: 'Something went wrong...' }, { status: 500 });
  }
}