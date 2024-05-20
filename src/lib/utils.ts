import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  plain: string,
  hashed: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plain, hashed);
  return match;
};
