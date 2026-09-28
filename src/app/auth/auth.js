import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = async (password) => {
    const saltRounds = 12;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
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