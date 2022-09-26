import * as bcrypt from "bcrypt";

export const hash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export const isMatch = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}