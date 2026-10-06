import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../passwd";

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12) //12 salt rounds
}

export const generateRecoveryCode = () => {
    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 8; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        code += characters[randomIndex];
    }

    return code;
}

export const comparePasswords = async(password, hash) => {
    return await bcrypt.compare(password, hash);
}

export const generateToken = (userDetails, expire) => {

    const payload = {
        ...userDetails
    }

    let options = {};
    if(expire){
        options = {expiresIn: "24h"}
    }

    const token = jwt.sign(payload, jwt_secret, options);
    return token;
}

export const authenticate = async (request) => {

    const token = request.cookies.get("authToken")?.value;

    if (!token) {
        return null;
    }

    try {
        const user = jwt.verify(token, jwt_secret);

        return user;
    } catch (error) {
        return null;
    }
};