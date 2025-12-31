import bcrypt from "bcryptjs";

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);

  return bcrypt.hash(password, salt);
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
