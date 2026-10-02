import bcrypt from "bcrypt";
import crypto from "crypto";

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