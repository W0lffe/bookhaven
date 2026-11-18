import { comparePasswords } from "@/app/auth/auth";
import { connectToMongoDB } from "@/app/db/database";

export const validateUserData = async(username, password) => {
    
    if(password.length == 0 && username.length == 0){
        return {message: "Please enter your username and password!"};
    }

    if(username.length == 0){
        return {message: "Please enter your username!"};
    }

    if(password.length == 0){
        return {message: "Please enter your password!"};
    }

    const checkPassword = async () => {

        try {
            const client = await connectToMongoDB();
            const db = client.db("bookhaven");

            const user = await db.collection("user").findOne({username})
            if(user === null){
                return null;
            }

            const hash = user.passwdHash;

            const isPasswordCorrect = await comparePasswords(password, hash);
            if(!isPasswordCorrect){
                return null;
            }

            const userDetails = {
                userId: user._id.toString(),
                username: user.username
            }

            return userDetails;

        } catch (error) {
            return false;
        }
      
    }

    const userDetails = await checkPassword();
    if(!userDetails){
        return {message: "Invalid username or password!"};
    }

    return {userDetails};
}