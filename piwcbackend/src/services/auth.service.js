import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";

async function register(userData) {
  const existingUser = await userRepository.findByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = {
    ...userData,
    password: hashedPassword,
  };

  const user = await userRepository.create(newUser);

  const { password, ...safeUser } = user;

  return safeUser;
}

export default {
  register,
};