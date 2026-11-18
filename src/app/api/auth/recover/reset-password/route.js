import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/app/db/database';
import { validateUserData } from '../../register/validate';
import { generateRecoveryCode, hashPassword } from "@/app/auth/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    //console.log(username, password)

    if (!username || username.trim().length === 0 || password.trim().length === 0 || !password) {
      return NextResponse.json({ message: 'Username and password are required.' }, { status: 400 });
    }

    const hasErrors = await validateUserData(null, password);

    if(hasErrors){
      return NextResponse.json({ message: hasErrors }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newRecCode = generateRecoveryCode();
    const hashedRecovery = await hashPassword(newRecCode);

    const client = await connectToMongoDB();
    const db = client.db("bookhaven");
    

    await db.collection("user").updateOne(
      { username },
      { $set: { passwdHash: hashedPassword, recovery: hashedRecovery } }
    );
   
    return NextResponse.json({ message: 'Password updated successfully!', recCode: newRecCode}, { status: 200 });

  } catch (error) {
      //console.error('Password Reset Error:', error);
      return NextResponse.json({ message: 'Something went wrong...' }, { status: 500 });
  }
}