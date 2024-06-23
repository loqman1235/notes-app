import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { createRefreshToken } from "../../utils/jwt";

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const createUser = async ({
  username,
  email,
  password,
}: CreateUserParams): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const storeRefreshToken = async (userId: string, refreshToken: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refresh_token: {
        create: {
          token: refreshToken,
        },
      },
    },
  });
};

const removeRefreshToken = async (userId: string) => {
  await prisma.refreshToken.delete({
    where: {
      userId,
    },
  });
};

export {
  createUser,
  getUserByEmail,
  comparePassword,
  storeRefreshToken,
  removeRefreshToken,
};
