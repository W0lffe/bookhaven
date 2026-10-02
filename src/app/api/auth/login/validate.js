import { comparePasswords } from "@/app/auth/auth";

export const validateUserData = async(username, password) => {
    
    if(password.length == 0 && username.length == 0){
        return "Please enter your username and password!";
    }

    if(username.length == 0){
        return "Please enter your username!";
    }

    if(password.length == 0){
        return "Please enter your password!";
    }

    const checkPassword = async () => {
        const response = await fetch(`http://localhost:3000/api/user/get-password/${username}`);
        const {hash, error} = await response.json();
        //console.log(hash, error)

        if(error){
            return false;
        }

        return await comparePasswords(password, hash);
    }

    const isPasswordCorrect = await checkPassword();
    if(!isPasswordCorrect){
        return "Invalid username or password!";
    }

    return null;
}