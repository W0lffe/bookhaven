
export const validateUserData = async(username, password) => {

    if(username.length == 0){
        return "You must enter a username!";
    }

    if(username.length > 10 || username.length < 4){
        return "Username is invalid.";
    }

    const checkIsUsernameTaken = async() => {
        
        const response = await fetch(`http://localhost:3000/api/user/check-username/${username}`);
        const {taken} = await response.json();
        return taken;
    }


    const isTaken = await checkIsUsernameTaken();
    if(isTaken){
        return "Username is already taken!";
    }
    
    if(password.length == 0){
        return "You must enter a password!";
    }

    if(password.length > 16 || password.length < 8){
        return "Password is invalid.";
    }

    return null;
}